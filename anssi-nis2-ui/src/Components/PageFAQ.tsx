import { SideMenu } from "@codegouvfr/react-dsfr/SideMenu";
import { DefaultComponentExtensible, DefaultProps } from "../Services/Props";
import MiseEnPage from "./MiseEnPage.tsx";

export const PageFAQ: DefaultComponentExtensible<DefaultProps> = () => (
  <MiseEnPage page="FAQ NIS2">
    <div className="fr-container fr-nis2-faq" id="haut-faq">
      <nav
        role="navigation"
        className="fr-breadcrumb"
        aria-label="vous êtes ici :"
      >
        <button
          className="fr-breadcrumb__button"
          aria-expanded="false"
          aria-controls="breadcrumb-1"
        >
          Voir le fil d’Ariane
        </button>
        <div className="fr-collapse" id="breadcrumb-1">
          <ol className="fr-breadcrumb__list">
            <li>
              <a className="fr-breadcrumb__link" href="/">
                Accueil
              </a>
            </li>
            <li>
              <a className="fr-breadcrumb__link" href="/segment-1/">
                Segment 1
              </a>
            </li>
            <li>
              <a className="fr-breadcrumb__link" href="/segment-1/segment-2/">
                Segment 2
              </a>
            </li>

            <li>
              <a className="fr-breadcrumb__link" aria-current="page">
                Page Actuelle
              </a>
            </li>
          </ol>
        </div>
      </nav>

      <div className="fr-grid-row fr-nis2-bandeau-temporaire"></div>
      <div className="fr-grid-row">Description, Source</div>

      <div className="fr-grid-row">
        <SideMenu
          align="left"
          burgerMenuButtonText="Dans cette rubrique"
          items={[
            {
              items: [
                {
                  linkProps: {
                    href: "#",
                  },
                  text: "Accès direct niveau 2",
                },
                {
                  linkProps: {
                    href: "#",
                  },
                  text: "Accès direct niveau 2",
                },
                {
                  linkProps: {
                    href: "#",
                  },
                  text: "Accès direct niveau 2",
                },
              ],
              text: "Niveau 1",
            },
            {
              isActive: true,
              items: [
                {
                  linkProps: {
                    href: "#",
                  },
                  text: "Accès direct niveau 2",
                },
                {
                  isActive: true,
                  linkProps: {
                    href: "#",
                  },
                  text: "Accès direct niveau 2",
                },
                {
                  linkProps: {
                    href: "#",
                  },
                  text: "Accès direct niveau 2",
                },
                {
                  linkProps: {
                    href: "#",
                  },
                  text: "Accès direct niveau 2",
                },
              ],
              text: "Entrée menu active",
            },
            {
              linkProps: {
                href: "#",
              },
              text: "Accès direct",
            },
            {
              linkProps: {
                href: "#",
              },
              text: "Accès direct",
            },
            {
              items: [
                {
                  linkProps: {
                    href: "#",
                  },
                  text: "Accès direct niveau 2",
                },
                {
                  linkProps: {
                    href: "#",
                  },
                  text: "Accès direct niveau 2",
                },
                {
                  linkProps: {
                    href: "#",
                  },
                  text: "Accès direct niveau 2",
                },
              ],
              text: "Niveau 1",
            },
          ]}
          title="Titre de rubrique"
        />
        <div className="fr-col-offset-1 fr-col-7">
          <h1>FAQ NIS2</h1>
          <h2>Périmètre des entités concernées</h2>

          <section>
            <h3>
              8. Si mon entreprise est sur deux Etats membres, est-ce que je
              suis assujetti à la transposition en droit français de NIS 2 ?
            </h3>
            <p>
              À ce stade, si votre entreprise est sur deux États membres de
              l’Union Européenne, que vous réalisez une activité incluse dans
              les types d’entité des annexes 1 ou 2 et que vous disposez de 50
              employés ou plus, vous serez soumis à la directive NIS 2.
            </p>
            <p>
              En revanche, si vous souhaitez connaitre la juridiction, c’est
              encore un peu tôt pour obtenir une réponse car ce point fera
              l’objet de clarifications dans le cadre des consultations menées
              dans les prochains mois.
            </p>
          </section>
          <section>
            <h3>
              9. Les entités n’étant plus désignées par arrêté et devant se
              faire connaitre auprès d’elle, l’ANSSI envisage-t-elle des actions
              pour faciliter la mise en relation ?
            </h3>
            <p>
              Effectivement, la règle de base impliquera une inclusion par
              défaut des entités en tant qu’EE ou EI. La désignation unitaire,
              dont le processus sera défini dans le cadre de la transposition
              nationale, se limitera à affiner le périmètre à la marge et à
              gérer les cas très spécifiques.
            </p>
            <p>
              Pour communiquer sur l’existence de la directive et attirer
              l’attention des entités sur leurs obligations, en parallèle des
              actions de communication propres à l’ANSSI, nous nous appuierons
              sur des relais sectoriels et/ou professionnels, que nous
              rencontrerons notamment dans le cadre des consultations sur S2
              2023.
            </p>
          </section>
          <section>
            <h3>
              10. Le texte prévoit un certain nombre d’exceptions ou de cas
              particuliers au périmètre de base. Dans quels cas, l’ANSSI
              sera-t-elle amenée à actionner les mécanismes d’ajustement du
              périmètre ?
            </h3>
            <p>
              La directive prévoit effectivement un mécanisme d’ajustement du
              périmètre de base permettant d’affiner la liste des entités
              concernées, au regard de spécificités propres à chaque Etat membre
              de l’UE.
            </p>
            <p>
              Ainsi, dans le cas où le critère de taille n’est pas atteint, il
              pourra être envisagé d’intégrer par désignation, au sein du
              périmètre qui sera définit lors des travaux de transposition :
            </p>
            <ul>
              <li>
                les entités ayant des monopoles d’activité essentielle au
                maintien d’activités sociétales ou économiques critiques ;
              </li>
              <li>
                les entités réalisant des activités pouvant avoir un impact
                important sur la sécurité publique, la sûreté publique ou la
                santé publique ;
              </li>
              <li>
                les entités réalisant des activités transfrontières pouvant
                avoir un impact systémique ;
              </li>
              <li>
                les entités ayant une importance spécifique au niveau national
                ou régional.
              </li>
            </ul>
            <p>
              Enfin la directive prévoit également un mécanisme d’exclusion
              pouvant impacter des entités réalisant des activités en lien avec
              la défense et la sécurité nationale. Plus précisément, cela
              concernera uniquement les domaines de la sécurité nationale, de la
              sécurité publique, de la défense ou de l’application de la loi.
            </p>
            <p>
              Les modalités de gestion de ces particuliers seront définies au
              cours des travaux de transposition.
            </p>
          </section>
          <section>
            <h3>
              11. Concrètement, qui sera concerné par le nouveau périmètre
              d’application de NIS 2 ?
            </h3>
            <p>
              A l’échelle nationale, NIS 2 s’appliquera à des milliers d’entités
              appartenant à plus de dix-huit secteurs qui seront désormais
              régulés. Environ 600 types d’entités différentes seront concernés,
              parmi eux des administrations de toutes tailles et des entreprises
              allant des PME aux groupes du CAC40.
            </p>
            <p>
              Les principaux critères d’intégration ont été définis au niveau
              européen. Il s’agit principalement du nombre d’employés, du
              chiffre d’affaire et de la nature de l’activité réalisée par
              l’entité.
            </p>
          </section>
          <section>
            <h3>
              12. Qu’en est-il des acteurs de la chaine d’approvisionnement, des
              administrations et des collectivités territoriales ?
            </h3>
            <p>
              Les acteurs de la chaîne d’approvisionnement, dont les acteurs du
              numérique, seront soumis au dispositif. Ces nombreux acteurs sont
              en effet de plus en plus ciblés par des cyberattaques qui visent à
              atteindre, à travers eux, des clients finaux d’importance plus
              critiques.
            </p>
            <p>
              Ils verront donc également leur niveau de sécurité numérique
              renforcé. Autre nouveauté, et non des moindres, les
              administrations centrales des Etats membres ainsi que certaines
              collectivités territoriales intègreront également le périmètre de
              NIS 2.
            </p>
          </section>
          <div>
            <a href="#haut-faq">
              <i className="fr-fi-arrow-up-s-line" />
              Haut de page
            </a>
          </div>
        </div>
      </div>
    </div>
  </MiseEnPage>
);
