import React from "react";
import { Calculator, TrendingDown, Sparkles } from "lucide-react";

const HeaderModerno = () => {
    return (
        <header className="bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 text-white relative overflow-hidden animate-gradient">
            {/* Padrão de fundo decorativo */}
            <div className="absolute inset-0 bg-grid-white/10"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float-1"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-float-2"></div>

            <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-16 relative z-10">
                <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6">
                    {/* Ícone principal */}

                    {/* Título */}
                    <div className="space-y-2 sm:space-y-3">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-bounce-in">
                            Calculadora Comparativa
                        </h1>
                        <div
                            className="flex items-center justify-center gap-2 animate-fade-in"
                            style={{ animationDelay: "0.2s" }}
                        >
                            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse-soft" />
                            <p className="text-base sm:text-lg md:text-xl text-blue-50 max-w-3xl">
                                Compare e descubra as vantagens financeiras
                            </p>
                            <Sparkles
                                className="w-5 h-5 text-yellow-300 animate-pulse-soft"
                                style={{ animationDelay: "0.5s" }}
                            />
                        </div>
                    </div>

                    {/* Badge de economia */}
                    <div
                        className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full animate-scale-in hover:scale-105 transition-all duration-300 cursor-pointer"
                        style={{ animationDelay: "0.4s" }}
                    >
                        <TrendingDown className="w-5 h-5 text-green-300 animate-float" />
                        <span className="text-sm sm:text-base font-semibold">
                            Economize até 20% escolhendo a melhor opção
                        </span>
                    </div>
                </div>
            </div>

            {/* Ondas decorativas na parte inferior */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg
                    className="w-full h-8 sm:h-12"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-gray-50"
                    ></path>
                </svg>
            </div>
        </header>
    );
};

export default HeaderModerno;
