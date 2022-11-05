import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StartView } from "./views/Start";
import { EncodedView } from "./views/Encoded";
import { DecodedView } from "./views/Decoded";

const router = createBrowserRouter([
  {
    path: '/',
    element: <StartView />
  },
  {
    path: '/encoded',
    element: <EncodedView />
  },
  {
    path: '/decoded',
    element: <DecodedView />
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}

export default App
