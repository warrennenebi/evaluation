<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\View\View;
use App\Helpers\ImageManager;
use App\Models\signature;
use Illuminate\Support\Facades\Hash;
use App\Traits\TracksUserActions;

class ProfileController extends Controller
{
    use TracksUserActions;
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): View
    {
        $profile = UserProfile::where('user_id', auth()->user()->id)->with('directions')->with('filliale')->with('picture')->first();

        // dd($profile->picture->image_profil_path);
        return view('profile.form', [
            'user' => $request->user(),
            'profile' => $profile,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }
    
    public function signature_update(Request $request)
    {
        // dd($request);

        
        $path = 'Signature/';

        if($file = $request->file('signture_numerique')) 
        {
            $fileData = ImageManager::uploads($file,$path);
            $document = signature::updateOrcreate(
                [
                    'user_id' => auth()->user()->id,
                    'type'=>'Signature',
                    'nom'=>'signture_numerique_'.auth()->user()->id.'_'.date('Y-m-d H:m:s'),
                    'chemin_doc'=>$fileData['filePath'],
                ]
                ); 
        }

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validateWithBag('userDeletion', [
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function showChangePasswordForm()
    {
        return view('auth.change-password');
    }

    public function updatePassword(Request $request)
    {
        // dd($request);
        $request->validate([
            'password' => 'required|confirmed|min:8',
        ]);

        $user = Auth::user();
        // dd($request,$user);
        $user->update([
            'password' => Hash::make($request->password),
            'first_login' => false,
        ]);

            // Log temporaire pour vérifier le résultat de la mise à jour
        if ($user->wasChanged()) {
            \Log::info('Password updated successfully. first_login set to false.');
        } else {
            \Log::error('Password update failed or no changes detected.');
        }
        $this->signature_update($request);

        return redirect()->route('demande')->withSuccess('Mot de passe et signature modifiés avec succès!'); // Redirige l'utilisateur après la mise à jour du mot de passe
    }

}
