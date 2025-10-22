import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
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
import { ArrowLeft, Save } from "lucide-react";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        nome: "",
        codigo: "",
        tipo_bem: "carro",
        modalidade: "consorcio",
        tipo_taxa: "percentual",
        valor: "",
        periodo: "anual",
        descricao: "",
        ativo: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.taxas.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Nova Taxa
                    </h2>
                    <Link href={route("admin.taxas.index")}>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Voltar
                        </Button>
                    </Link>
                </div>
            }
        >
            <Head title="Nova Taxa" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Cadastrar Nova Taxa</CardTitle>
                            <CardDescription>
                                Preencha os dados abaixo para criar uma nova
                                taxa
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Nome e Código */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="nome">
                                            Nome da Taxa *
                                        </Label>
                                        <Input
                                            id="nome"
                                            value={data.nome}
                                            onChange={(e) =>
                                                setData("nome", e.target.value)
                                            }
                                            className={
                                                errors.nome
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                            placeholder="Ex: Taxa Administrativa"
                                        />
                                        {errors.nome && (
                                            <p className="text-sm text-red-600">
                                                {errors.nome}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="codigo">Código *</Label>
                                        <Input
                                            id="codigo"
                                            value={data.codigo}
                                            onChange={(e) =>
                                                setData(
                                                    "codigo",
                                                    e.target.value
                                                )
                                            }
                                            className={
                                                errors.codigo
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                            placeholder="Ex: taxa_admin_carro"
                                        />
                                        {errors.codigo && (
                                            <p className="text-sm text-red-600">
                                                {errors.codigo}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Tipo de Bem e Modalidade */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="tipo_bem">
                                            Tipo de Bem *
                                        </Label>
                                        <select
                                            id="tipo_bem"
                                            value={data.tipo_bem}
                                            onChange={(e) =>
                                                setData(
                                                    "tipo_bem",
                                                    e.target.value
                                                )
                                            }
                                            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                                                errors.tipo_bem
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                        >
                                            <option value="carro">Carro</option>
                                            <option value="imovel">
                                                Imóvel
                                            </option>
                                        </select>
                                        {errors.tipo_bem && (
                                            <p className="text-sm text-red-600">
                                                {errors.tipo_bem}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="modalidade">
                                            Modalidade *
                                        </Label>
                                        <select
                                            id="modalidade"
                                            value={data.modalidade}
                                            onChange={(e) =>
                                                setData(
                                                    "modalidade",
                                                    e.target.value
                                                )
                                            }
                                            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                                                errors.modalidade
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                        >
                                            <option value="consorcio">
                                                Consórcio
                                            </option>
                                            <option value="financiamento">
                                                Financiamento
                                            </option>
                                        </select>
                                        {errors.modalidade && (
                                            <p className="text-sm text-red-600">
                                                {errors.modalidade}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Tipo de Taxa e Valor */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="tipo_taxa">
                                            Tipo de Taxa *
                                        </Label>
                                        <select
                                            id="tipo_taxa"
                                            value={data.tipo_taxa}
                                            onChange={(e) =>
                                                setData(
                                                    "tipo_taxa",
                                                    e.target.value
                                                )
                                            }
                                            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                                                errors.tipo_taxa
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                        >
                                            <option value="percentual">
                                                Percentual (%)
                                            </option>
                                            <option value="fixo">
                                                Valor Fixo (R$)
                                            </option>
                                        </select>
                                        {errors.tipo_taxa && (
                                            <p className="text-sm text-red-600">
                                                {errors.tipo_taxa}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="valor">Valor *</Label>
                                        <Input
                                            id="valor"
                                            type="number"
                                            step="0.01"
                                            value={data.valor}
                                            onChange={(e) =>
                                                setData("valor", e.target.value)
                                            }
                                            className={
                                                errors.valor
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                            placeholder={
                                                data.tipo_taxa === "percentual"
                                                    ? "Ex: 1.2"
                                                    : "Ex: 200.00"
                                            }
                                        />
                                        {errors.valor && (
                                            <p className="text-sm text-red-600">
                                                {errors.valor}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Período */}
                                <div className="space-y-2">
                                    <Label htmlFor="periodo">Período</Label>
                                    <select
                                        id="periodo"
                                        value={data.periodo}
                                        onChange={(e) =>
                                            setData("periodo", e.target.value)
                                        }
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    >
                                        <option value="mensal">Mensal</option>
                                        <option value="anual">Anual</option>
                                        <option value="unico">Único</option>
                                    </select>
                                </div>

                                {/* Descrição */}
                                <div className="space-y-2">
                                    <Label htmlFor="descricao">
                                        Descrição (Opcional)
                                    </Label>
                                    <textarea
                                        id="descricao"
                                        value={data.descricao}
                                        onChange={(e) =>
                                            setData("descricao", e.target.value)
                                        }
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        placeholder="Digite uma descrição para a taxa..."
                                    />
                                </div>

                                {/* Ativo */}
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="ativo"
                                        checked={data.ativo}
                                        onChange={(e) =>
                                            setData("ativo", e.target.checked)
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                    />
                                    <Label
                                        htmlFor="ativo"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Taxa ativa
                                    </Label>
                                </div>

                                {/* Botões */}
                                <div className="flex items-center justify-end gap-3 pt-4 border-t">
                                    <Link href={route("admin.taxas.index")}>
                                        <Button type="button" variant="outline">
                                            Cancelar
                                        </Button>
                                    </Link>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="flex items-center gap-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        {processing ? "Salvando..." : "Salvar"}
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
