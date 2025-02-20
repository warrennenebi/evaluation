//Restriction sur la date de naissance
const datenaissanceInput = document.getElementById('datenaissance');
const ageErrorMessage = document.getElementById('ageErrorMessage');

datenaissanceInput.addEventListener('input', function() {
    const selectedDate = new Date(datenaissanceInput.value);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - selectedDate.getFullYear();

    if (currentDate.getMonth() < selectedDate.getMonth() || (currentDate.getMonth() === selectedDate.getMonth() && currentDate.getDate() < selectedDate.getDate())) {
        age--;
    }
    if (age < 21) {
        ageErrorMessage.textContent = 'Vous devez avoir au moins 21 ans.';
    } else {
        ageErrorMessage.textContent = '';
    }
});
//Recherche dans DataBase concernant les pays
const searchInput = document.querySelector("#search");
const searchResult = document.querySelector(".table-results");

let dataArray = [];

async function getOrigine() {
    const res = await fetch("../php/script.php");
    const data = await res.json();

    dataArray = data.map(item => ({ en_short_name: item.en_short_name, nationality: item.nationality }));
}

getOrigine();

function createOrigineList(origineList) {
    searchResult.innerHTML = ""; // Effacer les résultats précédents

    origineList.forEach(item => {
        const { en_short_name, nationality } = item;

        const listItem = document.createElement("div");
        listItem.setAttribute("class", "table-item");

        listItem.innerHTML = `
            <p class="nationality" style="border: 1px solid black;">${en_short_name}</p>
        `;

        // Ajouter un gestionnaire d'événements au clic sur l'élément de liste
        listItem.addEventListener("click", () => {
            searchInput.value = en_short_name; // Mettre à jour la valeur de l'input
            searchResult.innerHTML = ""; // Effacer la liste des résultats

            // Mettre à jour également la nationalité (input 3)
            const nationalityInput = document.querySelector(".form-control[name='nationnalite']");
            nationalityInput.value = nationality; // Mettre la valeur de la nationalité correspondante

            // Vous pouvez également ajouter ici d'autres actions à effectuer en fonction de la sélection
        });

        searchResult.appendChild(listItem);
    });
}
searchInput.addEventListener("input", filterData);

