# syntax=docker/dockerfile:1.4
# Multi-stage build for optimized production image

# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
# Install production dependencies with npm cache mount for faster builds
RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=production --ignore-scripts

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install ALL dependencies (including dev) with cache
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --ignore-scripts

# Copy application files
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build-time args for NEXT_PUBLIC_* variables (required at build time)
ARG NEXT_PUBLIC_SITE_URL=https://uralliance.ru
ARG NEXT_PUBLIC_YANDEX_METRIKA_ID=105470354
ARG NEXT_PUBLIC_WHATSAPP_PHONE=79149618687
ARG NEXT_PUBLIC_TELEGRAM_USERNAME=svechapvl

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_YANDEX_METRIKA_ID=$NEXT_PUBLIC_YANDEX_METRIKA_ID
ENV NEXT_PUBLIC_WHATSAPP_PHONE=$NEXT_PUBLIC_WHATSAPP_PHONE
ENV NEXT_PUBLIC_TELEGRAM_USERNAME=$NEXT_PUBLIC_TELEGRAM_USERNAME

# Build Next.js application
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Remove potentially dangerous binaries to harden container
RUN rm -f /usr/bin/wget /usr/bin/curl 2>/dev/null || true

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
