import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import {
    Edit,
    ArrowLeft,
    Star,
    Target,
    Calendar,
    CheckCircle2,
    PauseCircle,
} from "lucide-react";

export default function Show({ auth, vantagem }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl">
                                <Star className="w-7 h-7 text-white" />
                            </div>
                            {vantagem.nome}
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                            Detalhes da vantagem do consórcio
                        </p>
                    </div>
                </div>
            }
        >
            <Head title={vantagem.nome} />

            <div className="py-6">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {/* Card Principal */}
                        <Card className="bg-white/80 backdrop-blur-sm border-2">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg">
                                            <Star className="w-8 h-8 text-yellow-600" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-bold text-gray-900">
                                                {vantagem.nome}
                                            </CardTitle>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Badge
                                                    variant={
                                                        vantagem.ativo
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                    className={
                                                        vantagem.ativo
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-gray-100 text-gray-600"
                                                    }
                                                >
                                                    {vantagem.ativo ? (
                                                        <>
                                                            <CheckCircle2 className="w-3 h-3 mr-1" />
                                                            Ativo
                                                        </>
                                                    ) : (
                                                        <>
                                                            <PauseCircle className="w-3 h-3 mr-1" />
                                                            Inativo
                                                        </>
                                                    )}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                            Descrição
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed text-lg">
                                            {vantagem.descricao}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <Target className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Ordem de Exibição
                                                </p>
                                                <p className="font-semibold text-gray-900">
                                                    {vantagem.ordem}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-green-100 rounded-lg">
                                                <Calendar className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Criado em
                                                </p>
                                                <p className="font-semibold text-gray-900">
                                                    {new Date(
                                                        vantagem.created_at
                                                    ).toLocaleDateString(
                                                        "pt-BR"
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Ações */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-between">
                            <Button
                                variant="outline"
                                onClick={() => window.history.back()}
                                className="flex items-center gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Voltar
                            </Button>

                            <div className="flex gap-3">
                                <Link
                                    href={route(
                                        "admin.vantagens.edit",
                                        vantagem.id
                                    )}
                                >
                                    <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white flex items-center gap-2">
                                        <Edit className="w-4 h-4" />
                                        Editar Vantagem
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
