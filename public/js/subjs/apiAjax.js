//!MISE A JOUR DES URL****************************************
// function urlUpdate(paramsUrl) {
//     history.pushState(null, '', paramsUrl)
//     //return;
//     // window.location.href.indexOf(paramsUrl) > -1 ? '': ;
//     /**console.log(paramsUrl);
//         preventDefault();
//         // var paramsUrl=$(this).attr('href'); */
// }
//generation des cookies de sauvegardes des donnees utilisateurs----
//fonction d'ajout de 
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  //fonction de recuperation de cookie
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  //fonction de verification de la presence du cookie
  function checkCookie() {
    var RecuperationCookies = null;
    var RecuperationCookiesBeneficiaires = null;
    val = document.cookie.split(';')
      .map(cookie => cookie.split('='))
      .reduce((accumulator, [key, value]) => ({
        ...accumulator,
        [key.trim()]: decodeURIComponent(value)
      }), {});
  }
  
  //fonction de suppression de cookie
  function delete_cookie(name) {
    document.cookie = name + '=; Path=/;  Domain=' + location.host + '; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=None; Secure'
  }
  
    
    
//! PARAMETRE DES REQUETES AJAX*******************************
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
});
//!DISPLAY ERROR**********************************************
async function displayerror(params) {
    Swal.close();
    const {
        value: accept
    } = await Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Chargement...',
        text: "Contactez l'administrateur !",
        allowOutsideClick:false,
        input: 'checkbox',
        inputValue: 1,
        inputPlaceholder: 'Ignorer',
        didOpen: () => {
            Swal.showLoading(Swal.getDenyButton())
        },        
        inputValidator: (result) => {
            if (!result) {
                //console.log(params.responseText);
                $('#validation-errors').html('');
                //$.each(params, function (key, value) {
                    $('<iframe id="myFrame" name="myFrame" height="800" class="w-100 alert alert-danger">').appendTo("#validation-errors").ready(function(){
                        setTimeout(function(){
                            $('#myFrame').contents().find('body').append(params);
                        },50);
                    });
                // $('#validation-errors').append('<div class="alert alert-danger">' + params + '</div');
                //});
                $('#alertModal').modal('show');
            }
        }
    })
    if (accept) {
        location.reload(true);
    }
}

//requete ajax pour le chargement des choix du menu.

// fonction generation de tr, td tableau
function generateTableHead(table, data) {
let thead = table.createTHead();
let row = thead.insertRow();
for (let key of data) {
    let td = document.createElement("td");
    if (key === " " || key == null) {
    key = " ";
    }
    td.classList.add("tableoneline", "text-sm");
    let text = document.createTextNode(key);
    td.appendChild(text);
    row.appendChild(td);
}
}
function generateTableRows(table, data) {
let newRow = table.insertRow(-1);
data.map((row) => {
    if (row === "" || row == null) {
    row = " ";
    }
    let newCell = newRow.insertCell();
    let newtext = document.createTextNode(row);
    newCell.appendChild(newtext);
});
}
// fonction ouverture de vue et modals
const fopen =(name=null,urllink=null,position=null)=>{
    console.log(name,urllink,position);
    if (name==null) return;
    let view=name.split(".")[0]? name.split(".")[0] : null;
    let modal=name.split(".")[1]? name.split(".")[1] : null;
    let state=name.split(".")[2]? name.split(".")[2] : null;
    let linkPosition=name.split(".")[3]? name.split(".")[3] : null;
    let classes=name.split(".")[4]? name.split(".")[4] : null;
    let id=name.split(".")[5]? name.split(".")[5] : 1;

    console.table('view='+view,'modal='+modal,'state='+state,'linkPosition='+linkPosition,'classes='+classes,'urllink='+urllink,'position='+position);
    // return
    if (view=='Business/form/FormAddReinsurer') {
        id=$('#'+modal+'result div').length+1
    }
    $.ajax({
        type: 'GET',
        url: (urllink==null ? '' : urllink),
        data: {'view':view,'id':id,'classes':classes},
        success: function (response) {
            console.log(response)
            if (response.message)
            {
                useSwalNotification(response.message, icon="warning",link=['',''], timer = 11000)
            }
            else
            {
                $('#'+linkPosition).empty().append(response);                
                $('#'+modal).modal(state);
                // if (urllink==null) {
                //     $('#'+modal+' form').trigger("reset")
                // }
                if (position!==null) {
                    $('#'+position).html(response);
                }            
                // reload des tableau
                $('.tabletoget').each(function() {
                    tableRender[$( this ).html()].ajax.reload();            
                });
            }
        },
        error: function (error) {
            console.error(error);
            // displayerror(error.responseText)
        }
    });
    
}

