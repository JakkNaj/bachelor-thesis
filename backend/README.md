 # Bachelor Thesis Backend

A Node.js backend application using Express.js and SQLite database with Prisma ORM.

## Prerequisites

- **Node.js** (v18 or higher)  
- **npm** (Node Package Manager)  

## Setup Instructions

1. **Install dependencies**  
   ```sh
   npm install
   ```

2. **Setup the database**  
   
   You have two options:

   a. Basic setup (without test data):
   ```sh
   npm run setup-db
   ```
   This command will:
   - Generate the Prisma Client
   - Create SQLite database
   - Run migrations

   b. Setup with test data:
   ```sh
   npm run init-db
   ```
   This command will:
   - Perform basic setup
   - Seed the database with test trips and activities

3. **Start the development server**  
   ```sh
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Start the development server
- `npm run setup-db`: Setup the database (without test data)
- `npm run seed-db`: Add test data to database
- `npm run init-db`: Setup database and add test data
- `npm run build`: Build the project
- `npm run start`: Start the production server

## Database
This project uses SQLite database, which means:
- No additional database installation is required
- The database file is stored locally in prisma/dev.db

## API Endpoints

```GET /users``` - Retrieve all users
[Add your other endpoints here]

## Project Structure
```
project/
├── prisma/
│   └── schema.prisma     # Database schema
├── scripts/
│   └── setup-db.ts       # Database setup script
├── src/
│   └── app.ts            # Main application file
├── package.json
└── README.md
```

## License
[TODO]





