import ReseauxSociaux from "../ReseauxSociaux.tsx";
import BlocPrincipal from "../BlocPrincipal.tsx";

export const BandeauInformationRS = () => (
  <BlocPrincipal id="informations">
    <div className="restez-informe">
      <h2>Restez informé</h2>
      <p>
        Pour se tenir au courant des évolutions du contexte
        réglementaire et ce que devra faire votre entité pour se
        protéger des cyber-menaces.
      </p>
      <a href="/infolettre" className="fr-nis2-bouton-secondaire infolettre">S'abonner</a>
    </div>
    <div className="separateur"></div>
    <ReseauxSociaux />
  </BlocPrincipal>
);

export default BandeauInformationRS;
