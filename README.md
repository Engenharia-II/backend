# CaminhoDev Backend

Backend system for CaminhoDev platform built with Node.js, Prisma, and PostgreSQL.

## Development Environment Setup

### Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- Git

### Getting Started

1. Clone the repository:

```bash
git clone git@github.com:Engenharia-II/backend.git
cd caminhoDev-backend
```

2. Start the development environment:

```bash
docker-compose up -d
```

This will start:

- API service on port 3333 (main API) and 5555 (additional services)
- PostgreSQL database on port 5432
- Automatic database migrations

### Database Management

The project uses Prisma as the ORM. Database migrations are handled automatically when the containers start up. Here's how it works:

1. The `migrations` service runs first and:

   - Applies any pending migrations (`prisma migrate deploy`)
   - Generates the Prisma client (`prisma generate`)

2. The API service waits for migrations to complete before starting

For manual database operations:

1. View database schema:

```bash
docker-compose exec api npx prisma studio
```

2. Create new migration:

```bash
docker-compose exec api npx prisma migrate dev --name <migration_name>
```

### Environment Variables

The following environment variables are required:

- `DATABASE_URL`: PostgreSQL connection string (automatically set in docker-compose)

### Project Structure

```
.
├── src/                # Source code
├── prisma/            # Database schema and migrations
│   ├── migrations/    # Database migration files
│   └── schema.prisma  # Prisma schema definition
├── Dockerfile         # API service container definition
└── docker-compose.yml # Development environment setup
```

### Development Workflow

1. Make changes to the code
2. The changes will be automatically reflected in the container due to volume mounting
3. For database changes:
   - Modify the Prisma schema
   - Test using `npx prisma db push`
   - Regenerate the Prisma client (`npm run prisma:reset`)
   - Create and apply migrations (`npm run prisma:migrate`)

### Troubleshooting

1. If the database is not accessible:

```bash
docker-compose restart postgres
```

2. To reset the database:

```bash
docker-compose down -v
docker-compose up -d
```

3. To view logs:

```bash
docker-compose logs -f
```

4. To check migration status:

```bash
docker-compose logs migrations
```

## API Documentation

The API documentation is available at `http://localhost:3333/docs` when running in development mode.
