import styled from "styled-components";
import BackButton from "../../ui/BackButton";
import { useGetAllPackages } from "../../features/allPackage/usePackage";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";

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

const StyledAllPackaged = styled.section`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`;

const EachAllPackaged = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const EachVault = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 1fr 0.3fr;
  column-gap: 3rem;
  row-gap: 2rem;
  border-radius: 5px;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  padding: 1.5rem;

  & img {
  }
`;

const EachDiv = styled.div``;

const EachVaultContent = styled.div`
  grid-column: 1 / span 4;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  & p {
    font-size: 1.2rem;
    font-weight: 600;
  }

  & span {
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

const EachVaultStatus = styled.div`
  grid-column: 2 / span 3;
  display: flex;
  justify-content: space-between;
`;

function PackageDetails() {
  const { allPackages, isLoading } = useGetAllPackages();

  if (isLoading) return <Spinner />;

  return (
    <StyledAllPackaged>
      <div>
        <BackButton />
      </div>
      <Headings type="h3">
        <span>View all levels and earns</span>
      </Headings>

      <EachAllPackaged>
        {allPackages.map((each, i) => (
          <EachDiv key={i}>
            <Headings type="h4-left">{each.level} level</Headings>

            <EachVault>
              <img src={each.image} alt={`${each.level} logo`} />

              <EachVaultStatus>
                <ContentDiv>
                  <p>Cost</p>
                  <span>{formatCurrency(each.cost)}</span>
                </ContentDiv>

                <ContentDiv>
                  <p>Refer & Earn</p>
                  <span>{formatCurrency(each.referralBonus)}</span>
                </ContentDiv>

                <ContentDiv>
                  <p>Daily Task</p>
                  <span>{each.totalDailyTask}</span>
                </ContentDiv>
              </EachVaultStatus>

              <EachVaultContent>
                <ContentDiv>
                  <p>Daily Earning</p>
                  <span>{formatCurrency(each.dailyEarnings)}</span>
                </ContentDiv>

                <ContentDiv>
                  <p>Monthly Earning</p>
                  <span>{formatCurrency(Number(each.dailyEarnings) * 30)}</span>
                </ContentDiv>

                <ContentDiv>
                  <p>Yearly Earning</p>
                  <span>
                    {formatCurrency(Number(each.dailyEarnings) * 365)}
                  </span>
                </ContentDiv>
              </EachVaultContent>
            </EachVault>
          </EachDiv>
        ))}
      </EachAllPackaged>
    </StyledAllPackaged>
  );
}

export default PackageDetails;
