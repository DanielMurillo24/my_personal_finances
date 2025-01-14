import { Navigate, Route, Routes } from "react-router-dom"
import { BudgetPage } from "../budget/pages/budgetPage"
import { LoginPage } from "../auth/pages/LoginPage"

export const AppRouter = () => {
  return (
    <>
      <Routes> 
        <Route path="budget" element={<BudgetPage/>}/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="/" element={<Navigate to="/budget"/>}/>
      </Routes>
    </>
  )
}
