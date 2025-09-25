import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Span = styled.span`
  margin-left: 0.5rem;
`;

function TimerCountDown({ dateTime, onFinished }) {
  const navigate = useNavigate();
  const [time, setTimer] = useState({});
  const today = new Date();
  let timer = Math.trunc((dateTime - today) / 1000);

  useEffect(
    function () {
      function timeCount() {
        let hour = String(Math.trunc(timer / (60 * 60))).padStart(2, 0);
        let mins = String(Math.trunc((timer / 60) % 60)).padStart(2, 0);
        let sec = String(Math.trunc(timer % 60)).padStart(2, 0);

        return { hour, mins, sec };
      }
      const timerInterval = setInterval(() => {
        const { hour, mins, sec } = timeCount();

        if (timer === 0 || timer < 0) {
          toast.error("Your time has elapsed");
          onFinished(true);
          navigate("/app", { replace: true });
        }

        setTimer({ hour, mins, sec });
      }, 1000);

      return () => clearInterval(timerInterval);
    },
    [timer, time, navigate, onFinished]
  );

  return (
    <Span>
      {time.mins}:{time.sec}
    </Span>
  );
}

export default TimerCountDown;
