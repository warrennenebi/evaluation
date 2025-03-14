var tableRender=[];
//superpossion des modals
$(document).on('show.bs.modal', '.modal', function () {
    var zIndex = 1040 + (10 * $('.modal:visible').length);
    $(this).css('z-index', zIndex);
    setTimeout(function() {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);


    //permet de garder le focus sur les selects2 des modals
    var modalActif = $(this).attr('id');
    formatInput(modalActif);
});
$(document).on('hidden.bs.modal', '.modal', function(){
    $(this).find('.modal-backdrop').remove();
});
//Affichage d'éléments Cotations Véhicules & Cotations Bâtiments
$(document).ready(function() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    // apply datatable to data
    /*$.getJSON($('#loadurl').attr('content'), function(data){
        // console.log(data);
        $.each( data[0], function( key, val ) {
            // console.log(key,val);
            $('#'+val) == null ? '' : applyDataTablesTo(val)
        });
    }).fail(function(){
        useSwalError("Une erreur s'est produite. chargement tableau impossible !")
    });*/
    $.each( $('.applyDataTablesTo'), function( key, val ) {
            console.log(key,val);
            $('#'+$(this).attr("id")) == null ? '' : applyDataTablesTo($(this).attr("id"))
        });
    $.ajax({
        url:'demande',
        method: 'GET',
        success: function(response) {
            // Mettez à jour le compteur côté client
            $('#unprocessed-demand-counter').text(response.unprocessed_demand_count);

            // Animation pour attirer l'attention
            $('#unprocessed-demand-counter').addClass('badge-animated'); // Utilisez la classe d'animation de votre choix
            setTimeout(function() {
                $('#unprocessed-demand-counter').removeClass('badge-animated');
            }, 1000); // Durée de l'animation en millisecondes
        },
        error: function(error) {
            console.error('Erreur lors de la récupération du compteur de demandes non traitées : ', error);
        }
    });
    setTimeout(function() {
        $('#animationDiv').trigger('click');
    }, 2000); // 2000 ms de délai
    // mise en forme des imputs
    // boxFormat();
    //Activation de l'element
    // La redirection se produit ici
    if (getCookie("element")) {
        console.log(getCookie("element"));
        $('#' + getCookie("element")).trigger('click');
        // Exemple d'utilisation pour supprimer un cookie nommé "nomDeMaVariable"
        delete_cookie("element");
        // console.log(getCookie("nomDeMaVariable"));
    }
    if (getCookie("subelement")){
        setTimeout(function() {
            //Activation du sous-element
            $('#' + getCookie("subelement")).parent().closest("div").removeClass("d-none");
        }, 1000); // 2000 ms de délai
    }
});

$(document).ready(function() {
    $('.envoie_demande').click(function() {
        var selectedTypes = [];

        // Parcours des cases cochées
        $('input[name="type_id[]"]:checked').each(function() {
            selectedTypes.push($(this).val()); // Ajouter la valeur de la case cochée à la liste
        });

        // Envoi de la liste des ID sélectionnés via AJAX
        $.ajax({
            url: 'nouvelle_clinique', // Remplacez "url_de_votre_action" par l'URL de votre action de traitement
            type: 'POST',
            data: {
                selectedTypes: selectedTypes
            },
            success: function(response) {
                // Gérer la réponse du serveur
                console.log(response);
            },
            error: function(xhr, status, error) {
                // Gérer les erreurs
                console.error(xhr.responseText);
            }
        });
    });
});
// Écoutez l'événement "select2:select" pour détecter la création d'un nouvel élément
// $('#circuit_validateur_id').on('select2:select', function (e) {
//     var data = e.params.data;

//     // Vérifiez si c'est un nouvel élément
//     if (data.newOption) {
//         // Effectuez une requête AJAX pour ajouter le nouvel élément à la table direction
//         $.ajax({
//             type: 'POST',
//             url: '/ajouter-direction',
//             data: {
//                 label: data.direction.id
//             },
//             success: function(response) {
//                 // Mettez à jour la table circuit_organe avec l'ID du nouvel élément direction
//                 $.ajax({
//                     type: 'POST',
//                     url: '/mettre-a-jour-circuit-organe',
//                     data: {
//                         directionId: response.direction.id
//                     },
//                     success: function() {
//                         alert('Nouvel élément ajouté avec succès!');
//                     },
//                     error: function() {
//                         alert('Erreur lors de la mise à jour de la table circuit_organe');
//                     }
//                 });
//             },
//             error: function() {
//                 alert('Erreur lors de l\'ajout du nouvel élément à la table direction');
//             }
//         });
//     }
// });

