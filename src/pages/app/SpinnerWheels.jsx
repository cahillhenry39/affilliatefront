import { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useUpdateActiveSpinners } from "../../services/useSpinnerReward";
import { useQueryClient } from "@tanstack/react-query";
import { getConfetti } from "../../utils/confetti";

// Animations
const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(234, 179, 8, 0.5); }
  50% { box-shadow: 0 0 40px rgba(234, 179, 8, 0.8); }
`;

const bounceIn = keyframes`
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const slowSpin = keyframes`
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Layout
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -3rem;
  padding-top: 7rem;
  height: 100vh;
  background-color: var(--color-grey-0);

  overflow-y: scroll;
  padding-bottom: 11rem;

  &::-webkit-scrollbar {
    width: 0rem;
  }
`;

const SpinnerCard = styled.div`
  position: relative;
  margin-bottom: 2rem;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-grey-700);
  margin-bottom: 0.5rem;
  text-align: center;
`;

const Subtitle = styled.p`
  color: var(--color-grey-500);
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const SpinnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const Pointer = styled.div`
  position: absolute;
  top: 0%;
  right: 50%;
  transform: translate(50%, 0%);
  z-index: 20;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 40px solid var(--color-brand-700);
  animation: ${pulseGlow} 2s ease-in-out infinite;
`;

// Dynamic conic-gradient
const Wheel = styled.div`
  position: relative;
  width: 25rem;
  height: 25rem;
  border-radius: 50%;
  border: 8px solid var(--color-brand-700);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  ${({ isSpinning, rotation }) =>
    isSpinning &&
    css`
      transform: rotate(${rotation}deg);
    `}

  ${({ rewards, hasBenefits }) => {
    const step = 360 / rewards.length;
    let gradientStops = "";
    rewards.forEach((reward, i) => {
      const start = i * step;
      const end = (i + 1) * step;
      gradientStops += `${reward.color} ${start}deg ${end}deg, `;
    });

    return css`
      ${hasBenefits
        ? css`
            transition: transform 4s cubic-bezier(0.15, 0, 0.25, 1);
          `
        : css`
            animation: ${slowSpin} 20s linear infinite;
          `}

      background: conic-gradient(${gradientStops.slice(0, -2)});
    `;
  }}
