import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import GlobalStyle from "./styles/GlobalStyle";
import AppLayout from "./pages/app/AppLayout";
import PublicLayout from "./pages/public/PublicLayout";

import { DarkModeProvider } from "./context/DarkModeContext";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./ui/ScrollToTop";
// import ProtectedRoute from "./ui/ProtectRoute";
import Dashboard from "./pages/app/Dashboard";
import Task from "./pages/app/Task";
import AllTask from "./pages/app/AllTask";
import Vault from "./pages/app/Vault";
import SingleVault from "./pages/app/SingleVault";
import Transactions from "./pages/app/Transactions";
import Withdrawal from "./pages/app/Withdrawal";
import Deposit from "./pages/app/Deposit";
import AboutUs from "./pages/app/AboutUs";
import CustomerCare from "./pages/app/CustomerCare";
import PackageDetails from "./pages/app/PackageDetails";
import DepositType from "./pages/app/DepositType";
import RegisterOrLogin from "./pages/public/RegisterOrLogin";
import GetRegistrationCode from "./pages/public/GetRegistrationCode";
import ProtectedRoute from "./ui/ProtectRoute";
import DepositSuccessful from "./pages/app/DepositSuccessful";

import PageNotFound from "./ui/PageNotFound";

import ForgottenPassword from "./pages/public/ForgottenPassword";
import ResetPasswordForm from "./pages/public/ResetPasswordForm";

import AppSectionDownload from "./pages/app/AppSectionDownload";
import SingleTransactionPage from "./pages/app/SingleTransactionPage";
import CurrentUserPage from "./pages/app/CurrentUserPage";
import TaskHistoryPage from "./pages/app/TaskHistoryPage";
import EachTaskPage from "./pages/app/EachTaskPage";
import AccountDetailsPage from "./pages/app/AccountDetailsPage";
import BankDetailsEditAddPage from "./pages/app/BankDetailsEditAddPage";
import ReferralPage from "./pages/app/ReferralPage";
import SettingsPage from "./pages/app/SettingsPage";
import SingleViewStockPurchase from "./pages/app/SingleViewStockPurchase";
import StyledRewardSpinner from "./pages/app/StyledRewardSpinner";
import Home from "./pages/public/Home";
import HowItWorks from "./pages/public/HowItWorks";
import RecentActivites from "./pages/public/RecentActivites";
import FAQ from "./pages/public/FAQ";
import AboutUsPublic from "./pages/public/AboutUsPublic";
// import HomeCopy from "./pages/public/Homecopy";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <GlobalStyle />

        {/* <ReactQueryDevtools initialIsOpen={false} /> */}

        <BrowserRouter>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<PublicLayout />}>
                <Route index path="/" element={<Home />} />
                <Route index path="/how-it-works" element={<HowItWorks />} />

                <Route
                  index
                  path="/recent-activities"
                  element={<RecentActivites />}
                />
                <Route
                  index
                  path="/testimonials"
                  element={<RecentActivites />}
                />

                <Route index path="/faq" element={<FAQ />} />
                <Route index path="/demo" element={<Home />} />
                <Route index path="/about-us" element={<AboutUsPublic />} />
                {/* <Route index path="/" element={<HomeCopy />} /> */}
                <Route
                  index
                  path="/new_user/register"
                  element={<GetRegistrationCode />}
                />
                <Route
                  index
                  path="/member/auth"
                  element={<RegisterOrLogin />}
                />

                <Route
                  index
                  path="/forgot_password/auth"
                  element={<ForgottenPassword />}
                />

                <Route
                  index
                  path="/reset_password/auth"
                  element={<ResetPasswordForm />}
                />

                <Route path="*" element={<PageNotFound />} />
              </Route>

              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="task" element={<Task />} />
                <Route path="task/today" element={<AllTask />} />
                <Route path="task/history" element={<TaskHistoryPage />} />
                <Route path="task/history/:taskId" element={<EachTaskPage />} />
                <Route path="stock" element={<Vault />} />
                <Route path="stock/:id/stock" element={<SingleVault />} />

                <Route
                  path="stock/:stockId/stock/:id/view"
                  element={<SingleViewStockPurchase />}
                />
                <Route path="withdraw" element={<Withdrawal />} />

                <Route path="finance" element={<Transactions />} />

                <Route
                  path="finance/:transactionId"
                  element={<SingleTransactionPage />}
                />

                <Route path="me" element={<CurrentUserPage />} />

                <Route
                  path="account/details"
                  element={<AccountDetailsPage />}
                />

                <Route
                  path="bank/details"
                  element={<BankDetailsEditAddPage />}
                />

                <Route path="settings" element={<SettingsPage />} />

                <Route
                  path="get_android_app"
                  element={<AppSectionDownload />}
                />

                <Route path="package_details" element={<PackageDetails />} />
                <Route path="all_deposit" element={<Deposit />} />
                <Route path="Deposit_card-type/:id" element={<DepositType />} />
                <Route
                  path="deposit_successful/:id"
                  element={<DepositSuccessful />}
                />
                <Route path="customer_care" element={<CustomerCare />} />
                <Route path="about_us" element={<AboutUs />} />
                <Route path="referral" element={<ReferralPage />} />

                <Route path="rewards" element={<StyledRewardSpinner />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </ScrollToTop>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "6px" }}
          toastOptions={{
            success: {
              duration: 3000,
              iconTheme: {
                primary: " #228b22",
              },
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "10px",
              maxWidth: "500px",
              padding: "10px 14px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

export default App;

// Dear BOMERG member! Trust you are  performing your task ? Major upgrade will occur today to caption new functions and packages to improve the system.
