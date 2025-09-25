import styled from "styled-components";

const TermsAndConditions = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 1.2rem;
  margin-top: -1rem;
  color: var(--color-brand-700);

  & span {
    color: var(--color-brand-800);
    text-decoration: underline;
  }
`;

function TermsAndConditionLink() {
  return (
    <TermsAndConditions>
      <p>By continuing you agree to our</p>
      <span>Terms and Conditions</span>
    </TermsAndConditions>
  );
}

export default TermsAndConditionLink;
