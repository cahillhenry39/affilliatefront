import { useEffect, useState } from "react";
import styled from "styled-components";

const Span = styled.span`
  margin-left: 0.5rem;
  color: var(--color-brand-700);
`;

const SecondSpan = styled.span`
  color: orangered;
`;

function TimerCountDown({ startDate, dateTime, setSalesEnded = () => {} }) {
  const [timeLeft, setTimeLeft] = useState({});
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (!dateTime) return;

    const targetTime = new Date(dateTime).getTime(); // ✅ ensure it’s a Date object

    const interval = setInterval(() => {
      const now = startDate
        ? new Date(startDate).getTime()
        : new Date().getTime();
      const diff = Math.floor((targetTime - now) / 1000);

      if (diff <= 0) {
        clearInterval(interval);
        setSalesEnded(true);
        setEnded(true);
        setTimeLeft({ hour: "00", mins: "00", sec: "00" });
        return;
      }

      const hour = String(Math.floor(diff / 3600)).padStart(2, "0");
      const mins = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
      const sec = String(diff % 60).padStart(2, "0");

      setTimeLeft({ hour, mins, sec });
    }, 1000);

    return () => clearInterval(interval);
  }, [dateTime, startDate, setSalesEnded]);

  if (ended) {
    return <SecondSpan>00:00:00</SecondSpan>;
  }

  if (!timeLeft.hour) {
    return <Span>Loading...</Span>;
  }

  return (
    <Span>
      {timeLeft.hour}:{timeLeft.mins}:{timeLeft.sec}
    </Span>
  );
}

export default TimerCountDown;
