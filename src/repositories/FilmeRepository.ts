import { eq } from "drizzle-orm";
import { db } from "../db/connection";
import { filmes } from "../db/schema";
import type { Filme } from "../interfaces/filme.interface";

export class FilmeRepository {
  static async findAll(): Promise<Filme[]> {
    const result = await db.select().from(filmes);
    return result;
  }

  static async findById(id: string): Promise<Filme | null> {
    const result = await db
      .select()
      .from(filmes)
      .where(eq(filmes.id, id))
      .limit(1);

    return result[0] ?? null;
  }

  static async create(
    filmeData: Omit<Filme, "id"> & { id: string }
  ): Promise<void> {
    await db.insert(filmes).values(filmeData);
  }

  static async update(
    id: string,
    filmeData: Partial<Omit<Filme, "id">>
  ): Promise<Filme> {
    const result = await db
      .update(filmes)
      .set(filmeData)
      .where(eq(filmes.id, id))
      .returning();

    if (result.length === 0) {
      throw new Error("Filme not found");
    }

    return result[0]; // Retorna o objeto filme atualizado
  }

  static async delete(id: string): Promise<void> {
    const result = await db.delete(filmes).where(eq(filmes.id, id)).returning();
    if (result.length === 0) {
      throw new Error("Filme not found");
    }
  }
}
