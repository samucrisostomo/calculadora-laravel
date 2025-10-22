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
                      info: `Valor de lance para antecipar contemplação (máx. ${config.lanceMaximoPercentual}%)`,
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
                      info: `Valor da entrada inicial (mín. ${config.entradaMinimaPercentual}%, máx. 80%)`,
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
                            ? "bg-green-50 border-green-200"
                            : "bg-blue-50 border-blue-200"
                    } border rounded-lg p-4 mt-6`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <h4
                            className={`font-semibold ${
                                tipo === "consorcio"
                                    ? "text-green-800"
                                    : "text-blue-800"
                            } text-sm flex items-center gap-2`}
                        >
                            <Info className="w-4 h-4" />
                            {tipo === "consorcio"
                                ? "Taxas Aplicadas"
                                : "Sistema de Cálculo"}
                        </h4>
                        {configTaxas && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                                Taxas Atualizadas
                            </span>
                        )}
                    </div>
                    <ul
                        className={`${
                            tipo === "consorcio"
                                ? "text-green-700"
                                : "text-blue-700"
                        } text-xs space-y-1`}
                    >
                        {tipo === "consorcio" ? (
                            <>
                                <li>
                                    • Taxa administrativa:{" "}
                                    {config.taxaAdministrativaAnual}% ao ano
                                </li>
                                <li>
                                    • Comissão: {config.comissaoPercentual}% do
                                    valor do bem
                                </li>
                                <li>• Parcelas fixas durante todo período</li>
                            </>
                        ) : (
                            <>
                                <li>• Sistema Price (parcelas fixas)</li>
                                <li>
                                    • Juros base: {config.taxaJurosAnualBase}%
                                    ao ano
                                </li>
                                <li>
                                    • Seguro: {config.seguroAnualPercentual}% ao
                                    ano
                                </li>
                                {tipoBem === "imovel" && (
                                    <>
                                        <li>
                                            • Taxa de avaliação:{" "}
                                            {config.taxaAvaliacaoPercentual}%
                                        </li>
                                        <li>
                                            • ITBI: {config.itbiPercentual}%
                                            (custo inicial)
                                        </li>
                                    </>
                                )}
                                {tipoBem === "carro" && (
                                    <li>
                                        • Licenciamento: R${" "}
                                        {config.taxaLicenciamentoAnual}/ano
                                    </li>
                                )}
                            </>
                        )}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
};

export default FormularioModerno;
