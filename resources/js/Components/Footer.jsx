import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 sm:py-8 mt-8 sm:mt-12 md:mt-16">
            <div className="container mx-auto px-3 sm:px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {/* Sobre */}
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                            Sobre a Calculadora
                        </h3>
                        <p className="text-gray-300 text-xs sm:text-sm">
                            Esta ferramenta foi desenvolvida para ajudar você a
                            comparar as vantagens financeiras entre consórcio e
                            financiamento de forma clara e objetiva.
                        </p>
                    </div>

                    {/* Vantagens do Consórcio */}
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                            Vantagens do Consórcio
                        </h3>
                        <ul className="text-gray-300 text-xs sm:text-sm space-y-2">
                            <li>✓ Sem juros abusivos</li>
                            <li>✓ Parcelas fixas</li>
                            <li>✓ Menor custo total</li>
                            <li>✓ Flexibilidade de uso</li>
                        </ul>
                    </div>

                    {/* Importante */}
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                            Importante
                        </h3>
                        <p className="text-gray-300 text-xs sm:text-sm">
                            Os cálculos são simulações baseadas nos dados
                            fornecidos. Para informações precisas e
                            personalizadas, consulte um especialista financeiro
                            ou a administradora de consórcios de sua
                            preferência.
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
                    <p className="text-gray-400 text-xs sm:text-sm">
                        © {new Date().getFullYear()} Calculadora Comparativa.
                        Desenvolvido para fins educacionais.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
