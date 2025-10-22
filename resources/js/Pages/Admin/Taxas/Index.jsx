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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    Plus,
    Edit,
    Trash2,
    Car,
    Home,
    Percent,
    DollarSign,
    Search,
    X,
    Save,
    AlertTriangle,
    TrendingUp,
    CheckCircle2,
    Info,
    Zap,
    Filter,
    RefreshCw,
    Calendar,
    CalendarDays,
    Sparkles,
    PauseCircle,
    PlayCircle,
    Building2,
    CreditCard,
    Handshake,
    BarChart3,
} from "lucide-react";

export default function Index({ auth, taxas, flash }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterTipoBem, setFilterTipoBem] = useState("todos");
    const [filterModalidade, setFilterModalidade] = useState("todos");
    const [filterStatus, setFilterStatus] = useState("todos");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTaxa, setSelectedTaxa] = useState(null);
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
        codigo: "",
        tipo_bem: "carro",
        modalidade: "consorcio",
        tipo_taxa: "percentual",
        valor: "",
        periodo: "anual",
        descricao: "",
        ativo: true,
    });

    // Toast notification
    useEffect(() => {
        if (flash?.success) {
            showToast(flash.success, "success");
        }
        if (flash?.error) {
            showToast(flash.error, "error");
        }
    }, [flash]);

    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    // Filtrar taxas
    const filteredTaxas = taxas.filter((taxa) => {
        const matchesSearch =
            taxa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            taxa.codigo.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTipoBem =
            filterTipoBem === "todos" || taxa.tipo_bem === filterTipoBem;
        const matchesModalidade =
            filterModalidade === "todos" ||
            taxa.modalidade === filterModalidade;
        const matchesStatus =
            filterStatus === "todos" ||
            (filterStatus === "ativos" && taxa.ativo) ||
            (filterStatus === "inativos" && !taxa.ativo);
        return (
            matchesSearch &&
            matchesTipoBem &&
            matchesModalidade &&
            matchesStatus
        );
    });

    // Estatísticas
    const stats = {
        total: taxas.length,
        ativos: taxas.filter((t) => t.ativo).length,
        inativos: taxas.filter((t) => !t.ativo).length,
        carros: taxas.filter((t) => t.tipo_bem === "carro").length,
        imoveis: taxas.filter((t) => t.tipo_bem === "imovel").length,
    };

    // Agrupar taxas filtradas
    const taxasPorTipo = {
        carro: filteredTaxas.filter((t) => t.tipo_bem === "carro"),
        imovel: filteredTaxas.filter((t) => t.tipo_bem === "imovel"),
    };

    // Handlers de Modal
    const openCreateModal = () => {
        reset();
        clearErrors();
        setIsCreateModalOpen(true);
    };

    const openEditModal = (taxa) => {
        setSelectedTaxa(taxa);
        setFormData({
            nome: taxa.nome || "",
            codigo: taxa.codigo || "",
            tipo_bem: taxa.tipo_bem || "carro",
            modalidade: taxa.modalidade || "consorcio",
            tipo_taxa: taxa.tipo_taxa || "percentual",
            valor: taxa.valor || "",
            periodo: taxa.periodo || "anual",
            descricao: taxa.descricao || "",
            ativo: taxa.ativo ?? true,
        });
        clearErrors();
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (taxa) => {
        setSelectedTaxa(taxa);
        setIsDeleteModalOpen(true);
    };

    const closeModals = () => {
        setIsCreateModalOpen(false);
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
        setSelectedTaxa(null);
        reset();
        clearErrors();
    };

    // Handlers de Ações
    const handleCreate = (e) => {
        e.preventDefault();
        post(route("admin.taxas.store"), {
            preserveScroll: true,
            onSuccess: () => {
                closeModals();
                showToast("Taxa criada com sucesso!", "success");
            },
        });
    };

    const handleEdit = (e) => {
        e.preventDefault();
        put(route("admin.taxas.update", selectedTaxa.id), {
            preserveScroll: true,
            onSuccess: () => {
                closeModals();
                showToast("Taxa atualizada com sucesso!", "success");
            },
        });
    };

    const handleDelete = () => {
        router.delete(route("admin.taxas.destroy", selectedTaxa.id), {
            preserveScroll: true,
            onSuccess: () => {
                closeModals();
                showToast("Taxa excluída com sucesso!", "success");
            },
        });
    };

    const handleToggleAtivo = (taxa) => {
        router.post(
            route("admin.taxas.toggle", taxa.id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    showToast(
                        taxa.ativo ? "Taxa desativada" : "Taxa ativada",
                        "success"
                    );
                },
            }
        );
    };

    const clearFilters = () => {
        setSearchTerm("");
        setFilterTipoBem("todos");
        setFilterModalidade("todos");
        setFilterStatus("todos");
    };

    // Helpers visuais
    const getTipoTaxaIcon = (tipoTaxa, valor) => {
        if (tipoTaxa === "percentual") {
            return (
                <span className="flex items-center gap-1.5 text-orange-600 font-bold text-lg">
                    <Percent className="w-5 h-5" />
                    {valor}%
                </span>
            );
        }
        return (
            <span className="flex items-center gap-1.5 text-green-600 font-bold text-lg">
                <DollarSign className="w-5 h-5" />
                R${" "}
                {parseFloat(valor).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                })}
            </span>
        );
    };

    const hasActiveFilters =
        searchTerm ||
        filterTipoBem !== "todos" ||
        filterModalidade !== "todos" ||
        filterStatus !== "todos";

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                                <Zap className="w-7 h-7 text-white" />
                            </div>
                            Taxas Dinâmicas
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                            Configure as taxas que alimentam a calculadora em
                            tempo real
                        </p>
                    </div>
                    <Button
                        onClick={openCreateModal}
                        size="lg"
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Nova Taxa
                    </Button>
                </div>
            }
        >
            <Head title="Gerenciar Taxas" />

            {/* Toast Notification */}
            {toast && (
                <div className="fixed top-4 right-4 z-[100] animate-in slide-in-from-top-5 duration-300">
                    <div
                        className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border-2 ${
                            toast.type === "success"
                                ? "bg-green-500 text-white border-green-600"
                                : "bg-red-500 text-white border-red-600"
                        }`}
                    >
                        <CheckCircle2 className="w-6 h-6" />
                        <span className="font-semibold text-lg">
                            {toast.message}
                        </span>
                    </div>
                </div>
            )}

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Cards de Estatísticas */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                        <StatCard
                            title="Total"
                            value={stats.total}
                            icon={Zap}
                            color="blue"
                        />
                        <StatCard
                            title="Ativas"
                            value={stats.ativos}
                            icon={CheckCircle2}
                            color="green"
                        />
                        <StatCard
                            title="Inativas"
                            value={stats.inativos}
                            icon={PauseCircle}
                            color="gray"
                        />
                        <StatCard
                            title="Carros"
                            value={stats.carros}
                            icon={Car}
                            color="blue"
                        />
                        <StatCard
                            title="Imóveis"
                            value={stats.imoveis}
                            icon={Building2}
                            color="purple"
                        />
                    </div>

                    {/* Barra de Pesquisa e Filtros */}
                    <Card className="mb-6 border-2 shadow-md">
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                {/* Linha 1: Pesquisa */}
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        type="text"
                                        placeholder="Pesquisar por nome ou código da taxa..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="pl-12 h-12 text-base border-2 focus:border-blue-500"
                                    />
                                    {searchTerm && (
                                        <button
                                            onClick={() => setSearchTerm("")}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>

                                {/* Linha 2: Filtros */}
                                <div className="flex flex-col md:flex-row gap-3">
                                    <div className="flex-1">
                                        <Select
                                            value={filterTipoBem}
                                            onValueChange={setFilterTipoBem}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Tipo de Bem" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="todos">
                                                    <div className="flex items-center gap-2">
                                                        <BarChart3 className="w-4 h-4" />
                                                        <span>Todos os Bens</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="carro">
                                                    <div className="flex items-center gap-2">
                                                        <Car className="w-4 h-4" />
                                                        <span>Apenas Carros</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="imovel">
                                                    <div className="flex items-center gap-2">
                                                        <Building2 className="w-4 h-4" />
                                                        <span>Apenas Imóveis</span>
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex-1">
                                        <Select
                                            value={filterModalidade}
                                            onValueChange={setFilterModalidade}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Modalidade" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="todos">
                                                    <div className="flex items-center gap-2">
                                                        <BarChart3 className="w-4 h-4" />
                                                        <span>Todas Modalidades</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="consorcio">
                                                    <div className="flex items-center gap-2">
                                                        <Handshake className="w-4 h-4" />
                                                        <span>Consórcio</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="financiamento">
                                                    <div className="flex items-center gap-2">
                                                        <CreditCard className="w-4 h-4" />
                                                        <span>Financiamento</span>
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex-1">
                                        <Select
                                            value={filterStatus}
                                            onValueChange={setFilterStatus}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="todos">
                                                    <div className="flex items-center gap-2">
                                                        <BarChart3 className="w-4 h-4" />
                                                        <span>Todos os Status</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="ativos">
                                                    <div className="flex items-center gap-2">
                                                        <CheckCircle2 className="w-4 h-4" />
                                                        <span>Apenas Ativos</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="inativos">
                                                    <div className="flex items-center gap-2">
                                                        <PauseCircle className="w-4 h-4" />
                                                        <span>Apenas Inativos</span>
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {hasActiveFilters && (
                                        <Button
                                            variant="outline"
                                            onClick={clearFilters}
                                            className="h-11 border-2 hover:bg-red-50 hover:border-red-300"
                                        >
                                            <RefreshCw className="w-4 h-4 mr-2" />
                                            Limpar
                                        </Button>
                                    )}
                                </div>

                                {/* Contador de resultados */}
                                <div className="flex items-center justify-between pt-2 border-t">
                                    <p className="text-sm font-medium text-gray-700">
                                        Exibindo{" "}
                                        <span className="text-blue-600 font-bold">
                                            {filteredTaxas.length}
                                        </span>{" "}
                                        de{" "}
                                        <span className="font-bold">
                                            {taxas.length}
                                        </span>{" "}
                                        taxa(s)
                                    </p>
                                    {hasActiveFilters && (
                                        <Badge
                                            variant="secondary"
                                            className="bg-blue-100 text-blue-700"
                                        >
                                            <Filter className="w-3 h-3 mr-1" />
                                            Filtros ativos
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        {/* Taxas de Carro */}
                        <Card className="border-2 hover:border-blue-400 transition-all duration-300 shadow-md hover:shadow-xl">
                            <CardHeader className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 border-b-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                                            <Car className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-bold text-gray-900">
                                                Taxas de Carro
                                            </CardTitle>
                                            <CardDescription className="text-base mt-1">
                                                {taxasPorTipo.carro.length}{" "}
                                                {taxasPorTipo.carro.length === 1
                                                    ? "taxa encontrada"
                                                    : "taxas encontradas"}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => {
                                            setFormData("tipo_bem", "carro");
                                            openCreateModal();
                                        }}
                                        variant="outline"
                                        className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Adicionar Taxa
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                {taxasPorTipo.carro.length === 0 ? (
                                    <EmptyState
                                        icon={Car}
                                        title="Nenhuma taxa de carro"
                                        description="Clique em 'Adicionar Taxa' para criar uma nova taxa para carros"
                                    />
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {taxasPorTipo.carro.map((taxa) => (
                                            <TaxaCard
                                                key={taxa.id}
                                                taxa={taxa}
                                                onEdit={openEditModal}
                                                onDelete={openDeleteModal}
                                                onToggle={handleToggleAtivo}
                                                getTipoTaxaIcon={
                                                    getTipoTaxaIcon
                                                }
                                            />
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Taxas de Imóvel */}
                        <Card className="border-2 hover:border-purple-400 transition-all duration-300 shadow-md hover:shadow-xl">
                            <CardHeader className="bg-gradient-to-r from-purple-50 via-purple-100 to-purple-50 border-b-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                                            <Building2 className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-bold text-gray-900">
                                                Taxas de Imóvel
                                            </CardTitle>
                                            <CardDescription className="text-base mt-1">
                                                {taxasPorTipo.imovel.length}{" "}
                                                {taxasPorTipo.imovel.length ===
                                                1
                                                    ? "taxa encontrada"
                                                    : "taxas encontradas"}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => {
                                            setFormData("tipo_bem", "imovel");
                                            openCreateModal();
                                        }}
                                        variant="outline"
                                        className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Adicionar Taxa
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                {taxasPorTipo.imovel.length === 0 ? (
                                    <EmptyState
                                        icon={Building2}
                                        title="Nenhuma taxa de imóvel"
                                        description="Clique em 'Adicionar Taxa' para criar uma nova taxa para imóveis"
                                    />
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {taxasPorTipo.imovel.map((taxa) => (
                                            <TaxaCard
                                                key={taxa.id}
                                                taxa={taxa}
                                                onEdit={openEditModal}
                                                onDelete={openDeleteModal}
                                                onToggle={handleToggleAtivo}
                                                getTipoTaxaIcon={
                                                    getTipoTaxaIcon
                                                }
                                            />
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Link Calculadora */}
                        <Card className="bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 border-2 border-blue-300 shadow-lg hover:shadow-xl transition-all">
                            <CardContent className="pt-6">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                                            <TrendingUp className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-xl text-gray-900">
                                                Visualizar Calculadora
                                            </h3>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Veja como as taxas aparecem na
                                                calculadora pública
                                            </p>
                                        </div>
                                    </div>
                                    <a href={route("calculadora")}>
                                        <Button
                                            size="lg"
                                            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-md"
                                        >
                                            <TrendingUp className="w-5 h-5 mr-2" />
                                            Abrir Calculadora
                                        </Button>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Modal Criar/Editar */}
            {(isCreateModalOpen || isEditModalOpen) && (
                <Modal
                    isOpen={isCreateModalOpen || isEditModalOpen}
                    onClose={closeModals}
                    title={
                        isCreateModalOpen
                            ? "Criar Nova Taxa"
                            : "Editar Taxa"
                    }
                    icon={isCreateModalOpen ? Sparkles : Edit}
                >
                    <form
                        onSubmit={isCreateModalOpen ? handleCreate : handleEdit}
                        className="space-y-5"
                    >
                        <TaxaForm
                            data={formData}
                            setData={setFormData}
                            errors={errors}
                        />

                        <div className="flex items-center justify-end gap-3 pt-6 border-t-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={closeModals}
                                size="lg"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                size="lg"
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                            >
                                <Save className="w-5 h-5" />
                                {processing ? "Salvando..." : "Salvar Taxa"}
                            </Button>
                        </div>
                    </form>
                </Modal>
            )}

            {/* Modal Deletar */}
            {isDeleteModalOpen && selectedTaxa && (
                <Modal
                    isOpen={isDeleteModalOpen}
                    onClose={closeModals}
                    title="Confirmar Exclusão"
                    icon={AlertTriangle}
                >
                    <div className="space-y-5">
                        <div className="flex items-start gap-4 p-5 bg-red-50 rounded-xl border-2 border-red-200">
                            <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                            <div>
                                <p className="font-bold text-lg text-gray-900">
                                    Esta ação é irreversível!
                                </p>
                                <p className="text-gray-700 mt-2">
                                    Você está prestes a excluir a taxa:
                                </p>
                                <p className="font-bold text-lg text-red-600 mt-2">
                                    "{selectedTaxa.nome}"
                                </p>
                                <p className="text-sm text-gray-600 mt-2">
                                    Código: {selectedTaxa.codigo}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={closeModals}
                                size="lg"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="button"
                                onClick={handleDelete}
                                size="lg"
                                className="bg-red-600 hover:bg-red-700"
                            >
                                <Trash2 className="w-5 h-5 mr-2" />
                                Sim, Excluir Taxa
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </AuthenticatedLayout>
    );
}

// Componente de Card de Estatística
function StatCard({ title, value, icon: Icon, color }) {
    const colorClasses = {
        blue: "from-blue-500 to-blue-600",
        green: "from-green-500 to-green-600",
        gray: "from-gray-500 to-gray-600",
        purple: "from-purple-500 to-purple-600",
    };

    return (
        <Card className="border-2 hover:border-blue-300 transition-all hover:shadow-md">
            <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">
                            {title}
                        </p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">
                            {value}
                        </p>
                    </div>
                    <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg`}
                    >
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// Componente de Estado Vazio
function EmptyState({ icon: Icon, title, description }) {
    return (
        <div className="text-center py-16">
            <div className="inline-flex p-4 rounded-full bg-gray-100 mb-4">
                <Icon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {title}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">{description}</p>
        </div>
    );
}

// Componente de Card de Taxa
function TaxaCard({ taxa, onEdit, onDelete, onToggle, getTipoTaxaIcon }) {
    return (
        <div className="group relative bg-white border-2 rounded-2xl p-5 hover:border-blue-400 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
            {/* Status Badge */}
            <div className="absolute top-4 right-4">
                <button
                    onClick={() => onToggle(taxa)}
                    className="transition-transform hover:scale-110 active:scale-95"
                    title={
                        taxa.ativo
                            ? "Clique para desativar"
                            : "Clique para ativar"
                    }
                >
                    {taxa.ativo ? (
                        <Badge className="bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-1 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Ativo
                        </Badge>
                    ) : (
                        <Badge
                            variant="secondary"
                            className="bg-gray-200 hover:bg-gray-300 font-semibold px-3 py-1 flex items-center gap-1"
                        >
                            <PauseCircle className="w-3 h-3" />
                            Inativo
                        </Badge>
                    )}
                </button>
            </div>

            {/* Conteúdo */}
            <div className="pr-20">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-tight">
                    {taxa.nome}
                </h3>
                <p className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded inline-block mb-4">
                    {taxa.codigo}
                </p>

                <div className="flex items-center gap-2 mb-4">
                    <Badge
                        variant="secondary"
                        className={
                            taxa.modalidade === "consorcio"
                                ? "bg-green-100 text-green-700 font-semibold flex items-center gap-1"
                                : "bg-blue-100 text-blue-700 font-semibold flex items-center gap-1"
                        }
                    >
                        {taxa.modalidade === "consorcio" ? (
                            <>
                                <Handshake className="w-3 h-3" />
                                Consórcio
                            </>
                        ) : (
                            <>
                                <CreditCard className="w-3 h-3" />
                                Financiamento
                            </>
                        )}
                    </Badge>
                </div>

                <div className="flex items-center justify-between pt-4 border-t-2">
                    <div>{getTipoTaxaIcon(taxa.tipo_taxa, taxa.valor)}</div>
                    <Badge variant="outline" className="capitalize font-medium flex items-center gap-1">
                        {taxa.periodo === "mensal" && <Calendar className="w-3 h-3" />}
                        {taxa.periodo === "anual" && <CalendarDays className="w-3 h-3" />}
                        {taxa.periodo === "unico" && <Sparkles className="w-3 h-3" />}
                        {taxa.periodo || "N/A"}
                    </Badge>
                </div>
            </div>

            {/* Ações */}
            <div className="flex items-center gap-2 mt-5">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(taxa)}
                    className="flex-1 h-10 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 font-medium"
                >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(taxa)}
                    className="h-10 hover:bg-red-50 hover:border-red-400 hover:text-red-600"
                    title="Excluir taxa"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>

            {/* Descrição (se houver) */}
            {taxa.descricao && (
                <div className="mt-4 pt-4 border-t">
                    <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-gray-600 line-clamp-2">
                            {taxa.descricao}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

// Componente de Formulário de Taxa
function TaxaForm({ data, setData, errors }) {
    return (
        <>
            {/* Informações Gerais */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 pb-2 border-b">
                    <Info className="w-4 h-4" />
                    Informações Gerais
                </div>

                {/* Nome e Código */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label
                            htmlFor="nome"
                            className="text-base font-semibold"
                        >
                            Nome da Taxa *
                        </Label>
                        <Input
                            id="nome"
                            value={data.nome}
                            onChange={(e) => setData("nome", e.target.value)}
                            className={`h-11 text-base ${
                                errors.nome ? "border-red-500 border-2" : ""
                            }`}
                            placeholder="Ex: Taxa Administrativa"
                        />
                        {errors.nome && (
                            <p className="text-sm text-red-600 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                {errors.nome}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="codigo"
                            className="text-base font-semibold"
                        >
                            Código Identificador *
                        </Label>
                        <Input
                            id="codigo"
                            value={data.codigo}
                            onChange={(e) => setData("codigo", e.target.value)}
                            className={`h-11 text-base font-mono ${
                                errors.codigo ? "border-red-500 border-2" : ""
                            }`}
                            placeholder="Ex: taxa_admin_carro"
                        />
                        {errors.codigo && (
                            <p className="text-sm text-red-600 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                {errors.codigo}
                            </p>
                        )}
                    </div>
                </div>

                {/* Tipo de Bem e Modalidade */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label
                            htmlFor="tipo_bem"
                            className="text-base font-semibold"
                        >
                            Tipo de Bem *
                        </Label>
                        <Select
                            value={data.tipo_bem}
                            onValueChange={(value) =>
                                setData("tipo_bem", value)
                            }
                        >
                            <SelectTrigger
                                className={
                                    errors.tipo_bem ? "border-red-500" : ""
                                }
                            >
                                <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="carro">
                                    <div className="flex items-center gap-2">
                                        <Car className="w-4 h-4" />
                                        <span>Carro</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="imovel">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="w-4 h-4" />
                                        <span>Imóvel</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.tipo_bem && (
                            <p className="text-sm text-red-600 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                {errors.tipo_bem}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="modalidade"
                            className="text-base font-semibold"
                        >
                            Modalidade *
                        </Label>
                        <Select
                            value={data.modalidade}
                            onValueChange={(value) =>
                                setData("modalidade", value)
                            }
                        >
                            <SelectTrigger
                                className={
                                    errors.modalidade ? "border-red-500" : ""
                                }
                            >
                                <SelectValue placeholder="Selecione a modalidade" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="consorcio">
                                    <div className="flex items-center gap-2">
                                        <Handshake className="w-4 h-4" />
                                        <span>Consórcio</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="financiamento">
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="w-4 h-4" />
                                        <span>Financiamento</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.modalidade && (
                            <p className="text-sm text-red-600 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                {errors.modalidade}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Valores */}
            <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 pb-2 border-b">
                    <DollarSign className="w-4 h-4" />
                    Valores e Período
                </div>

                {/* Tipo de Taxa e Valor */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label
                            htmlFor="tipo_taxa"
                            className="text-base font-semibold"
                        >
                            Tipo de Taxa *
                        </Label>
                        <Select
                            value={data.tipo_taxa}
                            onValueChange={(value) =>
                                setData("tipo_taxa", value)
                            }
                        >
                            <SelectTrigger
                                className={
                                    errors.tipo_taxa ? "border-red-500" : ""
                                }
                            >
                                <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="percentual">
                                    <div className="flex items-center gap-2">
                                        <Percent className="w-4 h-4" />
                                        <span>Percentual</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="fixo">
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="w-4 h-4" />
                                        <span>Valor Fixo</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.tipo_taxa && (
                            <p className="text-sm text-red-600 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                {errors.tipo_taxa}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="valor"
                            className="text-base font-semibold"
                        >
                            Valor da Taxa *
                        </Label>
                        <Input
                            id="valor"
                            type="number"
                            step="0.01"
                            value={data.valor}
                            onChange={(e) => setData("valor", e.target.value)}
                            className={`h-11 text-base ${
                                errors.valor ? "border-red-500 border-2" : ""
                            }`}
                            placeholder={
                                data.tipo_taxa === "percentual"
                                    ? "Ex: 1.2"
                                    : "Ex: 200.00"
                            }
                        />
                        {errors.valor && (
                            <p className="text-sm text-red-600 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                {errors.valor}
                            </p>
                        )}
                    </div>
                </div>

                {/* Período */}
                <div className="space-y-2">
                    <Label
                        htmlFor="periodo"
                        className="text-base font-semibold"
                    >
                        Período de Aplicação
                    </Label>
                    <Select
                        value={data.periodo}
                        onValueChange={(value) => setData("periodo", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione o período" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="mensal">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Mensal</span>
                                </div>
                            </SelectItem>
                            <SelectItem value="anual">
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="w-4 h-4" />
                                    <span>Anual</span>
                                </div>
                            </SelectItem>
                            <SelectItem value="unico">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    <span>Único</span>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Descrição e Status */}
            <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 pb-2 border-b">
                    <Info className="w-4 h-4" />
                    Informações Adicionais
                </div>

                {/* Descrição */}
                <div className="space-y-2">
                    <Label
                        htmlFor="descricao"
                        className="text-base font-semibold"
                    >
                        Descrição (Opcional)
                    </Label>
                    <textarea
                        id="descricao"
                        value={data.descricao}
                        onChange={(e) => setData("descricao", e.target.value)}
                        className="flex min-h-[100px] w-full rounded-md border-2 border-input bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Digite uma descrição detalhada sobre esta taxa..."
                    />
                </div>

                {/* Ativo */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border-2">
                    <input
                        type="checkbox"
                        id="ativo"
                        checked={data.ativo}
                        onChange={(e) => setData("ativo", e.target.checked)}
                        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <Label
                        htmlFor="ativo"
                        className="text-base font-semibold cursor-pointer flex-1 flex items-center gap-2"
                    >
                        {data.ativo ? (
                            <PlayCircle className="w-4 h-4 text-green-600" />
                        ) : (
                            <PauseCircle className="w-4 h-4 text-gray-400" />
                        )}
                        Taxa ativa (será aplicada nos cálculos)
                    </Label>
                </div>
            </div>
        </>
    );
}

// Componente de Modal
function Modal({ isOpen, onClose, title, icon: Icon, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl animate-in zoom-in-95 duration-200 border-2">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b-2 bg-gradient-to-r from-blue-50 to-purple-50">
                        <div className="flex items-center gap-3">
                            {Icon && (
                                <div className="p-2 rounded-lg bg-blue-100">
                                    <Icon className="w-5 h-5 text-blue-600" />
                                </div>
                            )}
                            <h2 className="text-2xl font-bold text-gray-900">
                                {title}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-white rounded-lg"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
