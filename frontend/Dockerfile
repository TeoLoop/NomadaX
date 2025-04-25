# Build stage
FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Production stage (serve with nginx)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
