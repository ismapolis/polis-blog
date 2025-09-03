# Usamos Node Alpine multi-arquitectura (ARM compatible)
FROM node:20-alpine

WORKDIR /app

# Instalar dependencias de producción
COPY package*.json ./
RUN npm install --production

# Copiar el resto del proyecto, excepto el contenido dinámico
COPY . .

# Exponer el puerto donde Astro servirá el blog
EXPOSE 4321

# Comando por defecto: arranca el servidor Astro en producción
CMD ["npm", "run", "preview", "--", "--port", "4321", "--host"]
