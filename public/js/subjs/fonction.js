let tableJson=[];

//formatage de searchselect
function boxFormat(params=null,callback=null) {
    $(".dataOptions").select2();
    $(".MarqueAdd").select2(
        {
            tags:true
        }
    );
    $(".ModeleAdd").select2(
        {
            tags:true
        }
    );
}

// $("body").on('mouseenter','.dataOptions', function(){
//     $(this).select2();
// });
// $("body").on('mouseenter','.MultidataOptions', function(){
//     $(this).select2(
//         {
//             maximumSelectionLength: 0
//         }
//     );
// });

// $("body").on('mouseenter','.dataOptions', function(){
//     $(this).select2();
// });
// $("body").on('mouseenter','.dataOptions', function(){
//     $(this).select2();
// });

// deplacement des tableaux
$('body').on('click','#slideRight',function() {
    let ID_element_scrollable=$('.nav-link.active').data('idtable');
    // console.log(ID_element_scrollable)
    $('#container'+ID_element_scrollable).animate( { scrollLeft: '+=150' }, 500);
});

$('body').on('click','#slideLeft',function() {
    let ID_element_scrollable=$('.nav-link.active').data('idtable');
    // console.log(ID_element_scrollable);
    $('#container'+ID_element_scrollable).animate( { scrollLeft: '-=150' }, 500);
});
let xp=0
$('body').mouseover('.table-responsive',function() {
    let ID_element_scrollable=$('.nav-link.active').data('idtable');
    document.body.addEventListener("mousemove", (event) => {
        // Obtenez les coordonnées X et Y de la souris depuis l'événement
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        if (mouseX>600) {
            xp += 1.5
            $('#container'+ID_element_scrollable).scrollLeft(xp);
            // console.log('dessus gauche '+xp);
        }
        if (mouseX<350) {
            xp -= 1.5
            $('#container'+ID_element_scrollable).scrollLeft(xp);
            // console.log('dessus droit '+xp);
        }
        // Mettez à jour le contenu de l'élément avec les nouvelles coordonnées
        // document.getElementById('mouse-coordinates').textContent = `Position de la souris : (${mouseX}, ${mouseY})`;
    });
})

// deplacement du navbar
$('body').mouseover('.navigation_bar',function() {
    // const mouseCoordinates = document.getElementById("mouse-coordinates");
    // console.log('dessus');
    document.body.addEventListener("mousemove", (event) => {
        // Obtenez les coordonnées X et Y de la souris depuis l'événement
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        if (mouseX>750 && mouseY<60) {
            $('.navigation_bar2').scrollLeft( 500 );
            // console.log('dessus gauche');
        }
        if (mouseX<50 && mouseY<60) {
            $('.navigation_bar2').scrollLeft(-500);
            // console.log('dessus droit');
        }
        // Mettez à jour le contenu de l'élément avec les nouvelles coordonnées
        // mouseCoordinates.textContent = `Position de la souris : (${mouseX}, ${mouseY})`;
    });
})

//mise à jour des cedantes en fonction des pays
$('body').on('change','#pays_assure', function () {
    let paysId = $(this).children("option:selected").data('locker');

    $.ajax({
        type: "GET",
        data: {
            pays_id: paysId
        },
        url: "gettransferorWere",
        success: function(response) {
            var newdata = $.map(response.items, function (obj) {
                obj.id = obj.id // replace pk with your identifier
                obj.text = obj.text || obj.raison_social; // replace name with the property used for the text
                return obj;
            });
            $('#transferor_id').empty().select2({
                data: newdata
            }).val(null).trigger('change');
        }
    });

})


// changement des comissions cedantes
$('body').on('change','.comCed', function (){
    $('.comReass').trigger("focusout");
})


