@extends('modals.ModalDeBase')

@section('title', 'Visualisation du justificatif')

@section('NomModal', "justif")

@section('size', 'modal-lg')

@section('header')
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

@stop

@section('content')
    @foreach ($document as $item)
        @if(pathinfo($item, PATHINFO_EXTENSION) === 'docx')
            <iframe src="https://docs.google.com/gview?url={{URL::to('/').'/'.$item}}&embedded=true" style="width:100%; height:500px;" frameborder="0"></iframe>
        @else
        <object data="{{$item}}" type="application/pdf" width="100%" height="500px">

        </object>
        @endif
    @endforeach
@stop

@section('modalbutton')
    <button type="button" class="btn btn-danger ms-auto" data-bs-dismiss="modal" aria-label="close" style="border-radius: 20px;">Fermer</button>
@stop