import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Switch } from "@/Components/ui/switch";
import {
    Plus,
    Edit,
    Trash2,
    Search,
    X,
    Save,
    AlertTriangle,
    CheckCircle2,
    Info,
    Lightbulb,
    Filter,
    RefreshCw,
    Sparkles,
    PauseCircle,
    PlayCircle,
    Handshake,
    Star,
    Target,
    Shield,
    Zap,
} from "lucide-react";

export default function Index({ auth, vantagens, flash }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("todos");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedVantagem, setSelectedVantagem] = useState(null);
    const [toast, setToast] = useState(null);

    const {
        data: formData,
        setData: setFormData,
        post,
        put,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        nome: "",
        descricao: "",
        ordem: "",
        ativo: true,
    });

    // Toast notification
    useEffect(() => {
        if (flash?.success) {
            showToast(flash.success, "success");
        }
        if (flash?.warning) {
            showToast(flash.warning, "warning");
        }
        if (flash?.error) {
            showToast(flash.error, "error");
        }
    }, [flash]);

    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    // Filtrar vantagens
    const filteredVantagens = vantagens.filter((vantagem) => {
        const matchesSearch =
            vantagem.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vantagem.descricao.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            filterStatus === "todos" ||
            (filterStatus === "ativo" && vantagem.ativo) ||
            (filterStatus === "inativo" && !vantagem.ativo);

        return matchesSearch && matchesStatus;
    });

    const handleCreate = () => {
        setIsCreateModalOpen(true);
        reset();
        clearErrors();
    };

    const handleEdit = (vantagem) => {
        setSelectedVantagem(vantagem);
        setFormData({
            nome: vantagem.nome,
            descricao: vantagem.descricao,
            ordem: vantagem.ordem.toString(),
            ativo: vantagem.ativo,
        });
        setIsEditModalOpen(true);
        clearErrors();
    };

    const handleDelete = (vantagem) => {
        setSelectedVantagem(vantagem);
        setIsDeleteModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isCreateModalOpen) {
            post(route("admin.vantagens.store"), {
                onSuccess: () => {
                    setIsCreateModalOpen(false);
                    reset();
                },
            });
        } else if (isEditModalOpen) {
            put(route("admin.vantagens.update", selectedVantagem.id), {
                onSuccess: () => {
                    setIsEditModalOpen(false);
                    setSelectedVantagem(null);
                },
            });
        }
    };

    const handleDeleteConfirm = () => {
        router.delete(route("admin.vantagens.destroy", selectedVantagem.id), {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setSelectedVantagem(null);
            },
            onError: (errors) => {
                console.error("Erro na exclusão:", errors);
                showToast("Erro ao excluir vantagem", "error");
            },
        });
    };

    const handleToggleAtivo = (vantagem) => {
        router.post(route("admin.vantagens.toggle", vantagem.id));
    };

    const clearFilters = () => {
        setSearchTerm("");
        setFilterStatus("todos");
    };

    const hasActiveFilters = searchTerm !== "" || filterStatus !== "todos";

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl">
                                <Lightbulb className="w-7 h-7 text-white" />
                            </div>
                            Vantagens do Consórcio
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                            Gerencie as vantagens exibidas na calculadora
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Gerenciar Vantagens" />

            {/* Toast Notification */}
            {toast && (
                <div className="fixed top-4 right-4 z-[100] animate-in slide-in-from-top-5 duration-300 max-w-md">
                    <div
                        className={`flex items-start gap-3 px-6 py-4 rounded-xl shadow-2xl border-2 ${
                            toast.type === "success"
                                ? "bg-green-50 border-green-200 text-green-800"
                                : toast.type === "warning"
                                ? "bg-amber-50 border-amber-200 text-amber-800"
                                : "bg-red-50 border-red-200 text-red-800"
                        }`}
                    >
                        <div
                            className={`p-1 rounded-full flex-shrink-0 ${
                                toast.type === "success"
                                    ? "bg-green-100"
                                    : toast.type === "warning"
                                    ? "bg-amber-100"
                                    : "bg-red-100"
                            }`}
                        >
                            {toast.type === "success" ? (
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                            ) : toast.type === "warning" ? (
                                <AlertTriangle className="w-4 h-4 text-amber-600" />
                            ) : (
                                <AlertTriangle className="w-4 h-4 text-red-600" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className="font-medium text-sm leading-relaxed block">
                                {toast.message}
                            </span>
                        </div>
                        <button
                            onClick={() => setToast(null)}
                            className="ml-2 p-1 hover:bg-black/10 rounded-full transition-colors flex-shrink-0"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header com botões */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                <Button
                                    onClick={handleCreate}
                                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Nova Vantagem
                                </Button>
                            </div>

                            {/* Filtros */}
                            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        placeholder="Buscar vantagens..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="pl-10 w-full sm:w-64"
                                    />
                                </div>

                                <select
                                    value={filterStatus}
                                    onChange={(e) =>
                                        setFilterStatus(e.target.value)
                                    }
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                >
                                    <option value="todos">Todos</option>
                                    <option value="ativo">Ativos</option>
                                    <option value="inativo">Inativos</option>
                                </select>

                                {hasActiveFilters && (
                                    <Button
                                        variant="outline"
                                        onClick={clearFilters}
                                        className="flex items-center gap-2"
                                    >
                                        <X className="w-4 h-4" />
                                        Limpar
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Lista de Vantagens */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredVantagens.map((vantagem) => (
                            <Card
                                key={vantagem.id}
                                className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-white/80 backdrop-blur-sm border-2 hover:border-yellow-200"
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg">
                                                <Star className="w-5 h-5 text-yellow-600" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg font-bold text-gray-900">
                                                    {vantagem.nome}
                                                </CardTitle>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge
                                                        variant={
                                                            vantagem.ativo
                                                                ? "default"
                                                                : "secondary"
                                                        }
                                                        className={`${
                                                            vantagem.ativo
                                                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                        } cursor-pointer transition-colors`}
                                                        onClick={() =>
                                                            handleToggleAtivo(
                                                                vantagem
                                                            )
                                                        }
                                                    >
                                                        {vantagem.ativo ? (
                                                            <>
                                                                <PlayCircle className="w-3 h-3 mr-1" />
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

                                <CardContent className="pt-0">
                                    <CardDescription className="text-gray-600 leading-relaxed mb-4">
                                        {vantagem.descricao}
                                    </CardDescription>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Target className="w-4 h-4" />
                                            Ordem: {vantagem.ordem}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleEdit(vantagem)
                                                }
                                                className="hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-700"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(vantagem)
                                                }
                                                className="hover:bg-red-50 hover:border-red-300 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Mensagem quando não há vantagens */}
                    {filteredVantagens.length === 0 && (
                        <div className="text-center py-12">
                            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <Lightbulb className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Nenhuma vantagem encontrada
                            </h3>
                            <p className="text-gray-500 mb-6">
                                {hasActiveFilters
                                    ? "Tente ajustar os filtros ou criar uma nova vantagem."
                                    : "Comece criando sua primeira vantagem do consórcio."}
                            </p>
                            {!hasActiveFilters && (
                                <Button
                                    onClick={handleCreate}
                                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Criar Primeira Vantagem
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de Criação */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Plus className="w-5 h-5 text-yellow-600" />
                                Nova Vantagem
                            </CardTitle>
                            <CardDescription>
                                Adicione uma nova vantagem do consórcio
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="nome">
                                        Nome da Vantagem
                                    </Label>
                                    <Input
                                        id="nome"
                                        value={formData.nome}
                                        onChange={(e) =>
                                            setFormData("nome", e.target.value)
                                        }
                                        placeholder="Ex: Sem Juros"
                                        className="mt-1"
                                    />
                                    {errors.nome && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.nome}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="descricao">Descrição</Label>
                                    <textarea
                                        id="descricao"
                                        value={formData.descricao}
                                        onChange={(e) =>
                                            setFormData(
                                                "descricao",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Descreva a vantagem do consórcio..."
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        rows={4}
                                    />
                                    {errors.descricao && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.descricao}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="ordem">Ordem</Label>
                                        <Input
                                            id="ordem"
                                            type="number"
                                            value={formData.ordem}
                                            onChange={(e) =>
                                                setFormData(
                                                    "ordem",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="0"
                                            className="mt-1"
                                        />
                                        {errors.ordem && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.ordem}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-2 pt-6">
                                        <Switch
                                            id="ativo"
                                            checked={formData.ativo}
                                            onCheckedChange={(checked) =>
                                                setFormData("ativo", checked)
                                            }
                                        />
                                        <Label htmlFor="ativo">Ativo</Label>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setIsCreateModalOpen(false);
                                            reset();
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                                    >
                                        {processing ? (
                                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                        ) : (
                                            <Save className="w-4 h-4 mr-2" />
                                        )}
                                        {processing ? "Salvando..." : "Salvar"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Modal de Edição */}
            {isEditModalOpen && selectedVantagem && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Edit className="w-5 h-5 text-yellow-600" />
                                Editar Vantagem
                            </CardTitle>
                            <CardDescription>
                                Atualize as informações da vantagem
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="nome">
                                        Nome da Vantagem
                                    </Label>
                                    <Input
                                        id="nome"
                                        value={formData.nome}
                                        onChange={(e) =>
                                            setFormData("nome", e.target.value)
                                        }
                                        placeholder="Ex: Sem Juros"
                                        className="mt-1"
                                    />
                                    {errors.nome && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.nome}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="descricao">Descrição</Label>
                                    <textarea
                                        id="descricao"
                                        value={formData.descricao}
                                        onChange={(e) =>
                                            setFormData(
                                                "descricao",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Descreva a vantagem do consórcio..."
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        rows={4}
                                    />
                                    {errors.descricao && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.descricao}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="ordem">Ordem</Label>
                                        <Input
                                            id="ordem"
                                            type="number"
                                            value={formData.ordem}
                                            onChange={(e) =>
                                                setFormData(
                                                    "ordem",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="0"
                                            className="mt-1"
                                        />
                                        {errors.ordem && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.ordem}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-2 pt-6">
                                        <Switch
                                            id="ativo"
                                            checked={formData.ativo}
                                            onCheckedChange={(checked) =>
                                                setFormData("ativo", checked)
                                            }
                                        />
                                        <Label htmlFor="ativo">Ativo</Label>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setIsEditModalOpen(false);
                                            setSelectedVantagem(null);
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                                    >
                                        {processing ? (
                                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                        ) : (
                                            <Save className="w-4 h-4 mr-2" />
                                        )}
                                        {processing ? "Salvando..." : "Salvar"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Modal de Exclusão */}
            {isDeleteModalOpen && selectedVantagem && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-red-600">
                                <AlertTriangle className="w-5 h-5" />
                                Confirmar Exclusão
                            </CardTitle>
                            <CardDescription>
                                Esta ação não pode ser desfeita.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-6">
                                Tem certeza que deseja excluir a vantagem{" "}
                                <strong>"{selectedVantagem.nome}"</strong>?
                            </p>
                            <div className="flex justify-end gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setIsDeleteModalOpen(false);
                                        setSelectedVantagem(null);
                                    }}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleDeleteConfirm}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Excluir
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
