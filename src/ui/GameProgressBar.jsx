import { useState, useEffect } from "react";
import styled from "styled-components";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";

// === Styled Components ===
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 2rem;
  margin: -0.5rem 0;
`;

const ProgressSection = styled.div`
  position: relative;
`;

const ProgressWrapper = styled.div`
  width: 100%;
  height: 1rem;
  background: var(--color-grey-100);
  border-radius: 12px;
  overflow: hidden;
`;

const Fill = styled.div`
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background: linear-gradient(
    90deg,
    var(--color-brand-200) 0%,
    var(--color-brand-700) 100%
  );
  border-radius: 12px;
  transition: width 0.5s ease;
`;

const Button = styled.button`
  padding: 0.1rem 0.2rem;
  border: none;
  border-radius: 10px;
  background: ${({ disabled }) =>
    disabled ? "var(--color-grey-100)" : "var(--color-brand-700)"};
  color: ${({ disabled }) =>
    disabled ? "var(--color-grey-300)" : "var(--color-grey-0)"};
  font-weight: bold;
  font-size: 1rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.3s;

  width: 10rem;
`;

const Tooltip = styled.div`
  position: absolute;
  top: -1.5rem;
  left: ${({ $progress }) => $progress}%;
  transform: translateX(-50%);
  color: var(--color-grey-800);
  font-weight: 500;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 1; /* always visible */
  pointer-events: none;

  &::after {
    content: "";
    position: absolute;
    top: 70%; /* attach at bottom of tooltip */
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 13px; /* line length */
    background: linear-gradient(
      180deg,
      var(--color-brand-200) 0%,
      var(--color-brand-700) 100%
    );
    border-radius: 2px;
  }
`;

// === Main Component ===
export default function EqualProgressBar({ currentPercentage = 0 }) {
  const [progress, setProgress] = useState(currentPercentage);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPercentage || currentPercentage === 0)
      setProgress(currentPercentage);
  }, [currentPercentage]);

  // Splash when full
  useEffect(() => {
    if (progress >= 100) {
      confetti({
        particleCount: 380,
        spread: 120,
        origin: { y: 0.6 },
      });
    }
  }, [progress]);

  const disabled = progress < 100;

  return (
    <Container>
      <ProgressSection>
        <ProgressWrapper>
          <Fill $progress={progress} />
          <Tooltip $progress={progress}>{progress}%</Tooltip>
        </ProgressWrapper>
      </ProgressSection>

      <Button
        disabled={disabled}
        onClick={() => {
          if (disabled) return;

          navigate("/app/withdraw");
        }}
      >
        Withdraw
      </Button>
    </Container>
  );
}
