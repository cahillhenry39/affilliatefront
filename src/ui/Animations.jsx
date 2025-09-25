import { keyframes } from "styled-components";

export const rotate = keyframes`
 
  0% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }

`;

export const expand = keyframes`
 
  0% { transform: scale(1) }
  25% { transform: scale(1.2); }
  50% { transform: scale(1.07); }
  75% { transform: scale(1.3); }
  100% { transform: scale(1.1); }
  /* 100% { transform: rotate(0deg); } */

`;

export const jumpUpAndDown = keyframes`
 
  0% { transform: translatey(100%) }
  25% { transform: translatey(-20%); }
  50% { transform: translatey(-10%); }
  75% { transform: translatey(-20%); }
  /* 100% { transform: rotate(0deg); } */

`;
