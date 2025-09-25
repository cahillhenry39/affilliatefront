import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import { useEffect } from "react";
import ButtonIcon from "./ButtonIcon";
import { Link } from "react-router-dom";
import { HiMiniEnvelope } from "react-icons/hi2";

const AmountInCart = styled.p`
  font-size: 1rem;
  background-color: var(--color-grey-50);
  font-weight: 600;

  position: absolute;
  top: -3px;
  right: -2px;
  & span {
    border: 1px solid var(--color-brand-700);
    background-color: orangered;
    color: var(--color-brand-50);
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

function MessageButton() {
  const { data } = useUser();
  const queryClient = useQueryClient();
  const { allNotification, isLoading: notification } = {};
  const { myReadNotification, isLoading } = {};

  const isWorking = notification || isLoading;

  const unReadNumber =
    Number(allNotification?.length) -
    (Number(myReadNotification?.[0]?.totalNumberRead) || 0);

  useEffect(
    function () {
      const timer = setInterval(() => queryClient.invalidateQueries(), 5000);

      return () => clearInterval(timer);
    },
    [queryClient]
  );

  return (
    <ButtonIcon>
      <Link to="/app/all_notification">
        <HiMiniEnvelope />
      </Link>

      {!isWorking ? (
        <AmountInCart>
          {unReadNumber > 0 ? <span>{unReadNumber}</span> : ""}
        </AmountInCart>
      ) : (
        ""
      )}
    </ButtonIcon>
  );
}

export default MessageButton;
