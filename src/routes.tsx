import { memo, ReactNode, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import ThemeProvider from "./context/ThemeProvider";
import GlobalStyle from "./styles/globalStyle";
import "antd/dist/antd.css";
import "toastr/build/toastr.min.css";
import "./styles/tailwind.css";

import LoginComponent from "./pages/Login";
import RegisterComponent from "./pages/Register";
import { useSelector } from "react-redux";
import User from "./interfaces/user";
import Dashboard from "./pages/Dashboard";
import CartComponent from "./pages/Cart";
import { api } from "./services/api";

import NavBar from "./components/molecule/navbar";

interface ProtectedRouteProps {
  children?: ReactNode;
}

function App() {
  const user: User = useSelector((state: any) => state.user.data);

  if (user?.token) {
    api.defaults.headers.Authorization = user.token;
  }

  const ProtectedRoute: React.FC<ProtectedRouteProps> = useCallback(
    ({ children }) => {
      if (!user) {
        return <Navigate to="/login" replace />;
      }

      return (
        <>
          <NavBar />
          {children}
        </>
      );
    },
    [user],
  );

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Router basename="e-commerce">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartComponent />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default memo(App);