function handleAnalyserDemandeClick() {
    // Récupérez tous les éléments cochés dans la colonne appropriée
    var checkedElements = document.querySelectorAll('.checkname:checked');
    
    // Récupérez les ID des éléments cochés
    var selectedIds = Array.from(checkedElements).map(function (element) {
        return element.id;
    });

    // Construisez la partie de l'URL avec les ID sélectionnés
    // var urlPart = selectedIds.join(',');
        // console.log(urlPart);
        // return;
    // Utilisez les ID dans la fonction fopen
    fopen('modals/analyse_demande.modalanalyse.show.PositionModal1', 'traiter_demande/analyse_demande/view/' + selectedIds);
}
function handleSupprimerCentreClick() {
    // Récupérez tous les éléments cochés dans la colonne appropriée
    var checkedElements = document.querySelectorAll('.checkname:checked');
    
    // Récupérez les ID des éléments cochés
    var selectedIds = Array.from(checkedElements).map(function (element) {
        return element.id;
    });

    // Construisez la partie de l'URL avec les ID sélectionnés
    // var urlPart = selectedIds.join(',');
        // console.log(urlPart);
        // return;
    // Utilisez les ID dans la fonction fopen
    useSwalConfirm('Voulez vous supprimer les centres selectionnés ?',() => {
        selectedIds.forEach(function (id) {
            console.error(id);
            deleteElement(id);
        });
    })
    // fopen('modals/analyse_demande.modalanalyse.show.PositionModal1', 'traiter_demande/analyse_demande/view/' + selectedIds);
}
// fonction upload de fichier
const upload = (type) => {
    const input = document.getElementById("formFile");
    readXlsxFile(input.files[0]).then(function (data) {
        // if (type=='Business') {
        //     createUpload(data,'Affaires ajoutées');
        // }
        // if (type=='Bordereau') {
        //     createBordereau(data,'Bordereau ajouté')
        // }

        const i = 0;
        document.getElementById("tbl-data").innerHTML = "";
        data.map((row) => {
        if (i === 0) {
            let table = document.getElementById("tbl-data");
            generateTableHead(table, row);
        }
        if (i > 0) {
            let table = document.getElementById("tbl-data");
            generateTableRows(table, row);
        }
        });
    });
};

// fonction clonage element dom
function addItem(position){
    // console.log(position);
    $.ajax({
        type: 'GET',
        url: $('.'+position).length,
        // data: {'count':$('.'+position).length},
        success: function (response) {
            // console.log(response)
            $('.'+position).append(response);            
        },
        error: function (error) {
            console.error(error);
            // displayerror(error.responseText)
        }
    });

}
//fonction ajout de reassureur
function addElement(element,params,position){
    let view=element[0]? element[0] : null;
    let viewClass=element[1]? element[1] : null;
    params = params ? params : 'RegisterBusiness';
    position=position ? position : document.getElementById('validationAction').dataset.position
    // console.log(element,position,viewClass);
    $.ajax({
        type: 'GET',
        url: $('#loadurl_base').attr('content')+'/AddElement',
        data: {
            'view':view,
            'id':$('#'+position+' .'+viewClass).length+1,
            'classes':params},
        success: function (response) {
            // console.log(data)
            $('#'+position).prepend(response);       
            formatInput();    
        },
        error: function (error) {
            console.error(error);
            // displayerror(error.responseText)
        }
    });
}

// enregistrement ou update affaire
function createModel (form,message,url,optional=null){

    const data_contents= new FormData;
        

           
        for (let index = 0; index < form.length; index++) {

            for (let pair of formDataToObject(form[index]).entries())
            {
                data_contents.append(pair[0], pair[1]);
            }
        }
        data_contents.append('optional',optional);
    

        // console.log(data_contents);
        // return
    let settings = { headers: { 'Content-type': 'multipart/form-data' } }
    axios.post(url,data_contents, settings)
    .then(function (response) {
        sendAlert(response.data)

        $('#'+form).trigger("reset");
        $('.modal').modal('hide');
        $('.tabletoget').each(function() {
            console.log($( this ).html());
            tableRender[$( this ).html()].ajax.reload();            
        });
    })
    .catch(function (error) {
        console.log(error);
        if (error.response.data.errors) {
            useSwalError(error.response.data.message)
        } else {
            console.error(error);
            // displayerror(error.response.request.responseText)
        }
        
        // useSwalError("Une erreur s'est produite.");
    });

    // Afficher l'objet JSON
    console.log(JSON.stringify(data_contents));
}
function uploadImage() {
    var input = document.getElementById('document_justificatif');
    var file = input.files[0];

    if (file) {
        var input = document.getElementById('document_justificatif');
        var file = input.files[0];
        var formData = new FormData();
        formData.append('image', file);
        console.log(formData)
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'demande_bien_et_service.test/demande', true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // La réponse du serveur est affichée ici
                document.getElementById('result').innerHTML = xhr.responseText;
            }
        };

        // Envoyer la requête avec les données FormData
        xhr.send(formData);
    }
}

