import { useEffect, useState } from "react";
import styled from "styled-components";

const SpanContainer = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.21rem;
  margin-left: 2rem;
`;

const TextSpanContainer = styled.span``;

const DotsSpanContainer = styled.span``;

export default function LoadingDots({
  text = "Loading",
  speed = 1000,
  maxDots = 3,
}) {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    // cycle 0 -> maxDots -> 0 ...
    const id = setInterval(() => {
      setDots((d) => (d + 1) % (maxDots + 1));
    }, Math.max(50, speed));

    return () => clearInterval(id);
  }, [speed, maxDots]);

  // keep a stable width so layout doesn't jump: reserve space for `maxDots` characters
  const reserved = "\u00A0".repeat(maxDots); // non-breaking spaces

  return (
    <SpanContainer role="status" aria-live="polite">
      <TextSpanContainer>{text}</TextSpanContainer>
      <DotsSpanContainer
        style={{
          minWidth: `${maxDots}ch`,
          textAlign: "left",
          fontVariantNumeric: "tabular-nums",
        }}
        aria-hidden
      >
        {".".repeat(dots)}
        {reserved}
      </DotsSpanContainer>
    </SpanContainer>
  );
}
