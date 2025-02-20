// Axios// 
const config = {
    onDownloadProgress: function(progressEvent) {
    const bar = document.getElementById('progress-bar');
    // console.log(progressEvent);    
    const percentCompleted = Math.round((progressEvent.event.timeStamp / progressEvent.loaded)*1000);
    // console.log(progressEvent.loaded,progressEvent.event.timeStamp,"Percent Complete " + percentCompleted + "%");
    bar.style.width=percentCompleted+'%';
    // bar.previousElementSibling.textContent = `${percentCompleted}%`
    if (percentCompleted >= 100) {
        setTimeout(() => {            
            bar.style.width = `0%`;
        }, 500);
    }
}
}
// fonction formatage de nombre
const checkPercentage = (data, type=(document.getElementById('monnaie') ? document.getElementById('monnaie').value:"XOF"), model) => {
    console.log(data, type, model);
    if (data!==null) {
        if(typeof data === 'number')
        {
            data = data.toString();
        }
        data = parseFloat(data.replace(/\s/g, "").replace(/,/g, ".") );
    }
    else{
        data=0;
    }
    let regex = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/; //regex de verification
    if (!regex.test(data)) {
        data = "";
    }
    if (model === "currency") {        
        data = new Intl.NumberFormat(
            "fr-FR",
            {
                currency: type,
                style: "currency",
            }
        ).format(data);
    }
    if (model === "percent") {
        data += " %";
    }
    return data;
};

const destroyCurrency = (value, type) => {
    // console.log(value);
    if (type !== "percent") {
        if (value !== 0) {
            value = parseFloat(value.replace(/\s/g, "").replace(/,/g, ".") );
        }
    }
    if (type === "percent") {
        value = value.replace(" %", "");
    }
    return value;
};

// fonction formatage de date
const dateFormat = (data) => {
    // options for formatting
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    // Get the date string in dd/mm/yyyy format
    let newDateStr = new Date(data).toLocaleDateString('en-GB', options);
    return newDateStr;
}

// conversion en nombre
const toNumber=(value)=>{
    // console.log(value);
    value = parseFloat(value.replace(/\s/g, "").replace(/,/g, ".") );
    return value;
}

// fonction clonage element dom 2
// const addItemRow=(element)=>{
//     var original = document.getElementById(element);
//     var clone = original.cloneNode(true);
//     i++;
//     clone.id = "profile-row" + i;
//     clone.getElementsByTagName('select')[0].id = "select-item" + i;
//     clone.getElementsByTagName('input')[0].id = "select-item-value" + i;
//     original.parentNode.appendChild(clone);
// }

//!convertion donnée vers JSON**************************** */
function oldformDataToObject(elForm) {
    if (!elForm instanceof Element) return;
    var fields = elForm.querySelectorAll('input, select, textarea'),
    o = {};
    for (var i=0, imax=fields.length; i<imax; ++i) {
        var field = fields[i],
        sKey = field.name || field.id;
        
        if (field.type==='button' || field.type==='image' || field.type==='submit' || !sKey) continue;
        switch (field.type) {
            case 'checkbox':
                if (field.checked) {                
                    // o[sKey] = +field.checked;
                    o[sKey] = field.value;
                }
                break;
            case 'radio':
                if (o[sKey]===undefined) o[sKey] = '';
                if (field.checked) o[sKey] = field.value;
                break;
            case 'select-multiple':
                var a = [];
                for (var j=0, jmax=field.options.length; j<jmax; ++j) {
                if (field.options[j].selected) a.push(field.options[j].value);
                }
                o[sKey] = a;
                break;
            case 'file':
                var file = field.files[0];
                var formData = new FormData();
                formData.append('image', file);
                o[sKey] = formData;
                console.log(o[sKey]);
                break;
            default:
                o[sKey] = field.value;
                // console.log(o[sKey]+":"+field.value);
        }
    }
//alert('Form data:\n\n' + JSON.stringify(o, null, 2));
return o;
}
// function formDataToObject(elForm)
//  {
//     const form=document.querySelector("#"+elForm)
    
//     const fm_Data= new FormData(form)

//     return fm_Data
//  }
// function formDataToObject(elForm) 
// {
//     const form = document.querySelector("#" + elForm);
//     const fmData = new FormData(form);

//     // Ajouter les champs de type fichier au FormData
//     form.querySelectorAll('input[type="file"]').forEach(fileInput => {
//         const fieldName = fileInput.name;
//         const files = fileInput.files;

//         // Vérifier si des fichiers sont sélectionnés
//         if (files.length > 0) {
//             // Ajouter chaque fichier avec une clé unique basée sur le nom du champ
//             for (let i = 0; i < files.length; i++) {
//                 const uniqueKey = fieldName + "_" + i;
//                 fmData.append(uniqueKey, files[i]);
//             }

