import styled from "styled-components";
import { motion } from "framer-motion";

// Color for each level
const levelColors = [
  "#9e9e9e", // Level 1 - Grey
  "#607d8b", // Level 2 - Blue Grey
  "#2196f3", // Level 3 - Blue
  "#3f51b5", // Level 4 - Indigo
  "#00bcd4", // Level 5 - Cyan
  "#4caf50", // Level 6 - Green
  "#ff9800", // Level 7 - Orange
  "#f44336", // Level 8 - Red
];

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 12px;
`;

const Label = styled.div`
  font-size: 16px;
  margin-bottom: 6px;
  font-weight: bold;
  text-align: left;
`;

const BarWrapper = styled.div`
  background: #e0e0e0;
  border-radius: 20px;
  height: 20px;
  overflow: hidden;
`;

const Bar = styled(motion.div)`
  height: 100%;
  border-radius: 20px;
`;

function LevelBar({ level = 1 }) {
  const clampedLevel = Math.min(Math.max(level, 1), 8);
  const progressPercent = (clampedLevel / 8) * 100;

  return (
    <Container>
      <Label>Level {clampedLevel}</Label>
      <BarWrapper>
        <Bar
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ backgroundColor: levelColors[clampedLevel - 1] }}
        />
      </BarWrapper>
    </Container>
  );
}

export default LevelBar;
