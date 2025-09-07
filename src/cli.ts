import { program } from "commander";
import { isValid, parse } from "date-fns";
import inquirer from "inquirer";
import { v4 as uuidv4 } from "uuid";
import { Filme } from "./interfaces/filme.interface";
import { FilmeRepository } from "./repositories/FilmeRepository";

// --- Funções de Lógica (Handlers) ---

async function handleListar() {
  try {
    const filmes = await FilmeRepository.findAll();
    if (filmes.length === 0) {
      console.log("\n🎬 Nenhum filme cadastrado.");
      return;
    }
    console.log("\n🎬 Lista de Filmes:");
    console.table(filmes);
  } catch (error) {
    console.error("\n❌ Erro ao listar filmes:", (error as Error).message);
  }
}

async function handleBuscarPorId(id?: string) {
  let filmeId = id;
  if (!filmeId) {
    const resposta = await inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "Digite o ID (UUID) do filme:",
        validate: (v) => (v ? true : "O ID é obrigatório."),
      },
    ]);
    filmeId = resposta.id;
  }

  if (filmeId) {
    try {
      const filme = await FilmeRepository.findById(filmeId);
      if (filme) {
        console.log("\n🔎 Filme encontrado:");
        console.table([filme]);
      } else {
        console.error("\n❌ Filme não encontrado.");
      }
    } catch (error) {
      console.error("\n❌ Erro ao buscar filme:", (error as Error).message);
    }
  }
}

async function handleCadastrar() {
  try {
    console.log("\n➕ Cadastrando um novo filme...");
    const questions = [
      {
        type: "input",
        name: "titulo",
        message: "Título:",
        validate: (v: string) => (v ? true : "Obrigatório."),
      },
      {
        type: "input",
        name: "diretor",
        message: "Diretor(a):",
        validate: (v: string) => (v ? true : "Obrigatório."),
      },
      {
        type: "input",
        name: "anoLancamento",
        message: "Ano de Lançamento:",
        validate: (v: string) =>
          !isNaN(parseInt(v)) && v.length === 4 ? true : "Ano inválido.",
      },
      { type: "input", name: "genero", message: "Gênero (opcional):" },
      { type: "input", name: "nota", message: "Nota (0-10, opcional):" },
      {
        type: "input",
        name: "dataAssistido",
        message: "Data Assistido (DD/MM/AAAA, opcional):",
        validate: (v: string) => {
          if (!v) return true;
          const data = parse(v, "dd/MM/yyyy", new Date());
          return isValid(data) ? true : "Formato inválido. Use DD/MM/AAAA";
        },
      },
    ];
    const respostas = await inquirer.prompt(questions as any);

    const novoFilme: Filme = {
      id: uuidv4(),
      titulo: respostas.titulo,
      diretor: respostas.diretor,
      anoLancamento: parseInt(respostas.anoLancamento),
      genero: respostas.genero || null,
      nota: respostas.nota ? parseFloat(respostas.nota) : null,
      dataAssistido: respostas.dataAssistido || null,
    };

    await FilmeRepository.create(novoFilme);
    console.log("\n✅ Filme cadastrado com sucesso!");
  } catch (error) {
    console.error("\n❌ Erro ao cadastrar o filme:", (error as Error).message);
  }
}

