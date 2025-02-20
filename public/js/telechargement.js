// tableau des fichiers a telecharger
const filesToDownload =
[
    {name: "Modèle_Cotation_Véhicule.xlsx", url: $('#loadurl_base').attr('content')+'/storage/modele_cotation_vehicule.xlsx', tab: "Tab_Vehicule"},
    {name: "Modèle_Cotation_Bâtiment.xlsx", url: $('#loadurl_base').attr('content')+'/storage/Modèle_Cotation_Bâtiment.xlsx', tab: "Tab_Batiment"},
];
// url: $('#loadurl_base').attr('content')+'/cotation/final',

// const startDownloadLink = document.getElementById("download");

function downloadFilesSequentially()
{
    if (filesToDownload.length > 0) {
        const file = filesToDownload.shift();
        let activeTab = ($("#cotation_vehicule-tab").hasClass("active")) ? "Tab_Vehicule" : "Tab_Batiment";
        if (file.tab === activeTab) {
            // Télécharger le fichier approprié
            const anchor = document.createElement("a");
            anchor.href = file.url;
            anchor.download = file.name;
            anchor.style.display = "none";
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
            // Après le téléchargement, traitez le fichier Excel et remplissez le tableau
            processExcelData(file);
        }
        setTimeout(function() {
            downloadFilesSequentially();
        }, 1000);
    } else {
        useSwalNotification("Modèle déjà Chargé", "warning");
    }
}

$('body').on("click", "#download", function (event)
{
    event.preventDefault();
    downloadFilesSequentially();
});
//Exportation de données du DataTable
$('body').on("click", "#exportFile", function(){ 
    // Exporter les données de la DataTable vers un fichier Excel
    var type = $('.nav-link.active').data('type');
    const dataToExport = exportDataTableToExcel(type);
    generateExcelFile(dataToExport, type);
});
function exportDataTableToExcel(type) {
    let table;

    if(type==="Vehicule"){
        table = tableRender['TableauCotationVehicule'];
        console.log(table);
    }else{
        table =  tableRender['TableauCotationBatiment'];
        console.log(table);
    }
    let data = table.rows().data().toArray();
    return data;
}  
function generateExcelFile(data, nameFile) {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' }); 

    const fileName = 'Liste_Cotation_'+nameFile+'_.xlsx';

    // Télécharger le fichier Excel en utilisant FileSaver.js
    saveAs(blob, fileName);
}


//Importation
////////////////////! Bouton Actualiser la page
// Récupérer le lien par son ID
// var actualiserLink = document.getElementById('actualiser-link');

// Récupérer l'icône par son ID
// var iconeRotation = document.getElementById('icone-rotation');

// Ajouter un gestionnaire d'événements "click" au lien
$('body').on("click", "#icone-rotation", function (event) {
    // Empêcher le comportement par défaut du lien (ne pas suivre le lien)
    event.preventDefault();

    // Ajouter la classe "rotating" pour déclencher l'animation
    iconeRotation.classList.add('rotating');

    // Actualiser la page après un certain délai (1 seconde dans cet exemple)
    setTimeout(function () {
        // Retirer la classe "rotating" pour arrêter l'animation
        iconeRotation.classList.remove('rotating');

        // Actualiser la page
        location.reload();
    }, 1000); // 1 seconde
});


//Importation de données dans le DataTable
$('#importFile').on('click', function () {
    // Créez un input de type "file" dynamiquement
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx'; // Définissez les types de fichiers acceptés (facultatif)

    // Attachez un gestionnaire d'événements au changement de valeur de l'input file
    fileInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        var type = $('.nav-link.active').data('type');
        console.log(type);
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });

                // Choisissez la feuille de calcul que vous souhaitez importer (par exemple, la première feuille)
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                // Convertissez les données de la feuille de calcul en tableau JSON
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                // Obtenez les en-têtes de colonne à partir de la première ligne
                const headers = jsonData[0];

                // Taguer le Tableau que l'on veut utiliser 
                var table = $(('#TableauCotation')+type).DataTable();
                
                // Maintenant que la table est ciblé, obtenez les en-têtes des colonnes du Tableau
                var entetes = table.columns().header();
                //Déclarer un Tableau pour stocker les en-têtes
                var contenuEntetesTableau = [];

                // Parcourez chaque en-tête et obtenez son contenu HTML
                for(var i = 0; i < entetes.length;i++){
                    contenuEntetesTableau.push(entetes[i].innerHTML);
                }

                //Convertir l'objet << contenuEntetesTableau >> en string
                var stringDataTableTitle = JSON.stringify(contenuEntetesTableau)

                // Supprimez la première ligne (en-têtes) des données
                jsonData.shift();

                //Vérifier si c'est le bon fichier Excel que l'on tente d'ouvrir
                if (stringDataTableTitle == JSON.stringify(headers) )   {
                    var ajaxPromises = [];
                    var i=0;
                    // Créez une boucle pour parcourir les lignes du tableau
                    for ( i = 0; i < jsonData.length; i++) {
                        // Initialisez un objet vide pour stocker les données de la ligne actuelle
                        var rowData = {};
                        // Parcourir les colonnes de la ligne actuelle
                        for (var j = 0; j < headers.length; j++) {
                            // Vérifiez si la colonne existe dans les données JSON
                            if (jsonData[i][j] !== undefined) {
                                // Ajoutez la valeur de la colonne à l'objet rowData
                                rowData[headers[j]] = jsonData[i][j];
                            }
                        }
                        // Vérifiez si la ligne contient des données
                        if (Object.keys(rowData).length > 0) {
                            // Créez une Promise pour la requête AJAX
                            if (type === 'Vehicule') {
                                var ajaxPromise = $.ajax({
                                    url: $('#loadurl_base').attr('content') + '/Enregistrer_vehicule_importFile',
                                    type: 'POST',
                                    data: { rowData: rowData }, // Envoyez les données de la ligne
                                });
                            } else if (type === 'Batiment') {
                                var ajaxPromise = $.ajax({
                                    url: $('#loadurl_base').attr('content') + '/Enregistrer_batiment_importFile',
                                    type: 'POST',
                                    data: { rowData: rowData }, // Envoyez les données de la ligne
                                });
                            }
                            // Ajoutez la Promise au tableau des Promises
                            ajaxPromises.push(ajaxPromise);
                        }
                    }
                    // Utilisez Promise.all() pour attendre que toutes les Promises se terminent
                    Promise.all(ajaxPromises)
                    .then(function () {
                        // Toutes les requêtes AJAX sont terminées avec succès
                        $('.tabletoget').each(function() {
                            tableRender[$( this ).html()].ajax.reload();            
                        });
                        // Affichez le message de succès une fois
                        useSwalSuccess(Object.keys(rowData).length +' Cotations ont été importées');
                    })
                    .catch(function (error) {
                        // Une ou plusieurs requêtes ont échoué
                        useSwalError('Réessayer l\'importation !');
                        console.error(error);
                    });
                }else{
                    useSwalError("Désolé, vous tentez d'ouvrir le mauvais fichier !");
                }
            };
            reader.readAsBinaryString(file);
        }
    });

    // Déclenchez le clic sur l'input file
    fileInput.click();
});