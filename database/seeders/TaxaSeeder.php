<?php

namespace Database\Seeders;

use App\Models\Taxa;
use Illuminate\Database\Seeder;

class TaxaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $taxas = [
            // TAXAS CONSÓRCIO - CARRO
            [
                'nome' => 'Taxa Administrativa Consórcio Carro',
                'codigo' => 'taxa_admin_consorcio_carro',
                'tipo_bem' => 'carro',
                'modalidade' => 'consorcio',
                'tipo_taxa' => 'percentual',
                'valor' => 1.2,
                'periodo' => 'anual',
                'descricao' => 'Taxa administrativa anual do consórcio de veículos',
                'ativo' => true,
            ],
            [
                'nome' => 'Comissão Consórcio Carro',
                'codigo' => 'comissao_consorcio_carro',
                'tipo_bem' => 'carro',
                'modalidade' => 'consorcio',
                'tipo_taxa' => 'percentual',
                'valor' => 1.5,
                'periodo' => 'unico',
                'descricao' => 'Comissão única sobre o valor do bem',
                'ativo' => true,
            ],

            // TAXAS CONSÓRCIO - IMÓVEL
            [
                'nome' => 'Taxa Administrativa Consórcio Imóvel',
                'codigo' => 'taxa_admin_consorcio_imovel',
                'tipo_bem' => 'imovel',
                'modalidade' => 'consorcio',
                'tipo_taxa' => 'percentual',
                'valor' => 0.8,
                'periodo' => 'anual',
                'descricao' => 'Taxa administrativa anual do consórcio imobiliário',
                'ativo' => true,
            ],
            [
                'nome' => 'Comissão Consórcio Imóvel',
                'codigo' => 'comissao_consorcio_imovel',
                'tipo_bem' => 'imovel',
                'modalidade' => 'consorcio',
                'tipo_taxa' => 'percentual',
                'valor' => 2.0,
                'periodo' => 'unico',
                'descricao' => 'Comissão única sobre o valor do imóvel',
                'ativo' => true,
            ],

            // TAXAS FINANCIAMENTO - CARRO
            [
                'nome' => 'Taxa de Juros Financiamento Carro',
                'codigo' => 'juros_financiamento_carro',
                'tipo_bem' => 'carro',
                'modalidade' => 'financiamento',
                'tipo_taxa' => 'percentual',
                'valor' => 12.0,
                'periodo' => 'anual',
                'descricao' => 'Taxa de juros anual base para financiamento de veículos',
                'ativo' => true,
            ],
            [
                'nome' => 'Seguro Financiamento Carro',
                'codigo' => 'seguro_financiamento_carro',
                'tipo_bem' => 'carro',
                'modalidade' => 'financiamento',
                'tipo_taxa' => 'percentual',
                'valor' => 0.4,
                'periodo' => 'anual',
                'descricao' => 'Seguro anual sobre o valor do veículo',
                'ativo' => true,
            ],
            [
                'nome' => 'Taxa de Licenciamento Carro',
                'codigo' => 'licenciamento_carro',
                'tipo_bem' => 'carro',
                'modalidade' => 'financiamento',
                'tipo_taxa' => 'fixo',
                'valor' => 200.0,
                'periodo' => 'anual',
                'descricao' => 'Taxa anual de licenciamento',
                'ativo' => true,
            ],

            // TAXAS FINANCIAMENTO - IMÓVEL
            [
                'nome' => 'Taxa de Juros Financiamento Imóvel',
                'codigo' => 'juros_financiamento_imovel',
                'tipo_bem' => 'imovel',
                'modalidade' => 'financiamento',
                'tipo_taxa' => 'percentual',
                'valor' => 9.0,
                'periodo' => 'anual',
                'descricao' => 'Taxa de juros anual base para financiamento imobiliário',
                'ativo' => true,
            ],
            [
                'nome' => 'Taxa de Avaliação Imóvel',
                'codigo' => 'avaliacao_imovel',
                'tipo_bem' => 'imovel',
                'modalidade' => 'financiamento',
                'tipo_taxa' => 'percentual',
                'valor' => 0.5,
                'periodo' => 'unico',
                'descricao' => 'Taxa de avaliação do imóvel (custo inicial)',
                'ativo' => true,
            ],
            [
                'nome' => 'Seguro Financiamento Imóvel',
                'codigo' => 'seguro_financiamento_imovel',
                'tipo_bem' => 'imovel',
                'modalidade' => 'financiamento',
                'tipo_taxa' => 'percentual',
                'valor' => 0.3,
                'periodo' => 'anual',
                'descricao' => 'Seguro anual sobre o valor do imóvel',
                'ativo' => true,
            ],
            [
                'nome' => 'ITBI (Imposto)',
                'codigo' => 'itbi_imovel',
                'tipo_bem' => 'imovel',
                'modalidade' => 'financiamento',
                'tipo_taxa' => 'percentual',
                'valor' => 3.0,
                'periodo' => 'unico',
                'descricao' => 'Imposto de Transmissão de Bens Imóveis (custo inicial)',
                'ativo' => true,
            ],

            // LIMITES E CONFIGURAÇÕES
            [
                'nome' => 'Lance Máximo Consórcio Carro',
                'codigo' => 'lance_maximo_carro',
                'tipo_bem' => 'carro',
                'modalidade' => 'consorcio',
                'tipo_taxa' => 'percentual',
                'valor' => 40.0,
                'periodo' => null,
                'descricao' => 'Percentual máximo de lance permitido',
                'ativo' => true,
            ],
            [
                'nome' => 'Lance Máximo Consórcio Imóvel',
                'codigo' => 'lance_maximo_imovel',
                'tipo_bem' => 'imovel',
                'modalidade' => 'consorcio',
                'tipo_taxa' => 'percentual',
                'valor' => 30.0,
                'periodo' => null,
                'descricao' => 'Percentual máximo de lance permitido',
                'ativo' => true,
            ],
            [
                'nome' => 'Entrada Mínima Financiamento Carro',
                'codigo' => 'entrada_minima_carro',
                'tipo_bem' => 'carro',
                'modalidade' => 'financiamento',
                'tipo_taxa' => 'percentual',
                'valor' => 10.0,
                'periodo' => null,
                'descricao' => 'Percentual mínimo de entrada',
                'ativo' => true,
            ],
            [
                'nome' => 'Entrada Mínima Financiamento Imóvel',
                'codigo' => 'entrada_minima_imovel',
                'tipo_bem' => 'imovel',
                'modalidade' => 'financiamento',
                'tipo_taxa' => 'percentual',
                'valor' => 20.0,
                'periodo' => null,
                'descricao' => 'Percentual mínimo de entrada',
                'ativo' => true,
            ],
        ];

        foreach ($taxas as $taxa) {
            Taxa::create($taxa);
        }
    }
}
