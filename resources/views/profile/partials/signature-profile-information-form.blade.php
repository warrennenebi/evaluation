<section>
    <header>
        <h2 class="text-lg font-medium">
            {{ __('Signature Information') }}
        </h2>

        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {{ __("Mettre à jour votre signature numerique.") }}
        </p>
    </header>

    <form
        method="post"
        action="{{ route('signature.update') }}"
        class="mt-6 space-y-6"
        enctype="multipart/form-data"
    >
        @csrf

        <div class="space-y-2">
        <div class="form-group" style="margin-top: 15px;">
            <label for="signature" style="font-weight: bold; color: #000000;">Signature</label><br>
            <input class="form-control form-control-sm" type="file" name="signture_numerique" id="signture_numerique" style="width: 460px;" required>
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
