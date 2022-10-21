import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { FileAttacher } from "./components/FileAttacher";
import { FileInfo } from "./components/FileInfo";

const router = createBrowserRouter([
  {
    path: '/',
    element: <FileAttacher />
  },
  {
    path: '/info',
    element: <FileInfo />
  }
])

function App() {
  return (
    <div className="App">
      <main role="main">
        <RouterProvider router={router} />
      </main>
      <ToastContainer />
    </div>
  )
}

export default App
