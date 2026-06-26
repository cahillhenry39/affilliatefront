import { useEffect, useState } from "react";
import styled from "styled-components";

const GetPinDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  & p {
    font-size: 1.2rem;
    text-align: center;
  }
`;

const StyledInput = styled.div`
  display: flex;
  gap: 1rem;
`;

const Input = styled.input`
  width: 4rem;
  padding: 0 1rem;
  color: #374151;
  background-color: #f9fafb;
  border: 1px solid;
  box-shadow: 2px 2px 4px #00000022;
`;

function PinTransaction({ isWorking, setTransactionPin }) {
  const [pin_1, setPin_1] = useState("");
  const [pin_2, setPin_2] = useState("");
  const [pin_3, setPin_3] = useState("");
  const [pin_4, setPin_4] = useState("");

  useEffect(function () {
    const container = document.getElementsByClassName("inputContianer")[0];

    container.onkeyup = function (e) {
      var target = e.srcElement || e.target;
      var maxLength = parseInt(target.attributes["maxlength"].value, 10);
      var myLength = target.value.length;
      if (myLength >= maxLength) {
        var next = target;
        while ((next = next.nextElementSibling)) {
          if (next == null) break;
          if (next.tagName.toLowerCase() === "input") {
            next.focus();
            break;
          }
        }
      }
      // Move to previous field if empty (user pressed backspace)
      else if (myLength === 0) {
        var previous = target;
        while ((previous = previous.previousElementSibling)) {
          if (previous == null) break;
          if (previous.tagName.toLowerCase() === "input") {
            previous.focus();
            break;
          }
        }
      }
    };
  }, []);

  useEffect(
    function () {
      if (pin_1 && pin_2 && pin_3 && pin_4) {
        setTransactionPin(`${pin_1}${pin_2}${pin_3}${pin_4}`);
      }

      if (!pin_1 || !pin_2 || !pin_3 || !pin_4) {
        setTransactionPin("");
      }
    },
    [pin_4, pin_1, pin_2, pin_3, setTransactionPin]
  );

  return (
    <GetPinDiv>
      <p>Provide your pin</p>

      <StyledInput className="inputContianer">
        <Input
          type="tel"
          value={pin_1}
          maxLength={1}
          disabled={isWorking}
          onChange={(e) => {
            if (
              Number(e.target.value) ||
              Number(e.target.value) === 0 ||
              !e.target.value
            ) {
              setPin_1(e.target.value);
            }
            if (!Number(e.target.value)) {
              return;
            }
          }}
        />
        <Input
          type="tel"
          maxLength={1}
          value={pin_2}
          disabled={isWorking}
          onChange={(e) => {
            if (
              Number(e.target.value) ||
              Number(e.target.value) === 0 ||
              !e.target.value
            ) {
              setPin_2(e.target.value);
            }
            if (!Number(e.target.value)) {
              return;
            }
          }}
        />
        <Input
          type="tel"
          maxLength={1}
          value={pin_3}
          disabled={isWorking}
          onChange={(e) => {
            if (
              Number(e.target.value) ||
              Number(e.target.value) === 0 ||
              !e.target.value
            ) {
              setPin_3(e.target.value);
            }
            if (!Number(e.target.value)) {
              return;
            }
          }}
        />
        <Input
          type="tel"
          maxLength={1}
          value={pin_4}
          disabled={isWorking}
          onChange={(e) => {
            if (
              Number(e.target.value) ||
              Number(e.target.value) === 0 ||
              !e.target.value
            ) {
              setPin_4(e.target.value);
            }
            if (!Number(e.target.value)) {
              return;
            }
          }}
        />
      </StyledInput>
    </GetPinDiv>
  );
}

export default PinTransaction;
