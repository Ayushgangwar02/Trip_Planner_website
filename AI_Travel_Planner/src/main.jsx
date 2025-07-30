import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header.jsx'
import { Toaster } from '@/components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip/[tripId]/index.jsx'
import MyTrips from './my-trips/index.jsx'

window.addEventListener('error', (event) => {
  if (event.error?.message?.includes('message channel closed') ||
      event.error?.message?.includes('listener indicated an asynchronous response')) {
    console.log('Browser extension error (ignored):', event.error.message);
    event.preventDefault();
    return false;
  }
});

window.addEventListener('unhandledrejection', (event) => {
  if (event.reason?.message?.includes('message channel closed') ||
      event.reason?.message?.includes('listener indicated an asynchronous response')) {
    console.log('Browser extension promise rejection (ignored):', event.reason.message);
    event.preventDefault();
    return false;
  }
});
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header/>
        <App/>
      </>
    ),
  },
  {
    path: '/create-trip',
    element: (
      <>
        <Header/>
        <CreateTrip/>
      </>
    )
  },
  {
    path: '/view-trip/:tripId',
    element: (
      <>
        <Header/>
        <ViewTrip/>
      </>
    )
  },
  {
  path: '/my-trips' ,
    element: (
      <>
        <Header/>
        <MyTrips/>
      </>
    )
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
     <Toaster />
    <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>,
);