//             fileInput.remove();
//         }
//     });

//     return fmData;
// }

function formDataToObject(elForm) {
    const form = document.querySelector("#" + elForm);
    const combinedFormData = new FormData();

    // Parcourir tous les éléments du formulaire
    form.querySelectorAll('input, select, textarea').forEach(field => {
        const fieldName = field.name || field.id;

        // Vérifier le type de champ
        if (field.type === 'file') {
            const files = field.files;
            if (files.length > 0) {
                // Ajouter chaque fichier avec une clé unique basée sur le nom du champ
                for (let i = 0; i < files.length; i++) {
                    const uniqueKey = fieldName + "_" + i;
                    combinedFormData.append(uniqueKey, files[i]);
                }
            }
        } else {

            switch (field.type) {
                case 'checkbox':
                    if (field.checked) {
                        combinedFormData.append(fieldName, field.value);
                    }
                    break;
                case 'radio':
                    if (field.checked) {
                        combinedFormData.append(fieldName, field.value);
                    }
                    break;
                // case 'select-multiple':
                //     const selectedOptions = [];
                //     field.querySelectorAll('option:checked').forEach(option => {
                //         selectedOptions.push(option.value);
                //     });
                //     formDataObject[fieldName] = selectedOptions;
                //     break;
                default:
                    // Champ de formulaire ordinaire
                    combinedFormData.append(fieldName, field.value);
                    break;
            }
        }
    });

    return combinedFormData;
}

function useSwalNotification(message, icon="warning",link=['',''], timer = 4000) {
    Swal.fire({
        icon: icon,
        title: message,
        // animation: false,
        showConfirmButton: true,
        timer: timer ?? 4000,
        footer: '<a href="'+link[0]+'" target="_blank">'+link[1]+'</a>'
    });
}
function useSwalSuccess(message) {
    Swal.fire({
        toast: true,
        icon: "success",
        title: message,
        // animation: false,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
    });
}
function useSwalError(message, timer = 4000) {
    Swal.fire({
        toast: true,
        icon: "error",
        title: message,
        position: "top-end",
        showConfirmButton: false,
        timer: timer ?? 4000,
    });
}
function useSwalAlert(message, timer = 4000) {
    Swal.fire({
        toast: true,
        icon: "warning",
        title: message,
        position: "top-end",
        showConfirmButton: false,
        timer: timer ?? 4000,
    });
}
function useSwalConfirm(message,callback=null, confirm = "Oui, continuer.", cancel = "Non, fermer.") {
    Swal.fire({
        html: message,
        icon: "warning",
        buttonsStyling: true,
        showCancelButton: true,
        confirmButtonText: confirm,
        cancelButtonText: cancel,
        customClass: {
            confirmButton: "btn bg-secondary",
            cancelButton: "btn bg-primary",
        },
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        } else if (result.isDenied) {
            Swal.close();
        }
    });
}

function useSwalConfirmRequired(message,confirm = "Oui, continuer.", callback) {
    Swal.fire({
        html: message,
        icon: "warning",
        buttonsStyling: true,
        confirmButtonText: confirm,
        customClass: {
            confirmButton: "btn bg-secondary text-white",
            // cancelButton: "btn bg-primary text-white",
        },
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        } else if (result.isDenied) {
            Swal.close();
        }
    });
}

function useSwalConfirmValue(message, confirm = "Oui, continuer.", cancel = "Non, fermer.", _callback) {
    Swal.fire({
        // title: 'Merci de confirmer la part offerte',
        html: message,
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: confirm,
        cancelButtonText: cancel,
        showLoaderOnConfirm: true,
        // preConfirm: (partOffert) => {
        //     console.log(partOffert);
        //     return fetch(`//api.github.com/users/${login}`)
        //     .then(response => {
                
        //     })
        //     .catch(error => {
                
        //     })
        // },
        allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
        if (result.isConfirmed) {
            console.log(result.value);
            //conversion des informations utilisateur au format json
            data_contents={};
            v_temp=[];

            for (let index = 0; index < $("#storeReinsurers")[0].children.length; index++) {
                v_temp.push(formDataToObject($("#storeReinsurers")[0].children[index]))
            }
            data_contents["reinsurers"]=v_temp;
            console.log(data_contents);
        }
    })
}

function sendAlert(data)
{
    if (data.error==2) {
        useSwalError(data.message);
    } else if (data.error==1) {
        useSwalAlert(data.message);
    }
    else if (data.error==0)
    {
        useSwalSuccess(data.message);
    }
}
