import { Navigate, Route, Routes, useLocation} from "react-router-dom"
import { BudgetPage } from "../budget";
import { LoginPage, LoginRoutes } from "../auth";
import { HomePage } from "../home";
import { Navbar } from "../layout";

export const AppRouter = () => {

  const location = useLocation();
  const showNavBar = location.pathname !== '/login'

  return (
    <>
      
      {showNavBar && <Navbar />}
      

      <Routes> 
        <Route path="home" element={<HomePage/>}/>
        <Route path="budget" element={<BudgetPage/>}/>
        <Route path="/" element={<Navigate to="/home"/>}/>
        <Route path="/*" element={<LoginRoutes/>}/>
      </Routes>
    </>
  )
}
