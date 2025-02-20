@extends('modals.ModalDeBase')

@section('title', 'Analyse de demande')

@section('NomModal', "modalanalyse")

@section('size', 'modal-dialog-centered')

@section('header')
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

@stop

@section('content')
    <form id="traitement_demande">
        <div class="form-group">
            <label for="avis" style="font-weight: bold; color: #000000;">Avis</label><br>
            <select name="statut" id="statut" class="form-control form-control-sm" style="width: 460px;" required>
                <option value="1">Validée</option>
                <option value="2">Non Validée</option>
            </select>
        </div>
        @can('payement')
            @if($demandes->contains(1))
                <div class="form-group" id="modepayement">
                    <label for="payement" style="font-weight: bold; color: #000000;">Methode de payement</label><br>
                    <select name="payement" id="payement" class="form-control form-control-sm dataOptions" style="width: 460px;" required>
                        <option selected disabled>--- Mode de payement ---</option>
                        <option value="1">Chèque</option>
                        <option value="2">Virement</option>
                        <option value="3">Visa card</option>
                        <option value="4">Orange money</option>
                    </select>
                </div>
            @endif
        @endcan
        <div class="form-group" style="margin-top: 18px;">
            <label for="detail" style="font-weight: bold; color: #000000;">Motif</label><br>
            <textarea class="form-control form-control-sm" id="motif" name="motif" style="width: 460px; height: 199px;" required></textarea>
        </div>
    </form>
@stop

@section('modalbutton')
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="close" style="border-radius: 20px;">Annuler</button>
    <button type="button" data-lien="{{route('analyse_demande.update', [$id])}}" data-form="traitement_demande" class="btn btn-primary Updatedemande" style="border-radius: 20px; background-color: #21301a; color: #ffffff;">Valider</button>
@stop