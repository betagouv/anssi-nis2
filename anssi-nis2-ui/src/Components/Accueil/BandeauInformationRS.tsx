import ReseauxSociaux from "../ReseauxSociaux.tsx";

export const BandeauInformationRS = () => (
  <div className="fr-follow">
    <div className="fr-container">
      <div className="fr-grid-row">
        <div className="fr-col-12 fr-col-md-8">
          <div className="fr-follow__newsletter">
            <div>
              <p className="fr-h5">Restez informé</p>
              <p className="fr-text--sm">
                Pour se tenir au courant des évolutions du contexte
                réglementaire et ce que devra faire votre entité pour se
                protéger des cyber-menaces.
              </p>
            </div>
            <div>
              <button
                className="fr-btn"
                title="S‘abonner à notre lettre d’information"
              >
                {" "}
                S&apos;abonner
              </button>
            </div>
          </div>
        </div>
        <div className="fr-col-12 fr-col-md-4">
          <ReseauxSociaux />
        </div>
      </div>
    </div>
  </div>
);

export default BandeauInformationRS;
