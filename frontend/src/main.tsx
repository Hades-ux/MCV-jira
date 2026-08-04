import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";
import { SidebarProvider } from "./context/SideBarContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SidebarProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Toaster position="top-center" reverseOrder={false} />
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </SidebarProvider>
  </StrictMode>,
);