function updateModel (form,message,url,optional=null){
    //conversion des informations utilisateur au format json
    const data_contents= new FormData;
        

           
        for (let index = 0; index < form.length; index++) {

            for (let pair of formDataToObject(form[index]).entries())
            {
                data_contents.append(pair[0], pair[1]);
            }
        }
        data_contents.append('optional',optional);
        data_contents.append('_method', 'PATCH');
    
    // return
    let settings = { headers: { 'Content-type': 'multipart/form-data' } }
    axios.post(url,data_contents,settings)
    .then(function (response) {
        sendAlert(response.data)
        $('#'+form).trigger("reset");
        $('.modal').modal('hide');

        $('.tabletoget').each(function() {
            tableRender[$( this ).html()].ajax.reload();            
        });
    })
    .catch(function (error) {
        console.log(error)
        // displayerror(error.response.request.responseText)
        // useSwalError("Une erreur s'est produite.");
    });
}
function createUpload (form,message,url){
    //conversion des informations utilisateur au format json
    data_contents={};
    
    data_contents['excel']=form;
    // console.log(data_contents);
    $.ajax({
        //La méthode d'envoi (type de requête)
        type: "POST",
        //L'URL de la requête
        url: 'excel/',    
        // donnée de la requete
        data:data_contents,        
        //Ce code sera exécuté en cas de succès - La réponse du serveur est passée à done()
        success:function(response){
            useSwalSuccess(message+' avec succès !');
        },
        //Ce code sera exécuté en cas d'échec - L'erreur est passée à fail()
        //On peut afficher les informations relatives à la requête et à l'erreur
        error:function(error){
            console.log(error);
            // displayerror(error.responseText)
            // useSwalError("Une erreur s'est produite.");
        }
    });
};
function createCotation (form,message,url){
    //conversion des informations utilisateur au format json
    //data_contents=ActiveCotation;
    // data_contents['excel']=form;


    // Afficher les valeurs de dataId dans la console
    // console.log(dataId);
    let dataId = [];
    let requestData = {
        dataIds: dataId
    };
    // const dataToSend = dataId.length > 0 ? { dataIds: dataId } : {};
    // Tableau pour récupérer les éléments cochés
    let ElementChecked = [];
    // Récupération de toutes les cases à cocher
    enfantCheckbock = $('.enfantCheckBox[name="' + ($('.nav-link.active').data('type').toLowerCase()) + '"]')
    for (let index = 0; index < enfantCheckbock.length; index++) {
        if (enfantCheckbock[index].checked) {
            // Récupérer la valeur de l'attribut data-id de la case à cocher cochée
            const checkbox = enfantCheckbock[index];
            const checkboxDataId = checkbox.getAttribute('data-id');
            // Ajouter la valeur dans le tableau dataId
            dataId.push(checkboxDataId);
            // Vous pouvez également ajouter la case cochée elle-même à ElementChecked si nécessaire
            ElementChecked.push(checkbox);
        };
    }
    // console.log(dataId);
    var CotationType = $('.nav-link.active').data('type');
    $.ajax({
        //La méthode d'envoi
        type: "POST",
        //L'URL de la requête
        url: $('#loadurl_base').attr('content')+'/cotation/final',    
        // donnée de la requete
        data: {requestData,  CotationType},
        //Ce code sera exécuté en cas de succès - La réponse du serveur est passée à done()
        success:function(response){
            
            if (Array.isArray(dataId) && dataId.length > 0){
                let length = dataId.length; // Comptez le nombre d'éléments dans le tableau
                if (length > 0) {
                    useSwalConfirm(`Voulez-vous côter `+ length +' ' + CotationType + 's ?', () => {
                        fetch($('#loadurl_base').attr('content')+'/cotation/final/confirm')
                        .then(response => {
                            // Vérifier si la réponse du serveur est OK (statut HTTP 200)
                            if (!response.ok) {
                            throw new Error('Erreur de réseau');
                            }
                            // Convertir la réponse en JSON
                            return response.json();
                        })
                        .then(data => {
                            useSwalSuccess("Cotation enregistrée avec succès !");
                            // Faire quelque chose avec les données JSON
                            console.log(data);
                        })
                        .catch(error => {
                            // Gérer les erreurs
                            console.error('Erreur:', error);
                        });

                    }, "Oui, Je côte", "Non, Plus tard");
                }
            }
            else if(Array.isArray(dataId) && dataId.length === 0){
                useSwalNotification("Vous n'avez aucun  Bien à coter !");
            } else {
                // var CotationType = $('.nav-link.active').data('type');
                const enregistrements = response.message[CotationType]; // Utilisation de la variable CotationType pour accéder au tableau approprié
                if (Array.isArray(enregistrements) && enregistrements.length > 0) {
                    // const enregistrements = response.message[CotationType]; // Utilisation de la variable CotationType pour accéder au tableau approprié
                    let length = enregistrements.length; // Comptez le nombre d'éléments dans le tableau
                    if (length > 0) {
                        useSwalConfirm(`Voulez-vous côter `+ length +' ' + CotationType + 's ?', () => {
                            fetch($('#loadurl_base').attr('content')+'/cotation/final/confirm')
                            .then(response => {
                                // Vérifier si la réponse du serveur est OK (statut HTTP 200)
                                if (!response.ok) {
                                    throw new Error('Erreur de réseau');
                                }
                                // Convertir la réponse en JSON
                                return response.json();
                            })
                            .then(data => {
                                useSwalSuccess("Cotation enregistrée avec succès !");
                                // Faire quelque chose avec les données JSON
                                console.log(data);
                                // recharger le/les tableau(x)
                                $('.tabletoget').each(function() {
                                    tableRender[$( this ).html()].ajax.reload();            
                                });
                            })
                            .catch(error => {
                                // Gérer les erreurs
                                console.error('Erreur:', error);
                            });
                        }, "Oui, Je côte", "Non, Plus tard");
                    }
                }else{
                    useSwalNotification("Vous n'avez aucun  Bien à coter !");
                }
            }
            
        },
        //Ce code sera exécuté en cas d'échec - L'erreur est passée à fail()
        //On peut afficher les informations relatives à la requête et à l'erreur
        error:function(error){
            // console.log(error);
            // displayerror(error.responseText)
            // useSwalError("Une erreur s'est produite.");
        }
    });
}
// enregistrement des bordereaux
const sendDataWithError = (form) => {
    axios.post("bordereau/withouterror", {
        date_reception: $("#storeBordereau").find('#date_reception').val(),
        slip: form,
    })
    .then(function (response) {
        useSwalSuccess("Bordereau uploadé avec succès!");
    })
    .catch(function (error) {
        console.error(error);
        // displayerror(error);
    });
}
function createBordereau (form,message,url){
    //conversion des informations utilisateur au format json
    data_contents={};
    data_contents['date_reception']=$("#storeBordereau").find('#date_reception').val();
    data_contents['slip']=form;
    console.log(data_contents);
    // return
    axios.post("bordereaux/upload", {
        date_reception: $("#storeBordereau").find('#date_reception').val(),
        slip: form,
    },
    config)
    .then(function (response) {
        // console.log(response.data.error);
        if (response.data.error) {
            useSwalNotification(response.data.message)
        }else{
            useSwalSuccess(message+' avec succès !');
        }
        $("#businessModal").find('.closesable').trigger('click');
        $('.tabletoget').each(function() {
            tableRender[$( this ).html()].ajax.reload();            
        });
        // location=response.request.responseURL
    })
    .catch(function (error) {
        console.log(error);
        // displayerror(error.response.request.responseText);
        // let errorMessage = "";
        // for (const [key, error] of Object.entries(errors)) {
        //     console.log(error)
        //     errorMessage += error + '<br>'
            
        // }
        // useSwalConfirm(errorMessage, 'Oui Corriger', 'Non Annuler', () => {
        //     sendDataWithError(data_contents);
        // });
        // useSwalError("Une erreur s'est produite.");
    });
};

