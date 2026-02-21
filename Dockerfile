# ===============================
# Stage 1 - Build (Node 24)
# ===============================
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# ===============================
# Stage 2 - Serve (Nginx)
# ===============================
FROM nginx:stable-alpine

# Hapus default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy hasil build ke subfolder chlora
COPY --from=build /app/dist /usr/share/nginx/html/chlora

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]