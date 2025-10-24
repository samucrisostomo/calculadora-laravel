import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Badge } from "@/Components/ui/badge";
import {
    DollarSign,
    Calendar,
    TrendingUp,
    Info,
    Sprout,
    Building2,
} from "lucide-react";
import { getConfig } from "@/utils/constants";

const FormularioModerno = ({
    tipo,
    dados,
    onChange,
    erros = {},
    cor,
    tipoBem = "carro",
    configTaxas = null, // Taxas dinâmicas do banco de dados
}) => {
    // Usa taxas dinâmicas se fornecidas, senão usa as estáticas
    const config = configTaxas || getConfig(tipoBem);

    const handleChange = (campo, valor) => {
        onChange({ ...dados, [campo]: parseFloat(valor) || 0 });
    };

    const campos =
        tipo === "consorcio"
            ? [
                  {
                      id: "valorBem",
                      label: config.labels.valorBem,
                      placeholder: config.labels.placeholderValor,
                      icon: DollarSign,
                      info: "Valor total do bem que deseja adquirir",
                      required: true,
                  },
                  {
                      id: "lance",
                      label: "Lance",
                      placeholder: "Ex: 5.000 (opcional)",
                      icon: TrendingUp,
                      info: "Valor de lance para antecipar contemplação",
                      required: false,
                  },
                  {
                      id: "prazoMeses",
                      label: "Prazo (meses)",
                      placeholder: `Ex: ${tipoBem === "carro" ? "60" : "240"}`,
                      icon: Calendar,
                      info: `Período de pagamento entre 12 e ${config.prazoMaximoMeses} meses`,
                      required: true,
                      inputMode: "numeric",
                  },
              ]
            : [
                  {
                      id: "valorBem",
                      label: config.labels.valorBem,
                      placeholder: config.labels.placeholderValor,
                      icon: DollarSign,
                      info: "Valor total do bem que deseja adquirir",
                      required: true,
                  },
                  {
                      id: "entrada",
                      label: "Entrada",
                      placeholder: `Ex: ${
                          tipoBem === "carro" ? "5.000" : "100.000"
                      }`,
                      icon: DollarSign,
                      info: "Valor da entrada inicial",
                      required: true,
                  },
                  {
                      id: "prazoMeses",
                      label: "Prazo (meses)",
                      placeholder: `Ex: ${tipoBem === "carro" ? "60" : "240"}`,
                      icon: Calendar,
                      info: `Período de pagamento entre 12 e ${config.prazoMaximoMeses} meses`,
                      required: true,
                      inputMode: "numeric",
                  },
                  {
                      id: "taxaAnual",
                      label: "Taxa de Juros Anual (%)",
                      placeholder: `Ex: ${config.taxaJurosAnualBase}`,
                      icon: TrendingUp,
                      info: `Taxa de juros anual aplicada (base: ${
                          config.taxaJurosAnualBase
                      }% para ${tipoBem === "carro" ? "veículos" : "imóveis"})`,
                      required: true,
                      inputMode: "decimal",
                      suffix: "%",
                  },
              ];

    const IconeComponente = tipo === "consorcio" ? Sprout : Building2;

    return (
        <Card
            className={`border-2 ${cor} hover:scale-[1.01] transition-all duration-300 hover-lift bg-white/80 backdrop-blur-sm`}
        >
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div
                            className={`p-3 rounded-full ${
                                tipo === "consorcio"
                                    ? "bg-green-100"
                                    : "bg-blue-100"
                            }`}
                        >
                            <IconeComponente
                                className={`w-8 h-8 ${
                                    tipo === "consorcio"
                                        ? "text-green-600"
                                        : "text-blue-600"
                                }`}
                            />
                        </div>
                        <div>
                            <CardTitle className="text-xl sm:text-2xl">
                                {tipo === "consorcio"
                                    ? "Consórcio"
                                    : "Financiamento"}
                            </CardTitle>
                            <CardDescription>
                                {tipo === "consorcio"
                                    ? "Sem juros, parcelas fixas"
                                    : "Sistema Price, juros compostos"}
                            </CardDescription>
                        </div>
                    </div>
                    <Badge
                        variant={tipo === "consorcio" ? "secondary" : "default"}
                    >
                        {tipo === "consorcio" ? "Economia" : "Tradicional"}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {campos.map((campo) => {
                    const Icon = campo.icon;
                    return (
                        <div key={campo.id} className="space-y-2">
                            <Label
                                htmlFor={campo.id}
                                className="text-gray-700 flex items-center gap-2"
                            >
                                <Icon className="w-4 h-4" />
                                {campo.label}{" "}
                                {campo.required && (
                                    <span className="text-red-500">*</span>
                                )}
                                <div className="group relative">
                                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                                    <div className="absolute hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg p-2 w-48 -top-2 left-6 z-10">
                                        {campo.info}
                                    </div>
                                </div>
                            </Label>
                            <div className="relative">
                                {campo.id.includes("valor") ||
                                campo.id === "entrada" ||
                                campo.id === "lance" ? (
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                        R$
                                    </span>
                                ) : null}
                                <Input
                                    id={campo.id}
                                    type="number"
                                    value={dados[campo.id] || ""}
                                    onChange={(e) =>
                                        handleChange(campo.id, e.target.value)
                                    }
                                    placeholder={campo.placeholder}
                                    className={`${
                                        campo.id.includes("valor") ||
                                        campo.id === "entrada" ||
                                        campo.id === "lance"
                                            ? "pl-12"
                                            : campo.suffix
                                            ? "pr-12"
                                            : ""
                                    } ${
                                        erros[campo.id]
                                            ? "border-red-500 focus-visible:ring-red-500 animate-shake"
                                            : "focus:scale-[1.01] transition-all duration-200"
                                    } ${
                                        dados[campo.id] && !erros[campo.id]
                                            ? "border-green-400 bg-green-50/30"
                                            : ""
                                    }`}
                                    inputMode={campo.inputMode || "numeric"}
                                    min="0"
                                    step={
                                        campo.id === "taxaAnual"
                                            ? "0.1"
                                            : campo.id === "prazoMeses"
                                            ? "1"
                                            : "1000"
                                    }
                                />
                                {campo.suffix && (
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                        {campo.suffix}
                                    </span>
                                )}
                            </div>
                            {erros[campo.id] && (
                                <p className="text-sm text-red-600 flex items-center gap-1 animate-fade-in">
                                    <Info className="w-4 h-4" />
                                    {erros[campo.id]}
                                </p>
                            )}
                        </div>
                    );
                })}

                <div
                    className={`${
                        tipo === "consorcio"
                            ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300"
                            : "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-300"
                    } border-2 rounded-xl p-5 mt-6 shadow-sm`}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h4
                            className={`font-bold ${
                                tipo === "consorcio"
                                    ? "text-green-800"
                                    : "text-blue-800"
                            } text-base flex items-center gap-2`}
                        >
                            <Info className="w-5 h-5" />
                            {tipo === "consorcio"
                                ? "Taxas Aplicadas"
                                : "Sistema de Cálculo"}
                        </h4>
                        {configTaxas && (
                            <Badge className="bg-blue-500 text-white font-semibold flex items-center gap-1">
                                <Sprout className="w-3 h-3" />
                                Do Banco de Dados
                            </Badge>
                        )}
                    </div>
                    <div className="space-y-2.5">
                        {tipo === "consorcio" ? (
                            <>
                                <div className="flex items-center justify-between p-3 bg-white/80 rounded-lg border border-green-200">
                                    <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-green-600" />
                                        Taxa Administrativa
                                    </span>
                                    <span className="text-sm font-bold text-green-700">
                                        {config.taxaAdministrativaAnual}% ao ano
                                    </span>
                                </div>
                                <div className="p-3 bg-green-100/50 rounded-lg border border-green-200">
                                    <p className="text-xs text-green-800 font-medium flex items-center gap-2">
                                        <Info className="w-3.5 h-3.5" />
                                        Parcelas fixas durante todo o período
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="p-3 bg-blue-100/50 rounded-lg border border-blue-200 mb-3">
                                    <p className="text-xs text-blue-800 font-bold flex items-center gap-2">
                                        <Info className="w-3.5 h-3.5" />
                                        Sistema Price (parcelas fixas com juros)
                                    </p>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-white/80 rounded-lg border border-blue-200">
                                    <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-blue-600" />
                                        Juros Base
                                    </span>
                                    <span className="text-sm font-bold text-blue-700">
                                        {config.taxaJurosAnualBase}% ao ano
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-white/80 rounded-lg border border-blue-200">
                                    <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <Building2 className="w-4 h-4 text-blue-600" />
                                        Seguro
                                    </span>
                                    <span className="text-sm font-bold text-blue-700">
                                        {config.seguroAnualPercentual}% ao ano
                                    </span>
                                </div>
                                {tipoBem === "imovel" && (
                                    <>
                                        <div className="flex items-center justify-between p-3 bg-white/80 rounded-lg border border-blue-200">
                                            <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <DollarSign className="w-4 h-4 text-purple-600" />
                                                Avaliação
                                            </span>
                                            <span className="text-sm font-bold text-blue-700">
                                                {config.taxaAvaliacaoPercentual}
                                                % (inicial)
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-white/80 rounded-lg border border-blue-200">
                                            <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <Building2 className="w-4 h-4 text-purple-600" />
                                                ITBI
                                            </span>
                                            <span className="text-sm font-bold text-blue-700">
                                                {config.itbiPercentual}%
                                                (inicial)
                                            </span>
                                        </div>
                                    </>
                                )}
                                {tipoBem === "carro" && (
                                    <div className="flex items-center justify-between p-3 bg-white/80 rounded-lg border border-blue-200">
                                        <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-blue-600" />
                                            Licenciamento
                                        </span>
                                        <span className="text-sm font-bold text-blue-700">
                                            R${" "}
                                            {config.taxaLicenciamentoAnual.toLocaleString(
                                                "pt-BR",
                                                { minimumFractionDigits: 2 }
                                            )}
                                            /ano
                                        </span>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default FormularioModerno;
