import React from "react";
import { Loader2, Calculator } from "lucide-react";

const LoadingModerno = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
            <div className="relative">
                {/* Círculo de fundo pulsante */}
                <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>

                {/* Ícone rotativo */}
                <div className="relative bg-gradient-to-br from-blue-600 to-green-600 p-6 rounded-full shadow-2xl">
                    <Calculator className="w-10 h-10 text-white animate-pulse" />
                </div>
            </div>

            <div className="mt-6 space-y-2 text-center">
                <div className="flex items-center gap-2 justify-center">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                    <p className="text-lg font-semibold text-gray-900">
                        Calculando comparação...
                    </p>
                </div>
                <p className="text-sm text-gray-600">
                    Analisando as melhores opções para você
                </p>
            </div>

            {/* Barra de progresso animada */}
            <div className="mt-6 w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-600 to-green-600 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
};

export default LoadingModerno;
