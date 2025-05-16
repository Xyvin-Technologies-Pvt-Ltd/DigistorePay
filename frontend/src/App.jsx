import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Loginpage from "./pages/login_page/LoginPage";
import ForgotPage from "./pages/forgot_page/ForgotPage";
import Layout from "./components/layout/Layout";
import SignupPage from "./pages/signup_page/SignupPage";
import RechargePage from "./pages/recharge_page/RechargePage";
import PlanPage from "./pages/plan_page/PlanPage";
import { ViewportProvider } from "./hooks/ViewPort";
import RechargeLayout from "./components/layout/RechargeLayout";
import OnboardLayout from "./components/layout/OnboardLayout.jsx";
import MobileRecharge from "./components/service_components/mobile_recharge/MobileRecharge";
import DthRecharge from "./components/service_components/dth_recharge/DthRecharge";
import FastTag from "./components/service_components/fast_tag/FastTag";
import ElectricityBill from "./components/service_components/electricity_bill/ElectricityBill";
import LandlineRecharge from "./components/service_components/landline_recharge/LandlineRecharge";
import BroadbandRecharge from "./components/service_components/broadband_recharge/BroadbandRecharge";
import WaterBill from "./components/service_components/water_bill/WaterBill";
import TrainForm from "./components/service_components/train_ticket_booking/TrainForm";
import GasForm from "./components/service_components/lpg_cylinder_booking/GasForm";
import BusForm from "./components/service_components/bus_ticket_booking/BusForm";
import ProfileLayout from "./components/layout/ProfileLayout";
import SummaryPage from "./pages/summary/SummaryPage";
import Insurance from "./components/service_components/insurance/Insurance";
import PanCard from "./components/service_components/pan_card/PanCard.jsx";
import Passport from "./components/service_components/passport/Passport.jsx";
import ChangePassword from "./pages/change_page/ChangePassword.jsx";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Protected from "./components/private_route/Protected.jsx";
import ActivityPage from "./pages/activity_page/ActivityPage.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import TransactionHistory from "./pages/transactions_page/TransactionHistory.jsx";
import AccountPage from "./pages/account_page/AccountPage.jsx";
import DistributorSignUp from "./components/distributor_signup/DistributorSignUp.jsx";
import Invoice from "./components/invoice/Invoice.jsx";
import FranchiceList from "./pages/franchice_page/FranchiceList.jsx";
import CollegeSignUp from "./components/college_signup/CollegeSignup.jsx";
import DmtTable from "./components/service_components/domestic_money_transfer/dmt_table/DmtTable.jsx";
import DmtView from "./components/service_components/domestic_money_transfer/dmt_view/DmtView.jsx";
import AddCustomer from "./components/service_components/domestic_money_transfer/add_customer/AddCustomer.jsx";
import AddBenificiary from "./components/service_components/domestic_money_transfer/add_benificiary/AddBenificiary.jsx";
import FundTransfer from "./components/service_components/domestic_money_transfer/fund_transfer/FundTransfer.jsx";
import CollegeFestPage from "./pages/collegefest_page/collegefestpage/CollegeFestPage.jsx";
import ContestPrize from "./pages/collegefest_page/contest_prize/ContestPrize.jsx";
import EmpowermentSession from "./pages/collegefest_page/empowerment_session/EmpowermentSession.jsx";
import TaxFiling from "./components/service_components/tax_filing/TaxFiling.jsx";
import WalletTopUpRequest from "./pages/wallettopup_page/WalletTopUpRequest.jsx";
import ManagementLayout from "./components/layout/ManagementLayout.jsx";
import AdminViewFranchiseProfile from "./pages/admin_view_franchise_profile/AdminViewFranchiseProfile.jsx";
import Loan from "./components/service_components/loan/Loan.jsx";
import PrivacyPolicy from "./pages/privacy_policy/PrivacyPolicy.jsx";
import TermsOfUse from "./pages/terms_of_use/TermsOfUse.jsx";
import Tutorial from "./pages/tutorial_page/Tutorial.jsx";
import Calculator from "./pages/calculator/Calculator.jsx";
import StaffSignUp from "./components/staff_signup/StaffSignUp.jsx";
import AdminViewStaffProfile from "./pages/admin_view_staff_profile/AdminViewStaffProfile.jsx";
import Refund from "./pages/refund_policy/Refund.jsx";
import StaffList from "./pages/staff_page/StaffList.jsx";
import DataRemovalRequest from "./pages/data_removal_request/DataRemovalRequest.jsx";
import FieldExecutiveSignup from "./components/field_executive_signup/FieldExecutiveSignup.jsx";
import JobList from "./pages/job_list/JobList.jsx";
import UdayamRegistration from "./components/service_components/udyam_registration/UdyamRegistration.jsx";
import FSSAI from "./components/service_components/fssai/Fssai.jsx";
import PackingLicense from "./components/service_components/packing_license/PackingLicense.jsx";
import JobCard from "./components/job_card/JobCard.jsx";
import Payment from "./pages/payment/Payment.jsx";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "https://api.digistorepay.com/api/v1/";
axios.defaults.withCredentials = true;

