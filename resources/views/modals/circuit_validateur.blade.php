@extends('modals.ModalDeBase')

@section('title', 'circuit validateur')

@section('NomModal', "modalcircuit")

@section('size', 'modal-dialog-centered')

@section('header')
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

@stop

@section('content')
    <form id="circuit_validateur" method="POST">
        <div class="form-group" style="margin-top: 15px;">
            <label for="label" style="font-weight: bold; color: #000000;">Libelle</label><br>
            <select name="label" id="circuit_validateur_id" class="form-control form-control-sm dataOptions" style="width: 460px;">
                <option selected>--- Choisissez le circuit de validation ---</option>
                @foreach ($direction as $direc)
                    <option value={{$direc->id}}>{{ $direc->label}}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group" style="margin-top: 15px;">
            <label for="filliale_id" style="font-weight: bold; color: #000000;">Filliales</label><br>
            <select name="filliale_id" id="filliale_id" class="form-control form-control-sm dataOptions" style="width: 460px;">
                <option selected disabled>--- Choisissez le lieu de service ---</option>
                @foreach ($filliale as $fil)
                    <option value="{{ $fil->id}}">{{ $fil->label}}</option>
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
    <button type="button" data-lien="{{route('circuit_validateur')}}" data-form="circuit_validateur" class="btn btn-primary envoie_demande" style="border-radius: 20px; background-color: #21301a; color: #ffffff;">Valider</button>
@stop
