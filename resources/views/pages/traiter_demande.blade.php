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
        <div class="max-w-8xl mx-auto sm:px-8 lg:px-6">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-4 text-gray-900">
                    {{-- {{ __("You're logged in!") }} --}}

                        <div class="btn">
                            <button class="btn d-flex justify-content-center align-items-center" style="background-color: #ffffff; color: #000000; border: 1px solid #000000; text-align: center; margin: 2px; border-radius: 20px; font-weight: bold; color: #000000;" type="button" data-bs-dismiss="modal" onclick="handleAnalyserDemandeClick()">
                                <i class="material-icons px-1">&#xf106</i>
                                Analyser demande
                            </button> 
                        </div>
                    <div class="bd-example table-responsive">
                        <span id="refDemandesTraitementTable" class="tabletoget d-none">DemandesTraitementTable</span>
                        <table class="table table-bordere w-100 applyDataTablesTo" id="DemandesTraitementTable">
                            <thead>
                                <tr style="background-color: #0080ff !important; color: #ffffff; text-align: center;">
                                    <th style="width: auto"></th>
                                    <th style="width: auto">N°</th>
                                    <th style="width: auto">Type</th>
                                    <th style="width: auto" class="oneline">Demande N°</th>
                                    <th style="width: auto" class="oneline">Nom demandeur</th>
                                    <th style="width: auto; text-align: center;">Objet</th>
                                    <th style="width: auto">Satut</th>
                                    <th style="width: auto" class="oneline">Date Demande</th>
                                    <th style="width: auto">Actions</th>
                                </tr>
                            </thead>
                            {{-- <tbody>
                            
                            </tbody> --}}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</x-app-layout>
