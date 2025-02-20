<x-app-layout :assets="$assets ?? []">
   <div class="conatiner-fluid content-inner mt-n5 py-0">
      <div>
         {{-- <form method="post" action="{{ route('profile.update') }}"> --}}
            <div class="row">
               <div class="col-xl-3 col-lg-4">
                  <div class="card">
                     <div class="card-header d-flex justify-content-between">
                        <div class="header-title">
                        <h4 class="card-title">Ajoutez un utilisateur</h4>
                        </div>
                     </div>
                     <div class="card-body">
                        <div class="d-flex justify-content-center">
                           <span class="material-icons mx-2 text-primary">
                              @if (isset($variablePartagee->image_profil_path))
                                 <img src="{{ asset('storage/' .$variablePartagee->image_profil_path) }}" style="width: 200px; height: 200px;" class="rounded-image">
                              @else
                                 account_circle
                              @endif
                           </span>
                        </div>
                        <form method="post" action="{{ route('picture.update') }}" class="mt-6 space-y-6" enctype="multipart/form-data">
                           @csrf
                           <div class="form-group md-6">
                              
                              <input type="file" name="UserPicture" id="UserPicture" accept="image/*" class="form-control" required />
                  
                           </div>
                           <div class="flex items-center gap-4">
                              <x-button class="btn btn-primary">
                                    {{ __('Enregistrer') }}
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
                           <hr>
                        </form>
                        <div class="form-group d-none">
                           <label class="form-label" for="furl">Facebook Url:</label>
                           <input class="form-control" id="furl" placeholder="Facebook Url" name="userProfile[facebook_url]" type="text">
                        </div>
                        <div class="form-group d-none">
                           <label class="form-label" for="turl">Twitter Url:</label>
                           <input class="form-control" id="turl" placeholder="Twitter Url" name="userProfile[twitter_url]" type="text">
                        </div>
                        <div class="form-group d-none">
                           <label class="form-label" for="instaurl">Instagram Url:</label>
                           <input class="form-control" id="instaurl" placeholder="Instagram Url" name="userProfile[instagram_url]" type="text">
                        </div>
                        <div class="form-group mb-0 d-none">
                           <label class="form-label" for="lurl">Linkedin Url:</label>
                           <input class="form-control" id="lurl" placeholder="Linkedin Url" name="userProfile[linkdin_url]" type="text">
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-xl-9 col-lg-8">
                  <div class="card">
                     <div class="card-header d-flex justify-content-between">
                     <div class="header-title">
                        <h4 class="card-title">Information sur l'utilisateur</h4>
                     </div>
                     </div>
                     <div class="card-body">
                        <div class="new-user-info">
                           <form method="post" action="{{ route('profile.update') }}" class="mt-6 space-y-6">
                              @csrf
                              @method('patch')
                              <div class="row">
                                 <div class="form-group col-md-6">
                                    <label class="form-label" for="name">Nom et Prenom: <span class="text-danger">*</span></label>
                                    <input id="name" class="form-control" value="{{old('name', $user->name)}}" required autofocus autocomplete="name" name="name" type="text">
                                 </div>
                                 <div class="form-group col-md-6">
                                    <label class="form-label" for="filliale">Filliale: <span class="text-danger">*</span></label>
                                    <input class="form-control" placeholder="filliale" required autofocus autocomplete="filliale" name="filliale" type="text" value="{{old('name', $profile->filliale->label)}}">
                                 </div>
                                 <div class="form-group col-md-6">
                                    <label class="form-label" for="add1">Date d'ambauche:</label>
                                    <input class="form-control" id="add1" placeholder="Entrez Address 1" name="userProfile[street_addr_1]" type="text">
                                 </div>
                                 <div class="form-group col-md-6">
                                    <label class="form-label" for="add2">Ville:</label>
                                    <input class="form-control" id="add2" placeholder="Entrez Address 2" name="userProfile[street_addr_2]" type="text">
                                 </div>
                                 <div class="form-group col-md-12">
                                    <label class="form-label" for="cname">Societe: <span class="text-danger">*</span></label>
                                    <input class="form-control" required="" placeholder="Company Name" name="userProfile[company_name]" type="text">
                                 </div>
                                 <div class="form-group col-sm-12">
                                    <label class="form-label" id="country">Pays:</label>
                                    <input class="form-control" id="country" name="userProfile[country]" type="text">

                                 </div>
                                 <div class="form-group col-md-6">
                                    <label class="form-label" for="mobno">Contact 1:</label>
                                    <input class="form-control" id="mobno" placeholder="Mobile Number" name="userProfile[phone_number]" type="text">
                                 </div>
                                 <div class="form-group col-md-6">
                                    <label class="form-label" for="altconno">Contact 2:</label>
                                    <input class="form-control" id="altconno" placeholder="Alternate Contact" name="userProfile[alt_phone_number]" type="text">
                                 </div>
                                 <div class="form-group col-md-6">
                                    <label class="form-label" for="email">Email: <span class="text-danger">*</span></label>
                                    <input class="form-control" placeholder="Enter e-mail" required="" name="email" type="email">
                                 </div>
                                 <div class="form-group col-md-6">
                                    <label class="form-label" for="pno">Pin Code:</label>
                                    <input class="form-control" id="pin_code" step="any" name="userProfile[pin_code]" type="number">
                                 </div>
                                 <div class="form-group col-md-12">
                                    <label class="form-label" for="city">Adress:</label>
                                    <input class="form-control" id="city" placeholder="" name="userProfile[city]" type="text">
                                 </div>
                              </div>
                              <div class="flex items-center gap-4">
                                 <x-button class="btn btn-primary">
                                     {{ __('Enregistrer') }}
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
                           <hr>
                           <h5 class="mb-3">Signature</h5>
                           <form method="post" action="{{ route('signature.update') }}" class="mt-6 space-y-6" enctype="multipart/form-data">
                              @csrf
                              <div class="row">
                                 <div class="form-group col-md-6">
                                    <label class="form-label" for="signature">Signature:</label>
                                    <input class="form-control" type="file" name="signture_numerique" id="signture_numerique"  required>
                                 </div>
                              </div>
                              <div class="flex items-center gap-4">
                                 <x-button class="btn btn-primary">
                                    {{ __('Enregistrer') }}
                                 </x-button>
                     
                                 @if (session('status') === 'profile-updated')
                                    <p
                                       x-data="{ show: true }"
                                       x-show="show"
                                       x-transition
                                       x-init="setTimeout(() => show = false, 2000)"
                                       class="text-sm text-gray-600 dark:text-gray-400">
                                       {{ __('Saved.') }}
                                    </p>
                                 @endif
                              </div>

                           </form>
                           <hr>
                           <h5 class="mb-3">Securité</h5>
                           <form method="post" action="{{ route('password.update') }}" class="mt-6 space-y-6" >
                              @csrf
                              @method('put')
                              <div class="row">
                                 <div class="form-group col-md-6">
                                    <label class="form-label" for="pass">Mot de Passe:</label>
                                    <input class="form-control" placeholder="Password" name="password" type="password" value="">
                                 </div>
                                 <div class="form-group col-md-6">
                                    <label class="form-label" for="rpass">Confirmer le Mot de Passe:</label>
                                    <input class="form-control" placeholder="Repeat Password" name="password_confirmation" type="password" value="">
                                 </div>
                              </div>
                              <div class="flex items-center gap-4">
                                 <x-button  class="btn btn-primary">
                                     {{ __('Enregistrer') }}
                                 </x-button>
                     
                                 @if (session('status') === 'password-updated')
                                    <p
                                       x-data="{ show: true }"
                                       x-show="show"
                                       x-transition
                                       x-init="setTimeout(() => show = false, 2000)"
                                       class="text-sm text-gray-600 dark:text-gray-400">
                                       {{ __('Saved.') }}
                                    </p>
                                 @endif
                             </div>
                           </form>
                        </div>
                     <hr>
                     <h5 class="mb-3">Suppression du compte</h5>
                     <x-button class="btn btn-primary" variant="danger" x-data="" x-on:click.prevent="$dispatch('open-modal', 'confirm-user-deletion')">
                        {{ __('Supprimer mon Compte') }}
                     </x-button>
                  
                     <x-modal
                        name="confirm-user-deletion"
                        :show="$errors->userDeletion->isNotEmpty()">
                        <form
                           method="post"
                           action="{{ route('profile.destroy') }}"
                           class="p-6 flex flex-col items-center">
                           @csrf
                           @method('delete')
                           <div class="p-3">
                              <h2 class="text-lg font-medium">
                                 {{ __('Êtes-vous sûr de vouloir supprimer votre compte ?') }}
                              </h2>
                  
                              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                 {{ __('Une fois votre compte supprimé, toutes ses ressources et données seront définitivement supprimées. Veuillez saisir votre mot de passe pour confirmer que vous souhaitez supprimer définitivement votre compte.') }}
                              </p>
                  
                              <div class="mt-6 space-y-6 w-full">
                                 <x-form.label
                                    for="delete-user-password"
                                    value="Password"
                                    class="sr-only"
                                 />
                  
                                 <x-form.input
                                    id="delete-user-password"
                                    name="password"
                                    type="password"
                                    class="block w-3/4"
                                    placeholder="Password"
                                 />
                  
                                 <x-form.error :messages="$errors->userDeletion->get('password')" />
                              </div>
                  
                              <div class="mt-6 flex justify-end w-full">
                                 <x-button
                                    type="button"
                                    variant="secondary"
                                    x-on:click="$dispatch('close')"
                                 >
                                    {{ __('Cancel') }}
                                 </x-button>
                  
                                 <button
                                    variant="danger"
                                    class="ml-3 btn btn-primary">
                                    {{ __('Delete Account') }}
                                 </button>
                              </div>
                           </div>
                        </form>
                     </x-modal>
                     </div>
                  </div>
               </div>
            </div>
         {{-- </form> --}}
      </div>
   </div>
</x-app-layout>