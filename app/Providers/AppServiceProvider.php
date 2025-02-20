<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use App\Models\Picture;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        //
        View::composer('*', function ($view) {
            if(auth()->check()){
                $userImage = Picture::where('user_id',auth()->user()->id)->first();
                // dd($userImage);
                $view->with('variablePartagee', $userImage);
            }
        });
    }
}
