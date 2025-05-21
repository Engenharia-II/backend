FROM node:20.14-alpine

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache \
    curl \
    git \
    openssl

# Install Prisma CLI globally
RUN npm install -g prisma

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose ports
EXPOSE 3333
EXPOSE 5555

# Start the application and run migrations/seeding
CMD ["sh", "-c", "npm run db:deploy && npm run db:populate && npm run dev"]
