import { Navigate, Route, Routes, useLocation} from "react-router-dom"
import { BudgetPage } from "../budget";
import { LoginPage, LoginRoutes } from "../auth";
import { HomePage } from "../home";
import { Navbar } from "../layout";
//import { getEnvVariables} from '../helpers/getEnvVariables'

export const AppRouter = () => {

  const location = useLocation();
  const showNavBar = location.pathname !== '/login'
  const authStatus = 'not-authenticated'; // 'not-authenticated', 'authenticated'

//  console.log( getEnvVariables() );

  return (
    <>
      
      {showNavBar && <Navbar />}
      
      <Routes>
        {
          (authStatus === 'not-authenticated')
             ? <Route path="/*" element={<LoginRoutes/>}/>
             :<>
                <Route path="home" element={<HomePage/>}/>
                <Route path="budget" element={<BudgetPage/>}/>
                <Route path="/" element={<Navigate to="/home"/>}/>
              </>   
        }

      </Routes>
    </>
  )
}
