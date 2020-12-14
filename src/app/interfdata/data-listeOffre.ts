export const ListeOffre: any =
[
    {
        mecano: {
            id: 1,
            nom: "GARAGE A.M.K AUTO",
            adresse: "92 rue Henri ghesquiere app1",
            localisation: "41.40338, 2.17403"
        },
        prixIntervention: "150,50",
        listeIntervention: [
            { 
                day: "Vendredi 09 Octobre 2020",
                intervention: [
                    {heure: "08:00", disponible: false}, {heure: "09:00", disponible: true}, {heure: "10:00", disponible: true},
                    {heure: "11:00", disponible: false}, {heure: "12:00", disponible: false}, {heure: "13:00", disponible: false},
                    {heure: "14:00", disponible: false}, {heure: "15:00", disponible: true}, {heure: "16:00", disponible: false},
                    {heure: "17:00", disponible: false}, {heure: "18:00", disponible: false}
                ]
            },
            {
                day: "Samedi 10 Octobre 2020",
                intervention: [
                    {heure: "08:00", disponible: false}, {heure: "09:00", disponible: false}, {heure: "10:00", disponible: false},
                    {heure: "11:00", disponible: false}, {heure: "12:00", disponible: true}, {heure: "13:00", disponible: false},
                    {heure: "14:00", disponible: true}, {heure: "15:00", disponible: true}, {heure: "16:00", disponible: false},
                    {heure: "17:00", disponible: false}, {heure: "18:00", disponible: false}
                ]
            },
            {
                day: "Dimanche 11 Octobre 2020",
                intervention: [
                    {heure: "08:00", disponible: false}, {heure: "09:00", disponible: false}, {heure: "10:00", disponible: false},
                    {heure: "11:00", disponible: false}, {heure: "12:00", disponible: true}, {heure: "13:00", disponible: false},
                    {heure: "14:00", disponible: true}, {heure: "15:00", disponible: false}, {heure: "16:00", disponible: true},
                    {heure: "17:00", disponible: false}, {heure: "18:00", disponible: false}
                ]
            }
        ]
    },
    {
        mecano: {
            id: 2,
            nom: "GARAGE GEEK AUTO",
            adresse: "26 rue Ernest Renan 92240 MALAKOFF",
            localisation: "41.40338, 2.17403"
        },
        prixIntervention: "145,50",
        listeIntervention: [
            {
                day: "Vendredi 09 Octobre 2020",
                intervention: [
                    {heure: "08:00", disponible: false}, {heure: "09:00", disponible: false}, {heure: "10:00", disponible: false},
                    {heure: "11:00", disponible: true}, {heure: "12:00", disponible: false}, {heure: "13:00", disponible: false},
                    {heure: "14:00", disponible: false}, {heure: "15:00", disponible: true}, {heure: "16:00", disponible: true},
                    {heure: "17:00", disponible: false}, {heure: "18:00", disponible: false}
                ]
            },
            {
                day: "Samedi 10 Octobre 2020",
                intervention: [
                    {heure: "08:00", disponible: false}, {heure: "09:00", disponible: false}, {heure: "10:00", disponible: true},
                    {heure: "11:00", disponible: false}, {heure: "12:00", disponible: true}, {heure: "13:00", disponible: false},
                    {heure: "14:00", disponible: true}, {heure: "15:00", disponible: false}, {heure: "16:00", disponible: false},
                    {heure: "17:00", disponible: false}, {heure: "18:00", disponible: false}
                ]
            },
            {
                day: "Dimanche 11 Octobre 2020",
                intervention: [
                    {heure: "08:00", disponible: false}, {heure: "09:00", disponible: false}, {heure: "10:00", disponible: false},
                    {heure: "11:00", disponible: true}, {heure: "12:00", disponible: true}, {heure: "13:00", disponible: true},
                    {heure: "14:00", disponible: false}, {heure: "15:00", disponible: false}, {heure: "16:00", disponible: false},
                    {heure: "17:00", disponible: false}, {heure: "18:00", disponible: false}
                ]
            }
        ]
    }
];


// Liste Intervention  selon la date actuel de selection par rapport à l'offre
