import { Route, Routes } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Shop from "../pages/Shop";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ActiveAccount from "../components/Register/ActiveAccount";
import ResendActivationMail from "../components/Register/ResendActivationMail";
import ResetPassword from "../components/dashboard/Profile/ResetPassword";
import ResetPasswordConfirmation from "../components/dashboard/Profile/ResetPasswordConfirmation";
import Profile from "../pages/Profilie";
import PetDetails from "../pages/PetDetails";
import DashboardLayout from "../Layouts/DashboardLayout";
import PrivateRoute from "../components/PrivateRoute";
import Favorite from "../pages/Favorite";
import Adoption from "../pages/Adoption";
import PaymentSuccess from "../pages/PaymentSuccess";
import PetSection from "../pages/PetSection";
import AddPetForm from "../pages/AddPetForm";
import UpdatePetSection from "../components/dashboard/Pets/UpdatePet";
import Categories from "../pages/Categories";
import AddCategoryForm from "../pages/AddCategoryForm";
import UpdateCategory from "../components/dashboard/Categories/UpdateCategory";
import Users from "../pages/Users";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="shop" element={<Shop />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="activate/:uid/:token" element={<ActiveAccount />} />
        <Route path="resend-activation" element={<ResendActivationMail />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route
          path="password-reset/:uid/:token"
          element={<ResetPasswordConfirmation />}
        />
        <Route path="shop/:petId" element={<PetDetails />} />
      </Route>
      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="favorite" element={<Favorite />} />
        <Route path="adoption" element={<Adoption />} />
        <Route path="payment/success" element={<PaymentSuccess />} />
        <Route path="pets" element={<PetSection />} />
        <Route path="pets/add" element={<AddPetForm />} />
        <Route path="pets/update/:id" element={<UpdatePetSection />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/add" element={<AddCategoryForm />} />
        <Route path="categories/update/:id" element={<UpdateCategory />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
