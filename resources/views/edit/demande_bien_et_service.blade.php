@extends('modals.ModalDeBase')

@section('title', 'Bien et Services')

@section('NomModal', "modal_1")

@section('size', 'modal-dialog-centered modal-lg')

@section('header')
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

@stop

@section('content')

    <form id="demande_bien_service">
        <input type="number" name="type_demandes_id" class="d-none" value="1" readonly>
        <div class="form-group" id="dem_objet_g" style="margin-top: 15px;">
            <label for="objet" style="font-weight: bold; color: #000000;">Objet</label><br>
            <select id="select1" class="form-control form-control-sm dataOptions" name="objet" style="width: 460px;" required>
                <option disabled>--- Choisissez l'objet de votre demande ---</option>
                @foreach($dem_objet_g as $dem_objet_g)
                        <option
                        @if($selectdemande->first()->objets->first()->classes->dem_objet_g_id == $dem_objet_g->id)
                            @selected(true)
                        @endif
                        value="{{ $dem_objet_g->id}}">{{ $dem_objet_g->label}}
                        </option>
                @endforeach
            </select>
        </div>

        <div class="form-group" id="select2div" style="margin-top: 8px;">
            <select id="select2" class="form-control form-control-sm dataOptions" name="dem_objet_id" style="width: 460px;" required>
                {{-- @foreach($dem_objet as $dem_objet)
                        <optgroup label="{{ $dem_objet->label}}">
                            @foreach($dem_objet->objets as $objets)
                                <option
                                @foreach ($selectdemande->first()->objets as $item)
                                    @if($item->id==$objets->id)
                                        @selected(true)
                                    @endif
                                @endforeach
                                value="{{$objets->id}}">{{$objets->label}}
                                </option>
                            @endforeach
                        </optgroup>
                @endforeach --}}
                <option value="{{$selectdemande->first()->objetsg->first()->id}}">{{$selectdemande->first()->objetsg->first()->label}}</option>
            </select>
        </div>
        <div class="d-flex justify-content-around">
            <div class="form-group" style="margin-top: 15px;">
                <label for="montant" style="font-weight: bold; color: #000000;">Montant de la Demande</label><br>
                <input class="form-control form-control-sm" type="text" name="montant_demande" style="width: 300px;" value="{{$montant_demande}}" required>
            </div>
            <div class="form-group" style="margin-top: 15px;">
                <label for="document" style="font-weight: bold; color: #000000;">Document justificatif</label><br>
                <input class="form-control form-control-sm" type="file" name="document_justificatif" id="document_justificatif" style="width: 300px;" required>
            </div>
        </div>
    </form>
@stop

@section('modalbutton')
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="close" style="border-radius: 20px;">Annuler</button>

    <button type="button" data-lien="{{route('demande.update', [$id])}}" data-form="demande_bien_service"  class="btn btn-primary Updatedemande" style="border-radius: 20px; background-color: #21301a; color: #ffffff;">Valider</button>
@stop
