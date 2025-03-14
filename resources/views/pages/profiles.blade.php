<x-app-layout>
    <x-slot name="header">
        {{-- <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Finances') }}
        </h2> --}}
        {{-- <div class="d-flex col-15 p-2 border-r">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Payer</button>
                </li>                
            </ul>            
        </div>    --}}
    </x-slot>

    <div class="max-w-8xl mx-auto sm:px-8 lg:px-6">

        <!-- Affichage du message de succès si disponible -->
        @if(session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-4 text-gray-900">
                {{-- {{ __("You're logged in!") }} --}}
                <div class="btn">
                    <button button class="btn d-flex justify-content-center align-items-center" style="background-color: #ffffff; color: #000000; border: 1px solid #000000; text-align: center; margin: 2px; border-radius: 20px; font-weight: bold; color: #000000;" type="button" data-bs-toggle="modal" onclick="fopen ('modals/creer_utilisateur.modalutilisateur.show.PositionModal1','profile/create')">
                        <i class="material-icons px-1">&#xea20</i>
                        Ajouter un utilisateur
                    </button>
                </div>
                <div class="bd-example table-responsive">
                    <span id="refProfilesTable" class="tabletoget d-none">ProfilesTable</span>
                    {{-- {{$dem_objet_g}} --}}
                    <table class="table table-sm table-bordered w-100 applyDataTablesTo" id="ProfilesTable">
                        <thead>
                            <tr style="background-color: #0080ff; color: #ffffff; text-align: center;">
                                <th>Nombre D'utilisateur</th>
                                <th style="width: auto" class="oneline">Nom Utilisateur</th>
                                <th style="width: auto">Direction</th>
                                <th style="width: auto" class="oneline">Date D'embauche</th>
                                <th >Actions</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>