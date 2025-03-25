import React, { useState } from 'react';
import { Ticket, Calendar, Clock, CreditCard, Film, Search, QrCode, X, IndianRupee } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  image: string;
  rating: number;
  duration: string;
  price: number;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie | null;
  selectedDate: string;
  selectedTime: string;
}

function PaymentModal({ isOpen, onClose, movie, selectedDate, selectedTime }: PaymentModalProps) {
  const [upiId, setUpiId] = useState('');

  if (!isOpen || !movie) return null;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with actual UPI payment gateway
    alert(`Processing payment of ₹${movie.price} using UPI ID: ${upiId}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Complete Payment</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-6">
          <div className="text-gray-600 mb-4">
            <p className="font-semibold">{movie.title}</p>
            <p>Date: {new Date(selectedDate).toLocaleDateString()}</p>
            <p>Time: {selectedTime}</p>
            <p className="text-xl font-bold text-red-600 mt-2">Amount: ₹{movie.price}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex items-center justify-center mb-4">
              <QrCode className="h-32 w-32 text-gray-800" />
            </div>
            <p className="text-center text-sm text-gray-600">Scan QR code with your UPI app</p>
          </div>

          <form onSubmit={handlePayment}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Or pay using UPI ID
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="Enter UPI ID (e.g., name@upi)"
                  className="flex-1 p-2 border rounded-l-md focus:ring-2 focus:ring-red-300 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-red-600 text-white px-4 py-2 rounded-r-md hover:bg-red-700 transition flex items-center"
                >
                  <IndianRupee className="h-5 w-5 mr-1" />
                  Pay
                </button>
              </div>
            </div>
          </form>

          <div className="text-xs text-gray-500 text-center">
            <p>Supported UPI apps:</p>
            <p>Google Pay, PhonePe, Paytm, BHIM UPI</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  const movies: Movie[] = [
    {
      id: 1,
      title: "Inception 2",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&auto=format&fit=crop",
      rating: 4.8,
      duration: "2h 45m",
      price: 299
    },
    {
      id: 2,
      title: "The Matrix Returns",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop",
      rating: 4.5,
      duration: "2h 30m",
      price: 249
    },
    {
      id: 3,
      title: "AI Revolution",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop",
      rating: 4.7,
      duration: "2h 15m",
      price: 199
    }
  ];

  const showTimes = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'];
  const dates = ['2024-03-20', '2024-03-21', '2024-03-22', '2024-03-23', '2024-03-24'];

  const handleBooking = (movie: Movie) => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time');
      return;
    }
    setSelectedMovie(movie);
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-white">
      {/* Header */}
      <header className="bg-red-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Ticket className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Dekho Cinema</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                className="pl-10 pr-4 py-2 rounded-full bg-red-700 text-white placeholder-red-200 focus:outline-none focus:ring-2 focus:ring-red-300"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-red-200" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-red-800 mb-8">Now Showing</h2>
        
        {/* Movies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105">
              <img src={movie.image} alt={movie.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{movie.title}</h3>
                <div className="flex items-center space-x-4 text-gray-600 mb-4">
                  <span className="flex items-center">
                    <Film className="h-4 w-4 mr-1" />
                    {movie.duration}
                  </span>
                  <span className="flex items-center">
                    ⭐ {movie.rating}
                  </span>
                  <span className="flex items-center font-semibold text-red-600">
                    ₹{movie.price}
                  </span>
                </div>

                {/* Booking Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-red-600" />
                    <select 
                      className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-red-300"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    >
                      <option value="">Select Date</option>
                      {dates.map(date => (
                        <option key={date} value={date}>{new Date(date).toLocaleDateString()}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-red-600" />
                    <select 
                      className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-red-300"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    >
                      <option value="">Select Time</option>
                      {showTimes.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>

                  <button 
                    onClick={() => handleBooking(movie)}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition flex items-center justify-center space-x-2"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Book Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        movie={selectedMovie}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
      />

      {/* Footer */}
      <footer className="bg-red-600 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Dekho Cinema. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;