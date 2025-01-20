# Usa una imagen oficial de Node.js como base
FROM node:18-alpine

# Crea y establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe) al contenedor
COPY package*.json ./

# Copia el resto del código de la aplicación
COPY . .

# Instala las dependencias de Node.js
RUN npm install
# Compila el código TypeScript a JavaScript
RUN npm run build

# Exponer el puerto en el que la API de Node.js estará escuchando
EXPOSE 3003

# Define el comando para iniciar la aplicación
CMD ["npm", "start"]