//paiement des affaires finances
function sendBusinessToPay (table,id,name){
    // console.log(table);
    let urllink=$('.nav-link.active').data('urllink');
    //conversion des informations utilisateur au format json
    data_contents={};
    
    data_contents['tab']=table;
    data_contents['element_id']=id;
    // console.log(data_contents);
    $.ajax({
        //La méthode d'envoi (type de requête)
        type: "GET",
        //L'URL de la requête
        url: urllink,    
        // donnée de la requete
        data:data_contents,        
        //Ce code sera exécuté en cas de succès - La réponse du serveur est passée à done()
        success:function(response){
            // console.log(response);
            $('#actionModal').html(response);
            $('#paiementModal').modal('show');
            $('#paiementModal .subtitle').html(name);

        },
        //Ce code sera exécuté en cas d'échec - L'erreur est passée à fail()
        //On peut afficher les informations relatives à la requête et à l'erreur
        error:function(error){
            console.log(error);
            
            // displayerror(error.responseText)
            
            // useSwalError("Une erreur s'est produite.");
        }
    });
};
function soumettrePay (form) {
    let urllink=$('.nav-link.active').data('api');
    //conversion des informations utilisateur au format json
    data_contents={
        "bank_id":null
    };
    v_temp=[];
            
    // data_contents=formDataToObject($("#"+form[0])[0]);
    for (let index = 0; index < $("#"+form[0])[0].children.length; index++) {
        v_temp.push(formDataToObject($("#"+form[0])[0].children[index]))
    }
    data_contents.business=v_temp;
    
    // console.log(data_contents);
    // return;
    $.ajax({
        //La méthode d'envoi (type de requête)
        type: "POST",
        //L'URL de la requête
        url: urllink,    
        // donnée de la requete
        data:data_contents,
        //Ce code sera exécuté en cas de succès - La réponse du serveur est passée à done()
        success:function(response){
            useSwalSuccess("Affaire soldée avec succès!");
            $('#'+form).trigger("reset");
            $('#paiementModal').modal('hide');
            $('.tabletoget').each(function() {
                tableRender[$( this ).html()].ajax.reload();            
            });
        },

        //Ce code sera exécuté en cas d'échec - L'erreur est passée à fail()
        //On peut afficher les informations relatives à la requête et à l'erreur
        error:function(error){
            console.error(error);
            // displayerror(error.responseText)
            // useSwalError("Une erreur s'est produite.");
        }
    });    
};
// demande d'information
// function getdata (){
//     axios.get('dashboardinfo',
//     config)
//     .then(function (response) {
//         console.log(response);
//         $('#nombres_affaire').html(response.data.nombres_affaire);                
//         $('#chiffres_affaire').html(
//             new Intl.NumberFormat(
//                 "fr-FR",
//                 {
//                     currency: 'XOF',
//                     style: "currency",
//                 }
//             ).format(response.data.chiffres_affaire));
//         $('#nombres_placement').html(response.data.nombres_placement);
//         $('#nombres_reassureur').html(response.data.nombres_reassureur);
//     })
//     .catch(function (error) {
//         // console.log(error);
//         useSwalError("Une erreur s'est produite. mise à jour information impossible !");
//         displayerror(error.response.request.responseText);        
//     });
    
