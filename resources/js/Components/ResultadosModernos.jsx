import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Separator } from "@/Components/ui/separator";
import { formatarMoeda, formatarPercentual } from "@/utils/formatters";
import {
    DollarSign,
    TrendingUp,
    Calendar,
    PiggyBank,
    Zap,
    Sparkles,
    ArrowDown,
    Sprout,
    Building2,
    BarChart3,
    Check,
} from "lucide-react";

const ResultadosModernos = ({
    consorcio,
    financiamento,
    comparacao,
    configTaxas,
}) => {
    if (!consorcio || !financiamento || !comparacao) {
        return null;
    }

    const ItemResultado = ({ label, valor, icon: Icon, destaque = false }) => (
        <div
            className={`flex justify-between items-center p-3 rounded-lg transition-all hover:scale-[1.02] ${
                destaque
                    ? "bg-gradient-to-r from-blue-50 to-green-50"
                    : "bg-gray-50"
            }`}
        >
            <span className="flex items-center gap-2 text-sm sm:text-base font-medium text-gray-700">
                <Icon className="w-4 h-4 text-gray-500" />
                {label}
            </span>
            <span
                className={`text-sm sm:text-lg font-bold ${
                    destaque ? "text-blue-600" : "text-gray-900"
                }`}
            >
                {valor}
            </span>
        </div>
    );

    return (
        <div id="resultados" className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
                    <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                    Resultados da Comparação
                    <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </h2>
                <p className="text-gray-600">
                    Análise detalhada das duas modalidades
                </p>
            </div>

            {/* Card de Economia Destacado */}
            {comparacao.consorcioMaisVantajoso && (
                <Card className="border-4 border-green-500 bg-gradient-to-br from-green-50 via-white to-green-50 shadow-2xl animate-bounce-in hover-lift animate-glow">
                    <CardHeader className="text-center pb-4">
                        <div className="flex justify-center mb-4">
                            <div className="bg-green-100 p-4 rounded-full">
                                <PiggyBank className="w-12 h-12 text-green-600" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl sm:text-3xl font-bold text-green-700 flex items-center justify-center gap-2">
                            <Zap className="w-6 h-6" />
                            Você Economiza com Consórcio!
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition-all">
                                <p className="text-gray-600 mb-2 flex items-center justify-center gap-2">
                                    <DollarSign className="w-5 h-5" />
                                    Economia Total
                                </p>
                                <p className="text-4xl sm:text-5xl font-bold text-green-600">
                                    {formatarMoeda(comparacao.economia)}
                                </p>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition-all">
                                <p className="text-gray-600 mb-2 flex items-center justify-center gap-2">
                                    <TrendingUp className="w-5 h-5" />
                                    Percentual
                                </p>
                                <p className="text-4xl sm:text-5xl font-bold text-green-600">
                                    {formatarPercentual(
                                        comparacao.percentualEconomia
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 bg-gradient-to-r from-green-100 to-green-50 rounded-xl p-4 text-center">
                            <p className="text-sm sm:text-base text-green-800 font-semibold flex items-center justify-center gap-2">
                                <ArrowDown className="w-5 h-5" />
                                Parcela mensal{" "}
                                {formatarMoeda(
                                    Math.abs(comparacao.diferencaParcela)
                                )}{" "}
                                menor
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Cards de Comparação */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Card Consórcio */}
                <Card className="border-2 border-green-300 hover:shadow-2xl transition-all animate-slide-in hover-lift bg-white/90 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-br from-green-50 to-white/50">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl sm:text-2xl text-green-700 flex items-center gap-2">
                                <Sprout className="w-6 h-6" />
                                Consórcio
                            </CardTitle>
                            <Badge variant="secondary" className="text-sm">
                                Economia
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-6">
                        <ItemResultado
                            label="Valor do Bem"
                            valor={formatarMoeda(consorcio.valorBem)}
                            icon={DollarSign}
                        />
                        <ItemResultado
                            label="Lance"
                            valor={formatarMoeda(consorcio.lance)}
                            icon={TrendingUp}
                        />
                        <ItemResultado
                            label="Parcela Mensal"
                            valor={formatarMoeda(consorcio.parcelaMensal)}
                            icon={Calendar}
                            destaque
                        />
                        <ItemResultado
                            label="Prazo"
                            valor={`${consorcio.prazoMeses} meses`}
                            icon={Calendar}
                        />
                        <ItemResultado
                            label="Taxa Admin."
                            valor={formatarMoeda(consorcio.taxaAdministrativa)}
                            icon={DollarSign}
                        />

                        {/* Taxas Dinâmicas do Consórcio */}
                        {configTaxas?.taxasConsorcio &&
                            configTaxas.taxasConsorcio.length > 0 && (
                                <>
                                    <Separator className="my-3" />
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                        <p className="text-xs font-semibold text-green-700 mb-2 flex items-center gap-1">
                                            <Sparkles className="w-3 h-3" />
                                            Taxas Aplicadas (Do Banco)
                                        </p>
                                        <div className="space-y-2">
                                            {configTaxas.taxasConsorcio.map(
                                                (taxa) => (
                                                    <div
                                                        key={taxa.codigo}
                                                        className="flex justify-between items-center text-xs"
                                                    >
                                                        <span className="text-green-600 font-medium">
                                                            {taxa.nome}
                                                        </span>
                                                        <span className="text-green-700 font-bold">
                                                            {taxa.tipo_taxa ===
                                                            "percentual"
                                                                ? `${
                                                                      taxa.valor
                                                                  }% ${
                                                                      taxa.periodo ||
                                                                      ""
                                                                  }`
                                                                : `R$ ${parseFloat(
                                                                      taxa.valor
                                                                  ).toLocaleString(
                                                                      "pt-BR",
                                                                      {
                                                                          minimumFractionDigits: 2,
                                                                      }
                                                                  )} ${
                                                                      taxa.periodo ||
                                                                      ""
                                                                  }`}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}

                        <Separator className="my-4" />

                        <div className="bg-green-100 border-2 border-green-400 rounded-xl p-4">
                            <div className="flex items-center justify-between">
                                <span className="text-base sm:text-lg font-bold text-green-900">
                                    Custo Total
                                </span>
                                <span className="text-xl sm:text-2xl font-bold text-green-700">
                                    {formatarMoeda(consorcio.custoTotal)}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Card Financiamento */}
                <Card
                    className="border-2 border-blue-300 hover:shadow-2xl transition-all animate-slide-in hover-lift bg-white/90 backdrop-blur-sm"
                    style={{ animationDelay: "0.1s" }}
                >
                    <CardHeader className="bg-gradient-to-br from-blue-50 to-white/50">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl sm:text-2xl text-blue-700 flex items-center gap-2">
                                <Building2 className="w-6 h-6" />
                                Financiamento
                            </CardTitle>
                            <Badge variant="default" className="text-sm">
                                Tradicional
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-6">
                        <ItemResultado
                            label="Valor do Bem"
                            valor={formatarMoeda(financiamento.valorBem)}
                            icon={DollarSign}
                        />
                        <ItemResultado
                            label="Entrada"
                            valor={formatarMoeda(financiamento.entrada)}
                            icon={DollarSign}
                        />
                        <ItemResultado
                            label="Parcela Mensal"
                            valor={formatarMoeda(financiamento.parcelaMensal)}
                            icon={Calendar}
                            destaque
                        />
                        <ItemResultado
                            label="Prazo"
                            valor={`${financiamento.prazoMeses} meses`}
                            icon={Calendar}
                        />
                        <ItemResultado
                            label="Taxa Anual"
                            valor={formatarPercentual(financiamento.taxaAnual)}
                            icon={TrendingUp}
                        />
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <ItemResultado
                                label="Total de Juros"
                                valor={formatarMoeda(financiamento.totalJuros)}
                                icon={TrendingUp}
                            />
                        </div>

                        {/* Taxas Dinâmicas do Financiamento */}
                        {configTaxas?.taxasFinanciamento &&
                            configTaxas.taxasFinanciamento.length > 0 && (
                                <>
                                    <Separator className="my-3" />
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                        <p className="text-xs font-semibold text-blue-700 mb-2 flex items-center gap-1">
                                            <Sparkles className="w-3 h-3" />
                                            Taxas Aplicadas (Do Banco)
                                        </p>
                                        <div className="space-y-2">
                                            {configTaxas.taxasFinanciamento.map(
                                                (taxa) => (
                                                    <div
                                                        key={taxa.codigo}
                                                        className="flex justify-between items-center text-xs"
                                                    >
                                                        <span className="text-blue-600 font-medium">
                                                            {taxa.nome}
                                                        </span>
                                                        <span className="text-blue-700 font-bold">
                                                            {taxa.tipo_taxa ===
                                                            "percentual"
                                                                ? `${
                                                                      taxa.valor
                                                                  }% ${
                                                                      taxa.periodo ||
                                                                      ""
                                                                  }`
                                                                : `R$ ${parseFloat(
                                                                      taxa.valor
                                                                  ).toLocaleString(
                                                                      "pt-BR",
                                                                      {
                                                                          minimumFractionDigits: 2,
                                                                      }
                                                                  )} ${
                                                                      taxa.periodo ||
                                                                      ""
                                                                  }`}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}

                        <Separator className="my-4" />

                        <div className="bg-blue-100 border-2 border-blue-400 rounded-xl p-4">
                            <div className="flex items-center justify-between">
                                <span className="text-base sm:text-lg font-bold text-blue-900">
                                    Custo Total
                                </span>
                                <span className="text-xl sm:text-2xl font-bold text-blue-700">
                                    {formatarMoeda(financiamento.custoTotal)}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ResultadosModernos;
