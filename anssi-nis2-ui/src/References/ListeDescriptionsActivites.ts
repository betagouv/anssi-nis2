import {
  DescriptionActivite,
  ValeursActivites,
} from "../Domaine/Simulateur/Activite.definitions.ts";

export const listeDescriptionsActivites: Record<
  ValeursActivites,
  DescriptionActivite[]
> = {
  autreActiviteAdministrationPublique: [],
  autreActiviteConstructionVehiculesAutomobilesRemorquesSemi: [],
  autreActiviteEauPotable: [],
  autreActiviteElectricite: [],
  autreActiviteEspace: [],
  autreActiviteFabricationDispositifsMedicaux: [],
  autreActiviteFabricationEquipementsElectroniques: [],
  autreActiviteFabricationMachinesEquipements: [],
  autreActiviteFabricationProductionDistributionProduitsChimiques: [],
  autreActiviteFabricationProduitsInformatiquesElectroniquesOptiques: [],
  autreActiviteFournisseursNumeriques: [],
  autreActiviteGaz: [],
  autreActiviteGestionDechets: [],
  autreActiviteGestionServicesTic: [],
  autreActiviteHydrogene: [],
  autreActiviteInfrastructureMarcheFinancie: [],
  autreActiviteInfrastructureNumerique: [],
  autreActivitePetrole: [],
  autreActiviteProductionTransformationDistributionDenreesAlimentaires: [],
  autreActiviteReseauxChaleurFroid: [],
  autreActiviteSante: [],
  autreActiviteSecteurBancaire: [],
  autreActiviteServicesPostauxExpedition: [],
  autreActiviteTransportsAeriens: [],
  autreActiviteTransportsFerroviaires: [],
  autreActiviteTransportsParEaux: [],
  autreActiviteTransportsRoutiers: [],
  
  acteurDuMarche: [
    {
      titre: "Acteur du marché",
      description:
        "Toute personne physique ou morale qui produit, achète ou vend des services liés à l’électricité, " +
        "qui participe à l'agrégation ou qui est un gestionnaire de la participation active de la demande " +
        "ou aux services de stockage de l'énergie, y compris la passation d'ordres, sur un ou plusieurs marchés " +
        "de l'électricité, y compris des marchés de l'énergie d’équilibrage.",
    },
    {
      titre: "Agrégation",
      description:
        "Une fonction exercée par une personne physique ou morale qui combine, en vue de la vente, " +
        "de l'achat ou de la mise aux enchères sur tout marché de l'électricité, de multiples charges de consommation ou productions d’électricité.",
    },
    {
      titre: "Participation active de la demande",
      description:
        "Le changement qu'apporte le client final à sa charge d'électricité par rapport à son profil de consommation " +
        "habituel ou actuel pour réagir aux signaux du marché, y compris à des variations de prix de l'électricité en " +
        "fonction du moment ou des incitations financières, ou pour réagir à l'acceptation de l'offre du client final de vendre, " +
        "seul ou par le biais de l'agrégation, une réduction ou une augmentation de la demande à un prix déterminé sur un marché " +
        "organisé tel qu'il est défini à l'article 2, point 4), du règlement d'exécution (UE) n° 1348/2014 de la Commission Européenne.",
    },
    {
      titre: "Stockage d'énergie",
      description:
        "Dans le système électrique, le report de l'utilisation finale de l'électricité à un moment postérieur à celui " +
        "auquel elle a été produite, ou la conversion de l'énergie électrique en une forme d'énergie qui peut être stockée, " +
        "la conservation de cette énergie et la reconversion ultérieure de celle-ci en énergie électrique ou son utilisation en tant qu'autre vecteur d’énergie.",
    },
  ],
  administrationPouvoirsPublicsCentraux: [],
  administrationPubliqueNiveauRegional: [],
  autoritesRoutieresControleGestionCirculation: [
    {
      titre: "Autorité routière",
      description:
        "Une autorité publique responsable de la planification, du contrôle et de la gestion des routes relevant de sa compétence territoriale.",
    },
  ],
  collectantEvacuantTraitantEaux: [
    {
      titre: "Eaux urbaines résiduaires",
      description:
        "Les eaux ménagères usées ou le mélange des eaux ménagères usées avec des eaux industrielles usées et/ou des eaux de ruissellement.",
    },
    {
      titre: "Eaux ménagères usées",
      description:
        "Les eaux usées provenant des établissements et services résidentiels et produites essentiellement par le métabolisme humain et les activités ménagères.",
    },
    {
      titre: "Eaux industrielles usées",
      description:
        "Toutes les eaux usées provenant de locaux utilisés à des fins commerciales ou industrielles, autres que les eaux ménagères usées et les eaux de ruissellement.",
    },
  ],
  constructionAeronautiqueSpatiale: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  constructionBateauxNaviresMilitaires: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  constructionBateauxPlaisance: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  constructionLocomotivesAutreMaterielFerroviaireRoulant: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  constructionNavale: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  constructionNaviresStructuresFlottantesCiviles: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  constructionVehiculeMilitaireCombat: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  constructionVehiculesAutomobiles: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  contrepartieCentrales: [
    {
      titre: "Contrepartie centrale",
      description:
        "Une personne morale qui s'interpose entre les contreparties à des contrats négociés sur un " +
        "ou plusieurs marchés financiers, en devenant l'acheteur vis-à-vis de tout vendeur et le vendeur vis-à-vis de tout acheteur.",
    },
  ],
  entiteCentralesStockage: [
    {
      titre: "Entité centrale de stockage (ECS)",
      description:
        "L’organisme ou le service auquel des pouvoirs peuvent être conférés pour agir afin d’acquérir, de maintenir ou de vendre des stocks de pétrole, notamment des stocks de sécurité et des stocks spécifiques.",
    },
  ],
  entiteGestionnaireAeroports: [
    {
      titre: "Entité gestionnaire d’aéroport",
      description:
        "L’entité qui, conjointement ou non avec d’autres activités, tient de la législation nationale, " +
        "de la réglementation ou de contrats la mission d’administration et de gestion des infrastructures de l’aéroport ou du réseau aéroportuaire, " +
        "ainsi que de coordination et de contrôle des activités des différents opérateurs présents dans les aéroports ou le réseau aéroportuaire concernés.",
    },
    {
      titre: "Liste des aéroports du réseau central",
      description:
        "https://eur-lex.europa.eu/legal-content/FR/TXT/HTML/?uri=CELEX:32013R1315",
    },
  ],
  entiteGestionnairePorts: [
    {
      titre: "Port",
      description:
        "Toute étendue déterminée de terre et d'eau, dont le périmètre est défini par les États membres dans lequel " +
        "le port est situé, comprenant des infrastructures et équipements destinés à faciliter les opérations de transport maritime commercial",
    },
    {
      titre: "Installation portuaire",
      description:
        "Un emplacement où a lieu l'interface navire/port; elle comprend les zones telles que les zones de mouillage, les postes d'attente et leurs abords à partir de la mer, selon le cas.",
    },
  ],
  entrepriseElectriciteRemplissantFonctionFourniture: [
    {
      titre: "Entreprise d’électricité",
      description:
        "Toute personne physique ou morale qui assure au moins une des " +
        "fonctions suivantes : la production, le transport, la distribution, " +
        "l'agrégation, la participation active de la demande, le stockage " +
        "d'énergie, la fourniture ou l'achat d'électricité et qui est " +
        "chargée des missions commerciales, techniques ou de maintenance " +
        "liées à ces fonctions, à l'exclusion des clients finaux.",
    },
    {
      titre: "Fourniture",
      description:
        "La vente, y compris la revente, d'électricité à des clients.",
    },
  ],
  entrepriseFerroviaire: [
    {
      titre: "Entreprise ferroviaire",
      description:
        "Toute entreprise à statut privé ou public et titulaire d'une licence conformément à la présente directive, " +
        "dont l'activité principale est la fourniture de prestations de transport de marchandises et/ou de voyageurs par chemin de fer, " +
        "la traction devant obligatoirement être assurée par cette entreprise; ce terme recouvre aussi les entreprises qui assurent uniquement la traction.",
    },
    {
      titre: "Exploitant d'installation de service",
      description:
        "Toute entité publique ou privée chargée de gérer une ou plusieurs installations de service " +
        "ou de fournir à des entreprises ferroviaires un ou plusieurs des services visés à l'annexe II, points 2, 3 et 4.",
    },
  ],
  entrepriseFourniture: [
    {
      titre: "Entreprise de fourniture",
      description:
        "Toute personne physique ou morale qui effectue la fourniture.",
    },
  ],
  etablissementCredit: [
    {
      titre: "Établissement de crédit",
      description:
        "Une entreprise dont l'activité consiste à recevoir du public des dépôts ou d'autres fonds remboursables et à octroyer des crédits pour son propre compte.",
    },
  ],
  executantOperationGestionDechets: [
    {
      titre: "Gestion des déchets",
      description:
        "La collecte, le transport, la valorisation et l'élimination des déchets, y compris la surveillance " +
        "de ces opérations ainsi que la surveillance des sites de décharge après leur fermeture et notamment " +
        "les actions menées en tant que négociant ou courtier.",
    },
  ],
  exploitantsInfrastructureTerrestresFournitureServicesSpaciaux: [],
  exploitantsInstallationPetrole: [],
  exploitantsOleoduc: [],
  exploitantsPlateformesNegociation: [
    {
      titre: "Plate-forme de négociation",
      description:
        "Un marché réglementé, un MTF ou un OTF.",
    },
  ],
  exploitantsPointRecharge: [],
  exploitantsServiceTrafficMaritime: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  exploitantsSystemeHydrogene: [],
  exploitantsSystemeTransportIntelligents: [
    {
      titre: "Systèmes de transport intelligents ou STI",
      description:
        "Les systèmes dans lesquels des technologies de l’information et de la communication sont appliquées, " +
        "dans le domaine du transport routier, y compris les infrastructures, les véhicules et les usagers, et " +
        "dans la gestion de la circulation et la gestion de la mobilité, ainsi que pour les interfaces avec d’autres modes de transport.",
    },
  ],
  fabricationDistributionSubstances: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fabricationMaterielTransportNCA: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fabriquantAppareilEclairage: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fabriquantAppareilsMenagers: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fabriquantAutresMachinesUsageGeneral: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fabriquantAutresMachinesUsageSpecifiqueNCA: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fabriquantCarrosseriesVehiculesAutomobiles: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fabriquantComposantCartesElectroniques: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fabriquantDispositifsMedicaux: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fabriquantDispositifsMedicauxCritiques: [],
  fabriquantEquipementCommunication: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fabriquantEquipementIrradiationMedicaleElectromedicauxElectrotherapeutiques:
    [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fabriquantEquipementsAutomobiles: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fabriquantFilsCablesMaterielInstallationElectrique: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fabriquantInstrumentsMesureEssaiNavigationHorlogerie: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fabriquantMachineEquipementNCA: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fabriquantMachineUsageGeneral: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fabriquantMachinesAgricolesForestieres: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fabriquantMachinesFormageMetauxMachinesOutils: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fabriquantMaterielOptiquePhotographiquesSupportsMagnetiquesOptiques: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fabriquantMoteursGeneratriceTransformation: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fabriquantOrdinateursEquipementsPeripheriques: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fabriquantPilesAccumulateursElectriques: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fabriquantProduitPreparationsPharmaceutiques: [
    {
      titre: "Produits pharmaceutiques de base",
      description:
        "-  la production des principes actifs destinés à la fabrication de médicaments : antibiotiques, vitamines de base, acides salicylique et O-acétylsalicylique, etc."
        "-  la transformation du sang"
        "-  la fabrication de sucres chimiquement purs"
        "-  la transformation de glandes et la production d’extraits de glandes, etc.",
    },
    {
      titre: "Préparations pharmaceutiques",
      description:
        "- la fabrication de médicaments : sérums thérapeutiques et autres constituants du sang, vaccins, médicaments divers, y compris les préparations homéopathiques"
        "-  la fabrication de préparations chimiques contraceptives à usage externe et de médicaments contraceptifs à base d’hormones"
        "-  la fabrication de préparations de diagnostic, y compris les tests de grossesse"
        "-  la fabrication de substances radioactives de diagnostic in vivo"
        "-  la fabrication de produits pharmaceutiques issus des biotechnologies"
        "-  la fabrication d’ouates, de gazes et de bandes imprégnées à usage médical, de pansements, de catguts, etc."
        "-  la préparation de produits d’herboristerie (broyage, triage, mouture) à usage pharmaceutique",
    },
  ],
  fabriquantProduitsElectroniquesGrandPublic: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fabriquantProduitsInformatiquesElectroniquesOptiques: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fournisseurPointEchangeInternet: [
    {
      titre: "Point d’échange internet",
      description:
        "Une structure de réseau qui permet l’interconnexion de plus de deux réseaux indépendants (systèmes autonomes), " +
        "essentiellement aux fins de faciliter l’échange de trafic internet, qui n’assure l’interconnexion que pour des " + 
        "systèmes autonomes et qui n’exige pas que le trafic internet passant entre une paire quelconque de systèmes " +
        "autonomes participants transite par un système autonome tiers, pas plus qu’il ne modifie ou n’altère par ailleurs un tel trafic.",
    },
  ],
  fournisseurReseauxCommunicationElectroniquesPublics: [
    {
      titre: "Réseau de communications électroniques public",
      description:
        "Un réseau de communications électroniques utilisé entièrement ou principalement pour la fourniture " +
        "de services de communications électroniques accessibles au public permettant la transmission d’informations " +
        "entre les points de terminaison du réseau.",
    },
  ],
  fournisseurReseauxDiffusionContenu: [
    {
      titre: "Réseau de diffusion de contenu",
      description:
        "Un réseau de serveurs géographiquement répartis visant à assurer la haute disponibilité, l’accessibilité " +
        "ou la fourniture rapide de contenu et de services numériques aux utilisateurs d’internet pour le compte de fournisseurs de contenu et de services.",
    },
  ],
  fournisseurServiceCentresDonnees: [
    {
      titre: "Service de centres de données",
      description:
        "Un service qui englobe les structures, ou groupes de structures, dédiées à l’hébergement, l’interconnexion " + 
        "et l’exploitation centralisées des équipements informatiques et de réseau fournissant des services de stockage, " +
        "de traitement et de transport des données, ainsi que l’ensemble des installations et infrastructures de distribution d’électricité et de contrôle environnemental.",
    },
  ],
  fournisseurServiceCommunicationElectroniquesPublics: [
    {
      titre: "Service de communications électroniques",
      description:
        "Le service fourni normalement contre rémunération via des réseaux de communications électroniques " +
        "qui, à l’exception des services consistant à fournir des contenus transmis à l’aide de réseaux " +
        "et de services de communications électroniques ou à exercer une responsabilité éditoriale sur ces " +
        "contenus, comprend les types de services suivants.",
    },
  ],
  fournisseurServicesDNS: [
    {
      titre: "Fournisseur de services DNS",
      description:
        "Une entité qui fournit :"
        "a)  des services de résolution de noms de domaines récursifs accessibles au public destinés aux utilisateurs finaux de l’internet; ou"
        "b)  des services de résolution de noms de domaine faisant autorité pour une utilisation par des tiers, à l’exception des serveurs de noms de racines.",
    },
    {
      titre: "Système de noms de domaines, ou « DNS »",
      description:
        "Un système hiérarchique et distribué d’affectation de noms qui permet l’identification des services et " +
        "des ressources internet, ce qui rend possible l'utilisation services de routage et de connectivité internet " +
        "par les dispositifs des utilisateurs finaux pour accéder à ces services et ressources.",
    },
  
  ],
  fournisseurServicesGeres: [
    {
      titre: "Fournisseur de services gérés",
      description:
        "Une entité qui fournit des services liés à l’installation, à la gestion, à l’exploitation " +
        "ou à l’entretien de produits, de réseaux, d’infrastructures ou d’applications TIC ou d’autres " +
        "réseaux et systèmes d’information, par l’intermédiaire d’une assistance ou d’une administration " +
        "active, soit dans les locaux des clients, soit à distance.",
    },
  ],
  fournisseurServicesInformatiqueNuage: [
    {
      titre: "Service d’informatique en nuage",
      description:
        "Un service numérique qui permet l’administration à la demande et l’accès large à distance à un ensemble modulable " +
        "et variable de ressources informatiques pouvant être partagées, y compris lorsque ces ressources sont réparties à différents endroits.",
    },
  ],
  fournisseurServicesSecuriteGeres: [
    {
      titre: "Fournisseur de services de sécurité gérés",
      description:
        "Un fournisseur de services gérés qui effectue ou fournit une assistance pour des activités liées à la gestion " +
        "des risques en matière de cybersécurité.",
    },
  ],
  fournisseursDistributeursEauxConsommation: [
    {
      titre: "Eaux destinées à la consommation humaine",
      description:
        "a) Toutes les eaux, soit en l’état, soit après traitement, destinées à la boisson, à la cuisson, à la préparation d’aliments, " +
        "ou à d’autres usages domestiques dans des lieux publics comme dans des lieux privés, quelle que soit leur origine et qu’elles soient " +
        "fournies par un réseau de distribution, à partir d’un camion-citerne ou d’un bateau-citerne, ou en bouteilles ou en récipients, y compris les eaux de source ;"
        " "
        "b) Toutes les eaux utilisées dans les entreprises du secteur alimentaire pour la fabrication, la transformation, " +
        "la conservation ou la commercialisation de produits ou de substances destinés à la consommation humaine.",
    },
  ],
  fournisseursMoteursRechercheEnLigne: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fournisseursPlaceMarcheEnLigne: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  fournisseursPlateformesServicesReseauxSociaux: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  gestionnaireInfrastructure: [
    {
      titre: "Gestionnaire de l’infrastructure",
      description:
        "Toute entité ou entreprise chargée notamment de l'établissement, de la gestion et de l'entretien de l'infrastructure ferroviaire, " +
        "y compris la gestion du trafic, et du système de signalisation et de contrôle-commande; les fonctions de gestionnaire de l'infrastructure " +
        "sur tout ou partie d'un réseau peuvent être attribuées à plusieurs entités ou entreprises.",
    },
  ],
  gestionnaireInstallationGNL: [
    {
      titre: "Gestionnaire d’installation de GNL",
      description:
        "Toute personne physique ou morale qui effectue la liquéfaction du gaz naturel ou l’importation, le déchargement et la regazéification du GNL, et qui est responsable de l’exploitation d’une installation de GNL.",
    },
  ],
  gestionnaireInstallationStockage: [
    {
      titre: "Gestionnaire d’installation de stockage",
      description:
        "Une personne physique ou morale qui effectue le stockage et est responsable de l’exploitation d’une installation de stockage.",
    },
  ],
  gestionnaireReseau: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  gestionnaireReseauDistribution: [
    {
      titre: "Gestionnaire de réseau de distribution",
      description:
        "Une personne physique ou morale responsable de l'exploitation, de la maintenance et, si nécessaire, " +
        "du développement du réseau de distribution dans une zone donnée et, le cas échéant, de ses interconnexions " +
        "avec d'autres réseaux, et chargée de garantir la capacité à long terme du réseau à satisfaire une demande raisonnable de distribution d’électricité.",
    },
  ],
  gestionnaireReseauTransport: [
    {
      titre: "Gestionnaire de réseau de transport",
      description:
        "Une personne physique ou morale qui est responsable de l'exploitation, de la maintenance et, si nécessaire, " +
        "du développement du réseau de transport dans une zone donnée et, le cas échéant, de ses interconnexions " +
        "avec d'autres réseaux, et chargée de garantir la capacité à long terme du réseau à satisfaire une demande raisonnable de transport d’électricité.",
    },
  ],
  laboratoireReferenceUE: [],
  operateurDesigneMarcheOuNemo: [
    {
      titre: "Opérateur désigné du marché de l'électricité ou NEMO",
      description:
        "Un opérateur du marché désigné par l’autorité compétente pour exécuter des tâches en lien avec le couplage unique journalier ou le couplage unique infrajournalier.",
    },
  ],
  operateurReseauChaleurFroid: [
    {
      titre: "Réseau de chaleur ou réseau de froid ",
      description:
        "La distribution d'énergie thermique sous forme de vapeur, d'eau chaude ou de fluides réfrigérants, à partir d'une installation " +
        "centrale ou décentralisée de production et à travers un réseau vers plusieurs bâtiments ou sites, pour le chauffage ou le " +
        "refroidissement de locaux ou pour le chauffage ou le refroidissement industriel.",
    },
  ],
  organismeRecherche: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  prestataireServiceConfiance: [
    {
      titre: "Service de confiance",
      description:
        "Un service électronique normalement fourni contre rémunération qui consiste :"
        "a) en la création, en la vérification et en la validation de signatures électroniques, de cachets électroniques ou d’horodatages électroniques, de services d’envoi recommandé électronique et de certificats relatifs à ces services; ou"
        "b) en la création, en la vérification et en la validation de certificats pour l’authentification de site internet; ou" 
        "c) en la conservation de signatures électroniques, de cachets électroniques ou des certificats relatifs à ces services.",
    },
    {
      titre: "Prestataire de services de confiance",
      description:
        "Une personne physique ou morale qui fournit un ou plusieurs services de confiance, " +
        "en tant que prestataire de services de confiance qualifié ou non qualifié.",
    },
  ],
  prestataireSoinsSante: [
    {
      titre: "Prestataire de soins de santé",
      description:
        "Toute personne physique ou morale ou toute autre entité qui dispense légalement des soins de santé sur le territoire d’un État membre.",
    },
  ],
  prestatairesServicesPostauxExpedition: [
    {
      titre: "Services postaux",
      description:
        "Des services qui consistent en la levée, le tri, l'acheminement et la distribution des envois postaux.",
    },
  ],
  producteur: [
    {
      titre: "Producteur",
      description:
        "Une personne physique ou morale qui produit de l’électricité.",
    },
  ],
  rechercheDeveloppementMedicament: [
    {
      titre: "Médicament",
      description:
        "Toute substance ou composition présentée comme possédant des propriétés curatives ou préventives à l'égard des maladies humaines. " +
        "Toute substance ou composition pouvant être administrée à l'homme en vue d'établir un diagnostic médical ou de restaurer, " +
        "corriger ou modifier des fonctions physiologiques chez l'homme est également considérée comme médicament.",
    },
  ],
  registresNomsDomainesPremierNiveau: [
    {
      titre: "Registre de noms de domaines de premier niveau",
      description:
        "Une entité à laquelle un domaine de premier niveau spécifique a été délégué et qui est responsable " +
        "de l’administration du domaine de premier niveau, y compris de l’enregistrement des noms de domaines " +
        "relevant du domaine de premier niveau et du fonctionnement technique du domaine de premier niveau, " +
        "notamment l’exploitation de ses serveurs de noms, la maintenance de ses bases de données et la distribution " +
        "des fichiers de zone du domaine de premier niveau sur les serveurs de noms, que ces opérations soient effectuées " + 
        "par l’entité elle-même ou qu’elles soient sous-traitées, mais à l’exclusion des situations où les noms de domaines " +
        "de premier niveau sont utilisés par un registre uniquement pour son propre usage.",
    },
  ],
  secteurAlimentaireDistributionGrosProductionTransformationIndustrielle: [
    {
      titre: "...",
      description:
        "...",
    },
  ],
  serviceControleCirculationAerienne: [
    {
      titre: "Service du contrôle de la circulation aérienne",
      description:
        "Un service assuré dans le but d’empêcher les abordages entre aéronefs, les collisions (sur l'aire de manoeuvre, entre les aéronefs et des obstacles) et d'accélérer et de régulariser la circulation aérienne.",
    },
  ],
  societeTransportEaux: [
    {
      titre: "Sociétés de transport par voie d’eau intérieure, maritime et côtier de passagers et de fret",
      description:
        "https://eur-lex.europa.eu/legal-content/FR/TXT/HTML/?uri=CELEX:32004R0725",
    },
  ],
  transporteursAeriensCommercial: [
    {
      titre: "Transporteur aérien",
      description:
        "Une entreprise de transport aérien titulaire d’une licence d’exploitation valable ou d’un document équivalent.",
    },
  ],
};
