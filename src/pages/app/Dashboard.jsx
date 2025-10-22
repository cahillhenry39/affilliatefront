import styled, { css, keyframes } from "styled-components";
import DashboardStats from "../../features/dashboard/DashboardStats";
import { HiBanknotes, HiMiniUserGroup } from "react-icons/hi2";
import { Link } from "react-router-dom";
import MarqueeTEstimonial from "../../features/dashboard/MarqueeTEstimonial";
import AppHeader from "../../ui/AppHeader";
import Sidebar from "../../ui/Sidebar";
import TrophyWithStars from "../../features/dashboard/TrophySVG";

import { BadgePercent, Settings, ListCheck, LucideRocket } from "lucide-react";
import GameProgressBar from "../../ui/GameProgressBar";
import useUser from "../../features/authentication/useUser";
import { useEffect, useState } from "react";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const shake = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(10deg); }
  50% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
`;

const sparkle = keyframes`
  0%, 100% {
    opacity: 0;
    transform: scale(0.6) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.2) rotate(20deg);
  }
`;

const launch = keyframes`
  0% {
    transform:  translateY(0);
    opacity: 1;
  }
  70% {
    transform:  translateY(-150%);
    opacity: 1;
  }
  71% {
    opacity: 0;
    transform:  translateY(150%);
  }
  100% {
    opacity: 1;
    transform:  translateY(0);
  }
`;

const DashboardSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0rem 1rem;
`;

const Imagediv = styled.div`
  width: 100%;
  display: flex;
  border-radius: 9px;
  overflow: hidden;

  & img {
    height: 12rem;
    width: 100%;
    margin: 0 auto;
    box-shadow: 0 1px 5px #00000011;
  }
`;

const ActionBoxDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 1rem;
  row-gap: 1.5rem;

  background-color: var(--color-grey-0);
  padding: 1rem 1rem;
  border-radius: 9px;
  box-shadow: 0px 0px 4px #00000029;
`;

const Eachbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;

  & div {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  & svg {
    width: 2.5rem;
    height: 2.5rem;
  }

  & Img {
    width: 2.5rem;
    height: 2.5rem;
    animation: ${spin} 4s linear infinite;
  }

  ${(props) =>
    props.$colorType &&
    css`
      & div {
        background-color: ${props.$backColorType};
      }

      & svg {
        color: ${props.$colorType};
      }
    `}

  & p {
    font-size: 1rem;
    color: var(--color-grey-500);
    text-transform: uppercase;
    font-weight: 600;
  }
`;

const ShakeWrapper = styled.div`
  ${({ $shaking }) =>
    $shaking &&
    css`
      animation: ${shake} 0.5s ease-in-out;
    `}
`;

const NewNotification = styled.span`
  position: absolute;
  top: -0.5rem;
  right: 30%;
  transform: translate(50%, 0);
  background-color: orangered;
  color: var(--color-grey-0);
  font-size: 1rem;

  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Sparkle = styled.span`
  position: absolute;
  font-size: ${({ size }) => size || ".61rem"};
  top: ${({ top }) => top || "0%"};
  left: ${({ left }) => left || "0%"};
  opacity: 0;
  animation: ${sparkle} ${({ duration }) => duration || 2}s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay || 0}s;
  pointer-events: none;
`;

const sparkles = [
  { top: "5%", left: "22%", size: ".81rem", delay: 0.2 },
  { top: "10%", left: "70%", size: ".31rem", delay: 1.1 },
  { top: "40%", left: "24%", size: "0.6rem", delay: 0.7 },
  { top: "30%", left: "70%", size: ".5rem", delay: 1.6 },
  { top: "55%", left: "60%", size: ".31rem", delay: 0.4 },
  // { top: "-5%", left: "60%", size: ".71rem", delay: 1.8 },
];

const RocketLauncher = styled.div`
  display: inline-block;
  overflow: hidden;
  position: relative;

  svg {
    transform-origin: center;
  }
`;

const RocketMover = styled.div`
  animation: ${launch} 4s ease-in-out infinite;
