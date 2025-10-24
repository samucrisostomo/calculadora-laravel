import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import HeaderModerno from "@/Components/HeaderModerno";
import TipoSelectorModerno from "@/Components/TipoSelectorModerno";
import FormularioModerno from "@/Components/FormularioModerno";
import ResultadosModernos from "@/Components/ResultadosModernos";
import BotaoGerarPDF from "@/Components/BotaoGerarPDF";
import Footer from "@/Components/Footer";
import LoadingModerno from "@/Components/LoadingModerno";
import { Button } from "@/Components/ui/button";
import {
    calcularConsorcio,
    calcularFinanciamento,
    compararModalidades,
} from "@/utils/calculations";
import {
    validarConsorcio,
    validarFinanciamento,
    temErros,
} from "@/utils/validations";
import { getConfig } from "@/utils/constants";
import {
    Calculator,
    Loader2,
    AlertCircle,
    Lightbulb,
    Check,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

export default function CalculadoraIndex() {
    const [tipoBem, setTipoBem] = useState("carro");
    const [calculando, setCalculando] = useState(false);
    const [carregandoTaxas, setCarregandoTaxas] = useState(false);
    const [configTaxas, setConfigTaxas] = useState(null);
    const [vantagensConsorcio, setVantagensConsorcio] = useState([]);

    // Estados para Consórcio
    const [dadosConsorcio, setDadosConsorcio] = useState({
        valorBem: 50000,
        lance: 5000,
        prazoMeses: 60,
    });
    const [errosConsorcio, setErrosConsorcio] = useState({});

    // Estados para Financiamento
    const [dadosFinanciamento, setDadosFinanciamento] = useState({
        valorBem: 50000,
        entrada: 5000,
        prazoMeses: 60,
        taxaAnual: 12, // Será ajustado baseado no tipo de bem
    });
    const [errosFinanciamento, setErrosFinanciamento] = useState({});

    // Buscar taxas e vantagens do banco de dados quando o tipo de bem muda
    useEffect(() => {
        const buscarDados = async () => {
            setCarregandoTaxas(true);
            try {
                // Buscar taxas
                const responseTaxas = await axios.get(`/api/taxas/${tipoBem}`);
                setConfigTaxas(responseTaxas.data);

                // Buscar vantagens do consórcio
                const responseVantagens = await axios.get("/api/vantagens");
                setVantagensConsorcio(responseVantagens.data);

                // Atualiza a taxa de juros do financiamento baseada nas taxas do banco
                setDadosFinanciamento((prev) => ({
                    ...prev,
                    taxaAnual: responseTaxas.data.taxaJurosAnualBase,
                }));
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                // Fallback para configuração estática se houver erro
                const configFallback = getConfig(tipoBem);
                setConfigTaxas(configFallback);
                setDadosFinanciamento((prev) => ({
                    ...prev,
                    taxaAnual: configFallback.taxaJurosAnualBase,
                }));
                // Vantagens padrão em caso de erro
                setVantagensConsorcio([
                    {
                        nome: "Sem Juros",
                        descricao:
                            "No consórcio você não paga juros compostos. As taxas são transparentes e muito menores.",
                    },
                    {
                        nome: "Parcelas Fixas",
                        descricao:
                            "As parcelas permanecem as mesmas do início ao fim, facilitando o planejamento financeiro.",
                    },
                    {
                        nome: "Economia Real",
                        descricao:
                            "No final, você pode economizar milhares de reais em comparação ao financiamento tradicional.",
                    },
                    {
                        nome: "Flexibilidade",
                        descricao:
                            "Possibilidade de dar lances para antecipar a contemplação e usar o crédito quando precisar.",
                    },
                ]);
            } finally {
                setCarregandoTaxas(false);
            }
        };

        buscarDados();
        // Limpa resultados ao mudar o tipo
        setMostrarResultados(false);
    }, [tipoBem]);

    // Resultados
    const [resultadoConsorcio, setResultadoConsorcio] = useState(null);
    const [resultadoFinanciamento, setResultadoFinanciamento] = useState(null);
    const [comparacao, setComparacao] = useState(null);
    const [mostrarResultados, setMostrarResultados] = useState(false);

    // Validação e cálculo em tempo real (com debounce)
    useEffect(() => {
        const timer = setTimeout(() => {
            calcularResultados();
        }, 500);

        return () => clearTimeout(timer);
    }, [dadosConsorcio, dadosFinanciamento, tipoBem, configTaxas]);

    const calcularResultados = () => {
        // Não calcula se ainda estiver carregando as taxas
        if (carregandoTaxas || !configTaxas) {
            return;
        }

        // Valida consórcio
        const errosC = validarConsorcio(dadosConsorcio, tipoBem, configTaxas);
        setErrosConsorcio(errosC);

        // Valida financiamento
        const errosF = validarFinanciamento(
            dadosFinanciamento,
            tipoBem,
            configTaxas
        );
        setErrosFinanciamento(errosF);

        // Se não houver erros, calcula
        if (!temErros(errosC) && !temErros(errosF)) {
            setCalculando(true);

            // Simula cálculo (para mostrar loading)
            setTimeout(() => {
                const resConsorcio = calcularConsorcio(
                    dadosConsorcio.valorBem,
                    dadosConsorcio.lance,
                    dadosConsorcio.prazoMeses,
                    tipoBem,
                    configTaxas // Passa as taxas dinâmicas
                );

                const resFinanciamento = calcularFinanciamento(
                    dadosFinanciamento.valorBem,
                    dadosFinanciamento.entrada,
                    dadosFinanciamento.prazoMeses,
                    dadosFinanciamento.taxaAnual,
                    tipoBem,
                    configTaxas // Passa as taxas dinâmicas
                );

                const comp = compararModalidades(
                    resConsorcio,
                    resFinanciamento
                );

                setResultadoConsorcio(resConsorcio);
                setResultadoFinanciamento(resFinanciamento);
                setComparacao(comp);
                setMostrarResultados(true);
                setCalculando(false);

                // Scroll suave para resultados
                if (mostrarResultados) {
                    setTimeout(() => {
                        document.getElementById("resultados")?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        });
                    }, 100);
                }
            }, 300);
        } else {
            setMostrarResultados(false);
        }
    };

    const handleCalcular = () => {
        calcularResultados();

        if (
            mostrarResultados &&
            !temErros(errosConsorcio) &&
            !temErros(errosFinanciamento)
        ) {
            setTimeout(() => {
                document.getElementById("resultados")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, 100);
        }
    };

    return (
        <>
            <Head title="Calculadora Comparativa" />

            <div className="min-h-screen flex flex-col relative overflow-hidden">
                {/* Background Gradiente Animado */}
                <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 animate-gradient"></div>

                {/* Formas Geométricas Flutuantes */}
                <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                    {/* Círculo grande azul */}
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-float-1"></div>

                    {/* Círculo médio verde */}
                    <div className="absolute top-1/4 -left-32 w-80 h-80 bg-gradient-to-br from-green-400/30 to-emerald-400/30 rounded-full blur-3xl animate-float-2"></div>

                    {/* Círculo pequeno roxo */}
                    <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-float-3"></div>

                    {/* Círculo pequeno amarelo */}
                    <div
                        className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl animate-float-1"
                        style={{ animationDelay: "2s" }}
                    ></div>

                    {/* Forma geométrica diagonal */}
                    <div
                        className="absolute top-1/2 right-1/3 w-72 h-72 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-3xl blur-2xl rotate-45 animate-float-2"
                        style={{ animationDelay: "1s" }}
                    ></div>
                </div>

                <HeaderModerno />

                <main className="flex-grow container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
                    {/* Seletor de tipo de bem */}
                    <TipoSelectorModerno
                        tipoBem={tipoBem}
                        setTipoBem={setTipoBem}
                    />

                    {/* Loading de taxas */}
                    {carregandoTaxas && (
                        <div className="text-center py-8">
                            <LoadingModerno />
                            <p className="text-gray-600 mt-4">
                                Carregando taxas atualizadas...
                            </p>
                        </div>
                    )}

                    {/* Formulários lado a lado */}
                    {!carregandoTaxas && configTaxas && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
                            <div
                                className="animate-slide-in"
                                style={{ animationDelay: "0.1s" }}
                            >
                                <FormularioModerno
                                    tipo="consorcio"
                                    dados={dadosConsorcio}
                                    onChange={setDadosConsorcio}
                                    erros={errosConsorcio}
                                    cor="border-green-300"
                                    tipoBem={tipoBem}
                                    configTaxas={configTaxas}
                                />
                            </div>
                            <div
                                className="animate-slide-in-right"
                                style={{ animationDelay: "0.2s" }}
                            >
                                <FormularioModerno
                                    tipo="financiamento"
                                    dados={dadosFinanciamento}
                                    onChange={setDadosFinanciamento}
                                    erros={errosFinanciamento}
                                    cor="border-blue-300"
                                    tipoBem={tipoBem}
                                    configTaxas={configTaxas}
                                />
                            </div>
                        </div>
                    )}

                    {/* Botão Calcular */}
                    {!carregandoTaxas && configTaxas && (
                        <div
                            className="text-center mb-8 sm:mb-10 animate-fade-in"
                            style={{ animationDelay: "0.4s" }}
                        >
                            <Button
                                onClick={handleCalcular}
                                disabled={
                                    calculando ||
                                    carregandoTaxas ||
                                    !configTaxas ||
                                    temErros(errosConsorcio) ||
                                    temErros(errosFinanciamento)
                                }
                                size="lg"
                                className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-12 h-14 sm:h-16 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover-lift animate-glow"
                            >
                                {calculando ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Calculando...
                                    </>
                                ) : (
                                    <>
                                        <Calculator className="mr-2 h-5 w-5" />
                                        Calcular Comparação
                                    </>
                                )}
                            </Button>
                            {(temErros(errosConsorcio) ||
                                temErros(errosFinanciamento)) && (
                                <p className="text-red-600 mt-4 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 animate-fade-in">
                                    <AlertCircle className="w-5 h-5" />
                                    Por favor, corrija os erros nos formulários
                                    acima
                                </p>
                            )}
                        </div>
                    )}

                    {/* Loading */}
                    {calculando && <LoadingModerno />}

                    {/* Resultados */}
                    {mostrarResultados && !calculando && (
                        <div className="space-y-8 sm:space-y-10">
                            <ResultadosModernos
                                consorcio={resultadoConsorcio}
                                financiamento={resultadoFinanciamento}
                                comparacao={comparacao}
                                configTaxas={configTaxas}
                            />

                            <BotaoGerarPDF
                                consorcio={resultadoConsorcio}
                                financiamento={resultadoFinanciamento}
                                comparacao={comparacao}
                                tipoBem={tipoBem}
                                configTaxas={configTaxas}
                            />
                        </div>
                    )}

                    {/* Informações adicionais */}
                    {mostrarResultados && (
                        <Card className="mt-8 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 animate-fade-in hover-lift bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-xl sm:text-2xl flex items-center gap-3 text-amber-900">
                                    <Lightbulb className="w-7 h-7 animate-pulse-soft text-yellow-600" />
                                    Por que o Consórcio pode ser mais vantajoso?
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    {vantagensConsorcio.map(
                                        (vantagem, index) => (
                                            <div
                                                key={index}
                                                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] hover-lift animate-fade-in"
                                                style={{
                                                    animationDelay: `${
                                                        0.1 * index
                                                    }s`,
                                                }}
                                            >
                                                <h4 className="font-bold text-green-700 mb-2 text-sm sm:text-base flex items-center gap-2">
                                                    <Check className="w-4 h-4 text-green-500" />
                                                    {vantagem.nome}
                                                </h4>
                                                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                                                    {vantagem.descricao}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </main>

                <Footer />
            </div>
        </>
    );
}
