<x-perso-layout>
    <x-slot name="css">
        @include('scripts.css_scripts')
        <link rel="stylesheet" href="{{ asset('css/styles.css') }}" />        
    </x-slot>
    <x-slot name="classes">
        bg-primary     
    </x-slot>

    <div class="row d-flex w-100" style="flex: 7">
        <div class="col-lg-6">
            <img src="{{ asset('img/logo2.png')}}" class="img-fluid w-60" alt="...">
        </div>
        <div class="col-lg-6 d-flex flex-column">
            <div class="row w-100 justify-content-end p-3" style="flex: 0.6;">
                <div class="col-lg-12 p-3">
                    <form method="POST" action="{{ route('register') }}">
                        @csrf
                        <div class="row justify-content-end align-items-center">
                            <div class="col-lg-6">
                                <div class="row mb-2">
                                    <input id="name" class="form-control fs-5" placeholder="Nom et prenom" type="text" name="name" required autofocus>
                                </div>
                                <div class="row mb-2">
                                    <input id="email" class="form-control fs-5" placeholder="Email" type="email" name="email" required>
                                </div>
                                <div class="row mb-2">
                                    <input id="password" class="form-control fs-5" placeholder="Mot de passe" type="password" name="password" required>
                                </div>
                                <div class="row mb-2">
                                    <input id="password_confirmation" class="form-control fs-5" placeholder="Confirmer le mot de passe" type="password" name="password_confirmation" required>
                                </div>
                                <div class="row mb-2">
                                    <input id="phone_number" class="form-control fs-5" placeholder="Numéro de téléphone" type="text" name="phone_number" required>
                                </div>
                                <div class="row mb-2">
                                    <input id="ville" class="form-control fs-5" placeholder="Ville" type="text" name="ville" required>
                                </div>
                                <div class="row mb-2">
                                    <input id="date_embauche" class="form-control fs-5" placeholder="Date d'embauche" type="date" name="date_embauche" required>
                                </div>
                                <div class="row mb-2">
                                    <select id="directions_id" class="form-control fs-5" name="directions_id">
                                        <option value="">Sélectionnez une direction</option>
                                    </select>
                                </div>
                                <div class="row mb-2">
                                    <select id="pays_id" class="form-control fs-5" name="pays_id">
                                        <option value="">Sélectionnez un pays</option>
                                        <!-- Ajouter les options dynamiquement -->
                                    </select>
                                </div>
                                <div class="row mb-2">
                                    <select id="filliale_id" class="form-control fs-5" name="filliale_id">
                                        <option value="">Sélectionnez une filiale</option>
                                        <!-- Ajouter les options dynamiquement -->
                                    </select>
                                </div>
                                <div class="col-lg">
                                    <a href="{{ route('login') }}" class="text-sm text-white hover:underline">
                                        {{ __('J\'ai déjà un compte') }}
                                    </a>
                                </div>
                                <div class="row justify-content-end">
                                    <button class="btn btn-sm col-sm-1 px-0" type="submit"> 
                                        <i class="material-icons px-1 py-2 text-white">&#xe163;</i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-12 text-white">
                                <x-input-error :messages="$errors->all()" class="mt-2" />
                            </div>
                        </div>
                    </form>
                </div>               
            </div>
        </div>        
    </div>
    <div class="row bottom-row bg-primary text-white w-100" style="flex: 0.3;">
        <div class="col-lg-12 text-center">©Copyright ADVICE CONSULTING - DEMANDE DE BIEN ET SERVICE</div>        
    </div>
    <x-slot name="jsScript">
        @include('scripts.js_scripts')
    </x-slot>
</x-perso-layout>
