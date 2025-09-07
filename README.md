# 🎬 Filmes CLI

Uma aplicação de linha de comando para gerenciamento de filmes, desenvolvida como parte do processo seletivo da **DTI Digital**.

## 📋 Sobre o Projeto

Este projeto é uma CLI (Command Line Interface) que permite cadastrar, listar, buscar, atualizar e deletar filmes de uma base de dados local. Foi desenvolvida utilizando tecnologias modernas como **TypeScript**, **Drizzle ORM** e **SQLite**, e é totalmente containerizável com **Docker**.

## 🚀 Funcionalidades

- ✅ **Listar filmes**: Visualiza todos os filmes cadastrados
- ✅ **Cadastrar filme**: Adiciona novos filmes à base de dados
- ✅ **Buscar filme**: Encontra um filme específico por ID
- ✅ **Atualizar filme**: Modifica informações de filmes existentes
- ✅ **Deletar filme**: Remove filmes da base de dados
- 🐳 **Suporte a Docker**: Roda a aplicação em um ambiente isolado e consistente
- 🎨 **Interface interativa**: Menu intuitivo com navegação por setas
- 📊 **Visualização em tabela**: Dados apresentados de forma organizada

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação
- **Docker** - Plataforma de Containerização
- **Commander.js** - Framework para CLIs
- **Inquirer.js** - Interface interativa de linha de comando
- **Drizzle ORM** - ORM para TypeScript
- **SQLite** - Banco de dados local
- **Date-fns** - Biblioteca para manipulação de datas
- **UUID** - Geração de identificadores únicos
- **TSUP** & **TSX** - Ferramentas de build e execução

## 📦 Instalação e Execução

Existem duas maneiras de executar o projeto: localmente com Node.js ou via Docker.

### 🐳 Executando com Docker (Recomendado)

Esta é a forma mais simples e recomendada, pois garante que a aplicação rode em um ambiente consistente sem a necessidade de instalar o Node.js ou outras dependências na sua máquina.

**Pré-requisitos:**

- Docker Desktop instalado e em execução.

**Passos:**

1.  **Clone o repositório**:

    ```bash
    git clone <url-do-repositorio>
    cd case-tecnico-filmes-cli
    ```

2.  **Construa a imagem Docker**:

    ```bash
    docker build -t filmes-cli .
    ```

3.  **Execute a aplicação dentro do container**:

    ```bash
    docker run -it --rm filmes-cli
    ```

    - O comando `-it` inicia o modo interativo, permitindo que você use o teclado para interagir com a aplicação.

### ⚙️ Executando Localmente

**Pré-requisitos:**

- Node.js \>= 18.0.0
- npm

**Passos:**

1.  **Clone o repositório** e entre na pasta.

2.  **Instale as dependências**:

    ```bash
    npm install
    ```

3.  **Execute em modo de desenvolvimento**:

    ```bash
    npm run dev
    ```

4.  **Compile e execute a versão de produção**:

    ```bash
    npm run build
    npm start
    ```

## 🎯 Como Usar

### Modo Interativo

Execute o comando sem parâmetros para abrir o menu interativo (seja via Docker ou localmente):

```bash
# Via Docker
docker run -it --rm filmes-cli

# Localmente
npm start
```

### Comandos Diretos

Você também pode executar comandos específicos diretamente:

```bash
# Via Docker
docker run -it --rm filmes-cli listar

# Localmente
npm start listar
```

## 🛡️ Segurança

A imagem base `node:20-alpine` utilizada neste projeto atualmente reporta uma vulnerabilidade de alta severidade através do scanner do Docker. Em um ambiente de produção, os próximos passos seriam investigar a CVE específica, avaliar seu impacto na aplicação e mitigá-la, possivelmente utilizando uma imagem base diferente, aplicando patches de segurança ou aguardando uma versão atualizada da imagem oficial que corrija a falha.

## 📊 Estrutura dos Dados

```typescript
interface Filme {
  id: string; // UUID único
  titulo: string; // Obrigatório
  diretor: string; // Obrigatório
  anoLancamento: number; // Obrigatório
  genero: string | null; // Opcional
  nota: number | null; // Opcional
  dataAssistido: string | null; // Opcional (DD/MM/AAAA)
}
```

## 👨‍💻 Desenvolvedor

**Murilo Carneiro**

Desenvolvido como parte do processo seletivo da DTI Digital.

## 📄 Licença

Este projeto está licenciado sob a licença ISC.
