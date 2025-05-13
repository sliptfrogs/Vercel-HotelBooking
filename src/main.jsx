import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import UserMainLayout from "./User/Layout/UserMainLayout.jsx";
import MainHomePage from "./User/pages/main/MainHomePage.jsx";
import MainHotelPage from "./User/pages/hotels/MainHotelPage.jsx";
import DestinationPage from "./User/pages/desctination/Destination.jsx";
import MyBooking from "./User/pages/myBookings/MainMyBooking.jsx";
import ContactMain from "./User/pages/contact/ContactMain.jsx";
import PaymentPage from "./User/pages/payment/PaymentPage.jsx";
import MyBookingComponent from "./User/pages/myBookings/components/MyBookingComponent.jsx";
import MakeBookingComponent from "./User/pages/myBookings/components/CheckoutComponent.jsx";
import WarpOverlay from "./User/pages/test/TestComponent.jsx";
import FramerStyleGridBackground from "./User/pages/test/contact/ContactMain.jsx";
import NotFound from "./User/pages/notFound/NotFound.jsx";

const router = createBrowserRouter([
  {
    element: <UserMainLayout />,
    children: [
      {
        path: "/",
        element: <MainHomePage />,
      },
      {
        path: "/hotels",
        element: <MainHotelPage />,
      },
      {
        path: "/bookings",
        element: <MyBooking />, // This includes <Outlet />
        children: [
          { index: true, element: <MyBookingComponent /> }, // /bookings
          { path: ":bid", element: <MakeBookingComponent /> }, // /bookings/:bid
        ],
      },
      {
        path: "/payment/:rid",
        element: <PaymentPage />,
      },
      {
        path: "/destinations",
        element: <DestinationPage />,
      },
      {
        path: "/contact",
        element: <ContactMain />,
      },
      {
        path: "/test",
        element: <WarpOverlay />,
      },
      {
        path: "/test-portfolio",
        element: <FramerStyleGridBackground />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Redux */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
