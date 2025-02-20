@extends('modals.ModalDeBase')

@section('title', 'Ajouter un centre')

@section('NomModal', "modaldemande")

@section('size', 'modal-dialog-centered')

@section('header')
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

@stop

@section('content')
   {{-- {{$dem_objet_g}} --}}
    <form id="demande_bien_service" method="POST" enctype="multipart/form-data">
        @csrf

        <input type="number" name="type_demandes_id" class="d-none" value="1" readonly>
        <div class="form-group" id="commune" style="margin-top: 15px;">
            <label for="commune" style="font-weight: bold; color: #000000;">Communes</label><br>
            <select id="select1" class="form-control form-control-sm dataOptions" name="commune_id" style="width: 460px;" required>
                <option selected disabled>--- Choisissez la commune concerné ---</option>
                @foreach($communes as $commune)
                        <option value="{{ $commune->id}}">{{ $commune->label}}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group" style="margin-top: 15px;">
            <label for="nom_centre" style="font-weight: bold; color: #000000;">Nom du centre</label><br>
            <input class="form-control form-control-sm" type="text" name="nom_centre" style="width: 460px;" required>
            <div class="form-group" style="margin-top: 15px;">
                <label for="type" style="font-weight: bold; color: #000000;">Types</label><br>
                <div class="row">
                    @foreach($types as $type)
                        <div class="col-md-6 pr-0">
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox" value="{{ $type->id}}" id="type_{{ $type->id }}" name="type_id[]">
                                    {{ $type->label}}
                                </label>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
        <div class="form-group" style="margin-top: 15px;">
            <label for="localisation" style="font-weight: bold; color: #000000;">Localisation</label><br>
            <input class="form-control form-control-sm" type="text" name="localisation" style="width: 460px;" required>
        </div>
        <div class="form-group" style="margin-top: 15px;">
            <label for="contact" style="font-weight: bold; color: #000000;">Contacts</label><br>
            <input class="form-control form-control-sm" type="text" name="contact" style="width: 460px;" required>
        </div>
    </form>
@stop

@section('modalbutton')
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="close" style="border-radius: 20px;">Annuler</button>
    <button type="button" data-lien="{{route('enregistrement_clinique')}}" data-form="demande_bien_service" class="btn btn-primary envoie_demande" style="border-radius: 20px; background-color: #21301a; color: #ffffff;">Valider</button>
@stop
