import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { FileAttacherView } from "./views/FileAttacher";
import { FileInfoView } from "./views/FileInfo";
import { DownloadView } from "./views/Download";

const router = createBrowserRouter([
  {
    path: '/',
    element: <FileAttacherView />
  },
  {
    path: '/info',
    element: <FileInfoView />
  }, 
  {
    path: '/download',
    element: <DownloadView />
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
