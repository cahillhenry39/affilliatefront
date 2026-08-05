import { useQueryClient } from "@tanstack/react-query";
import HeaderNavigationBack from "../../ui/HeaderNavigationBack";
import { formatTextCapitalize } from "../../utils/helpers";
import { useUpdateSettings } from "../authentication/useUser";
import LoginSetting from "./LoginSetting";
import PersonalSettings from "./PersonalSettings";
import TransactionSettings from "./TransactionSettings";
import StockSettings from "./StockSettings";
import WithdrawalSettings from "./WithdrawalSettings";
import HomeSettings from "./HomeSettings";
import ThemeSettings from "./ThemeSettings";
import SubscriptionSettings from "./SubscriptionSettings";
import FeedbackSettings from "./FeedbackSettings";
import AboutUsPage from "./AboutUsPage";
import { useAlert } from "../../hooks/AlertContext";

function MainSettingsLayout({ showPage, handleReturnMainPage }) {
  const { updateSettings, isPending } = useUpdateSettings();
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();

  function handleUpdateSettings(route, newData) {
    const updateData = {
      route,
      newData,
    };

    updateSettings(updateData, {
      onSuccess: () => {
        queryClient.invalidateQueries();

        showAlert({
          status: "success",
          text: "Your update was successful.",
          link: "/app/dashboard",
          buttonMessage: "Go to Dashboard",
        });
      },

      onError: (err) => {
        showAlert({
          status: "error",
          text: err?.message,
        });
      },
    });
  }

  return (
    <>
      <HeaderNavigationBack
        text={`${formatTextCapitalize(showPage)} Settings`}
        isNavigattion
        handleNavigate={handleReturnMainPage}
      />

      {showPage === "personal" ? (
        <PersonalSettings
          handleUpdateSettings={handleUpdateSettings}
          isWorking={isPending}
          showAlert={showAlert}
        />
      ) : (
        ""
      )}
      {/* {showPage === "caption" ? <ImageUploader /> : ""} */}

      {showPage === "transaction" ? (
        <TransactionSettings
          handleUpdateSettings={handleUpdateSettings}
          isWorking={isPending}
        />
      ) : (
        ""
      )}

      {showPage === "login" ? (
        <LoginSetting
          handleUpdateSettings={handleUpdateSettings}
          isWorking={isPending}
        />
      ) : (
        ""
      )}
      {showPage === "stock" ? (
        <StockSettings
          handleUpdateSettings={handleUpdateSettings}
          isWorking={isPending}
        />
      ) : (
        ""
      )}

      {showPage === "withdrawal" ? (
        <WithdrawalSettings
          handleUpdateSettings={handleUpdateSettings}
          isWorking={isPending}
        />
      ) : (
        ""
      )}
      {showPage === "homepage" ? (
        <HomeSettings
          handleUpdateSettings={handleUpdateSettings}
          isWorking={isPending}
        />
      ) : (
        ""
      )}
      {showPage === "themes" ? (
        <ThemeSettings
          handleUpdateSettings={handleUpdateSettings}
          isWorking={isPending}
        />
      ) : (
        ""
      )}

      {showPage === "subscription" ? (
        <SubscriptionSettings
          handleUpdateSettings={handleUpdateSettings}
          isWorking={isPending}
        />
      ) : (
        ""
      )}
      {showPage === "about" ? <AboutUsPage /> : ""}

      {showPage === "feedback" ? (
        <FeedbackSettings
          handleUpdateSettings={handleUpdateSettings}
          isWorking={isPending}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default MainSettingsLayout;
