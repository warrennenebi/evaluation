
    {{-- <div class="flex flex-row justify-self-center">
        <div class="flex-grow flex-shrink-0 justify-between">
            <div class="image w-1/2 p-0 m-0 object-cover">
                <img src="images/broker.png" alt="" class="self-center m-auto object-cover" />
            </div>
            <div class="w-1/1"> --}}
                <x-guest-layout>
                    <x-auth-card>
                        <!-- Session Status -->
                        <x-auth-session-status class="mb-4" :status="session('status')" />

                        <!-- Validation Errors -->
                        <x-auth-validation-errors class="mb-4" :errors="$errors" />

        
                        <form method="POST" action="{{ route('login') }}">
                            @csrf

                            <div class="grid gap-6">
                                <!-- Email/login Address -->
                                <div class="space-y-2">
                                    <x-form.label
                                        for="login"
                                        :value="__('Login')"
                                    />

                                    <x-form.input-with-icon-wrapper>
                                        <x-slot name="icon">
                                            <x-heroicon-o-mail aria-hidden="true" class="w-5 h-5" />
                                        </x-slot>

                                        <x-form.input
                                            withicon
                                            id="username"
                                            class="block w-full"
                                            type="text"
                                            name="username"
                                            :value="old('username')"
                                            placeholder="{{ __('login') }}"
                                            required
                                            autofocus
                                        />
                                    </x-form.input-with-icon-wrapper>
                                </div>

                                <!-- Password -->
                                <div class="space-y-2">
                                    <x-form.label
                                        for="password"
                                        :value="__('Password')"
                                    />

                                    <x-form.input-with-icon-wrapper>
                                        <x-slot name="icon">
                                            <x-heroicon-o-lock-closed aria-hidden="true" class="w-5 h-5" />
                                        </x-slot>

                                        <x-form.input
                                            withicon
                                            id="password"
                                            class="block w-full"
                                            type="password"
                                            name="password"
                                            required
                                            autocomplete="current-password"
                                            placeholder="{{ __('Password') }}"
                                        />
                                    </x-form.input-with-icon-wrapper>
                                </div>

                                <!-- Remember Me -->
                                <div class="flex items-center justify-between">
                                    <label for="remember_me" class="inline-flex items-center">
                                        <input
                                            id="remember_me"
                                            type="checkbox"
                                            class="text-primary border-gray-300 rounded focus:border-primary focus:ring focus:ring-primary dark:border-gray-600 dark:bg-dark-eval-1 dark:focus:ring-offset-dark-eval-1"
                                            name="remember"
                                        >

                                        <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                            {{ __('Rester connecter') }}
                                        </span>
                                    </label>

                                    @if (Route::has('password.request'))
                                        <a class="text-sm text-blue-500 hover:underline" href="{{ route('password.request') }}">
                                            {{ __('Mot de passe oublié?') }}
                                        </a>
                                    @endif
                                </div>

                                <div>
                                    <x-button class="justify-center w-full gap-2">
                                        <x-heroicon-o-login class="w-6 h-6" aria-hidden="true" />

                                        <span>{{ __('Connexion') }}</span>
                                    </x-button>
                                </div>

                                {{-- @if (Route::has('register'))
                                    <p class="text-sm text-gray-600 dark:text-gray-400">
                                        {{ __('Don’t have an account?') }}
                                        <a href="{{ route('register') }}" class="text-blue-500 hover:underline">
                                            {{ __('Register') }}
                                        </a>
                                    </p>
                                @endif --}}
                            </div>
                        </form>
                    </x-auth-card>
                </x-guest-layout>
            {{-- </div>
        </div>
    </div>     --}}


<div class="row d-flex w-100" style="flex: 7">
        <div class="col-lg-6">
            <img src="{{ asset('img/logo2.png')}}" class="img-fluid w-60" alt="...">
        </div>
        <div class="col-lg-6 d-flex flex-column">
            <div class="row w-100 justify-content-end p-3" style="flex: 0.6;">
                <div class="col-lg-12 p-3">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf
                        <div class="row justify-content-end align-items-center" id="collapseWidthlog">
                            <!-- Email Address -->
                            <div class="col-lg-6">
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
                                    <button class="btn btn-sm col-sm-1 px-0" > 
                                        <i type="submit" class="material-icons px-1 py-2 text-white">&#xeaaa</i>
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
            <div class="row align-items-start pt-1">
                <div class="col-lg text-white fs-1">
                    <p class="mb-2">DEMANDE :</p>
                    <p class="mb-4 fs-3" style="margin-left: 15rem;">ABSENCES</p>
                    <p class="mb-4 fs-3" style="margin-left: 15rem;">BIENS ET SERVICES</p>
                    <p class="mb-4 fs-3" style="margin-left: 15rem;">CONGÉS</p>
                    <p class="mb-4 fs-3" style="margin-left: 15rem;">PERMISSIONS</p>
                </div>
            </div>
        </div>        
    </div>