//verification et calcul des part acceptees
$('body').on('focusout','.reinsurerAcceptPart', function () {
    let sommeAccepte=0;
    let countlocker=0;
    let partActuel=parseFloat($('#part_offerte').val().replace(" %", ""));
    !isNaN(partActuel) ? '' : countlocker++ ;
    for (let index = 0; index < $('.reinsurerAcceptPart').length; index++) {
        sommeAccepte+=parseFloat(($('.reinsurerAcceptPart')[index]).value.replace(" %", ""));
        if (!isNaN(sommeAccepte)) {
            countlocker++;
        }
    }
    // console.log(sommeAccepte,partActuel);
    //calcule de la prime reassureur
    let p100=toNumber($('.p100[data-id="1"]').val());
    let reinsurerAcceptPart=toNumber($(this).val())/100;
    $('.primReas[data-id="'+$(this).data('id')+'"]').val(p100*reinsurerAcceptPart).trigger("focusout")

    if (sommeAccepte < partActuel && !$('#part_offerte').hasClass('CreateBusiness')) {
        //ajout d'un reassureur
        addElement(['pages/Business/form/AddReinsurer','reinsurer']);
    }
    if (sommeAccepte > partActuel && !$('#part_offerte').hasClass('CreateBusiness')) {
        useSwalConfirm('Veuillez revoir la somme des parts des reassureurs ! somme superieur à '+partActuel);
    }

})
$('body').on('click','.closebutton', function () {
    let sommeAccepte=0;
    let partActuel=parseFloat($('#part_offerte').val().replace(" %", ""));
    for (let index = 0; index < $('.reinsurerAcceptPart').length; index++) {
        sommeAccepte+=parseFloat(($('.reinsurerAcceptPart')[index]).value.replace(" %", ""));
    }
    if (!isNaN(sommeAccepte) && $('#part_offerte').val() !=='' && sommeAccepte !== partActuel) {
        console.log('part accept non nul et somme non nul');
        useSwalConfirmRequired('Veuillez revoir les valeurs des parts des reassureurs ! ',"Confirmer",() => {
            $('#addreassureur').trigger('click');
        });
    }
})

function sendconfirm(params) {
    let sommeAccepte=0;
    let partActuel=parseFloat($('#part_offerte').val().replace(" %", ""));
    for (let index = 0; index < $('.reinsurerAcceptPart').length; index++) {
        sommeAccepte+=parseFloat(($('.reinsurerAcceptPart')[index]).value.replace(" %", ""));
    }
    if (sommeAccepte > partActuel && $('#part_offerte').hasClass('CreateBusiness')) {
        useSwalConfirm('Cette affaire a t\'elle été confirmée !',"Oui, continuer.","Non, fermer.",() => {
            useSwalConfirmValue('Merci de confirmer la part offerte');
        });
    }
    $('#remplissageFormLarge').modal('toggle');
}

//calcule de prime à recevoir
$('body').on('focusout','.p100,.comCed,.partOff', function () {
    let empty=3;
    tab=['.p100','.comCed','.partOff'];

    for (let index = 0; index < tab.length; index++) {
        if ($(tab[index]).val()!=='') {
            empty-=1;
        }
        if (empty==0) {
            let p100=toNumber($('.p100').val());
            let comCed=toNumber($('.comCed[data-id="1"]').val())/100;
            let partOff=toNumber($('.partOff').val())/100;
            //la prime à recevoir
            $('#prime_a_recevoir').val(p100*(partOff)*(1-(comCed))).trigger("focusout");
        }

    }

})
//calcul de la prime à reverser
$('body').on('focusout','.comReass,.primReas', function () {
    let empty=2;
    tab=['.comReass','.primReas'];
    for (let index = 0; index < tab.length; index++) {
        if ($(tab[index]+'[data-id="'+$(this).data('id')+'"]').val()!=='') {
            empty-=1;
        }
        if (empty==0) {
            let comReass=toNumber($('.comReass[data-id="'+$(this).data('id')+'"]').val())/100;
            let primReas=toNumber($('.primReas[data-id="'+$(this).data('id')+'"]').val());
            let comCed=toNumber($('.comCed[data-id="1"]').val())/100;
            //la prime à reverser
            $('.pReverser[data-id="'+$(this).data('id')+'"]').val((primReas)*(1-(comReass))).trigger("focusout");

            //calcul du CA
            $('.caAmgs[data-id="'+$(this).data('id')+'"]').val(primReas*(comReass-comCed)).trigger("focusout")
        }

    }
})


// autoremplisage de la date de d'echeance
$('body').on('change','#date_effet', function () {
    var date1 = new Date($('#date_effet').val());
    var date2 = new Date((date1.getFullYear() + 1), date1.getMonth(), (date1.getDate()-1)).toISOString().slice(0, 10)
    //console.log(date2)
    $('#date_echeance').val(date2);
})


// filtrage du tableau des affaires (placement/affaire)
function tabfilter(params) {
    let tableTofilter= document.getElementById('refAffaireTable').innerHTML;

    $('#'+tableTofilter+' tr').show();
    $('#'+tableTofilter+' tr > td:nth-child(2)').each(function () {
        if ($(this).html() != params) {
            $(this).parent().hide();

            if ($(this).parent().hasClass('shown')) {
                $(this).parent().children(':first-child').children().trigger('click')
            }
        }
    });
}
$('body').on('DOMSubtreeModified','div#AffaireTable_paginate', function () {
    // console.log($('.nav-link.active').data('state'));
    tabfilter($('.nav-link.active').data('state'));
})

