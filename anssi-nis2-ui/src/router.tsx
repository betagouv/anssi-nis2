import Accueil from "./Accueil.tsx";
import { PageFaq } from "./Components/PageFaq.tsx";
import Simulateur from "./Simulateur.tsx";
import PageEdito from "./Components/PagesEdito/PageEdito.tsx";
import APropos from "./Components/PagesEdito/APropos.tsx";
import MentionsLegales from "./Components/PagesEdito/MentionsLegales.tsx";
import GestionCookies from "./Components/PagesEdito/GestionCookies.tsx";
import {
  createBrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import RestezInformes from "./Components/RestezInformes.tsx";

import * as Sentry from "@sentry/react";
import React from "react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DNS,
  environment: import.meta.env.VITE_SENTRY_ENVIRONNEMENT,
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      ),
    }),
  ],
  tracesSampleRate: 1.0,
});

const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouter(createBrowserRouter);

export const router = sentryCreateBrowserRouter([
  {
    path: "/",
    element: <Accueil />,
  },
  {
    path: "/simulateur",
    element: <Simulateur />,
  },
  {
    path: "/faq",
    element: <PageFaq />,
  },
  {
    path: "/a-propos",
    element: (
      <PageEdito titre="A propos">
        <APropos />
      </PageEdito>
    ),
  },
  {
    path: "/mentions-legales",
    element: (
      <PageEdito titre="Mentions légales">
        <MentionsLegales />
      </PageEdito>
    ),
  },
  {
    path: "/gestion-des-cookies",
    element: (
      <PageEdito titre="Gestion des cookies">
        <GestionCookies />
      </PageEdito>
    ),
  },
  {
    path: "/infolettre",
    element: (
      <PageEdito>
        <RestezInformes />
      </PageEdito>
    ),
  },
]);
