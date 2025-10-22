import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Car, Home } from "lucide-react";

const TipoSelectorModerno = ({ tipoBem, setTipoBem }) => {
    return (
        <div className="flex justify-center mb-6 sm:mb-8 animate-scale-in">
            <Tabs
                value={tipoBem}
                onValueChange={setTipoBem}
                className="w-full max-w-md"
            >
                <TabsList className="grid w-full grid-cols-2 h-14 bg-white/80 backdrop-blur-sm shadow-lg hover-lift">
                    <TabsTrigger
                        value="carro"
                        className="text-base sm:text-lg flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300 data-[state=active]:scale-105 hover:scale-[1.02]"
                    >
                        <Car className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                        <span>Carro</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="imovel"
                        className="text-base sm:text-lg flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300 data-[state=active]:scale-105 hover:scale-[1.02]"
                    >
                        <Home className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                        <span>Imóvel</span>
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    );
};

export default TipoSelectorModerno;
