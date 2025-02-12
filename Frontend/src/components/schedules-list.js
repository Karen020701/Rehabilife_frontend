import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/schedules.css";
import config from "../config"; 

const SchedulesList = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const query = `
          {
            schedules {
              id
              day
              start_time
              end_time
            }
          }
        `;

        const response = await axios.post(config.BASE_URL_SCHEDULES, { query });

        if (response.data.data && response.data.data.schedules) {
          setSchedules(response.data.data.schedules);
        } else {
          console.error("No schedules found.");
        }
      } catch (err) {
        console.error("Error fetching schedules:", err);
      }
    };

    fetchSchedules();
  }, []);

  return (
    <div className="container">
      <h1>Schedules List</h1>
      <div className="schedules-list">
        {schedules.length > 0 ? (
          schedules.map((schedule) => (
            <div key={schedule.id} className="schedule-card">
              <h3>{schedule.day}</h3>
              <p>
                <strong>Start Time:</strong> {schedule.start_time}
              </p>
              <p>
                <strong>End Time:</strong> {schedule.end_time}
              </p>
            </div>
          ))
        ) : (
          <p>No schedules found.</p>
        )}
      </div>
    </div>
  );
};

export default SchedulesList;
