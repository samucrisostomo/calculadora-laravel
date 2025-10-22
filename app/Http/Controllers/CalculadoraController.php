<?php

namespace App\Http\Controllers;

use App\Models\Taxa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalculadoraController extends Controller
{
    /**
     * Display the calculator page
     */
    public function index()
    {
        return Inertia::render('Calculadora/Index');
    }

    /**
     * Get taxas configuration for a specific tipo_bem
     */
    public function getTaxas($tipoBem)
    {
        // Validar tipo de bem
        if (!in_array($tipoBem, ['carro', 'imovel'])) {
            return response()->json([
                'error' => 'Tipo de bem inválido'
            ], 400);
        }

        $taxas = Taxa::ativo()
            ->porTipoBem($tipoBem)
            ->get();

        // Formatar as taxas no formato esperado pelo frontend
        $config = [
            'taxaAdministrativaAnual' => $taxas->where('codigo', "taxa_admin_consorcio_{$tipoBem}")->first()?->valor ?? 0,
            'comissaoPercentual' => $taxas->where('codigo', "comissao_consorcio_{$tipoBem}")->first()?->valor ?? 0,
            'taxaJurosAnualBase' => $taxas->where('codigo', "juros_financiamento_{$tipoBem}")->first()?->valor ?? 0,
            'seguroAnualPercentual' => $taxas->where('codigo', "seguro_financiamento_{$tipoBem}")->first()?->valor ?? 0,
            'lanceMaximoPercentual' => $taxas->where('codigo', "lance_maximo_{$tipoBem}")->first()?->valor ?? 0,
            'entradaMinimaPercentual' => $taxas->where('codigo', "entrada_minima_{$tipoBem}")->first()?->valor ?? 0,
            'prazoMaximoMeses' => $tipoBem === 'carro' ? 60 : 360,
            'valorMaximoSugerido' => $tipoBem === 'carro' ? 300000 : 2000000,
        ];

        // Adicionar campos específicos por tipo
        if ($tipoBem === 'carro') {
            $config['taxaLicenciamentoAnual'] = $taxas->where('codigo', 'licenciamento_carro')->first()?->valor ?? 0;
        } else if ($tipoBem === 'imovel') {
            $config['taxaAvaliacaoPercentual'] = $taxas->where('codigo', 'avaliacao_imovel')->first()?->valor ?? 0;
            $config['itbiPercentual'] = $taxas->where('codigo', 'itbi_imovel')->first()?->valor ?? 0;
        }

        // Labels
        $config['labels'] = [
            'valorBem' => $tipoBem === 'carro' ? 'Valor do Veículo' : 'Valor do Imóvel',
            'placeholderValor' => $tipoBem === 'carro' ? 'Ex: 50.000' : 'Ex: 500.000',
            'descricao' => $tipoBem === 'carro'
                ? 'Consórcio ou Financiamento de Veículo'
                : 'Consórcio ou Financiamento Imobiliário',
        ];

        return response()->json($config);
    }

    /**
     * Get all taxas (for admin purposes)
     */
    public function getAllTaxas()
    {
        $taxas = Taxa::ativo()->get();

        return response()->json([
            'carro' => $this->formatTaxasPorTipo($taxas, 'carro'),
            'imovel' => $this->formatTaxasPorTipo($taxas, 'imovel'),
        ]);
    }

    /**
     * Format taxas by tipo_bem
     */
    private function formatTaxasPorTipo($taxas, $tipoBem)
    {
        $taxasFiltradas = $taxas->where('tipo_bem', $tipoBem);

        return [
            'taxaAdministrativaAnual' => $taxasFiltradas->where('codigo', "taxa_admin_consorcio_{$tipoBem}")->first()?->valor ?? 0,
            'comissaoPercentual' => $taxasFiltradas->where('codigo', "comissao_consorcio_{$tipoBem}")->first()?->valor ?? 0,
            'taxaJurosAnualBase' => $taxasFiltradas->where('codigo', "juros_financiamento_{$tipoBem}")->first()?->valor ?? 0,
            'seguroAnualPercentual' => $taxasFiltradas->where('codigo', "seguro_financiamento_{$tipoBem}")->first()?->valor ?? 0,
            'lanceMaximoPercentual' => $taxasFiltradas->where('codigo', "lance_maximo_{$tipoBem}")->first()?->valor ?? 0,
            'entradaMinimaPercentual' => $taxasFiltradas->where('codigo', "entrada_minima_{$tipoBem}")->first()?->valor ?? 0,
            'prazoMaximoMeses' => $tipoBem === 'carro' ? 60 : 360,
            'valorMaximoSugerido' => $tipoBem === 'carro' ? 300000 : 2000000,
            'taxaLicenciamentoAnual' => $tipoBem === 'carro'
                ? ($taxasFiltradas->where('codigo', 'licenciamento_carro')->first()?->valor ?? 0)
                : null,
            'taxaAvaliacaoPercentual' => $tipoBem === 'imovel'
                ? ($taxasFiltradas->where('codigo', 'avaliacao_imovel')->first()?->valor ?? 0)
                : null,
            'itbiPercentual' => $tipoBem === 'imovel'
                ? ($taxasFiltradas->where('codigo', 'itbi_imovel')->first()?->valor ?? 0)
                : null,
        ];
    }
}
