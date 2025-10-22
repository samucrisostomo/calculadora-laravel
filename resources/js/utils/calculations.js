import { getConfig } from "./constants";

/**
 * Calcula os valores do consórcio
 * @param {number} valorBem - Valor do bem
 * @param {number} lance - Valor do lance
 * @param {number} prazoMeses - Prazo em meses
 * @param {string} tipoBem - Tipo do bem ('carro' ou 'imovel')
 * @param {object} configTaxas - Configuração de taxas (opcional, do banco de dados)
 * @returns {object} Resultado dos cálculos do consórcio
 */
export const calcularConsorcio = (
    valorBem,
    lance,
    prazoMeses,
    tipoBem = "carro",
    configTaxas = null
) => {
    // Usa taxas dinâmicas se fornecidas, senão usa as estáticas
    const config = configTaxas || getConfig(tipoBem);

    // Taxa administrativa: baseada no tipo de bem
    const taxaAdministrativa =
        (valorBem * config.taxaAdministrativaAnual) / 100;

    // Comissão: baseada no tipo de bem
    const comissao = (valorBem * config.comissaoPercentual) / 100;

    // Valor a ser financiado (valor do bem menos o lance)
    const valorFinanciado = valorBem - lance;

    // Parcela mensal (fixa)
    const parcelaMensal = valorFinanciado / prazoMeses;

    // Custo total: (Parcela × Prazo) + Lance + Taxas + Comissão
    const custoTotal =
        parcelaMensal * prazoMeses + lance + taxaAdministrativa + comissao;

    return {
        valorBem,
        lance,
        prazoMeses,
        taxaAdministrativa,
        taxaAdministrativaPercentual: config.taxaAdministrativaAnual,
        comissao,
        comissaoPercentual: config.comissaoPercentual,
        valorFinanciado,
        parcelaMensal,
        parcelaInicial: parcelaMensal,
        parcelaFinal: parcelaMensal,
        custoTotal,
        totalPago: custoTotal,
        tipoBem,
    };
};

/**
 * Calcula os valores do financiamento usando Sistema Price
 * @param {number} valorBem - Valor do bem
 * @param {number} entrada - Valor da entrada
 * @param {number} prazoMeses - Prazo em meses
 * @param {number} taxaAnual - Taxa de juros anual em percentual
 * @param {string} tipoBem - Tipo do bem ('carro' ou 'imovel')
 * @param {object} configTaxas - Configuração de taxas (opcional, do banco de dados)
 * @returns {object} Resultado dos cálculos do financiamento
 */
export const calcularFinanciamento = (
    valorBem,
    entrada,
    prazoMeses,
    taxaAnual,
    tipoBem = "carro",
    configTaxas = null
) => {
    // Usa taxas dinâmicas se fornecidas, senão usa as estáticas
    const config = configTaxas || getConfig(tipoBem);

    // Valor a ser financiado
    let valorFinanciado = valorBem - entrada;

    // Custos adicionais iniciais
    let custosAdicionaisIniciais = 0;

    // Custos adicionais anuais
    let custosAdicionaisAnuais = 0;

    if (tipoBem === "imovel") {
        // Taxa de avaliação (custo inicial)
        const taxaAvaliacao = (valorBem * config.taxaAvaliacaoPercentual) / 100;
        custosAdicionaisIniciais += taxaAvaliacao;

        // ITBI (custo inicial)
        const itbi = (valorBem * config.itbiPercentual) / 100;
        custosAdicionaisIniciais += itbi;

        // Seguro anual
        const seguroAnual = (valorBem * config.seguroAnualPercentual) / 100;
        const seguroTotal = (seguroAnual * prazoMeses) / 12;
        custosAdicionaisAnuais += seguroTotal;
    } else if (tipoBem === "carro") {
        // Seguro anual
        const seguroAnual = (valorBem * config.seguroAnualPercentual) / 100;
        const seguroTotal = (seguroAnual * prazoMeses) / 12;
        custosAdicionaisAnuais += seguroTotal;

        // Taxa de licenciamento anual
        const licenciamentoTotal =
            (config.taxaLicenciamentoAnual * prazoMeses) / 12;
        custosAdicionaisAnuais += licenciamentoTotal;
    }

    // Converte taxa anual para mensal
    const taxaMensal = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;

    // Calcula parcela usando Sistema Price (PMT)
    // PMT = PV × [i(1+i)^n]/[(1+i)^n-1]
    const fatorPrice = Math.pow(1 + taxaMensal, prazoMeses);
    const parcelaMensal =
        (valorFinanciado * (taxaMensal * fatorPrice)) / (fatorPrice - 1);

    // Custo total: (Parcela × Prazo) + Entrada + Custos Adicionais
    const custoTotal =
        parcelaMensal * prazoMeses +
        entrada +
        custosAdicionaisIniciais +
        custosAdicionaisAnuais;

    // Total de juros pagos
    const totalJuros =
        custoTotal -
        valorBem -
        custosAdicionaisIniciais -
        custosAdicionaisAnuais;

    return {
        valorBem,
        entrada,
        prazoMeses,
        taxaAnual,
        taxaMensal: taxaMensal * 100,
        valorFinanciado,
        parcelaMensal,
        custoTotal,
        totalPago: custoTotal,
        totalJuros,
        custosAdicionaisIniciais,
        custosAdicionaisAnuais,
        tipoBem,
    };
};

/**
 * Compara os resultados do consórcio e financiamento
 * @param {object} consorcio - Resultado do cálculo do consórcio
 * @param {object} financiamento - Resultado do cálculo do financiamento
 * @returns {object} Comparação entre as modalidades
 */
export const compararModalidades = (consorcio, financiamento) => {
    const economia = financiamento.custoTotal - consorcio.custoTotal;
    const percentualEconomia = (economia / financiamento.custoTotal) * 100;

    const diferencaParcela =
        financiamento.parcelaMensal - consorcio.parcelaMensal;
    const percentualDiferencaParcela =
        (diferencaParcela / financiamento.parcelaMensal) * 100;

    return {
        economia,
        percentualEconomia,
        diferencaParcela,
        percentualDiferencaParcela,
        consorcioMaisVantajoso: economia > 0,
    };
};
