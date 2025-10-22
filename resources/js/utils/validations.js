import { getConfig, calcularLimites } from "./constants";

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
    const config = configTaxas || getConfig(tipoBem);
    const limites = calcularLimites(data.valorBem || 0, tipoBem, config);

    // Valor do bem
    if (!data.valorBem || data.valorBem <= 0) {
        erros.valorBem = "Valor do bem é obrigatório e deve ser maior que zero";
    } else if (data.valorBem < 1000) {
        erros.valorBem = "Valor do bem deve ser no mínimo R$ 1.000,00";
    } else if (data.valorBem > config.valorMaximoSugerido) {
        erros.valorBem = `Valor sugerido máximo é R$ ${config.valorMaximoSugerido.toLocaleString(
            "pt-BR"
        )}`;
    }

    // Lance
    if (data.lance < 0) {
        erros.lance = "Lance não pode ser negativo";
    } else if (data.valorBem && data.lance > limites.lanceMaximo) {
        erros.lance = `Lance não pode ser maior que ${
            config.lanceMaximoPercentual
        }% do valor do bem (R$ ${limites.lanceMaximo.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
        })})`;
    }

    // Prazo
    if (!data.prazoMeses || data.prazoMeses <= 0) {
        erros.prazoMeses = "Prazo é obrigatório e deve ser maior que zero";
    } else if (data.prazoMeses < 12) {
        erros.prazoMeses = "Prazo mínimo é de 12 meses";
    } else if (data.prazoMeses > config.prazoMaximoMeses) {
        erros.prazoMeses = `Prazo máximo é de ${config.prazoMaximoMeses} meses`;
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
    const config = configTaxas || getConfig(tipoBem);
    const limites = calcularLimites(data.valorBem || 0, tipoBem, config);

    // Valor do bem
    if (!data.valorBem || data.valorBem <= 0) {
        erros.valorBem = "Valor do bem é obrigatório e deve ser maior que zero";
    } else if (data.valorBem < 1000) {
        erros.valorBem = "Valor do bem deve ser no mínimo R$ 1.000,00";
    } else if (data.valorBem > config.valorMaximoSugerido) {
        erros.valorBem = `Valor sugerido máximo é R$ ${config.valorMaximoSugerido.toLocaleString(
            "pt-BR"
        )}`;
    }

    // Entrada
    if (data.entrada < 0) {
        erros.entrada = "Entrada não pode ser negativa";
    } else if (data.valorBem && data.entrada < limites.entradaMinima) {
        erros.entrada = `Entrada mínima deve ser ${
            config.entradaMinimaPercentual
        }% do valor do bem (R$ ${limites.entradaMinima.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
        })})`;
    } else if (data.valorBem && data.entrada > data.valorBem * 0.8) {
        erros.entrada = "Entrada não pode ser maior que 80% do valor do bem";
    }

    // Prazo
    if (!data.prazoMeses || data.prazoMeses <= 0) {
        erros.prazoMeses = "Prazo é obrigatório e deve ser maior que zero";
    } else if (data.prazoMeses < 12) {
        erros.prazoMeses = "Prazo mínimo é de 12 meses";
    } else if (data.prazoMeses > config.prazoMaximoMeses) {
        erros.prazoMeses = `Prazo máximo é de ${config.prazoMaximoMeses} meses`;
    }

    // Taxa de juros
    if (!data.taxaAnual || data.taxaAnual <= 0) {
        erros.taxaAnual =
            "Taxa de juros é obrigatória e deve ser maior que zero";
    } else if (data.taxaAnual < 0.1) {
        erros.taxaAnual = "Taxa mínima é de 0,1% ao ano";
    } else if (data.taxaAnual > 50) {
        erros.taxaAnual = "Taxa máxima é de 50% ao ano";
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
