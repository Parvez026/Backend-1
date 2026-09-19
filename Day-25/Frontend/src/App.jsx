import { RouterProvider } from "react-router"
import { router } from "./features/App.routes"

import "./features/shared/style/globle.scss"
import { AuthContextProvider } from "./features/auth/state/auth.context"


function App() {


  return (
    <AuthContextProvider>
      <RouterProvider router={router}/>
    </AuthContextProvider>
  )
}

export default App
