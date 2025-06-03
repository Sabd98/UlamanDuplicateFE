import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiPlus, FiMinus } from "react-icons/fi";
import { format } from "date-fns";

const BookingModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeDatePicker, setActiveDatePicker] = useState("arrival");
  const [adults, setAdults] = useState(2);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Simulate loading effect
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Get first day of month
    const firstDay = new Date(year, month, 1);
    // Get last day of month
    const lastDay = new Date(year, month + 1, 0);

    const days = [];

    // Add empty days for the start of the week
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const handleDateSelect = (date) => {
    if (!date) return;

    if (activeDatePicker === "arrival") {
      setArrivalDate(date);
      setActiveDatePicker("departure");
    } else {
      // Departure date must be after arrival date
      if (arrivalDate && date > arrivalDate) {
        setDepartureDate(date);
      } else {
        // If departure is before arrival, reset dates
        setArrivalDate(date);
        setDepartureDate(null);
      }
    }
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const calculateNights = () => {
    if (!arrivalDate || !departureDate) return 0;
    const diffTime = Math.abs(departureDate - arrivalDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculatePrice = () => {
    const nights = calculateNights();
    return nights * 7000000; // 7M per night
  };

  const formatDate = (date) => {
    return date ? format(date, "MMM dd, yyyy") : "Select date";
  };

  const formatPrice = (price) => {
    return `IDR ${(price / 1000000).toFixed(1)}M`;
  };

  const handleBook = () => {
    // Booking logic here
    alert("Booking completed!");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25 }}
          >
            {/* Loading Overlay */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  className="absolute inset-0 bg-white flex items-center justify-center z-10"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <div className="text-lg font-bold">
                  4.9 ★ / 552 Google Reviews
                </div>
                <div className="text-lg font-bold">
                  5.0 ★ / 252 Tripadvisor Reviews
                </div>
              </div>
              <h2 className="text-2xl font-serif">ULAMAN</h2>
              <button
                onClick={onClose}
                className="text-2xl p-2 hover:bg-gray-100 rounded-full"
              >
                <FiX />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Calendar */}
              <div>
                <div className="mb-6">
                  <div className="flex justify-between mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Arrival Date</div>
                      <div
                        className={`text-lg font-medium cursor-pointer ${
                          activeDatePicker === "arrival" ? "text-blue-600" : ""
                        }`}
                        onClick={() => setActiveDatePicker("arrival")}
                      >
                        {formatDate(arrivalDate)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">
                        Departure Date
                      </div>
                      <div
                        className={`text-lg font-medium cursor-pointer ${
                          activeDatePicker === "departure"
                            ? "text-blue-600"
                            : ""
                        }`}
                        onClick={() => setActiveDatePicker("departure")}
                      >
                        {formatDate(departureDate)}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-2">
                      Number of adults
                    </div>
                    <div className="flex items-center">
                      <button
                        className="p-2 bg-gray-200 rounded-l-lg"
                        onClick={() =>
                          setAdults((prev) => Math.max(1, prev - 1))
                        }
                      >
                        <FiMinus />
                      </button>
                      <div className="flex-1 text-center p-2 border-t border-b border-gray-300">
                        {adults}
                      </div>
                      <button
                        className="p-2 bg-gray-200 rounded-r-lg"
                        onClick={() => setAdults((prev) => prev + 1)}
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Calendar */}
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <button onClick={prevMonth} className="p-2">
                      ←
                    </button>
                    <div className="text-xl font-bold">
                      {format(currentMonth, "MMMM yyyy")}
                    </div>
                    <button onClick={nextMonth} className="p-2">
                      →
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div
                        key={day}
                        className="text-center text-sm font-medium text-gray-500"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((date, index) => {
                      const isSelected =
                        (date &&
                          arrivalDate &&
                          date.getTime() === arrivalDate.getTime()) ||
                        (date &&
                          departureDate &&
                          date.getTime() === departureDate.getTime());

                      const isInRange =
                        date &&
                        arrivalDate &&
                        departureDate &&
                        date > arrivalDate &&
                        date < departureDate;

                      const isDisabled = date && date < new Date();

                      return (
                        <button
                          key={index}
                          className={`
                            h-10 rounded-lg flex items-center justify-center
                            ${isSelected ? "bg-blue-600 text-white" : ""}
                            ${isInRange ? "bg-blue-100" : ""}
                            ${
                              isDisabled
                                ? "text-gray-300 cursor-not-allowed"
                                : "hover:bg-gray-100"
                            }
                          `}
                          onClick={() => !isDisabled && handleDateSelect(date)}
                          disabled={isDisabled}
                        >
                          {date ? date.getDate() : ""}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column - Pricing */}
              <div>
                <div className="text-4xl font-bold text-center mb-6">
                  {formatPrice(calculatePrice())}
                  <div className="text-lg font-normal mt-1">
                    for {calculateNights()} nights
                  </div>
                </div>

                <div className="border rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <div className="bg-blue-600 text-white rounded-lg flex items-center justify-center h-12">
                      S1
                    </div>
                    <div className="col-span-3">
                      <div className="font-bold">Best Price</div>
                      <div className="text-sm">Last minute deal</div>
                    </div>
                  </div>

                  <div className="text-center mb-2">
                    Minimum stay: {arrivalDate ? "2 nights" : "--"}
                  </div>
                </div>

                <button
                  onClick={handleBook}
                  disabled={!arrivalDate || !departureDate}
                  className={`
                    w-full py-4 rounded-lg text-lg font-bold
                    ${
                      arrivalDate && departureDate
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }
                  `}
                >
                  BOOK
                </button>

                <div className="mt-6 text-center">
                  <div className="font-bold mb-2">Package includes:</div>
                  <ul className="space-y-1 text-sm">
                    <li>• Welcome drink upon arrival</li>
                    <li>• Daily breakfast for two</li>
                    <li>• Access to all resort facilities</li>
                    <li>• Complimentary yoga sessions</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