`;

const RotatedRocket = styled.div`
  transform: rotate(-45deg);
`;

function Dashboard() {
  const { currentPercentage, spinningReward } = useUser();
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShaking(true);
      setTimeout(() => setShaking(false), 1000);
    }, 4000); // every 4 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AppHeader />

      <DashboardSection>
        <DashboardStats />

        <GameProgressBar currentPercentage={currentPercentage} />

        <Imagediv>
          <img src="/gif/5.gif" />
        </Imagediv>

        {/* <Headings type="h3">
        <span>Quick Actions</span>
      </Headings> */}

        <ActionBoxDiv>
          <Link to="/app/task">
            <Eachbox $colorType={" #4B0082 "} $backColorType={" #4c008229"}>
              <ShakeWrapper $shaking={shaking}>
                <TrophyWithStars />
              </ShakeWrapper>
              <p>TASK</p>
            </Eachbox>
          </Link>

          <Link to="/app/account/details">
            <Eachbox $colorType={"#702963"} $backColorType={" #70296329"}>
              <RocketLauncher>
                {/* <HiMiniRocketLaunch /> */}

                {/* <Rocket /> */}

                <RocketMover>
                  <RotatedRocket>
                    <LucideRocket />
                  </RotatedRocket>
                </RocketMover>

                {/* <aside
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "10px",
                    height: "10px",
                    background: "orange",
                    borderRadius: "50%",
                    filter: "blur(4px)",
                    opacity: 0.8,
                    animation: "flicker 0.3s infinite alternate",
                  }}
                /> */}
              </RocketLauncher>
              <p>UPGRADE</p>
            </Eachbox>
          </Link>

          <Link to="/app/all_deposit">
            <Eachbox $colorType={"#228b22"} $backColorType={" #228b2229"}>
              <div>
                <HiBanknotes />
              </div>
              <p>Deposit</p>
            </Eachbox>
          </Link>

          {/* <Link to="/app/package_details">
          <Eachbox $colorType={"#560000"}>
            <HiMiniRectangleStack />
            <p>Package</p>
          </Eachbox>
        </Link> */}

          <Link to="/app/stock">
            <Eachbox $colorType={"#560000"} $backColorType={" #56000029"}>
              <div>
                <BadgePercent />

                {sparkles.map((s, i) => (
                  <Sparkle key={i} {...s}>
                    💥
                  </Sparkle>
                ))}
              </div>
              <p>stock</p>
            </Eachbox>
          </Link>

          <Link to="/app/rewards">
            <Eachbox $colorType={"#9acd32"} $backColorType={" #99cd3240"}>
              <div>
                {spinningReward?.length ? (
                  <NewNotification>{spinningReward?.length}</NewNotification>
                ) : (
                  ""
                )}

                <img src="/app/spinner.png" />
              </div>
              <p>Rewards</p>
            </Eachbox>
          </Link>

          <Link to="/app/task/history">
            <Eachbox $colorType={"#a94064"} $backColorType={" #a9406529"}>
              <div>
                <ListCheck />
              </div>
              <p>Histories</p>
            </Eachbox>
          </Link>

          <Link to="/app/referral">
            <Eachbox $colorType={"#228b22"} $backColorType={" #228b2229"}>
              <div>
                <HiMiniUserGroup />
              </div>
              <p>Referral</p>
            </Eachbox>
          </Link>

          <Link to="/app/settings">
            <Eachbox $colorType={"#a94064"} $backColorType={" #a9406529"}>
              <div>
                <Settings />
              </div>
              <p>Settings</p>
            </Eachbox>
          </Link>

          {/* <Link to="/app/about_us">
          <Eachbox $colorType={" #4B0082 "}>
            <HiIdentification />
            <p>About us</p>
          </Eachbox>
        </Link> */}
        </ActionBoxDiv>

        <MarqueeTEstimonial />
      </DashboardSection>

      <Sidebar />
    </>
  );
}

export default Dashboard;
