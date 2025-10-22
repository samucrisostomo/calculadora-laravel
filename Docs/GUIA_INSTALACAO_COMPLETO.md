# 🚀 Guia Completo de Instalação - Calculadora Laravel + Inertia + React

## ✅ **O que JÁ foi feito automaticamente:**

1. ✅ Projeto Laravel 12 criado em `C:\calculadora-laravel`
2. ✅ Breeze com React + Inertia instalado
3. ✅ Dependências NPM instaladas (Radix UI, Recharts, jsPDF, etc)
4. ✅ Tailwind configurado com tema customizado
5. ✅ Migration da tabela `taxas` criada
6. ✅ Model `Taxa` criado
7. ✅ Seeder `TaxaSeeder` criado com dados iniciais
8. ✅ Controllers criados (`CalculadoraController` e `TaxaController`)
9. ✅ Rotas configuradas (públicas e protegidas)
10. ✅ Componentes UI (shadcn) migrados
11. ✅ Função `lib/utils.js` criada

---

## 📋 **Próximos Passos (MANUAL):**

### **Passo 1: Criar Banco de Dados MySQL**

Abra o MySQL Workbench ou phpMyAdmin e execute:

```sql
CREATE DATABASE calculadora_comparativa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### **Passo 2: Verificar arquivo .env**

Verifique se o arquivo `.env` em `C:\calculadora-laravel\.env` está configurado assim:

```env
APP_NAME="Calculadora Comparativa"
APP_ENV=local
APP_KEY=(já foi gerado automaticamente)
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=calculadora_comparativa
DB_USERNAME=root
DB_PASSWORD=
```

### **Passo 3: Executar Migrations e Seeders**

No PowerShell, dentro de `C:\calculadora-laravel`, execute:

```powershell
php artisan migrate:fresh --seed
```

Isso vai:

-   Criar todas as tabelas (users, taxas, sessions, etc)
-   Popular a tabela taxas com dados iniciais
-   Criar um usuário admin (email: admin@calculadora.com, senha: admin123)

### **Passo 4: Copiar Utils (calculations, formatters, validations)**

Copie manualmente os arquivos de `C:\calculadora-comparativa\src\utils\` para `C:\calculadora-laravel\resources\js\utils\`:

**Arquivos a copiar:**

-   `calculations.js`
-   `formatters.js`
-   `validations.js`
-   `constants.js`

### **Passo 5: Copiar Componentes React**

Copie os seguintes componentes de `C:\calculadora-comparativa\src\components\` para `C:\calculadora-laravel\resources\js\Components\`:

**Componentes principais:**

-   `HeaderModerno.jsx`
-   `TipoSelectorModerno.jsx`
-   `FormularioModerno.jsx`
-   `ResultadosModernos.jsx`
-   `GraficoComparativo.jsx`
-   `BotaoGerarPDF.jsx`
-   `Footer.jsx`
-   `LoadingModerno.jsx`

**Nota:** Os componentes `ui/` já foram copiados automaticamente.

### **Passo 6: Criar Página da Calculadora**

Crie o arquivo `C:\calculadora-laravel\resources\js\Pages\Calculadora\Index.jsx` com o conteúdo do `App.jsx` original, mas adaptado para Inertia.

**Exemplo de estrutura:**

```jsx
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import axios from "axios";
import HeaderModerno from "@/Components/HeaderModerno";
import TipoSelectorModerno from "@/Components/TipoSelectorModerno";
// ... outros imports

