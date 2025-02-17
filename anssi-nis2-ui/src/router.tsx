import Accueil from "./Accueil.tsx";
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
import Directive from "./Directive.tsx";
import { DeclarationAccessibilite } from "./Components/PagesEdito/DeclarationAccessibilite.tsx";
import Securite from "./Components/PagesEdito/Securite.tsx";
import PolitiqueConfidentialite from "./Components/PagesEdito/PolitiqueConfidentialite.tsx";
import { MenuMobile } from "./Components/MenuMobile.tsx";
import MiseEnPage from "./Components/MiseEnPage.tsx";
import { MenuDesktop } from "./Components/MenuDesktop.tsx";
import { useEffect } from "react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_SENTRY_ENVIRONNEMENT,
  integrations: [
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],
  denyUrls: [/\/matomo.js$/],
  tracesSampleRate: 1.0,
});

const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouterV6(createBrowserRouter);

export const router = sentryCreateBrowserRouter([
  { path: "/", element: <Accueil /> },
  { path: "/simulateur", element: <Simulateur /> },
  {
    path: "/a-propos",
    element: (
      <PageEdito titre="À propos">
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
    path: "/politique-confidentialite",
    element: (
      <PageEdito titre="Politique de confidentialité">
        <PolitiqueConfidentialite />
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
    path: "/securite",
    element: (
      <PageEdito titre="Sécurité">
        <Securite />
      </PageEdito>
    ),
  },
  {
    path: "/infolettre",
    element: (
      <>
        <MiseEnPage page="Restez informés">
          <MenuMobile />
          <MenuDesktop />
          <div className="fr-nis2-bloc-principal fond-primaire">
            <h2 className="fr-container texte-blanc fr-h1">Restez informés</h2>
          </div>
          <div className="fr-py-3w">
            <RestezInformes />
          </div>
        </MiseEnPage>
      </>
    ),
  },
  { path: "/directive", element: <Directive /> },
  {
    path: "/accessibilite",
    element: (
      <PageEdito titre="Déclaration d'accessibilité">
        <DeclarationAccessibilite />
      </PageEdito>
    ),
  },
]);
