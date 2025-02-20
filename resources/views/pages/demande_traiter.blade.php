<x-app-layout>

    <x-slot name="header">
        {{-- <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Finances') }}
        </h2> --}}

        <ul class="nav nav-tabs" id="myTab" role="tablist">
            @foreach($demande_traiter as $key=>$dem)
                    <li class="nav-item" role="presentation">
                        <button class="nav-link @if($key==0) active @endif" id="home-tab{{$key}}" data-bs-toggle="tab" data-bs-target="#home{{$key}}" type="button" role="tab" aria-controls="home{{$key}}" aria-selected="@if($key==0) true @else false @endif">{{$dem->label}}</button>
                    </li>
            @endforeach
        </ul>

    </x-slot>

    <div class="tab-content" id="myTabContent">
        @foreach($demande_traiter as $key=>$dem)
                <div class="max-w-8xl mx-auto sm:px-8 lg:px-6 tab-pane fade @if($key==0) show active @endif"  role="tabpanel" id="home{{$key}}" aria-labelledby="home-tab{{$key}}">
                    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div class="p-4 text-gray-900">
                            {{-- {{ __("You're logged in!") }} --}}

                            
                            <div class="bd-example table-responsive">
                                <span id="refTraitementDemandesTable{{$key}}" class="tabletoget d-none">TraitementDemandesTable{{$key}}</span>
                                <table class="table table-bordere w-100 applyDataTablesTo" id="TraitementDemandesTable{{$key}}">
                                    <thead>
                                        <tr style="background-color: #0080ff; color: #ffffff; text-align: center;">
                                            <th style="width: auto"></th>
                                            <th style="width: auto">N°</th>
                                            <th style="width: auto">Type</th>
                                            <th style="width: auto" class="oneline">Demande N°</th>
                                            <th style="width: auto" class="oneline">Nom demandeur</th>
                                            <th style="width: auto; text-align: center;">Objet</th>
                                            <th style="width: auto">Satut</th>
                                            <th style="width: auto" class="oneline">Date Demande</th>
                                        </tr>
                                    </thead>
                                    {{-- <tbody>
                                    
                                    </tbody> --}}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        @endforeach
    </div>
    
</x-app-layout>
