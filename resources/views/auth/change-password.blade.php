<x-guest-layout>
    <x-auth-card>

        <div style="max-width: 400px; margin: auto; padding: 20px;">
            <h2><strong>{{ ucwords(strtolower(Auth::user()->name )) }}</strong>, changer le mot de passe et ajoutez une signature</h2>

            <form method="POST" id="update-password-form" action="{{ route('update-password') }}" enctype="multipart/form-data">

                @csrf
                <div class="grid gap-6">
                    <!-- Password -->
                    <div class="space-y-2">
                        <x-form.label
                            for="password"
                            :value="__('Nouveau mot de passe:')"
                        />

                        <x-form.input
                            id="password"
                            class="block w-full"
                            type="password"
                            name="password"
                            required
                        />
                    </div>

                    <!-- Confirm Password -->
                    <div class="space-y-2">
                        <x-form.label
                            for="password_confirmation"
                            :value="__('Confirmez le mot de passe:')"
                        />

                        <x-form.input
                            id="password_confirmation"
                            class="block w-full"
                            type="password"
                            name="password_confirmation"
                            required
                        />
                    </div>

                    <!-- Ajout signature -->
                    <div class="space-y-2">
                        <label for="signature">Chargez votre signature:</label><br>
                        <input class="block w-full" type="file" name="signture_numerique" id="signture_numerique" required>
                    </div>

                    <div class="flex items-center justify-end">
                        <x-button class="btn btn-primary password_form" data-form="password-form">
                            {{ __('Changer le mot de passe') }}
                        </x-button>
                    </div>
                </div>
            </form>
        </div>
    </x-auth-card>
</x-guest-layout>