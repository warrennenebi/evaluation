<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('company_id')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('ville')->nullable();
            $table->string('date_embauche')->nullable();
            $table->integer('jour_de_conger')->nullable();
            $table->foreignId('directions_id')->contrained()->onDelect('cascade')->nullable();
            $table->foreignId('pays_id')->contrained()->onDelect('cascade')->nullable();
            $table->foreignId('filliale_id')->contrained()->onDelect('cascade')->nullable();
            $table->foreignId('user_id')->cascade('delete');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_profiles');
    }
}
