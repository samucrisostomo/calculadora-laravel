<?php

namespace Database\Seeders;

use App\Models\VantagemConsorcio;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VantagemConsorcioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $vantagens = [
            [
                'nome' => 'Sem Juros',
                'descricao' => 'No consórcio você não paga juros compostos. As taxas são transparentes e muito menores.',
                'ordem' => 1,
                'ativo' => true,
            ],
            [
                'nome' => 'Parcelas Fixas',
                'descricao' => 'As parcelas permanecem as mesmas do início ao fim, facilitando o planejamento financeiro.',
                'ordem' => 2,
                'ativo' => true,
            ],
            [
                'nome' => 'Economia Real',
                'descricao' => 'No final, você pode economizar milhares de reais em comparação ao financiamento tradicional.',
                'ordem' => 3,
                'ativo' => true,
            ],
            [
                'nome' => 'Flexibilidade',
                'descricao' => 'Possibilidade de dar lances para antecipar a contemplação e usar o crédito quando precisar.',
                'ordem' => 4,
                'ativo' => true,
            ],
            [
                'nome' => 'Sem Análise de Crédito',
                'descricao' => 'Não é necessário passar por análise de crédito rigorosa como no financiamento tradicional.',
                'ordem' => 5,
                'ativo' => true,
            ],
            [
                'nome' => 'Proteção contra Inflação',
                'descricao' => 'O valor do bem é protegido contra a inflação, pois você paga o valor de hoje.',
                'ordem' => 6,
                'ativo' => true,
            ],
        ];

        foreach ($vantagens as $vantagem) {
            VantagemConsorcio::create($vantagem);
        }
    }
}