function App() {
  const hours = new Date().getHours();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ViewportProvider>
          <Toaster
            position="top-right"
            containerStyle={{
              top: "100px",
              right: 0,
            }}
            toastOptions={{ duration: 5000 }}
          />
          <Routes>
            <Route path="/" element={<Layout />} exact>
              <Route element={<HomePage />} index></Route>
              <Route path="/login" element={<Loginpage />}></Route>
              <Route path="/forgot" element={<ForgotPage />}></Route>
              <Route path="/signup" element={<SignupPage />}></Route>
              <Route path="/collegefest" element={<CollegeFestPage />}></Route>
              <Route path="/criteria" element={<ContestPrize />}></Route>
              <Route
                path="/register_session"
                element={<EmpowermentSession />}
              ></Route>
              <Route path="/privacy_policy" element={<PrivacyPolicy />}></Route>
              <Route path="/terms_conditions" element={<TermsOfUse />}></Route>
              <Route path="/refund_policy" element={<Refund />}></Route>
              <Route path="/calculator" element={<Calculator />}></Route>
              <Route
                path="/data_removal"
                element={<DataRemovalRequest />}
              ></Route>

              <Route element={<Protected />}>
                <Route path="/signup" element={<SignupPage />}></Route>
                <Route
                  path="/reset_password"
                  element={<ChangePassword />}
                ></Route>
                <Route path="/plan" element={<PlanPage />}></Route>
                <Route
                  path="/management/viewfranchise/:franchiseUniqueId"
                  element={<AdminViewFranchiseProfile />}
                ></Route>
                <Route
                  path="/management/staff/:employeeId"
                  element={<AdminViewStaffProfile />}
                ></Route>
                <Route
                  path="/transactions/:transactionId"
                  element={<Invoice />}
                ></Route>
                <Route
                  path="/profile/wallettopup"
                  element={<WalletTopUpRequest />}
                ></Route>
                <Route path="/job/:workId" element={<JobCard />}></Route>
                <Route path="/payment" element={<Payment />}></Route>

                <Route
                  path="/services"
                  element={
                    <RechargeLayout text="All services at your fingertips" />
                  }
                  exact
                >
                  <Route
                    element={<Navigate to="/services/mobile" replace />}
                    index
                  ></Route>
                  <Route
                    path="/services/mobile"
                    element={
                      <RechargePage>
                        <MobileRecharge />
                      </RechargePage>
                    }
                  ></Route>
                  <Route
                    path="/services/fasttag"
                    element={
                      <RechargePage>
                        <FastTag />
                      </RechargePage>
                    }
                  ></Route>
                  <Route
                    path="/services/dth"
                    element={
                      <RechargePage>
                        <DthRecharge />
                      </RechargePage>
                    }
                  ></Route>
                  <Route
                    path="/services/electricity"
                    element={
                      <RechargePage>
                        <ElectricityBill />
                      </RechargePage>
                    }
                  ></Route>
                  <Route
                    path="/services/landline"
                    element={
                      <RechargePage>
                        <LandlineRecharge />
                      </RechargePage>
                    }
                  ></Route>
                  <Route
                    path="/services/broadband"
                    element={
                      <RechargePage>
                        <BroadbandRecharge />
                      </RechargePage>
                    }
                  ></Route>
                  <Route
                    path="/services/cylinder"
                    element={
                      <RechargePage>
                        <GasForm />
                      </RechargePage>
                    }
                  ></Route>
                  <Route
                    path="/services/water"
                    element={
                      <RechargePage>
                        <WaterBill />
                      </RechargePage>
                    }
                  ></Route>
                  <Route
                    path="/services/train"
                    element={
                      <RechargePage>
                        <TrainForm />
                      </RechargePage>
                    }
                  ></Route>
                  <Route
                    path="/services/bus"
                    element={
                      <RechargePage>
                        <BusForm />
                      </RechargePage>
                    }
                  ></Route>
                  <Route
                    path="/services/insurance"
                    element={
                      <RechargePage>
                        <Insurance />
                      </RechargePage>
                    }
                  ></Route>
                  <Route
                    path="/services/tax"
                    element={
                      <RechargePage>
                        <TaxFiling />
                      </RechargePage>
                    }
                  ></Route>
                  <Route
                    path="/services/udyam"
                    element={
                      <RechargePage>
                        <UdayamRegistration />
                      </RechargePage>
                    }
                  ></Route>
                  <Route
                    path="/services/fssai"
                    element={
                      <RechargePage>
                        <FSSAI />
                      </RechargePage>
                    }
                  ></Route>
                  <Route
                    path="/services/packing"
                    element={
                      <RechargePage>
                        <PackingLicense />
                      </RechargePage>
                    }
                  ></Route>
                  <Route
                    path="/services/loan"
                    element={
                      <RechargePage>
                        <Loan />
                      </RechargePage>
                    }
                  ></Route>
                  <Route
                    path="/services/pancard"
                    element={
                      <RechargePage>
                        <PanCard />
                      </RechargePage>
                    }
                  ></Route>
                  <Route
                    path="/services/passport"
                    element={
                      <RechargePage>
                        <Passport />
                      </RechargePage>
                    }
                  ></Route>
                  <Route
                    path="/services/dmt"
                    element={
                      <RechargePage>
                        <DmtTable />
                      </RechargePage>
                    }
                  ></Route>
                  <Route
                    path="/services/dmtView/:customerId"
                    element={
                      <RechargePage>
                        <DmtView />
                      </RechargePage>
                    }
                  ></Route>
                  <Route
                    path="/services/dmtAddCustomer"
                    element={
                      <RechargePage>
                        <AddCustomer />
                      </RechargePage>
                    }
                  ></Route>
                  <Route
                    path="/services/dmtAddBenificiary"
                    element={
                      <RechargePage>
                        <AddBenificiary />
                      </RechargePage>
                    }
                  ></Route>

                  <Route
                    path="/services/dmtFundTransfer"
                    element={
                      <RechargePage>
                        <FundTransfer />
                      </RechargePage>
                    }
                  ></Route>
                </Route>
                <Route
                  path="/profile"
                  element={<ProfileLayout hours={hours} />}
                  exact
                >
                  <Route
                    element={<Navigate to="/profile/summary" replace />}
                    index
                  ></Route>
                  <Route
                    path="/profile/summary"
                    element={<SummaryPage />}
                  ></Route>
                  <Route
                    path="/profile/activity"
                    element={<ActivityPage />}
                  ></Route>
                  <Route
                    path="/profile/training"
                    element={<Tutorial />}
                  ></Route>
                  <Route
                    path="/profile/account"
                    element={<AccountPage />}
                  ></Route>
                  <Route
                    path="/profile/transactions"
                    element={<TransactionHistory />}
                  ></Route>
                  <Route
                    path="/profile/wallet"
                    element={<p>Wallet Settings Coming Soon...</p>}
                  ></Route>
                  <Route path="/profile/jobs" element={<JobList />}></Route>
                </Route>
                <Route
                  path="/management"
                  element={<ManagementLayout text="Management Dashboard" />}
                  exact
                >
                  <Route
                    element={<Navigate to="/management/franchise" replace />}
                    index
                  ></Route>
                  <Route
                    path="/management/franchise"
                    element={<FranchiceList />}
                  ></Route>
                  <Route
                    path="/management/staff"
                    element={<StaffList />}
                  ></Route>
                  <Route
                    path="/management/payment"
                    element={<p>Payment Settings Coming Soon...</p>}
                  ></Route>
                  <Route
                    path="/management/wallet"
                    element={<p>Wallet Settings Coming Soon...</p>}
                  ></Route>
                </Route>
                <Route
                  path="/onboard"
                  element={<OnboardLayout text="Onboard New Users!" />}
                  exact
                >
                  <Route
                    element={<Navigate to="/onboard/franchise" replace />}
                    index
                  ></Route>
                  <Route
                    path="/onboard/franchise"
                    element={<SignupPage />}
                  ></Route>
                  <Route
                    path="/onboard/distributor"
                    element={<DistributorSignUp />}
                  ></Route>
                  <Route
                    path="/onboard/executive"
                    element={<FieldExecutiveSignup />}
                  ></Route>
                  <Route
                    path="/onboard/telecaller"
                    element={<StaffSignUp />}
                  ></Route>
                  <Route
                    path="/onboard/accountant"
                    element={<p>Onboard Settings Coming Soon...</p>}
                  ></Route>
                  <Route
                    path="/onboard/college"
                    element={<CollegeSignUp />}
                  ></Route>
                </Route>
              </Route>
            </Route>
          </Routes>
        </ViewportProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
