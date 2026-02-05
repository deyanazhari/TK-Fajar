# TK Fajar - Full Stack Application

A modern kindergarten website for TK Fajar built with React (frontend) and Spring Boot (backend) using Java 21 and Gradle.

## Project Structure

```
project/
├── frontend/          # React.js application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/    # API services
│   │   └── utils/       # Utility functions
│   ├── package.json
│   └── tailwind.config.js
└── backend/           # Spring Boot application
    ├── src/main/java/com/tkfajar/backend/
    │   ├── controller/   # REST controllers
    │   ├── service/      # Business logic
    │   ├── model/        # Entity models
    │   ├── dto/          # Data transfer objects
    │   ├── repository/   # JPA repositories
    │   └── config/       # Configuration classes
    ├── build.gradle
    └── application.properties
```

## Prerequisites

- Java 21
- Node.js 16+
- Gradle 8.5+

## Getting Started

### Prerequisites

1. Install and start MongoDB (local or Atlas)
2. Ensure Java 21 and Node.js are installed

### Backend (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the Spring Boot application:
   ```bash
   gradlew bootRun
   ```

The backend will start on `http://localhost:8080/api`

### Frontend (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will start on `http://localhost:3000`

### Application Routes

- **Home Page**: `http://localhost:3000/` - Complete landing page with all sections
- **Registration Page**: `http://localhost:3000/registration` - Dedicated registration form page

## Features

- **Responsive Design**: Built with Tailwind CSS for modern, mobile-first design
- **Component Architecture**: Modular React components for maintainability
- **REST API**: Spring Boot REST endpoints for data management
- **Data Validation**: Input validation on both frontend and backend
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **H2 Database**: In-memory database for development
- **Security**: Spring Security configuration for API protection

## API Endpoints

- `POST /api/registration` - Submit registration form
- `GET /api/registration` - Get all registrations
- `GET /api/registration/{id}` - Get registration by ID
- `GET /api/registration/health` - Health check endpoint

## Environment Variables

### Frontend
Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:8080/api
```

### Backend
Configuration is handled in `src/main/resources/application.properties`

## Database

The application uses MongoDB for data persistence. You have two options:

### Option 1: Local MongoDB
1. Install MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Start MongoDB service (runs on port 27017 by default)
3. The application will connect automatically to `localhost:27017`

### Option 2: MongoDB Atlas (Cloud)
1. Create a free account at https://www.mongodb.com/atlas
2. Create a cluster and database user
3. Update `application.properties` with your Atlas connection string

For detailed setup instructions, see [MONGODB_SETUP.md](MONGODB_SETUP.md)

### Database Details
- Database name: `tk_fajar`
- Collection name: `registrations`
- Fields: `parent_name`, `child_name`, `whatsapp`, `created_at`
- Unique index on `whatsapp` field

### Viewing Data
Use MongoDB Compass or the MongoDB shell to view the stored registration data.

## Development

### Running Tests

**Backend:**
```bash
cd backend
gradlew test
```

**Frontend:**
```bash
cd frontend
npm test
```

### Building for Production

**Backend:**
```bash
cd backend
gradlew build
```

**Frontend:**
```bash
cd frontend
npm run build
```

## Technology Stack

### Frontend
- React 18
- React Router
- Axios for HTTP requests
- Tailwind CSS for styling
- Google Fonts (Quicksand)

### Backend
- Java 21
- Spring Boot 3.2.0
- Spring Data JPA
- Spring Security
- Spring Validation
- H2 Database
- Lombok
- Gradle

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.