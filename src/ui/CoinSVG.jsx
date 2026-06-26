import styled from "styled-components";

const StyledGetCurrency = styled.span`
  display: flex;
  align-items: center;

  & svg {
    margin-right: 0.2rem;
    width: ${({ $width }) => $width || "8px"};
    fill: ${({ $color }) => $color || "var(--color-brand-200)"};
  }
`;

function CoinSVG({ color, width = "8px", strokeColor, strokeWidth = "2" }) {
  return (
    <StyledGetCurrency $color={color} $width={width}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={strokeColor || "currentColor"}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="8" r="6" />
        <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
        <path d="M7 6h1v4" />
        <path d="m16.71 13.88.7.71-2.82 2.82" />
      </svg>
    </StyledGetCurrency>
  );
}

export default CoinSVG;