export default function Calculadora() {
    const [tipoBem, setTipoBem] = useState("carro");
    const [config, setConfig] = useState(null);

    // Buscar configurações de taxas do backend
    useEffect(() => {
        axios
            .get(`/api/taxas/${tipoBem}`)
            .then((response) => setConfig(response.data))
            .catch((error) => console.error("Erro ao carregar taxas:", error));
    }, [tipoBem]);

    if (!config) return <div>Carregando...</div>;

    return (
        <>
            <Head title="Calculadora Comparativa" />

            <div className="min-h-screen">
                {/* Background Gradiente */}
                <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50"></div>

                <HeaderModerno />

                <main className="container mx-auto px-4 py-8">
                    <TipoSelectorModerno
                        tipoBem={tipoBem}
                        setTipoBem={setTipoBem}
                    />

                    {/* Resto do conteúdo do App.jsx original */}
                </main>
            </div>
        </>
    );
}
```

### **Passo 7: Criar Páginas Administrativas**

Crie os arquivos em `C:\calculadora-laravel\resources\js\Pages\Admin\Taxas\`:

**`Index.jsx`** - Lista de taxas
**`Edit.jsx`** - Editar taxa
**`Create.jsx`** - Criar nova taxa

**Exemplo básico de Index.jsx:**

```jsx
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, taxas }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Gerenciar Taxas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">
                                    Gerenciar Taxas
                                </h2>
                                <Link
                                    href={route("admin.taxas.create")}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Nova Taxa
                                </Link>
                            </div>

                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-2">Nome</th>
                                        <th className="text-left p-2">
                                            Tipo Bem
                                        </th>
                                        <th className="text-left p-2">
                                            Modalidade
                                        </th>
                                        <th className="text-left p-2">Valor</th>
                                        <th className="text-left p-2">
                                            Status
                                        </th>
                                        <th className="text-left p-2">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {taxas.map((taxa) => (
                                        <tr key={taxa.id} className="border-b">
                                            <td className="p-2">{taxa.nome}</td>
                                            <td className="p-2">
                                                {taxa.tipo_bem}
                                            </td>
                                            <td className="p-2">
                                                {taxa.modalidade}
                                            </td>
                                            <td className="p-2">
                                                {taxa.valor}%
                                            </td>
                                            <td className="p-2">
                                                {taxa.ativo
                                                    ? "✅ Ativo"
                                                    : "❌ Inativo"}
                                            </td>
                                            <td className="p-2">
                                                <Link
                                                    href={route(
                                                        "admin.taxas.edit",
                                                        taxa.id
                                                    )}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Editar
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
```

### **Passo 8: Compilar Assets**

```powershell
npm run build
```

### **Passo 9: Iniciar Servidores**

Abra **DOIS** terminais PowerShell:

**Terminal 1 - Laravel:**

```powershell
cd C:\calculadora-laravel
php artisan serve
```

**Terminal 2 - Vite (desenvolvimento):**

```powershell
cd C:\calculadora-laravel
npm run dev
```

### **Passo 10: Acessar o Sistema**

-   🌐 **Calculadora Pública**: http://localhost:8000
-   🔐 **Login Admin**: http://localhost:8000/login
    -   Email: `admin@calculadora.com`
    -   Senha: `admin123`
-   ⚙️ **Gerenciar Taxas**: http://localhost:8000/admin/taxas

---

## 📁 **Estrutura Final do Projeto:**

```
C:\calculadora-laravel\
├── app\
│   ├── Http\Controllers\
│   │   ├── CalculadoraController.php ✅
│   │   └── TaxaController.php ✅
│   └── Models\
│       └── Taxa.php ✅
├── database\
│   ├── migrations\
│   │   └── 2024_01_01_000003_create_taxas_table.php ✅
│   └── seeders\
│       ├── DatabaseSeeder.php ✅
│       └── TaxaSeeder.php ✅
├── resources\
│   ├── css\
│   │   └── app.css
│   └── js\
│       ├── Components\
│       │   ├── ui\
│       │   │   ├── button.jsx ✅
│       │   │   ├── card.jsx ✅
│       │   │   ├── input.jsx ✅
│       │   │   ├── label.jsx ✅
│       │   │   ├── badge.jsx ✅
│       │   │   ├── separator.jsx ✅
│       │   │   └── tabs.jsx ✅
│       │   ├── HeaderModerno.jsx ⚠️ COPIAR MANUALMENTE
│       │   ├── FormularioModerno.jsx ⚠️ COPIAR MANUALMENTE
│       │   ├── ResultadosModernos.jsx ⚠️ COPIAR MANUALMENTE
│       │   ├── GraficoComparativo.jsx ⚠️ COPIAR MANUALMENTE
│       │   ├── BotaoGerarPDF.jsx ⚠️ COPIAR MANUALMENTE
│       │   └── ... (outros componentes)
│       ├── lib\
│       │   └── utils.js ✅
│       ├── utils\
│       │   ├── calculations.js ⚠️ COPIAR MANUALMENTE
│       │   ├── formatters.js ⚠️ COPIAR MANUALMENTE
│       │   ├── validations.js ⚠️ COPIAR MANUALMENTE
│       │   └── constants.js ⚠️ COPIAR MANUALMENTE
│       ├── Pages\
│       │   ├── Calculadora\
│       │   │   └── Index.jsx ⚠️ CRIAR MANUALMENTE
│       │   └── Admin\
│       │       └── Taxas\
│       │           ├── Index.jsx ⚠️ CRIAR MANUALMENTE
│       │           ├── Edit.jsx ⚠️ CRIAR MANUALMENTE
│       │           └── Create.jsx ⚠️ CRIAR MANUALMENTE
│       └── app.jsx
├── routes\
│   └── web.php ✅
├── tailwind.config.js ✅
├── .env ✅
└── package.json ✅
```

---

## 🔧 **Comandos Úteis:**

```powershell
# Ver rotas
php artisan route:list

# Limpar cache
php artisan optimize:clear

# Recriar banco
php artisan migrate:fresh --seed

# Ver logs
php artisan pail

# Compilar assets para produção
npm run build
```

---

## 🎯 **Funcionalidades Implementadas:**

### **Backend (Laravel):**

-   ✅ Autenticação completa (Laravel Breeze)
-   ✅ CRUD de taxas administrativas
-   ✅ API pública para consultar taxas
-   ✅ Middleware de autenticação
-   ✅ Rotas públicas (calculadora) e protegidas (admin)

### **Frontend (React + Inertia):**

-   ✅ Componentes UI (shadcn/ui) migrados
-   ✅ Tailwind com tema customizado
-   ✅ Animações e efeitos visuais
-   ⚠️ Página da calculadora (precisa ser criada)
-   ⚠️ Painel administrativo (precisa ser criado)

### **Banco de Dados:**

-   ✅ Tabela `users` (Laravel Breeze)
-   ✅ Tabela `taxas` (personalizada)
-   ✅ Seeds com dados iniciais
-   ✅ 14 taxas pré-configuradas

---

## 🐛 **Troubleshooting:**

### **Erro: "Access denied for user 'root'@'localhost'"**

-   Verifique se o MySQL está rodando
-   Confira usuário e senha no `.env`

### **Erro: "Vite manifest not found"**

-   Execute `npm run build` ou `npm run dev`

### **Erro: "Class 'Taxa' not found"**

-   Execute `composer dump-autoload`

### **Página em branco:**

-   Verifique os logs: `storage/logs/laravel.log`
-   Verifique o console do navegador (F12)

---

## 📞 **Suporte:**

Se tiver dúvidas:

1. Verifique os logs do Laravel (`php artisan pail`)
2. Verifique o console do navegador (F12)
3. Teste a API diretamente: http://localhost:8000/api/taxas/carro

---

**Desenvolvido com ❤️ usando Laravel 12 + Inertia + React + Tailwind CSS**
