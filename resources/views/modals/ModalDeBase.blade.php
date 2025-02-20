<!-- Modal Creer-->
<div class="modal fade" id="@yield('NomModal')" data-bs-backdrop="static" data-keyboard="false" aria-labelledby="@yield('NomModal')Label" aria-hidden="true">
    <div class="modal-dialog @yield('size')">
        <div class="modal-content ">
            <div class="modal-header bg-danger">
                <h5 class="modal-title text-white text-center" id="ModalLabel">@yield('title')</h5>
                @yield('header')
            </div>
            <div class="modal-body" id="@yield('NomModal')result">
                @yield('content')
            </div>
            <div class="modal-footer justify-content-between">
                @yield('modalbutton')               
            </div>
        </div>
    </div>
</div>