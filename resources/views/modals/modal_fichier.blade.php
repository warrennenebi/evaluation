@extends('modals.ModalDeBase')

@section('title', 'Model de fichier')

@section('NomModal', "modalfichier")

@section('size', 'modal-dialog-centered')

@section('header')
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

@stop

@section('content')
    <form id="demande_conges" method="POST">
        <input type="number" name="type_demandes_id" class="d-none" value="3" readonly>
        <div class="form-group d-flex" style="margin-top: 15px;">
            <input class="form-control form-control-sm" type="file" name="document_justificatif" id="document_justificatif" style="width: 400px;" multiple required>
            <span role="button" data-ref="" title="Afficher plus" class="material-icons dt_control_expand mx-1">visibility</span>
            <span role="button" data-ref="" title="Charger" class="material-icons dt_control_expand mx-1">upload</span>
            <span role="button" data-ref="" title="Télécharger" class="material-icons dt_control_expand mx-1">download</span>
        </div>
        <object data="" type="application/pdf" width="100%" height="500px">

        </object>
    </form>
@stop

@section('modalbutton')
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="close" style="border-radius: 20px;">Annuler</button>
    <button type="button" data-lien="{{route('enregistrement_demande')}}" data-form="demande_conges" class="btn btn-primary envoie_demande" style="border-radius: 20px; background-color: #21301a; color: #ffffff;">Valider</button>
@stop