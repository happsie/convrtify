import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StartView } from "./views/FileAttacher";
import { OutputSettingsView } from "./views/FileInfo";
import { DownloadView } from "./views/Download";

const router = createBrowserRouter([
  {
    path: '/',
    element: <StartView />
  },
  {
    path: '/info',
    element: <OutputSettingsView />
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
