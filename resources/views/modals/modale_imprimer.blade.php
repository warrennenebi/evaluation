@extends('modals.ModalDeBase')

@section('title', 'Impression des centres')

@section('NomModal', "modalimprimer")

@section('size', 'modal-dialog-centered modal-xl')

@section('header')
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
    <div>
        <a type="button" class="btn btn-success" name="Imprimer" href="{{route('imprime')}}">Imprimer</a>
        <input type="button" class="btn btn-default text-white" aria-label="close" data-bs-dismiss="modal" value="Fermer">
    </div>
@stop

@section('content')
    <div id="modalContent" class="bd-example table-responsive">
        <span id="refReseauDeSoinTable" class="tabletoget d-none" style="color: #ffffff; display: none;">ReseauDeSoinTable</span>
        {{-- {{$communes}} --}}

        @foreach($reseaus as $type => $villes)
            <h3 style="font-weight: bold; background-color: #21301a; text-align: center; color: #ffffff;">RESEAUX DE SOINS {{ mb_strtoupper($type) }}</h3>

            @foreach($villes as $ville => $communes)
                <h4 style="font-weight: bold; text-align: center; color: #21301a;">{{ mb_strtoupper($ville) }}</h4>

                @foreach($communes as $keysreseau => $commune)
                    <h5 style="font-weight: bold; background-color: #21301a; text-align: center; color: #ffffff;">{{ mb_strtoupper($keysreseau) }}</h5>
                    <table class="table table-bordered table-sm applyDataTablesTo" style="width: 100%;" id="ReseauDeSoinTable">
                        <thead>
                            <tr style="background-color: #be1d2e; color: #ffffff; text-align: center;">
                                <th>Etablissement</th>
                                <th>Localisation</th>
                                <th>Contacts</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($commune as $reseausoin)
                                <tr>
                                    <td>{{ mb_strtoupper($reseausoin->nom_centre) }}</td>
                                    <td>{{ $reseausoin->localisation }}</td>
                                    <td>{{ $reseausoin->contact }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>

                    {{-- Saut de page après chaque commune --}}
                    <div style="page-break-after: always;"></div>
                @endforeach
            @endforeach
        @endforeach
    </div>
@stop

@section('modalbutton')

@stop