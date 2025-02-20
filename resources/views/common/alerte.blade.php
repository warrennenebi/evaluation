{{-- Message --}}
@if (Session::has('success'))
    <script>
        Toast.fire({
                    icon: 'success',
                    title: 'Bienvenue !',
                    text: '{{ session('success') }}',
                });
    </script>
@endif

@if (Session::has('error'))
    <script>
        Toast.fire({
                    icon: 'success',
                    title: 'Erreur !',
                    text: '{{ session('error') }}',
                }); 
    </script> 
@endif