/* Formatting function for row details - modify as you need */
function format(d,tableRef=null) {
    // `d` is the original data object for the row
    console.log(d,tableRef);
    var toApplytable= tableRef!==null ? tableRef : $('.table').attr('id');
    var subcontent="";
    var subcontent2="";
    var subcontent3="";
    var organe="";
    var les_objets="";
    var subcontent4=""
    var subcontentTable=""

    if (toApplytable=="AffaireTable") {
        for (let index = 0; index < d.reinsurers.length; index++) {
            subcontent += '<tr><td class="py-0">'+ d.reinsurers[index].raison_social +'</td>' +
            '<td class="py-0 text-center">'+ d.reinsurers[index].pivot.part_accepte +' %</td>' +
            '<td class="py-0 text-center">'+ d.reinsurers[index].pivot.commission_reassurance +' %</td>' +
            '<td class="py-0 text-end">'+ checkPercentage(d.reinsurers[index].pivot.prime_reassurance,d.monnaie,'currency') +'</td>' +
            '<td class="py-0 text-end">'+ checkPercentage(d.reinsurers[index].pivot.prime_a_reverser,d.monnaie,'currency') +'</td>' +
            '<td class="py-0 text-end">'+ d.reinsurers[index].pivot.ppw +'</td>' +
            '<td class="py-0 text-end">'+ dateFormat(d.reinsurers[index].pivot.date_accept) +'</td></tr>';
        }
        return (
            '<table class="table table-hover table-sm table-bordered w-60 ms-5" id="subtable'+d.id+'">' +
            '<tr>' +
            '<th class="py-0 text-center">Réassureur</th>' +
            '<th class="py-0 text-center">Part acceptée</th>' +
            '<th class="py-0 text-center">Commission réassureur</th>' +
            '<th class="py-0 text-center">Prime réassurance</th>' +
            '<th class="py-0 text-center">Prime à reverser</th>' +
            '<th class="py-0 text-center">PPW</th>' +
            '<th class="py-0 text-center">Date acceptation</th>' +
            '</tr>'
            +
            subcontent
            +
            '</table>'
        );
    }
    if (toApplytable=="CompaniesTable") {
        if (d.pays.length) {
            for (let index = 0; index < d.pays.length; index++) {
                subcontent+= '<tr><td>'+ d.pays[index].label +'</td>'
                +'<td class="text-center">'+ d.pays[index].iso_alpha3 +'</td>'
                +'</tr>';
            }
        } else {
            subcontent+= '<tr><td>'+ d.pays.label +'</td>'
            +'<td class="text-center">'+ d.pays.iso_alpha3 +'</td>'
            +'</tr>';
        }
        if (d.users.length){
            for (let index = 0; index < d.users.length; index++) {
                subcontent2+= '<tr><td class="text-center"><input class="form-check-input ms-2 my-1 parentCheckbox setCheckbox" type="checkbox" data-child="'+d.users[index].id+'" value="" id="flexCheckDefault"></td><td>'+ d.users[index].name +'</td>'
                +'<td>'+ d.users[index].email +'</td>'
                +'<td class="text-center">'+ (d.users[index].active ? '<span class="rounded bg-success p-1 m-1 text-white">Oui</span>' : '<span class="rounded bg-danger p-1 m-1 text-white">Non</span>')+'</td></tr>';
            }
        }
        // if (d.banks.length){
        //     for (let index = 0; index < d.banks.length; index++) {
        //         subcontent3+= '<tr><td>'+ d.banks[index].bank_name +'</td>'
        //         +'<td>'+ d.banks[index].devise +'</td>'
        //         +'</tr>';
        //     }
        // }
        return (
            '<div class="accordion" id="accordiondata">'
            +'<div class="accordion-item my-2">'
            +'<h2 class="accordion-header">'
            +'<button class="accordion-button p-2 bg-primary text-white" type="button"  data-bs-target="#collapsePays'+d.id+'" aria-controls="collapsePays'+d.id+'" onclick="swithVisivility(\'collapsePays'+d.id+'\',0)">Pays</button>'
            +'</h2>'
            +'<div id="collapsePays'+d.id+'" class="accordion-collapse collapse closed">'
            +'<div class="accordion-body">'
            +'<table class="table table-hover table-sm table-bordered subtable" id="subtablePays'+d.id+'">'
            +'<thead>'
            +'<tr>'
            +'<th class="text-center">Nom</th>'
            +'<th class="text-center">Code ISO</th>'
            +'</tr>'
            +'</thead>'
            +'<tbody>'
            +subcontent
            +'</tbody>'
            +'</table>'
            +'</div>'
            +'</div>'
            +'</div>'
            +'<div class="accordion-item my-2">'
            +'<h2 class="accordion-header">'
            +'<button class="accordion-button p-2 bg-primary text-white" type="button"  data-bs-target="#collapseUsers'+d.id+'" aria-controls="collapseUsers'+d.id+'" onclick="swithVisivility(\'collapseUsers'+d.id+'\',0)">Collaborateurs</button>'
            +'</h2>'
            +'<div id="collapseUsers'+d.id+'" class="accordion-collapse collapse closed">'
            +'<div class="accordion-body">'
            +'<div class="d-flex flex-row my-3">'
            +'<button type="button" class="mx-2 btn bg-primary text-white" onclick="fopen(\'Settings/User/CreateUserCompany.CreateUserCompanyModal.show.actionModal.storeUser\',\'user/create\')">Ajouter</button>'
            +'<button type="button" class="mx-2 btn bg-primary text-white Set_Statut">Activer/Désactiver</button>'
            +'</div>'
            +'<table class="table table-hover table-sm table-bordered subtable" id="subtableUsers'+d.id+'">'
            +'<thead>'
            +'<tr>'
            +'<th class="text-center"></th>'
            +'<th>Nom</th>'
            +'<th>Email</th>'
            +'<th class="text-center">Est actif</th>'
            +'</tr>'
            +'</thead>'
            +'<tbody>'
            +subcontent2
            +'</tbody>'
            +'</table>'
            +'</div>'
            +'</div>'
            +'</div>'
            +'<div class="accordion-item my-2">'
            +'<h2 class="accordion-header">'
            +'<button class="accordion-button p-2 bg-primary text-white" type="button"  data-bs-target="#collapseBanks'+d.id+'" aria-controls="collapseBanks'+d.id+'" onclick="swithVisivility(\'collapseBanks'+d.id+'\',0)">Banques</button>'
            +'</h2>'
            +'<div id="collapseBanks'+d.id+'" class="accordion-collapse collapse closed">'
            +'<div class="accordion-body">'
            +'<div class="d-flex flex-row my-3">'
            +'</div>'
            +'<table class="table table-hover table-sm table-bordered subtable" id="subtableBank'+d.id+'">'
            +'<thead>'
            +'<tr>'
            +'<th>Nom</th>'
            +'<th>Devise</th>'
            +'</tr>'
            +'</thead>'
            +'<tbody>'
            +subcontent3
            +'</tbody>'
            +'</table>'
            +'</div>'
            +'</div>'
            +'</div>'
            +'</div>'
        );
    }
    if (toApplytable=="ActivityTable") {
        for (let index = 0; index < d.activityrates.length; index++) {
            subcontent += '<tr><td class="py-0 oneline text-center">'+ (index+1)+'</td>' +
            '<td class="py-0 text-center">'+ d.activityrates[index].type +'</td>' +
            '<td class="py-0">'+ d.activityrates[index].activity+'</td>' +
            '<td class="py-0 text-center">'+ d.activityrates[index].price+'</td>' +
            '<td class="py-0 text-center"><i class="material-icons text-warning" data-toggle="tooltip" title="modifier" data-index="'+d.activityrates[index].id+'">&#xf88d;</i>' + '<i class="material-icons text-danger" data-toggle="tooltip" title="supprimer" data-index="'+d.activityrates[index].id+'">&#xE872;</i></td></tr>';
        }
        return (
            '<table class="table table-hover table-sm table-bordered" id="subtable'+d.id+'">' +
            '<tr>' +
            '<th class="text-center">N°</th>' +
            '<th class="text-center">Type</th>' +
            '<th class="text-center">Activité</th>' +
            '<th class="text-center">Taux</th>' +
            '<th class="text-center">Actions</th>' +
            '</tr>'
            +
            subcontent
            +
            '</table>'
        );
    }
    if (toApplytable=="financeCedanteTable") {
        for (let index = 0; index < d.businesses_with_not_pay.length; index++) {
            subcontent += '<tr><td class="py-0 oneline text-center"><input class="form-check-input enfantCheckBox" type="checkbox" name="'+d.id+'" value="" id="'+d.businesses_with_not_pay[index].id+'"></td>' +
            '<td class="py-0">'+ d.businesses_with_not_pay[index].nom_assure +'</td>' +
            '<td class="py-0 text-end">'+ checkPercentage(d.businesses_with_not_pay[index].prime_a_recevoir,d.businesses_with_not_pay[index].monnaie,'currency')+'</td>' +
            '<td class="py-0 text-center">'+ d.businesses_with_not_pay[index].part_offerte+' %</td>' +
            '<td class="py-1 text-center">'+(d.businesses_with_not_pay[index].statut == 1 ? '<span class="rounded bg-success p-1 m-1">Soldé</span>' : '<span class="rounded bg-warning p-1 m-1">Non-soldé</span>')+ '</td></tr>';
        }
        return (
            '<div><button type="button" class="mx-2 my-2 btn btn-sm bg-primary text-white payto" data-paytoid="'+d.id+'" data-payto="'+d.raison_social+'">Payer</button></div>'+
            '<table class="table table-hover table-sm table-bordered" id="subtable'+d.id+'">' +
            '<tr>' +
            '<th class="text-center"></th>' +
            '<th class="text-center">Affaire</th>' +
            '<th class="text-center">Prime à recevoir</th>' +
            '<th class="text-center">Part offerte</th>' +
            '<th class="text-center">statut</th>' +
            '</tr>'
            +
            subcontent
            +
            '</table>'
        );
    }
    if (toApplytable=="ReassureursTable") {
        for (let index = 0; index < d.banks.length; index++) {
            subcontent += '<tr><td class="oneline">'+ d.banks[index].raison_social +'</td>' +
            '<td class="text-center">'+ d.banks[index].devise +'</td>' +
            '<td class="text-center">'+ d.banks[index].iban +'</td>' +
            '<td class="text-end">'+ d.banks[index].num_compte +'</td>' +
            '<td class="text-end">'+ d.banks[index].telephone +'</td>' +
            '<td class="text-end">'+ d.banks[index].pays.label +'</td></tr>';
        }
        return (

            '<table class="table table-hover table-sm table-bordered" id="subtable'+d.id+'">' +
            '<tr>' +
            '<th class="text-center oneline">Raison Social</th>' +
            '<th class="text-center">Devise</th>' +
            '<th class="text-center">Iban</th>' +
            '<th class="text-center">Numero de compte</th>' +
            '<th class="text-center">Telephone</th>' +
            '<th class="text-center">Pays</th>' +
            '</tr>'
            +
            subcontent
            +
            '</table>'
        );
    }
    if (toApplytable=="financeReassureurTable") {
        for (let index = 0; index < d.businesses_with_not_pay.length; index++) {
            subcontent += '<tr><td class="py-0 oneline text-center"><input class="form-check-input enfantCheckBox" type="checkbox" name="'+d.id+'" value="" id="'+d.businesses_with_not_pay[index].id+'"></td>' +
            '<td class="py-0">'+ d.businesses_with_not_pay[index].nom_assure +'</td>' +
            '<td class="py-0 text-end">'+ checkPercentage(d.businesses_with_not_pay[index].pivot.prime_a_reverser,d.businesses_with_not_pay[index].monnaie,'currency')+'</td>' +
            '<td class="py-0 text-center">'+ d.businesses_with_not_pay[index].part_offerte+' %</td>' +
            '<td class="py-1 text-center">'+(d.businesses_with_not_pay[index].statut == 1 ? '<span class="rounded bg-success p-1 m-1">Soldé</span>' : '<span class="rounded bg-warning p-1 m-1">Non-soldé</span>')+ '</td></tr>';
        }
        return (
            '<div><button type="button" class="mx-2 my-2 btn btn-sm bg-primary text-white payto" data-paytoid="'+d.id+'" data-payto="'+d.raison_social+'">Payer</button></div>'+
            '<table class="table table-hover table-sm table-bordered" id="subtable'+d.id+'">' +
            '<tr>' +
            '<th class="text-center"></th>' +
            '<th class="text-center">Affaire</th>' +
            '<th class="text-center">Prime à reverser</th>' +
            '<th class="text-center">Part offerte</th>' +
            '<th class="text-center">Statut de cedante</th>' +
            '</tr>'
            +
            subcontent
            +
            '</table>'
        );
    }
    if (toApplytable=="TransactionTable") {
        for (let s_index = 0; s_index < d.paymentable.length; s_index++) {
            for (let index = 0; index < d.reinsurers.length; index++) {
                if (d.reinsurers[index].id==d.paymentable[s_index].paymentable_id) {
                    subcontent += '<tr>'
                    +
                    '<td class="py-0">'+ d.reinsurers[index].raison_social +'</td>' +
                    '<td class="py-0 text-center">'+ (d.paymentable[s_index].paymentable_type=='App\\Models\\Reinsurer' ? 'Reassureur' : 'Cedante')+'</td>' +
                    '<td class="py-0 text-center"> </td>' +
                    '<td class="py-1 text-center"><span class="rounded bg-success p-1 m-1">Soldé</span></td>'+
                    '<td class="py-0 text-center">'+dateFormat(d.paymentable[s_index].date_reception)+'</td></tr>';
                }
            }
            if (d.transferor.id==d.paymentable[s_index].paymentable_id) {
                subcontent += '<tr>'
                +
                '<td class="py-0">'+ d.transferor.raison_social +'</td>' +
                '<td class="py-0 text-center">'+ (d.paymentable[s_index].paymentable_type=='App\\Models\\Reinsurer' ? 'Reassureur' : 'Cedante')+'</td>' +
                '<td class="py-0 text-center"> </td>' +
                '<td class="py-1 text-center"><span class="rounded bg-success p-1 m-1">Soldé</span></td>'+
                '<td class="py-0 text-center">'+dateFormat(d.paymentable[s_index].date_reception)+'</td></tr>';
            }
        }
        return (
            '<table class="table table-hover table-sm table-bordered" id="subtable'+d.id+'">' +
            '<tr>' +
            '<th class="text-center">Nom</th>' +
            '<th class="text-center">Type</th>' +
            '<th class="text-center">Nature</th>' +
            '<th class="text-center">Statut</th>' +
            '<th class="text-center">Date</th>' +
            '</tr>'
            +
            subcontent
            +
            '</table>'
        );
    }
    if (toApplytable=="DemandesTable") {
        let procces_count = ''
        for (let i = 0; i < d.nombre_notifications; i++) {
            let color = '';
            if (i+1 <= d.procces_valide_result.notif_total) {
                color = 'bg-secondary text-white';
            }
            procces_count += '<td class="text-center py-0 '+ color +'">'+ d.notification[i].user.name +'</td>'
        }
        return (
            '<table class="table table-hover table-sm table-bordered" id="subtable'+d.id+'">' +
            '<tr>' +
            (d.type_demandes_id !== 1 ? '<th class="text-center">Periode</th>':'<th class="text-center">Montant de demande</th>')+
            (d.type_demandes_id == 3 ? '' : '<th class="text-center">Justificatifs</th>') +
            '<th class="text-center">Motif </th>' +
            '</tr>'
            +
            (d.type_demandes_id !== 1 ? '<td class="align-center py-0">'+
            '<table class="w-100">' +
            '<tr class="text-center py-0">' +
                '<td > Depart : ' + dateFormat(d.date_depart) + '</td>' +
                '<td >Fin : ' + dateFormat(d.date_fin )+ '</td>' +
            '</tr>' +
        '</table>'+
        '</td>' : '<td class="text-center py-0">'+ checkPercentage(d.montant_demande,'XOF','currency')+'</td>') +
        (d.type_demandes_id == 3 ? '' : '<td class="text-center py-0">'+ '<i class="material-icons text-black visualiser" title="visualiser" data-type="visualiser" data-index="' + d.id + '" data-modal="justif" data-route="visualiser"> &#xe873;</i>'+'</td>') +
            '<td class="text-center py-0">'+ (d.statut==2? d.motif : '')+'</td>' +
            '</table>'+
            '<table class="table table-hover table-sm table-bordered" id="subtable'+d.id+'">' +
            '<tr>' +
            '<th class="" colspan="'+d.nombre_notifications+'">Progression</th>' +
            '</tr>'
            +
            '<tr>' +
            procces_count+
            '</tr>'+
            '</table>'
        );
    }
    if (toApplytable=="ProfilesTable") {
        let procces_count = ''
        for (let i = 0; i < d.nombre_notifications; i++) {
            let color = '';
            if (i+1 <= d.procces_valide_result.notif_total) {
                color = 'bg-secondary text-white';
            }
            procces_count += '<td class="text-center py-0 '+ color +'">'+ d.notification[i].user.name +'</td>'
        }
        return (
            '<table class="table table-hover table-sm table-bordered" id="subtable'+d.id+'">' +
            '<tr>' +
            (d.type_demandes_id !== 1 ? '<th class="text-center">Periode</th>':'<th class="text-center">Montant de demande</th>')+
            (d.type_demandes_id == 3 ? '' : '<th class="text-center">Justificatifs</th>') +
            '<th class="text-center">Motif </th>' +
            '</tr>'
            +
            (d.type_demandes_id !== 1 ? '<td class="align-center py-0">'+
            '<table class="w-100">' +
            '<tr class="text-center py-0">' +
                '<td > Depart : ' + dateFormat(d.date_depart) + '</td>' +
                '<td >Fin : ' + dateFormat(d.date_fin )+ '</td>' +
            '</tr>' +
        '</table>'+
        '</td>' : '<td class="text-center py-0">'+ checkPercentage(d.montant_demande,'XOF','currency')+'</td>') +
        (d.type_demandes_id == 3 ? '' : '<td class="text-center py-0">'+ '<i class="material-icons text-black visualiser" title="visualiser" data-type="visualiser" data-index="' + d.id + '" data-modal="justif" data-route="visualiser"> &#xe873;</i>'+'</td>') +
            '<td class="text-center py-0">'+ (d.statut==2? d.motif : '')+'</td>' +
            '</table>'+
            '<table class="table table-hover table-sm table-bordered" id="subtable'+d.id+'">' +
            '<tr>' +
            '<th class="" colspan="'+d.nombre_notifications+'">Progression</th>' +
            '</tr>'
            +
            '<tr>' +
            procces_count+
            '</tr>'+
            '</table>'
        );
    }
    if (toApplytable=="DemandesTraitementTable") {
        return (
            '<table class="table table-hover table-sm table-bordered" id="subtable'+d.id+'">' +
            '<tr>' +
            (d.demande.type_demandes_id !== 1 ? '<th class="text-center">Periode</th>':'<th class="text-center">Montant de demande</th>')+
            (d.demande.type_demandes_id == 3 ? '' : '<th class="text-center">Justificatifs</th>') +
            '<th class="text-center">Motif </th>' +
            '</tr>'
            +
            (d.demande.type_demandes_id !== 1 ? '<td class="align-center py-0">'+
            '<table class="w-100">' +
            '<tr class="text-center py-0">' +
                '<td > Depart : ' + dateFormat(d.demande.date_depart) + '</td>' +
                '<td >Fin : ' + dateFormat(d.demande.date_fin )+ '</td>' +
            '</tr>' +
        '</table>'+
        '</td>' : '<td class="text-center py-0">'+ checkPercentage(d.demande.montant_demande,'XOF','currency')+'</td>') +
        (d.demande.type_demandes_id == 3 ? '' : '<td class="text-center py-0">'+ '<i class="material-icons text-black visualiser" title="visualiser" data-type="visualiser" data-index="' + d.demande.id + '" data-modal="justif" data-route="visualiser"> &#xe873;</i>'+'</td>') +
            '<td class="text-center py-0">'+ (d.demande.statut==2? d.demande.motif : '')+'</td>' +
            '</table>'
        );
    }
    if (toApplytable=="TraitementDemandesTable0") {
        return (
            '<table class="table table-hover table-sm table-bordered" id="subtable'+d.id+'">' +
            '<tr>' +
            (d.type_demandes_id !== 1 ? '<th class="text-center">Periode</th>':'<th class="text-center">Montant de demande</th>')+
            (d.type_demandes_id == 3 ? '' : '<th class="text-center">Justificatifs</th>') +
            '<th class="text-center">Motif </th>' +
            '</tr>'
            +
            (d.type_demandes_id !== 1 ? '<td class="align-center py-0">'+
            '<table class="w-100">' +
            '<tr class="text-center py-0">' +
                '<td > Depart : ' + dateFormat(d.date_depart) + '</td>' +
                '<td >Fin : ' + dateFormat(d.date_fin )+ '</td>' +
            '</tr>' +
        '</table>'+
        '</td>' : '<td class="text-center py-0">'+ checkPercentage(d.montant_demande,'XOF','currency')+'</td>') +
        (d.type_demandes_id == 3 ? '' : '<td class="text-center py-0">'+ '<i class="material-icons text-black visualiser" title="visualiser" data-type="visualiser" data-index="' + d.id + '" data-modal="justif" data-route="visualiser"> &#xe873;</i>'+'</td>') +
            '<td class="text-center py-0">'+ (d.statut==2? d.motif : '')+'</td>' +
            '</table>'
        );
    }
    if (toApplytable=="TraitementDemandesTable1") {
        return (
            '<table class="table table-hover table-sm table-bordered" id="subtable'+d.id+'">' +
            '<tr>' +
            (d.type_demandes_id !== 1 ? '<th class="text-center">Periode</th>':'<th class="text-center">Montant de demande</th>')+
            (d.type_demandes_id == 3 ? '' : '<th class="text-center">Justificatifs</th>') +
            '<th class="text-center">Motif </th>' +
            '</tr>'
            +
            (d.type_demandes_id !== 1 ? '<td class="align-center py-0">'+
            '<table class="w-100">' +
            '<tr class="text-center py-0">' +
                '<td > Depart : ' + dateFormat(d.date_depart) + '</td>' +
                '<td >Fin : ' + dateFormat(d.date_fin )+ '</td>' +
            '</tr>' +
        '</table>'+
        '</td>' : '<td class="text-center py-0">'+ checkPercentage(d.montant_demande,'XOF','currency')+'</td>') +
        (d.type_demandes_id == 3 ? '' : '<td class="text-center py-0">'+ '<i class="material-icons text-black visualiser" title="visualiser" data-type="visualiser" data-index="' + d.id + '" data-modal="justif" data-route="visualiser"> &#xe873;</i>'+'</td>') +
            '<td class="text-center py-0">'+ (d.statut==2? d.motif : '')+'</td>' +
            '</table>'
        );
    }
    if (toApplytable=="TraitementDemandesTable2") {
        return (
            '<table class="table table-hover table-sm table-bordered" id="subtable'+d.id+'">' +
            '<tr>' +
            (d.type_demandes_id !== 1 ? '<th class="text-center">Periode</th>':'<th class="text-center">Montant de demande</th>')+
            (d.type_demandes_id == 3 ? '' : '<th class="text-center">Justificatifs</th>') +
            '<th class="text-center">Motif </th>' +
            '</tr>'
            +
            (d.type_demandes_id !== 1 ? '<td class="align-center py-0">'+
            '<table class="w-100">' +
            '<tr class="text-center py-0">' +
                '<td > Depart : ' + dateFormat(d.date_depart) + '</td>' +
                '<td >Fin : ' + dateFormat(d.date_fin )+ '</td>' +
            '</tr>' +
        '</table>'+
        '</td>' : '<td class="text-center py-0">'+ checkPercentage(d.montant_demande,'XOF','currency')+'</td>') +
        (d.type_demandes_id == 3 ? '' : '<td class="text-center py-0">'+ '<i class="material-icons text-black visualiser" title="visualiser" data-type="visualiser" data-index="' + d.id + '" data-modal="justif" data-route="visualiser"> &#xe873;</i>'+'</td>') +
            '<td class="text-center py-0">'+ (d.statut==2? d.motif : '')+'</td>' +
            '</table>'
        );
    }
    if (toApplytable=="TableauCircuitValidation0") {
        let content = '<button class="btn btn-sn btn-primary" type="button" data-bs-toggle="modal" onclick="fopen (\'modals/circuit_user.modalcircuituser.show.PositionModal1.' + d.id + '\', \'circuit_user/create\')">Nouveau</button>';
        content += '<table class="table table-hover table-sm table-bordered" id="subtable'+d.id+'">' +
        '<tr>' +
        '<th class="w-5 text-center">N°</th>' +
        '<th class="w-85 text-center">Nom utilisateur</th>' +
        '<th class="w-10 text-center">Action</th>' +
        '</tr>';
        d.users.forEach(function (circuit_user, index)
        {
            content += '<tr>'
            +'<td class="text-center py-0">'+ circuit_user.order +'</td>'
            +'<td class="text-center py-0">'+ circuit_user.user.name +'</td>'
            +'<td class="text-center py-0 oneline">'
             +'<i class="material-icons text-secondary edit" data-toggle="tooltip" title="modifier" data-index="' + circuit_user.id + '" data-info="' + circuit_user.user.name + '" data-modal="modal_circuit_organe_user" data-route="circuit_organe_user">&#xf88d;</i>'
             +'<i class="material-icons text-primary delete" data-toggle="tooltip" title="supprimer"  data-type="annulation" data-index="' + circuit_user.id + '" data-info="' + circuit_user.user.name + '" data-route="circuit_organe_user">&#xE872;</i>'
            +'</td>'
            +'<tr>';
        });
        content += '</table>';

        return content;
    }
    if (toApplytable=="TableauCircuitValidation1") {
        let content = '<button class="btn btn-sn btn-primary" type="button" data-bs-toggle="modal" onclick="fopen (\'modals/circuit_user.modalcircuituser.show.PositionModal1.' + d.id + '\', \'circuit_user/create\')">Nouveau</button>';
        content += '<table class="table table-hover table-sm table-bordered" id="subtable'+d.id+'">' +
        '<tr>' +
        '<th class="w-5 text-center">N°</th>' +
        '<th class="w-85 text-center">Nom utilisateur</th>' +
        '<th class="w-10 text-center">Action</th>' +
        '</tr>';
        d.users.forEach(function (circuit_user, index)
        {
            content += '<tr>'
            +'<td class="text-center py-0">'+ circuit_user.order +'</td>'
            +'<td class="text-center py-0">'+ circuit_user.user.name +'</td>'
            +'<td class="text-center py-0 oneline">'
             +'<i class="material-icons text-secondary edit" data-toggle="tooltip" title="modifier" data-index="' + circuit_user.id + '" data-info="' + circuit_user.user.name + '" data-modal="modal_circuit_organe_user" data-route="circuit_organe_user">&#xf88d;</i>'
             +'<i class="material-icons text-primary delete" data-toggle="tooltip" title="supprimer"  data-type="annulation" data-index="' + circuit_user.id + '" data-info="' + circuit_user.user.name + '" data-route="circuit_organe_user">&#xE872;</i>'
            +'</td>'
            +'<tr>';
        });
        content += '</table>';

        return content;
    }
    if (toApplytable=="TableauCircuitValidation2") {
        let content = '<button class="btn btn-sn btn-primary" type="button" data-bs-toggle="modal" onclick="fopen (\'modals/circuit_user.modalcircuituser.show.PositionModal1.' + d.id + '\', \'circuit_user/create\')">Nouveau</button>';
        content += '<table class="table table-hover table-sm table-bordered" id="subtable'+d.id+'">' +
        '<tr>' +
        '<th class="w-5 text-center">N°</th>' +
        '<th class="w-85 text-center">Nom utilisateur</th>' +
        '<th class="w-10 text-center">Action</th>' +
        '</tr>';
        d.users.forEach(function (circuit_user, index)
        {
            content += '<tr>'
            +'<td class="text-center py-0">'+ circuit_user.order +'</td>'
            +'<td class="text-center py-0">'+ circuit_user.user.name +'</td>'
            +'<td class="text-center py-0 oneline">'
             +'<i class="material-icons text-secondary edit" data-toggle="tooltip" title="modifier" data-index="' + circuit_user.id + '" data-info="' + circuit_user.user.name + '" data-modal="modal_circuit_organe_user" data-route="circuit_organe_user">&#xf88d;</i>'
             +'<i class="material-icons text-primary delete" data-toggle="tooltip" title="supprimer"  data-type="annulation" data-index="' + circuit_user.id + '" data-info="' + circuit_user.user.name + '" data-route="circuit_organe_user">&#xE872;</i>'
            +'</td>'
            +'<tr>';
        });
        content += '</table>';

        return content;
    }
    if (toApplytable=="TableauOrganeValidateur0") {

        d.types.forEach(function (organe_validateur, index)
        {
            // console.log(organe_validateur);
            organe += '<tr>'
            +'<td class="py-2 text-center oneline align-middle">'
            +'<span role="button" data-bs-toggle="collapse" data-bs-target="#TableauCircuitValidation' + organe_validateur.circuit.id + '" aria-expanded="false" aria-controls="TableauCircuitValidation' + organe_validateur.circuit.id + '" title="Afficher plus" class="material-icons  mx-1">add_box</span>'
            +'</td>'
            +'<td class="py-2 text-center oneline align-middle">'
            +organe_validateur.order
            +'</td>'
            +'<td class="py-2 text-center oneline align-middle">'
            +'<div class="d-flex align-items-center"><input type="checkbox" class="mx-1"></div>'
            +'</td>'
            +'<td class="w-60 py-2 text-center oneline align-middle">'
            +organe_validateur.circuit.direction.label
            +'</td>'
            +'<td class="oneline py-2 text-center lh-0 align-middle">'
            +'<i class="material-icons text-secondary edit" data-toggle="tooltip" title="modifier" data-index="' + organe_validateur.id + '" data-info="' + organe_validateur.circuit.direction.label + '" data-modal="modal_circuitorganevalidateur" data-route="circuit_organe_validateur">&#xf88d;</i>'
            +'<i class="material-icons text-primary delete" data-toggle="tooltip" title="supprimer"  data-type="annulation" data-index="' + organe_validateur.id + '" data-info="' + organe_validateur.circuit.direction.label + '" data-route="circuit_organe_validateur">&#xE872;</i>'+
            '</td>'
            +'</tr>';

            organe_validateur.circuit.users.forEach(function(afficher_utilisateur, index)
            {
                subcontent4 += '<tr>'
                +'<td class="text-center py-0">'+ afficher_utilisateur.order +'</td>'
                +'<td class="text-center py-0">'+ afficher_utilisateur.user.name +'</td>'
                +'<td class="text-center py-0 oneline">'
                +'<i class="material-icons text-secondary edit" data-toggle="tooltip" title="modifier" data-index="' + afficher_utilisateur.id + '" data-info="' + afficher_utilisateur.user.name + '" data-modal="modal_circuit_organe_user" data-route="circuit_organe_user">&#xf88d;</i>'
                +'<i class="material-icons text-primary delete" data-toggle="tooltip" title="supprimer"  data-type="annulation" data-index="' + afficher_utilisateur.id + '" data-info="' + afficher_utilisateur.user.name + '" data-route="circuit_organe_user">&#xE872;</i>'
                +'</td>'
                +'<tr>'
            });

             //sous tableau contenant les utilisateurs
            subcontentTable='<tr class="collapse" id="TableauCircuitValidation' + organe_validateur.circuit.id + '">'
            +'<td colspan="5">'
            +'<button class="btn btn-sn btn-primary" type="button" data-bs-toggle="modal" onclick="fopen (\'modals/circuit_user.modalcircuituser.show.PositionModal1.' + d.id + '\', \'circuit_user/create\')">Nouveau</button>'
            + '<table class="table table-hover table-sm table-bordered" id="subtable'+d.id+'">'
            +'<tr>'
            +'<th class="w-5 text-center">N°</th>'
            +'<th class="w-85 text-center">Nom utilisateur</th>'
            +'<th class="w-10 text-center">Action</th>'
            +'</tr>'
            +subcontent4
            +'</table>'
            +'</td>'
            +'</tr>'
            subcontent4=""
            organe+=subcontentTable
        });


        subcontent4=""
        subcontentTable=""
        //sous tableau contenant le circuit
        return '<button class="btn btn-sn btn-primary" type="button" data-bs-toggle="modal" onclick="fopen (\'modals/circuit_organe_validateur.modalcircuitorgane.show.PositionModal1.' + [d.id,d.filliale_id] + '\',\'organe/create\')">Nouveau</button>'
        +'<table class="table table-hover table-sm table-bordered" id="subtable'+d.id+'">'
        +'<tr>'
        +'<th class="w-7 text-center"></th>'
        +'<th class="w-5 text-center">N°</th>'
        +'<th class="w-7 text-center">#</th>'
        +'<th class="w-74 text-center">Libelle</th>'
        +'<th class="w-7 text-center"></th>'
        +'</tr>'
        +organe
        +'</table>';
    }
    if (toApplytable=="TableauOrganeValidateur1") {

        d.types.forEach(function (organe_validateur, index)
        {
            // console.log(organe_validateur);
            organe += '<tr>'
            +'<td class="py-2 text-center oneline align-middle">'
            +'<span role="button" data-bs-toggle="collapse" data-bs-target="#TableauCircuitValidation' + organe_validateur.circuit.id + '" aria-expanded="false" aria-controls="TableauCircuitValidation' + organe_validateur.circuit.id + '" title="Afficher plus" class="material-icons  mx-1">add_box</span>'
            +'</td>'
            +'<td class="py-2 text-center oneline align-middle">'
            +organe_validateur.order
            +'</td>'
            +'<td class="py-2 text-center oneline align-middle">'
            +'<div class="d-flex align-items-center"><input type="checkbox" class="mx-1"></div>'
            +'</td>'
            +'<td class="w-60 py-2 text-center oneline align-middle">'
            +organe_validateur.circuit.direction.label
            +'</td>'
            +'<td class="oneline py-2 text-center lh-0 align-middle">'
            +'<i class="material-icons text-secondary edit" data-toggle="tooltip" title="modifier" data-index="' + organe_validateur.id + '" data-info="' + organe_validateur.circuit.direction.label + '" data-modal="modal_circuitorganevalidateur" data-route="circuit_organe_validateur">&#xf88d;</i>'
            +'<i class="material-icons text-primary delete" data-toggle="tooltip" title="supprimer"  data-type="annulation" data-index="' + organe_validateur.id + '" data-info="' + organe_validateur.circuit.direction.label + '" data-route="circuit_organe_validateur">&#xE872;</i>'+
            '</td>'
            +'</tr>';

            organe_validateur.circuit.users.forEach(function(afficher_utilisateur, index)
            {
                subcontent4 += '<tr>'
                +'<td class="text-center py-0">'+ afficher_utilisateur.order +'</td>'
                +'<td class="text-center py-0">'+ afficher_utilisateur.user.name +'</td>'
                +'<td class="text-center py-0 oneline">'
                +'<i class="material-icons text-secondary edit" data-toggle="tooltip" title="modifier" data-index="' + afficher_utilisateur.id + '" data-info="' + afficher_utilisateur.user.name + '" data-modal="modal_circuit_organe_user" data-route="circuit_organe_user">&#xf88d;</i>'
                +'<i class="material-icons text-primary delete" data-toggle="tooltip" title="supprimer"  data-type="annulation" data-index="' + afficher_utilisateur.id + '" data-info="' + afficher_utilisateur.user.name + '" data-route="circuit_organe_user">&#xE872;</i>'
                +'</td>'
                +'<tr>'
            });

             //sous tableau contenant les utilisateurs
            subcontentTable='<tr class="collapse" id="TableauCircuitValidation' + organe_validateur.circuit.id + '">'
            +'<td colspan="5">'
            +'<button class="btn btn-sn btn-primary" type="button" data-bs-toggle="modal" onclick="fopen (\'modals/circuit_user.modalcircuituser.show.PositionModal1.' + d.id + '\', \'circuit_user/create\')">Nouveau</button>'
            + '<table class="table table-hover table-sm table-bordered" id="subtable'+d.id+'">'
            +'<tr>'
            +'<th class="w-5 text-center">N°</th>'
            +'<th class="w-85 text-center">Nom utilisateur</th>'
            +'<th class="w-10 text-center">Action</th>'
            +'</tr>'
            +subcontent4
            +'</table>'
            +'</td>'
            +'</tr>'
            subcontent4=""
            organe+=subcontentTable
        });


        subcontent4=""
        subcontentTable=""
        //sous tableau contenant le circuit
        return '<button class="btn btn-sn btn-primary" type="button" data-bs-toggle="modal" onclick="fopen (\'modals/circuit_organe_validateur.modalcircuitorgane.show.PositionModal1.' + [d.id,d.filliale_id] + '\',\'organe/create\')">Nouveau</button>'
        +'<table class="table table-hover table-sm table-bordered" id="subtable'+d.id+'">'
        +'<tr>'
        +'<th class="w-7 text-center"></th>'
        +'<th class="w-5 text-center">N°</th>'
        +'<th class="w-7 text-center">#</th>'
        +'<th class="w-74 text-center">Libelle</th>'
        +'<th class="w-7 text-center"></th>'
        +'</tr>'
        +organe
        +'</table>';
    }
    if (toApplytable=="TableauOrganeValidateur2") {

        d.types.forEach(function (organe_validateur, index)
        {
            // console.log(organe_validateur);
            organe += '<tr>'
            +'<td class="py-2 text-center oneline align-middle">'
            +'<span role="button" data-bs-toggle="collapse" data-bs-target="#TableauCircuitValidation' + organe_validateur.circuit.id + '" aria-expanded="false" aria-controls="TableauCircuitValidation' + organe_validateur.circuit.id + '" title="Afficher plus" class="material-icons  mx-1">add_box</span>'
            +'</td>'
            +'<td class="py-2 text-center oneline align-middle">'
            +organe_validateur.order
            +'</td>'
            +'<td class="py-2 text-center oneline align-middle">'
            +'<div class="d-flex align-items-center"><input type="checkbox" class="mx-1"></div>'
            +'</td>'
            +'<td class="w-60 py-2 text-center oneline align-middle">'
            +organe_validateur.circuit.direction.label
            +'</td>'
            +'<td class="oneline py-2 text-center lh-0 align-middle">'
            +'<i class="material-icons text-secondary edit" data-toggle="tooltip" title="modifier" data-index="' + organe_validateur.id + '" data-info="' + organe_validateur.circuit.direction.label + '" data-modal="modal_circuitorganevalidateur" data-route="circuit_organe_validateur">&#xf88d;</i>'
            +'<i class="material-icons text-primary delete" data-toggle="tooltip" title="supprimer"  data-type="annulation" data-index="' + organe_validateur.id + '" data-info="' + organe_validateur.circuit.direction.label + '" data-route="circuit_organe_validateur">&#xE872;</i>'+
            '</td>'
            +'</tr>';

            organe_validateur.circuit.users.forEach(function(afficher_utilisateur, index)
            {
                subcontent4 += '<tr>'
                +'<td class="text-center py-0">'+ afficher_utilisateur.order +'</td>'
                +'<td class="text-center py-0">'+ afficher_utilisateur.user.name +'</td>'
                +'<td class="text-center py-0 oneline">'
                +'<i class="material-icons text-secondary edit" data-toggle="tooltip" title="modifier" data-index="' + afficher_utilisateur.id + '" data-info="' + afficher_utilisateur.user.name + '" data-modal="modal_circuit_organe_user" data-route="circuit_organe_user">&#xf88d;</i>'
                +'<i class="material-icons text-primary delete" data-toggle="tooltip" title="supprimer"  data-type="annulation" data-index="' + afficher_utilisateur.id + '" data-info="' + afficher_utilisateur.user.name + '" data-route="circuit_organe_user">&#xE872;</i>'
                +'</td>'
                +'<tr>'
            });

             //sous tableau contenant les utilisateurs
            subcontentTable='<tr class="collapse" id="TableauCircuitValidation' + organe_validateur.circuit.id + '">'
            +'<td colspan="5">'
            +'<button class="btn btn-sn btn-primary" type="button" data-bs-toggle="modal" onclick="fopen (\'modals/circuit_user.modalcircuituser.show.PositionModal1.' + d.id + '\', \'circuit_user/create\')">Nouveau</button>'
            + '<table class="table table-hover table-sm table-bordered" id="subtable'+d.id+'">'
            +'<tr>'
            +'<th class="w-5 text-center">N°</th>'
            +'<th class="w-85 text-center">Nom utilisateur</th>'
            +'<th class="w-10 text-center">Action</th>'
            +'</tr>'
            +subcontent4
            +'</table>'
            +'</td>'
            +'</tr>'
            subcontent4=""
            organe+=subcontentTable
        });


        subcontent4=""
        subcontentTable=""
        //sous tableau contenant le circuit
        return '<button class="btn btn-sn btn-primary" type="button" data-bs-toggle="modal" onclick="fopen (\'modals/circuit_organe_validateur.modalcircuitorgane.show.PositionModal1.' + [d.id,d.filliale_id] + '\',\'organe/create\')">Nouveau</button>'
        +'<table class="table table-hover table-sm table-bordered" id="subtable'+d.id+'">'
        +'<tr>'
        +'<th class="w-7 text-center"></th>'
        +'<th class="w-5 text-center">N°</th>'
        +'<th class="w-7 text-center">#</th>'
        +'<th class="w-74 text-center">Libelle</th>'
        +'<th class="w-7 text-center"></th>'
        +'</tr>'
        +organe
        +'</table>';
    }
    if (toApplytable=="ObjetdemandeTable") {

        d.dem_objet_sgs.forEach(function (dem_objet_sgs, index)
        {
            // console.log(organe_validateur);
            les_objets += '<tr>'
            +'<td class="py-2 text-center oneline align-middle">'
            +'<span role="button" data-bs-toggle="collapse" data-bs-target="#ObjetdemandeTable' + dem_objet_sgs.id + '" aria-expanded="false" aria-controls="ObjetdemandeTable' + dem_objet_sgs.id + '" title="Afficher plus" class="material-icons  mx-1">add_box</span>'
            +'</td>'
            +'<td class="py-2 text-center oneline align-middle">'
            +dem_objet_sgs.label
            +'</td>'
            +'<td class="oneline py-2 text-center lh-0 align-middle">'
            +'<i class="material-icons text-secondary edit" data-toggle="tooltip" title="modifier" data-index="' + dem_objet_sgs.id + '" data-info="' + dem_objet_sgs.label + '" data-modal="modaldemsousobjet" data-route="objet_demande_sousobjet">&#xf88d;</i>'
            +'<i class="material-icons text-primary delete" data-toggle="tooltip" title="supprimer"  data-type="annulation" data-index="' + dem_objet_sgs.id + '" data-info="' + dem_objet_sgs.label + '" data-route="objet_demande_sousobjet">&#xE872;</i>'+
            '</td>'
            +'</tr>';

            dem_objet_sgs.objets.forEach(function(list_objet, index)
            {
                subcontent4 += '<tr>'
                +'<td class="text-center py-0">'+ list_objet.label +'</td>'
                +'<td class="text-center py-0 oneline">'
                +'<i class="material-icons text-secondary edit" data-toggle="tooltip" title="modifier" data-index="' + list_objet.id + '" data-info="' + list_objet.label + '" data-modal="modaldemobjet" data-route="objet_demande_objet">&#xf88d;</i>'
                +'<i class="material-icons text-primary delete" data-toggle="tooltip" title="supprimer"  data-type="annulation" data-index="' + list_objet.id + '" data-info="' + list_objet.label + '" data-route="objet_demande_objet">&#xE872;</i>'
                +'</td>'
                +'<tr>'
            });

             //sous tableau contenant les utilisateurs
            subcontentTable='<tr class="collapse" id="ObjetdemandeTable' + dem_objet_sgs.id + '">'
            +'<td colspan="5">'
            +'<button class="btn btn-sn btn-primary" type="button" data-bs-toggle="modal" onclick="fopen (\'modals/objet_demande_objet.modaldemobjet.show.PositionModal1.' + d.id + '.' + dem_objet_sgs.id + '\', \'objet_demande_objet/create\')">Nouveau</button>'
            + '<table class="table table-hover table-sm table-bordered" id="subtable'+d.id+'">'
            +'<tr>'
            +'<th class="w-85 text-center">Titre</th>'
            +'<th class="w-10 text-center">Action</th>'
            +'</tr>'
            +subcontent4
            +'</table>'
            +'</td>'
            +'</tr>'
            subcontent4=""
            les_objets+=subcontentTable
        });


        subcontent4=""
        subcontentTable=""
        //sous tableau contenant le circuit
        return '<button class="btn btn-sn btn-primary" type="button" data-bs-toggle="modal" onclick="fopen (\'modals/objet_demande_sousobjet.modaldemsousobjet.show.PositionModal1.' + d.id + '\',\'objet_demande_sousobjet/create\')">Nouveau</button>'
        +'<table class="table table-hover table-sm table-bordered" id="subtable'+d.id+'">'
        +'<tr>'
        +'<th class="w-5 text-center">N°</th>'
        +'<th class="w-7 text-center">Titre</th>'
        +'<th class="w-7 text-center"></th>'
        +'</tr>'
        +les_objets
        +'</table>';
    }
}

