import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
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
    Plus,
    Edit,
    Trash2,
    Eye,
    Car,
    Home,
    TrendingUp,
    Percent,
    DollarSign,
} from "lucide-react";

export default function Index({ auth, taxas }) {
    const [deletingTaxa, setDeletingTaxa] = useState(null);

    const handleDelete = (taxa) => {
        if (
            confirm(
                `Tem certeza que deseja excluir a taxa "${taxa.nome}"? Esta ação não pode ser desfeita.`
            )
        ) {
            router.delete(route("admin.taxas.destroy", taxa.id), {
                onSuccess: () => {
                    setDeletingTaxa(null);
                },
            });
        }
    };

    const handleToggleAtivo = (taxa) => {
        router.post(
            route("admin.taxas.toggle", taxa.id),
            {},
            {
                preserveScroll: true,
            }
        );
    };

    const getTipoBemIcon = (tipoBem) => {
        return tipoBem === "carro" ? (
            <Car className="w-4 h-4" />
        ) : (
            <Home className="w-4 h-4" />
        );
    };

    const getTipoBemBadge = (tipoBem) => {
        return tipoBem === "carro" ? (
            <Badge variant="outline" className="bg-blue-50">
                <Car className="w-3 h-3 mr-1" />
                Carro
            </Badge>
        ) : (
            <Badge variant="outline" className="bg-purple-50">
                <Home className="w-3 h-3 mr-1" />
                Imóvel
            </Badge>
        );
    };

    const getModalidadeBadge = (modalidade) => {
        return modalidade === "consorcio" ? (
            <Badge variant="secondary" className="bg-green-50">
                Consórcio
            </Badge>
        ) : (
            <Badge variant="default" className="bg-blue-50 text-blue-700">
                Financiamento
            </Badge>
        );
    };

    const getTipoTaxaIcon = (tipoTaxa, valor) => {
        if (tipoTaxa === "percentual") {
            return (
                <span className="flex items-center gap-1">
                    <Percent className="w-4 h-4 text-orange-600" />
                    {valor}%
                </span>
            );
        }
        return (
            <span className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-green-600" />
                R$ {valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
        );
    };

    // Agrupar taxas por tipo de bem
    const taxasPorTipo = {
        carro: taxas.filter((t) => t.tipo_bem === "carro"),
        imovel: taxas.filter((t) => t.tipo_bem === "imovel"),
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Gerenciar Taxas
                    </h2>
                    <Link href={route("admin.taxas.create")}>
                        <Button className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Nova Taxa
                        </Button>
                    </Link>
                </div>
            }
        >
            <Head title="Gerenciar Taxas" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {/* Taxas de Carro */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-blue-100">
                                        <Car className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <CardTitle>Taxas de Carro</CardTitle>
                                        <CardDescription>
                                            {taxasPorTipo.carro.length} taxa(s)
                                            cadastrada(s)
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {taxasPorTipo.carro.length === 0 ? (
                                    <p className="text-center text-gray-500 py-8">
                                        Nenhuma taxa de carro cadastrada.
                                    </p>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b">
                                                    <th className="text-left py-3 px-4 font-semibold text-sm">
                                                        Status
                                                    </th>
                                                    <th className="text-left py-3 px-4 font-semibold text-sm">
                                                        Nome
                                                    </th>
                                                    <th className="text-left py-3 px-4 font-semibold text-sm">
                                                        Modalidade
                                                    </th>
                                                    <th className="text-left py-3 px-4 font-semibold text-sm">
                                                        Valor
                                                    </th>
                                                    <th className="text-left py-3 px-4 font-semibold text-sm">
                                                        Período
                                                    </th>
                                                    <th className="text-right py-3 px-4 font-semibold text-sm">
                                                        Ações
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {taxasPorTipo.carro.map(
                                                    (taxa) => (
                                                        <tr
                                                            key={taxa.id}
                                                            className="border-b hover:bg-gray-50"
                                                        >
                                                            <td className="py-3 px-4">
                                                                <button
                                                                    onClick={() =>
                                                                        handleToggleAtivo(
                                                                            taxa
                                                                        )
                                                                    }
                                                                    className="cursor-pointer"
                                                                >
                                                                    {taxa.ativo ? (
                                                                        <Badge
                                                                            variant="default"
                                                                            className="bg-green-500"
                                                                        >
                                                                            Ativo
                                                                        </Badge>
                                                                    ) : (
                                                                        <Badge variant="secondary">
                                                                            Inativo
                                                                        </Badge>
                                                                    )}
                                                                </button>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <div>
                                                                    <p className="font-medium">
                                                                        {
                                                                            taxa.nome
                                                                        }
                                                                    </p>
                                                                    <p className="text-xs text-gray-500">
                                                                        {
                                                                            taxa.codigo
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                {getModalidadeBadge(
                                                                    taxa.modalidade
                                                                )}
                                                            </td>
                                                            <td className="py-3 px-4 font-semibold">
                                                                {getTipoTaxaIcon(
                                                                    taxa.tipo_taxa,
                                                                    taxa.valor
                                                                )}
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <span className="text-sm text-gray-600 capitalize">
                                                                    {taxa.periodo ||
                                                                        "N/A"}
                                                                </span>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <div className="flex items-center justify-end gap-2">
                                                                    <Link
                                                                        href={route(
                                                                            "admin.taxas.edit",
                                                                            taxa.id
                                                                        )}
                                                                    >
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                        >
                                                                            <Edit className="w-4 h-4" />
                                                                        </Button>
                                                                    </Link>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                taxa
                                                                            )
                                                                        }
                                                                        className="text-red-600 hover:text-red-700"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </Button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Taxas de Imóvel */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-purple-100">
                                        <Home className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <CardTitle>Taxas de Imóvel</CardTitle>
                                        <CardDescription>
                                            {taxasPorTipo.imovel.length} taxa(s)
                                            cadastrada(s)
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {taxasPorTipo.imovel.length === 0 ? (
                                    <p className="text-center text-gray-500 py-8">
                                        Nenhuma taxa de imóvel cadastrada.
                                    </p>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b">
                                                    <th className="text-left py-3 px-4 font-semibold text-sm">
                                                        Status
                                                    </th>
                                                    <th className="text-left py-3 px-4 font-semibold text-sm">
                                                        Nome
                                                    </th>
                                                    <th className="text-left py-3 px-4 font-semibold text-sm">
                                                        Modalidade
                                                    </th>
                                                    <th className="text-left py-3 px-4 font-semibold text-sm">
                                                        Valor
                                                    </th>
                                                    <th className="text-left py-3 px-4 font-semibold text-sm">
                                                        Período
                                                    </th>
                                                    <th className="text-right py-3 px-4 font-semibold text-sm">
                                                        Ações
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {taxasPorTipo.imovel.map(
                                                    (taxa) => (
                                                        <tr
                                                            key={taxa.id}
                                                            className="border-b hover:bg-gray-50"
                                                        >
                                                            <td className="py-3 px-4">
                                                                <button
                                                                    onClick={() =>
                                                                        handleToggleAtivo(
                                                                            taxa
                                                                        )
                                                                    }
                                                                    className="cursor-pointer"
                                                                >
                                                                    {taxa.ativo ? (
                                                                        <Badge
                                                                            variant="default"
                                                                            className="bg-green-500"
                                                                        >
                                                                            Ativo
                                                                        </Badge>
                                                                    ) : (
                                                                        <Badge variant="secondary">
                                                                            Inativo
                                                                        </Badge>
                                                                    )}
                                                                </button>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <div>
                                                                    <p className="font-medium">
                                                                        {
                                                                            taxa.nome
                                                                        }
                                                                    </p>
                                                                    <p className="text-xs text-gray-500">
                                                                        {
                                                                            taxa.codigo
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                {getModalidadeBadge(
                                                                    taxa.modalidade
                                                                )}
                                                            </td>
                                                            <td className="py-3 px-4 font-semibold">
                                                                {getTipoTaxaIcon(
                                                                    taxa.tipo_taxa,
                                                                    taxa.valor
                                                                )}
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <span className="text-sm text-gray-600 capitalize">
                                                                    {taxa.periodo ||
                                                                        "N/A"}
                                                                </span>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <div className="flex items-center justify-end gap-2">
                                                                    <Link
                                                                        href={route(
                                                                            "admin.taxas.edit",
                                                                            taxa.id
                                                                        )}
                                                                    >
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                        >
                                                                            <Edit className="w-4 h-4" />
                                                                        </Button>
                                                                    </Link>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                taxa
                                                                            )
                                                                        }
                                                                        className="text-red-600 hover:text-red-700"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </Button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Link para calculadora */}
                        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200">
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold text-lg">
                                            Ver Calculadora Pública
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Acesse a página principal da
                                            calculadora
                                        </p>
                                    </div>
                                    <Link href={route("calculadora")}>
                                        <Button variant="outline">
                                            <TrendingUp className="w-4 h-4 mr-2" />
                                            Ir para Calculadora
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
