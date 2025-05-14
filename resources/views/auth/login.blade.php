<x-perso-layout>
    <x-slot name="css">
        <!--js scripts-->
        @include('scripts.css_scripts')
        <link rel="stylesheet" href="{{ asset('css/styles.css') }}" />        
    </x-slot>
    <x-slot name="classes">
        bg-primary     
    </x-slot>
    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <div class="w-100" style="flex: 7">
        <div class="col-lg-6">
        </div>
        <div class="col-lg-6 py-9 mx-9">
            <div class="w-100  d-flex align-items-center align-content-stretch justify-content-evenly flex-wrap flex-column p-3">
                <img src="{{ asset('img/logo1.png')}}" class="img-fluid w-60 rounded-circle" alt="...">
                <div class="col-lg-7 p-3">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf
                        <div id="collapseWidthlog">
                            <!-- Email Address -->
                            <div class="col-11">
                                <div class="row mb-2">
                                    <input id="username"  class="form-control fs-5" placeholder="Nom" type="text" name="username" :value="old('username')" required autofocus>
                                </div>
                                <!-- Password -->
                                <div class="row mb-4">
                                    <input id="password" class="form-control fs-5" placeholder="Password" type="password" name="password" required autocomplete="current-password">
                                </div>
                                <div class="row mb-2">
                                    <!-- Remember Me -->
                                    <div class="col-lg">
                                        <label for="remember_me" class="inline-flex items-center text-white">
                                            <input
                                                id="remember_me"
                                                type="checkbox"
                                                class="text-primary border-gray-300 rounded focus:border-primary focus:ring focus:ring-primary dark:border-gray-600 dark:bg-dark-eval-1 dark:focus:ring-offset-dark-eval-1"
                                                name="remember"
                                            >

                                            <span class="ml-2 text-sm text-gray-600 dark:te(xt-gray-400">
                                                {{ __('Rester connecter') }}
                                            </span>
                                        </label>
                                    </div>
                                    <div class="col-lg">
                                        @if (Route::has('password.request'))
                                            <a class="text-sm text-white hover:underline" href="{{ route('password.request') }}">
                                                {{ __('Mot de passe oublié?') }}
                                            </a>
                                        @endif
                                    </div>
                                </div>

                                <div class="row justify-content-end">
                                    <button class="btn btn-sm col-sm-1 px-0" title="Connectez-vous"> 
                                        <i type="submit" class="material-icons px-1 py-2 text-white">&#xe163</i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-12 text-white">
                                <x-input-error :messages="$errors->get('password')" class="mt-2 " />
                                <x-input-error :messages="$errors->get('email')" class="mt-2" />
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
        <!--js scripts-->
        @include('scripts.js_scripts')
    </x-slot>
</x-perso-layout>
