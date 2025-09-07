import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const filmes = sqliteTable("filmes", {
  id: text("id").primaryKey(),
  titulo: text("titulo").notNull(),
  diretor: text("diretor").notNull(),
  anoLancamento: integer("ano_lancamento").notNull(),
  genero: text("genero"),
  nota: real("nota"),
  dataAssistido: text("data_assistido"),
});
