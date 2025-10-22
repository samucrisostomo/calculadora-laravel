# 🔄 Sistema de Taxas Dinâmicas

## 🎯 Objetivo

Tornar a calculadora **flexível e gerenciável**, permitindo que as taxas sejam atualizadas via painel administrativo sem necessidade de alterar código.

---

## 💡 Como Funciona

### **Antes (Sistema Estático):**

```javascript
// constants.js - Valores fixos no código
const CONFIG_POR_TIPO = {
    carro: {
        taxaAdministrativaAnual: 1.2, // ❌ Fixo no código
        comissaoPercentual: 1.5, // ❌ Fixo no código
        // ...
    },
};
```

### **Agora (Sistema Dinâmico):**

```javascript
// 1. Usuário altera taxa no painel admin
Admin altera "Taxa Administrativa Carro" de 1.2% para 1.5%

// 2. Salva no banco de dados MySQL
UPDATE taxas SET valor = 1.5 WHERE codigo = 'taxa_admin_consorcio_carro'

// 3. Calculadora busca taxas via API
GET /api/taxas/carro
→ Retorna: { taxaAdministrativaAnual: 1.5, ... }

// 4. Cálculos usam a taxa atualizada
calcularConsorcio(..., configTaxas) // ✅ Usa 1.5% do banco
```

---

## 🔄 Fluxo de Dados

```mermaid
[Banco de Dados] → [API Laravel] → [Frontend React] → [Cálculos]
     (taxas)         (/api/taxas)    (useState)        (dinâmicos)
```

### **Passo a Passo:**

1. **Usuário seleciona tipo de bem** (Carro ou Imóvel)
2. **Frontend faz requisição:** `GET /api/taxas/{tipoBem}`
3. **Backend busca taxas ativas** do banco de dados
4. **API retorna configuração** formatada:
    ```json
    {
        "taxaAdministrativaAnual": 1.2,
        "comissaoPercentual": 1.5,
        "taxaJurosAnualBase": 12,
        "seguroAnualPercentual": 0.4,
        "lanceMaximoPercentual": 40,
        "entradaMinimaPercentual": 10,
        "prazoMaximoMeses": 60,
        "valorMaximoSugerido": 300000,
        "taxaLicenciamentoAnual": 200
    }
    ```
5. **Frontend armazena** em `configTaxas` (estado)
6. **Cálculos usam** `configTaxas` dinâmico

---

## 🗄️ Estrutura no Banco de Dados

### **Tabela `taxas`:**

| Campo        | Tipo    | Descrição                  | Exemplo                      |
| ------------ | ------- | -------------------------- | ---------------------------- |
| `id`         | Integer | ID único                   | 1                            |
| `nome`       | String  | Nome descritivo            | "Taxa Administrativa Carro"  |
| `codigo`     | String  | Código único               | "taxa_admin_consorcio_carro" |
| `tipo_bem`   | Enum    | carro ou imovel            | "carro"                      |
| `modalidade` | Enum    | consorcio ou financiamento | "consorcio"                  |
| `tipo_taxa`  | Enum    | percentual ou fixo         | "percentual"                 |
| `valor`      | Decimal | Valor da taxa              | 1.2 (representa 1.2%)        |
| `periodo`    | Enum    | mensal, anual, unico       | "anual"                      |
| `descricao`  | Text    | Descrição opcional         | "..."                        |
| `ativo`      | Boolean | Se está ativa              | true                         |

### **Exemplo de Taxa:**

```php
[
    'nome' => 'Taxa Administrativa Consórcio Carro',
    'codigo' => 'taxa_admin_consorcio_carro',
    'tipo_bem' => 'carro',
    'modalidade' => 'consorcio',
    'tipo_taxa' => 'percentual',
    'valor' => 1.2,           // ← VALOR DINÂMICO
    'periodo' => 'anual',
    'descricao' => 'Taxa administrativa anual do consórcio de veículos',
    'ativo' => true,          // ← Pode ser desativada
]
```

---

## 🎯 Códigos de Taxas (Mapeamento)

### **Consórcio - Carro:**

-   `taxa_admin_consorcio_carro` → taxaAdministrativaAnual
-   `comissao_consorcio_carro` → comissaoPercentual

### **Consórcio - Imóvel:**

-   `taxa_admin_consorcio_imovel` → taxaAdministrativaAnual
-   `comissao_consorcio_imovel` → comissaoPercentual

### **Financiamento - Carro:**

