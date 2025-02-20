@extends('modals.ModalDeBase')

@section('title', 'Absence')

@section('NomModal', "modal_4")

@section('size', 'modal-dialog-centered')

@section('header')
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

@stop

@section('content')

   {{-- {{ dd($filliales) }} --}}
    <form id="demande_absence" method="POST">
        <input type="number" name="type_demandes_id" class="d-none" value="4" readonly>
            @if($user->isEmbauche != 0)
                <div class="form-group" id="dem_objet_g" style="margin-top: 15px;">
                    <label for="objet" style="font-weight: bold; color: #000000;">Raison de l'absence</label><br>
                    <select id="selectpermission" class="form-control form-control-sm dataOptions" name="dem_objet_id" style="width: 460px;" required>
                        <option disabled>--- Choisissez le motif de votre abscence ---</option>
                        @foreach($dem_objet->whereNotNull('nombre_de_jour')->where('nombre_de_jour', '=', 0) as $dem_objet)
                                <option
                                @if($selectdemande->first()->objets->first()->id == $dem_objet->id)
                                    @selected(true)
                                @endif
                                value="{{ $dem_objet->id}}">{{ $dem_objet->label}}
                                </option>
                        @endforeach
                    </select>
                </div>
            @else
                <div class="form-group" style="margin-top: 15px;">
                    <label for="motif_permi" style="font-weight: bold; color: #000000;">Motif</label><br>
                    <!-- L'input de type texte s'affiche si user->isembauche est égal à zéro -->
                    <input type="text" id="motif_permi" name="motif_permi" class="form-control form-control-sm" value="{{$motif_permi}}" style="width: 460px;" required>
                </div>
            @endif
            <div class="form-group" style="margin-top: 25px;">
                <label for="date_depart" style="font-weight: bold; color: #000000;">Date de départ</label><br>
                <input class="form-control form-control-sm" type="date" id="date_depart" name="date_depart" style="width: 460px;" value="{{$date_depart}}" required>
            </div>
            <div class="form-group" style="margin-top: 25px;">
                <label for="date_fin" style="font-weight: bold; color: #000000;">Date de fin</label><br>
                <input class="form-control form-control-sm" type="date" id="date_fin" name="date_fin" style="width: 460px;" value="{{$date_fin}}" required>
            </div>
            <div class="form-group" style="margin-top: 15px;">
                <label for="document" style="font-weight: bold; color: #000000;">Document justificatif</label><br>
                <input class="form-control form-control-sm" type="file" name="document_justificatif" id="document_justificatif" style="width: 460px;" required>
            </div>
    </form>

    <div id="message" class="mt-3" style="display: none;"></div>
@stop

@section('modalbutton')
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="close" style="border-radius: 20px;">Annuler</button>
    <button type="button" data-lien="{{route('demande.update', [$id])}}" data-form="demande_absence" class="btn btn-primary envoie_demande" style="border-radius: 20px; background-color: #21301a; color: #ffffff;">Valider</button>
@stop
