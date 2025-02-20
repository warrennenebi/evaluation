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

    <div class="containt row">
        <div class="accordion accordion-flush col" id="accordionFlushExample">
            @foreach($parametres as $key=>$parametre)
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne{{$key}}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne{{$key}}" aria-expanded="false" aria-controls="flush-collapseOne{{$key}}">
                            Liste des circuits de validations {{$parametre->label}}
                        </button>
                    </h2>
                    <div id="flush-collapseOne{{$key}}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne{{$key}}" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <h6>Cet espace sert à configurer le(s) elements de circuit de validation.</h6>
                            <div class="btn">
                                <button class="btn btn-sn btn-primary" type="button" data-bs-toggle="modal" onclick="fopen ('modals/circuit_validateur.modalcircuit.show.PositionModal1','circuit/create')">Nouveau</button>
                            </div>
                            <div class="bd-example">
                                <span id="refTableauCircuitValidation{{$key}}" class="tabletoget d-none">TableauCircuitValidation{{$key}}</span>
                                <table class="table table-bordered w-100 applyDataTablesTo" id="TableauCircuitValidation{{$key}}">
                                    <thead>
                                        <tr style="background-color: #0080ff; color: #ffffff; text-align: center;">
                                            <th class="w-7"></th>
                                            <th class="w-2">N°</th>
                                            <th class="w-7">#</th>
                                            <th class="w-auto">Libelle</th>
                                            <th class="w-7"></th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        <div class="accordion accordion-flush col" id="accordionFlushExample1">
            @foreach($organes as $key=>$organe)
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne{{$key}}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne{{$key}}" aria-expanded="false" aria-controls="flush-collapseOne{{$key}}">
                            Composition des organes de validations {{$organe->label}}
                        </button>
                    </h2>
                    <div id="flush-collapseOne{{$key}}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne{{$key}}" data-bs-parent="#accordionFlushExample1">
                        <div class="accordion-body">
                            <h6>Cet espace sert à configurer le(s) organes de validation.</h6>
                            <div class="btn">
                                <button class="btn btn-sn btn-primary" type="button" data-bs-toggle="modal" onclick="fopen ('modals/organe_validateur.modalorgane.show.PositionModal1','organe/create')">Nouveau</button>
                            </div>
                            <div class="bd-example">
                                <span id="refTableauOrganeValidateur{{$key}}" class="tabletoget d-none">TableauOrganeValidateur{{$key}}</span>
                                <table class="table table-bordered w-100 applyDataTablesTo" id="TableauOrganeValidateur{{$key}}">
                                    <thead>
                                        <tr style="background-color: #be1d2e; color: #ffffff; text-align: center;">
                                            <th class="w-7"></th>
                                            <th class="w-7">N°</th>
                                            <th class="w-7">#</th>
                                            <th class="w-72">Libelle</th>
                                            <th class="w-7"></th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>

</x-app-layout>