// };

//! ***********buttons actions************ */
function deleteElement(params,message="",route=null) {
    
    let urllink=$('.nav-link.active').data('urllink');
    // console.log(location.pathname);
    // return
    axios.delete((urllink ? urllink : location.pathname)+(route ? "/"+route : "")+'/delete/'+params,
    config)
    .then(function (response) {
        // console.log(response);
        useSwalSuccess(message+' à été supprimé !');

        $('.tabletoget').each(function() {
            tableRender[$( this ).html()].ajax.reload();            
        });

    })
    .catch(function (error) {
        console.log(error);
        // displayerror(error.response.request.responseText)        
        useSwalError("Une erreur s'est produite. Suppression impossible !");
    });

}
function editElement(params,message="",route=null) {
    let urllink=$('.nav-link.active').data('urllink');
    // console.log(urllink)
    axios.get((urllink ? urllink : location.pathname)+(route ? "/"+route : "")+"/edit/"+params.data('index'),
    config)
    .then(function (response) {
        console.log(response)
        // console.log(response,params.data('modal'));
        useSwalSuccess(message+' prêt à être modifié !');
        // if(urllink=='Cotation/vehicule'){
        //     addVehicule('TableauCotationVehiculeBody', response.data.IdcotationVehicule );
        // }else{
        //     addBatiment('TableauCotationBatimentBody', response.data.IdcotationBatiment);
        //     console.log(response.data.IdcotationBatiment);
            
        // }

        // Appelez la fonction addVehicule avec l'ID de votre tableau DataTable
        // addVehicule('votreIdTableau'); // Remplacez 'votreIdTableau' par l'ID de votre tableau
        $('#PositionModal1').html(response.data);
        $('#'+params.data('modal')).modal('show')
        // $('.zonenumeric').trigger("focusout");
        // $('.typemonnaie').trigger("change");
    })
    .catch(function (error) {
        console.log(error);
        // useSwalError("Une erreur s'est produite. Modification impossible !");
        // displayerror(error.response.request.responseText);       
        // console.log(error); 
    });
    // console.log(params);
}
function viewElement(params,message="",route=null) {
    let urllink=$('.nav-link.active').data('urllink');
    axios.get((urllink ? urllink : location.pathname)+(route ? "/"+route : "")+"/view/"+params.data('index'),
    config)
    .then(function (response) {
        console.log(response);
        useSwalSuccess(message+' pret à être visualisé !');
        $('#PositionModal1').html(response.data);
        $('#'+params.data('modal')).modal('show')
        // $('.zonenumeric').trigger("focusout");
        // $('.typemonnaie').trigger("change");
    })
    .catch(function (error) {
        console.log(error);
        useSwalError("Une erreur s'est produite. visualisation impossible !");
        // displayerror(error.response.request.responseText);        
    });
    // console.log(params);
}
function changeStatutElement(params,message="") {
    data_contents={},
    v_temp=[];
    let urllink=$('.nav-link.active').data('urllink');

    $('.setCheckbox').each(function() {
        if ($( this ).is(':checked')) {            
            v_temp.push($( this ).data('child'));           
        }
    });
    data_contents['elements']=v_temp;
    // console.log(data_contents);
    // return
    axios.post((urllink ? urllink : location.pathname)+"/switch_statut",data_contents,config)
    .then(function (response) {
        // console.log(response,params.data('modal'));
        useSwalSuccess(message+' statut modifié !');

        $('.tabletoget').each(function() {
            tableRender[$( this ).html()].ajax.reload();            
        });
    })
    .catch(function (error) {
        console.log(error);
        // displayerror(error.response.request.responseText);        
        useSwalError("Une erreur s'est produite. modification impossible !");
    });
    // console.log(params);
}

