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
    <div class="mx-auto">

        <div class="btn-group2 m-4 justify-content-center row">

            <div class="btn-group1 text-center col-2">
                <a href="{{ route('parametres.vers', ['circuit']) }}" type="button" class="btn bg-primary text-white">
                Procédure de validation
                </a>
            </div>

            <div class="btn-group1 text-center col-2">
                <a href="{{ route('parametres.vers', ['objet_demande']) }}" type="button" class="btn bg-primary text-white">
                    Objet demandes
                </a>
            </div>

            <div class="btn-group1 text-center col-2">
                <button class="btn bg-primary text-white" style="border: 1px #000000 solid; text-align: center; border-radius: 5px; font-weight: bold; color: #000000;" type="button" data-bs-dismiss="modal" onclick="fopen ('modals/modal_fichier.modalfichier.show.PositionModal1','demande/create')">Demande de Congés</button>
            </div>

        </div>
        {{-- <div class="btn-group2 m-4 justify-content-center row">

            <div class="btn-group1 text-center p-2 col">
                <button type="button" class="btn bg-primary text-white">
                Right-aligned menu example
                </button>
            </div>

            <div class="btn-group1 text-center p-2 col">
                <button type="button" class="btn bg-primary text-white">
                Right-aligned menu example
                </button>
            </div>
                

            <div class="btn-group1 text-center p-2 col">
                <button type="button" class="btn bg-primary text-white">
                Right-aligned menu example
                </button>
            </div>

            <div class="btn-group1 text-center p-2 col">
                <button type="button" class="btn bg-primary text-white">
                Right-aligned menu example
                </button>
            </div>

        </div>
        
        <div class="btn-group2 m-4 justify-content-center row">

            <div class="btn-group1 text-center p-2 col">
                <button type="button" class="btn bg-primary text-white">
                Right-aligned menu example
                </button>
            </div>

            <div class="btn-group1 text-center p-2 col">
                <button type="button" class="btn bg-primary text-white">
                Right-aligned menu example
                </button>
            </div>
                

            <div class="btn-group1 text-center p-2 col">
                <button type="button" class="btn bg-primary text-white">
                Right-aligned menu example
                </button>
            </div>

            <div class="btn-group1 text-center p-2 col">
                <button type="button" class="btn bg-primary text-white">
                Right-aligned menu example
                </button>
            </div>

        </div>
        
        <div class="btn-group2 m-4 justify-content-center row">

            <div class="btn-group1 text-center p-2 col">
                <button type="button" class="btn bg-primary text-white">
                Right-aligned menu example
                </button>
            </div>

            <div class="btn-group1 text-center p-2 col">
                <button type="button" class="btn bg-primary text-white">
                Right-aligned menu example
                </button>
            </div>
                

            <div class="btn-group1 text-center p-2 col">
                <button type="button" class="btn bg-primary text-white">
                Right-aligned menu example
                </button>
            </div>

            <div class="btn-group1 text-center p-2 col">
                <button type="button" class="btn bg-primary text-white">
                Right-aligned menu example
                </button>
            </div>

        </div> --}}

    </div>

</x-app-layout>