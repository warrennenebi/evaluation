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

    <div class="">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    {{-- {{ __("You're logged in!") }} --}}
                    <div class="btn">
                        <button class="btn d-flex justify-content-center align-items-center" style="background-color: #ffffff; color: #000000; border: 1px solid #000000; text-align: center; margin: 2px; border-radius: 20px; font-weight: bold; color: #000000;" type="button" data-bs-dismiss="modal" onclick="fopen ('modals/objet_demande_g.modaldemobjetg.show.PositionModal1','objet_demande_g/create')">
                            <i class="material-icons px-1">&#xea20</i>
                            Ajouter un titre 
                        </button>
                    </div>
                    <div class="bd-example">
                        <span id="refObjetdemandeTable" class="tabletoget d-none">ObjetdemandeTable</span>
                        {{-- {{$dem_objet_g}} --}}
                        <table class="table table-bordered w-auto applyDataTablesTo" id="ObjetdemandeTable">
                            <thead>
                                <tr style="background-color: #0080ff; color: #ffffff; text-align: center;">
                                    <th style="width: 2%">N°</th>
                                    <th style="width: 90%">Titre</th>
                                    <th style="width: 5%">Action</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</x-app-layout>