function filterData(e) {
    searchResult.innerHTML = "";

    const searchedString = e.target.value.toLowerCase().replace(/\s/g, "");

    // Vérifier si la longueur de la saisie est supérieure ou égale à 2 caractères
    if (searchedString.length >= 2) {
        const filteredArr = dataArray.filter(item =>
            item.en_short_name.toLowerCase().includes(searchedString)
        );
        searchResult.style.position = "absolute";
        searchResult.style.border = "1px solid #ccc";
        searchResult.style.width = "370px";

        createOrigineList(filteredArr);
    }
}
//Bouton de navigation
$(function() {
    // Step show event
    $("#smartwizard").on("showStep", function(e, anchorObject, stepIndex, stepDirection, stepPosition) {

        $("#prev-btn").removeClass('disabled').prop('disabled', false);
        $("#next-btn").removeClass('disabled').prop('disabled', false);

        if (stepPosition === 'first') {

            $("#prev-btn").addClass('disabled').prop('disabled', true);

        } else if (stepPosition === 'last') {

            $("#next-btn").addClass('disabled').prop('disabled', true);

        } else {

            $("#prev-btn").removeClass('disabled').prop('disabled', false);
            $("#next-btn").removeClass('disabled').prop('disabled', false);
        }

        // Get step info from Smart Wizard
        let stepInfo = $('#smartwizard').smartWizard("getStepInfo");
        $("#sw-current-step").text(stepInfo.currentStep + 1);
        $("#sw-total-step").text(stepInfo.totalSteps);

        /*  if (stepPosition == 'last') {
                //showConfirm();
                $("#btnFinish").prop('disabled', false);
            } else {
                $("#btnFinish").prop('disabled', true);
            } */
    });

    $('#smartwizard').smartWizard({
        theme: 'dots',
        autoAdjustHeight: true,
        lang: {
            // Language variables for button
            next: 'Suivant',
            previous: 'Précédent'
        },
        toolbar: {
            showNextButton: true, // show/hide a Next button
            showPreviousButton: true, // show/hide a Previous button
            position: 'bottom', // none/ top/ both bottom
            extraHtml: `<button class="btn btn-success" type="submit" id="btnFinish">Terminer</button>
                        <button class="btn btn-danger" id="btnCancel" >Annuler</button>`
        },
        anchor: {
            enableNavigation: true, // Enable/Disable anchor navigation
            enableNavigationAlways: false, // Activates all anchors clickable always
            enableDoneState: true, // Add done state on visited steps
            markPreviousStepsAsDone: true, // When a step selected by url hash, all previous steps are marked done
            unDoneOnBackNavigation: true, // While navigate back, done state will be cleared
            enableDoneStateNavigation: true // Enable/Disable the done state navigation
        },
    });

    $('.buttonFinish').addClass('btn btn-default');
    $('#smartwizard').on("leaveStep", function(e, anchorObject, stepNumber, stepDirection) {
        var elmForm = $("#form-step-" + stepNumber);
        var valid = true;
        if (stepDirection == 1) {
            $('#step-1').find('.ess-is-required').each(function() {
                if ($(this).val() === "") {
                    let msg = $.trim($(this).attr('data-msg'));
                    $(this).addClass('invalid');
                    $.alert(msg);
                    valid = false;
                } else {
                    $(this).removeClass('invalid');
                    // Modifier la barre de progression pour l'étape 1
                    $(".progress-bar").css("transition", "width 0.8s"); // Vitesse rapide
                    $(".progress-bar").css("border-top-right-radius", "10px"); // Courber le coin droit supérieur
                    $(".progress-bar").css("border-bottom-right-radius", "10px"); // Courber le coin droit inférieur
                    $(".progress-bar").css("background-color", "#BE1D2D"); // Changer la couleur à rouge
                    $(".progress-bar").css("width", "50%"); // Remplir à 25% à l'étape 1
                }
            });
        }

        if (stepDirection == 2) {
            $('#step-2').find('.ess-is-required').each(function() {
                if ($(this).val() === "") {
                    let msg = $.trim($(this).attr('data-msg'));
                    $(this).addClass('invalid');
                    $.alert(msg);
                    valid = false;
                } else {
                    $(this).removeClass('invalid');
                }
            });
        }
        return valid;
    });

});
//Element requis pour la validation des étapes
function validateForm(n) {
    // This function deals with validation of the form fields
    var x, y, i, valid = true,
        valid_tab2 = true,
        valid_tab3 = true,
        valid_tab4 = true;
    x = $('.tab');
    y = $('.ess-is-required');
    var cTab = currentTab;
    //x = document.getElementsByClassName("tab");
    //y = x[currentTab].getElementsByTagName("input");

    var next_value = n;

    //div.classList.contains('secondary')

    /* for (i = 0; i < y.length; i++) {
            // If a field is empty...
            if (y[i].value == "") {
                y[i].classList.add('invalid');
                //    and set the current valid status to false:
                valid = false;
            } else {
                //y[i].removeClass('invalid');
                y[i].classList.remove('invalid');
            }
        }*/

    //if(currentTab == 0){
    $('#tab_1').find('.ess-is-required').each(function() {

        if ($(this).val() === "") {
            let msg = $.trim($(this).attr('data-msg'));
            $(this).addClass('invalid');
            $.alert(msg);
            valid = false;
        } else {
            $(this).removeClass('invalid');
        }
        /* */
    });

    if (currentTab === 1) {
        $('#tab_2').find('.ess-is-required').each(function() {
            if ($(this).val() === "") {
                let msg = $.trim($(this).attr('data-msg'));
                $(this).addClass('invalid');
                $.alert(msg);
                valid = false;
            } else {
                $(this).removeClass('invalid');
            }
        });
    }

    if (currentTab === 2) {
        $('#tab_3').find('.ess-is-required').each(function() {
            if ($(this).val() === "") {
                $(this).addClass('invalid');
                let msg = $.trim($(this).attr('data-msg'));
                $.alert(msg);
                valid = false;
            } else {
                $(this).removeClass('invalid');
            }
        });
    }

    if (currentTab === 3) {
        $('#tab_4').find('.ess-is-required').each(function() {

            if ($(this).val() === "") {
                $(this).addClass('invalid');
                let msg = $.trim($(this).attr('data-msg'));
                $.alert(msg);
                valid = false;
            } else {
                $(this).removeClass('invalid');
            }
        });
    }

    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid;
}
//Activation de l'étape
function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
}
function flashy(message, link) {
var template = $($("#flashy-template").html());
$(".flashy").remove();
template.find(".flashy__body").html(message).attr("href", link || "#").end()
    .appendTo("body").hide().fadeIn(300).delay(4800).animate({
    marginRight: "-100%"
}, 300, "swing", function() {
    $(this).remove();
});
}
//Effet sur bordure [input sélectionné]
const textInputs = document.querySelectorAll('input[type="text"]');
textInputs.forEach(input => {
    input.addEventListener('input', () => {
        if ((input.value.trim() !== '') || (input.focus = true)) {
        input.style.borderColor = '#BE1D2D'; // Couleur de fond bleue légèrement transparente
        } else {
        input.style.borderColor = ''; // 
        }
    });
});
//Validité de l'adresse Mail
const Form = document.getElementById("adresse_email");
const erreur = document.getElementById("emailErrorMessage");
let regex =  /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,}$/;

