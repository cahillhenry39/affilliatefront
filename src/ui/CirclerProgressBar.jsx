import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import _ from "lodash";

function CirclerProgressBar({ value }) {
  return (
    <CircularProgressbarWithChildren
      value={value}
      text={`${value}%`}
      strokeWidth={10}
      styles={buildStyles({
        strokeLinecap: "butt",
      })}
    >
      <RadialSeparators
        count={12}
        style={{
          background: "#fff",
          width: "2px",
          // This needs to be equal to props.strokeWidth
          height: `${10}%`,
        }}
      />
    </CircularProgressbarWithChildren>
  );
}

function Separator(props) {
  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        transform: `rotate(${props.turns}turn)`,
      }}
    >
      <div style={props.style} />
    </div>
  );
}

function RadialSeparators(props) {
  const turns = 1 / props.count;
  return _.range(props.count).map((index) => (
    <Separator key={index} turns={index * turns} style={props.style} />
  ));
}

export default CirclerProgressBar;
