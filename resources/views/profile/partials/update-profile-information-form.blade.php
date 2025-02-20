<section>
    <header>
        <h2 class="text-lg font-medium">
            {{ __('Profile Information') }}
        </h2>

        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {{ __("Update your account's profile information and email address.") }}
        </p>
    </header>

    <form id="send-verification" method="post" action="{{ route('verification.send') }}">
        @csrf
    </form>

    <form
        method="post"
        action="{{ route('profile.update') }}"
        class="mt-6 space-y-6"
    >
        @csrf
        @method('patch')
        <div class="d-flex justify-content-between">

            <div class="space-y-2">
                <x-form.label
                    for="name"
                    :value="__('Name')"
                />

                <x-form.input
                    id="name"
                    name="name"
                    type="text"
                    class="block w-full"
                    :value="old('name', $user->name)"
                    required
                    autofocus
                    autocomplete="name"
                />

                <x-form.error :messages="$errors->get('name')" />
            </div>

            <div class="space-y-2">
                <x-form.label
                    for="filliale"
                    :value="__('Filliale')"
                />

                <x-form.input
                    id="filliale"
                    name="filliale"
                    type="text"
                    class="block w-full"
                    :value="old('name', $profile->filliale->label)"
                    required
                    autofocus
                    autocomplete="filliale"
                />

                <x-form.error :messages="$errors->get('filliale')" />
            </div>

            <div class="space-y-2">
                <x-form.label
                    for="numb"
                    :value="__('Numéro de Piéce')"
                />

                <x-form.input
                    id="numb"
                    name="numb"
                    type="text"
                    class="block w-full"
                    :value="old('name')"
                    required
                    autofocus
                    autocomplete="numb"
                />

                <x-form.error :messages="$errors->get('numb')" />
            </div>

        </div>
        
        <div class="d-flex justify-content-between">

            <div class="space-y-2">
                <x-form.label
                    for="date_nais"
                    :value="__('Date de Naissance')"
                />

                <x-form.input
                    id="date_nais"
                    name="date_nais"
                    type="date"
                    class="block w-full"
                    :value="old('name')"
                    required
                    autofocus
                    autocomplete="date_nais"
                />

                <x-form.error :messages="$errors->get('date_nais')" />
            </div>

            <div class="space-y-2">
                <x-form.label
                    for="civilite"
                    :value="__('Civilité')"
                />

                <x-form.input
                    id="civilite"
                    name="civilite"
                    type="text"
                    class="block w-full"
                    :value="old('name')"
                    required
                    autofocus
                    autocomplete="civilite"
                />

                <x-form.error :messages="$errors->get('civilite')" />
            </div>

            <div class="space-y-2">
                <x-form.label
                    for="localite"
                    :value="__('Localité')"
                />

                <x-form.input
                    id="localite"
                    name="localite"
                    type="text"
                    class="block w-full"
                    :value="old('name')"
                    required
                    autofocus
                    autocomplete="localite"
                />

                <x-form.error :messages="$errors->get('localite')" />
            </div>

        </div>

        <div class="d-flex justify-content-between">

            <div class="space-y-2">
                <x-form.label
                    for="fonction"
                    :value="__('Fonction')"
                />

                <x-form.input
                    id="fonction"
                    name="fonction"
                    type="text"
                    class="block w-full"
                    :value="old('name')"
                    required
                    autofocus
                    autocomplete="fonction"
                />

                <x-form.error :messages="$errors->get('fonction')" />
            </div>

            <div class="space-y-2">
                <x-form.label
                    for="directions"
                    :value="__('Directions')"
                />

                <x-form.input
                    id="directions"
                    name="directions"
                    type="text"
                    class="block w-full"
                    :value="old('directions', $profile->directions->label)"
                    required
                    autofocus
                    autocomplete="directions"
                />

                <x-form.error :messages="$errors->get('directions')" />
            </div>

            <div class="space-y-2">
                <x-form.label
                    for="email"
                    :value="__('Email')"
                />

                <x-form.input
                    id="email"
                    name="email"
                    type="email"
                    class="block w-full"
                    :value="old('email', $user->email)"
                    required
                    autocomplete="email"
                />

                <x-form.error :messages="$errors->get('email')" />

                @if ($user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail && ! $user->hasVerifiedEmail())
                    <div>
                        <p class="text-sm mt-2 text-gray-800 dark:text-gray-300">
                            {{ __('Your email address is unverified.') }}

                            <button form="send-verification" class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  dark:text-gray-400 dark:hover:text-gray-200 dark:focus:ring-offset-gray-800">
                                {{ __('Click here to re-send the verification email.') }}
                            </button>
                        </p>

                        @if (session('status') === 'verification-link-sent')
                            <p class="mt-2 font-medium text-sm text-green-600">
                                {{ __('A new verification link has been sent to your email address.') }}
                            </p>
                        @endif
                    </div>
                @endif
            </div>

        </div>
        
        <div class="d-flex justify-content-between">

            <div class="space-y-2">
                <x-form.label
                    for="compagny"
                    :value="__('Compagnie')"
                />

                <x-form.input
                    id="compagny"
                    name="compagny"
                    type="text"
                    class="block w-full"
                    :value="old('compagny')"
                    required
                    autofocus
                    autocomplete="compagny"
                />

                <x-form.error :messages="$errors->get('compagny')" />
            </div>

            <div class="space-y-2">
                <x-form.label
                    for="adress"
                    :value="__('Adresse')"
                />

                <x-form.input
                    id="adress"
                    name="adress"
                    type="text"
                    class="block w-full"
                    :value="old('adress')"
                    required
                    autofocus
                    autocomplete="adress"
                />

                <x-form.error :messages="$errors->get('adress')" />
            </div>

            <div class="space-y-2">
                <x-form.label
                    for="pays"
                    :value="__('Pays')"
                />

                <x-form.input
                    id="pays"
                    name="pays"
                    type="text"
                    class="block w-full"
                    :value="old('pays')"
                    required
                    autofocus
                    autocomplete="pays"
                />

                <x-form.error :messages="$errors->get('pays')" />
            </div>

        </div>
        
        <div class="d-flex justify-content-between">

            <div class="space-y-2">
                <x-form.label
                    for="contact_1"
                    :value="__('Contact 1')"
                />

                <x-form.input
                    id="contact_1"
                    name="contact_1"
                    type="text"
                    class="block w-full"
                    :value="old('contact_1')"
                    required
                    autofocus
                    autocomplete="contact_1"
                />

                <x-form.error :messages="$errors->get('contact_1')" />
            </div>

            <div class="space-y-2">
                <x-form.label
                    for="contact_2"
                    :value="__('Contact 2')"
                />

                <x-form.input
                    id="contact_2"
                    name="contact_2"
                    type="text"
                    class="block w-full"
                    :value="old('contact_2')"
                    required
                    autofocus
                    autocomplete="contact_2"
                />

                <x-form.error :messages="$errors->get('contact_2')" />
            </div>

            <div class="space-y-2">
                <x-form.label
                    for="hadware"
                    :value="__('Hadware')"
                />

                <x-form.input
                    id="hadware"
                    name="hadware"
                    type="text"
                    class="block w-full"
                    :value="old('hadware')"
                    required
                    autofocus
                    autocomplete="hadware"
                />

                <x-form.error :messages="$errors->get('hadware')" />
            </div>

        </div>

        <div class="flex items-center gap-4">
            <x-button>
                {{ __('Save') }}
            </x-button>

            @if (session('status') === 'profile-updated')
                <p
                    x-data="{ show: true }"
                    x-show="show"
                    x-transition
                    x-init="setTimeout(() => show = false, 2000)"
                    class="text-sm text-gray-600 dark:text-gray-400"
                >
                    {{ __('Saved.') }}
                </p>
            @endif
        </div>
    </form>
</section>
