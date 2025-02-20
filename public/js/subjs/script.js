const body = document.body;
const sidebar = document.querySelector('.sidebar');
const openSidebar = document.querySelector('#openSidebar');
const sidebarcontent = document.querySelector('#sidebarcontent')
// const closeSidebar = document.querySelector('#closeSidebar');
const toggleTheme = document.querySelector('.toggle-theme');

const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');

const gridContainer = document.getElementById('gridContainer');
const gridItems = Array.from(gridContainer.querySelectorAll('.grid-item'));
// const light = toggleTheme.children[0];
// const dark = toggleTheme.children[1];
const inputFields = document.querySelectorAll('.percentage p');
const menuBt = document.getElementById('ouvrir');
let isHidden = true;

// openSidebar.addEventListener('click', openSidebarFunction);
// closeSidebar.addEventListener('click', closeSidebarFunction);
// toggleTheme.addEventListener('click', changeTheme);
// menuBtn.addEventListener('click', () => {
//     sideMenu.style.display = 'block';
// });

// closeBtn.addEventListener('click', () => {
//     sideMenu.style.display = 'none';
// });

function openSidebarFunction() {
    sidebar.style.left = '0%';
}

function closeSidebarFunction() {
    sidebar.style.left = '-100%';
    // sidebar.style.left = '0%';
}

function changeTheme() {
    if (body.classList.contains('dark-mode')) {
        lightMode();
    } else if (!body.classList.contains('dark-mode')) {
        darkMode();
    }
}

inputFields.forEach((e, i) => {
    let val = parseInt(e.textContent);
    console.log(val);
    let circle = document.getElementById(`circle${i + 1}`);
    let r = circle.getAttribute('r');
    let circ = Math.PI * 2 * r;
    let counter = 0;
    let fillValue = (circ * (100 - val)) / 100;
    setInterval(() => {
        if (counter === val) {
            clearInterval();
        } else {
            counter += 1;
            e.innerText = counter + '%';
            circle.style.strokeDashoffset = fillValue;
        }
    }, 0 / val);
});

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    darkMode();
}

function darkMode() {
    body.classList.add('dark-mode');
    light.classList.remove('active');
    dark.classList.add('active');
}

function lightMode() {
    body.classList.remove('dark-mode');
    dark.classList.remove('active');
    light.classList.add('active');
}

// menuBt.addEventListener('click', () => {
    
//     const transitionDuration = 300; // Durée de l'animation en millisecondes

//             if (isHidden) {
//                 // Affiche la première grille
//                 gridItems[0].classList.toggle('hidden');
//                 gridItems[0].style.opacity = '1';
//                 gridItems[0].style.visibility = 'visible';
//                 gridContainer.classList.toggle('two-columns');

//                 // Réduit progressivement la marge
//                 let marginLeft = -100;
//                 let marginLeft2 = -46;
//                 const interval = 10; // Intervalle de temps entre les étapes
//                 const step = 2; // Pas de changement de marge à chaque étape

//                 const intervalId = setInterval(() => {
//                     marginLeft += step;
//                     if (marginLeft >= 0) {
//                         clearInterval(intervalId);
//                     }
//                     gridItems[0].style.marginLeft = marginLeft + '%';
//                     // gridItems[1].style.marginLeft = marginLeft2 + '%';
//                 }, interval);
//                 const intervalId2 = setInterval(() => {
//                     marginLeft2 += step;
//                     if (marginLeft2 >= 0) {
//                         clearInterval(intervalId2);
//                     }
//                     // gridItems[0].style.marginLeft = marginLeft + '%';
//                     gridItems[1].style.marginLeft = marginLeft2 + '%';
//                 }, interval);
//             } else {
//                 // Réduit progressivement la marge de la première grille
//                 let marginLeft = 0;
//                 let marginLeft2 = 46;
//                 const interval = 10;
//                 const step = 2;

//                 const intervalId = setInterval(() => {
//                     marginLeft -= step;
//                     if (marginLeft <= -100) {
//                         clearInterval(intervalId);
//                     }
//                     gridItems[0].style.marginLeft = marginLeft + '%';
//                     // gridItems[1].style.marginLeft = marginLeft2 + '%';
//                 }, interval);
//                 const intervalId2 = setInterval(() => {
//                     marginLeft2 -= step;
//                     if (marginLeft2 <= 0) {
//                         clearInterval(intervalId2);
//                     }
//                     // gridItems[0].style.marginLeft = marginLeft + '%';
//                     gridItems[1].style.marginLeft = marginLeft2 + '%';
//                 }, interval);
                
