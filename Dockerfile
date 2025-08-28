# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app

# Copiamos solo package.json y lockfile para cache de dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto del código, excepto content
COPY . .

# El content lo montaremos como volumen externo
RUN mkdir -p src/content/posts src/content/finds

# Build del sitio estático
RUN npm run build

# Stage 2: runtime
FROM node:20-alpine AS runtime
WORKDIR /app

# Copiamos build del stage anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Instalamos un servidor de archivos ligero
RUN npm install -g serve

# Puerto en el que servirá
EXPOSE 3000

# Ejecutamos servidor
CMD ["serve", "-s", "dist", "-l", "3000"]
