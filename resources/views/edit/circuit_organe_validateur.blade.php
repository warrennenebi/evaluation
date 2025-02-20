@extends('modals.ModalDeBase')

@section('title', 'circuit organe validateur')

@section('NomModal', "modal_circuitorganevalidateur")

@section('size', 'modal-dialog-centered')

@section('header')
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

@stop

@section('content')
    <form id="circuit_organe_validateur">
        <div class="form-group" style="margin-top: 15px;">
            <label for="label" style="font-weight: bold; color: #000000;">Libelle</label><br>
            <select name="circuit_organe_id" id="circuit_organe_id" class="form-control form-control-sm dataOptions" style="width: 460px;">
                <option disabled>--- Choisissez le circuit de validation ---</option>
                @foreach ($types as $circuit)
                    <option
                    @if($selectorgane->first()->circuit_organe_id == $circuit->id)
                            @selected(true)
                    @endif
                     value="{{$circuit->id}}">{{ $circuit->direction->label}}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group">
          <label for="order" style="font-weight: bold; color: #000000;">Order</label><br>
          <input type="text" class="form-control form-control-sm" name="order" value="{{$order}}" readonly>
        </div>
        <div class="form-check">
          <label class="form-check-label">
            <input type="checkbox" class="form-check-input" name="Active" id="" value="checkedValue" checked>Active
          </label>
        </div>
        <div class="form-group">
            <input type="text" class="form-control form-control-sm d-none" name="organe_validateur_id" value="{{$organe}}" readonly>
        </div>
    </form>
@stop

@section('modalbutton')
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="close" style="border-radius: 20px;">Annuler</button>
    <button type="button" data-lien="{{route('circuit_organe_validateur.update', [$id])}}" data-form="circuit_organe_validateur" class="btn btn-primary Updatedemande" style="border-radius: 20px; background-color: #21301a; color: #ffffff;">Valider</button>
@stop
