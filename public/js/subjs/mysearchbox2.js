document.addEventListener("DOMContentLoaded",function createOptionvalue(/*params,reference*/) {
	let dropdownActiviteBatiment = document.getElementById('selectionActiviteBatiment');
	//let dropdownRef=document.getElementById(reference)
	// dropdownRef=dropdownRef.options[dropdownRef.selectedIndex].dataset.locker
	// console.log(dropdownRef);
	// dropdown.length = 0;

	let defaultOptionActiviteBatiment = document.createElement('option');
	defaultOptionActiviteBatiment.text = 'Choisir un type'//+params;

	dropdownActiviteBatiment.add(defaultOptionActiviteBatiment);
	dropdownActiviteBatiment.selectedIndex = 0;	

	//Ville Bâtiment
	let dropdownVilleBatiment = document.getElementById('selectionVilleBatiment');
	let defaultOptionVilleBatiment = document.createElement('option');
	defaultOptionVilleBatiment.text = 'Choisir un type'//+params;

	dropdownVilleBatiment.add(defaultOptionVilleBatiment);
	dropdownVilleBatiment.selectedIndex = 0;
	
	//Région Bâtiment
	let dropdownRegionBatiment = document.getElementById('selectionRegionBatiment');
	let defaultOptionRegionBatiment = document.createElement('option');
	defaultOptionRegionBatiment.text = 'Choisir un type'//+params;

	dropdownRegionBatiment.add(defaultOptionRegionBatiment);
	dropdownRegionBatiment.selectedIndex = 0;
	//const url = 'storage/'+params+'.json';

	//const request = new XMLHttpRequest();
	//request.open('GET', url, true);

	//request.onload = function() {
		//if (request.status === 200) {
			//const data = JSON.parse(request.responseText).data;
			//let option;
			// console.log(data);
			// for (let i = 0; i < data.length; i++) {
			// 	if (data[i].pays_id==dropdownRef) {					
			// 		option = document.createElement('option');
			// 		option.text = data[i].raison_social;
			// 		option.value = data[i].id;
			// 		option.dataset.locker = data[i].pays_id;
			// 		dropdown.add(option);
			// 	}
			// }


		//} else {
		// Reached the server, but it returned an error
		
	//}

	// request.onerror = function() {
	// 	console.error('An error occurred fetching the JSON from ' + url);
	// };

	// request.send();	

	//Type Véhicule
	let dropdownVehicule = document.getElementById('selectionTypeVehicule');
	let defaultOptionVehicule = document.createElement('option');
	defaultOptionVehicule.text = 'Choisir un type'//+params;
	dropdownVehicule.add(defaultOptionVehicule);
	dropdownVehicule.selectedIndex = 0;

	//Activité Véhicule
	let dropdownMarqueVehicule = document.getElementById('selectionMarqueVehicule');
	let defaultOptionMarqueVehicule = document.createElement('option');
	defaultOptionMarqueVehicule.text = 'Choisir un type'//+params;
	dropdownMarqueVehicule.add(defaultOptionMarqueVehicule);
	dropdownMarqueVehicule.selectedIndex = 0;


	//Marque Véhicule
	let dropdownActiviteVehicule = document.getElementById('selectionActiviteVehicule');
	let defaultOptionActiviteVehicule = document.createElement('option');
	defaultOptionActiviteVehicule.text = 'Choisir un type'//+params;
	dropdownActiviteVehicule.add(defaultOptionActiviteVehicule);
	dropdownActiviteVehicule.selectedIndex = 0;

	//Modèle Véhicule
	let dropdownModeleVehicule = document.getElementById('selectionModeleVehicule');
	let defaultOptionModeleVehicule = document.createElement('option');
	defaultOptionModeleVehicule.text = 'Choisir un type'//+params;
	dropdownModeleVehicule.add(defaultOptionModeleVehicule);
	dropdownModeleVehicule.selectedIndex = 0;

	//Energie Véhicule
	let dropdownEnergieVehicule = document.getElementById('selectionEnergieVehicule');
	let defaultOptionEnergieVehicule = document.createElement('option');
	defaultOptionEnergieVehicule.text = 'Choisir un type'//+params;
	dropdownEnergieVehicule.add(defaultOptionEnergieVehicule);
	dropdownEnergieVehicule.selectedIndex = 0;
});