/**
 * Constantes e Configurações do Sistema
 * Definições específicas para cada tipo de bem (Carro e Imóvel)
 */

export const TIPOS_BEM = {
    CARRO: "carro",
    IMOVEL: "imovel",
};

export const CONFIG_POR_TIPO = {
    [TIPOS_BEM.CARRO]: {
        // Taxas do Consórcio
        taxaAdministrativaAnual: 1.2, // 1.2% ao ano
        comissaoPercentual: 1.5, // 1.5% sobre o valor

        // Taxas do Financiamento
        taxaJurosAnualBase: 12, // 12% ao ano

        // Limites
        prazoMaximoMeses: 60, // 5 anos
        lanceMaximoPercentual: 40, // 40% do valor
        entradaMinimaPercentual: 10, // 10% do valor
        valorMaximoSugerido: 300000, // R$ 300.000

        // Custos Adicionais
        seguroAnualPercentual: 0.4, // 0.4% ao ano
        taxaLicenciamentoAnual: 200, // R$ 200 por ano

        // Labels e Placeholders
        labels: {
            valorBem: "Valor do Veículo",
            placeholderValor: "Ex: 50.000",
            descricao: "Consórcio ou Financiamento de Veículo",
        },
    },

    [TIPOS_BEM.IMOVEL]: {
        // Taxas do Consórcio
        taxaAdministrativaAnual: 0.8, // 0.8% ao ano
        comissaoPercentual: 2.0, // 2% sobre o valor

        // Taxas do Financiamento
        taxaJurosAnualBase: 9, // 9% ao ano

        // Limites
        prazoMaximoMeses: 360, // 30 anos
        lanceMaximoPercentual: 30, // 30% do valor
        entradaMinimaPercentual: 20, // 20% do valor
        valorMaximoSugerido: 2000000, // R$ 2.000.000

        // Custos Adicionais Imóvel
        taxaAvaliacaoPercentual: 0.5, // 0.5% (financiamento)
        seguroAnualPercentual: 0.3, // 0.3% ao ano
        itbiPercentual: 3, // 3% (custo inicial financiamento)

        // Labels e Placeholders
        labels: {
            valorBem: "Valor do Imóvel",
            placeholderValor: "Ex: 500.000",
            descricao: "Consórcio ou Financiamento Imobiliário",
        },
    },
};

/**
 * Obtém a configuração para um tipo de bem específico
 * @param {string} tipoBem - 'carro' ou 'imovel'
 * @returns {object} Configuração do tipo de bem
 */
export const getConfig = (tipoBem) => {
    return CONFIG_POR_TIPO[tipoBem] || CONFIG_POR_TIPO[TIPOS_BEM.CARRO];
};

/**
 * Calcula os limites baseados no valor do bem e tipo
 * @param {number} valorBem - Valor do bem
 * @param {string} tipoBem - 'carro' ou 'imovel'
 * @param {object} configTaxas - Configuração de taxas (opcional, do banco de dados)
 * @returns {object} Limites calculados
 */
export const calcularLimites = (valorBem, tipoBem, configTaxas = null) => {
    const config = configTaxas || getConfig(tipoBem);

    return {
        lanceMaximo: (valorBem * config.lanceMaximoPercentual) / 100,
        entradaMinima: (valorBem * config.entradaMinimaPercentual) / 100,
        prazoMaximo: config.prazoMaximoMeses,
        valorMaximo: config.valorMaximoSugerido,
    };
};
