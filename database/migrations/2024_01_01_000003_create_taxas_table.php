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
        Schema::create('taxas', function (Blueprint $table) {
            $table->id();
            $table->string('nome'); // Ex: "Taxa Administrativa Consórcio Carro"
            $table->string('codigo')->unique(); // Ex: "taxa_admin_consorcio_carro"
            $table->string('tipo_bem'); // "carro" ou "imovel"
            $table->string('modalidade'); // "consorcio" ou "financiamento"
            $table->string('tipo_taxa'); // "percentual" ou "fixo"
            $table->decimal('valor', 10, 4); // Valor da taxa
            $table->string('periodo')->nullable(); // "mensal", "anual", "unico"
            $table->text('descricao')->nullable();
            $table->boolean('ativo')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('taxas');
    }
};
