@extends('modals.ModalDeBase')

@section('title', 'Creer un Utilisateur')

@section('NomModal', "modalutilisateur")

@section('size', 'modal-dialog-centered modal-lg')

@section('header')
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

@stop

@section('content')
   {{-- {{$dem_objet_g}} --}}
    <form id="creer_utilisateur" method="POST">
        @csrf
        <div class="mb-3">
            <label for="name" class="form-label">Nom complet</label>
            <input type="text" class="form-control" id="name" name="name" required>
        </div>
        <div class="mb-3">
            <label for="username" class="form-label">Nom d'utilisateur</label>
            <input type="text" class="form-control" id="username" name="username" required>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" name="email" required>
        </div>
        <div class="mb-3">
            <label for="phone_number" class="form-label">Numéro de téléphone</label>
            <input type="text" class="form-control" id="phone_number" name="phone_number">
        </div>
        <div class="mb-3">
            <label for="direction_id" class="form-label">Direction</label>
            <select class="form-control" id="direction_id" name="direction_id" required>
                <option value="">Sélectionner une direction</option>
                @foreach($direction as $direction)
                    <option value="{{ $direction->id }}">{{ $direction->label }}</option>
                @endforeach
            </select>
        </div>
        <div class="mb-3">
            <label for="filliale_id" class="form-label">Direction</label>
            <select class="form-control" id="filliale_id" name="filliale_id" required>
                <option value="">Sélectionner une filliale</option>
                @foreach($filliales as $filliale)
                    <option value="{{ $filliale->id }}">{{ $filliale->label }}</option>
                @endforeach
            </select>
        </div>
        <div class="mb-3">
            <label for="date_embauche" class="form-label">Date d'embauche</label>
            <input type="date" class="form-control" id="date_embauche" name="date_embauche" required>
        </div>
        <div class="mb-3">
            <label for="role" class="form-label">Attribuer un rôle</label>
            <select class="form-control" id="role" name="role" required>
                <option value="">Sélectionner le rôle de l'utilisateur</option>
                <option value="user" {{ old('role') == 'user' ? 'selected' : '' }}>Utilisateur</option>
                <option value="usercomptable" {{ old('role') == 'usercomptable' ? 'selected' : '' }}>Comptable</option>
                <option value="admin" {{ old('role') == 'admin' ? 'selected' : '' }}>Administrateur</option>
                <option value="superadmin" {{ old('role') == 'superadmin' ? 'selected' : '' }}>Super Administrateur</option>
            </select>
        </div>
        <div class="mb-3">
        <label class="form-label">Embauché ?</label>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="isEmbauche" id="isEmbauche" value="1" checked>
                <label class="form-check-label" for="isEmbauche">Oui</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="isEmbauche" id="isEmbauche" value="0">
                <label class="form-check-label" for="isEmbauche">Non</label>
            </div>
        </div>
    </form>
@stop

@section('modalbutton')
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="close" style="border-radius: 20px;">Annuler</button>
    <button type="button" data-lien="{{ route('creer_utilisateur') }}" data-form="creer_utilisateur" class="btn btn-primary envoie_demande" style="border-radius: 20px; background-color: #21301a; color: #ffffff;">Valider</button>
@stop