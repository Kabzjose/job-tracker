import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import PrivateRoute from "./components/PrivateRoute"
import Profile from "./pages/Profile"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"


function App(){
return(
  <AuthProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to ="/Login"/>} />
      <Route path="login" element={<Login/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
       <Route path="dashboard" element={
        <PrivateRoute>
        <Dashboard/>
        </PrivateRoute>
        }/> 
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

    </Routes>
    </BrowserRouter>
  </AuthProvider>
)
}

export default App;