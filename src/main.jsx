import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routers/AppRoutes.jsx";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { FavoriteProvider } from "./Context/FavoriteContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <FavoriteProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </FavoriteProvider>
  </AuthProvider>,
);


{
  /* <StrictMode>
    <AuthProvider>
      <FavoriteProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </FavoriteProvider>
    </AuthProvider>
  </StrictMode>, */
}