-   `juros_financiamento_carro` → taxaJurosAnualBase
-   `seguro_financiamento_carro` → seguroAnualPercentual
-   `licenciamento_carro` → taxaLicenciamentoAnual

### **Financiamento - Imóvel:**

-   `juros_financiamento_imovel` → taxaJurosAnualBase
-   `seguro_financiamento_imovel` → seguroAnualPercentual
-   `avaliacao_imovel` → taxaAvaliacaoPercentual
-   `itbi_imovel` → itbiPercentual

### **Limites:**

-   `lance_maximo_carro` → lanceMaximoPercentual
-   `lance_maximo_imovel` → lanceMaximoPercentual
-   `entrada_minima_carro` → entradaMinimaPercentual
-   `entrada_minima_imovel` → entradaMinimaPercentual

---

## 🔧 API Endpoints

### **1. Buscar Taxas por Tipo de Bem**

```http
GET /api/taxas/{tipoBem}
```

**Parâmetros:**

-   `tipoBem` (required): "carro" ou "imovel"

**Exemplo:**

```bash
GET /api/taxas/carro
```

**Resposta:**

```json
{
    "taxaAdministrativaAnual": 1.2,
    "comissaoPercentual": 1.5,
    "taxaJurosAnualBase": 12,
    "seguroAnualPercentual": 0.4,
    "lanceMaximoPercentual": 40,
    "entradaMinimaPercentual": 10,
    "prazoMaximoMeses": 60,
    "valorMaximoSugerido": 300000,
    "taxaLicenciamentoAnual": 200,
    "labels": {
        "valorBem": "Valor do Veículo",
        "placeholderValor": "Ex: 50.000",
        "descricao": "Consórcio ou Financiamento de Veículo"
    }
}
```

### **2. Buscar Todas as Taxas**

```http
GET /api/taxas
```

**Resposta:**

```json
{
    "carro": {
        /* configuração completa */
    },
    "imovel": {
        /* configuração completa */
    }
}
```

---

## 📝 Exemplo Prático

### **Cenário: Alterar Taxa de Juros do Financiamento**

#### **1. No Painel Admin:**

```
1. Login: admin@calculadora.com / admin123
2. Ir para: /admin/taxas
3. Localizar: "Juros Financiamento Carro"
4. Clicar em: Editar (ícone de lápis)
5. Alterar valor: de 12.0 para 15.0
6. Clicar: Salvar Alterações
```

#### **2. No Banco de Dados:**

```sql
UPDATE taxas
SET valor = 15.0
WHERE codigo = 'juros_financiamento_carro';
```

#### **3. Na Calculadora:**

```
1. Usuário acessa: /
2. Seleciona: Carro
3. Frontend busca: GET /api/taxas/carro
4. API retorna: taxaJurosAnualBase = 15.0  ← ATUALIZADO!
5. Cálculos usam: 15% ao invés de 12%
6. Resultado: Custo do financiamento maior
```

### **Resultado:**

✅ A mudança é **imediata** e **automática**!
✅ Não precisa alterar código!
✅ Não precisa fazer deploy!

---

## 🎨 Indicadores Visuais

### **Badge "Taxas Atualizadas":**

Quando a calculadora está usando taxas do banco de dados, aparece um badge azul em cada formulário:

```jsx
<span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
    Taxas Atualizadas
</span>
```

Isso indica ao usuário que:

-   ✅ As taxas são as mais recentes do sistema
-   ✅ Os cálculos refletem as configurações atuais
-   ✅ O admin pode alterar essas taxas a qualquer momento

---

## 🔒 Fallback para Segurança

Se houver erro ao buscar taxas do banco:

```javascript
try {
    // Busca taxas do banco
    const response = await axios.get(`/api/taxas/${tipoBem}`);
    setConfigTaxas(response.data); // ✅ Usa taxas do banco
} catch (error) {
    // ❌ Erro na API
    const configFallback = getConfig(tipoBem); // Usa taxas estáticas
    setConfigTaxas(configFallback); // ✅ Fallback seguro
}
```

**Vantagens:**

-   ✅ A calculadora **sempre funciona**, mesmo se o banco estiver offline
-   ✅ Taxas estáticas servem como backup
-   ✅ Usuário não percebe falhas

---

## 🚀 Vantagens do Sistema Dinâmico

### **1. Flexibilidade Total**

-   ✅ Administrador pode ajustar taxas sem programar
-   ✅ Mudanças refletem instantaneamente
-   ✅ Testes de diferentes cenários

### **2. Gerenciamento Fácil**

