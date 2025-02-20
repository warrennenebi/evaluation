@extends('modals.ModalDeBase')

@section('title', 'circuit validateur')

@section('NomModal', "modal_circuit_organe")

@section('size', 'modal-dialog-centered')

@section('header')
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

@stop

@section('content')
    <form id="circuit_validateur">
        <div class="form-group" style="margin-top: 15px;">
            <label for="label" style="font-weight: bold; color: #000000;">Libelle</label><br>
            <select name="label" id="circuit_validateur_id" class="form-control form-control-sm dataOptionsMultiple" style="width: 460px;">
                <option disabled>--- Choisissez la direction ---</option>
                @foreach ($directions as $direc)
                    <option
                    @if($selectcircuitva->first()->label == $direc->id)
                            @selected(true)
                    @endif
                     value="{{$direc->id}}">{{ $direc->label}}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group" style="margin-top: 15px;">
            <label for="filliale_id" style="font-weight: bold; color: #000000;">Filliale</label><br>
            <select name="filliale_id" id="filliale_id" class="form-control form-control-sm dataOptions" style="width: 460px;">
                <option disabled>--- Choisissez le lieu de service ---</option>
                @foreach ($filliales as $filliale)
                    <option
                    @if($selectcircuitva->first()->filliale_id == $filliale->id)
                            @selected(true)
                    @endif
                     value="{{$filliale->id}}">{{ $filliale->label}}</option>
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
    <button type="button" data-lien="{{route('Circuit_validateur.update', [$id])}}" data-form="circuit_validateur" class="btn btn-primary Updatedemande" style="border-radius: 20px; background-color: #21301a; color: #ffffff;">Valider</button>
@stop
