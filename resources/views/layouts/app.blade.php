<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta id="loadurl" content="{{ route('api.getTable') }}">
        {{-- <meta id="loadjsonenergy" content="{{ route('api.getenergy') }}"> --}}
        <meta id="loadurl_base" content="{{ URL::to('/') }}">

        <title>{{ config('app.name', 'Gestion DBS') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link rel="shortcut icon" type="img/png" href="{{ asset('img/logo.png') }}">

        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])

        <!--js scripts-->
        @include('scripts.css_scripts')
        {{-- js/script/debut --}}
        @include('scripts.js_scripts_start')

    </head>
    <body class="font-sans antialiased">
        <div class="progress sticky-top" role="progressbar" aria-valuemin = "0" aria-valuemax="100" style="height:2px">
            <div class="progress-bar bg-primary" id="progressbar" style ="width:0%"></div>
        </div>
        <div class="min-h-screen bg-white">
            @include('layouts.navigation')

            <!-- Page Heading mx-auto-->
            @if (isset($header))
                <header class="bg-white">
                    <div class="max-w-100 border-bottom  pt-2 px-2 sm:px-6 lg:px-2 flex">
                        {{ $header }}
                    </div>
                </header>
            @endif

            {{-- loader --}}
            <section id="loading">
                <div id="loading-content"></div>
            </section>

            <!-- Page Content -->
            <main class="max-w-100">
                {{ $slot }}
            </main>
        </div>

            <!-- modals-->
    @include('modals.modalListe')
    <!--js scripts-->
    @include('scripts.js_scripts')
    {{-- blade scripts --}}
    @include('common.alerte')
    </body>
</html>
