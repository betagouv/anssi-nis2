import { LienRubrique } from "../Directive/LienRubrique.tsx";
import { FunctionComponent, useEffect, useState } from "react";

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

export const SommaireSynchroAvecScroll: FunctionComponent<{
  liens: { id: string; titre: string }[];
}> = ({ liens }) => {
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
        {liens.map((l) => (
          <LienRubrique key={l.id} id={l.id} titre={l.titre} />
        ))}
      </ul>
    </details>
  );
};
