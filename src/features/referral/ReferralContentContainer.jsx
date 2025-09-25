import { useCopyToClipboard } from "@uidotdev/usehooks";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { HiClipboardDocument } from "react-icons/hi2";
import QRCode from "react-qr-code";
import styled, { css } from "styled-components";

const ReferralCOndenformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--color-grey-0);
  padding: 1rem 1rem 2rem;
  margin: 1rem;
  border-radius: 9px;
`;

const ReferralNarrationContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3rem 1fr 3rem 1fr;
  align-items: center;
  gap: 1rem;
  background-color: var(--color-grey-0);
  padding: 1rem 0.5rem;
  margin: 1rem;

  & aside {
    color: var(--color-brand-700);
    text-align: center;
  }
`;

const EachMainReferralNarrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.21rem;
  background-color: var(--color-grey-0);

  & span {
    font-size: 0.61rem;
    text-align: center;
  }

  & div {
    width: 3.5rem;
    height: 3.5rem;
    background-color: var(--color-grey-10);
    border-radius: 50%;
  }
`;

const MainReferralCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.21rem;
  border-top: 1px solid var(--color-grey-10);
  padding-top: 1rem;

  & span {
    font-size: 1.2rem;
    color: var(--color-grey-700);
  }
`;

const TextReferralLink = styled.div`
  display: grid;
  grid-template-columns: 1fr 3rem;
  align-items: center;
  gap: 1.5rem;

  & p {
    font-size: 1.3rem;
    padding: 1rem 1.5rem;
    border-radius: 9px;
  }

  & svg {
    width: 2.5rem;
    height: 2.5rem;
    color: var(--color-brand-700);
  }

  ${(props) =>
    props?.$isDarkMode === "true"
      ? css`
          & p {
            background-color: var(--color-green-backColor);
            color: var(--color-brand-100);
          }
        `
      : css`
          & p {
            background-color: var(--color-green-backColors);
            color: var(--color-brand-800);
          }
        `}
`;

const QRCodeDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  padding: 2rem;
  border-radius: 9px;
  & p {
    font-size: 1rem;
    background-color: var(--color-grey-0);
    padding: 0.3rem 1rem;
    border-radius: 9px;
  }

  ${(props) =>
    props?.$isDarkMode === "true"
      ? css`
          background-color: var(--color-green-backColor);
        `
      : css`
          background-color: var(--color-green-backColors);
        `}
`;

const QRCodeReader = styled.div`
  display: flex;
  justify-content: center;
  /* width: 10rem; */
`;

function ReferralContentContainer({ referralUrl, isDarkMode }) {
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const hasCopiedText = Boolean(copiedText);

  useEffect(
    function () {
      if (hasCopiedText) toast.success(`${copiedText} copied`);
    },
    [hasCopiedText, copiedText]
  );

  return (
    <ReferralCOndenformationContainer>
      <ReferralNarrationContainer>
        <EachMainReferralNarrationContainer>
          <div>
            <img src="/app/referral1.svg" />
          </div>
          <span>Share invitation link / code with friends</span>
        </EachMainReferralNarrationContainer>

        <aside>--</aside>

        <EachMainReferralNarrationContainer>
          <div>
            <img src="/app/referral2.svg" />
          </div>
          <span>Friends subscribes to any available package</span>
        </EachMainReferralNarrationContainer>

        <aside>--</aside>

        <EachMainReferralNarrationContainer>
          <div>
            <img src="/app/referral3.svg" />
          </div>
          <span>You will receive referral bonus</span>
        </EachMainReferralNarrationContainer>
      </ReferralNarrationContainer>

      <MainReferralCodeContainer>
        <span>Your referral code</span>

        <TextReferralLink $isDarkMode={isDarkMode?.toString()}>
          <p>https://....{referralUrl?.slice(21)}</p>
          <HiClipboardDocument
            onClick={() =>
              copyToClipboard(`https://taskiit.com/${referralUrl}`)
            }
          />
        </TextReferralLink>
      </MainReferralCodeContainer>

      <QRCodeDiv $isDarkMode={isDarkMode?.toString()}>
        <p>Scan on any device to reveal your referral code</p>

        <QRCodeReader>
          <QRCode
            value={`https://taskiit.com/${referralUrl}` || "Nothing here"}
            style={{
              height: "auto",
              maxWidth: "60%",
              width: "100%",
              margin: "auto",
            }}
          />
        </QRCodeReader>
      </QRCodeDiv>
    </ReferralCOndenformationContainer>
  );
}

export default ReferralContentContainer;
