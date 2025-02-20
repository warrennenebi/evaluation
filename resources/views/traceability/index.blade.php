<x-app-layout>
    <x-slot name="header">
        {{-- <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Finances') }}
        </h2> --}}
        {{-- <div class="d-flex col-15 p-2 border-r">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Payer</button>
                </li>                
            </ul>            
        </div>    --}}
    </x-slot>

    <div class="max-w-8xl mx-auto sm:px-8 lg:px-6">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-4 text-gray-900">
                <div class="container">
                    <h2>Historique des actions</h2>

                    @if($activities->isEmpty())
                        <p>Aucune action enregistrée pour le moment.</p>
                    @else
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Utilisateur</th>
                                    <th>Description</th>
                                    <th>Type d'événement</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($activities as $activity)
                                    <tr>
                                        <td>{{ $activity->id }}</td>
                                        <td>{{ $activity->causer->name ?? 'Utilisateur inconnu' }}</td>
                                        <td>{{ $activity->description }}</td>
                                        <td>{{ $activity->event }}</td>
                                        <td>{{ $activity->created_at->format('d/m/Y H:i') }}</td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    @endif
                </div>
            </div>
        </div>
    </div>
    
</x-app-layout>