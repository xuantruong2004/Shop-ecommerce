import React, { useEffect } from "react";
import { useState } from "react";
import "./Clock.scss";

const Clock = () => {
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  let interval;
  const countDown = () => {
    const destination = new Date("December 20,2023").getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const different = destination - now;

      const days = Math.floor(different / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (different % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((different % (60 * 1000 * 60)) / (1000 * 60));
      const seconds = Math.floor((different % (1000 * 60)) / 1000);

      if (destination < 0) clearInterval(interval.current);
      else {
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }
    }, interval);
  };

  useEffect(() => {
    countDown();
  }, []);
  return (
    <div className="clock__wrapper d-flex align-items-center gap-3">
      <div className="clock__wrapper d-flex align-items-center gap-3">
        <div className="text-center">
          <h1 className="text-white fs-3 ">{days}</h1>
          <h5 className="text-white fs-6  ">Days</h5>
        </div>
        <span className="text-white fs-3">:</span>
      </div>
      <div className="clock__wrapper d-flex align-items-center gap-3">
        <div className="text-center">
          <h1 className="text-white fs-3">
            {hours < 10 ? `0${hours}` : hours}
          </h1>
          <h5 className="text-white fs-6">Hours</h5>
        </div>
        <span className="text-white fs-3">:</span>
      </div>
      <div className="clock__wrapper d-flex align-items-center gap-3">
        <div className="text-center">
          <h1 className="text-white fs-3">
            {minutes < 10 ? `0${minutes}` : minutes}
          </h1>
          <h5 className="text-white fs-6">Minutes</h5>
        </div>
        <span className="text-white fs-3">:</span>
      </div>
      <div className="clock__wrapper d-flex align-items-center gap-3">
        <div className="text-center">
          <h1 className="text-white fs-3">
            {seconds < 10 ? `0${seconds}` : seconds}
          </h1>
          <h5 className="text-white fs-6">Seconds</h5>
        </div>
      </div>
    </div>
  );
};

export default Clock;
