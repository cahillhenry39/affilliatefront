import styled from "styled-components";
import Button from "../../ui/Button";
import toast from "react-hot-toast";

const StyledAppSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Headings = styled.h2`
  font-size: 2.4rem;
  background-color: var(--color-grey-100);
  color: var(--color-grey-700);
  padding: 2rem 1rem;
  text-align: center;
  text-transform: capitalize;

  display: flex;
  flex-direction: column;

  & span {
    font-size: 1.4rem;
    color: var(--color-grey-500);
  }

  & img {
    height: 100%;
    width: 100%;

    margin-top: 3rem;
  }
`;

const InstructionPara = styled.p`
  font-size: 1.3rem;
  text-align: center;
  color: #c23400;
  font-weight: 700;
`;

function AppSectionDownload() {
  function saveFile(url, filename) {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "file-name";
    document.body.appendChild(a);
    a.click();
    toast.success("Success. App downloading...");
    document.body.removeChild(a);
  }

  return (
    <StyledAppSection>
      <Headings>
        <span> Performing task just got easier.</span> No more browser for
        Android.{" "}
      </Headings>
      <InstructionPara>
        Download and install using the button below{" "}
      </InstructionPara>

      <div>
        <img src="/mobile/doubleScreen.png" />
      </div>

      <Button
        type="secondary"
        onClick={() => saveFile("/bomerg.apk", "bomerg.apk")}
      >
        download here
      </Button>
    </StyledAppSection>
  );
}

export default AppSectionDownload;
