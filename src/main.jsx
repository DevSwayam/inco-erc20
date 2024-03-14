import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/Error-Page.jsx";
import { PrivyProvider } from "@privy-io/react-auth";
import {myIncoChain} from "./components/helpers/chainHelper.js"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrivyProvider
      appId="cltn4pfm807ld12sf83bqr3iy"
      config={{
        // Display email and wallet as login methods
        loginMethods: ["email", "wallet"],
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
        },
        supportedChains: [
          myIncoChain
        ],

        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <RouterProvider router={router} />
    </PrivyProvider>
  </React.StrictMode>
);
