import styled from "styled-components";
import FormRow from "../../ui/FormRow";
import SelectInput from "../../ui/SelectInput";
import Button from "../../ui/Button";
import Textarea from "../../ui/TextArea";
import { HiMiniFaceSmile } from "react-icons/hi2";
import BackButton from "../../ui/BackButton";
import { useForm } from "react-hook-form";
import { useCreateHelpDesk } from "../../features/customerCare/useHelpDesk";
import toast from "react-hot-toast";
import useUser from "../../features/authentication/useUser";
import SpinnerAndText from "../../ui/SpinnerAndText";
import { IoLogoWhatsapp } from "react-icons/io";
import { useGetAllContact } from "../../features/allPackage/usePackage";
import Spinner from "../../ui/Spinner";

const Headings = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: #fff;
  margin-top: 2rem;

  & span {
    background-color: #94320e;
    padding: 1rem 2rem;
    box-shadow: 0px 5px 5px #00000055;
  }
`;

const StyledCustomerCare = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  & img {
    width: 7rem;
  }
`;

const ImageAndHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & p {
    font-size: 1.3rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterP = styled.p`
  font-size: 1rem;
  text-align: center;
  color: var(--color-brand-100);
`;

const IconPrefix = styled.span`
  position: absolute;

  padding: 0rem 0.3rem;
  margin-left: 0.5rem;
  height: 30%;

  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-700);
  }

  & img {
    width: 2rem;
    height: auto;
  }
`;

const ButtonPara = styled.p`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;

  & svg {
    width: 2rem;
    height: 2rem;
  }

  color: #b5ebb5;
  text-decoration: underline;
`;

function CustomerCare() {
  const {
    data: { id, email, user_metadata },
  } = useUser();
  const { phoneNum } = user_metadata?.personal || {};

  const { formState, register, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const { sendMessage, isPending } = useCreateHelpDesk();

  const { allContact, isLoading: isContact } = useGetAllContact();
  if (isContact) return <Spinner />;

  const { phone } = allContact?.[0] || {};

  function handleSendMessage(data) {
    const newData = {
      topic: data.topic,
      message: data.message,
      usersId: id,
      usersEmail: email,
      usersPhone: phoneNum,
      type: "Help",
      isAnswered: false,
    };

    sendMessage(newData, {
      onSuccess: () => {
        toast.success("Your message was sent successfully");
        reset();
      },
    });
  }

  return (
    <>
      <div>
        <BackButton />
      </div>
      <StyledCustomerCare>
        <ImageAndHead>
          <img src="/others/care.png" />
          <p>Help Desk</p>
        </ImageAndHead>

        <Headings type="h3">
          <span>Send your enquires to us</span>
        </Headings>

        <Form onSubmit={handleSubmit(handleSendMessage)}>
          <FormRow label="Topic" must error={errors?.topic?.message}>
            <>
              <SelectInput
                disabled={isPending}
                id="topic"
                {...register("topic", {
                  required: "This field is required",
                })}
              >
                {[
                  {
                    value: "",
                    option: "Choose a topic",
                  },
                  {
                    value: "about my account",
                    option: "Enquires about my account",
                  },
                  {
                    value: "about withdrawal",
                    option: "Withdrawal issues",
                  },
                  {
                    value: "about deposit",
                    option: "Deposit issues",
                  },
                  {
                    value: "about referral",
                    option: "Enquires regarding my referrals",
                  },
                  {
                    value: "can not upgrade",
                    option: "Issues with upgrading",
                  },
                  {
                    value: "vault",
                    option: "Enquires on vault ",
                  },
                  {
                    value: "Report a user",
                    option: "report a user",
                  },
                  {
                    value: "others",
                    option: "others",
                  },
                ].map((el, i) => (
                  <option value={el.value} key={i}>
                    {el.option}
                  </option>
                ))}
              </SelectInput>

              <IconPrefix>
                <HiMiniFaceSmile />
              </IconPrefix>
            </>
          </FormRow>

          <FormRow label="Message" must error={errors?.message?.message}>
            <Textarea
              disabled={isPending}
              id="message"
              {...register("message", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <Button type="primary" disabled={isPending}>
            {isPending ? <SpinnerAndText message="sending" /> : "Submit"}
          </Button>

          <a href={`https://wa.me/${phone}`} rel="noreferrer" target="_blank">
            <ButtonPara>
              <IoLogoWhatsapp />
              Or Chat with us here
            </ButtonPara>
          </a>
          <FooterP>We will be delighted to hear from you</FooterP>
        </Form>
      </StyledCustomerCare>
    </>
  );
}

export default CustomerCare;