async function handleAtualizar() {
  try {
    const { id } = await inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "Digite o ID do filme para atualizar:",
        validate: (v: string) => (v ? true : "O ID é obrigatório."),
      },
    ] as any);
    const filmeExistente = await FilmeRepository.findById(id);

    if (!filmeExistente) {
      console.error("\n❌ Filme não encontrado.");
      return;
    }

    console.log(
      "\n🔄 Atualizando filme (pressione Enter para manter o valor atual):"
    );
    const prompts = [
      {
        type: "input",
        name: "titulo",
        message: `Título [${filmeExistente.titulo}]:`,
        default: filmeExistente.titulo,
      },
      {
        type: "input",
        name: "diretor",
        message: `Diretor(a) [${filmeExistente.diretor}]:`,
        default: filmeExistente.diretor,
      },
      {
        type: "input",
        name: "anoLancamento",
        message: `Ano [${filmeExistente.anoLancamento}]:`,
        default: String(filmeExistente.anoLancamento),
        validate: (v: string) =>
          v === "" || (!isNaN(parseInt(v)) && v.length === 4)
            ? true
            : "Inválido.",
      },
      {
        type: "input",
        name: "genero",
        message: `Gênero [${filmeExistente.genero || "N/A"}]:`,
        default: filmeExistente.genero ?? "",
      },
      {
        type: "input",
        name: "nota",
        message: `Nota [${filmeExistente.nota || "N/A"}]:`,
        default: filmeExistente.nota ? String(filmeExistente.nota) : "",
      },
      {
        type: "input",
        name: "dataAssistido",
        message: `Data Assistido [${filmeExistente.dataAssistido || "N/A"}]:`,
        default: filmeExistente.dataAssistido ?? "",
        validate: (v: string) => {
          if (!v) return true;
          const data = parse(v, "dd/MM/yyyy", new Date());
          return isValid(data) ? true : "Formato inválido. Use DD/MM/AAAA";
        },
      },
    ];

    const respostas = await inquirer.prompt(prompts as any);

    const dadosParaAtualizar = {
      titulo: respostas.titulo,
      diretor: respostas.diretor,
      anoLancamento: parseInt(respostas.anoLancamento),
      genero: respostas.genero || null,
      nota: respostas.nota ? parseFloat(respostas.nota) : null,
      dataAssistido: respostas.dataAssistido || null,
    };

    await FilmeRepository.update(id, dadosParaAtualizar);
    console.log("\n✅ Filme atualizado com sucesso!");
  } catch (error) {
    console.error("\n❌ Erro ao atualizar filme:", (error as Error).message);
  }
}

async function handleDeletar() {
  try {
    const { id } = await inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "Digite o ID do filme para deletar:",
        validate: (v: string) => (v ? true : "O ID é obrigatório."),
      },
    ] as any);
    const filmeExistente = await FilmeRepository.findById(id);

    if (!filmeExistente) {
      console.error("\n❌ Filme não encontrado.");
      return;
    }

    const { confirmar } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirmar",
        message: `Tem certeza que deseja deletar "${filmeExistente.titulo}"?`,
        default: false,
      },
    ] as any);
    if (confirmar) {
      await FilmeRepository.delete(id);
      console.log("\n🗑️ Filme deletado com sucesso!");
    } else {
      console.log("\nOperação cancelada.");
    }
  } catch (error) {
    console.error("\n❌ Erro ao deletar filme:", (error as Error).message);
  }
}

async function showInteractiveMenu() {
  const questions = [
    {
      type: "list",
      name: "action",
      message: "O que deseja fazer?",
      choices: [
        { name: "📋 Listar todos os filmes", value: "listar" },
        { name: "➕ Cadastrar um novo filme", value: "cadastrar" },
        { name: "🔍 Buscar um filme por ID", value: "buscar" },
        { name: "🔄 Atualizar um filme", value: "atualizar" },
        { name: "🗑️ Deletar um filme", value: "deletar" },
        new inquirer.Separator(),
        { name: "❌ Sair", value: "sair" },
      ],
    },
  ];

  const { action } = await inquirer.prompt(questions as any);

  switch (action) {
    case "listar":
      await handleListar();
      break;
    case "cadastrar":
      await handleCadastrar();
      break;
    case "buscar":
      await handleBuscarPorId();
      break;
    case "atualizar":
      await handleAtualizar();
      break;
    case "deletar":
      await handleDeletar();
      break;
    case "sair":
      console.log("\n👋 Até logo!");
      process.exit(0);
  }

  const { again } = await inquirer.prompt([
    {
      type: "confirm",
      name: "again",
      message: "\nDeseja realizar outra operação?",
      default: true,
    },
  ] as any);
  if (again) await showInteractiveMenu();
  else console.log("\n👋 Até logo!");
}

program.version("1.0.0").description("Gerenciador de Filmes via CLI");
program
  .command("listar")
  .description("Lista todos os filmes")
  .action(handleListar);
program
  .command("cadastrar")
  .description("Cadastra um novo filme")
  .action(handleCadastrar);
program
  .command("buscar [id]")
  .description("Busca um filme pelo ID (opcional)")
  .action(handleBuscarPorId);
program
  .command("atualizar")
  .description("Atualiza os dados de um filme")
  .action(handleAtualizar);
program.command("deletar").description("Deleta um filme").action(handleDeletar);

if (process.argv.length <= 2) {
  showInteractiveMenu();
} else {
  program.parse(process.argv);
}
