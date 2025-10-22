/**
 * Valida os campos do consórcio
 * @param {object} data - Dados a serem validados
 * @param {string} tipoBem - Tipo do bem ('carro' ou 'imovel')
 * @param {object} configTaxas - Configuração de taxas (opcional, do banco de dados)
 * @returns {object} Objeto com erros encontrados
 */
export const validarConsorcio = (
    data,
    tipoBem = "carro",
    configTaxas = null
) => {
    const erros = {};

    // Valor do bem
    if (!data.valorBem || data.valorBem <= 0) {
        erros.valorBem = "Valor do bem é obrigatório e deve ser maior que zero";
    }

    // Lance (sem restrições de máximo)
    if (data.lance < 0) {
        erros.lance = "Lance não pode ser negativo";
    }

    // Prazo (sem restrições de mínimo/máximo)
    if (!data.prazoMeses || data.prazoMeses <= 0) {
        erros.prazoMeses = "Prazo é obrigatório e deve ser maior que zero";
    }

    return erros;
};

/**
 * Valida os campos do financiamento
 * @param {object} data - Dados a serem validados
 * @param {string} tipoBem - Tipo do bem ('carro' ou 'imovel')
 * @param {object} configTaxas - Configuração de taxas (opcional, do banco de dados)
 * @returns {object} Objeto com erros encontrados
 */
export const validarFinanciamento = (
    data,
    tipoBem = "carro",
    configTaxas = null
) => {
    const erros = {};

    // Valor do bem
    if (!data.valorBem || data.valorBem <= 0) {
        erros.valorBem = "Valor do bem é obrigatório e deve ser maior que zero";
    }

    // Entrada (sem restrições de mínimo/máximo)
    if (data.entrada < 0) {
        erros.entrada = "Entrada não pode ser negativa";
    }

    // Prazo (sem restrições de mínimo/máximo)
    if (!data.prazoMeses || data.prazoMeses <= 0) {
        erros.prazoMeses = "Prazo é obrigatório e deve ser maior que zero";
    }

    // Taxa de juros (sem restrições de mínimo/máximo)
    if (!data.taxaAnual || data.taxaAnual <= 0) {
        erros.taxaAnual = "Taxa de juros é obrigatória e deve ser maior que zero";
    }

    return erros;
};

/**
 * Verifica se há erros de validação
 * @param {object} erros - Objeto de erros
 * @returns {boolean} True se há erros
 */
export const temErros = (erros) => {
    return Object.keys(erros).length > 0;
};
