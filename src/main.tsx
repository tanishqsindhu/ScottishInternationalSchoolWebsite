import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

import "@workspace/ui/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "aos/dist/aos.css";

import App from "./App.jsx";
import site from "./config/site.js";

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ?? "";

const favicon = document.createElement("link");
favicon.rel = "icon";
favicon.href = site.logoUrl;
document.head.appendChild(favicon);

if (site.posthogKey) {
  import("./lib/posthog.js").then(({ initPosthog }) =>
    initPosthog(site.posthogKey, site.posthogHost)
  );
}

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <BrowserRouter>
      {clerkPublishableKey ? (
        <ClerkProvider publishableKey={clerkPublishableKey}>
          <App />
        </ClerkProvider>
      ) : (
        <App />
      )}
    </BrowserRouter>
  </StrictMode>
);
