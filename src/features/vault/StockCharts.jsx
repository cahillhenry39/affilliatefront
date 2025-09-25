import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import { formatDateOnly } from "../../utils/helpers";

const StyledContainer = styled.div`
  width: 100%;
  height: 20rem;

  /* background-color: red; */

  @media (max-width: 600px) {
    height: 18rem;
  }
`;

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const currentRate = payload.find((item) => item.dataKey === "uv")?.value;
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #ccc",
          padding: "10px 14px",
          borderRadius: "6px",
          color: "#333",
          fontSize: "0.85rem",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.315)",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold" }}>{label}</p>
        <p style={{ margin: "6px 0", fontWeight: "bold", color: "#8884d8" }}>
          Current Value:{" "}
          {`$${new Intl.NumberFormat("en-US", {
            notation: "compact",
            maximumFractionDigits: 1,
          }).format(currentRate)}`}
        </p>
      </div>
    );
  }
  return null;
};

// const data = [
//   { name: "Page A", uv: 4000 },
//   { name: formatDateOnly(new Date()), uv: 3000 },
//   { name: "Page C", uv: 2000 },
//   { name: "Page D", uv: 2780 },
//   { name: "Page E", uv: 1890 },
//   { name: "Page F", uv: 2390 },
//   { name: "Page G", uv: 3490 },
//   { name: "Page H", uv: 2100 },
//   { name: "Page I", uv: 3000 },
//   { name: "Page J", uv: 2500 },
// ];

function StockCharts({ weeklyValues }) {
  const parsedData = weeklyValues ? JSON.parse(weeklyValues) : [];

  const sevenDaysData = parsedData
    ?.slice(parsedData?.length - 7, parsedData?.length)
    ?.map((each) => {
      return {
        name: each?.name
          ? formatDateOnly(each?.name)
          : formatDateOnly(new Date()),
        uv: +each?.value || 1,
      };
    });

  return (
    <StyledContainer>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={sevenDaysData}
          margin={{ top: 20, right: -20, left: 0, bottom: 0 }}
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8884d8" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="name"
            tick={false}
            interval={0} // show all labels
            tickLine={false} // hides the small tick marks (optional)
            axisLine={true} // keeps the axis line
          />
          <YAxis
            orientation="right"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) =>
              `$${new Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(value)}`
            }
          />

          {/* Tooltip */}
          <Tooltip content={<CustomTooltip />} />

          {/* Reference line without label */}
          {/* <ReferenceLine y={4000} stroke="red" strokeDasharray="3 3" /> */}

          {/* Area with sharp tip + light fill */}
          <Area
            // type="monotone"

            type={"monotone"}
            dataKey="uv"
            stroke="#8884d8"
            fill="#8884d85a"
            // fill="url(#colorUv)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledContainer>
  );
}

export default StockCharts;
