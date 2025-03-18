import { Provider } from "react-redux"
import { AppRouter } from "./router/AppRouter"
import { store } from "./storage"

export const FinanceApp = () => {
  return (
    <Provider store={store}>
        <>
          <AppRouter/>
        </>
    </Provider>
    
  )
}