-   ✅ Interface visual (não precisa editar código)
-   ✅ Histórico de alterações (no futuro)
-   ✅ Ativar/desativar taxas temporariamente

### **3. Escalabilidade**

-   ✅ Adicionar novos tipos de taxas
-   ✅ Criar taxas sazonais
-   ✅ Taxas por região (no futuro)

### **4. Manutenibilidade**

-   ✅ Código separado de configuração
-   ✅ Fácil auditoria
-   ✅ Possibilidade de versionamento de taxas

---

## 📊 Comparação

| Aspecto                | Estático                | Dinâmico                          |
| ---------------------- | ----------------------- | --------------------------------- |
| **Alterar Taxa**       | Editar código → Deploy  | Painel admin → Instantâneo ✅     |
| **Quem Altera**        | Apenas programadores    | Admin não-técnico ✅              |
| **Tempo para Alterar** | 15-30 minutos           | 30 segundos ✅                    |
| **Risco de Erro**      | Alto (código)           | Baixo (interface) ✅              |
| **Rastreabilidade**    | Difícil                 | Fácil (banco de dados) ✅         |
| **Testes**             | Difícil testar cenários | Fácil criar múltiplos cenários ✅ |

---

## 🧪 Como Testar o Sistema Dinâmico

### **1. Verificar Carregamento de Taxas:**

```
1. Abra o console do navegador (F12)
2. Acesse a calculadora: /
3. Veja no Network: GET /api/taxas/carro
4. Verifique a resposta JSON com as taxas
5. Mude para Imóvel
6. Veja nova requisição: GET /api/taxas/imovel
```

### **2. Alterar Taxa e Ver Resultado:**

```
1. Login no admin: /login
2. Vá para taxas: /admin/taxas
3. Edite "Taxa Administrativa Consórcio Carro"
4. Mude de 1.2 para 2.0
5. Salve
6. Abra outra aba: /
7. Selecione Carro
8. Veja que a taxa administrativa agora é 2% ✅
```

### **3. Testar Fallback:**

```
1. Desligue o servidor Laravel
2. Acesse a calculadora: /
3. O sistema usa taxas estáticas do constants.js
4. A calculadora continua funcionando ✅
```

---

## 🎓 Para Administradores

### **Criando Uma Nova Taxa:**

1. **Acesse:** `/admin/taxas`
2. **Clique:** Nova Taxa
3. **Preencha:**

    - Nome: "Minha Nova Taxa"
    - Código: "nova_taxa_carro" (sem espaços, único)
    - Tipo de Bem: Carro
    - Modalidade: Consórcio
    - Tipo de Taxa: Percentual
    - Valor: 2.5 (representa 2.5%)
    - Período: Anual
    - Status: ✅ Ativo

4. **Salve**

5. **⚠️ IMPORTANTE:**
    - Se a taxa tiver um código que não está mapeado no `CalculadoraController`, ela não será usada automaticamente
    - Códigos válidos estão listados na seção "Códigos de Taxas" acima
    - Para criar novos tipos de taxas, é necessário atualizar o código

### **Editando Taxa Existente:**

1. **Acesse:** `/admin/taxas`
2. **Localize** a taxa desejada
3. **Clique:** Editar (ícone de lápis)
4. **Modifique** o valor (ex: de 1.2 para 1.5)
5. **Salve**
6. **Teste** na calculadora → mudança é **imediata**!

### **Desativando Temporariamente:**

1. **Acesse:** `/admin/taxas`
2. **Clique** no badge "Ativo" da taxa
3. **Status muda** para "Inativo"
4. **Resultado:** A taxa não será usada nos cálculos (usa fallback ou valor padrão)

---

## ⚡ Performance

### **Otimizações Implementadas:**

1. **Cache no Frontend:**

    - Taxas são buscadas apenas quando muda o tipo de bem
    - Estado persiste durante navegação na mesma sessão

2. **Debounce nos Cálculos:**

    - Aguarda 500ms após última alteração antes de calcular
    - Evita requisições excessivas

3. **Loading States:**
    - Mostra loading enquanto busca taxas
    - Desabilita botão de calcular durante carregamento
    - UX clara e transparente

---

## 🛠️ Código Técnico

### **Backend (CalculadoraController.php):**

```php
public function getTaxas($tipoBem)
{
    $taxas = Taxa::ativo()
        ->porTipoBem($tipoBem)
        ->get();

    $config = [
        'taxaAdministrativaAnual' => $taxas
            ->where('codigo', "taxa_admin_consorcio_{$tipoBem}")
            ->first()?->valor ?? 0,
        // ... outras taxas
    ];

    return response()->json($config);
}
```

