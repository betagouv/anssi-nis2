import { DefaultComponent } from "../../Services/Props";
import { LienRubrique } from "./LienRubrique.tsx";
import { useEffect, useState } from "react";

const requeteMediaDesktop = () => {
  return window.matchMedia("(min-width: 1280px)").matches;
};

const elementDansViewport = (el: Element) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= -1 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const gestionnaireIntersections = (entrees: IntersectionObserverEntry[]) => {
  const tousLiens = document.querySelectorAll(".sommaire li a");
  const toutesSections = document.querySelectorAll("div[id]");
  const toutesEntrees = new Set(
    entrees.filter((e) => e.isIntersecting).map((entry) => entry.target),
  );

  let sectionCourante;
  for (let i = 0; i < toutesSections.length; i++) {
    sectionCourante = toutesSections[i];
    if (
      elementDansViewport(sectionCourante) ||
      toutesEntrees.has(sectionCourante)
    ) {
      tousLiens.forEach((link) => link.classList.remove("active"));
      document
        .querySelector(`.sommaire li a[href="#${sectionCourante.id}"]`)
        ?.classList.add("active");
      break;
    }
  }
};

export const Sommaire: DefaultComponent = () => {
  const [estDesktop, setEstDesktop] = useState<boolean>(requeteMediaDesktop());

  useEffect(() => {
    const auditeur = () => setEstDesktop(requeteMediaDesktop());
    window.addEventListener("resize", auditeur);

    const observateur = new IntersectionObserver(gestionnaireIntersections);
    document.querySelectorAll("div[id] h3").forEach((section) => {
      observateur.observe(section);
    });

    return () => {
      window.removeEventListener("resize", auditeur);
      observateur.disconnect();
    };
  }, []);

  return (
    <details className="sommaire fond-blanc" open={estDesktop}>
      <summary>Dans cette rubrique</summary>
      <ul>
        <LienRubrique
          id="mot-du-directeur"
          titre="Le mot du Directeur Général"
        />
        <LienRubrique
          id="explication-nis2"
          titre="Qu’est-ce que NIS&nbsp;2 ?"
        />
        <LienRubrique
          id="entites"
          titre="Les entités essentielles (EE) et entités importantes (EI)"
        />
        <LienRubrique
          id="secteurs-activite"
          titre="+ de 10 000 entités concernées sur 18 secteurs d'activité"
        />
        <LienRubrique id="secteurs-concernes" titre="Les secteurs concernés" />
        <LienRubrique
          id="obligations"
          titre="Quelles obligations pour les entités ?"
        />
        <LienRubrique
          id="demarche"
          titre="L’ANSSI vous accompagne dans cette démarche"
        />
        <LienRubrique id="en-savoir-plus" titre="En savoir plus" />
      </ul>
    </details>
  );
};
