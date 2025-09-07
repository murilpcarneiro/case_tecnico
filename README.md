# 🎬 Filmes CLI

Uma aplicação de linha de comando para gerenciamento de filmes, desenvolvida como parte do processo seletivo da **DTI Digital**.

## 📋 Sobre o Projeto

Este projeto é uma CLI (Command Line Interface) que permite cadastrar, listar, buscar, atualizar e deletar filmes de uma base de dados local. Foi desenvolvida utilizando tecnologias modernas como **TypeScript**, **Drizzle ORM** e **SQLite**.

## 🚀 Funcionalidades

- ✅ **Listar filmes**: Visualiza todos os filmes cadastrados
- ✅ **Cadastrar filme**: Adiciona novos filmes à base de dados
- ✅ **Buscar filme**: Encontra um filme específico por ID
- ✅ **Atualizar filme**: Modifica informações de filmes existentes
- ✅ **Deletar filme**: Remove filmes da base de dados
- 🎨 **Interface interativa**: Menu intuitivo com navegação por setas
- 📊 **Visualização em tabela**: Dados apresentados de forma organizada

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação
- **Commander.js** - Framework para CLIs
- **Inquirer.js** - Interface interativa de linha de comando
- **Drizzle ORM** - ORM para TypeScript
- **SQLite** - Banco de dados local
- **Better SQLite3** - Driver SQLite para Node.js
- **Date-fns** - Biblioteca para manipulação de datas
- **UUID** - Geração de identificadores únicos
- **TSUP** - Bundler TypeScript

## 📦 Instalação

### Pré-requisitos

- Node.js >= 18.0.0
- npm ou yarn

### Passos de Instalação

1. **Clone o repositório**:
   ```bash
   git clone <url-do-repositorio>
   cd case_tecnico
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Execute a aplicação em modo de desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Ou compile e execute a versão de produção**:
   ```bash
   npm run build
   npm start
   ```

## 🎯 Como Usar

### Modo Interativo (Recomendado)

Execute o comando sem parâmetros para abrir o menu interativo:

```bash
npm start
```

ou

```bash
filmes-cli
```

### Comandos Diretos

Você também pode executar comandos específicos diretamente:

```bash
# Listar todos os filmes
filmes-cli listar

# Cadastrar um novo filme
filmes-cli cadastrar

# Buscar um filme por ID
filmes-cli buscar [id-do-filme]

# Atualizar um filme
filmes-cli atualizar

# Deletar um filme
filmes-cli deletar
```

### Exemplo de Uso

```bash
$ npm start

? O que deseja fazer? (Use as setas para navegar)
❯ 📋 Listar todos os filmes
  ➕ Cadastrar um novo filme
  🔍 Buscar um filme por ID
  🔄 Atualizar um filme
  🗑️  Deletar um filme
  ────────────────
  ❌ Sair
```

## 📊 Estrutura dos Dados

Cada filme contém as seguintes informações:

```typescript
interface Filme {
  id: string;           // UUID único
  titulo: string;       // Nome do filme (obrigatório)
  diretor: string;      // Nome do diretor (obrigatório)
  anoLancamento: number; // Ano de lançamento (obrigatório)
  genero: string | null; // Gênero do filme (opcional)
  nota: number | null;   // Nota de 0-10 (opcional)
  dataAssistido: string | null; // Data no formato DD/MM/AAAA (opcional)
}
```

## 📁 Estrutura do Projeto

```
case_tecnico/
├── src/
│   ├── db/
│   │   └── connection.ts      # Configuração do banco de dados
│   ├── interfaces/
│   │   └── filme.interface.ts # Interface do filme
│   ├── repositories/
│   │   └── FilmeRepository.ts # Operações CRUD
│   ├── cli.ts                 # Interface de linha de comando
│   └── index.ts              # Ponto de entrada
├── dist/                     # Arquivos compilados
├── drizzle/                  # Migrações do banco
├── db.sqlite                 # Banco de dados SQLite
├── package.json
├── tsconfig.json
├── drizzle.config.ts
└── README.md
```

## 🔧 Scripts Disponíveis

- `npm start` - Executa a aplicação compilada
- `npm run dev` - Executa em modo de desenvolvimento com hot-reload
- `npm run build` - Compila o projeto para produção
- `npm run db:generate` - Gera migrações do banco de dados

## 🎨 Características da Interface

- **Menu interativo** com navegação por teclado
- **Validação de entrada** para garantir dados consistentes
- **Formatação de datas** no padrão brasileiro (DD/MM/AAAA)
- **Confirmação para operações destrutivas** (deletar)
- **Mensagens de feedback** coloridas e com emojis
- **Visualização em tabela** para melhor legibilidade

## 🧪 Banco de Dados

O projeto utiliza **SQLite** como banco de dados local, gerenciado pelo **Drizzle ORM**. O arquivo `db.sqlite` é criado automaticamente na primeira execução.

### Schema do Banco

```sql
CREATE TABLE filmes (
  id TEXT PRIMARY KEY,
  titulo TEXT NOT NULL,
  diretor TEXT NOT NULL,
  anoLancamento INTEGER NOT NULL,
  genero TEXT,
  nota REAL,
  dataAssistido TEXT
);
```

## 👨‍💻 Desenvolvedor

**Murilo Carneiro**

Desenvolvido como parte do processo seletivo da DTI Digital.

## 📄 Licença

Este projeto está licenciado sob a licença ISC.

---

### 💡 Dicas de Uso

- Use as **setas do teclado** para navegar no menu interativo
- Campos **obrigatórios** são marcados na interface
- Para **cancelar** uma operação, use `Ctrl+C`
- O **ID do filme** é gerado automaticamente (UUID)
- **Datas** devem seguir o formato DD/MM/AAAA

### 🐛 Problemas Conhecidos

Se encontrar algum problema, verifique:
- Se o Node.js está na versão correta (>=18.0.0)
- Se todas as dependências foram instaladas corretamente
- Se há permissões de escrita no diretório do projeto