`;

const CenterCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4rem;
  height: 4rem;
  background: var(--color-brand-700);
  border-radius: 50%;
  border: 4px solid #0f172a;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const SpinButton = styled.button`
  margin-top: 2rem;
  /* background: linear-gradient(45deg, #eab308, #f97316); */
  background: linear-gradient(45deg, var(--color-brand-700), #f97316);
  color: var(--color-brand-100);
  font-weight: bold;
  padding: 1rem 3rem;
  font-size: 1.3rem;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: linear-gradient(45deg, var(--color-brand-700), #f97316);

    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const WinnerCard = styled.div`
  margin-top: 2rem;
  text-align: center;
  animation: ${bounceIn} 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  padding: 1.5rem;
  border-radius: 1rem;

  background-color: var(--color-grey-10);
  border: 2px solid var(--color-brand-700);

  h3 {
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: var(--color-brand-800);
  }

  .prize-name {
    font-size: 1.125rem;
    color: var(--color-grey-800);
    margin-bottom: 0.5rem;
  }

  .prize-value {
    font-size: 1.25rem;
    font-weight: bold;
    /* color: #eab308; */
    color: var(--color-brand-700);
  }
`;

const ErrorCard = styled.div`
  margin-top: 2rem;
  text-align: center;
  animation: ${bounceIn} 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  padding: 1.5rem;
  border-radius: 1rem;

  background-color: var(--color-grey-10);
  border: 2px solid orangered;

  h3 {
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: orangered;
  }

  .prize-value {
    font-size: 1.25rem;
    font-weight: bold;
    color: #cc3904;
  }
`;

const SliceLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 40%;
  transform-origin: center;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  text-align: center;
  width: 5rem; /* gives wrapping room */
  line-height: 1.2;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  pointer-events: none;
`;

const allColors = [
  "#ef4444",
  "#3b82f6",
  "#eab308",
  "#22c55e",
  "#8b5cf6",
  "#f97316",
];

export default function Spinner({ benefits, currentSpinner }) {
  const confetti = getConfetti();

  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [rotation, setRotation] = useState(0);
  const queryClient = useQueryClient();

  const { updateSpinner, isPending } = useUpdateActiveSpinners();

  const values = benefits;

  const rewards = allColors?.map((each, i) => {
    return {
      id: i + 1,
      value: values?.length === 6 ? values[i] : 0,
      color: each,
    };
  });

  const wheelSize = 25 * 16; // 25rem → px (assuming 1rem = 16px)
  const radius = wheelSize / 2;
  const labelDistance = radius * 0.4;

  useEffect(() => {
    if (!benefits?.length) {
      const finalRotation = 2;

      setRotation((prev) => prev + finalRotation);
    }

    return () => {
      const existing = document.querySelector("canvas[style*='z-index: 9999']");
      if (existing) existing.remove();
    };
  }, [rewards, setRotation, benefits]);

  const spinWheel = () => {
    if (isSpinning || !benefits?.length) return;

    setIsSpinning(true);
    setWinner(null);

    const segmentAngle = 360 / rewards.length;
    const randomSegment = Math.floor(Math.random() * rewards.length);
    const baseRotation = 360 * 5; // 5 full spins
    const finalRotation =
      baseRotation +
      segmentAngle * randomSegment +
      Math.random() * segmentAngle;

    setRotation((prev) => prev + finalRotation);

    const selectedReward = rewards[randomSegment];

    updateSpinner(
      { rewardId: currentSpinner?.id, rewardAmount: selectedReward.value },
      {
        onError: () => {
          setWinner({ isError: true });
          setIsSpinning(false);

          setTimeout(() => {
            setWinner(null);
            setIsSpinning(false);
          }, 4000);
        },
        onSuccess: () => {
          queryClient.invalidateQueries();
          setWinner(selectedReward);
          setIsSpinning(false);

          confetti({
            particleCount: 350,
            spread: 90,
            origin: { y: 0.6 },
          });

          setTimeout(() => {
            setWinner(null);
            setIsSpinning(false);
          }, 10000);
        },
      }
    );
  };

  const highest = Math.max(...benefits);

  const messageTop = !benefits?.length
    ? `Keep performing your task, referring users and buying stocks to get reward.`
    : `Spin the wheel to win up to ${formatCurrency(highest)}`;

  return (
    <Container>
      <Pointer />

      <SpinnerCard>
        <Title>🎁 Reward Spinner 🎁</Title>
        <Subtitle>{messageTop}</Subtitle>

        <SpinnerContainer>
          <Pointer />
          <Wheel
            rewards={rewards}
            isSpinning={isSpinning}
            rotation={rotation}
            hasBenefits={!!benefits?.length}
          >
            {rewards.map((reward, i) => {
              const angle =
                (360 / rewards.length) * i + 360 / rewards.length / 1;
              return (
                <SliceLabel
                  key={reward.id}
                  style={{
                    transform: `rotate(${angle}deg) translate(${labelDistance}px)  rotate(-${angle}deg)`,
                  }}
                >
                  {formatCurrency(reward.value)}
                </SliceLabel>
              );
            })}

            <CenterCircle>🎯</CenterCircle>
          </Wheel>
        </SpinnerContainer>

        <div style={{ textAlign: "center" }}>
          <SpinButton
            onClick={spinWheel}
            disabled={isSpinning || !benefits?.length || isPending}
          >
            {isSpinning ? "🎯 Spinning..." : "🎰 SPIN TO WIN!"}
          </SpinButton>
        </div>

        {winner && winner?.isError ? (
          <ErrorCard>
            <h3>💥 Error 💥</h3>

            <p className="prize-value">{`Something went wrong. Try again`} </p>
          </ErrorCard>
        ) : (
          winner && (
            <WinnerCard>
              <h3>🎉 YOU WON! 🎉</h3>

              <p className="prize-value">
                {`You have been credited with ${formatCurrency(winner.value)}`}{" "}
              </p>
            </WinnerCard>
          )
        )}
      </SpinnerCard>
    </Container>
  );
}
