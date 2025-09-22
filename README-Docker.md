# Personal Portfolio - Docker Setup

This project has been containerized using Docker and Docker Compose for easy deployment and development.

## Project Structure

- **Backend**: Spring Boot application (Java 17) running on port 8091
- **Frontend**: React application served by Nginx on port 3000
- **Database**: MySQL 8.0 running on port 3306

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. **Navigate to the project directory:**
   ```bash
   cd PersonalPortfolio
   ```

2. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8091
   - MySQL: localhost:3306

## Available Commands

### Start services in background:
```bash
docker-compose up -d
```

### Stop all services:
```bash
docker-compose down
```

### Stop and remove volumes (WARNING: This will delete database data):
```bash
docker-compose down -v
```

### View logs:
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql
```

### Rebuild specific service:
```bash
docker-compose up --build backend
```

## Services Configuration

### Backend (Spring Boot)
- **Port**: 8091
- **Database**: Connected to MySQL container
- **File Uploads**: Persistent volume for uploads directory

### Frontend (React + Nginx)
- **Port**: 3000
- **Build**: Multi-stage build with Node.js and Nginx
- **Static Files**: Served by Nginx

### Database (MySQL)
- **Port**: 3306
- **Database**: petfinder_db
- **Username**: portfolio_user
- **Password**: portfolio_pass
- **Root Password**: 432980146416

## Development

### Backend Development
To make changes to the backend:
1. Modify the code in `backend/` directory
2. Rebuild the backend service: `docker-compose up --build backend`

### Frontend Development
To make changes to the frontend:
1. Modify the code in `personal-portfolio-frontend/` directory
2. Rebuild the frontend service: `docker-compose up --build frontend`

## Troubleshooting

### Port Conflicts
If you have port conflicts, modify the ports in `docker-compose.yml`:
```yaml
ports:
  - "3001:80"  # Change 3000 to 3001
  - "8092:8091"  # Change 8091 to 8092
```

### Database Connection Issues
1. Ensure MySQL container is running: `docker-compose ps`
2. Check MySQL logs: `docker-compose logs mysql`
3. Verify database credentials in `docker-compose.yml`

### Build Issues
1. Clean Docker cache: `docker system prune -a`
2. Rebuild without cache: `docker-compose build --no-cache`

## Production Deployment

For production deployment, consider:
1. Using environment variables for sensitive data
2. Setting up proper SSL certificates
3. Using a reverse proxy (nginx/traefik)
4. Setting up database backups
5. Using Docker secrets for passwords

## Environment Variables

You can override default settings using environment variables:

```bash
# Database
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_DATABASE=your_database_name
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password

# Backend
SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/your_database
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password
```

Create a `.env` file in the root directory to set these variables.




