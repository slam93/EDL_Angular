export const langue = {
  FR :
    {
      erreurConnexion: "Il semble que vous êtes pas connecté à Internet",
      type_langue: "fr",
      bienvenue: "Bienvenue à la résidence santa apolonia",
      message_bienvenue:
        "Afin de pouvoir utiliser l'application, merci de bien vouloir scanner le Qr Code présent dans votre appartement...",
      message_fin_bienvenue:
        "Si vous rencontrez des difficultés d'utilisation.",
      entrer_num:"Veuillez entrer le numeros de votre appartement ici",
      menu_entete_caution: "Votre caution",
      menu_entete_inventaire: "Inventaire",
      menu_entete_incidents: "Incidents",

      reinitialisation: "Réinitialisation manuelle",
      code_sejour_reinitialisation: "Entrez le code du séjour",
      mdp_reinitialisation: "Entrez le mot de passe",
      btn_reinitialisation: "Valider",

      nom_appartement: "appartement ",
      intro_appartement:
        "Merci de bien vouloir remplir les éléments ci-dessous relatifs à votre sejour pour finir la configuration...",
      config_prenom: "Prénom",
      config_nom: "Nom",
      config_email: "Adresse mail",
      config_num_appartement: "Numéro de l'appartement",
      config_date_fin: "Date de fin de séjour",

      titre_menu: "voici votre tableau de bord",
      intro_menu:
        "Vous pouvez dès à présent effectuer votre état des lieux d'arrivée, signaler par la suite un incident pendant votre séjour puis effectuer votre état de lieux de sortie.",
      edl_arrivee_menu: "état des lieux d'arrivée",
      edl_sortie_menu: "état des lieux de sortie",
      signaler_menu: "signaler un incident pendant le séjour",

      // Etat de arrivée
      titre_etatArrivee: "état des lieux d'arrivée",
      intro_etatArrivee:
        "L'appartement a été vérifié avant votre arrivée. Si vous constatez un problème veuillez le signaler immédiatement.",
      titre_etatArriveeColumn1: "Equipement / Meuble",
      titre_etatArriveeQuantite: "Quantité",
      titre_etatArriveeEtat: "Etat",
      btnSignale_etatArrivee: "je signale un problème dans cette pièce",
      btnValide_etatArrivee: "je valide et je passe à la pièce suivante",
      btnFinValide_etatArrivee: "je finalise mon etat de lieux d'arrivée",

      introCertifier:
        "Vous trouverez ci-dessous le récapitulatif de votre état des lieux d'arrivée dans l'appartement.",
      signatureCertifier: "Signez avec votre doigt dans le cadre ci-dessous",
      btnCertifier: "je certifie conforme et valide ma déclaration",

      titre_signalerProbleme: "signaler un problème",
      intro_signalerProbleme:
        "Utilisez le formulaire ci-dessous pour signaler l'objet ou le mobilier cassé ...",
      conclusion_signalerProbleme:
        "En signalant maintenant ce problème, votre caution ne sera pas impactée.",
      btn_signalerProbleme: "valider",
      btnPrendrePhoto_signalerProbleme: "prendre une photo",
      btnPrendrePhoto_signalerProblemeCharger: "Photo chargée",
      signalerProbleme_piece: "Pièce de l'appartement",
      signalerProbleme_objet: "Objet / meuble",
      signalerProbleme_quantite: "Quantité",
      signalerProbleme_etat: "Etat",
      signalerProbleme_explication: "Explications (facultatives)",
      successSignalerProblem: "Problème signalé avec succès",

      titre_incident: "déclarer un incident",
      intro_incident:
        "Utilisez le formulaire ci-dessous pour signaler l'objet ou le mobilier cassé ...",
      btn_incident: "valider",
      incident_piece: "Pièce de l'appartement",
      incident_objet: "Objet / meuble",
      incident_quantite: "Quantité",
      incident_etat: "Etat",
      incident_explication: "Explications (facultatives)",
      conclusion_incident:
        "D'après votre déclaration, le prix de l'objet concerné pourra être déduit de votre caution. Plus d'infos dans la rubrique «incidents»",

      titre_modalIncident: "merci",
      contenu_modalIncident: "Votre déclaration a été prise en compte.",
      titre_ficheInventaire: "fiche d'inventaire",
      intro_ficheInventaire:
        "Vous pouvez consulter ci-dessous la fiche d'inventaire des équipements...",
      intro2_ficheInventaire:
        "En cas de casse, de détérioration non signalée (pendant votre séjour et/ou sur votre état des lieux de sortie) et de vol, le prix majoré de chaque élément concerné sera retenu sur votre caution.",
      titre_ficheInventaireColumn1: "Equipement / Meuble",
      titre_ficheInventaireQuantite: "Qté",
      titre_ficheInventairePrix: "Prix",
      titre_ficheInventairePrixMajore: "Prix Majoré",

      titre_listincident: "Liste des incidents",
      intro_listincident:
        "Vous trouverez ci-dessous la liste des éléments manquants, cassés ou endommagés que vous avez déclaré.",
      intro2_listincident:
        "En cas de casse, de détérioration non signalée (pendant votre séjour et/ou sur votre état des lieux de sortie) et de vol, le prix majoré de chaque élément concerné sera retenu sur votre caution.",
      titre_listincidentDate: "Date",
      titre_listincidentColumn1: "Equipement / Meuble",
      titre_listincidentQuantite: "Qté",
      titre_listincidentMontant: "Montant retenu",
      footer_listincidentColumn1: "Caution initiale",
      footer_listincidentColumn2: "Montant retenu",
      footer_listincidentColumn3: "Caution remboursée",

      scanPermission: "Scanner le QR Code",
      scanPermissionDetails:
        "L'application a besoin de votre permission pour accéder à votre camera",

      // Erreur Toast
      erreurVide: "Veuillez remplir les champs vide",
      erreurSauvegardeDonne: "Erreur de sauvegarde de données",
      erreurEmail: "Adresse email existant",
      erreurScan: "Erreur de scan. Veuillez réessayer ultèrieurement",
      erreurScanOccupant: "Appartement occupé",
      erreurSignalerProblem: "Erreur, Veuillez réessayer",
      erreurSignalerProblemImage: "Veuillez insérer l'image",
      erreurSignalerProblemImageSize:
        "La photo est volumineuse, choisir une autre photo",
      erreurSignalerProblemNom_piece: "Veuillez choisir le nom de la pièce",
      erreurSignalerProblemObjet:
        "Veuillez choisir l'objet correspondant à la pièce",
      erreurSignalerProblemQuantite: "Veuillez entrer la quantité",
      erreurSignalerProblemEtat: "Veuillez entrer l'Etat de l'objet",
      erreurReinitialisation: "Erreur, Veuillez réessayer",

      // contenu certification
      contenu_modalCertification:
        "Toute l'équipe de la résidence Santa Apolonia vous souhaite un excellent séjour !",
      contenu_modalCertificationSortie:
        "Nous vous remercions pour votre séjour et avons hâte de vous accueillir de nouveau !",

      // Direction Liste Incident
      direction_listeIncident: "Aucun frais retenus",
      direction_listeIncidentPrix: "La Direction applique une retenue de ",

      // Erreur Menu
      erreurMenu: "Veuillez vérifier l' Etat des lieux d'arrivée",
      erreurMenuArrivee: "Accès non autorisé",

      // Etat de sortie
      titre_etatSortie: "état des lieux de sortie",
      intro_etatSortie: "L'appartement a été vérifié avant votre sortie...",
      titre_etatSortieColumn1: "Equipement / Meuble",
      titre_etatSortieQuantite: "Quantité",
      titre_etatSortieEtat: "Etat",
      valueEtat1: "Pendant le séjour",
      valueEtat2: "Etat d'arrivée",
      btnSignale_etatSortie: "je signale un problème dans cette pièce",
      btnValide_etatSortie: "je valide et je passe à la pièce suivante",
      btnFinValide_etatSortie: "je finalise mon etat de lieux de sortie",
      annuler: "Annuler",
      confirmer: "Confirmer",
      erreurMaxItem: "Quantité supérieure à la quantité maximale"
    },
  EN: {
    erreurConnexion: "It seems that you are not connected to the Internet",
    type_langue: "en",
    bienvenue: "welcome to residence santa apolonia",
    message_bienvenue:
      "In order to use the application, thank you kindly scan the Qr Code present in your apartment ...",
    message_fin_bienvenue:
      "If you encounter difficulties in use.",
    entrer_num:"Please enter your apartment number here",
    menu_entete_caution: "Your deposit",
    menu_entete_inventaire: "Inventory",
    menu_entete_incidents: "Incidents",

    reinitialisation: "Manual reset",
    code_sejour_reinitialisation: "Enter the code of the stay",
    mdp_reinitialisation: "Enter the password",
    btn_reinitialisation: "Validate",

    nom_appartement: "appartement ",
    intro_appartement:
      "Thank you for completing the following items related to your stay to finish the configuration ...",
    config_prenom: "First name",
    config_nom: "Last name",
    config_email: "Email Address",
    config_num_appartement: "Number of the apartment",
    config_date_fin: "End of stay",

    titre_menu: "here is your dashboard",
    intro_menu:
      "You can now make your inventory of places of arrival, report later an incident during your stay then perform your inventory of places of exit.",
    edl_arrivee_menu: "state of arrival",
    edl_sortie_menu: "state of fixtures",
    signaler_menu: "report an incident during the stay",

    // Etat de arrivée
    titre_etatArrivee: "state of arrival",
    intro_etatArrivee:
      "The apartment has been checked before your arrival. If you find a problem please report it immediately.",
    titre_etatArriveeColumn1: "Equipment / Furniture",
    titre_etatArriveeQuantite: "Quantity",
    titre_etatArriveeEtat: "State",
    btnSignale_etatArrivee: "I'm reporting a problem in this room",
    btnValide_etatArrivee: "I validate and move on to the next room",
    btnFinValide_etatArrivee: "I finalize my state of arrival places",

    introCertifier:
      "You will find below the summary of your inventory of places of arrival in the apartment.",
    signatureCertifier: "Sign with your finger in the box below",
    btnCertifier: "I certify and validate my statement",

    titre_signalerProbleme: "report a problem",
    intro_signalerProbleme:
      "Use the form below to report the broken object or furniture ...",
    conclusion_signalerProbleme:
      "By reporting this problem now, your deposit will not be impacted.",
    btn_signalerProbleme: "validate",
    btnPrendrePhoto_signalerProbleme: "take a picture",
    btnPrendrePhoto_signalerProblemeCharger: "photo uploaded",
    signalerProbleme_piece: "Room of the apartment",
    signalerProbleme_objet: "Object / furniture",
    signalerProbleme_quantite: "Quantity",
    signalerProbleme_etat: "State",
    signalerProbleme_explication: "Explanations (optional)",
    successSignalerProblem: "Problem reported with success",

    titre_incident: "report an incident",
    intro_incident:
      "Use the form below to report the broken object or furniture ...",
    btn_incident: "validate",
    incident_piece: "Room of the apartment",
    incident_objet: "Object / furniture",
    incident_quantite: "Quantity",
    incident_etat: "State",
    incident_explication: "Explanations (optional)",
    conclusion_incident:
      "According to your declaration, the price of the object concerned can be deducted from your deposit. More info in the “incidents” section",

    titre_modalIncident: "Thank You",
    contenu_modalIncident: "Your statement has been taken into account.",
    titre_ficheInventaire: "inventory sheet",
    intro_ficheInventaire:
      "You can consult below the equipment inventory sheet ...",
    intro2_ficheInventaire:
      "In the event of breakage, deterioration not reported (during your stay and / or on your exit inventory) and theft, the increased price of each element concerned will be retained on your deposit.",
    titre_ficheInventaireColumn1: "Equipment / Furniture",
    titre_ficheInventaireQuantite: "Qty",
    titre_ficheInventairePrix: "Price",
    titre_ficheInventairePrixMajore: "Increased price",

    titre_listincident: "List of incidents",
    intro_listincident:
      "You will find below the list of missing, broken or damaged items that you have declared.",
    intro2_listincident:
      "In the event of breakage, deterioration not reported (during your stay and / or on your exit inventory) and theft, the increased price of each element concerned will be retained on your deposit.",
    titre_listincidentDate: "Date",
    titre_listincidentColumn1: "Equipment / Furniture",
    titre_listincidentQuantite: "Qty",
    titre_listincidentMontant: "Amount retained",
    footer_listincidentColumn1: "Initial bond",
    footer_listincidentColumn2: "Amount retained",
    footer_listincidentColumn3: "Deposit refunded",

    scanPermission: "QR Code Scan",
    scanPermissionDetails: " App needs access to your camera",

    // Erreur Toast
    erreurVide: "Please fill in the empty fields",
    erreurSauvegardeDonnees: "Error saving data",
    erreurEmail: "Existing email address",
    erreurScan: "Scan error. Please retry later",
    erreurScanOccupant: "Occupied apartment",
    erreurSignalerProblem: "Error, Please try again",
    erreurSignalerProblemImage: "Please insert the image",
    erreurSignalerProblemImageSize: "The photo is large, choose another photo",
    erreurSignalerProblemNom_piece: "Please choose the name of the room",
    erreurSignalerProblemObjet:
      "Please choose the object corresponding to the room",
    erreurSignalerProblemQuantite: "Please enter the quantity",
    erreurSignalerProblemEtat: "Please enter the State of the object",
    erreurReinitialisation: "Error, Please try again",

    // contenu certification
    contenu_modalCertification:
      "The whole team of the residence Santa Apolonia wish you a great stay!",
    contenu_modalCertificationSortie:
      "We thank you for your stay and look forward to seeing you again!",

    // Direction Liste Incident
    direction_listeIncident: "No fees retained",
    direction_listeIncidentPrix: "Management applies a deduction of ",

    // Erreur Menu
    erreurMenu: "Please check the State of Arrival",
    erreurMenuArrivee: "Unauthorized access",

    // Etat de sortie
    titre_etatSortie: "state of exit",
    intro_etatSortie: "The apartment has been checked before your arrival ...",
    titre_etatSortieColumn1: "Equipment / Furniture",
    titre_etatSortieQuantite: "Quantity",
    titre_etatSortieEtat: "State",
    valueEtat1: "During the Stay",
    valueEtat2: "Arrival State",
    btnSignale_etatSortie: "I'm reporting a problem in this room",
    btnValide_etatSortie: "I validate and move on to the next room",
    btnFinValide_etatSortie: "I finalize my state of exit places",
    annuler: "Cancel",
    confirmer: "Confirm",
    erreurMaxItem: "Quantity greater than the maximum quantity"
  }
};





