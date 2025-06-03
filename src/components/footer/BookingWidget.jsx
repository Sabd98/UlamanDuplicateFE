import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const BookingWidget = () => {
  const [adults, setAdults] = useState(2);

  return (
    <div>
      <div className="text-center pt-5">
        <div className="text-lg font-bold">48 / 552 Google Reviews</div>
        <div className="text-lg font-bold">50 / 242 TripAdvisor Reviews</div>
      </div>

      <div className="space-y-4 mt-6 flex  justify-between">
        <div className="flex items-center gap-x-4">
          <label className="block mb-2">Check In</label>
          <label className="block mb-2">Check Out</label>
        </div>
        <div className="flex items-center gap-5">
          <label className="block mb-2">Adults</label>

          <button
            className="p-2  border   rounded-2xl"
            onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
          >
            <FiMinus />
          </button>
          <div className=" text-center p-2">{adults}</div>
          <button
            className="p-2  border  rounded-2xl"
            onClick={() => setAdults((prev) => prev + 1)}
          >
            <FiPlus />
          </button>
        </div>
        <button className="w-1/6 py-3 border border-white  rounded-tl-lg rounded-br-lg  hover:bg-cyan-900 transition-colors">
          Search
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;
