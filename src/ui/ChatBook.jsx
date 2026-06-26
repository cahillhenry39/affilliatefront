import { useState } from "react";
import { HiChatBubbleOvalLeft } from "react-icons/hi2";
import styled from "styled-components";
import { jumpUpAndDown } from "./Animations";
import { device } from "../../mediaQuery";
import { useCreateBootChat } from "../services/useBootChat";

const StyledChatBoot = styled.div`
  position: fixed;
  right: 0;
  bottom: 2rem;
  z-index: 1010;
`;

const MessageDisplayBtn = styled.div`
  margin-right: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${jumpUpAndDown} 5.55s infinite linear;
  cursor: pointer;

  & p {
    font-size: 1.5rem;
    color: var(--color-grey-800);
    text-align: center;
    color: orangered;
    display: none;
  }
`;

const DivSvgHelper = styled.div`
  width: 7rem;
  height: 7rem;
  background-color: var(--color-brand-900);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0px 15px 15px #0000002b;
  @media ${device.mobileL} {
    width: 5rem;
    height: 5rem;
  }

  & svg {
    width: 3em;
    height: 3rem;
    color: var(--color-brand-200);

    @media ${device.mobileL} {
      width: 2em;
      height: 2rem;
    }
  }
`;

const steps = [
  {
    id: "1",
    message:
      "Hi, I am Leo, Your assistant. Welcome to BOMERG. What is your name?",
    trigger: "2",
  },
  {
    id: "2",
    user: true,
    trigger: "3",
  },
  {
    id: "3",
    message:
      "Okey, {previousValue}, nice to meet you!. Please select a question below.",
    trigger: "4",
  },
  {
    id: "4",
    options: [
      {
        value: "Know more",
        label: "Know more about BOMERG",
        trigger: "knowMore",
      },
      {
        value: "How to Join",
        label: "I want to Join BOMERG?",
        trigger: "needToJoin",
      },
      { value: "package", label: "All Package", trigger: "package" },
      {
        value: "earn how much",
        label: "How much can i earn?",
        trigger: "earn how much",
      },
    ],
  },
  {
    id: "knowMore",
    message:
      "Bomerg is the best afiliate marketing system that help to promote and market mobile applications. It also help to increase users trust which in turn attract new users to download and use them.",
    trigger: "finalQuestion",
  },

  {
    id: "needToJoin",
    message:
      "Nice. We will be happy to have you on board. To join, you need to purchase a token linked with your package choice. Go to www.bomerg.com/new_user/register to get started.",
    trigger: "finalQuestion",
  },

  {
    id: "package",
    message:
      "We have multiple types of package. Each earns according to a special setup and integration. Go to www.bomerg.com/new_user/register  or login to your account to view all package.",
    trigger: "finalQuestion",
  },

  {
    id: "earn how much",
    message:
      "Your earnings depend solely on you. The more task you perform, the more you earn. You can within 2 months make massive income by performing all your tasks diligently.",
    trigger: "finalQuestion",
  },

  {
    id: "finalQuestion",
    message: "To gain more insight, tell us how we can reach you back?",
    trigger: "collectDetails",
  },
  {
    id: "collectDetails",
    options: [
      {
        value: "email",
        label: "Email",
        trigger: "email",
      },
      { value: "whatsapp", label: "WhatsApp", trigger: "whatsapp" },
    ],
  },

  {
    id: "email",
    message: "Tell me your email",
    trigger: "semiFinal",
  },

  {
    id: "whatsapp",
    message:
      "Provide you WhatsApp number starting with your country code (ex: +234 your number)",
    trigger: "semiFinal",
  },

  {
    id: "semiFinal",
    user: true,
    trigger: "final",
  },
  {
    id: "final",
    message:
      "Okey, {previousValue}, a representative will get in touch with you!. bye",
    end: true,
  },
];

function Chatboot() {
  const [showChat, setShowChat] = useState(false);
  const { createBootChat } = useCreateBootChat();

  // other props renderedSteps, steps,

  function handleEnd({ values }) {
    const newData = {
      userName: values?.[0] || "error",
      userChoice: values?.[1] || "error",
      contactType: values?.[2] || "error",
      contact: values?.[3 || "error"],
    };

    createBootChat(newData, {
      onSuccess: () => {
        setTimeout(() => setShowChat(false), 10000);
      },
    });
  }

  return (
    <StyledChatBoot>
      {showChat ? (
        // <ChatBot
        //   floating={true}
        //   floatingStyle={{ right: "1px", bottom: "1px" }}
        //   opened={showChat}
        //   toggleFloating={() => setShowChat(false)}
        //   enableMobileAutoFocus={true}
        //   headerTitle="BOMERG - Chat with Leo"
        //   steps={steps}
        //   handleEnd={handleEnd}
        //   // style={{ background: "red" }}
        // />
        "hello"
      ) : (
        <MessageDisplayBtn>
          <p>Hi, let&apos;s chat</p>

          <DivSvgHelper>
            <HiChatBubbleOvalLeft onClick={() => setShowChat(true)} />
          </DivSvgHelper>
        </MessageDisplayBtn>
      )}
    </StyledChatBoot>
  );
}

export default Chatboot;
