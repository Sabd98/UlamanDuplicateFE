// data/schedule.js
export const scheduleData = {
  days: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  times: ["8 AM", "12 PM", "1 PM", "5 PM"],
  activities: [
    {
      id: "yoga",
      title: "Yoga (All Levels)",
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      time: "8 AM",
      details: {
        title: "Yoga (All Levels)",
        description:
          "Begin your day with a gentle yoga session suitable for all levels...",
        duration: "60 minutes",
        location: "Mandala Shala",
        price: "IDR 250,000",
      },
    },
    {
      id: "sound-healing",
      title: "Sound Healing",
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      time: "12 PM",
      details: {
        title: "Sound Healing",
        description:
          "A meditative sound healing journey with mantras, Tibetan singing bowls...",
        duration: "75 minutes",
        location: "Mandala Shala",
        price: "IDR 350,000",
      },
    },
    // Other activities
  ],
};

import { useState } from "react";
import ActivityModal from "../modals/ActivityModal";

const WeeklySchedule = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openActivityModal = (activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  return (
    <div className="py-20">
      <div className="mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">
          Weekly Schedule
        </h2>
        <p className="text-center mb-10 text-gray-600">
          Advanced Booking is Recommended
        </p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-4 "></th>
                {scheduleData.days.map((day) => (
                  <th
                    key={day}
                    className="p-4 "
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scheduleData.times.map((time) => (
                <tr key={time}>
                  <td className="p-4 font-medium ">
                    {time}
                  </td>
                  {scheduleData.days.map((day) => {
                    const activity = scheduleData.activities.find(
                      (a) => a.days.includes(day) && a.time === time
                    );

                    return (
                      <td
                        key={`${day}-${time}`}
                        className={`border p-4 ${
                          activity
                            ? "hover:bg-amber-50 hover:cursor-pointer"
                            : ""
                        }`}
                        onClick={() => activity && openActivityModal(activity)}
                      >
                        {activity ? activity.title : ""}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-8">
          <button className="px-6 py-3 border border-black text-black hover:bg-black hover:text-white transition-colors">
            DOWNLOAD PDF
          </button>
        </div>
      </div>

      {isModalOpen && selectedActivity && (
        <ActivityModal
          activity={selectedActivity}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default WeeklySchedule;