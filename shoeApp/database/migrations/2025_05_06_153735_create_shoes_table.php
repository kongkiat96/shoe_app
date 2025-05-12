<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shoes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('shoe_type_id')->nullable();
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            $table->string('status')->default('active');
            $table->integer('deleted')->default(0);
            $table->timestamp('created_at')->useCurrent();
            $table->string('created_user')->nullable();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            $table->string('updated_user')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shoes');
    }
};
