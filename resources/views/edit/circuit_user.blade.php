@extends('modals.ModalDeBase')

@section('title', 'circuit utiisateur')

@section('NomModal', "modal_circuit_organe_user")

@section('size', 'modal-dialog-centered')

@section('header')
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

@stop

@section('content')
    <form id="circuit_user">
        <div class="form-group" style="margin-top: 15px;">
            <label for="user_id" style="font-weight: bold; color: #000000;">Utilisateur</label><br>
            <select name="user_id" id="user_id" class="form-control form-control-sm dataOptions" style="width: 460px;">
                <option disabled>--- Choisissez l'utilisateur ---</option>
                @foreach ($user as $users)
                    <option
                    @if($selectcircuit->first()->user_id == $users->id)
                            @selected(true)
                    @endif
                     value="{{$users->id}}">{{ $users->name}}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group">
          <label for="order" style="font-weight: bold; color: #000000;">Order</label><br>
          <input type="text" class="form-control form-control-sm" name="order" value="{{$order}}" readonly>
        </div>
        <div class="form-group">
          <input type="text" class="form-control form-control-sm d-none" name="circuit_organe_id" value="{{$circuit}}" readonly>
        </div>
    </form>
@stop

@section('modalbutton')
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="close" style="border-radius: 20px;">Annuler</button>
    <button type="button" data-lien="{{route('Circuit_user.update', [$id])}}" data-form="circuit_user" class="btn btn-primary Updatedemande" style="border-radius: 20px; background-color: #21301a; color: #ffffff;">Valider</button>
@stop
