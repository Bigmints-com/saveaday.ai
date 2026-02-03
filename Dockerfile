# Multi-stage build for SaveADay Home (Static Export)
FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy root package files (in order of least likely to change)
COPY pnpm-workspace.yaml .npmrc ./
COPY package.json pnpm-lock.yaml ./

# Copy shared packages (need source for workspace resolution)
COPY packages ./packages
COPY apps/home/package.json ./apps/home/

# Install dependencies (pnpm will handle workspace linking)
RUN pnpm install --no-frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages

# Copy root config files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc tsconfig.base.json tsconfig.json ./

# Copy shared packages source
COPY packages ./packages

# Copy app source
COPY apps/home ./apps/home

# Build shared packages first
RUN pnpm --filter '@saveaday/shared-types' build && \
    pnpm --filter '@saveaday/shared-utils' build && \
    pnpm --filter '@saveaday/shared-firebase' build && \
    pnpm --filter '@saveaday/shared-auth' build && \
    pnpm --filter '@saveaday/shared-ui' build && \
    pnpm --filter '@saveaday/context' build && \
    pnpm --filter '@saveaday/events' build && \
    pnpm --filter '@saveaday/integrations' build || true

# Build the application
# Next.js is hoisted to root node_modules, so we use the root's .bin
WORKDIR /app

# Firebase build args - these get embedded in the client-side bundle
ARG NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCy5bnWddkYSOqJcysDq-whdUv9zquVOaU
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=dvizfb.firebaseapp.com
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID=dvizfb
ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=dvizfb.firebasestorage.app
ARG NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=647930923087
ARG NEXT_PUBLIC_FIREBASE_APP_ID=1:647930923087:web:3e1b88b7cf00166765823a

ENV NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ENV NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID

RUN cd apps/home && NODE_PATH=/app/node_modules:/app/apps/home/node_modules /app/node_modules/.bin/next build

# Production image using Nginx for static files
FROM nginx:alpine AS runner

# Copy the static export from the builder
COPY --from=builder /app/apps/home/out /usr/share/nginx/html

# Nginx config for SPA routing
RUN echo 'server { \
    listen 8080; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    location / { \
    try_files $uri $uri/ $uri.html /index.html; \
    } \
    \
    location = /404.html { \
    internal; \
    } \
    \
    error_page 404 /404.html; \
    \
    gzip on; \
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript; \
    }' > /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
