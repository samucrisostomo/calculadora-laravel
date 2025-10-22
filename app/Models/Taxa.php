<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Taxa extends Model
{
    protected $table = 'taxas';

    protected $fillable = [
        'nome',
        'codigo',
        'tipo_bem',
        'modalidade',
        'tipo_taxa',
        'valor',
        'periodo',
        'descricao',
        'ativo',
    ];

    protected $casts = [
        'valor' => 'decimal:4',
        'ativo' => 'boolean',
    ];

    /**
     * Scope para filtrar taxas ativas
     */
    public function scopeAtivo($query)
    {
        return $query->where('ativo', true);
    }

    /**
     * Scope para filtrar por tipo de bem
     */
    public function scopePorTipoBem($query, $tipoBem)
    {
        return $query->where('tipo_bem', $tipoBem);
    }

    /**
     * Scope para filtrar por modalidade
     */
    public function scopePorModalidade($query, $modalidade)
    {
        return $query->where('modalidade', $modalidade);
    }

    /**
     * Get taxas configuradas para um tipo de bem específico
     */
    public static function obterConfigPorTipo($tipoBem)
    {
        return static::ativo()
            ->porTipoBem($tipoBem)
            ->get()
            ->keyBy('codigo');
    }
}
