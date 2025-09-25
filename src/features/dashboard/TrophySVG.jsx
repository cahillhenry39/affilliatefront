// TrophyWithStars.jsx
import React from "react";
import { HiMiniTrophy } from "react-icons/hi2";
import styled, { keyframes } from "styled-components";

const twinkle = keyframes`
  0%   { transform: scale(0.6) rotate(0deg); opacity: 0.25; filter: drop-shadow(0 0 0px currentColor); }
  50%  { transform: scale(1.15) rotate(12deg); opacity: 1;   filter: drop-shadow(0 0 6px currentColor); }
  100% { transform: scale(0.6) rotate(0deg); opacity: 0.25; filter: drop-shadow(0 0 0px currentColor); }
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%; /* fills the parent box (Eachbox div) */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* style the react-icon so it scales inside the wrapper */
const TrophyIcon = styled(HiMiniTrophy)`
  width: 72%;
  height: 72%;
  z-index: 1;
  flex: 0 0 auto;
  pointer-events: none;
`;

/* Stars overlay on top of the trophy */
const Stars = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2; /* above the trophy */

  .star {
    transform-box: fill-box; /* ensure transform-origin works */
    transform-origin: center;
    animation: ${twinkle} 1.8s ease-in-out infinite;
  }
  .star:nth-of-type(2) {
    animation-duration: 2.1s;
    animation-delay: 0.15s;
  }
  .star:nth-of-type(3) {
    animation-duration: 1.6s;
    animation-delay: 0.35s;
  }
  .star:nth-of-type(4) {
    animation-duration: 2.3s;
    animation-delay: 0.05s;
  }
  .star:nth-of-type(5) {
    animation-duration: 1.9s;
    animation-delay: 0.3s;
  }
`;

const Sparkle = ({ x, y, size = 6, color = "#FFD54F", className }) => (
  <g className={className} transform={`translate(${x} ${y})`}>
    <polygon
      points={`0,-${size} ${size / 5},-${size / 5} ${size},0 ${size / 5},${
        size / 5
      } 0,${size} -${size / 5},${size / 5} -${size},0 -${size / 5},-${
        size / 5
      }`}
      fill="currentColor"
      style={{ color }}
    />
  </g>
);

export default function TrophyWithStars({ starColor = "#FFD54F" }) {
  return (
    <Wrapper>
      <TrophyIcon aria-hidden="true" />

      <Stars viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {/* THESE COORDS ARE PLACED OVER THE CUP AREA — tweak x/y if you need them shifted */}
        <Sparkle className="star" x={50} y={28} size={6} color={starColor} />
        <Sparkle className="star" x={58} y={36} size={5} color={starColor} />
        <Sparkle className="star" x={42} y={36} size={5} color={starColor} />
        <Sparkle className="star" x={50} y={46} size={4.5} color={starColor} />
        <Sparkle className="star" x={66} y={30} size={4} color={starColor} />
      </Stars>
    </Wrapper>
  );
}
