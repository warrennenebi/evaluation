@extends('modals.ModalDeBase')

@section('title', 'Les objets')

@section('NomModal', "modaldemobjet")

@section('size', 'modal-dialog-centered')

@section('header')
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

@stop

@section('content')
    <form id="objet_demande_objet" method="POST">
        <div class="form-group" style="margin-top: 15px;">
            <label for="label" style="font-weight: bold; color: #000000;">Titre de l'objet</label><br>
            <input class="form-control form-control-sm" type="text" name="label" style="width: 460px;" required>
        </div>
        <div class="form-check">
          <label class="form-check-label">
            <input type="checkbox" class="form-check-input" name="Active" id="" value="checkedValue" checked>Active
          </label>
        </div>
        <div class="form-group">
            <input type="text" class="form-control form-control-sm d-none" name="dem_objet_g_id" value="{{$dem_objet_g_id}}" readonly>
        </div>
        <div class="form-group">
            <input type="text" class="form-control form-control-sm d-none" name="dem_objet_sg_id" value="{{$dem_objet_sg_id}}" readonly>
        </div>
    </form>
@stop

@section('modalbutton')
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="close" style="border-radius: 20px;">Annuler</button>
    <button type="button" data-lien="{{route('objet_demande_objet')}}" data-form="objet_demande_objet" class="btn btn-primary envoie_demande" style="border-radius: 20px; background-color: #21301a; color: #ffffff;">Valider</button>
@stop