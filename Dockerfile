# --- ESTÁGIO 1: Build ---
# Usa uma imagem Node.js como base para construir o projeto
FROM node:20-alpine AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de definição de dependências
COPY package.json package-lock.json ./

# Instala TODAS as dependências (incluindo devDependencies) para o build
RUN npm install

# Copia todo o código-fonte do projeto
COPY . .

# Roda o script de build para compilar TypeScript para JavaScript
RUN npm run build


# --- ESTÁGIO 2: Produção ---
# Começa de uma nova imagem base, mais leve
FROM node:20-alpine AS production

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência da imagem de build
COPY --from=build /app/package.json /app/package-lock.json ./

# Instala APENAS as dependências de produção
RUN npm install --omit=dev

# Copia o código JAVASCRIPT COMPILADO do estágio de build
COPY --from=build /app/dist ./dist

# Copia as migrações do Drizzle para que possam ser executadas
COPY --from=build /app/drizzle ./drizzle

# Comando padrão para rodar a aplicação quando o container iniciar
CMD ["node", "dist/index.js"]