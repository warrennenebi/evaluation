<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PictureController;
use App\Http\Controllers\DemandeController;
use App\Http\Controllers\CircuitOrganeController;
use App\Http\Controllers\OrganeValidateurController;
use App\Http\Controllers\FillialeController;
use App\Http\Controllers\SettingController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('auth/login');
});

Route::get('/tables', [DemandeController::class, 'getTables'])->name("api.getTable");

Route::get('/dashboard', function () {
    return view('dashboard');})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/change-password', [ProfileController::class, 'showChangePasswordForm'])->name('change-password');
    Route::post('/update-password', [ProfileController::class, 'updatePassword'])->name('update-password');


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/signature', [ProfileController::class, 'signature_update'])->name('signature.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/picture', [PictureController::class, 'store'])->name('picture.update');

    // route de pages de demande
    Route::get('/demande',[DemandeController::class, 'index'])->name('demande');
    Route::get('/liste_dem_sg/{label}',[DemandeController::class, 'liste'])->name('liste_dem_sg');
    Route::get('/demande/edit/{id}',[DemandeController::class, 'edit']);
    Route::get('/demande/create',[DemandeController::class, 'create']);
    Route::get('/demande/visualiser/view/{id}',[DemandeController::class, 'visualiser']);
    Route::get('/traiter_demande/visualiser/view/{id}',[DemandeController::class, 'visualiser']);
    Route::patch('/demande/update/{Demande}',[DemandeController::class, 'update'])->name("demande.update");
    Route::delete('/demande/delete/{id}', [DemandeController::class, 'destroy'])->name('demande.destroy');
    // teste de l'envoie de mail de demande
    Route::get('/demande/mail_renvoi/{demande}',[DemandeController::class, 'renvoi_mail']);
    Route::get('/calculer',[DemandeController::class, 'calculerDateFin']);

    // route de pages de tratement de demande
    Route::get('/traiter_demande', function () {return view('/pages/traiter_demande');})->name('traiter_demande');
    Route::get('/traiter_demande/visualiser/view/{id}',[DemandeController::class, 'visualiser']);

    Route::get('/demande_traiter', [DemandeController::class, 'indexdemtraiter'])->name('demande_traiter');
    Route::post('/demande', [DemandeController::class, 'store'])->name('enregistrement_demande');

    // pour definir l'accord d'une demande
    Route::get('/traiter_demande/analyse_demande/view/{notification}',[DemandeController::class, 'analyseshow'])->name("analyse_demande.show");
    Route::get('/demande_traiter/visualiser/view/{id}',[DemandeController::class, 'visualiser']);
    Route::patch('/analyse_demande_update/view/{notification}',[DemandeController::class, 'notificationupdate'])->name("analyse_demande.update");

    // route pour les filliales
    Route::post('/filliale', [FillialeController::class, 'store'])->name('traitement_demande');

    // Route::middleware(['role:superAdmin'])->group(function () {
        // circuit validateur route
        Route::get('/parametres/{vue}',[SettingController::class, 'menu_parametre'])->name('parametres.vers');
        Route::get('/parametres',[SettingController::class, 'index_parametre'])->name('parametres');


        // route de parametre objet
        Route::post('/objet_demande_g', [SettingController::class, 'store_objet_g'])->name('objet_demande_g');
        Route::get('/parametres/objet_demande_g/create',[SettingController::class, 'create']);
        Route::get('/parametres/objet_demande/objet_demande_g/edit/{titres}',[SettingController::class, 'edit_titre']);
        Route::patch('/objet_demande_g/{id}',[SettingController::class, 'update_titre'])->name("objet_demande_g.update");
        Route::delete('/parametres/objet_demande/objet_demande_g/delete/{id}', [SettingController::class, 'destroy_objet_g'])->name('objet_demande_g.destroy');

        Route::post('/objet_demande_sousobjet', [SettingController::class, 'store_sousobjet'])->name('objet_demande_sousobjet');
        Route::get('/parametres/objet_demande_sousobjet/create',[SettingController::class, 'create']);
        Route::get('/parametres/objet_demande/objet_demande_sousobjet/edit/{sousobjet}',[SettingController::class, 'edit_sous_objet']);
        Route::patch('/objet_demande_sousobjet/{id}',[SettingController::class, 'update_sous_objet'])->name("objet_demande_sousobjet.update");
        Route::delete('/parametres/objet_demande/objet_demande_sousobjet/delete/{id}', [SettingController::class, 'destroy_objet_sg'])->name('objet_demande_sousobjet.destroy');

        Route::post('/objet_demande_objet', [SettingController::class, 'store_objet'])->name('objet_demande_objet');
        Route::get('/parametres/objet_demande_objet/create',[SettingController::class, 'create']);
        Route::get('/parametres/objet_demande/objet_demande_objet/edit/{objet}',[SettingController::class, 'edit_objet']);
        Route::patch('/objet_demande_objet/{id}',[SettingController::class, 'update_objet'])->name("objet_demande_objet.update");
        Route::delete('/parametres/objet_demande/objet_demande_objet/delete/{id}', [SettingController::class, 'destroy_objet'])->name('objet_demande_objet.destroy');



        Route::get('/parametres/circuit/create',[CircuitOrganeController::class, 'create']);
        Route::get('/parametres/circuit_user/create',[CircuitOrganeController::class, 'create']);
        Route::post('/circuit_validateur', [CircuitOrganeController::class, 'store'])->name('circuit_validateur');
        Route::post('/circuit_user', [CircuitOrganeController::class, 'store_user_circuit'])->name('circuit_user');

        //route pour les modifications
        Route::get('/parametres/circuit/circuit_organe/edit/{Circuit_organe}',[CircuitOrganeController::class, 'edit']);

        Route::get('/parametres/circuit/circuit_organe_user/edit/{circuit_organe_user}',[CircuitOrganeController::class, 'edit_circuit_user']);

        //route pour l'enregistrement des modifications
        Route::patch('/circuit_validateur/{Circuit_organe}',[CircuitOrganeController::class, 'update'])->name("Circuit_validateur.update");

        Route::patch('/circuit_user/{Circuit_organe_user}',[CircuitOrganeController::class, 'update_circuit_user'])->name("Circuit_user.update");

        //route permettant les suppressions
        Route::delete('/parametres/circuit/circuit_organe/delete/{circuit_organe}', [CircuitOrganeController::class, 'destroy'])->name('circuit_organe.destroy');

        Route::delete('/parametres/circuit/circuit_organe_user/delete/{circuit_organe_user}', [CircuitOrganeController::class, 'destroy_user'])->name('circuit_organe_user.destroy');



        // route pour les organes validateurs
        Route::get('/organes',[CircuitOrganeController::class, 'index'])->name('organes');
        Route::get('/parametres/organe/create',[OrganeValidateurController::class, 'create']);
        Route::post('/organe', [OrganeValidateurController::class, 'store'])->name('organe_validateur');
        Route::post('/circuit_organe_validateur', [OrganeValidateurController::class, 'store_circuit'])->name('circuit_organe_validateur');

        //route pour modifier l'organe
        Route::get('/parametres/circuit/organe_validateur/edit/{organe}',[OrganeValidateurController::class, 'edit']);

        Route::get('/parametres/circuit/circuit_organe_validateur/edit/{organe_validateur}',[OrganeValidateurController::class, 'edit_organe']);

        //route pour l'enregistrement des organes modifications
        Route::patch('/organe_validateur/{organe}',[OrganeValidateurController::class, 'update'])->name("organe_validateur.update");

        Route::patch('/circuit_organe_validateur/{organe_validateur}',[OrganeValidateurController::class, 'update_organe'])->name("circuit_organe_validateur.update");

        // route pour supprimer des organes
        Route::delete('/parametres/circuit/organe_validateur/delete/{organe_validateur}', [OrganeValidateurController::class, 'destroy'])->name('organe_validateur.destroy');

        Route::delete('/parametres/circuit/circuit_organe_validateur/delete/{circuit_organe}', [OrganeValidateurController::class, 'destroy_circuit'])->name('circuit_organe_validateur.destroy');

        Route::get('/traceability', [DemandeController::class, 'indexhistorique'])->name('traceability.index');

        
    // });
});

require __DIR__ . '/auth.php';