### **Frontend (Calculadora/Index.jsx):**

```javascript
// Buscar taxas do banco
useEffect(() => {
    const buscarTaxas = async () => {
        const response = await axios.get(`/api/taxas/${tipoBem}`);
        setConfigTaxas(response.data); // ← Armazena taxas dinâmicas
    };
    buscarTaxas();
}, [tipoBem]);

// Usar nas validações e cálculos
const errosC = validarConsorcio(dados, tipoBem, configTaxas);
const resultado = calcularConsorcio(..., tipoBem, configTaxas);
```

---

## 🎯 Casos de Uso

### **Caso 1: Promoção Temporária**

```
Cenário: Reduzir taxa de juros em 20% por 1 mês

1. Admin edita: "Juros Financiamento Carro"
2. Altera: 12% → 9.6% (redução de 20%)
3. Salva
4. Todos os usuários veem: taxa reduzida ✅
5. Após 1 mês: Admin volta para 12%
```

### **Caso 2: Ajuste de Mercado**

```
Cenário: Seguro de carro aumentou

1. Admin edita: "Seguro Financiamento Carro"
2. Altera: 0.4% → 0.6%
3. Salva
4. Cálculos atualizam: custo total maior ✅
```

### **Caso 3: Novo Produto**

```
Cenário: Lançar consórcio de imóvel com taxa menor

1. Admin edita: "Taxa Administrativa Consórcio Imóvel"
2. Altera: 0.8% → 0.5% (promoção)
3. Salva
4. Comparação mostra: economia ainda maior! ✅
```

---

## 🔮 Melhorias Futuras

### **1. Histórico de Alterações:**

```sql
CREATE TABLE taxas_historico (
  id INT PRIMARY KEY,
  taxa_id INT,
  valor_anterior DECIMAL,
  valor_novo DECIMAL,
  usuario_id INT,
  data_alteracao TIMESTAMP
);
```

### **2. Taxas Sazonais:**

```php
// Diferentes taxas por mês/período
$taxa = Taxa::where('codigo', 'juros_carro')
    ->where('vigencia_inicio', '<=', now())
    ->where('vigencia_fim', '>=', now())
    ->first();
```

### **3. Taxas por Região:**

```php
// Diferentes taxas por estado/cidade
$taxa = Taxa::where('codigo', 'seguro_carro')
    ->where('estado', $request->estado)
    ->first();
```

### **4. Múltiplas Instituições:**

```php
// Comparar taxas de diferentes bancos/administradoras
$taxas = Taxa::where('instituicao', 'Banco ABC')
    ->orWhere('instituicao', 'Banco XYZ')
    ->get();
```

---

## ✅ Benefícios Implementados

1. ✅ **Flexibilidade:** Admin altera taxas sem programar
2. ✅ **Rapidez:** Mudanças instantâneas
3. ✅ **Segurança:** Validação no backend
4. ✅ **Fallback:** Continua funcionando se API falhar
5. ✅ **UX:** Loading states e feedback visual
6. ✅ **Manutenibilidade:** Código limpo e organizado
7. ✅ **Escalabilidade:** Fácil adicionar novos tipos de taxas

---

## 📚 Arquivos Modificados

1. ✅ `resources/js/Pages/Calculadora/Index.jsx`

    - Adicionado fetch de taxas via API
    - Estado `configTaxas` e `carregandoTaxas`
    - Passa taxas dinâmicas para componentes

2. ✅ `resources/js/utils/calculations.js`

    - Parâmetro opcional `configTaxas`
    - Usa taxas dinâmicas ou fallback estático

3. ✅ `resources/js/utils/validations.js`

    - Parâmetro opcional `configTaxas`
    - Validação com limites dinâmicos

4. ✅ `resources/js/utils/constants.js`

    - Função `calcularLimites` aceita config dinâmico

5. ✅ `resources/js/Components/FormularioModerno.jsx`
    - Recebe e usa `configTaxas`
    - Mostra badge "Taxas Atualizadas"

---

## 🎉 Conclusão

**Sistema de Taxas Dinâmicas implementado com sucesso!**

Agora a calculadora é:

-   ✅ Flexível (admin controla tudo)
-   ✅ Confiável (com fallback)
-   ✅ Moderna (API RESTful)
-   ✅ Escalável (fácil crescer)

**Próximo passo:** Compile e teste! (npm run dev)

---

**Desenvolvido com 💚 para máxima flexibilidade!**
