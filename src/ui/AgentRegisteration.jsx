import styled from "styled-components";
import FormRow from "./FormRow";
import Input from "./Input";
import Button from "./Button";
import SpinnerAndText from "./SpinnerAndText";
import { useSignup } from "../features/authentication/useSignUp";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const StyledAgentRegister = styled.form`
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function AgentRegisteration() {
  const { signup, isPending } = useSignup();

  const { register, handleSubmit } = useForm();

  function createAgent(data) {
    signup(data, {
      onSuccess: () => toast.success("Agent registered successfully"),
    });
  }

  return (
    <StyledAgentRegister onSubmit={handleSubmit(createAgent)}>
      <FormRow label="Full Name">
        <Input id="fullName" {...register("fullName")} />
      </FormRow>

      <FormRow label="Email add">
        <Input id="email" {...register("email")} />
      </FormRow>

      <FormRow label="Pin">
        <Input id="pin" {...register("pin")} />
      </FormRow>

      <FormRow label="Password">
        <Input id="password" {...register("password")} />
      </FormRow>

      <FormRow label="type">
        <Input id="type" {...register("type")} />
      </FormRow>

      <Button type="primary">
        {isPending ? <SpinnerAndText message="registering" /> : "register"}
      </Button>
    </StyledAgentRegister>
  );
}

export default AgentRegisteration;
