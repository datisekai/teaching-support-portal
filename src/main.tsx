import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/index.tsx";
import "primeicons/primeicons.css";

import "primereact/resources/themes/saga-blue/theme.css";
import "primeflex/primeflex.min.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
      <RouterProvider router={router} />
    </PrimeReactProvider>
  </StrictMode>
);
