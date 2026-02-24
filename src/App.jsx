import { Routes, Route, Navigate, HashRouter } from "react-router-dom"
import Home from "./components/Home"
import "./components/styles.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Cart from "./components/Cart"
import Login from "./components/Login"
import Products1 from "./components/Products1"
import Signup from "./components/Signup"
import AdminLogin from "./components/AdminLogin"
import AdminDashboard from "./components/AdminDashboard"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { ProductProvider } from "./context/ProductContext"

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (user?.role !== 'admin') {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
};

function App() {


  return (
    <>
      <AuthProvider>
        <ProductProvider>
          <HashRouter>
            <Header />


            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/products1" element={<Products1 />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                }
              />

            </Routes>


            <Footer />
          </HashRouter>
        </ProductProvider>
      </AuthProvider>

    </>
  )


}
export default App