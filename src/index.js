import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/auth";
import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { HomeProvider } from "./context/HomeContext";
import { ChakraProvider } from "@chakra-ui/react";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ChakraProvider>
        <HomeProvider>
          <App />
        </HomeProvider>
      </ChakraProvider>
    </AuthProvider>
  </QueryClientProvider>
);
