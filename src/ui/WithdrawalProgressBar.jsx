import { useState } from "react";
import styled from "styled-components";

// === Styled Progress Bar ===
const ProgressWrapper = styled.div`
  width: 100%;
  background: #f1f1f1;
  border-radius: 10px;
  overflow: hidden;
  height: 1.2rem;
  margin: 1rem 0;
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.2);
`;

const ProgressFill = styled.div`
  width: ${(props) => props.$progress}%;
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #81c784);
  transition: width 0.5s ease;
`;

const WithdrawButton = styled.button`
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  background: ${(props) => (props.disabled ? "#ccc" : "#4caf50")};
  color: white;
  margin-top: 1rem;
  transition: background 0.3s;
`;

export default function WithdrawProgress() {
  // Track user actions
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  // Example thresholds
  const taskTarget = 5; // user must finish 5 tasks
  const gameTarget = 3; // and play 3 games

  // Calculate percentage
  const totalTarget = taskTarget + gameTarget;
  const totalProgress = Math.min(
    ((tasksCompleted + gamesPlayed) / totalTarget) * 100,
    100
  );

  const canWithdraw = totalProgress >= 100;

  return (
    <div>
      <h3>Withdraw Progress</h3>

      {/* Progress Bar */}
      <ProgressWrapper>
        <ProgressFill $progress={totalProgress} />
      </ProgressWrapper>

      <p>
        Tasks: {tasksCompleted}/{taskTarget} | Games: {gamesPlayed}/{gameTarget}
      </p>

      {/* Simulate actions */}
      <button onClick={() => setTasksCompleted((t) => t + 1)}>+ Task</button>
      <button onClick={() => setGamesPlayed((g) => g + 1)}>+ Game</button>

      {/* Withdraw button */}
      <WithdrawButton disabled={!canWithdraw}>
        {canWithdraw ? "Withdraw Now 💰" : "Locked 🔒"}
      </WithdrawButton>
    </div>
  );
}
