import { Boxes, Group, ShoppingCart } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";
import {
  arrayRange,
  formatCurrency,
  formatCurrencyParts,
  formatTextCapitalize,
} from "../../utils/helpers";
import Input from "../../ui/Input";
import SelectInput from "../../ui/SelectInput";
import FormRow from "../../ui/FormRow";
import useUser from "../authentication/useUser";
import toast from "react-hot-toast";
import { useBuyStock } from "./useVault";

const HeaderTopContainer = styled.div`
  display: grid;
  grid-template-columns: 5rem 1fr;

  background-color: var(--color-grey-0);
  padding: 4.5rem 2rem 1rem;
  border-radius: 11px;
`;

const AmountValueContainer = styled.div`
  background-color: var(--color-green-backColors);
  overflow: hidden;
  padding: 0.5rem 1rem;
  border-radius: 9px;

  position: absolute;
  top: 1rem;
  right: 2rem;

  & p {
    color: #000;
    font-weight: 600;
    font-size: 1.4rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0rem;

  & p {
    color: var(--color-grey-800);
    font-size: 1.6rem;
    font-weight: 500;
  }

  & span {
    color: var(--color-grey-500);
    font-size: 1.3rem;
  }
`;

const ImageLogo = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: var(--color-grey-10);
  overflow: hidden;

  & img {
    height: 4rem;
    width: 4rem;
    margin: 0 auto;
    box-shadow: 0 1px 5px #00000011;
  }
`;

const CardContainer = styled.div`
  background-color: var(--color-grey-0);
  padding: 1rem 0rem 6rem;
`;

const Header = styled.div`
  /* padding: 24px 24px 0 24px; */
  padding: 2rem 0rem 2rem 2rem;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const Content = styled.div`
  padding: 0rem 2rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Summary = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  margin-top: 1rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SummaryLabel = styled.span`
  color: var(--color-grey-400);
`;

const SummaryValue = styled.span`
  font-weight: 600;
  color: var(--color-grey-700);
`;

const SummaryDivider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-grey-200);
  margin: 4px 0;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

const TotalLabel = styled.span`
  color: var(--color-grey-700);
`;

const TotalValue = styled.span`
  color: var(--color-brand-700);
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem 0.5rem;
  background: var(--color-brand-700);
  color: var(--color-brand-50);

  border: none;
  border-radius: 6px;
  font-size: 1.6rem;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background: var(--color-brand-800);
  }

  &:focus {
    outline: none;
    background: var(--color-brand-700);
  }

  &:disabled {
    background: var(--color-grey-300);
  }
`;

const IconContainer = styled.div`
  display: flex;

  position: absolute;
  left: 1rem;

  & svg {
    width: 2rem;
  }
`;

function PurchaseSTockForm({ setShowPage, singleStock, getCompanuDetails }) {
  const { expenseBal } = useUser();

  const { purchaseStock, isPending } = useBuyStock();

  const isWorking = isPending;

  const currentRate = getCompanuDetails?.currentExchange;

  const { sector, symbole, logo, price, id } = singleStock;

  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState("market");
  const [limitPrice, setLimitPrice] = useState(price);

  const totalCost =
    orderType === "market" ? quantity * price : quantity * limitPrice;

  const { amount: usdBalance } = formatCurrencyParts(
    expenseBal / currentRate,
    "USD"
  );

  const { amount: stockUsdAmount } = formatCurrencyParts(price, "USD");

  const isInsufficient = expenseBal / currentRate < totalCost;

  function handleSubmitStockRequest() {
    if (!quantity) {
      toast.error("Select quantity to continue");
      return;
    }
    if (isInsufficient) {
      toast.error("Your balance is insufficient for this transaction");
      return;
    }

    const newData = {
      quantity,
      totalCost,
      stockId: id,
    };

    purchaseStock(newData, {
      onSuccess: () => {
        setShowPage("main");
        toast.success(`You have successfully purchased stock with ${symbole}`);
      },
    });
  }

  return (
    <>
      <HeaderTopContainer>
        <ImageLogo>
          <img src={logo || "/logos/2.png"} />
        </ImageLogo>

        <ContentContainer>
          <p>{formatTextCapitalize(symbole)}</p>
          <span>
            {formatTextCapitalize(symbole)} - {formatTextCapitalize(sector)}
          </span>
        </ContentContainer>

        <AmountValueContainer>
          <p>${stockUsdAmount}</p>
        </AmountValueContainer>
      </HeaderTopContainer>

      <CardContainer>
        <Header>
          <Title>
            <ShoppingCart size={20} />
            Purchase {formatTextCapitalize(symbole)}
          </Title>
        </Header>
        <Content>
          <Form>
            <FieldGroup>
              <FormRow label={"Quantity"}>
                <>
                  <SelectInput
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  >
                    <option value={""}>Select Quantity</option>
                    {arrayRange(1, 10, 1)?.map((each, i) => (
                      <option value={each} key={i}>
                        {each}
                      </option>
                    ))}
                  </SelectInput>

                  <IconContainer>
                    <Boxes />
                  </IconContainer>
                </>
              </FormRow>
            </FieldGroup>
            <FieldGroup>
              <FormRow label={"Order Type"}>
                <>
                  <SelectInput
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value)}
                  >
                    <option value="market">Market Order</option>
                  </SelectInput>

                  <IconContainer>
                    <Group />
                  </IconContainer>
                </>
              </FormRow>
            </FieldGroup>
            {orderType === "limit" && (
              <FieldGroup>
                <FormRow label={"Limit Price"}>
                  <>
                    <Input
                      id="limitPrice"
                      type="number"
                      step="0.01"
                      min="0"
                      value={limitPrice}
                      onChange={(e) => setLimitPrice(Number(e.target.value))}
                      large
                    />
                  </>
                </FormRow>
              </FieldGroup>
            )}
            <Summary>
              <SummaryRow>
                <SummaryLabel>Shares:</SummaryLabel>
                <SummaryValue>{quantity}</SummaryValue>
              </SummaryRow>

              <SummaryRow>
                <SummaryLabel>Price per share:</SummaryLabel>
                <SummaryValue>
                  $
                  {orderType === "market"
                    ? formatCurrencyParts(price)?.amount
                    : formatCurrencyParts(limitPrice)?.amount}
                </SummaryValue>
              </SummaryRow>

              <SummaryRow>
                <SummaryLabel>Your balance:</SummaryLabel>
                <SummaryValue>
                  ${formatCurrencyParts(usdBalance)?.amount}
                </SummaryValue>
              </SummaryRow>

              <SummaryRow>
                <SummaryLabel>Exchange Rate:</SummaryLabel>
                <SummaryValue>x {currentRate}</SummaryValue>
              </SummaryRow>

              <SummaryDivider />

              <TotalRow>
                <TotalLabel>Total Cost:</TotalLabel>
                <TotalValue>
                  ${formatCurrencyParts(totalCost)?.amount}
                </TotalValue>
              </TotalRow>
            </Summary>
            <Button
              type="submit"
              disabled={isInsufficient || totalCost < 1}
              onClick={handleSubmitStockRequest}
            >
              {isWorking
                ? "Processing..."
                : isInsufficient
                ? `Insufficient balance.  Deposit ${formatCurrency(
                    (totalCost - expenseBal / currentRate) * currentRate
                  )}`
                : `Place ${
                    orderType.charAt(0).toUpperCase() + orderType.slice(1)
                  }
              Order`}
            </Button>
          </Form>
        </Content>
      </CardContainer>
    </>
  );
}

export default PurchaseSTockForm;