function statutconfirm(params,message="") {
    
    // let urllink=$params[0].dataset.info;
    // console.log(params);
    // return
    axios.get((location.pathname)+'/mail_renvoi/'+params, config)

    // console.log(params[0]);
    // url: (urllink == 'demande') ? $('#loadurl_base').attr('content')+ '/demande'+params[0].dataset.type+'/'+params[0].dataset.index : $('#loadurl_base').attr('content')+"/pages/demande/"+params[0].dataset.type+'/'+params[0].dataset.index,
    .then(function (response) {
        // console.log(response);
        useSwalSuccess(message+' à été re-envoyer !');

        $('.tabletoget').each(function() {
            tableRender[$( this ).html()].ajax.reload();            
        });

    })
    .catch(function (error) {
        console.log(error);
        // displayerror(error.response.request.responseText)        
        useSwalError("Une erreur s'est produite. Envoi impossible !");
    });

}
// function statutconfirm(params,message="") {

    
//     // return
//     data_contents={},
//     v_temp=[];
//     let urllink = params[0].dataset.info;
//     console.log(urllink);
// // console.log(params[0],params[0].dataset.index,urllink,$('#loadurl_base').attr('content')+"/"+C+"/"+params[0].dataset.index);

// // return
//     $.ajax({
//         //La méthode d'envoi (type de requête)
//         type: "GET",
//         //L'URL de la requête
//         url: (urllink == 'demande') ? $('#loadurl_base').attr('content')+ '/demande'+params[0].dataset.type+'/'+params[0].dataset.index : $('#loadurl_base').attr('content')+"/pages/demande/"+params[0].dataset.type+'/'+params[0].dataset.index,   
//         // donnée de la requete
//         data:data_contents,        
//         //Ce code sera exécuté en cas de succès - La réponse du serveur est passée à done()
//         success:function(response){
//             useSwalSuccess(message+' Demande re-envoyer !');
//             $('.tabletoget').each(function() {
//                 tableRender[$( this ).html()].ajax.reload();            
//             });
//         },
//         //Ce code sera exécuté en cas d'échec - L'erreur est passée à fail()
//         //On peut afficher les informations relatives à la requête et à l'erreur
//         error:function(error){
//             // console.log(error);
//             displayerror(error.response.demande.responseText);        
//             useSwalError("Nous ne parvenons pas à re-envoyer votre demande !");
//         }
//     });
// }
// action de visualisation
$('body').on('click','.view', function () {
    viewElement($(this),$(this).data('info'));
    console.log($(this).data('index'));
})
// action de modification
$('body').on('click','.edit', function () {
    const message = 'Vous êtes sur le point de modifier  </br><span class="fw-bold">'+$(this).data('info')+'</span></br> voulez-vous continuer ?';
    useSwalConfirm(message, () => {
        editElement($(this),$(this).data('info'),$(this).data('route'));
    }, "Oui, modifier", "Non, annuler");
    // console.log($(this).data('index'));
})
//action de suppression
$('body').on('click','.delete', function () {
    const message = 'Vous êtes sur le point de supprimer </br><span class="fw-bold">'+$(this).data('info')+'</span></br> voulez-vous continuer ?';
    useSwalConfirm(message, () => {
        deleteElement($(this).data('index'),$(this).data('info'),$(this).data('route'));
    }, "Oui, supprimer", "Non, annuler");
})
$('body').on('click','.analyse', function () {
        viewElement($(this),$(this).data('info'),$(this).data('route'));
})

$('body').on('click','.visualiser', function () {
    viewElement($(this),'',$(this).data('route'));
})
$('body').on('click','.deleteLine', function () {
    // const message = 'Vous êtes sur le point de supprimer '+$(this).data('info')+' , voulez-vous continuer?';
    // useSwalConfirm(message, "Confirmer", "Non, annuler", () => {
        $('#'+$(this).data('index')).remove();
    // });
})

// $('body').on('change', "#date_depart,#selectpermission,#selects", function () {

//     // Récupérer la date de départ
//     var userStartDate = $(this).val();

//     // Récupérer la valeur de l'attribut data-jour de l'option sélectionnée
//     var nombreDeJours = $('#selectpermission').find(':selected').data('jour');

//     // Récupérer la valeur de l'attribut data-jour de l'option sélectionnée
//     var nombreDeJour = $('#selects').find(':selected').data('jour');

//     var Jour = $('#numb_de_jours').find(':selected').val();

