<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CalculadoraController;
use App\Http\Controllers\TaxaController;
use App\Http\Controllers\VantagemConsorcioController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Rota Pública - Calculadora
Route::get('/', [CalculadoraController::class, 'index'])->name('calculadora');

// API Pública - Taxas para calculadora
Route::get('/api/taxas/{tipoBem}', [CalculadoraController::class, 'getTaxas'])->name('api.taxas');
Route::get('/api/taxas', [CalculadoraController::class, 'getAllTaxas'])->name('api.taxas.all');

// API Pública - Vantagens do consórcio
Route::get('/api/vantagens', [VantagemConsorcioController::class, 'getVantagensAtivas'])->name('api.vantagens');



// Dashboard - redireciona para taxas admin
Route::get('/dashboard', function () {
    return redirect()->route('admin.taxas.index');
})->middleware(['auth', 'verified'])->name('dashboard');

// Rotas Administrativas (protegidas)
Route::middleware('auth')->group(function () {
    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin - Taxas e Vantagens
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('taxas', TaxaController::class);
        Route::post('taxas/{taxa}/toggle', [TaxaController::class, 'toggleAtivo'])->name('taxas.toggle');

        Route::resource('vantagens', VantagemConsorcioController::class);
        Route::post('vantagens/{vantagem}/toggle', [VantagemConsorcioController::class, 'toggleAtivo'])->name('vantagens.toggle');
    });
});

require __DIR__ . '/auth.php';
