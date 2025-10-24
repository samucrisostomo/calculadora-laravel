<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VantagemConsorcio extends Model
{
    protected $table = 'vantagens_consorcio';

    protected $fillable = [
        'nome',
        'descricao',
        'ordem',
        'ativo'
    ];

    protected $casts = [
        'ativo' => 'boolean',
        'ordem' => 'integer'
    ];

    /**
     * Scope para buscar apenas vantagens ativas
     */
    public function scopeAtivas($query)
    {
        return $query->where('ativo', true);
    }

    /**
     * Scope para ordenar por ordem
     */
    public function scopeOrdenadas($query)
    {
        return $query->orderBy('ordem')->orderBy('nome');
    }
}
