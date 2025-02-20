
@extends('modals.ModalDeBase')

@section('title', 'Conge')

@section('NomModal', "modal_3")

@section('size', 'modal-dialog-centered')

@section('header')
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

@stop

@section('content')
    <form id="demande_conges">
        <input type="number" name="type_demandes_id" class="d-none" value="3" readonly>
        <div class="row">
            <div class="form-group col" id="dem_objet_g" style="margin-top: 15px;">
                <label for="objet" style="font-weight: bold; color: #000000;">Objet</label><br>
                <select id="selects" class="form-control form-control-sm dataOptions" name="dem_objet_id" required>
                    <option selected disabled>--- Choisissez l'objet de votre demande ---</option>
                    @foreach($dem_objet->whereNotNull('nombre_de_jour')->where('nombre_de_jour', '>=', 15) as $dem_objet)
                        <option 
                        @if($selectdemande->first()->objets->first()->id == $dem_objet->id) 
                            @selected(true) 
                        @endif 
                        value="{{ $dem_objet->id}}"  data-jour="{{$dem_objet->nombre_de_jour }}"> {{ $dem_objet->label}}
                        </option>
                    @endforeach
                </select>
            </div>
        </div>
        <div class="row">
            <div class="form-group col" id="jour_conger" style="margin-top: 25px; display: none;">
                <label for="numb_de_jours" style="font-weight: bold; color: #000000;">Nombres de jours souhaité</label><br>
                <select class="form-control form-control-sm dataOptions" id="nombre_de_jours" name="nombre_de_jours" required>
                    <option value="NULL" disabled>--- Choisissez le nombre de jour que vous souhaitez ---</option>
                    @for ($i = 1; $i <= ($retVal = ($user->jour_de_conger > 15) ? 15 : $user->jour_de_conger); $i++)
                        <option value="{{ $i }}" @if(isset($user->nombre_de_jours) && $user->nombre_de_jours == $i)
                                @selected(true)
                            @endif>
                            {{ $i }}
                        </option>
                    @endfor
                </select>
            </div>
        </div>
        <div class="row">
            <div class="form-group col" style="margin-top: 25px;">
                <label for="date_depart" style="font-weight: bold; color: #000000;">Date de départ</label><br>
                <input class="form-control form-control-sm" type="date" id="date_depart" name="date_depart" value="{{$date_depart}}" required>
            </div>
        </div>
        <div class="row">
            <div class="form-group col" style="margin-top: 25px;">
                <label for="date_fin" style="font-weight: bold; color: #000000;">Date de fin</label><br>
                <input class="form-control form-control-sm" type="date" id="date_fin" name="date_fin" value="{{$date_fin}}" readonly>
            </div>
        </div>
        <div class="form-group" style="margin-top: 25px;">
            <p id="message" class="text-primary" style="font-size: 18px;text-align: center;"></p>
        </div>
    </form>
@stop

@section('modalbutton')
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="close" style="border-radius: 20px;">Annuler</button>

    <button type="button" data-lien="{{route('demande.update', [$id])}}" data-form="demande_conges" class="btn btn-primary Updatedemande" style="border-radius: 20px; background-color: #21301a; color: #ffffff;">Valider</button>
@stop
