export interface Filme {
  id: string;
  titulo: string;
  diretor: string;
  anoLancamento: number;
  genero: string | null;
  nota: number | null;
  dataAssistido: string | null;
}
