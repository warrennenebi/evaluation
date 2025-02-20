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
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-4 text-gray-900">
                {{-- {{ __("You're logged in!") }} --}}
                <div class="table-title mb-6">
                    <div class="row w-100">
                        <div class="col-sm-5">
                            <h2>Gestion du Reseaux de soins</h2>
                        </div>
                        <div class="col-sm-6">
                            <button class="btn btn-success" style="border: 1px #000000 solid; text-align: center; border-radius: 110px; font-weight: bold;" type="button" data-bs-dismiss="modal" onclick="fopen ('modals/nouvelle_clinique.modaldemande.show.PositionModal1','nouvelle_clinique/create')">Nouvelle clinique ou pharmacie</button>
                            <button class="btn btn-success" style="border: 1px #000000 solid; text-align: center; border-radius: 110px; font-weight: bold;" type="button" data-bs-dismiss="modal" onclick="fopen ('modals/nouvelle_clinique.modalimprimer.show.PositionModal1','imprimer/pdf')">Imprimer liste des centres</button>
                            <button class="btn btn-primary" style="border: 1px #000000 solid; text-align: center; border-radius: 110px; font-weight: bold;" type="button" onclick="handleSupprimerCentreClick()" >Supprimer des centres</button>
                        </div>
                    </div>
                </div>
                <div class="bd-example table-responsive">
                    <span id="refReseauDeSoinTable" class="tabletoget d-none">ReseauDeSoinTable</span>
                    {{-- {{$dem_objet_g}} --}}
                    <table class="table table-sm table-bordered w-100 applyDataTablesTo" id="ReseauDeSoinTable">
                        <thead>
                            <tr style="background-color: #0080ff; color: #ffffff; text-align: center;">
                                <th style="width: auto">#</th>
                                <th style="width: auto">Commune</th>
                                <th style="width: auto">Nom</th>
                                <th style="width: auto">Type</th>
                                <th style="width: auto;">Localisation</th>
                                <th style="width: auto">Contacts</th>
                                <th style="width: auto">Details</th>
                                <th style="width: auto">Date</th>
                                <th style="width: auto">Actions</th>
                            </tr>
                        </thead>
                        {{-- <tbody>
                            @php
                                $count = 0;
                            @endphp
                            @foreach ($demandes as $demande)
                                <tr>
                                    <td class="oneline">
                                        <input type="checkbox">
                                        <span role="button" class="material-icons">visibility</span>
                                    </td>
                                    <td>{{$count+=1}}</td>
                                    <td>{{str_pad($demande->type_demandes_id, 3, "0", STR_PAD_LEFT)}}</td>
                                    <td>{{str_pad($demande->type_demandes_id, 3,"0", STR_PAD_LEFT).str_pad($demande->directions_id, 2, "0", STR_PAD_LEFT)."-".$demande->id}}</td>
                                    <td>{{$demande->objet}}</td>
                                    <td >{{$demande->detail}}</td>
                                    <td class="oneline">
                                        @if($demande->satut==0) 
                                            En Attente
                                        @elseif($demande->satut==1) 
                                            Validé 
                                        @else
                                            Réfusé 
                                        @endif
                                    </td>
                                    <td class="oneline">{{$demande->created_at}}</td>
                                    <td class="oneline">
                                        <span role="button" class="material-icons text-secondary">refresh</span>
                                        <span role="button" class="material-icons text-warning">edit_square</span>
                                        <span role="button" class="material-icons text-danger">delete</span>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody> --}}
                    </table>
                </div>
            </div>
        </div>
    </div>   
</x-app-layout>