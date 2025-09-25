import styled from "styled-components";
import HeaderNavigationBack from "../../ui/HeaderNavigationBack";
import { FiGift, FiMinusCircle } from "react-icons/fi";
import { HiCheckCircle } from "react-icons/hi2";
import {
  formatCurrency,
  formatDate2,
  formatTextCapitalize,
} from "../../utils/helpers";
import { useParams } from "react-router-dom";
import {
  useCashoutStock,
  useFetchSingleStockPuchase,
} from "../../features/vault/useVault";
import TaskLoader from "../../features/task/TaskLoader";
import { addDays, isFuture } from "date-fns";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useGetCompanyDetails } from "../../services/useCompanyDetails";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  height: 100vh;
  overflow-y: scroll;
  padding-bottom: 11rem;

  &::-webkit-scrollbar {
    width: 0rem;
  }
`;

const StyledFirstContainer = styled.div`
  position: relative;

  background-color: var(--color-grey-0);
  padding: 4rem 2rem 2rem;
  margin: 1rem 1rem 0rem;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  border-radius: 9px;
`;

const SVGContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 4rem;
  width: 4rem;
  background-color: ${({ $backColor }) => $backColor || "var(--color-grey-10)"};
  color: ${({ $color }) => $color || "var(--color-grey-700)"};

  position: absolute;
  top: -1.5rem;
  right: 50%;
  transform: translate(50%, 0);

  & svg {
    width: 2.5rem;
    height: 2.5rem;
    color: inherit;
  }
`;

const MessageTitlePara = styled.p`
  font-size: 1.5rem;
  color: var(--color-grey-900);
`;

const AmountH3 = styled.h3`
  font-size: 2rem;
  color: var(--color-grey-800);
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.21rem;
  text-align: center;

  & p {
    font-size: 1.2rem;
  }

  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const CreditPara = styled.p`
  color: var(--color-brand-700);
`;
const SuccessSVG = styled(HiCheckCircle)`
  color: var(--color-brand-700);
`;

const PendingPara = styled.p`
  color: #a50da5;
`;

const PendingSVG = styled(HiCheckCircle)`
  color: #a50da5;
`;

const StyledSecondContainer = styled.div`
  background-color: var(--color-grey-0);
  padding: 4rem 2rem 2rem;
  margin: 0rem 1rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 9px;
`;

const StyledSecondHeader = styled.p`
  font-size: 1.5rem;
  color: var(--color-grey-800);
  margin-bottom: 1rem;
  font-weight: 600;
`;

const EachSecondContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & div {
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    & p {
      font-size: 1.2rem;
      color: var(--color-grey-500) !important;
    }

    & span {
      font-size: 1.4rem;
      color: var(--color-grey-700);
    }
  }
`;

const StyledButton = styled.div`
  margin: 0rem 1rem;

  display: flex;

  & button {
    width: 100%;
    padding: 1rem 2rem;
    border: none;
    border-radius: 11px;
    background-color: var(--color-brand-700);
    color: var(--color-brand-50);
    font-size: 1.6rem;

    &:disabled {
      background-color: var(--color-grey-200);
    }
  }
`;

