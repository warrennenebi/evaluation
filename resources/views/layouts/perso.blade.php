<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta id="loadurl" content="{{ route('api.getTable') }}">
        <meta id="loadurl_base" content="{{ URL::to('/') }}">

        <title>{{ config('app.name', 'Gestion DBS') }}</title>
        <link rel="shortcut icon" type="img/png" href="{{ asset('img/logo.png') }}">

        <!-- Scripts -->
        @vite(['resources/js/app.js'])
        
        {{-- <style>
            * {
                outline: solid 1px rgb(229, 255, 0);
            }

        </style> --}}
        {{-- js/script/debut --}}
        {{$css}}
        @include('scripts.css_scripts1')
        @include('scripts.js_scripts_start')
    </head>
    <body class="font-sans antialiased  @if (isset($classes)) {{ $classes }} @endif ">        
        <!-- Page Content -->
        <main>
            {{ $slot }}
        </main>
        @if (isset($jsScript))
            {{ $jsScript }}
        @endif

         <!-- modals-->
        @include('modals.modalListe')
    </body>
    {{-- <script>
                document.querySelectorAll('*').forEach(elem => {
        if (elem.offsetWidth > document.documentElement.offsetWidth) {
            console.log('Problem child: ', elem);
        }
        });
    </script> --}}
</html>
