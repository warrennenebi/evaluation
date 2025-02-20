@extends('modals.ModalDeBase')

@section('title', 'organe validateur')

@section('NomModal', "modal_organevalid")

@section('size', 'modal-dialog-centered')

@section('header')
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

@stop

@section('content')
    <form id="organe_validateur">
        <div class="form-group" style="margin-top: 15px;">
            <label for="label" style="font-weight: bold; color: #000000;">Libelle</label><br>
            <select name="label" id="organe_validateur_id" class="form-control form-control-sm dataOptions" style="width: 460px;">
                <option disabled>--- Choisissez un organe ---</option>
                @foreach ($type_demande as $types)
                    <option
                    @if($selectorgane->first()->label == $types->id)
                        @selected(true)
                    @endif
                    value="{{$types->id}}"> {{$types->label}}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group" style="margin-top: 15px;">
            <label for="filliale_id" style="font-weight: bold; color: #000000;">Libelle</label><br>
            <select name="filliale_id" id="filliale_id" class="form-control form-control-sm dataOptions" style="width: 460px;">
                <option selected disabled>--- Choisissez un organe ---</option>
                @foreach ($filliales as $fillia)
                    <option
                    @if($selectorgane->first()->label == $fillia->id)
                        @selected(true)
                    @endif
                    value="{{$fillia->id}}"> {{$fillia->label}}</option>
                @endforeach
            </select>
        </div>
        <div class="form-check">
          <label class="form-check-label">
            <input type="checkbox" class="form-check-input" name="Active" id="" value="checkedValue" checked>Active
          </label>
        </div>
    </form>
@stop

@section('modalbutton')
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="close" style="border-radius: 20px;">Annuler</button>
    <button type="button" data-lien="{{route('organe_validateur.update', [$id])}}" data-form="organe_validateur" class="btn btn-primary Updatedemande" style="border-radius: 20px; background-color: #21301a; color: #ffffff;">Valider</button>
@stop
