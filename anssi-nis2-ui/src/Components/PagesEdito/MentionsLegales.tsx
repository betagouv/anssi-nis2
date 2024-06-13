import { DefaultComponent } from "../../Services/Props";

const MentionsLegales: DefaultComponent = () => {
  return (
    <>
      <h3>Éditeur</h3>
      <p>
        Le site est édité par l&apos;agence nationale de la sécurité des
        systèmes d&apos;information (ANSSI)&nbsp;:
      </p>
      <p>
        51 boulevard de la Tour-Maubourg
        <br />
        75700 Paris 07 SP
        <br />
        France
        <br />
        <a href="mailto:lab-inno@ssi.gouv.fr">lab-inno@ssi.gouv.fr</a>.
      </p>
      <h3>Directeur de la publication</h3>
      <p>Vincent Strubel, directeur général de l&apos;ANSSI.</p>
      <p>
        La conception éditoriale, le suivi et les mises à jour du site internet
        sont assurés par les services de l&apos;ANSSI.
      </p>
      <h3>Hébergement</h3>
      <p>
        L&apos;hébergement du site est assuré par 3DS OUTSCALE SecNumCloud et
        SCALINGO, 15 avenue du Rhin, 67100 Strasbourg, société par actions
        simplifiée, immatriculée au RCS de Strasbourg sous le numéro 808 665
        483.
      </p>
      <p>
        Toute correspondance à leur attention doit être adressée à
        l&apos;adresse suivante&nbsp;:
        <br />
        <a href="mailto:support@scalingo.com">support@scalingo.com</a>.
      </p>

      <h3>Propriété intellectuelle</h3>
      <h4>Protection des contenus</h4>
      <p>
        Les contenus présents sur le site internet de l&apos;ANSSI dénommé
        «&nbsp;MonEspaceNIS2&nbsp;» sont couverts par la&nbsp;{" "}
        <a
          rel="noreferrer noopener"
          target="_blank"
          href="https://github.com/betagouv/anssi-nis2/blob/main/LICENSE"
        >
          licence Apache-2.0
        </a>
        , sauf mention explicite. Toutefois, l&apos;exploitation commerciale de
        ces contenus reste soumise à une autorisation préalable de l&apos;agence
        nationale de la sécurité des systèmes d&apos;information.
      </p>
      <p>
        Sont notamment considérés comme des contenus présents sur le site les
        recommandations, les éléments graphiques et les photographies de
        l&apos;ANSSI.
      </p>
      <p>
        Les logotypes de l&apos;ANSSI sont protégés par des marques enregistrées
        auprès de l&apos;Institut national de la propriété industrielle. Toute
        utilisation de ces logotypes est soumise à une autorisation préalable de
        l&apos;ANSSI.
      </p>
      <p>
        Les documents officiels en particulier ceux publiés au Journal Officiel
        ou sur le site circulaires.gouv.fr peuvent être utilisés librement.
      </p>
      <p>
        Les liens hypertextes renvoyant vers la page d&apos;accueil de
        MonEspaceNIS2 ou l&apos;une de ses rubriques sont autorisés. Les liens
        pointant vers des contenus (notamment des images) dont la diffusion et
        la reproduction ne sont pas expressément autorisés sont interdits. En
        outre, les pages de ce site internet ne doivent pas être imbriquées à
        l&apos;intérieur des pages d&apos;un autre site (framing). En toute
        hypothèse, l&apos;établissement d&apos;un lien vers le site
        MonEspaceNIS2 ne constitue pas une approbation par l&apos;ANSSI du
        contenu du site établissant ce lien.
      </p>
      <h3>Demande d&apos;autorisation</h3>
      <p>
        Les demandes d&apos;autorisation de reproduction d&apos;un contenu
        doivent au préalable être adressées à l&apos;ANSSI, en écrivant à
        l&apos;adresse suivante&nbsp;:&nbsp;
        <a href="mailto:lab-inno@ssi.gouv.fr">lab-inno@ssi.gouv.fr</a>.
      </p>
      <p>
        La demande devra préciser le contenu visé ainsi que le contexte
        d&apos;utilisation prévu (supports concernés, période, destinataires,
        etc.).
      </p>
    </>
  );
};

export default MentionsLegales;