//     console.log(nombreDeJours, nombreDeJour);

//     // Si le nombre de jours est valide, mettre à jour la date de fin
//     if (nombreDeJours < 15) {

//         if (userStartDate) {
//             // Convertir la date de début en objet Date
//             var dateDebutObj = new Date(userStartDate);

//             // Calculer la date de fin en ajoutant le nombre de jours
//             var datefin = addBusinessDays(dateDebutObj, parseInt(nombreDeJours));

//             // Mettre à jour la valeur du champ de date de fin
//             $('#date_fin2').val(formatDate(datefin));
//         }
//     }
//     // Vérifier si la date de départ est valide
//     else if (nombreDeJour === 15) {

//         if (userStartDate) {
//             // Convertir la chaîne de date de départ en objet Date
//             var startDate = new Date(userStartDate);

//             // Calculer la date de fin d'un congé de 30 jours
//             var endDate30Days = addBusinessDays(startDate, parseInt(Jour));

//             // Mettre à jour la valeur du champ "Date de fin"
//             $("#date_fin").val(formatDate(endDate30Days));
//         }
//     } else if (nombreDeJour === 30) {

//         if (userStartDate) {
//             // Convertir la chaîne de date de départ en objet Date
//             var startDate = new Date(userStartDate);

//             // Calculer la date de fin d'un congé de 30 jours
//             var endDate30Days = addBusinessDays(startDate, parseInt(nombreDeJour));

//             // Mettre à jour la valeur du champ "Date de fin"
//             $("#date_fin").val(formatDate(endDate30Days));
//         }
//     } else {
//         $('body #date_fin2').val('').attr('readonly', false);
//         $('body #date_fin').val('').attr('readonly', false);
//     }
// });

// function addBusinessDays(startDate, days) {
//     var current = new Date(startDate);
//     var isWeekend = function (date) {
//         return date.getDay() % 6 === 0;
//     };

//     while (days > 0) {
//         current.setDate(current.getDate() + 1);
//         if (!isWeekend(current) && !isHoliday(current)) {
//             days--;
//         }
//     }

//     return current;
// }

// function isHoliday(date) {
//     // Mettez en œuvre la logique pour vérifier si la date est un jour férié
//     // Utilisez la bibliothèque date-holidays ou toute autre source de données sur les jours fériés
//     // Retournez true si la date est un jour férié, sinon false
//     // Exemple simple : return date.getMonth() === 11 && date.getDate() === 25; (Noël)
//     return false;
// }


$('body').on('change', "#date_depart, #selectpermission, #selects", function () {
    var userStartDate = $("#date_depart").val();
    var nombreDeJours = $('#selectpermission').find(':selected').data('jour');
    var nombreDeJour = $('#selects').find(':selected').data('jour');
    var Jour = $('#nombre_de_jours').find(':selected').val();

    console.log(userStartDate, nombreDeJours, nombreDeJour, Jour);

    // Effectuer une requête AJAX pour calculer la date de fin
    if (nombreDeJours < 15) {
        if (userStartDate) {
            $.ajax({
                type: 'GET',
                url: 'calculer', // Remplacez par l'URL correcte de votre route Laravel
                data: {userStartDate: userStartDate, nombreDeJour: nombreDeJours},
                success: function (response) {
                    console.log(response);
                    // Mettre à jour le champ de date de fin avec la réponse
                    $('#date_fin2').val(response.endDate);
                    $('#date_fin').val(''); // Réinitialiser le champ #date_fin
                    // Afficher le message
                    $('#message').text(response.message);
                },
                error: function (error) {
                    console.error('Erreur lors du calcul de la date de fin : ', error);
                }
            });
        }
    }
    else if (nombreDeJour === 15 || nombreDeJour === 30) {
        if (userStartDate) {
            $.ajax({
                type: 'GET',
                url: 'calculer', // Remplacez par l'URL correcte de votre route Laravel
                data: {userStartDate: userStartDate, nombreDeJour: (nombreDeJour === 15) ? Jour : nombreDeJour},
                success: function (response) {
                    console.log(response);
                    // Mettre à jour le champ de date de fin avec la réponse
                    $('#date_fin').val(response.endDate);
                    $('#date_fin2').val(''); // Réinitialiser le champ #date_fin2
                    // Afficher le message
                    $('#message').text(response.message);
                },
                error: function (error) {
                    console.error('Erreur lors du calcul de la date de fin : ', error);
                }
            });
        }
    }
    else {
        $('body #date_fin2').val('').attr('readonly', false);
        $('body #date_fin').val('').attr('readonly', false);
    }
    // Si le nombre de jours est valide, mettre à jour la date de fin
    // if (nombreDeJours < 15) {
    //     if (userStartDate) {
    //         var dateDebutObj = new Date(userStartDate);
    //         var datefin = addBusinessDays(dateDebutObj, parseInt(nombreDeJours));
    //         $('#date_fin2').val(format(datefin, 'yyyy-MM-dd'));
    //     }
    // }
    // Vérifier si la date de départ est valide
    // else if (nombreDeJour === 15) {
    //     if (userStartDate) {
    //         var startDate = new Date(userStartDate);
    //         var endDate30Days = addBusinessDays(startDate, parseInt(Jour));
    //         $("#date_fin").val(format(endDate30Days, 'yyyy-MM-dd'));
    //     }
    // } else if (nombreDeJour === 30) {
    //     if (userStartDate) {
    //         var startDate = new Date(userStartDate);
    //         var endDate30Days = addBusinessDays(startDate, parseInt(nombreDeJour));
    //         $("#date_fin").val(format(endDate30Days, 'yyyy-MM-dd'));
    //     }
    // } else {
    //     $('body #date_fin2').val('').attr('readonly', false);
    //     $('body #date_fin').val('').attr('readonly', false);
    // }
});

