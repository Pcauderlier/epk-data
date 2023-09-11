



export default function dataSort(eleve){
    let doneTrier  = []; // Liste contenant des listes triers par cours [[nomCours,[éleve,éleve,éleve],dateCours],[nomCours,[éleve,éleve,éleve]]]
    let dateCours ;
    let listeCours = [];
    let nomCours;
    let today = new Date();
    function extractDate(objet){
        let str = objet.products[0].name.substr(objet.products[0].name.length-10);
        //str == dd/mm/aaaa
        let d = str.split("/");
        if (d.length < 3){
        return false
        }
        return new Date(d[2],+(d[1]-1),d[0])
    }
     

    for (let com of eleve){
        nomCours = com.products[0].name;
        if (!nomCours.includes("Paiement") && (nomCours.includes("2023")) && (!nomCours.includes("2022"))){
            extractDate(com) === false ? dateCours = 0 : dateCours = extractDate(com); // Laisse passer les AT qui se font 1 fois par mois 
            if ((dateCours >= today) || dateCours === 0 ){
                /*if (nomCours.includes("Paiement")){ fonctionne pas encore
                    nomCours = nomCours.split("pour ")[1]//Suprimme la partie Paiement n°2 et ne laisse que le nom du cours
                    
                }*/
                if (!listeCours.includes(nomCours)){
                    doneTrier.push([nomCours,[com],dateCours]);
                    listeCours.push(nomCours);
                }
                else{
                    for (let i in doneTrier){
                        if (doneTrier[i][0] === nomCours){
                            doneTrier[i][1].push(com)
                        }
                    }
                }
            }      
      
        }
    }
    console.log("coucou")
    doneTrier.sort((a,b)=>a[2]-b[2])
    return doneTrier
}