function SingleViewStockPurchase() {
  const { stockId, id } = useParams();
  const { singleStock, isLoading, purchaseStock } = useFetchSingleStockPuchase(
    stockId,
    id
  );
  const { getCompanuDetails } = useGetCompanyDetails();

  const queryClient = useQueryClient();

  const { cashOutStock, isPending } = useCashoutStock();

  const disabled =
    isPending ||
    isFuture(new Date(addDays(new Date(purchaseStock?.created_at), 14)));

  function handleCashoutStock() {
    if (isFuture(new Date(addDays(new Date(purchaseStock?.created_at), 14)))) {
      toast.error("You can only withdraw from stock after 14 days of purchase");

      return;
    }

    if (purchaseStock?.isCashedOut) {
      toast.error("You have already exited from this stock.");

      return;
    }

    const newData = {
      stockId,
      purchaseId: id,
    };

    cashOutStock(newData, {
      onSuccess: () => {
        queryClient.invalidateQueries();
        toast.success("Stock withdrawal was successful");
      },
    });
  }

  return (
    <>
      <HeaderNavigationBack text={"Stock Purchase Details"} />

      {isLoading ? (
        <TaskLoader />
      ) : (
        <StyledContainer>
          <StyledFirstContainer>
            {purchaseStock?.isCashedOut ? (
              <SVGContainer
                $backColor={"var(--color-green-backColor)"}
                $color={"var(--color-brand-700)"}
              >
                <FiGift />
              </SVGContainer>
            ) : (
              <SVGContainer $backColor={" #a50da528"} $color={" #a50da5"}>
                <FiMinusCircle />
              </SVGContainer>
            )}

            <MessageTitlePara>
              {formatTextCapitalize(
                purchaseStock?.isCashedOut ? "Cashed Out" : "Active"
              )}
            </MessageTitlePara>
            <AmountH3>
              {formatCurrency(
                purchaseStock?.quantity * singleStock?.price,
                "USD"
              )}
            </AmountH3>

            {purchaseStock?.isCashedOut ? (
              <StatusContainer>
                <SuccessSVG />
                <CreditPara>{"Successful"}</CreditPara>
              </StatusContainer>
            ) : (
              <StatusContainer>
                <PendingSVG />
                <PendingPara>{"Running..."}</PendingPara>
              </StatusContainer>
            )}
          </StyledFirstContainer>

          <StyledSecondContainer>
            <StyledSecondHeader>Transaction Details</StyledSecondHeader>

            <EachSecondContainer>
              <div>
                <p>User Name</p>
                <span>{formatTextCapitalize(purchaseStock?.fullName)}</span>
              </div>

              <div>
                <p>Reference</p>
                <span>{purchaseStock?.reference}</span>
              </div>

              <div>
                <p>Transaction Type</p>
                <span>{formatTextCapitalize("purchased stock")}</span>
              </div>

              <div>
                <p>Transaction Date</p>
                <span>{formatDate2(new Date(purchaseStock?.created_at))}</span>
              </div>

              <div>
                <p>Status</p>
                <span>
                  {formatTextCapitalize(
                    purchaseStock?.isCashedOut ? "Cashed out" : "Active"
                  )}
                </span>
              </div>
            </EachSecondContainer>
          </StyledSecondContainer>

          <StyledSecondContainer>
            <StyledSecondHeader>Stock Information</StyledSecondHeader>

            <EachSecondContainer>
              <div>
                <p>Purchased At</p>
                <span>{formatDate2(new Date(purchaseStock?.created_at))}</span>
              </div>

              <div>
                <p>Initial Value</p>
                <span>
                  {formatCurrency(
                    purchaseStock?.totalCost / purchaseStock?.quantity,
                    "USD"
                  )}
                </span>
              </div>

              <div>
                <p>Total Unit</p>
                <span>{purchaseStock?.quantity}</span>
              </div>

              <div>
                <p>Current Value</p>
                <span>
                  {formatCurrency(
                    singleStock?.price * purchaseStock?.quantity,
                    "USD"
                  )}
                </span>
              </div>

              <div>
                <p>NGN Exchange Value</p>
                <span>
                  {formatCurrency(getCompanuDetails?.currentExchange)}
                </span>
              </div>

              <div>
                <p>NGN Value</p>
                <span>
                  {formatCurrency(
                    getCompanuDetails?.currentExchange *
                      singleStock?.price *
                      purchaseStock?.quantity
                  )}
                </span>
              </div>
            </EachSecondContainer>
          </StyledSecondContainer>

          {purchaseStock?.isCashedOut ? (
            ""
          ) : (
            <StyledButton>
              <button disabled={disabled} onClick={handleCashoutStock}>
                {isPending
                  ? `Processing`
                  : `Withdraw ${formatCurrency(
                      singleStock?.price * purchaseStock?.quantity,
                      "USD"
                    )}`}
              </button>
            </StyledButton>
          )}
        </StyledContainer>
      )}
    </>
  );
}

export default SingleViewStockPurchase;
