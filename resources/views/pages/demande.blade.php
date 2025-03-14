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
                <div class="row align-items-center justify-content-between">
                    <div class="btn col-md-2">
                        <button class="btn d-flex justify-content-center align-items-center" style="background-color: #ffffff; color: #000000; border: 1px solid #000000; text-align: center; margin: 2px; border-radius: 20px; font-weight: bold; color: #000000;" type="button" data-bs-toggle="modal" data-bs-target="#modalwindow">
                            <i class="material-icons px-1">&#xea20</i>
                            Faire une Demande
                        </button>
                    </div>
                    <div class="form-group col-md-2">
                        <select id="filterType" class="form-control">
                            <option value="">Tous les types</option>
                            @foreach($types as $type)
                                <option value="{{ $type->id }}">{{ $type->label }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="bd-example table-responsive">
                    <span id="refDemandesTable" class="tabletoget d-none">DemandesTable</span>
                    {{-- {{$dem_objet_g}} --}}
                    <table class="table table-sm table-bordered w-100 applyDataTablesTo" id="DemandesTable">
                        <thead>
                            <tr style="background-color: #0080ff; color: #ffffff; text-align: center;">
                                <th style="width: auto">#</th>
                                <th style="width: auto"><span class="material-icons align-bottom fs-5">visibility</span></th>
                                <th style="width: auto">N°</th>
                                <th style="width: auto">Type</th>
                                <th style="width: auto" class="oneline">Demande N°</th>
                                <th style="width: auto; text-align: center;">Objet</th>
                                <th style="width: auto">Satut</th>
                                <th style="width: auto" class="oneline">Date Demande</th>
                                <th style="width: auto">Actions</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>