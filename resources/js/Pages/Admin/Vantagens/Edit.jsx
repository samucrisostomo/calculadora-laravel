import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Switch } from "@/Components/ui/switch";
import { Edit, Save, RefreshCw, ArrowLeft } from "lucide-react";

export default function Edit({ auth, vantagem }) {
    const { data, setData, put, processing, errors } = useForm({
        nome: vantagem.nome,
        descricao: vantagem.descricao,
        ordem: vantagem.ordem.toString(),
        ativo: vantagem.ativo,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.vantagens.update", vantagem.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl">
                                <Edit className="w-7 h-7 text-white" />
                            </div>
                            Editar Vantagem
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                            Atualize as informações da vantagem
                        </p>
                    </div>
                </div>
            }
        >
            <Head title={`Editar ${vantagem.nome}`} />

            <div className="py-6">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <Card className="bg-white/80 backdrop-blur-sm border-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Edit className="w-5 h-5 text-yellow-600" />
                                Editar: {vantagem.nome}
                            </CardTitle>
                            <CardDescription>
                                Modifique as informações da vantagem do
                                consórcio
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Label htmlFor="nome">
                                        Nome da Vantagem *
                                    </Label>
                                    <Input
                                        id="nome"
                                        value={data.nome}
                                        onChange={(e) =>
                                            setData("nome", e.target.value)
                                        }
                                        placeholder="Ex: Sem Juros"
                                        className="mt-1"
                                        required
                                    />
                                    {errors.nome && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.nome}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="descricao">
                                        Descrição *
                                    </Label>
                                    <textarea
                                        id="descricao"
                                        value={data.descricao}
                                        onChange={(e) =>
                                            setData("descricao", e.target.value)
                                        }
                                        placeholder="Descreva a vantagem do consórcio..."
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        rows={4}
                                        required
                                    />
                                    {errors.descricao && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.descricao}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="ordem">
                                            Ordem de Exibição
                                        </Label>
                                        <Input
                                            id="ordem"
                                            type="number"
                                            value={data.ordem}
                                            onChange={(e) =>
                                                setData("ordem", e.target.value)
                                            }
                                            placeholder="0"
                                            className="mt-1"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            Controla a ordem de exibição na
                                            calculadora
                                        </p>
                                        <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
                                            <p className="text-sm text-amber-800">
                                                <strong>Dica:</strong> Se a
                                                ordem escolhida já existir, a
                                                vantagem será definida como
                                                inativa.
                                            </p>
                                        </div>
                                        {errors.ordem && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.ordem}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-2 pt-6">
                                        <Switch
                                            id="ativo"
                                            checked={data.ativo}
                                            onCheckedChange={(checked) =>
                                                setData("ativo", checked)
                                            }
                                        />
                                        <Label htmlFor="ativo">
                                            Vantagem Ativa
                                        </Label>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-6 border-t border-gray-200">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => window.history.back()}
                                        className="flex items-center gap-2"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Voltar
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white flex items-center gap-2"
                                    >
                                        {processing ? (
                                            <RefreshCw className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Save className="w-4 h-4" />
                                        )}
                                        {processing
                                            ? "Salvando..."
                                            : "Salvar Alterações"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
