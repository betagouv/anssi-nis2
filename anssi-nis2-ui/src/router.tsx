import Accueil from "./Accueil.tsx";
import { PageFAQ } from "./Components/PageFAQ.tsx";
import Simulateur from "./Simulateur.tsx";
import PageEdito from "./Components/PagesEdito/PageEdito.tsx";
import APropos from "./Components/PagesEdito/APropos.tsx";
import MentionsLegales from "./Components/PagesEdito/MentionsLegales.tsx";
import GestionCookies from "./Components/PagesEdito/GestionCookies.tsx";
import { createBrowserRouter } from "react-router-dom";
import RestezInformes from "./Components/RestezInformes.tsx";

export const router = createBrowserRouter([
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
    element: <PageFAQ />,
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
