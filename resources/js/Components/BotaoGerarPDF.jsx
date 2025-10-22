import React, { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {
    formatarMoeda,
    formatarPercentual,
    formatarDataHora,
} from "@/utils/formatters";

const BotaoGerarPDF = ({ consorcio, financiamento, comparacao, tipoBem }) => {
    const [gerando, setGerando] = useState(false);

    const gerarPDF = async () => {
        setGerando(true);

        try {
            const pdf = new jsPDF("p", "mm", "a4");
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            let currentY = 20;

            // Título
            pdf.setFontSize(20);
            pdf.setFont(undefined, "bold");
            pdf.text("Relatório Comparativo", pageWidth / 2, currentY, {
                align: "center",
            });

            currentY += 10;
            pdf.setFontSize(14);
            pdf.text("Consórcio vs Financiamento", pageWidth / 2, currentY, {
                align: "center",
            });

            currentY += 5;
            pdf.setFontSize(10);
            pdf.setFont(undefined, "normal");
            pdf.text(
                `Tipo de Bem: ${tipoBem === "carro" ? "Carro" : "Imóvel"}`,
                pageWidth / 2,
                currentY,
                { align: "center" }
            );

            currentY += 5;
            pdf.text(`Data: ${formatarDataHora()}`, pageWidth / 2, currentY, {
                align: "center",
            });

            currentY += 15;

            // Linha divisória
            pdf.setDrawColor(200, 200, 200);
            pdf.line(20, currentY, pageWidth - 20, currentY);
            currentY += 10;

            // Seção Consórcio
            pdf.setFontSize(16);
            pdf.setFont(undefined, "bold");
            pdf.setTextColor(34, 197, 94); // Verde
            pdf.text("Consórcio", 20, currentY);
            currentY += 10;

            pdf.setFontSize(11);
            pdf.setFont(undefined, "normal");
            pdf.setTextColor(0, 0, 0);

            const dadosConsorcio = [
                ["Valor do Bem:", formatarMoeda(consorcio.valorBem)],
                ["Lance:", formatarMoeda(consorcio.lance)],
                ["Parcela Mensal:", formatarMoeda(consorcio.parcelaMensal)],
                ["Prazo:", `${consorcio.prazoMeses} meses`],
                [
                    "Taxa Administrativa:",
                    formatarMoeda(consorcio.taxaAdministrativa),
                ],
                ["Comissão:", formatarMoeda(consorcio.comissao)],
            ];

            dadosConsorcio.forEach(([label, value]) => {
                pdf.text(label, 25, currentY);
                pdf.text(value, pageWidth - 25, currentY, { align: "right" });
                currentY += 7;
            });

            currentY += 3;
            pdf.setFontSize(12);
            pdf.setFont(undefined, "bold");
            pdf.text("Custo Total:", 25, currentY);
            pdf.text(
                formatarMoeda(consorcio.custoTotal),
                pageWidth - 25,
                currentY,
                {
                    align: "right",
                }
            );

            currentY += 15;

            // Seção Financiamento
            pdf.setFontSize(16);
            pdf.setTextColor(59, 130, 246); // Azul
            pdf.text("Financiamento", 20, currentY);
            currentY += 10;

            pdf.setFontSize(11);
            pdf.setFont(undefined, "normal");
            pdf.setTextColor(0, 0, 0);

            const dadosFinanciamento = [
                ["Valor do Bem:", formatarMoeda(financiamento.valorBem)],
                ["Entrada:", formatarMoeda(financiamento.entrada)],
                ["Parcela Mensal:", formatarMoeda(financiamento.parcelaMensal)],
                ["Prazo:", `${financiamento.prazoMeses} meses`],
                ["Taxa Anual:", formatarPercentual(financiamento.taxaAnual)],
                ["Total de Juros:", formatarMoeda(financiamento.totalJuros)],
            ];

            dadosFinanciamento.forEach(([label, value]) => {
                pdf.text(label, 25, currentY);
                pdf.text(value, pageWidth - 25, currentY, { align: "right" });
                currentY += 7;
            });

            currentY += 3;
            pdf.setFontSize(12);
            pdf.setFont(undefined, "bold");
            pdf.text("Custo Total:", 25, currentY);
            pdf.text(
                formatarMoeda(financiamento.custoTotal),
                pageWidth - 25,
                currentY,
                { align: "right" }
            );

            currentY += 15;

            // Linha divisória
            pdf.setDrawColor(200, 200, 200);
            pdf.line(20, currentY, pageWidth - 20, currentY);
            currentY += 10;

            // Seção de Economia
            if (comparacao.consorcioMaisVantajoso) {
                pdf.setFontSize(16);
                pdf.setFont(undefined, "bold");
                pdf.setTextColor(34, 197, 94);
                pdf.text("Economia com Consórcio", pageWidth / 2, currentY, {
                    align: "center",
                });
                currentY += 10;

                pdf.setFontSize(14);
                pdf.text(
                    `${formatarMoeda(comparacao.economia)}`,
                    pageWidth / 2,
                    currentY,
                    { align: "center" }
                );
                currentY += 7;

                pdf.setFontSize(12);
                pdf.text(
                    `(${formatarPercentual(
                        comparacao.percentualEconomia
                    )} de economia)`,
                    pageWidth / 2,
                    currentY,
                    { align: "center" }
                );
                currentY += 15;
            }

            // Vantagens do Consórcio
            pdf.setFontSize(14);
            pdf.setFont(undefined, "bold");
            pdf.setTextColor(0, 0, 0);
            pdf.text("Vantagens do Consórcio:", 20, currentY);
            currentY += 10;

            pdf.setFontSize(11);
            pdf.setFont(undefined, "normal");

            const vantagens = [
                "Sem juros: você paga apenas taxas administrativas",
                "Parcelas fixas durante todo o período",
                "Possibilidade de antecipação com lances",
                "Menor custo total em comparação ao financiamento",
                "Flexibilidade de uso do crédito contemplado",
            ];

            vantagens.forEach((vantagem) => {
                const lines = pdf.splitTextToSize(
                    `• ${vantagem}`,
                    pageWidth - 50
                );
                lines.forEach((line) => {
                    if (currentY > pageHeight - 20) {
                        pdf.addPage();
                        currentY = 20;
                    }
                    pdf.text(line, 25, currentY);
                    currentY += 7;
                });
            });

            // Rodapé
            pdf.setFontSize(9);
            pdf.setTextColor(128, 128, 128);
            pdf.text(
                "Este relatório é apenas uma simulação. Consulte um especialista para mais informações.",
                pageWidth / 2,
                pageHeight - 10,
                { align: "center" }
            );

            // Salvar PDF
            pdf.save(`comparativo-consorcio-financiamento-${Date.now()}.pdf`);
        } catch (error) {
            console.error("Erro ao gerar PDF:", error);
            alert("Erro ao gerar PDF. Por favor, tente novamente.");
        } finally {
            setGerando(false);
        }
    };

    if (!consorcio || !financiamento || !comparacao) {
        return null;
    }

    return (
        <div className="flex flex-col items-center gap-4 mt-8 animate-fade-in">
            <button
                onClick={gerarPDF}
                disabled={gerando}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 w-full sm:w-auto text-base sm:text-lg"
            >
                {gerando ? (
                    <>
                        <svg
                            className="animate-spin h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Gerando PDF...
                    </>
                ) : (
                    <>
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        Baixar Relatório PDF
                    </>
                )}
            </button>
            <p className="text-sm text-gray-600 text-center max-w-md">
                Gere um relatório completo com todos os detalhes da comparação
                para guardar ou compartilhar
            </p>
        </div>
    );
};

export default BotaoGerarPDF;
