import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { formatarMoeda } from "@/utils/formatters";
import { TrendingUp } from "lucide-react";

const GraficoComparativo = ({ consorcio, financiamento }) => {
    if (!consorcio || !financiamento) {
        return null;
    }

    const data = [
        {
            name: "Consórcio",
            "Custo Total": consorcio.custoTotal,
            "Valor do Bem": consorcio.valorBem,
            "Parcela Mensal": consorcio.parcelaMensal,
        },
        {
            name: "Financiamento",
            "Custo Total": financiamento.custoTotal,
            "Valor do Bem": financiamento.valorBem,
            "Parcela Mensal": financiamento.parcelaMensal,
        },
    ];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                    <p className="font-semibold mb-2">
                        {payload[0].payload.name}
                    </p>
                    {payload.map((entry, index) => (
                        <p
                            key={index}
                            style={{ color: entry.color }}
                            className="text-sm"
                        >
                            {entry.name}: {formatarMoeda(entry.value)}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div
            className="card hover-lift bg-white/80 backdrop-blur-sm animate-scale-in"
            id="grafico"
        >
            <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4 sm:mb-6 flex items-center justify-center gap-2 animate-bounce-in">
                <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 animate-float" />
                Comparação Visual
            </h2>

            <div className="space-y-6 sm:space-y-8">
                {/* Gráfico de Custo Total */}
                <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 mb-3 sm:mb-4 text-center">
                        Custo Total
                    </h3>
                    <ResponsiveContainer
                        width="100%"
                        height={250}
                        className="sm:hidden"
                    >
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="name"
                                style={{ fontSize: "12px" }}
                            />
                            <YAxis
                                tickFormatter={(value) =>
                                    `R$ ${(value / 1000).toFixed(0)}k`
                                }
                                style={{ fontSize: "11px" }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="Custo Total" radius={[8, 8, 0, 0]}>
                                <Cell fill="#22c55e" />
                                <Cell fill="#3b82f6" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer
                        width="100%"
                        height={300}
                        className="hidden sm:block"
                    >
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis
                                tickFormatter={(value) =>
                                    `R$ ${(value / 1000).toFixed(0)}k`
                                }
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="Custo Total" radius={[8, 8, 0, 0]}>
                                <Cell fill="#22c55e" />
                                <Cell fill="#3b82f6" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Gráfico de Parcelas */}
                <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 mb-3 sm:mb-4 text-center">
                        Valor da Parcela Mensal
                    </h3>
                    <ResponsiveContainer
                        width="100%"
                        height={250}
                        className="sm:hidden"
                    >
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="name"
                                style={{ fontSize: "12px" }}
                            />
                            <YAxis
                                tickFormatter={(value) =>
                                    `R$ ${(value / 1000).toFixed(1)}k`
                                }
                                style={{ fontSize: "11px" }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="Parcela Mensal" radius={[8, 8, 0, 0]}>
                                <Cell fill="#22c55e" />
                                <Cell fill="#3b82f6" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer
                        width="100%"
                        height={300}
                        className="hidden sm:block"
                    >
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis
                                tickFormatter={(value) =>
                                    `R$ ${(value / 1000).toFixed(1)}k`
                                }
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="Parcela Mensal" radius={[8, 8, 0, 0]}>
                                <Cell fill="#22c55e" />
                                <Cell fill="#3b82f6" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Comparação Valor do Bem vs Custo Total */}
                <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 mb-3 sm:mb-4 text-center">
                        Valor do Bem vs Custo Total
                    </h3>
                    <ResponsiveContainer
                        width="100%"
                        height={250}
                        className="sm:hidden"
                    >
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="name"
                                style={{ fontSize: "12px" }}
                            />
                            <YAxis
                                tickFormatter={(value) =>
                                    `R$ ${(value / 1000).toFixed(0)}k`
                                }
                                style={{ fontSize: "11px" }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: "12px" }} />
                            <Bar
                                dataKey="Valor do Bem"
                                fill="#9ca3af"
                                radius={[8, 8, 0, 0]}
                            />
                            <Bar dataKey="Custo Total" radius={[8, 8, 0, 0]}>
                                <Cell fill="#22c55e" />
                                <Cell fill="#3b82f6" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer
                        width="100%"
                        height={300}
                        className="hidden sm:block"
                    >
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis
                                tickFormatter={(value) =>
                                    `R$ ${(value / 1000).toFixed(0)}k`
                                }
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar
                                dataKey="Valor do Bem"
                                fill="#9ca3af"
                                radius={[8, 8, 0, 0]}
                            />
                            <Bar dataKey="Custo Total" radius={[8, 8, 0, 0]}>
                                <Cell fill="#22c55e" />
                                <Cell fill="#3b82f6" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default GraficoComparativo;