Form.addEventListener('blur', function(){
    if(!regex.test(Form.value)){
        erreur.textContent = "Adresse électronique invalide !";
    }
    else{
        erreur.textContent = "";
    }
});

//Restriction sur les contacts
//Téléphone 1
    const num = document.getElementById("telephone");
    const alert = document.getElementById("telephoneErrorMessage");

    num.addEventListener('input', function(){
        if(isNaN(num.value)){
            alert.textContent = "Saisie numérique obligatoire !";
        }
        else{
            alert.textContent = "";
        }
    });
//Téléphone 2
    const num2 = document.getElementById("telephone_2");
    const alert2 = document.getElementById("telephoneErrorMessage2");

    num2.addEventListener('input', function(){
        if(isNaN(num2.value)){
            alert2.textContent = "Saisie numérique obligatoire !";
        }
        else{
            alert2.textContent = "";
        }
    });
//Indication Saisie Mot de Passe
const motDePasse = document.getElementById('mot_de_passe');
const motDePasseConf = document.getElementById('mot_de_passe_conf');
const passwordError = document.getElementById('password-error');
motDePasseConf.addEventListener('blur', function() {
    if (motDePasse.value !== motDePasseConf.value) {
        passwordError.style.display = 'block';
    } else {
        passwordError.style.display = 'none';
    }
});
const motDePasseInput = document.getElementById('mot_de_passe');
const passwordHints = document.getElementById('password-hints');
motDePasseInput.addEventListener('focus', function() {
    passwordHints.style.position = 'absolute';
    passwordHints.style.backgroundColor = 'white';
    passwordHints.style.display = 'block';
});
motDePasseInput.addEventListener('blur', function() {
    passwordHints.style.display = 'none';
});

//Restriction Mot de passe
const motDePasseSaisie = document.getElementById('mot_de_passe');
const liste = document.getElementById('password-hints');
const uppercaseChar = document.getElementById('uppercase-char');
const specialChar = document.getElementById('special-char');
const number = document.getElementById('number');
const minLength = document.getElementById('min-length');
motDePasseSaisie.addEventListener('input', function() {
    const password = motDePasseSaisie.value;
    if (/[A-Z]/.test(password)) {
        uppercaseChar.style.display = 'none';
    } else {
        uppercaseChar.style.display = 'block';
    }

    if (/[!@#$%^&*()_+[\]{};:'"\|,.<>?/\\]/.test(password)) {
        specialChar.style.display = 'none';
    } else {
        specialChar.style.display = 'block';
    }

    if (/\d/.test(password)) {
        number.style.display = 'none';
    } else {
        number.style.display = 'block';
    }

    if (password.length >= 8) {
        minLength.style.display = 'none';
    } else {
        minLength.style.display = 'block';
    }
    
    if (password === '') {
        liste.style.display = 'none';
    } else {
        liste.style.display = 'block';
    }
});