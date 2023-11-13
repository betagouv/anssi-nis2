const ReseauxSociaux = () => (
  <div className="fr-follow__social fr-follow">
    <p className="fr-h5">
      Suivez-nous
      <br /> sur les réseaux sociaux
    </p>
    <ul className="fr-links-group">
      <li>
        <a
          className="fr-link--x fr-link"
          title="S'abonner à notre compte X - nouvelle fenêtre"
          href="https://www.x.com/anssi_fr"
          target="_blank"
          rel="noreferrer"
        >
          X
        </a>
      </li>
      <li>
        <a
          className="fr-link--linkedin fr-link"
          title="Nous suivre sur LinkedIn - nouvelle fenêtre"
          href="https://www.linkedin.com/company/anssi-fr"
          target="_blank"
          rel="noreferrer"
        >
          linkedin
        </a>
      </li>
      <li>
        <a
          className="fr-link--dailymotion fr-link"
          title="Nos vidéos sur Dailymotion - nouvelle fenêtre"
          href="https://www.dailymotion.com/ANSSI_FR"
          target="_blank"
          rel="noreferrer"
        >
          dailymotion
        </a>
      </li>
    </ul>
  </div>
);

export default ReseauxSociaux;