// Fonction pour formater la date au format YYYY-MM-DD
function formatDate(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; // Les mois sont indexés de 0 à 11
    var yyyy = date.getFullYear();

    // Ajouter un 0 devant le jour ou le mois si nécessaire
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    return yyyy + '-' + mm + '-' + dd;
}

// Votre code existant ici...

// Exemple d'utilisation de la fonction addBusinessDays
// var startDate = new Date();
// var endDate = addBusinessDays(startDate, 5);
// console.log(formatDate(endDate));

 

    // // Récupérer la date de début depuis le formulaire
    // var userStartDate = data_contents['date_depart']; // Assurez-vous que le champ date_debut existe dans votre formulaire

    // // Convertir la chaîne de date de départ en objet Date
    // var startDate = new Date(userStartDate);

    // // Calculer la date de fin d'un congé de 30 jours
    // var endDate30Days = new Date(startDate);
    // endDate30Days.setDate(startDate.getDate() + 30);

    // // Ajouter la date de fin calculée à l'objet data_contents
    // data_contents['date_fin'] = endDate30Days.toISOString().split('T')[0]; // Format YYYY-MM-DD


// action activation desactivation
$('body').on('click','.Set_Statut', function () {
    changeStatutElement();
})

// Enregistrement d'élément dans Tableau Cotation Véhicule
$('body').on('click','.enBtnAjoutBien', function () {
    let url = $(this).data('lien');
    let form = $(this).data('form');
    let message = "Enregistrement effectué ";
    
    createModel ([form],message,url);
})

// Update d'élément dans Tableau Cotation Véhicule
$('body').on('click','.Updatedemande', function () {
    let url = $(this).data('lien');
    let form = $(this).data('form');
    let message = "Modification effectuée ";
    updateModel ([form],message,url);
})
// Enregistrement d'élément dans Tableau Cotation Bâtiment
$('body').on('click','.envoie_demande', function () {
    let url = $(this).data('lien');
    let form = $(this).data('form');
    let message = "Enregistrement effectué ";
    
    createModel ([form],message,url);
})

// Enregistrement des cotations de Type Véhicule


// confirmation ou anulation
$('body').on('click', '.confirmation', function()
{
    const message = 'Vous êtes sur le point de re-envoyer cette demande </br><span class="fw-bold">'+$(this).data('info')+'</span></br> voulez-vous continuer ?';
    useSwalConfirm(message, () => {
        statutconfirm($(this).data('index'),$(this).data('info'));
        // console.log(2)
    }, "Oui, re-envoyer", "Non");
    // let url = $(this).data('type');
});
$('body').on('click', '.infirmation', function()
{
    const message = 'Vous êtes sur le point d\'annuler cette cotation </br><span class="fw-bold">'+$(this).data('info')+'</span></br> voulez-vous continuer ?';
    useSwalConfirm(message, () => {
        statutconfirm($(this),$(this).data('info'));
    }, "Oui, annuler", "Non");
    // let url = $(this).data('type');
});

// Enregistrement d'élément dans Tableau Cotation Bâtiment
// $('body').on('click', '.password_form', function () {
//     let url = $(this).data('lien');  // URL de l'action (définie dans le bouton)
//     let formId = $(this).data('form');  // ID du formulaire associé
//     let message = "Modification du mot de passe effectuée avec succès";

//     // Récupération du formulaire
//     let form = document.getElementById(formId);
//     if (form) {
//         // Soumission du formulaire via AJAX
//         $.ajax({
//             url: url,
//             method: 'POST',
//             data: new FormData(form),
//             processData: false,
//             contentType: false,
//             success: function(response) {
//                 // Affichage du message de confirmation
//                 alert(message);
//                 // Tu peux rediriger ou effectuer une autre action ici si besoin
//             },
//             error: function(error) {
//                 alert("Une erreur est survenue lors de la modification du mot de passe.");
//             }
//         });
//     }
// });