//                 // Rétablit la grille 1 après l'animation de marge
//                 // gridContainer.classList.toggle('two-columns');
//                 setTimeout(() => {
//                     gridItems[0].classList.add('hidden');
//                     gridItems[0].style.opacity = '0';
//                     gridItems[0].style.visibility = 'hidden';
//                     gridItems[0].style.marginLeft = '-100%';
//                     gridContainer.classList.toggle('two-columns');
//                     // gridContainer.style.gridTemplateColumns = '1fr 1fr 1fr'; // Trois colonnes égales
//                 }, transitionDuration);
//             }
//             isHidden = !isHidden;
   
// });



// function onPageLoad() {
//     const transitionDuration = 0; // Durée de l'animation en millisecondes

//     if (isHidden) {
//         // Affiche la première grille
//         gridItems[0].classList.toggle('hidden');
//         gridItems[0].style.opacity = '1';
//         gridItems[0].style.visibility = 'visible';
//         gridContainer.classList.toggle('two-columns');

//         // Réduit progressivement la marge
//         let marginLeft = -100;
//         let marginLeft2 = -46;
//         const interval = 0; // Intervalle de temps entre les étapes
//         const step = 2; // Pas de changement de marge à chaque étape

//         const intervalId = setInterval(() => {
//             marginLeft += step;
//             if (marginLeft >= 0) {
//                 clearInterval(intervalId);
//             }
//             gridItems[0].style.marginLeft = marginLeft + '%';
//             // gridItems[1].style.marginLeft = marginLeft2 + '%';
//         }, interval);
//         const intervalId2 = setInterval(() => {
//             marginLeft2 += step;
//             if (marginLeft2 >= 0) {
//                 clearInterval(intervalId2);
//             }
//             // gridItems[0].style.marginLeft = marginLeft + '%';
//             gridItems[1].style.marginLeft = marginLeft2 + '%';
//         }, interval);
//     } else {
//         // Réduit progressivement la marge de la première grille
//         let marginLeft = 0;
//         let marginLeft2 = 46;
//         const interval = 0;
//         const step = 2;

//         const intervalId = setInterval(() => {
//             marginLeft -= step;
//             if (marginLeft <= -100) {
//                 clearInterval(intervalId);
//             }
//             gridItems[0].style.marginLeft = marginLeft + '%';
//             // gridItems[1].style.marginLeft = marginLeft2 + '%';
//         }, interval);
//         const intervalId2 = setInterval(() => {
//             marginLeft2 -= step;
//             if (marginLeft2 <= 0) {
//                 clearInterval(intervalId2);
//             }
//             // gridItems[0].style.marginLeft = marginLeft + '%';
//             gridItems[1].style.marginLeft = marginLeft2 + '%';
//         }, interval);
        
//         // Rétablit la grille 1 après l'animation de marge
//         // gridContainer.classList.toggle('two-columns');
//         setTimeout(() => {
//             gridItems[0].classList.add('hidden');
//             gridItems[0].style.opacity = '0';
//             gridItems[0].style.visibility = 'hidden';
//             gridItems[0].style.marginLeft = '-100%';
//             gridContainer.classList.toggle('two-columns');
//             // gridContainer.style.gridTemplateColumns = '1fr 1fr 1fr'; // Trois colonnes égales
//         }, transitionDuration);
//     }
//     isHidden = !isHidden;
// }

document.addEventListener('DOMContentLoaded', onPageLoad);


// document.addEventListener("DOMContentLoaded", function() {

//     setTimeout(() => {
//         var toggleButton = document.querySelector('#ouvrir');
//         toggleButton.addEventListener('click', function (event) {
//             // sidebar.classList.remove('')
//             // sidebar.classList.toggle('collapsed')
//             // sidebarcontent.classList.toggle('mag')
//         })
//     }, 3000);

    
// $('.btn-expand-collapse').click(function(e) {
    
//     $('.main-sidebar').toggleClass('collapsed');
// });