//application des datatables
function applyDataTablesTo(toApplytable) {
    // console.log(toApplytable);
    let numdemande;
    switch (toApplytable) {
        case "AffaireTable":
            tableRender['AffaireTable'] = $('#AffaireTable').DataTable({
                ajax: {
                    url:'affaires',
                    dataSrc: 'affaires',
                },
                ordering: false,
                columns: [
                    {
                        className: 'py-0',
                        orderable: false,
                        data: null,
                        defaultContent: '<i class="material-icons mb-1 dt_control_expand" data-toggle="tooltip" title="derouler" data-ref="refAffaireTable" style="color: #c3cf14;">&#xe146;</i>',
                    },
                    {
                        className: 'py-0 d-none',
                        orderable: false,
                        data: 'completed_state'
                    },
                    {
                        className: 'py-0 oneline',
                        data: 'nom_assure',

                    },
                    {
                        className: 'py-0 td_ellipsis',
                        data: 'bien_assure',
                    },
                    {
                        className: 'py-0 oneline text-end',
                        data: 'date_reception',
                        render :function ( data, type, row ) {
                            // options for formatting
                            const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
                            // Get the date string in dd/mm/yyyy format
                            let newDateStr = new Date(data).toLocaleDateString('en-GB', options);
                            return newDateStr;
                        }
                    },
                    {
                        className: 'py-0 oneline',
                        data: 'transferor.raison_social'
                    },
                    {
                        className: 'py-0 oneline',
                        data: 'branche.label'
                    },
                    {
                        className: 'py-0 oneline text-end',
                        data: 'date_effet',
                        render :function ( data, type, row ) {
                            ;
                            // options for formatting
                            const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
                            // Get the date string in dd/mm/yyyy format
                            let newDateStr = new Date(data).toLocaleDateString('en-GB', options);
                            return newDateStr;
                        } },
                    {
                        className: 'py-0 oneline text-end',
                        data: 'date_echeance',
                        render :function ( data, type, row ) {
                            // options for formatting
                            const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
                            // Get the date string in dd/mm/yyyy format
                            let newDateStr = new Date(data).toLocaleDateString('en-GB', options);
                            return newDateStr;
                        }
                    },
                    {
                        className: 'py-0 text-center',
                        data: 'monnaie' },
                    {
                        className: 'py-0 text-end oneline',
                        data: 'prime',
                        render :$.fn.dataTable.render.number( ' ', '.', 2 ) },
                    {
                        className: 'py-0 text-center',
                        data: 'part_offerte',
                        render :$.fn.dataTable.render.number( ' ', '.', 2,'','%')
                    },
                    {
                        className: 'py-0 oneline text-end',
                        data: 'prime_de_reassurance',
                        render :$.fn.dataTable.render.number( ' ', '.', 2 )
                    },
                    {
                        className: 'py-0 oneline text-center',
                        data: 'commission_cedante',
                        render :$.fn.dataTable.render.number( ' ', '.', 2,'','%')
                    },
                    {
                        className: 'py-0 oneline text-end',
                        data: "reinsurers",
                        render: function ( data, type, row ) {
                            var sum = parseFloat(data.reduce(function (a, b) { return a + parseFloat(b.pivot.chiffre_affaire); }, 0)).toFixed(2);

                            return $.fn.dataTable.render.number( ' ', '.', 2 ).display(sum);
                        }
                    },
                    {
                        className: 'py-0 oneline text-end',
                        data: null,
                        render :function ( data, type, row ) {
                            return $.fn.dataTable.render.number( ' ', '.', 2 ).display(((parseFloat(row.prime) * parseFloat(row.part_offerte)) /100) * (1 - parseFloat(row.commission_cedante / 100)));
                        }
                    },
                    {
                        className: 'py-0 oneline text-end',
                        data: "reinsurers",
                        render: function ( data, type, row ) {
                            var sum = parseFloat(data.reduce(function (a, b) { return a + parseFloat(b.pivot.prime_a_reverser); }, 0)).toFixed(2);

                            return $.fn.dataTable.render.number( ' ', '.', 2 ).display(sum);
                        }
                    },
                    {
                        className: 'py-0 text-center',
                        orderable: false,
                        data: null,
                        render: function ( data, type, row ) {
                            return '<i class="material-icons text-warning edit" data-toggle="tooltip" title="modifier" data-index="'+row.id+'" data-info="'+row.nom_assure+'" data-modal="remplissageFormLarge">&#xf88d;</i>' + '<i class="material-icons text-danger delete" data-toggle="tooltip" title="supprimer" data-index="'+row.id+'" data-info="'+row.nom_assure+'">&#xE872;</i>';
                        }
                    },
                ],
                order: [[1, 'asc']],
            });
        break;

        case "ActivityTable":
            tableRender['ActivityTable'] = $('#ActivityTable').DataTable({
                ajax: {
                    url:'activity',
                    dataSrc: 'activityByTransferor',
                },
                columns: [
                    {
                        className: 'py-0 text-center oneline',
                        orderable: false,
                        data: null,
                        defaultContent: '<i class="material-icons mb-1 dt_control_expand" data-toggle="tooltip" title="derouler" style="color: #c3cf14;">&#xe146;</i>',
                    },
                    {
                        className: 'py-0 oneline',
                        data: 'raison_social' },
                    {
                        className: 'py-0 oneline text-end',
                        data: 'r_commerce',
                    },
                    {
                        className: 'py-0 oneline',
                        data: 'pays.label' },
                    {
                        className: 'py-0 oneline text-center',
                        orderable: false,
                        data: null,
                        render: function ( data, type, row ) {
                            return '<i class="material-icons text-warning edit" data-toggle="tooltip" title="modifier" data-index="'+row.id+'" data-info="'+row.raison_social+'">&#xf88d;</i>' + '<i class="material-icons text-danger delete" data-toggle="tooltip" title="supprimer" data-index="'+row.id+'" data-info="'+row.raison_social+'">&#xE872;</i>';
                        }
                    },
                ],
                order: [[1, 'asc']],
            });
        break;

        case "BordereauTable":
            tableRender['BordereauTable'] = $('#BordereauTable').DataTable({
                ajax: {
                    url:'bordereaux',
                    dataSrc: 'bordereaux',
                },
                columns: [
                    {
                        className: 'py-0 text-center',
                        data: null,
                    },
                    {
                        className: 'py-2',
                        data: 'label',
                        render: function ( data, type, row ) {
                            return '<a href="bordereau/'+row.id+'/view" class="linkto mb-1" data-index="'+row.id+'">'+row.label+'</a>';
                        }
                    },
                    {
                        className: 'py-0 text-end',
                        data: 'created_at',
                        render :function ( data, type, row ) {
                            // options for formatting
                            const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'  };
                            // Get the date string in dd/mm/yyyy format
                            let newDateStr = new Date(data).toLocaleDateString('en-GB', options);
                            return newDateStr;
                        }
                    },
                    {
                        className: 'py-0 text-center d-none',
                        orderable: false,
                        data: null,
                        render: function ( data, type, row ) {
                            return '<i class="material-icons text-warning edit" data-toggle="tooltip" title="modifier" data-index="'+row.id+'" data-info="'+row.label+'">&#xf88d;</i>' + '<i class="material-icons text-danger delete" data-toggle="tooltip" title="supprimer" data-index="'+row.id+'" data-info="'+row.label+'">&#xE872;</i>';
                        }
                    },
                ],
                order: [[2, 'asc']],
            });
            tableRender['BordereauTable'].on('order.dt search.dt', function () {
                tableRender['BordereauTable'].column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            })
            .draw();
        break;

        case "TableauConventions":
            tableRender['TableauConventions'] = $('#TableauConventions').DataTable({
                ajax: {
                    url:'pool',
                    dataSrc: 'conventions',
                },
                columns: [
                    {
                        className: 'py-2 text-center',
                        data: null,
                    },
                    {
                        className: 'py-2 text-center oneline',
                        data: 'label',
                    },
                    {
                        className: 'py-2 text-center',
                        data: 'year',
                    },
                    {
                        className: 'py-2 text-end text-center',
                        data: 'date_effet',
                        render :function ( data, type, row ) {
                            // options for formatting
                            const options = { day: 'numeric', month: 'numeric', year: 'numeric'};
                            // Get the date string in dd/mm/yyyy format
                            let newDateStr = new Date(data).toLocaleDateString('en-GB', options);
                            return newDateStr;
                        }
                    },
                    {
                        className: 'py-2 text-end text-center',
                        data: 'date_echeance',
                        render :function ( data, type, row ) {
                            // options for formatting
                            const options = { day: 'numeric', month: 'numeric', year: 'numeric'};
                            // Get the date string in dd/mm/yyyy format
                            let newDateStr = new Date(data).toLocaleDateString('en-GB', options);
                            return newDateStr;
                        }
                    },
                    {
                        className: 'py-2 text-center',
                        orderable: false,
                        data: null,
                        render: function ( data, type, row ) {
                            return '<i class="material-icons text-warning view mx-2" data-toggle="tooltip" title="voir" data-index="'+row.year+row.id+'" data-info="'+row.label+'" data-modal="conventionViewModal">&#xe873;</i>';
                        }
                    },
                ],
                order: [[1, 'asc']],
            });
            tableRender['TableauConventions'].on('order.dt search.dt', function () {
                tableRender['TableauConventions'].column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            })
            .draw();
        break;

        case "financeCedanteTable":
            tableRender['financeCedanteTable'] = $('#financeCedanteTable').DataTable({
                ajax: {
                    url:'payfromtransferor',
                    dataSrc: 'affairesParCedantesApayer',
                },
                columns: [
                    {
                        className: 'py-0 text-center oneline',
                        orderable: false,
                        data: 'id',
                        render: function ( data, type, row ) {
                            return '<i class="material-icons mb-1 dt_control_expand closed" data-toggle="tooltip" title="derouler" data-ref="refFinanceCedanteTable" style="color: #c3cf14;">&#xe146;</i> <input class="form-check-input ms-2 my-1 parentCheckbox" type="checkbox" data-child="'+data+'" value="" id="flexCheckDefault">';
                        }
                    },
                    {
                        className: 'py-0 oneline',
                        data: 'raison_social' },
                    {
                        className: 'py-0 oneline',
                        data: 'pays.label',
                    },
                    {
                        className: 'py-0 oneline text-center',
                        data: 'businesses_with_not_pay_count',
                    }
                ],
                order: [[1, 'asc']],
            });
        break;

        case "TransactionTable":
            tableRender['TransactionTable'] = $('#TransactionTable').DataTable({
                ajax: {
                    url:'listes_transactions',
                    dataSrc: 'listesTransactions',
                },
                columns: [
                    {
                        className: 'py-0 text-center',
                        orderable: false,
                        data: 'id',
                        render: function ( data, type, row ) {
                            return '<i class="material-icons mb-1 dt_control_expand closed" data-toggle="tooltip" title="derouler" data-ref="refTransactionTable" style="color: #c3cf14;">&#xe146;</i>';
                        },
                    },
                    {
                        className: 'py-1',
                        data: 'nom_assure'
                    },
                    {
                        className: 'py-1',
                        data: 'transferor.raison_social',
                    },
                    {
                        className: 'py-1 text-center',
                        data: 'reinsurers',
                        render :function ( data, type, row ) {
                            let countNombrePayer=0;
                            // recuperation et reassureur et de cedante payer
                            for (let s_index = 0; s_index < row.paymentable.length; s_index++) {
                                for (let index = 0; index < row.reinsurers.length; index++) {
                                    if (row.reinsurers[index].id==row.paymentable[s_index].paymentable_id) {
                                        countNombrePayer++;
                                    }
                                }
                            }
                            return countNombrePayer+' sur '+data.length;
                        }
                    },
                    {
                        className: 'py-1 text-center',
                        data: null,
                        render :function ( data, type, row ) {
                            let countNombrePayer=0;
                            // recuperation et reassureur et de cedante payer
                            for (let s_index = 0; s_index < row.paymentable.length; s_index++) {
                                for (let index = 0; index < row.reinsurers.length; index++) {
                                    if (row.reinsurers[index].id==row.paymentable[s_index].paymentable_id) {
                                        countNombrePayer++;
                                    }
                                }
                            }
                            return (row.reinsurers.length+1 == countNombrePayer+ 1 ? '<span class="rounded bg-success text-white p-1 m-1">Terminée</span>' : '<span class="rounded bg-warning p-1 m-1">En cours</span>' );

                        }
                    }
                ],
                order: [[1, 'asc']],
            });
        break;

        case "financeReassureurTable":
            tableRender['financeReassureurTable'] = $('#financeReassureurTable').DataTable({
                ajax: {
                    url:'paytoreinsurer',
                    dataSrc: 'affairesParReassureursApayer',
                },
                columns: [
                    {
                        className: 'py-0 text-center oneline',
                        orderable: false,
                        data: 'id',
                        render: function ( data, type, row ) {
                            return '<i class="material-icons mb-1 dt_control_expand closed" data-toggle="tooltip" title="derouler" data-ref="refFinanceReassureurTable" style="color: #c3cf14;">&#xe146;</i> <input class="form-check-input ms-2 my-1 parentCheckbox" type="checkbox" data-child="'+data+'" value="" id="flexCheckDefault">';
                        },
                    },
                    {
                        className: 'py-0 oneline',
                        data: 'raison_social' },
                    {
                        className: 'py-0 oneline',
                        data: 'pays.label',
                    },
                    {
                        className: 'py-0 oneline text-center',
                        data: null,
                        render :function ( data, type, row ) {
                            return row.businesses_with_not_pay.length
                        }
                    },
                ],
                order: [[1, 'asc']],
            });
        break;

        case "TableauUtilisateurs":
            tableRender['TableauUtilisateurs'] = $('#TableauUtilisateurs').DataTable({
                ajax: {
                    url:'settings/user',
                    dataSrc: 'Users',
                },
                columns: [
                    {
                        className: 'text-center',
                        orderable: false,
                        data: 'id',
                        render: function ( data, type, row ) {
                            return '<input class="form-check-input ms-2 my-1 parentCheckbox setCheckbox" type="checkbox" data-child="'+data+'" value="" id="flexCheckDefault">';
                        },
                    },
                    {
                        className: '',
                        data: 'name' },
                    {
                        className: '',
                        data: 'username',
                    },
                    {
                        className: '',
                        data: 'email',
                    },
                    {
                        className: '',
                        data: 'roles',
                        data: null,
                        defaultContent: '.....',
                        // render :function ( data, type, row ) {
                        //     let userRoles='';
                        //     data.forEach(element => {
                        //         userRoles+='<span class="rounded bg-warning p-1 m-1">'+element.name+'</span>';
                        //     });
                        //     return userRoles;
                        // }
                    },
                    {
                        className:'text-center',
                        data: 'active',
                        render: function ( data, type, row ) {
                            return data ? '<span class="rounded bg-success p-1 m-1 text-white">Oui</span>' : '<span class="rounded bg-danger p-1 m-1 text-white">Non</span>';
                        },
                    },
                    {
                        className: 'oneline text-center',
                        data: null,
                        render: function ( data, type, row ) {
                            return '<i class="material-icons text-warning edit mb-1" data-toggle="tooltip" title="modifier" data-index="'+row.id+'" data-info="'+row.name.toUpperCase()+'" data-modal="remplissageFormLarge" >&#xf88d;</i> <i class="material-icons delete mb-1 text-danger" data-toggle="tooltip" title="supprimer" style="color: #BE1D2E;" data-index="'+row.id+'" data-info="'+row.name.toUpperCase()+'">&#xE872;</i>';
                        }
                    },
                ],
                order: [[1, 'asc']],
            });
        break;

        case "rolesTable":
            tableRender['rolesTable'] = $('#rolesTable').DataTable({
                ajax: {
                    url:'role',
                    dataSrc: 'roles',
                },
                columns: [
                    {
                        className: 'text-center d-none',
                        orderable: false,
                        data: 'id',
                        render: function ( data, type, row ) {
                            return '<input class="form-check-input ms-2 my-1 parentCheckbox" type="checkbox" data-child="'+data+'" value="" id="flexCheckDefault">';
                        },
                    },
                    {
                        className: 'oneline',
                        data: 'name'
                    },
                    {
                        className: 'd-flex flex-wrap',
                        data: 'permissions',
                        render :function ( data, type, row ) {
                            let rolePermission='';
                            data.forEach(element => {
                                rolePermission+='<span class="rounded bg-warning p-1 m-1">'+element.name+'</span>';
                            });
                            return rolePermission;
                        }
                    },
                    {
                        className: 'oneline text-center',
                        data: null,
                        render: function ( data, type, row ) {
                            return '<i class="material-icons text-warning edit mb-1" data-toggle="tooltip" title="modifier" data-index="'+row.id+'" data-info="'+row.name.toUpperCase()+'" data-modal="remplissageFormLarge" >&#xf88d;</i> <i class="material-icons delete mb-1 text-danger" data-toggle="tooltip" title="supprimer" style="color: #BE1D2E;" data-index="'+row.id+'" data-info="'+row.name.toUpperCase()+'">&#xE872;</i>';
                        }
                    },
                ],
                order: [[1, 'asc']],
            });
        break;

        case "permissionTable":
            tableRender['permissionTable'] = $('#permissionTable').DataTable({
                ajax: {
                    url:'role',
                    dataSrc: 'permissions',
                },
                columns: [
                    {
                        className: 'text-center d-none',
                        orderable: false,
                        data: 'id',
                        render: function ( data, type, row ) {
                            return '<input class="form-check-input ms-2 my-1 parentCheckbox" type="checkbox" data-child="'+data+'" value="" id="flexCheckDefault">';
                        },
                    },
                    {
                        className: 'text-center',
                        data: 'id'
                    },
                    {
                        className: '',
                        data: 'name'
                    },
                    {
                        className: '',
                        data: 'created_at',
                    },
                    {
                        className: 'text-center',
                        data: null,
                        render: function ( data, type, row ) {
                            return '<i class="material-icons text-warning edit mb-1" data-toggle="tooltip" title="modifier" data-index="'+row.id+'" data-info="'+row.name.toUpperCase()+'" data-modal="remplissageFormLarge" >&#xf88d;</i> <i class="material-icons delete mb-1 text-danger" data-toggle="tooltip" title="supprimer" style="color: #BE1D2E;" data-index="'+row.id+'" data-info="'+row.name.toUpperCase()+'">&#xE872;</i>';
                        }
                    },
                ],
                order: [[1, 'asc']],
            });
        break;

        case "ReassureursTable":
            tableRender['ReassureursTable'] = $('#ReassureursTable').DataTable({
                ajax: {
                    url:'reinsurer',
                    dataSrc: 'reassureurs',
                },
                columns: [
                    {
                        className:'py-0',
                        orderable: false,
                        data: 'id',
                        render: function ( data, type, row ) {
                            return '<i class="material-icons mb-1 mx-2 dt_control_expand" data-toggle="tooltip" title="derouler" data-ref="refReassureursTable" style="color: #c3cf14;">&#xe146;</i><input class="form-check-input ms-2 my-1 setCheckbox" type="checkbox" data-child="'+data+'" value="" id="flexCheckDefault">';
                        },
                    },
                    {
                        className:'py-1',
                        data: 'raison_social'
                    },
                    {
                        className:'py-1',
                        data: 'pays.label',
                    },
                    {
                        className:'py-1 text-center',
                        data: 'r_commerce',
                    },
                    {
                        className:'py-1 text-center',
                        data: 'active',
                        render: function ( data, type, row ) {
                            return data ? '<span class="rounded bg-success p-1 m-1 text-white">Oui</span>' : '<span class="rounded bg-danger p-1 m-1 text-white">Non</span>';
                        },
                    },
                    {
                        className: 'py-1 text-center',
                        data: null,
                        render: function ( data, type, row ) {
                            return '<i class="material-icons text-warning edit mb-1" data-toggle="tooltip" title="modifier" data-index="'+row.id+'" data-info="'+row.raison_social.toUpperCase()+'" data-modal="remplissageFormLarge" >&#xf88d;</i> <i class="material-icons delete mb-1 text-danger" data-toggle="tooltip" title="supprimer" style="color: #BE1D2E;" data-index="'+row.id+'" data-info="'+row.raison_social.toUpperCase()+'">&#xE872;</i>';
                        }
                    },
                ],
                order: [[1, 'asc']],
            });
        break;

        case "CedantesTable":
            tableRender['CedantesTable'] = $('#CedantesTable').DataTable({
                ajax: {
                    url:'transferor',
                    dataSrc: 'cedantes',
                },
                columns: [
                    {
                        className: 'text-center d-none',
                        orderable: false,
                        data: 'id',
                        render: function ( data, type, row ) {
                            return '<input class="form-check-input ms-2 my-1 parentCheckbox" type="checkbox" data-child="'+data+'" value="" id="flexCheckDefault">';
                        },
                    },
                    {
                        className: '',
                        data: 'raison_social'
                    },
                    {
                        className: '',
                        data: 'pays.label',
                    },
                    {
                        className: 'text-center',
                        data: 'r_commerce',
                    },
                    {
                        className: 'text-center',
                        data: null,
                        render: function ( data, type, row ) {
                            return '<i class="material-icons text-warning edit mb-1" data-toggle="tooltip" title="modifier" data-index="'+row.id+'" data-info="'+row.raison_social.toUpperCase()+'" data-modal="remplissageFormLarge" >&#xf88d;</i> <i class="material-icons delete mb-1 text-danger" data-toggle="tooltip" title="supprimer" style="color: #BE1D2E;" data-index="'+row.id+'" data-info="'+row.raison_social.toUpperCase()+'">&#xE872;</i>';
                        }
                    },
                ],
                order: [[1, 'asc']],
            });
        break;

        case "BranchesTable":
            tableRender['BranchesTable'] = $('#BranchesTable').DataTable({
                ajax: {
                    url:'branche',
                    dataSrc: 'branches',
                },
                columns: [
                    {
                        className: 'text-center d-none',
                        orderable: false,
                        data: 'id',
                        render: function ( data, type, row ) {
                            return '<input class="form-check-input ms-2 my-1 parentCheckbox" type="checkbox" data-child="'+data+'" value="" id="flexCheckDefault">';
                        },
                    },
                    {
                        className: '',
                        data: 'label'
                    },
                    {
                        className: 'text-center',
                        data: null,
                        render: function ( data, type, row ) {
                            return '<i class="material-icons text-warning edit mb-1" data-toggle="tooltip" title="modifier" data-index="'+row.id+'" data-info="'+row.label.toUpperCase()+'" data-modal="remplissageFormLarge" >&#xf88d;</i> <i class="material-icons delete mb-1 text-danger" data-toggle="tooltip" title="supprimer" style="color: #BE1D2E;" data-index="'+row.id+'" data-info="'+row.label.toUpperCase()+'">&#xE872;</i>';
                        }
                    },
                ],
                order: [[1, 'asc']],
            });
        break;

        case "BankTable":
            tableRender['BankTable'] = $('#BankTable').DataTable({
                ajax: {
                    url:'bank',
                    dataSrc: 'banques',
                },
                columns: [
                    {
                        className: 'text-center d-none',
                        orderable: false,
                        data: 'id',
                        render: function ( data, type, row ) {
                            return '<input class="form-check-input ms-2 my-1 parentCheckbox" type="checkbox" data-child="'+data+'" value="" id="flexCheckDefault">';
                        },
                    },
                    {
                        className: '',
                        data: 'raison_social'
                    },
                    {
                        className: '',
                        data: 'rib'
                    },
                    {
                        className: '',
                        data: 'iban'
                    },
                    {
                        className: 'text-center',
                        data: null,
                        render: function ( data, type, row ) {
                            return '<i class="material-icons text-warning edit mb-1" data-toggle="tooltip" title="modifier" data-index="'+row.id+'" data-info="'+row.raison_social.toUpperCase()+'" data-modal="remplissageFormLarge" >&#xf88d;</i> <i class="material-icons delete mb-1 text-danger" data-toggle="tooltip" title="supprimer" style="color: #BE1D2E;" data-index="'+row.id+'" data-info="'+row.raison_social.toUpperCase()+'">&#xE872;</i>';
                        }
                    },
                ],
                order: [[1, 'asc']],
            });
        break;

        case "PaysTable":
            tableRender['PaysTable'] = $('#PaysTable').DataTable({
                ajax: {
                    url:'country',
                    dataSrc: 'countries',
                },
                columns: [
                    {
                        className: 'text-center d-none',
                        orderable: false,
                        data: 'id',
                        render: function ( data, type, row ) {
                            return '<input class="form-check-input ms-2 my-1 parentCheckbox" type="checkbox" data-child="'+data+'" value="" id="flexCheckDefault">';
                        },
                    },
                    {
                        className: '',
                        data: 'label'
                    },
                    {
                        className: 'text-center',
                        data: 'iso_alpha3'
                    },
                    {
                        className: 'text-center',
                        data: 'iso_num'
                    },
                    {
                        className: 'text-center',
                        data: null,
                        render: function ( data, type, row ) {
                            return '<i class="material-icons text-warning edit mb-1" data-toggle="tooltip" title="modifier" data-index="'+row.id+'" data-info="'+row.label.toUpperCase()+'" data-modal="remplissageFormLarge" >&#xf88d;</i> <i class="material-icons delete mb-1 text-danger" data-toggle="tooltip" title="supprimer" style="color: #BE1D2E;" data-index="'+row.id+'" data-info="'+row.label.toUpperCase()+'">&#xE872;</i>';
                        }
                    },
                ],
                order: [[1, 'asc']],
            });
        break;

        case "CurrencyTable":
            tableRender['CurrencyTable'] = $('#CurrencyTable').DataTable({
                ajax: {
                    url:'currency',
                    dataSrc: 'currencies',
                },
                columns: [
                    {
                        className: 'text-center d-none',
                        orderable: false,
                        data: 'id',
                        render: function ( data, type, row ) {
                            return '<input class="form-check-input ms-2 my-1 enfantCheckbox" type="checkbox" data-child="'+data+'" value="" id="flexCheckDefault">';
                        },
                    },
                    {
                        className: '',
                        data: 'label'
                    },
                    {
                        className: 'text-center',
                        data: 'code'
                    },
                    {
                        className: 'text-center',
                        data: null,
                        render: function ( data, type, row ) {
                            return '<i class="material-icons text-warning edit mb-1" data-toggle="tooltip" title="modifier" data-index="'+row.id+'" data-info="'+row.label.toUpperCase()+'" data-modal="remplissageFormLarge" >&#xf88d;</i> <i class="material-icons delete mb-1 text-danger" data-toggle="tooltip" title="supprimer" style="color: #BE1D2E;" data-index="'+row.id+'" data-info="'+row.label.toUpperCase()+'">&#xE872;</i>';
                        }
                    },
                ],
                order: [[1, 'asc']],
            });
        break;

        case "DemandesTable":
            tableRender['DemandesTable'] = $('#DemandesTable').DataTable({
                ajax: {
                    url:'demande',
                    data: function(d) {
                        d.type_id = $('#filterType').val(); // Envoyer le type sélectionné au contrôleur
                    },
                    dataSrc: 'demande',
                },
                ordering: false,
                // fnInitComplete: function(oSettings, json) {
                //     //execution en fin d'initialisation'<"top"fl>rt<"bottom"ip><"clear">'
                //     // alert( 'DataTables has finished its initialisation.' );
                //     $("#conventionZone").append('.toolbar');
                // },
                columns: [
                    {
                        className: 'oneline text-center align-middle',
                        orderable: false,
                        data: null,
                        render: function ( data, type, row ) {
                            return '<input type="checkbox">';
                        },
                    },
                    {
                        className: 'oneline text-center align-middle',
                        orderable: false,
                        data: null,
                        render: function ( data, type, row ) {
                            return '<span role="button" data-ref="refDemandesTable" title="Afficher plus" class="material-icons dt_control_expand mx-1">add_box</span>';
                        },
                    },
                    {
                        className: 'oneline py-2 text-center align-middle',
                        data: null,
                        // render: function(data, type, row)
                        // {
                        //     return '';
                        // }
                    },
                    {
                       className: 'py-2 text-center oneline align-middle',
                        data: 'types.label',
                        render: function(data, type, row)
                        {
                        //     return row.type_demandes_id.toString().padStart(3, '0');
                            return '<span style="font-size: 1em; text-transform: uppercase;">' + data + '</span>';
                        }
                    },
                    {
                        className: 'py-2 oneline text-center align-middle',
                        data: null,
                        render: function(data, type, row)
                        {
                            numdemande=row.type_demandes_id.toString().padStart(3, '0')+row.direction_id.toString().padStart(2, '0')+row.id
                            return numdemande;
                        }
                    },
                    {
                        className: 'py-2 text-center align-middle',
                        // data: 'objets',
                        data: null,
                        defaultContent: '.................................',
                        render :function ( data, type, row ) {
                            let selectobjet='';
                            if (row.motif == null && row.motif_permi == null)
                            {
                                if(row.type_demandes_id==1)
                                {
                                    row.objetsg.forEach(element => {
                                        selectobjet+='<p class="rounded p-0 m-0">'+element.label+'</p>';
                                    });
                                    return selectobjet;
                                }
                                else
                                {
                                    row.objets.forEach(element => {
                                        selectobjet+='<p class="rounded p-0 m-0">'+element.classes.label+'</p>';
                                    });
                                    return selectobjet;
                                }
                            }
                            if (row.motif == null || row.motif !== null)
                            {
                                return row.motif_permi;
                            }
                        }
                    },
                    {
                        className: 'py-2 text-center align-middle',
                        data: 'statut',
                        render: function(data, type, row)
                        {
                        //     return row.type_demandes_id.toString().padStart(3, '0');
                            if(data==0){
                            return'En Attente'}
                            else if(data==1){
                            return'Veuillez vous rendre à la direction générale pour recuperer votre autorisation de sortie'}
                            else if(data==2){
                            return'Réfusée'}
                        }
                    },
                    {
                    className: 'py-2 text-center oneline align-middle',
                        data: 'created_at',

                        render :function ( data, type, row ) {
                            // options for formatting
                            const options = { day: 'numeric', month: 'numeric', year: 'numeric'};
                            // Options for formatting time
                            const timeOptions = { hour: '2-digit', minute: '2-digit' };

                            // Get the date string in dd/mm/yyyy format
                            let newDateStr = new Date(data).toLocaleDateString('en-GB', options);
                            // Get the time string in hh:mm format
                            let timeStr = new Date(data).toLocaleTimeString('en-GB', timeOptions);

                            // Combine date and time strings
                            return `${newDateStr} à ${timeStr}`;
                        }
                    },
                    {
                        className: 'oneline py-2 text-center lh-0 align-middle',
                        orderable: false,
                        data: null,
                        render: function (data, type, row) {
                            // Vérifier si la valeur de la colonne est null
                            if (row.statut == 0) {
                                return '<i class="material-icons text-secondary edit" data-toggle="tooltip" title="modifier" data-index="' + row.id + '" data-info="' + row.types.label + ' '+numdemande+'" data-modal="modal_'+row.type_demandes_id+'">&#xf88d;</i>'
                                 +
                                    '<i class="material-icons text-primary delete" data-toggle="tooltip" title="supprimer"  data-type="annulation" data-index="' + row.id + '" data-info="' + row.types.label + ' '+numdemande+'" data-modal="modal_'+row.type_demandes_id+'">&#xE872;</i>';
                            } else {
                                // Si la valeur n'est pas null, retournez simplement la valeur
                                return '<i class="text-white">&nbsp</i>';
                            }
                        }
                    }
                ],
                order: [[1, 'asc']],
            });
            $('#filterType').change(function() {
                tableRender['DemandesTable'].ajax.reload();
            });
            tableRender['DemandesTable'].on('order.dt search.dt', function () {
                tableRender['DemandesTable'].column(2, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            })
            .draw();
        break;

        case "ProfilesTable":
            tableRender['ProfilesTable'] = $('#ProfilesTable').DataTable({
                ajax: {
                    url:'profiles',
                    dataSrc: 'profiles',
                },
                ordering: false,
                // fnInitComplete: function(oSettings, json) {
                //     //execution en fin d'initialisation'<"top"fl>rt<"bottom"ip><"clear">'
                //     // alert( 'DataTables has finished its initialisation.' );
                //     $("#conventionZone").append('.toolbar');
                // },
                columns: [
                    {
                        className: 'oneline py-2 text-center',
                        data: null,
                        // render: function(data, type, row)
                        // {
                        //     return '';
                        // }
                    },
                    {
                       className: 'py-2 text-center oneline align-middle',
                        data: 'user.username',
                        render: function(data, type, row)
                        {
                        //     return row.type_demandes_id.toString().padStart(3, '0');
                            return '<span style="font-size: 1em; text-transform: uppercase;">' + data + '</span>';
                        }
                    },
                    {
                        className: 'py-2 oneline text-center align-middle',
                        data: 'directions.label',
                        render: function(data, type, row)
                        {
                            return '<span style="font-size: 1em; text-transform: uppercase;">' + data + '</span>';
                        }
                    },
                    {
                        className: 'py-2 oneline text-center align-middle',
                        data: 'date_embauche',
                        render: function(data, type, row)
                        {
                            return '<span style="font-size: 1em; text-transform: uppercase;">' + data + '</span>';
                        }
                    },
                    {
                        // className: 'py-2 oneline text-center align-middle',
                        // data: 'date_embauche',
                        // render: function(data, type, row)
                        // {
                        //     return '<span style="font-size: 1em; text-transform: uppercase;">' + data + '</span>';
                        // }
                        className: 'oneline py-2 text-center lh-0 align-middle',
                        orderable: false,
                        data: null,
                        render: function (data, type, row) {
                            let actions = '';
                            if(row.user.active==0)
                            {
                                actions += '<i class="material-icons text-secondary activer" data-toggle="tooltip" title="activer" data-index="' + row.id + '" data-info="' + row.user.username + '" data-modal="modal_'+row.id+'">&#xe897;</i>';
                            }
                            else
                            {
                                actions += '<i class="material-icons text-secondary desactiver" data-toggle="tooltip" title="desactiver" data-index="' + row.id + '" data-info="' + row.user.username + '" data-modal="modal_'+row.id+'">&#xe898;</i>';
                            }
                            actions += '<i class="material-icons text-primary delete" data-toggle="tooltip" title="supprimer"  data-type="annulation" data-index="' + row.user.id + '" data-info="' + row.user.username + '" data-modal="modal_'+row.id+'">&#xE872;</i>';
                            return actions;
                        }
                    }
                ],
                order: [[1, 'asc']],
            });
            tableRender['ProfilesTable'].on('order.dt search.dt', function () {
                tableRender['ProfilesTable'].column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            })
            .draw();
        break;

        case "DemandesTraitementTable":
            tableRender['DemandesTraitementTable'] = $('#DemandesTraitementTable').DataTable({
                ajax: {
                    url:'demande',
                    dataSrc: 'demande_a_traiter',
                },
                ordering: false,
                // fnInitComplete: function(oSettings, json) {
                //     //execution en fin d'initialisation'<"top"fl>rt<"bottom"ip><"clear">'
                //     // alert( 'DataTables has finished its initialisation.' );
                //     $("#conventionZone").append('.toolbar');
                // },
                columns: [
                    {
                        className: 'oneline text-center align-middle',
                        orderable: false,
                        data: null,
                        render: function ( data, type, row ) {
                                return '<div class="d-flex align-items-center"><input type="checkbox" class="mx-1 checkname" id="'+ row.id +'"> <span role="button" data-ref="refDemandesTraitementTable" title="Afficher plus" class="material-icons dt_control_expand mx-1">add_box</span></div>';
                        },
                    },
                    {
                        className: 'oneline py-2 text-center align-middle',
                        data: null,
                        // render: function(data, type, row)
                        // {
                        //     return '';
                        // }
                    },
                    {
                        className: 'py-2 text-center oneline align-middle',
                        data: 'demande.types.label',
                        render: function(data, type, row)
                        {
                        //     return row.type_demandes_id.toString().padStart(3, '0');
                            return '<span style="font-size: 1em; text-transform: uppercase;">' + data + '</span>';
                        }
                    },
                    {
                        className: 'oneline py-2 text-center align-middle',
                        data: null,
                        render: function(data, type, row)
                        {
                            if (row.demande !== null && typeof row.demande !== 'undefined') {

                            numdemande = row.demande.type_demandes_id.toString().padStart(3, '0')+row.demande.direction_id.toString().padStart(2, '0')+row.demande_id;

                            return numdemande;

                            } else {
                                return '';
                            }
                        }
                    },
                    {
                        className: 'oneline py-2 text-center align-middle',
                        data: 'demande.user.username',
                        // data: null,
                        render: function(data, type, row)
                        {
                            // Assurez-vous que 'Users' et 'name' sont des propriétés valides dans l'objet 'row'
                            // if (row.user && row.user.name)
                            // {
                                return data
                            // }
                            // else
                            // {
                                // return ''; // Ou une valeur par défaut si le nom d'utilisateur n'est pas disponible
                            // }
                        }
                    },
                    {
                        className: 'align-middle py-2 text-center',
                        // data: 'objets',
                        data: null,
                        defaultContent: '.................................',
                        render :function ( data, type, row ) {
                            let selectobjet='';
                            // if(row.demande.userprofile !== null && row.demande.userprofile.isEmbauche !== 0)
                            // {
                                if ((row.demande !== null && typeof row.demande !== 'undefined') && (row.demande.motif_permi == null)) {

                                    if(row.demande.type_demandes_id==1)
                                    { 
                                        row.demande.objetsg.forEach(element => {
                                            selectobjet+='<p class="rounded p-0 m-0">'+element.label+'</p>';
                                        });
                                        return selectobjet;
                                    }
                                    else
                                    {
                                        row.demande.objets.forEach(element => {
                                            selectobjet+='<p class="rounded p-0 m-0">'+element.classes.label+'</p>';
                                        });
                                        return selectobjet; 
                                    }

                                }
                            // }
                            if (row.demande.motif_permi !== null)
                            {
                                return row.demande.motif_permi
                            }
                        }
                    },
                    {
                        className: 'oneline py-2 text-center align-middle',
                        data: 'statut',
                        render: function(data, type, row)
                        {
                            if(data==0){
                            return'En Attente'}
                            else if(data==1){
                            return'Demande Validée'}
                            else if(data==2){
                            return'Réfusée'}
                        }
                    },
                    {
                    className: 'py-2 text-center oneline align-middle',
                        data: 'demande.created_at',

                        render :function ( data, type, row ) {
                            // options for formatting
                            const options = { day: 'numeric', month: 'numeric', year: 'numeric'};
                            // Options for formatting time
                            const timeOptions = { hour: '2-digit', minute: '2-digit' };

                            // Get the date string in dd/mm/yyyy format
                            let newDateStr = new Date(data).toLocaleDateString('en-GB', options);
                            // Get the time string in hh:mm format
                            let timeStr = new Date(data).toLocaleTimeString('en-GB', timeOptions);

                            // Combine date and time strings
                            return `${newDateStr} à ${timeStr}`;
                        }
                    },
                    {
                        className: 'oneline py-2 text-center lh-0 align-middle',
                        orderable: false,
                        data: null,
                        render: function (data, type, row) {
                            // Vérifier si la valeur de la colonne est null
                            if (row.statut == 0) {
                                return '<i class="material-icons text-secondary analyse" data-modal="modalanalyse" data-index="' + row.id + '" title="Analyser la demande"  data-route="analyse_demande">&#xf106;</i>'
                                +'<i class="material-icons text-secondary edit" data-toggle="tooltip" title="modifier" data-index="' + row.demande_id + '" data-info="' + row.demande.types.label + ' ' + numdemande + '" data-route="../demande" data-modal="modal_'+row.demande.type_demandes_id+'">&#xf88d;</i>'
                            } else {
                                // Si la valeur n'est pas null, retournez simplement la valeur
                                return '<i class="text-white">&nbsp</i>';
                            }
                        }
                    }
                ],
                order: [[1, 'asc']],
            });
            tableRender['DemandesTraitementTable'].on('order.dt search.dt', function () {
                tableRender['DemandesTraitementTable'].column(1, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            })
            .draw();
        break;

        case "ReseauDeSoinTable":
            tableRender['ReseauDeSoinTable'] = $('#ReseauDeSoinTable').DataTable({
                ajax: {
                    url:'reseau',
                    dataSrc: 'reseau',
                },
                // ordering: false,
                // fnInitComplete: function(oSettings, json) {
                //     //execution en fin d'initialisation'<"top"fl>rt<"bottom"ip><"clear">'
                //     // alert( 'DataTables has finished its initialisation.' );
                //     $("#conventionZone").append('.toolbar');
                // },
                columns: [
                    {
                        className: 'text-center align-middle',
                        orderable: false,
                        data: null,
                        render: function ( data, type, row ) {
                            return '<input type="checkbox" class="mx-1 checkname" id="'+ row.id +'">';
                        },
                    },
                    {
                        className: 'align-middle',
                        data: 'commune.label',
                        render: function(data, type, row) {
                            //     return row.type_demandes_id.toString().padStart(3, '0');
                            return '<span style="font-size: 1em; text-transform: uppercase;">' + data + '</span>';
                        },
                    },
                    {
                        className: 'align-middle',
                        data: 'nom_centre',
                        render: function(data, type, row)
                        {
                        //     return row.type_demandes_id.toString().padStart(3, '0');
                            return '<span style="font-size: 1em; text-transform: uppercase;">' + data + '</span>';
                        }
                    },
                    {
                        className: 'online align-middle',
                        // data: 'objets',
                        data: null,
                        defaultContent: '.................................',
                        render: function(data, type, row) {
                            let selectobjet = '';
                            row.type.forEach((element, index) => {
                                // Ajoutez une virgule si ce n'est pas le dernier élément
                                selectobjet += element.label;
                                if (index < row.type.length - 1) {
                                    selectobjet += ', ';
                                }
                            });
                            return selectobjet;
                        }
                    },
                    {
                        className: 'align-middle',
                        data: 'localisation',
                        render: function(data, type, row)
                        {
                        //     return row.type_demandes_id.toString().padStart(3, '0');
                            return '<span style="font-size: 1em; text-transform: uppercase;">' + data + '</span>';
                        }
                    },
                    {
                        className: 'text-center align-middle',
                        data: 'contact',
                        render: function(data, type, row)
                        {
                        //     return row.type_demandes_id.toString().padStart(3, '0');
                            return '<span style="font-size: 1em; text-transform: uppercase;">' + data + '</span>';
                        }
                    },
                    {
                        className: 'text-center align-middle',
                        data: 'user.name',
                        render: function(data, type, row)
                        {
                            if (row.edit_by==null) {
                                return 'modifié par Administrateur'
                            } else {
                        //     return row.type_demandes_id.toString().padStart(3, '0');
                                return '<span style="font-size: 1em; text-transform: uppercase;">'+ 'modifié par ' + data + '</span>';
                            }
                        }
                    },
                    {
                    className: 'text-center align-middle',
                        data: 'created_at',
                        render :function ( data, type, row ) {
                            if (data==null) {
                                return '...'
                            } else {
                                // options for formatting
                                const options = { day: 'numeric', month: 'numeric', year: 'numeric'};
                                // Options for formatting time
                                const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

                                // Get the date string in dd/mm/yyyy format
                                let newDateStr = new Date(data).toLocaleDateString('en-GB', options);
                                // Get the time string in hh:mm format
                                let timeStr = new Date(data).toLocaleTimeString('en-GB', timeOptions);

                                // Combine date and time strings
                                return `${newDateStr} à ${timeStr}`;
                            }
                        }
                    },
                    {
                        className: 'text-center lh-0 align-middle',
                        orderable: false,
                        data: null,
                        render: function (data, type, row) {
                            // Vérifier si la valeur de la colonne est null
                            return '<i class="material-icons text-secondary edit" data-toggle="tooltip" title="modifier" data-index="' + row.id + '" data-info="' + row.nom_centre + '" data-modal="modal_'+'1'+'">&#xf88d;</i>'
                             +
                                '<i class="material-icons text-primary delete" data-toggle="tooltip" title="supprimer"  data-type="annulation" data-index="' + row.id + '" data-info="' + row.nom_centre + '" data-modal="modal_'+row.id+'">&#xE872;</i>';
                        }
                    }
                ],
                order: [[1, 'asc']],
            });
        break;

        case "TraitementDemandesTable0":
            tableRender['TraitementDemandesTable0'] = $('#TraitementDemandesTable0').DataTable({
                ajax: {
                    url:'demande_traiter',
                    dataSrc: 'demande_traiter.0.demande',
                },
                ordering: false,
                // fnInitComplete: function(oSettings, json) {
                //     //execution en fin d'initialisation'<"top"fl>rt<"bottom"ip><"clear">'
                //     // alert( 'DataTables has finished its initialisation.' );
                //     $("#conventionZone").append('.toolbar');
                // },
                columns: [
                    {
                        className: 'oneline text-center align-middle',
                        orderable: false,
                        data: null,
                        render: function ( data, type, row ) {
                                return '<div class="d-flex align-items-center"><input type="checkbox" class="mx-1 checkname" id="'+ row.id +'"> <span role="button" data-ref="refTraitementDemandesTable0" title="Afficher plus" class="material-icons dt_control_expand mx-1">add_box</span></div>';
                        },
                    },
                    {
                        className: 'oneline py-2 text-center align-middle',
                        data: null,
                        // render: function(data, type, row)
                        // {
                        //     return '';
                        // }
                    },
                    {
                        className: 'py-2 text-center oneline align-middle',
                        data: 'types.label',
                        render: function(data, type, row)
                        {
                        //     return row.type_demandes_id.toString().padStart(3, '0');
                            return '<span style="font-size: 1em; text-transform: uppercase;">' + data + '</span>';
                        }
                    },
                    {
                        className: 'oneline py-2 text-center align-middle',
                        data: null,
                        render: function(data, type, row)
                        {
                            if (row !== null && typeof row !== 'undefined') {

                            return row.type_demandes_id.toString().padStart(3, '0')+row.direction_id.toString().padStart(2, '0')+row.id;

                            } else {
                                return '';
                            }
                        }
                    },
                    {
                        className: 'oneline py-2 text-center align-middle',
                        data: 'user.username',
                        // data: null,
                        render: function(data, type, row)
                        {
                            // Assurez-vous que 'Users' et 'name' sont des propriétés valides dans l'objet 'row'
                            // if (row.user && row.user.name)
                            // {
                                return data
                            // }
                            // else
                            // {
                                // return ''; // Ou une valeur par défaut si le nom d'utilisateur n'est pas disponible
                            // }
                        }
                    },
                    {
                        className: 'py-2 align-middle text-center',
                        // data: 'objets',
                        data: null,
                        defaultContent: '.................................',
                        render :function ( data, type, row ) {
                            let selectobjet='';
                            // if(row.demande.userprofile !== null && row.demande.userprofile.isEmbauche !== 0)
                            // {
                                if ((row !== null && typeof row !== 'undefined') && (row.motif_permi == null)) {

                                    if(row.type_demandes_id==1)
                                    {
                                    console.log('msg')
                                        row.objetsg.forEach(element => {
                                            selectobjet+='<p class="rounded p-0 m-0">'+element.label+'</p>';
                                        });
                                        return selectobjet;
                                    }
                                    else
                                    {
                                        row.objets.forEach(element => {
                                            selectobjet+='<p class="rounded p-0 m-0">'+element.classes.label+'</p>';
                                        });
                                        return selectobjet;
                                    }

                                }
                            // }
                            if (row.motif_permi !== null)
                            {
                                return row.motif_permi
                            }

                        }
                    },
                    {
                        className: 'oneline py-2 text-center align-middle',
                        data: 'statut',
                        render: function(data, type, row)
                        {
                            if(data==0){
                            return'En Attente'}
                            else if(data==1){
                            return'Demande Validée'}
                            else if(data==2){
                            return'Réfusée'}
                        }
                    },
                    {
                    className: 'py-2 text-center oneline align-middle',
                        data: 'created_at',

                        render :function ( data, type, row ) {
                            // options for formatting
                            const options = { day: 'numeric', month: 'numeric', year: 'numeric'};
                            // Options for formatting time
                            const timeOptions = { hour: '2-digit', minute: '2-digit' };

                            // Get the date string in dd/mm/yyyy format
                            let newDateStr = new Date(data).toLocaleDateString('en-GB', options);
                            // Get the time string in hh:mm format
                            let timeStr = new Date(data).toLocaleTimeString('en-GB', timeOptions);

                            // Combine date and time strings
                            return `${newDateStr} à ${timeStr}`;
                        }
                    },
                    // {
                    //     className: 'oneline py-2 text-center lh-0 align-middle',
                    //     orderable: false,
                    //     data: null,
                    //     render: function (data, type, row) {
                    //         // Vérifier si la valeur de la colonne est null
                    //         if (row.statut == 0) {
                    //             return '<i class="material-icons text-secondary analyse" data-modal="modalanalyse" data-index="' + row.id + '" title="Analyser la demande"  data-route="analyse_demande">&#xf106;</i>'
                    //         } else {
                    //             // Si la valeur n'est pas null, retournez simplement la valeur
                    //             return '<i class="text-white">&nbsp</i>';
                    //         }
                    //     }
                    // }
                ],
                order: [[1, 'asc']],
            });
            tableRender['TraitementDemandesTable0'].on('order.dt search.dt', function () {
                tableRender['TraitementDemandesTable0'].column(1, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            })
            .draw();
        break;

        case "TraitementDemandesTable1":
            tableRender['TraitementDemandesTable1'] = $('#TraitementDemandesTable1').DataTable({
                ajax: {
                    url:'demande_traiter',
                    dataSrc: 'demande_traiter.1.demande',
                },
                ordering: false,
                // fnInitComplete: function(oSettings, json) {
                //     //execution en fin d'initialisation'<"top"fl>rt<"bottom"ip><"clear">'
                //     // alert( 'DataTables has finished its initialisation.' );
                //     $("#conventionZone").append('.toolbar');
                // },
                columns: [
                    {
                        className: 'oneline text-center align-middle',
                        orderable: false,
                        data: null,
                        render: function ( data, type, row ) {
                                return '<div class="d-flex align-items-center"><input type="checkbox" class="mx-1 checkname" id="'+ row.id +'"> <span role="button" data-ref="refTraitementDemandesTable1" title="Afficher plus" class="material-icons dt_control_expand mx-1">add_box</span></div>';
                        },
                    },
                    {
                        className: 'oneline py-2 text-center align-middle',
                        data: null,
                        // render: function(data, type, row)
                        // {
                        //     return '';
                        // }
                    },
                    {
                        className: 'py-2 text-center oneline align-middle',
                        data: 'types.label',
                        render: function(data, type, row)
                        {
                        //     return row.type_demandes_id.toString().padStart(3, '0');
                            return '<span style="font-size: 1em; text-transform: uppercase;">' + data + '</span>';
                        }
                    },
                    {
                        className: 'oneline py-2 text-center align-middle',
                        data: null,
                        render: function(data, type, row)
                        {
                            if (row !== null && typeof row !== 'undefined') {

                            return row.type_demandes_id.toString().padStart(3, '0')+row.direction_id.toString().padStart(2, '0')+row.id;

                            } else {
                                return '';
                            }
                        }
                    },
                    {
                        className: 'oneline py-2 text-center align-middle',
                        data: 'user.username',
                        // data: null,
                        render: function(data, type, row)
                        {
                            // Assurez-vous que 'Users' et 'name' sont des propriétés valides dans l'objet 'row'
                            // if (row.user && row.user.name)
                            // {
                                return data
                            // }
                            // else
                            // {
                                // return ''; // Ou une valeur par défaut si le nom d'utilisateur n'est pas disponible
                            // }
                        }
                    },
                    {
                        className: 'py-2 align-middle text-center',
                        // data: 'objets',
                        data: null,
                        defaultContent: '.................................',
                        render :function ( data, type, row ) {
                            let selectobjet='';
                            // if(row.demande.userprofile !== null && row.demande.userprofile.isEmbauche !== 0)
                            // {
                                if ((row !== null && typeof row !== 'undefined') && (row.motif_permi == null)) {

                                    if(row.type_demandes_id==1)
                                    {
                                    console.log('msg')
                                        row.objetsg.forEach(element => {
                                            selectobjet+='<p class="rounded p-0 m-0">'+element.label+'</p>';
                                        });
                                        return selectobjet;
                                    }
                                    else
                                    {
                                        row.objets.forEach(element => {
                                            selectobjet+='<p class="rounded p-0 m-0">'+element.classes.label+'</p>';
                                        });
                                        return selectobjet;
                                    }

                                }
                            // }
                            if (row.motif_permi !== null)
                            {
                                return row.motif_permi
                            }

                        }
                    },
                    {
                        className: 'oneline py-2 text-center align-middle',
                        data: 'statut',
                        render: function(data, type, row)
                        {
                            if(data==0){
                            return'En Attente'}
                            else if(data==1){
                            return'Demande Validée'}
                            else if(data==2){
                            return'Réfusée'}
                        }
                    },
                    {
                    className: 'py-2 text-center oneline align-middle',
                        data: 'created_at',

                        render :function ( data, type, row ) {
                            // options for formatting
                            const options = { day: 'numeric', month: 'numeric', year: 'numeric'};
                            // Options for formatting time
                            const timeOptions = { hour: '2-digit', minute: '2-digit' };

                            // Get the date string in dd/mm/yyyy format
                            let newDateStr = new Date(data).toLocaleDateString('en-GB', options);
                            // Get the time string in hh:mm format
                            let timeStr = new Date(data).toLocaleTimeString('en-GB', timeOptions);

                            // Combine date and time strings
                            return `${newDateStr} à ${timeStr}`;
                        }
                    },
                    // {
                    //     className: 'oneline py-2 text-center lh-0 align-middle',
                    //     orderable: false,
                    //     data: null,
                    //     render: function (data, type, row) {
                    //         // Vérifier si la valeur de la colonne est null
                    //         if (row.statut == 0) {
                    //             return '<i class="material-icons text-secondary analyse" data-modal="modalanalyse" data-index="' + row.id + '" title="Analyser la demande"  data-route="analyse_demande">&#xf106;</i>'
                    //         } else {
                    //             // Si la valeur n'est pas null, retournez simplement la valeur
                    //             return '<i class="text-white">&nbsp</i>';
                    //         }
                    //     }
                    // }
                ],
                order: [[1, 'asc']],
            });
            tableRender['TraitementDemandesTable1'].on('order.dt search.dt', function () {
                tableRender['TraitementDemandesTable1'].column(1, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            })
            .draw();
        break;

        case "TraitementDemandesTable2":
            tableRender['TraitementDemandesTable2'] = $('#TraitementDemandesTable2').DataTable({
                ajax: {
                    url:'demande_traiter',
                    dataSrc: 'demande_traiter.2.demande',
                },
                ordering: false,
                // fnInitComplete: function(oSettings, json) {
                //     //execution en fin d'initialisation'<"top"fl>rt<"bottom"ip><"clear">'
                //     // alert( 'DataTables has finished its initialisation.' );
                //     $("#conventionZone").append('.toolbar');
                // },
                columns: [
                    {
                        className: 'oneline text-center align-middle',
                        orderable: false,
                        data: null,
                        render: function ( data, type, row ) {
                                return '<div class="d-flex align-items-center"><input type="checkbox" class="mx-1 checkname" id="'+ row.id +'"> <span role="button" data-ref="refTraitementDemandesTable2" title="Afficher plus" class="material-icons dt_control_expand mx-1">add_box</span></div>';
                        },
                    },
                    {
                        className: 'oneline py-2 text-center align-middle',
                        data: null,
                        // render: function(data, type, row)
                        // {
                        //     return '';
                        // }
                    },
                    {
                        className: 'py-2 text-center oneline align-middle',
                        data: 'types.label',
                        render: function(data, type, row)
                        {
                        //     return row.type_demandes_id.toString().padStart(3, '0');
                            return '<span style="font-size: 1em; text-transform: uppercase;">' + data + '</span>';
                        }
                    },
                    {
                        className: 'oneline py-2 text-center align-middle',
                        data: null,
                        render: function(data, type, row)
                        {
                            if (row !== null && typeof row !== 'undefined') {

                            return row.type_demandes_id.toString().padStart(3, '0')+row.direction_id.toString().padStart(2, '0')+row.id;

                            } else {
                                return '';
                            }
                        }
                    },
                    {
                        className: 'oneline py-2 text-center align-middle',
                        data: 'user.username',
                        // data: null,
                        render: function(data, type, row)
                        {
                            // Assurez-vous que 'Users' et 'name' sont des propriétés valides dans l'objet 'row'
                            // if (row.user && row.user.name)
                            // {
                                return data
                            // }
                            // else
                            // {
                                // return ''; // Ou une valeur par défaut si le nom d'utilisateur n'est pas disponible
                            // }
                        }
                    },
                    {
                        className: 'py-2 align-middle text-center',
                        // data: 'objets',
                        data: null,
                        defaultContent: '.................................',
                        render :function ( data, type, row ) {
                            let selectobjet='';
                            // if(row.demande.userprofile !== null && row.demande.userprofile.isEmbauche !== 0)
                            // {
                                if ((row !== null && typeof row !== 'undefined') && (row.motif_permi == null)) {

                                    if(row.type_demandes_id==1)
                                    {
                                    console.log('msg')
                                        row.objetsg.forEach(element => {
                                            selectobjet+='<p class="rounded p-0 m-0">'+element.label+'</p>';
                                        });
                                        return selectobjet;
                                    }
                                    else
                                    {
                                        row.objets.forEach(element => {
                                            selectobjet+='<p class="rounded p-0 m-0">'+element.classes.label+'</p>';
                                        });
                                        return selectobjet;
                                    }

                                }
                            // }
                            if (row.motif_permi !== null)
                            {
                                return row.motif_permi
                            }

                        }
                    },
                    {
                        className: 'oneline py-2 text-center align-middle',
                        data: 'statut',
                        render: function(data, type, row)
                        {
                            if(data==0){
                            return'En Attente'}
                            else if(data==1){
                            return'Demande Validée'}
                            else if(data==2){
                            return'Réfusée'}
                        }
                    },
                    {
                    className: 'py-2 text-center oneline align-middle',
                        data: 'created_at',

                        render :function ( data, type, row ) {
                            // options for formatting
                            const options = { day: 'numeric', month: 'numeric', year: 'numeric'};
                            // Options for formatting time
                            const timeOptions = { hour: '2-digit', minute: '2-digit' };

                            // Get the date string in dd/mm/yyyy format
                            let newDateStr = new Date(data).toLocaleDateString('en-GB', options);
                            // Get the time string in hh:mm format
                            let timeStr = new Date(data).toLocaleTimeString('en-GB', timeOptions);

                            // Combine date and time strings
                            return `${newDateStr} à ${timeStr}`;
                        }
                    },
                    // {
                    //     className: 'oneline py-2 text-center lh-0 align-middle',
                    //     orderable: false,
                    //     data: null,
                    //     render: function (data, type, row) {
                    //         // Vérifier si la valeur de la colonne est null
                    //         if (row.statut == 0) {
                    //             return '<i class="material-icons text-secondary analyse" data-modal="modalanalyse" data-index="' + row.id + '" title="Analyser la demande"  data-route="analyse_demande">&#xf106;</i>'
                    //         } else {
                    //             // Si la valeur n'est pas null, retournez simplement la valeur
                    //             return '<i class="text-white">&nbsp</i>';
                    //         }
                    //     }
                    // }
                ],
                order: [[1, 'asc']],
            });
            tableRender['TraitementDemandesTable2'].on('order.dt search.dt', function () {
                tableRender['TraitementDemandesTable2'].column(1, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            })
            .draw();
        break;

        case "TableauCotationBatiment":
            tableRender['TableauCotationBatiment'] = $('#TableauCotationBatiment').DataTable({
                ajax: {
                    url:'ListeCotations',
                    dataSrc: 'CotationBatiments',
                },
                ordering: false,
                // fnInitComplete: function(oSettings, json) {
                //     //execution en fin d'initialisation'<"top"fl>rt<"bottom"ip><"clear">'
                //     // alert( 'DataTables has finished its initialisation.' );
                //     $("#conventionZone").append('.toolbar');
                // },
                sDom: '<"toolbar">frtip<"bottom">',
                columns: [
                    {
                        className: 'text-center align-middle',
                        orderable: false,
                        data: null,
                        // render: function ( data, type, row ) {
                        //     if (row.cotation_pvts_id==null && row.statut===0) {
                        //         //
                        //         return '<input class="enfantCheckBox" type="checkbox" name="batiment" data-id="'+data+'" value="" id="flexCheckDefault">';
                        //     }else{
                        //         return '';
                        //     }
                        // },
                    },
                    {
                        className: 'py-2 text-center align-middle',
                        orderable: false,
                        data: 'type'         ,
                    },
                    {
                        className: 'py-2 text-center oneline align-middle',
                        data: 'denomination_sociale',
                    },
                    // {
                    //     className: 'py-2 text-center td_ellipsis ',
                    //     data: 'sigle',
                    // },
                    {
                        className: 'py-2 text-center align-middle',
                        data: 'date_effet',
                        render :function ( data, type, row ) {
                            // options for formatting
                            const options = { day: 'numeric', month: 'numeric', year: 'numeric'};
                            // Get the date string in dd/mm/yyyy format
                            let newDateStr = new Date(data).toLocaleDateString('en-GB', options);
                            return newDateStr;
                        }
                    },
                    {
                        className: 'py-2 text-center align-middle',
                        data: 'date_echeance',

                        render :function ( data, type, row ) {
                            // options for formatting
                            const options = { day: 'numeric', month: 'numeric', year: 'numeric'};
                            // Get the date string in dd/mm/yyyy format
                            let newDateStr = new Date(data).toLocaleDateString('en-GB', options);
                            return newDateStr;
                        }
                    },
                    {
                        className: 'py-2 oneline text-center align-middle',
                        data: 'activite',
                        // render :function ( data, type, row ) {
                        //     // options for formatting
                        //     const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
                        //     // Get the date string in dd/mm/yyyy format
                        //     let newDateStr = new Date(data).toLocaleDateString('en-GB', options);
                        //     return newDateStr;
                        // }
                    },
                    {
                        className: 'py-2 oneline text-center align-middle',
                        data: null,
                        render:function(data, type, row){
                            if(row.gps_google_maps==null){
                                return '<span class="text-danger">Elément Requis</span>';
                            }else{
                                return '<a href="https://plus.codes/6CQR'+row.gps_google_maps+'" target="_blank">'+row.gps_google_maps+'</a>';
                            }
                        }

                    },
                    {
                        className: 'py-2 oneline text-center align-middle',
                        data: null,
                        render:function(data, type, row){
                            if(row.numero_appartement ==null){
                                return '<span class="text-danger">Elément Requis</span>';
                            }else{
                                return row.numero_appartement;
                            }
                        }
                    },
                    {
                        className: 'py-2 oneline text-center align-middle',
                        data: null,
                        render :function ( data, type, row ) {

                        //    // options for formatting
                        //     const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
                        //     // Get the date string in dd/mm/yyyy format
                        //     let newDateStr = new Date(data).toLocaleDateString('en-GB', options);
                        //     return newDateStr;
                        if(row.numero_batiment==null){
                            return '<span class="text-danger">Elément Requis</span>';
                        }
                        else{
                            return row.numero_batiment;
                        }
                        }
                    },
                    // {
                    //     className: 'py-2 oneline text-center ',
                    //     data: 'region',
                        // render :function ( data, type, row ) {
                        //     // options for formatting
                        //     const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
                        //     // Get the date string in dd/mm/yyyy format
                        //     let newDateStr = new Date(data).toLocaleDateString('en-GB', options);
                        //     return newDateStr;
                        // }
                    // },
                    // {
                    //     className: 'py-2 text-center ',
                    //      data: 'ville',
                    // },
                    // {
                    //     className: 'py-2 text-center oneline ',
                    //     data: 'commune',
                    //     // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                    // },
                    // {
                    //     className: 'py-2 text-center ',
                    //     data: 'quartier'
                    //     // render :$.fn.dataTable.render.number( ' ', '.', 2,'','%')
                    // },
                    // {
                    //     className: 'py-2 oneline text-center ',
                    //     data: 'numero_rue',
                    //     // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                    // },
                    {
                        className: 'py-2 oneline text-center align-middle',
                        data: 'valeur_assuree',
                        // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                        render: function(data, type, row) {
                            if (type === 'display') {
                                return parseFloat(data).toLocaleString('fr-FR', {
                                    style: 'currency',
                                    currency: 'XOF',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                });
                            }
                            return data;
                        },
                    },
                    {
                        className: 'py-2 oneline text-center align-middle',
                        data: 'prime',
                        // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                        render: function(data, type, row) {
                            if (type === 'display') {
                                return parseFloat(data).toLocaleString('fr-FR', {
                                    style: 'currency',
                                    currency: 'XOF',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                });
                            }
                            return data;
                        },
                    },
                    {
                        className: 'py-2 text-center oneline align-middle',
                        data: 'statut',
                        // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                        render:function(data, type, row){
                            if(data=='-1'){
                                return'<span class="rounded bg-warning p-1 m-1 text-white">En attente de validation</span>';
                            }
                            if(data=='0'){
                                return'<span class="rounded bg-success p-1 m-1 text-white">Validé</span>';
                            }
                            if(data=='1'){
                                return'<span class="rounded bg-warning p-1 m-1 text-white">En accord préalable</span>';
                            }
                            if(data=='2'){
                                return'<span class="rounded bg-danger p-1 m-1 text-white">Non Couvert</span>';
                            }
                        }
                    },
                    {
                        className: 'py-2 text-center oneline lh-0',
                        orderable: false,
                        data: null,
                        render: function (data, type, row) {
                            // Vérifier si la valeur de la colonne est null
                            if (row.statut == -1) {
                                return '<i class="material-icons text-success confirmation" title="valider" data-type="validation" data-index="' + row.id + '" data-info="' + row.denomination_sociale + '"> check_circle</i>'
                                +'<i class="material-icons text-warning edit" data-toggle="tooltip" title="modifier" data-index="' + row.id + '" data-info="' + row./*  */denomination_sociale + '" data-modal="remplissageFormLarge">&#xf88d;</i>' +
                                    '<i class="material-icons text-danger delete" data-toggle="tooltip" title="supprimer"  data-type="annulation" data-index="' + row.id + '" data-info="' + row.denomination_sociale + '">&#xE872;</i>';
                            } else {
                                // Si la valeur n'est pas null, retournez simplement la valeur
                                return '<i class="text-white">&nbsp</i>';
                            }
                        }
                    }
                ],
                order: [[1, 'asc']],
            });
            tableRender['TableauCotationBatiment'].on('order.dt search.dt', function () {
                tableRender['TableauCotationBatiment'].column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            })
            .draw();
        break;

        case "TableauCotationVehicule":
            tableRender['TableauCotationVehicule'] = $('#TableauCotationVehicule').DataTable({
                responsive:true,
                ajax: {
                    url:'ListeCotationsvehi',
                    dataSrc: 'CotationVehicules',
                },
                ordering: false,
                fnInitComplete: function(oSettings, json) {
                    //execution en fin d'initialisation'<"top"fl>rt<"bottom"ip><"clear">'
                    // alert( 'DataTables has finished its initialisation.' );
                    $('.toolbar').html($("#conventionZone"));
                    $(".conventionliste").select2({
                        placeholder: "Selectionner une convention",
                        allowClear: true
                    });
                },
                sDom: '<"toolbar">frtip<"bottom">',
                columns: [
                    {
                        className: 'text-center align-middle',
                        orderable: false,
                        data: null,
                        // render: function ( data, type, row ) {
                        //     if (row.cotation_pvts_id==null && row.statut===0) {
                        //         return '<input class="enfantCheckBox" type="checkbox" name="vehicule" data-id="'+data+'" value="" id="flexCheckDefault">';
                        //     }else{
                        //         return '';
                        //     }
                        // },
                    },
                    {
                        className: 'py-2 td_ellipsis text-center align-middle',
                        orderable: false,
                        data: 'type'
                    },
                    {
                        className: 'py-2 oneline text-center align-middle',
                        data: 'denomination_sociale',

                    },
                    // {
                    //     className: 'py-2 td_ellipsis text-center ',
                    //     data: 'sigle',
                    // },
                    {
                        className: 'py-2 oneline text-center align-middle',
                        data: 'date_effet',
                        render :function ( data, type, row ) {
                            // options for formatting
                            const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
                            // Get the date string in dd/mm/yyyy format
                            let newDateStr = new Date(data).toLocaleDateString('en-GB', options);
                            return newDateStr;
                        }

                    },
                    {
                        className: 'py-2 oneline text-center align-middle',
                        data: 'date_echeance',
                        render :function ( data, type, row ) {
                            // options for formatting
                            const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
                            // Get the date string in dd/mm/yyyy format
                            let newDateStr = new Date(data).toLocaleDateString('en-GB', options);
                            return newDateStr;
                        }
                    },
                    {
                        className: 'py-2 oneline text-center align-middle',
                        data: 'activite',

                    },
                    {
                        className: 'py-2 oneline text-center align-middle',
                        data: null,
                        render:function(dat, type, row){
                            if(row.numero_immatriculation==null){
                                return '<span class="text-danger">Elément Requis</span>';
                            }else{
                                return row.numero_immatriculation;
                            }
                        }
                    },
                    {
                        className: 'py-2 oneline text-center align-middle',
                        data: 'date_1ere_mise_en_circulation',
                        render :function ( data, type, row ) {
                            // options for formatting
                            const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
                            // Get the date string in dd/mm/yyyy format
                            let newDateStr = new Date(data).toLocaleDateString('en-GB', options);
                            return newDateStr;
                        }
                    },
                    {
                        className: 'py-2 oneline text-center align-middle',
                        data: null,
                        render:function(data, type, row){
                            if(row.marque==null){
                                return '<span class="text-danger">Elément Requis</span>';
                            }else{
                                return row.marque;
                            }
                        }
                    },
                    {
                        className: 'py-2 oneline text-center align-middle',
                        data: null,
                        render:function(data, type, row){
                            if(row.modele==null){
                                return '<span class="text-danger">Elément Requis</span>';
                            }else{
                                return row.modele;
                            }
                        }
                    },
                    {
                        className: 'py-2 text-center oneline align-middle',
                        data: null,
                        // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                        render:function(data, type, row){
                            if(row.numero_chassis==null){
                                return '<span class="text-danger">Elément Requis</span>';
                            }else{
                                return row.numero_chassis;
                            }
                        }
                    },
                    {
                        className: 'py-2 oneline text-center align-middle',
                        data: null,
                        // render :$.fn.dataTable.render.number( ' ', '.', 2,'','%')
                        render: function(data, type, row) {
                            if (row.puissance_administrative != null) {
                                return row.puissance_administrative + ' CV'; // Ajoute "Cv" après la valeur
                            }
                           else if(row.puissance_administrative==null){
                                return '<span class="text-danger">Elément Requis</span>';
                            }
                        }
                    },
                    {
                        className: 'py-2 oneline text-center align-middle',
                        data: null,
                        render:function(data, type, row){
                            if(row.energie==null){
                                return '<span class="text-danger">Elément Requis</span>';
                            }else{
                                return row.energie;
                            }
                        }
                    },
                    {
                        className: 'py-2 oneline text-end align-middle',
                        data: 'valeur_assuree',
                        // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                        render: function(data, type, row) {
                            if (type === 'display') {
                                return parseFloat(data).toLocaleString('fr-FR', {
                                    style: 'currency',
                                    currency: 'XOF',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                });
                            }
                            return data;
                        },
                        // Ajoutez la classe 'text-right' uniquement aux cellules de la colonne
                        createdCell: function (td, cellData, rowData, row, col) {
                            if (col ===11) { // Remplacez NUMERO_DE_LA_COLONNE par le numéro de la colonne que vous ciblez
                                $(td).addClass('text-right');
                            }
                        }
                    },
                    {
                        className: 'py-2 oneline text-end align-middle',
                        data: 'prime',
                        // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                        render: function(data, type, row) {
                            if (type === 'display') {
                                return parseFloat(data).toLocaleString('fr-FR', {
                                    style: 'currency',
                                    currency: 'XOF',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                });
                            }
                            return data;
                        },
                    },
                    {
                        className: 'py-2 oneline text-center align-middle',
                        data: 'statut',
                        // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                        render:function(data, type, row){
                            if(data=='-1'){
                                return'<span class="rounded bg-warning p-1 m-1 text-white">En attente de validation</span>';
                            }
                            if(data=='0'){
                                return'<span class="rounded bg-success p-1 m-1 text-white">Validée</span>';
                            }
                            if(data=='1'){
                                return'<span class="rounded bg-warning p-1 m-1 text-white">En accord préalable</span>';
                            }
                            if(data=='2'){
                                return'<span class="rounded bg-danger p-1 m-1 text-white">Non Couvert</span>';
                            }
                        }
                    },

                    {
                        className: 'py-2 text-center oneline lh-0',
                        orderable: false,
                        data: null,
                        render: function (data, type, row) {
                            // Vérifier si la valeur de la colonne statut est en attente
                            if (row.statut == -1) {
                                return '<i class="material-icons text-success fs-5 confirmation" title="valider" data-type="validation" data-index="' + row.id + '" data-info="' + row.denomination_sociale + '"> check_circle</i>'
                                +'<i class="material-icons text-warning fs-5 edit" data-toggle="tooltip" title="modifier" data-index="' + row.id + '" data-info="' + row.denomination_sociale + '" data-modal="remplissageFormLarge">&#xf88d;</i>'
                                +'<i class="material-icons text-danger fs-5 delete" data-toggle="tooltip" title="supprimer"  data-type="annulation" data-index="' + row.id + '" data-info="' + row.denomination_sociale + '">cancel</i>';
                            } else {
                                // Si la valeur n'est pas null, retournez simplement la valeur
                                return '<i class="text-white">&nbsp</i>';
                            }
                        }
                    }

                ],
                order: [[1, 'asc']],
            });
            tableRender['TableauCotationVehicule'].on('order.dt search.dt', function () {
                tableRender['TableauCotationVehicule'].column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            })
            .draw();
        break;

        case "TableauCotationEnAttenteGestion":
            tableRender['TableauCotationEnAttenteGestion'] = $('#TableauCotationEnAttenteGestion').DataTable({
                responsive:true,
                ajax: {
                    url:'cotations',
                    dataSrc: function(response) {
                        $("#valAttente").html(response.countEnAttente)
                        return response.mergedCotationsEnAttente;
                    }
                },
                ordering: false,
                columns: [
                    {
                        className: 'oneline text-center',
                        orderable: false,
                        data: null,
                        // render: function ( data, type, row ) {
                        //     if (row.cotation_pvts_id==null && row.statut===0) {
                        //         return '<input class="enfantCheckBox" type="checkbox" name="vehicule" data-id="'+data+'" value="" id="flexCheckDefault">';
                        //     }else{
                        //         return '';
                        //     }
                        // },
                    },
                    {
                        className: 'py-2 oneline text-center ',
                        data: 'denomination_sociale',
                    },
                    {
                        className: 'py-2 oneline text-end',
                        data: 'valeur_assuree',
                        // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                        render: function(data, type, row) {
                            if (type === 'display') {
                                return parseFloat(data).toLocaleString('fr-FR', {
                                    style: 'currency',
                                    currency: 'XOF',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                });
                            }
                            return data;
                        },
                        // Ajoutez la classe 'text-right' uniquement aux cellules de la colonne
                        createdCell: function (td, cellData, rowData, row, col) {
                            if (col ===11) { // Remplacez NUMERO_DE_LA_COLONNE par le numéro de la colonne que vous ciblez
                                $(td).addClass('text-right');
                            }
                        }
                    },
                    {
                        className: 'py-2 oneline text-end',
                        data: 'prime',
                        // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                        render: function(data, type, row) {
                            if (type === 'display') {
                                return parseFloat(data).toLocaleString('fr-FR', {
                                    style: 'currency',
                                    currency: 'XOF',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                });
                            }
                            return data;
                        },
                    },
                    {
                        className: 'py-2 oneline text-center',
                        data: 'statut',
                        // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                        render:function(data, type, row){
                            if(data=='-1'){
                                return'<span class="rounded bg-warning p-1 m-1 text-white">En attente de validation</span>';
                            }
                            if(data=='0'){
                                return'<span class="rounded bg-success p-1 m-1 text-white">Validée</span>';
                            }
                            if(data=='1'){
                                return'<span class="rounded bg-warning p-1 m-1 text-white">En accord préalable</span>';
                            }
                            if(data=='2'){
                                return'<span class="rounded bg-danger p-1 m-1 text-white">Non Couvert</span>';
                            }
                        }
                    },
                    {
                        className: 'py-2 text-center oneline',
                        orderable: false,
                        data: null,
                        render: function (data, type, row) {
                            // Vérifier si la valeur de la colonne statut est en attente
                            if (row.statut == -1) {
                                return ' <i class="material-icons text-success confirmation mx-2" title="valider" data-type="validation" data-index="'+row.id+'" data-info="'+row.denomination_sociale+'" data-genre="'+row.table+'">check_circle</i>' +' <i class="material-icons text-danger infirmation mx-2" data-toggle="tooltip" data-type="anulation" title="annuler" data-index="'+row.id+'"   data-info="'+row.denomination_sociale+'" data-genre="'+row.table+'">cancel</i>'
                            } else {
                                // Si la valeur n'est pas null, retournez simplement la valeur
                                return 'Impossible d\'apporter des modifications';
                            }
                        }
                    }
                ],
                order: [[1, 'asc']],
            });
            tableRender['TableauCotationEnAttenteGestion'].on('order.dt search.dt', function () {
                tableRender['TableauCotationEnAttenteGestion'].column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML= i + 1;

                });

            })
            .draw();
        break;

        case "TableauCotationValideGestion":
            tableRender['TableauCotationValideGestion'] = $('#TableauCotationValideGestion').DataTable({
                responsive:true,
                ajax: {
                    url:'cotations',
                    dataSrc: function(response) {
                        $("#valValide").html(response.countValide)
                        return response.mergedCotationsValide;
                    }
                },
                ordering: false,
                columns: [
                    {
                        className: 'oneline text-center',
                        orderable: false,
                        data: null,
                        // render: function ( data, type, row ) {
                        //     if (row.cotation_pvts_id==null && row.statut===0) {
                        //         return '<input class="enfantCheckBox" type="checkbox" name="vehicule" data-id="'+data+'" value="" id="flexCheckDefault">';
                        //     }else{
                        //         return '';
                        //     }
                        // },
                    },
                    {
                        className: 'py-2 oneline text-center ',
                        data: 'denomination_sociale',
                    },
                    {
                        className: 'py-2 oneline text-end',
                        data: 'valeur_assuree',
                        // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                        render: function(data, type, row) {
                            if (type === 'display') {
                                return parseFloat(data).toLocaleString('fr-FR', {
                                    style: 'currency',
                                    currency: 'XOF',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                });
                            }
                            return data;
                        },
                        // Ajoutez la classe 'text-right' uniquement aux cellules de la colonne
                        createdCell: function (td, cellData, rowData, row, col) {
                            if (col ===11) { // Remplacez NUMERO_DE_LA_COLONNE par le numéro de la colonne que vous ciblez
                                $(td).addClass('text-right');
                            }
                        }
                    },
                    {
                        className: 'py-2 oneline text-end',
                        data: 'prime',
                        // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                        render: function(data, type, row) {
                            if (type === 'display') {
                                return parseFloat(data).toLocaleString('fr-FR', {
                                    style: 'currency',
                                    currency: 'XOF',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                });
                            }
                            return data;
                        },
                    },
                    {
                        className: 'py-2 oneline text-center',
                        data: 'statut',
                        // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                        render:function(data, type, row){
                            if(data=='-1'){
                                return'<span class="rounded bg-warning p-1 m-1 text-white">En attente de validation</span>';
                            }
                            if(data=='0'){
                                return'<span class="rounded bg-success p-1 m-1 text-white">Validée</span>';
                            }
                            if(data=='1'){
                                return'<span class="rounded bg-warning p-1 m-1 text-white">En accord préalable</span>';
                            }
                            if(data=='2'){
                                return'<span class="rounded bg-danger p-1 m-1 text-white">Non Couvert</span>';
                            }
                        }
                    },
                ],
                order: [[1, 'asc']],
            });
            tableRender['TableauCotationValideGestion'].on('order.dt search.dt', function () {
                tableRender['TableauCotationValideGestion'].column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            })
            .draw();
        break;

        case "TableauCotationAnnuleGestion":
            tableRender['TableauCotationAnnuleGestion'] = $('#TableauCotationAnnuleGestion').DataTable({
                responsive:true,
                ajax: {
                    url:'cotations',
                    dataSrc: function(response) {
                        $("#valAnnule").html(response.countAnnule)
                        return response.mergedCotationsAnnule;
                    }
                },
                ordering: false,
                columns: [
                    {
                        className: 'oneline text-center',
                        orderable: false,
                        data: null,
                        // render: function ( data, type, row ) {
                        //     if (row.cotation_pvts_id==null && row.statut===0) {
                        //         return '<input class="enfantCheckBox" type="checkbox" name="vehicule" data-id="'+data+'" value="" id="flexCheckDefault">';
                        //     }else{
                        //         return '';
                        //     }
                        // },
                    },
                    {
                        className: 'py-2 oneline text-center ',
                        data: 'denomination_sociale',
                    },
                    {
                        className: 'py-2 oneline text-end',
                        data: 'valeur_assuree',
                        // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                        render: function(data, type, row) {
                            if (type === 'display') {
                                return parseFloat(data).toLocaleString('fr-FR', {
                                    style: 'currency',
                                    currency: 'XOF',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                });
                            }
                            return data;
                        },
                        // Ajoutez la classe 'text-right' uniquement aux cellules de la colonne
                        createdCell: function (td, cellData, rowData, row, col) {
                            if (col ===11) { // Remplacez NUMERO_DE_LA_COLONNE par le numéro de la colonne que vous ciblez
                                $(td).addClass('text-right');
                            }
                        }
                    },
                    {
                        className: 'py-2 oneline text-end',
                        data: 'prime',
                        // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                        render: function(data, type, row) {
                            if (type === 'display') {
                                return parseFloat(data).toLocaleString('fr-FR', {
                                    style: 'currency',
                                    currency: 'XOF',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                });
                            }
                            return data;
                        },
                    },
                    {
                        className: 'py-2 oneline text-center',
                        data: 'statut',
                        // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                        render:function(data, type, row){
                            if(data=='-1'){
                                return'<span class="rounded bg-warning p-1 m-1 text-white">En attente de validation</span>';
                            }
                            if(data=='0'){
                                return'<span class="rounded bg-success p-1 m-1 text-white">Validée</span>';
                            }
                            if(data=='1'){
                                return'<span class="rounded bg-warning p-1 m-1 text-white">En accord préalable</span>';
                            }
                            if(data=='2'){
                                return'<span class="rounded bg-danger p-1 m-1 text-white">Non Couvert</span>';
                            }
                            if(data=='3'){
                                return'<span class="rounded bg-danger p-1 m-1 text-white">Annulée</span>';
                            }
                        }
                    },
                ],
                order: [[1, 'asc']],
            });
            tableRender['TableauCotationAnnuleGestion'].on('order.dt search.dt', function () {
                tableRender['TableauCotationAnnuleGestion'].column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            })
            .draw();
        break;

        case "TableauCotationAccordGestion":
            tableRender['TableauCotationAccordGestion'] = $('#TableauCotationAccordGestion').DataTable({
                responsive:true,
                ajax: {
                    url:'cotations',
                    dataSrc: function(response) {
                        $("#valAccord").html(response.countAccord)
                        return response.mergedCotationsAccord;
                    }
                },

                ordering: false,
                columns: [
                    {
                        className: 'oneline text-center',
                        orderable: false,
                        data: null,
                        // render: function ( data, type, row ) {
                        //     if (row.cotation_pvts_id==null && row.statut===0) {
                        //         return '<input class="enfantCheckBox" type="checkbox" name="vehicule" data-id="'+data+'" value="" id="flexCheckDefault">';
                        //     }else{
                        //         return '';
                        //     }
                        // },
                    },
                    {
                        className: 'py-2 oneline text-center ',
                        data: 'denomination_sociale',
                    },
                    {
                        className: 'py-2 oneline text-end',
                        data: 'valeur_assuree',
                        // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                        render: function(data, type, row) {
                            if (type === 'display') {
                                return parseFloat(data).toLocaleString('fr-FR', {
                                    style: 'currency',
                                    currency: 'XOF',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                });
                            }
                            return data;
                        },
                        // Ajoutez la classe 'text-right' uniquement aux cellules de la colonne
                        createdCell: function (td, cellData, rowData, row, col) {
                            if (col ===11) { // Remplacez NUMERO_DE_LA_COLONNE par le numéro de la colonne que vous ciblez
                                $(td).addClass('text-right');
                            }
                        }
                    },
                    {
                        className: 'py-2 oneline text-end',
                        data: 'prime',
                        // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                        render: function(data, type, row) {
                            if (type === 'display') {
                                return parseFloat(data).toLocaleString('fr-FR', {
                                    style: 'currency',
                                    currency: 'XOF',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                });
                            }
                            return data;
                        },
                    },
                    {
                        className: 'py-2 oneline text-center',
                        data: 'statut',
                        // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                        render:function(data, type, row){
                            if(data=='-1'){
                                return'<span class="rounded bg-warning p-1 m-1 text-white">En attente de validation</span>';
                            }
                            if(data=='0'){
                                return'<span class="rounded bg-success p-1 m-1 text-white">Validée</span>';
                            }
                            if(data=='1'){
                                return'<span class="rounded bg-warning p-1 m-1 text-white">En accord préalable</span>';
                            }
                            if(data=='2'){
                                return'<span class="rounded bg-danger p-1 m-1 text-white">Non Couvert</span>';
                            }
                            if(data=='3'){
                                return'<span class="rounded bg-danger p-1 m-1 text-white">Annulée</span>';
                            }
                        }
                    },
                ],
                order: [[1, 'asc']],
            });
            tableRender['TableauCotationAccordGestion'].on('order.dt search.dt', function () {
                tableRender['TableauCotationAccordGestion'].column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            })
            .draw();
        break;

        case "CompaniesTable":
            tableRender['CompaniesTable'] = $('#CompaniesTable').DataTable(
                {
                ajax: {
                    url:'company',
                    dataSrc: 'companies',
                },
                columns: [
                    {
                        className: 'text-center',
                        orderable: false,
                        // data: 'id',
                        // render: function ( data, type, row ) {
                        //     return '<input class="form-check-input ms-2 my-1 parentCheckbox" type="checkbox" data-child="'+data+'" value="" id="flexCheckDefault">';
                        // },
                        data: null,
                        defaultContent: '<i class="material-icons mb-1 dt_control_expand" data-toggle="tooltip" title="derouler" data-ref="refCompaniesTable" style="color: #c3cf14;">&#xe146;</i>',
                    },
                    {
                        className: '',
                        data: 'raison_social'
                    },
                    {
                        className: '',
                        data: 'types.label',
                        render: function ( data, type, row ) {
                            return data.toUpperCase();
                        },
                    },
                    // {
                    //     className: 'd-flex flex-wrap',
                    //     data: 'pays',
                    //     render :function ( data, type, row ) {
                    //         let companyTerritories='';
                    //         data.forEach(element => {
                    //             companyTerritories+='<span class="rounded bg-warning p-1 m-1">'+element.label+'</span>';
                    //         });
                    //         return companyTerritories;
                    //     }
                    // },
                    {
                        className: 'text-center',
                        data: null,
                        render: function ( data, type, row ) {
                            return '<i class="material-icons text-warning edit mb-1" data-toggle="tooltip" title="modifier" data-index="'+row.id+'" data-info="'+row.raison_social.toUpperCase()+'" data-modal="EditCompanyModal" >&#xf88d;</i> <i class="material-icons delete mb-1 text-danger" data-toggle="tooltip" title="supprimer" style="color: #BE1D2E;" data-index="'+row.id+'" data-info="'+row.raison_social.toUpperCase()+'">&#xE872;</i>';
                        }
                    },

                ],
                order: [[1, 'asc']],
            }
            );
        break;

        case "DashboardElementTable":
            tableRender['DashboardElementTable'] = $('#DashboardElementTable').DataTable(
                {
                    searching:false,
                    lengthChange:false,
                }
                // responsive:true,
                // ajax: {
                //     url:'ListeCotationsvehi',
                //     dataSrc: 'CotationVehicules',
                // },
                // ordering: false,
                // columns: [
                //     {
                //         className: 'text-center',
                //         orderable: false,
                //         data: null,
                //         // render: function ( data, type, row ) {
                //         //     if (row.cotation_pvts_id==null && row.statut===0) {
                //         //         return '<input class="enfantCheckBox" type="checkbox" name="vehicule" data-id="'+data+'" value="" id="flexCheckDefault">';
                //         //     }else{
                //         //         return '';
                //         //     }
                //         // },
                //     },
                //     {
                //         className: 'py-2 td_ellipsis text-center ',
                //         orderable: false,
                //         data: null,
                //     },
                //     {
                //         className: 'py-2 oneline text-center ',
                //         data: null,

                //     },
                //     // {
                //     //     className: 'py-2 td_ellipsis text-center ',
                //     //     data: 'sigle',
                //     // },
                //     {
                //         className: 'py-2 oneline text-center',
                //         data: 'date_effet',
                //         render :function ( data, type, row ) {
                //             // options for formatting
                //             const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
                //             // Get the date string in dd/mm/yyyy format
                //             let newDateStr = new Date(data).toLocaleDateString('en-GB', options);
                //             return newDateStr;
                //         }

                //     },
                //     {
                //         className: 'py-2 oneline text-center',
                //         data: 'date_echeance',
                //         render :function ( data, type, row ) {
                //             // options for formatting
                //             const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
                //             // Get the date string in dd/mm/yyyy format
                //             let newDateStr = new Date(data).toLocaleDateString('en-GB', options);
                //             return newDateStr;
                //         }
                //     },
                //     {
                //         className: 'py-2 oneline text-center ',
                //         data: 'activite',

                //     },
                //     {
                //         className: 'py-2 oneline text-center',
                //         data: null,
                //         render:function(dat, type, row){
                //             if(row.numero_immatriculation==null){
                //                 return '<span class="text-danger">Elément Requis</span>';
                //             }else{
                //                 return row.numero_immatriculation;
                //             }
                //         }
                //     },
                //     {
                //         className: 'py-2 oneline text-center',
                //         data: 'date_1ere_mise_en_circulation',
                //         render :function ( data, type, row ) {
                //             // options for formatting
                //             const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
                //             // Get the date string in dd/mm/yyyy format
                //             let newDateStr = new Date(data).toLocaleDateString('en-GB', options);
                //             return newDateStr;
                //         }
                //     },
                //     {
                //         className: 'py-2 oneline text-center ',
                //         data: null,
                //         render:function(data, type, row){
                //             if(row.marque==null){
                //                 return '<span class="text-danger">Elément Requis</span>';
                //             }else{
                //                 return row.marque;
                //             }
                //         }
                //     },
                //     {
                //         className: 'py-2 oneline text-center ',
                //         data: null,
                //         render:function(data, type, row){
                //             if(row.modele==null){
                //                 return '<span class="text-danger">Elément Requis</span>';
                //             }else{
                //                 return row.modele;
                //             }
                //         }
                //     },
                //     {
                //         className: 'py-2 text-center oneline',
                //         data: null,
                //         // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                //         render:function(data, type, row){
                //             if(row.numero_chassis==null){
                //                 return '<span class="text-danger">Elément Requis</span>';
                //             }else{
                //                 return row.numero_chassis;
                //             }
                //         }
                //     },
                //     {
                //         className: 'py-2 oneline text-center',
                //         data: null,
                //         // render :$.fn.dataTable.render.number( ' ', '.', 2,'','%')
                //         render: function(data, type, row) {
                //             if (row.puissance_administrative != null) {
                //                 return row.puissance_administrative + ' CV'; // Ajoute "Cv" après la valeur
                //             }
                //            else if(row.puissance_administrative==null){
                //                 return '<span class="text-danger">Elément Requis</span>';
                //             }
                //         }
                //     },
                //     {
                //         className: 'py-2 oneline text-center ',
                //         data: null,
                //         render:function(data, type, row){
                //             if(row.energie==null){
                //                 return '<span class="text-danger">Elément Requis</span>';
                //             }else{
                //                 return row.energie;
                //             }
                //         }
                //     },
                //     {
                //         className: 'py-2 oneline text-end',
                //         data: 'valeur_assuree',
                //         // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                //         render: function(data, type, row) {
                //             if (type === 'display') {
                //                 return parseFloat(data).toLocaleString('fr-FR', {
                //                     style: 'currency',
                //                     currency: 'XOF',
                //                     minimumFractionDigits: 0,
                //                     maximumFractionDigits: 0
                //                 });
                //             }
                //             return data;
                //         },
                //         // Ajoutez la classe 'text-right' uniquement aux cellules de la colonne
                //         createdCell: function (td, cellData, rowData, row, col) {
                //             if (col ===11) { // Remplacez NUMERO_DE_LA_COLONNE par le numéro de la colonne que vous ciblez
                //                 $(td).addClass('text-right');
                //             }
                //         }
                //     },
                //     {
                //         className: 'py-2 oneline text-end',
                //         data: 'prime',
                //         // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                //         render: function(data, type, row) {
                //             if (type === 'display') {
                //                 return parseFloat(data).toLocaleString('fr-FR', {
                //                     style: 'currency',
                //                     currency: 'XOF',
                //                     minimumFractionDigits: 0,
                //                     maximumFractionDigits: 0
                //                 });
                //             }
                //             return data;
                //         },
                //     },
                //     {
                //         className: 'py-2 oneline text-center',
                //         data: 'statut',
                //         // render :$.fn.dataTable.render.number( ' ', '.', 2 )
                //         render:function(data, type, row){
                //             if(data=='-1'){
                //                 return'<span class="rounded bg-warning p-1 m-1 text-white">En attente de validation</span>';
                //             }
                //             if(data=='0'){
                //                 return'<span class="rounded bg-success p-1 m-1 text-white">Validée</span>';
                //             }
                //             if(data=='1'){
                //                 return'<span class="rounded bg-warning p-1 m-1 text-white">En accord préalable</span>';
                //             }
                //             if(data=='2'){
                //                 return'<span class="rounded bg-danger p-1 m-1 text-white">Non Couvert</span>';
                //             }
                //         }
                //     },

                //     {
                //         className: 'py-2 text-center oneline',
                //         orderable: false,
                //         data: null,
                //         render: function (data, type, row) {
                //             // Vérifier si la valeur de la colonne statut est en attente
                //             if (row.statut == -1) {
                //                 return '<i class="material-icons text-success confirmation" title="valider" data-type="validation" data-index="' + row.id + '" data-info="' + row.denomination_sociale + '"> check_circle</i>'
                //                 +'<i class="material-icons text-warning edit" data-toggle="tooltip" title="modifier" data-index="' + row.id + '" data-info="' + row.denomination_sociale + '" data-modal="remplissageFormLarge">&#xf88d;</i>'
                //                 +'<i class="material-icons text-danger delete" data-toggle="tooltip" title="supprimer"  data-type="annulation" data-index="' + row.id + '" data-info="' + row.denomination_sociale + '">cancel</i>';
                //             } else {
                //                 // Si la valeur n'est pas null, retournez simplement la valeur
                //                 return '<i class="text-white">Voir plus</i>';
                //             }
                //         }
                //     }

                // ],
                // order: [[1, 'asc']],
            );
        break;

        case "TableauCircuitValidation0":
            tableRender['TableauCircuitValidation0'] = $('#TableauCircuitValidation0').DataTable({
                ajax: {
                    url:'parametres',
                    dataSrc: 'parametres.0.circuit',
                },
                ordering: false,
                // fnInitComplete: function(oSettings, json) {
                //     //execution en fin d'initialisation'<"top"fl>rt<"bottom"ip><"clear">'
                //     // alert( 'DataTables has finished its initialisation.' );
                //     $("#conventionZone").append('.toolbar');
                // },
                columns: [
                    {
                        className: 'text-center align-middle',
                        orderable: false,
                        data: null,
                        render: function ( data, type, row ) {
                                return '<span role="button" data-ref="refTableauCircuitValidation0" title="Afficher plus" class="material-icons dt_control_expand mx-1">add_box</span></div>';
                        },
                    },
                    {
                        className: 'py-2 text-center align-middle',
                        data: null,
                        // render: function(data, type, row)
                        // {
                        //     return '';
                        // }
                    },
                    {
                        className: 'py-2 text-center oneline align-middle',
                        data: null,
                        render: function ( data, type, row ) {
                            return '<div class="d-flex align-items-center"><input type="checkbox" class="mx-1">';
                        // render: function(data, type, row)
                        // {
                        // //     return row.type_demandes_id.toString().padStart(3, '0');
                        //     return '<span style="font-size: 1em; text-transform: uppercase;">' + data + '</span>';
                        }
                    },
                    {
                        className: 'w-60 py-2 text-center oneline align-middle',
                        data: null,
                        render: function(data, type, row)
                        {
                        //     return row.type_demandes_id.toString().padStart(3, '0');
                            return '<span style="font-size: 1em; text-transform: uppercase;">' + row.direction.label + '</span>';
                        }
                    },
                    {
                        className: 'oneline py-2 text-center lh-0 align-middle',
                        orderable: false,
                        data: null,
                        render: function (data, type, row) {
                            // Vérifier si la valeur de la colonne est null
                            if (row.label != 0) {
                                return '<i class="material-icons text-secondary edit" data-toggle="tooltip" title="modifier" data-index="' + row.id + '" data-info="' + row.direction.label + '" data-modal="modal_circuit_organe" data-route="circuit_organe">&#xf88d;</i>'
                                +
                                '<i class="material-icons text-primary delete" data-toggle="tooltip" title="supprimer"  data-type="annulation" data-index="' + row.id + '" data-info="' + row.direction.label + '" data-route="circuit_organe">&#xE872;</i>';
                            } else {
                                // Si la valeur n'est pas null, retournez simplement la valeur
                                return '<i class="text-white">&nbsp</i>';
                            }
                        }
                    }
                ],
                order: [[1, 'asc']],
            });
            tableRender['TableauCircuitValidation0'].on('order.dt search.dt', function () {
                tableRender['TableauCircuitValidation0'].column(1, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            })
            .draw();
        break;

        case "TableauCircuitValidation1":
            tableRender['TableauCircuitValidation1'] = $('#TableauCircuitValidation1').DataTable({
                ajax: {
                    url:'parametres',
                    dataSrc: 'parametres.1.circuit',
                },
                ordering: false,
                // fnInitComplete: function(oSettings, json) {
                //     //execution en fin d'initialisation'<"top"fl>rt<"bottom"ip><"clear">'
                //     // alert( 'DataTables has finished its initialisation.' );
                //     $("#conventionZone").append('.toolbar');
                // },
                columns: [
                    {
                        className: 'text-center align-middle',
                        orderable: false,
                        data: null,
                        render: function ( data, type, row ) {
                                return '<span role="button" data-ref="refTableauCircuitValidation1" title="Afficher plus" class="material-icons dt_control_expand mx-1">add_box</span></div>';
                        },
                    },
                    {
                        className: 'py-2 text-center align-middle',
                        data: null,
                        // render: function(data, type, row)
                        // {
                        //     return '';
                        // }
                    },
                    {
                        className: 'py-2 text-center oneline align-middle',
                        data: null,
                        render: function ( data, type, row ) {
                            return '<div class="d-flex align-items-center"><input type="checkbox" class="mx-1">';
                        // render: function(data, type, row)
                        // {
                        // //     return row.type_demandes_id.toString().padStart(3, '0');
                        //     return '<span style="font-size: 1em; text-transform: uppercase;">' + data + '</span>';
                        }
                    },
                    {
                        className: 'w-60 py-2 text-center oneline align-middle',
                        data: null,
                        render: function(data, type, row)
                        {
                        //     return row.type_demandes_id.toString().padStart(3, '0');
                            return '<span style="font-size: 1em; text-transform: uppercase;">' + row.direction.label + '</span>';
                        }
                    },
                    {
                        className: 'oneline py-2 text-center lh-0 align-middle',
                        orderable: false,
                        data: null,
                        render: function (data, type, row) {
                            // Vérifier si la valeur de la colonne est null
                            if (row.label != 0) {
                                return '<i class="material-icons text-secondary edit" data-toggle="tooltip" title="modifier" data-index="' + row.id + '" data-info="' + row.direction.label + '" data-modal="modal_circuit_organe" data-route="circuit_organe">&#xf88d;</i>'
                                +
                                '<i class="material-icons text-primary delete" data-toggle="tooltip" title="supprimer"  data-type="annulation" data-index="' + row.id + '" data-info="' + row.direction.label + '" data-route="circuit_organe">&#xE872;</i>';
                            } else {
                                // Si la valeur n'est pas null, retournez simplement la valeur
                                return '<i class="text-white">&nbsp</i>';
                            }
                        }
                    }
                ],
                order: [[1, 'asc']],
            });
            tableRender['TableauCircuitValidation1'].on('order.dt search.dt', function () {
                tableRender['TableauCircuitValidation1'].column(1, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            })
            .draw();
        break;

        case "TableauCircuitValidation2":
            tableRender['TableauCircuitValidation2'] = $('#TableauCircuitValidation2').DataTable({
                ajax: {
                    url:'parametres',
                    dataSrc: 'parametres.2.circuit',
                },
                ordering: false,
                // fnInitComplete: function(oSettings, json) {
                //     //execution en fin d'initialisation'<"top"fl>rt<"bottom"ip><"clear">'
                //     // alert( 'DataTables has finished its initialisation.' );
                //     $("#conventionZone").append('.toolbar');
                // },
                columns: [
                    {
                        className: 'text-center align-middle',
                        orderable: false,
                        data: null,
                        render: function ( data, type, row ) {
                                return '<span role="button" data-ref="refTableauCircuitValidation2" title="Afficher plus" class="material-icons dt_control_expand mx-1">add_box</span></div>';
                        },
                    },
                    {
                        className: 'py-2 text-center align-middle',
                        data: null,
                        // render: function(data, type, row)
                        // {
                        //     return '';
                        // }
                    },
                    {
                        className: 'py-2 text-center oneline align-middle',
                        data: null,
                        render: function ( data, type, row ) {
                            return '<div class="d-flex align-items-center"><input type="checkbox" class="mx-1">';
                        // render: function(data, type, row)
                        // {
                        // //     return row.type_demandes_id.toString().padStart(3, '0');
                        //     return '<span style="font-size: 1em; text-transform: uppercase;">' + data + '</span>';
                        }
                    },
                    {
                        className: 'w-60 py-2 text-center oneline align-middle',
                        data: null,
                        render: function(data, type, row)
                        {
                        //     return row.type_demandes_id.toString().padStart(3, '0');
                            return '<span style="font-size: 1em; text-transform: uppercase;">' + row.direction.label + '</span>';
                        }
                    },
                    {
                        className: 'oneline py-2 text-center lh-0 align-middle',
                        orderable: false,
                        data: null,
                        render: function (data, type, row) {
                            // Vérifier si la valeur de la colonne est null
                            if (row.label != 0) {
                                return '<i class="material-icons text-secondary edit" data-toggle="tooltip" title="modifier" data-index="' + row.id + '" data-info="' + row.direction.label + '" data-modal="modal_circuit_organe" data-route="circuit_organe">&#xf88d;</i>'
                                +
                                '<i class="material-icons text-primary delete" data-toggle="tooltip" title="supprimer"  data-type="annulation" data-index="' + row.id + '" data-info="' + row.direction.label + '" data-route="circuit_organe">&#xE872;</i>';
                            } else {
                                // Si la valeur n'est pas null, retournez simplement la valeur
                                return '<i class="text-white">&nbsp</i>';
                            }
                        }
                    }
                ],
                order: [[1, 'asc']],
            });
            tableRender['TableauCircuitValidation2'].on('order.dt search.dt', function () {
                tableRender['TableauCircuitValidation2'].column(1, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            })
            .draw();
        break;

        case "TableauOrganeValidateur0":
            tableRender['TableauOrganeValidateur0'] = $('#TableauOrganeValidateur0').DataTable({
                ajax: {
                    url:'organes',
                    dataSrc: 'organes.0.organes',
                },
                ordering: false,
                // fnInitComplete: function(oSettings, json) {
                //     //execution en fin d'initialisation'<"top"fl>rt<"bottom"ip><"clear">'
                //     // alert( 'DataTables has finished its initialisation.' );
                //     $("#conventionZone").append('.toolbar');
                // },

                columns: [
                    {
                        className: 'text-center align-middle',
                        orderable: false,
                        data: null,
                        render: function ( data, type, row ) {
                                return '<span role="button" data-ref="refTableauOrganeValidateur0" title="Afficher plus" class="material-icons dt_control_expand mx-1">add_box</span></div>';
                        },
                    },
                    {
                        className: 'py-2 text-center align-middle',
                        data: null,
                        // render: function(data, type, row)
                        // {
                        //     return '';
                        // }
                    },
                    {
                        className: 'py-2 text-center oneline align-middle',
                        data: null,
                        render: function ( data, type, row ) {
                            return '<div class="d-flex align-items-center"><input type="checkbox" class="mx-1">';
                        // render: function(data, type, row)
                        // {
                        // //     return row.type_demandes_id.toString().padStart(3, '0');
                        //     return '<span style="font-size: 1em; text-transform: uppercase;">' + data + '</span>';
                        }
                    },
                    {
                        className: 'w-60 py-2 text-center oneline align-middle',
                        data: 'type_demande.label',
                        render: function(data, type, row)
                        {
                        //     return row.type_demandes_id.toString().padStart(3, '0');
                            return '<span style="font-size: 1em; text-transform: uppercase;">' + data + '</span>';
                        }
                    },
                    {
                        className: 'oneline py-2 text-center lh-0 align-middle',
                        orderable: false,
                        data: null,
                        render: function (data, type, row) {
                            // Vérifier si la valeur de la colonne est null
                            if (row.label != 0) {
                                return '<i class="material-icons text-secondary edit" data-toggle="tooltip" title="modifier" data-index="' + row.id + '" data-info="' + row.type_demande.label + '" data-modal="modal_organevalid" data-route="organe_validateur">&#xf88d;</i>'
                                +
                                '<i class="material-icons text-primary delete" data-toggle="tooltip" title="supprimer"  data-type="annulation" data-index="' + row.id + '" data-info="' + row.type_demande.label + '" data-route="organe_validateur">&#xE872;</i>';
                            } else {
                                // Si la valeur n'est pas null, retournez simplement la valeur
                                return '<i class="text-white">&nbsp</i>';
                            }
                        }
                    }
                ],
                order: [[1, 'asc']],
            });
            tableRender['TableauOrganeValidateur0'].on('order.dt search.dt', function () {
                tableRender['TableauOrganeValidateur0'].column(1, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            })
            .draw();
        break;

        case "TableauOrganeValidateur1":
            tableRender['TableauOrganeValidateur1'] = $('#TableauOrganeValidateur1').DataTable({
                ajax: {
                    url:'organes',
                    dataSrc: 'organes.1.organes',
                },
                ordering: false,
                // fnInitComplete: function(oSettings, json) {
                //     //execution en fin d'initialisation'<"top"fl>rt<"bottom"ip><"clear">'
                //     // alert( 'DataTables has finished its initialisation.' );
                //     $("#conventionZone").append('.toolbar');
                // },

                columns: [
                    {
                        className: 'text-center align-middle',
                        orderable: false,
                        data: null,
                        render: function ( data, type, row ) {
                                return '<span role="button" data-ref="refTableauOrganeValidateur1" title="Afficher plus" class="material-icons dt_control_expand mx-1">add_box</span></div>';
                        },
                    },
                    {
                        className: 'py-2 text-center align-middle',
                        data: null,
                        // render: function(data, type, row)
                        // {
                        //     return '';
                        // }
                    },
                    {
                        className: 'py-2 text-center oneline align-middle',
                        data: null,
                        render: function ( data, type, row ) {
                            return '<div class="d-flex align-items-center"><input type="checkbox" class="mx-1">';
                        // render: function(data, type, row)
                        // {
                        // //     return row.type_demandes_id.toString().padStart(3, '0');
                        //     return '<span style="font-size: 1em; text-transform: uppercase;">' + data + '</span>';
                        }
                    },
                    {
                        className: 'w-60 py-2 text-center oneline align-middle',
                        data: 'type_demande.label',
                        render: function(data, type, row)
                        {
                        //     return row.type_demandes_id.toString().padStart(3, '0');
                            return '<span style="font-size: 1em; text-transform: uppercase;">' + data + '</span>';
                        }
                    },
                    {
                        className: 'oneline py-2 text-center lh-0 align-middle',
                        orderable: false,
                        data: null,
                        render: function (data, type, row) {
                            // Vérifier si la valeur de la colonne est null
                            if (row.label != 0) {
                                return '<i class="material-icons text-secondary edit" data-toggle="tooltip" title="modifier" data-index="' + row.id + '" data-info="' + row.type_demande.label + '" data-modal="modal_organevalid" data-route="organe_validateur">&#xf88d;</i>'
                                +
                                '<i class="material-icons text-primary delete" data-toggle="tooltip" title="supprimer"  data-type="annulation" data-index="' + row.id + '" data-info="' + row.type_demande.label + '" data-route="organe_validateur">&#xE872;</i>';
                            } else {
                                // Si la valeur n'est pas null, retournez simplement la valeur
                                return '<i class="text-white">&nbsp</i>';
                            }
                        }
                    }
                ],
                order: [[1, 'asc']],
            });
            tableRender['TableauOrganeValidateur1'].on('order.dt search.dt', function () {
                tableRender['TableauOrganeValidateur1'].column(1, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            })
            .draw();
        break;

        case "TableauOrganeValidateur2":
            tableRender['TableauOrganeValidateur2'] = $('#TableauOrganeValidateur2').DataTable({
                ajax: {
                    url:'organes',
                    dataSrc: 'organes.2.organes',
                },
                ordering: false,
                // fnInitComplete: function(oSettings, json) {
                //     //execution en fin d'initialisation'<"top"fl>rt<"bottom"ip><"clear">'
                //     // alert( 'DataTables has finished its initialisation.' );
                //     $("#conventionZone").append('.toolbar');
                // },

                columns: [
                    {
                        className: 'text-center align-middle',
                        orderable: false,
                        data: null,
                        render: function ( data, type, row ) {
                                return '<span role="button" data-ref="refTableauOrganeValidateur2" title="Afficher plus" class="material-icons dt_control_expand mx-1">add_box</span></div>';
                        },
                    },
                    {
                        className: 'py-2 text-center align-middle',
                        data: null,
                        // render: function(data, type, row)
                        // {
                        //     return '';
                        // }
                    },
                    {
                        className: 'py-2 text-center oneline align-middle',
                        data: null,
                        render: function ( data, type, row ) {
                            return '<div class="d-flex align-items-center"><input type="checkbox" class="mx-1">';
                        // render: function(data, type, row)
                        // {
                        // //     return row.type_demandes_id.toString().padStart(3, '0');
                        //     return '<span style="font-size: 1em; text-transform: uppercase;">' + data + '</span>';
                        }
                    },
                    {
                        className: 'w-60 py-2 text-center oneline align-middle',
                        data: 'type_demande.label',
                        render: function(data, type, row)
                        {
                        //     return row.type_demandes_id.toString().padStart(3, '0');
                            return '<span style="font-size: 1em; text-transform: uppercase;">' + data + '</span>';
                        }
                    },
                    {
                        className: 'oneline py-2 text-center lh-0 align-middle',
                        orderable: false,
                        data: null,
                        render: function (data, type, row) {
                            // Vérifier si la valeur de la colonne est null
                            if (row.label != 0) {
                                return '<i class="material-icons text-secondary edit" data-toggle="tooltip" title="modifier" data-index="' + row.id + '" data-info="' + row.type_demande.label + '" data-modal="modal_organevalid" data-route="organe_validateur">&#xf88d;</i>'
                                +
                                '<i class="material-icons text-primary delete" data-toggle="tooltip" title="supprimer"  data-type="annulation" data-index="' + row.id + '" data-info="' + row.type_demande.label + '" data-route="organe_validateur">&#xE872;</i>';
                            } else {
                                // Si la valeur n'est pas null, retournez simplement la valeur
                                return '<i class="text-white">&nbsp</i>';
                            }
                        }
                    }
                ],
                order: [[1, 'asc']],
            });
            tableRender['TableauOrganeValidateur2'].on('order.dt search.dt', function () {
                tableRender['TableauOrganeValidateur2'].column(1, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            })
            .draw();
        break;

        case "ObjetdemandeTable":
            tableRender['ObjetdemandeTable'] = $('#ObjetdemandeTable').DataTable({
                ajax: {
                    url:'objet_demande',
                    dataSrc: 'objet_demande',
                },
                ordering: false,
                // fnInitComplete: function(oSettings, json) {
                //     //execution en fin d'initialisation'<"top"fl>rt<"bottom"ip><"clear">'
                //     // alert( 'DataTables has finished its initialisation.' );
                //     $("#conventionZone").append('.toolbar');
                // },

                columns: [
                    {
                        className: 'w-5 text-center align-middle',
                        orderable: false,
                        data: null,
                        render: function ( data, type, row ) {
                                return '<span role="button" data-ref="refObjetdemandeTable" title="Afficher plus" class="material-icons dt_control_expand mx-1">add_box</span></div>';
                        },
                    },
                    {
                        className: 'w-90 py-2 text-center align-middle',
                        data: 'label',
                        render: function(data, type, row)
                        {
                        //     return row.type_demandes_id.toString().padStart(3, '0');
                            return '<span style="font-size: 1em; text-transform: uppercase;">' + data + '</span>';
                        }
                    },
                    {
                        className: 'w-5 py-2 text-center lh-0 align-middle',
                        orderable: false,
                        data: null,
                        render: function (data, type, row) {
                            // Vérifier si la valeur de la colonne est null
                            if (row.label != 0) {
                                return '<i class="material-icons text-secondary edit" data-toggle="tooltip" title="modifier" data-index="' + row.id + '" data-info="' + row.label + '" data-modal="modaldemobjetg" data-route="objet_demande_g">&#xf88d;</i>'
                                +
                                '<i class="material-icons text-primary delete" data-toggle="tooltip" title="supprimer"  data-type="annulation" data-index="' + row.id + '" data-info="' + row.label + '" data-route="objet_demande_g">&#xE872;</i>';
                            } else {
                                // Si la valeur n'est pas null, retournez simplement la valeur
                                return '<i class="text-white">&nbsp</i>';
                            }
                        }
                    }
                ],
                order: [[1, 'asc']],
            });
        break;

        default: tableRender[toApplytable] = $('#'+toApplytable).DataTable({});
    }
}

$('#absenceForm').submit(function(event) {
    event.preventDefault();
    // Ajoutez ici le code pour traiter le formulaire, par exemple, envoyer une requête AJAX.

    // Affichez un message de succès
    $('#message').text('Demande envoyée avec succès.').show();
});

// mise au format monetaire des input de type monnaie
$('body').on('focus','.zonenumeric', function () {
    if ($(this).val() !== "") {
        $(this).val(destroyCurrency($(this).val(), $(this).data("type")));
    }
})

$('body').on('focusout','.zonenumeric', function () {
    if ($(this).val() !== "") {
        monnaieType=$('.typemonnaie[data-id="'+$(this).data('id')+'"]').val();
        // console.log(monnaieType);
        $(this).val(checkPercentage($(this).val(),monnaieType,$(this).data('type')));
    }
})

$('body').on('change','.typemonnaie', function () {
    $('.zonenumeric[data-id="'+$(this).data('id')+'"]').trigger("focusout");
})

// Écouter les changements dans le premier select
$('body').on('change','#select1', function() {
    var select2div = document.getElementById("select2div");
    var selectedValue = $(this).val();
    // console.log(selectedValue);

    if(select2div)
    {
        if(selectedValue != 0)
        {
            select2div.style.display = "block";
        }
        else
        {
            select2div.style.display = "none";
        }

    }

    // Charger dynamiquement le contenu du deuxième select en fonction de la valeur sélectionnée dans le premier
    $.ajax({
        url: "liste_dem_sg" + "/" + selectedValue + "/" ,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data);
            // Remplir le deuxième select avec les données de la source Ajax
            $('#select2').empty(); // Effacer les anciennes options
            $('#select2').append('<optgroup label=""></optgroup>')
            $.each(data.labels, function(index, item) {
                console.log(item.objets.length);
                let taille = item.objets.length;
                var selection = '';
                if(taille > 0){
                    $.each(item.objets, function(index, objet) {
                        console.log(item.objets);
                        // $('#select2').append('<optgroup label="' + item.label + '"></optgroup>');
                        selection += '<option value="' + objet.id + '">' + objet.label + '</option>';
                    });
                    $('#select2').append('<optgroup label="' + item.label + '">' + selection + '</optgroup>');
                    selection = '' ;
                    // $('#select2').append('<option value="' + item.model_name + '">' + item.model_name + '</option>');
                }
                else
                {
                    // $.each(data.labels, function(index, objet) {
                        console.log(item);
                        // $('#select2').append('<optgroup label="' + item.label + '"></optgroup>');
                        $('#select2').append('<option value="' + item.id + '">' + item.label + '</option>');
                    // });
                }
            });
            // Mettre à jour Select2 pour le deuxième select
            $('#select2').select2({
                maximumSelectionLength: 5
              });
        },
        error: function() {
            // Gérer les erreurs de chargement du deuxième select ici
        }
    });
});

$('body').on('change','#selects', function() {
    // Récupérer les éléments du formulaire
    var jourConger = document.getElementById("jour_conger");
    var nombreDeJour = $('#selects').find(':selected').data('jour');

    // Vérifier si data-jour est égal à 15
    if (nombreDeJour === 15) {
        // Afficher la partie du formulaire
        jourConger.style.display = "block";
    } else {
        // Masquer la partie du formulaire
        jourConger.style.display = "none";
    }
});

$('#typeFilter').on('change', function() {
    var selectedTypeId = $(this).val();  // Récupérer la valeur sélectionnée dans le filtre

    // Recharger les données de DataTables avec le nouveau type_id
    tableRender['DemandesTable'].ajax.url('demande?type_id=' + selectedTypeId).load();
});
    // Lorsque la sélection de permission change
// Lorsque la sélection de permission change


// Lorsque la sélection de permission change

// $('body').on('change','#question', function() {
//     var selectedValue = $(this).val();
//     var suiteForm = $('#suiteForm');
//     var message = $('#message');
//     var suiteFormnom = $('#suiteFormnom');


//     if (selectedValue === 'oui') {
//         suiteForm.show();
//         suiteFormnom.hide();
//         message.hide();
//     } else {
//         suiteForm.hide();
//         suiteFormnom.show()
//         message.hide();
//     }
// });

// Add event listener for opening and closing details
$('body').on('click', 'i.dt_control_expand,span.dt_control_expand', function () {

    if ($(this).hasClass('closed')) {
        $(this).removeClass('closed').addClass('opened')
    } else {
        $(this).removeClass('opened').addClass('closed')
    }
    var tr = $(this).closest('tr');
    let id=$('#'+$(this).data('ref')).html();
    var row = tableRender[id].row(tr);
    // console.log(tr,id,row);
    // return;
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        } else {
            // Open this row
            row.child(format(row.data(),id)).show();
            tr.addClass('shown');
        }
});

// fonctions des cases à cocher---------------------------
$('body').on('change','input.parentCheckbox', function () {
    let enfantCheckbock;
    //on click sur le plus le plus proche s'il est fermer
    // if ($(this).prev().hasClass('closed')) {
        //     $(this).prev().trigger('click');
        // }
        if($(this).is(':checked')) {
        // console.log($(this));
        enfantCheckbock=$('.enfantCheckBox[name="'+$(this).data('child')+'"]')
        //Do stuff
        for (let index = 0; index < enfantCheckbock.length; index++) {
            // console.log(enfantCheckbock[index]);
            enfantCheckbock[index].checked = true;
        }
    }
    else{
        //Do stuff
        enfantCheckbock=$('.enfantCheckBox[name="'+$(this).data('child')+'"]')
        for (let index = 0; index < enfantCheckbock.length; index++) {
            // console.log(enfantCheckbock[index]);
            enfantCheckbock[index].checked = false;
        }
    }
})

$('body').on('click', ".material-icons", function(){
    if ($(this).attr("title") == "Afficher plus") {
      // $(this).toggleClass('text-primary');
        if (!$(this).hasClass('text-primary')) {
            $('.material-icons[title="derouler"]').removeClass('text-primary');
            $(this).addClass('text-primary');
        } else {
            $(this).removeClass('text-primary');
        }
    }
});

$('body').on('change','input.enfantCheckBox', function () {
    var totalCheckbox = $('.enfantCheckBox[name="'+$(this).attr('name')+'"]').length;
    var totalChecked = $('.enfantCheckBox[name="'+$(this).attr('name')+'"]:checked').length;

    // console.log($(this).attr('name'),totalCheckbox,totalChecked);
    // When total options equals to total checked option
    if (totalCheckbox == totalChecked) {
        $('.parentCheckbox[data-child="'+$(this).attr('name')+'"]').prop('checked', true);
    } else {
        $('.parentCheckbox[data-child="'+$(this).attr('name')+'"]').prop('checked', false);
    }
});

// auto formatage des selectes
function formatInput(params) {
     // lie les select2 a leur parents s'il sont definis
     if(typeof params !== 'undefined' && params){

        $('#'+params+' .dataOptions').each(function() {
            $(this).select2({
                dropdownParent: $(this).offsetParent()
            });
        });

        $('#'+params+' .dataOptionsMultiple').each(function() {
            // var $p = $(this).parent();
            $(this).select2({
                maximumSelectionLength: 0,
                dropdownParent: $(this).offsetParent()
            });
        });

    }else{

        $('.dataOptions').select2({
            placeholder: $(this).data('placeholder'),
            allowClear: true
        });

        $('.dataOptionsMultiple').select2(
            {
                maximumSelectionLength: 0
            }
        );
    }

    // Configuration spécifique pour le select `circuit_validateur_id`
    $('#circuit_validateur_id').select2({
        tags: true, // Permet l'ajout de nouveaux éléments
        placeholder: '--- Choisissez ou ajoutez un circuit de validation ---'
    });
// })
}

// Redirection vers
$('body').on('click', ".redirect_to", function(e) {
    // Étape 1 : Créez une variable avec la valeur que vous souhaitez stocker
    var maVariable =  $(this).data('element');
    var elementType = $(this).data('subelement');
    // console.log(elementType);
    setCookie('element', maVariable, 1)
    setCookie('subelement', elementType, 1)
    // Rediriger vers l'URL
    window.location.href = $(this).data('url');
});

function imprimer() {
    // Cloner le contenu du modal
    var contenuModal = document.getElementById('modalContent').cloneNode(true);

    // Créer une nouvelle fenêtre pour imprimer
    var fenetreImpression = window.open('', '_self');

    // Injecter le contenu cloné dans la nouvelle fenêtre
    fenetreImpression.document.body.innerHTML = contenuModal.outerHTML;

    // Imprimer la nouvelle fenêtre
    fenetreImpression.print();

    // Fermer le modal après l'impression
    fermerModal();
}

function fermerModal() {
    // Fermer le modal
    $('#modalimprimer').modal('hide');
}