// genration de la raison social banque
$('body').on('change','.rSBank', function () {
    let ThisId=$(this).data('id');
    var codeIsoPays = $('#pays_id'+ThisId).children("option:selected").data('codeisopays');
    var NomSocialReasssureur = $('#raison_social_reassureur').val() ? $('#raison_social_reassureur').val().substring(0, 3) : '';
    var BankName = $('#bank_name'+ThisId).val().substring(0, 3);
    var BankDevice = $('#devise'+ThisId).val().substring(0, 3);
    //console.log(date2)
    $('#raison_social'+ThisId).val(codeIsoPays+"-"+NomSocialReasssureur+"-"+BankName+"-"+BankDevice);
})

// generation de payement
$('body').on('click','.payto', function (){
    let name=$(this).data('payto');
    let ThisId=$(this).data('paytoid');


    let totalCheckedToPay = document.querySelectorAll('input.enfantCheckBox[name="'+ThisId+'"]:checked');
    let element = [];



    for (let index = 0; index < totalCheckedToPay.length; index++) {
        element.push(totalCheckedToPay[index].id);
        // console.log(element);
    }
    if (!totalCheckedToPay.length == 0) {
        sendBusinessToPay(element,ThisId,name);
    } else {
        useSwalError("Aucune affaire n'a été selectionné pour cette cedante");
    }
})


// fonction ajout de bien (Véhicule & Batiment)
// const AjoutDeBien = document.querySelector(".BtnAjoutBien");
// AjoutDeBien.addEventListener("click", function()
$('body').on('click','.BtnAjoutBien', function () {
    let TabSeleted = document.querySelector(".nav-link.active");
        // console.log(TabSeleted.dataset.idtable)
        if (TabSeleted.dataset.idtable=="TableauCotationVehicule") {
            addVehicule(TabSeleted.dataset.idtable+'Body')
        }
        if (TabSeleted.dataset.idtable=="TableauCotationBatiment") {
            addBatiment(TabSeleted.dataset.idtable+'Body')
        }

});

//fonction de difference de date******************** */
$('body').on('change','.zonedate', function () {
    let idref=$(this).data('ref')
    var date1 = new Date($('#date_effet'+idref).val());
    var date2 = new Date($('#date_echeance'+idref).val());
    if (date1!=="" && date2!=="" && date1>date2) {
        useSwalNotification("la Date d'effet est superieur à la date d'échéance")
        date1=$('#date_effet'+idref+',#date_echeance'+idref).val('');
    }
    // var date2 = new Date((date1.getFullYear() + 1), date1.getMonth(), (date1.getDate()-1)).toISOString().slice(0, 10)
    //console.log(date2)
    // $('#date_fin').val(date2);
})


//verification du GPS CODE
$('body').on('focusout','.gps_code',function(){
    let regex = /^[A-Z0-9]{4}\+[A-Z0-9]{1,}(, [A-Za-z]+)?$/;//regex de verificetion

    res= regex.test($(this).val().replace(/\s/g,''));

    if (!res){
        useSwalNotification("Le code gps "+$(this).val().toUpperCase()+" n'est pas valide. <br> Merci d'en récuperer un valide via ce lien.",'warning',["https://plus.codes/map","trouver votre code gps ici"]);
        // $(this).val('')
    }
});


// Gestionnaire d'événements pour le clic sur le body
$('body').on('click', function(e) {
    // Vérifiez si le clic ne provient pas d'un .dropdown-toggle ou .dropdown-menu
    if (!$(e.target).closest('.dropdown-toggle, .dropdown-menu').length) {
        // Fermez tous les dropdowns en supprimant la classe 'show'
        $('.dropdown-toggle').next().removeClass('show');
    }
});

// Gestionnaire d'événements pour le clic sur .dropdown-toggle
$('body').on('click', '.dropdown-toggle', function() {
    // Sélectionnez tous les éléments .dropdown-toggle avec jQuery
    $(this).next().toggleClass('show');
});

$(".marqueAdd").select2({
    tags: true
});

$(".circuit_validateur_id").select2({
    tags: true,
});

// verifier que le type de la company est different de holding
$('body').on('change','.company_type', function () {

    if ($( "option:selected",this ).text().toLowerCase()!=="holding") {
        $('.'+$(this).data('pays')).prop("multiple", false).select2().val(null).trigger('change')
    } else {
        $('.'+$(this).data('pays')).prop("multiple", true).select2().val().trigger('change')
    }
    if ($( "option:selected",this ).text().toLowerCase()=="courtier") {
        $('.infopartenaire').eq(0).removeClass('d-none')
        $('.infopartenaire').eq(1).addClass('d-none')
    }else{
        $('.infopartenaire').eq(0).addClass('d-none')
        $('.infopartenaire').eq(1).removeClass('d-none')
    }

});








