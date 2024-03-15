import { DefaultComponent } from "../../Services/Props";
import {LienRubrique} from "./LienRubrique.tsx";
import {useEffect, useState} from "react";

const requeteMediaDesktop = () => {
    return window.matchMedia('(min-width: 1440px)').matches;
}

export const Sommaire: DefaultComponent = () => {
    const [estDesktop, setEstDesktop] = useState<boolean>(requeteMediaDesktop());

    useEffect(() => {
        const auditeur = () => setEstDesktop(requeteMediaDesktop());
        window.addEventListener('resize', auditeur);
        return () => window.removeEventListener('resize', auditeur);
    }, []);

    return (
        <details className="sommaire fond-blanc" open={estDesktop}>
            <summary>Dans cette rubrique</summary>
            <ul>
                <LienRubrique id="mot-du-directeur" titre="Le mot du Directeur Général"/>
                <LienRubrique id="explication-nis2" titre="Qu’est-ce que NIS 2 ?"/>
                <LienRubrique id="entites" titre="Les entités essentielles (EE) et entités importantes (EI)"/>
                <LienRubrique id="secteurs-activite"
                              titre="+ de 10 000 entités concernées sur 18 secteurs d’activité"/>
                <LienRubrique id="secteurs-concernes" titre="Les secteurs concernés"/>
                <LienRubrique id="obligations" titre="Quelles obligations pour les entités ?"/>
                <LienRubrique id="demarche" titre="L’ANSSI vous accompagne dans cette démarche"/>
                <LienRubrique id="en-savoir-plus" titre="En savoir plus"/>
            </ul>
        </details>
    );
};
