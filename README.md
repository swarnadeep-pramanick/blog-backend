# Blog Backend

A robust backend API for a blog platform built with Node.js, Express, Prisma, and PostgreSQL. Features include user authentication, post management with media support, and commenting system.

## Features

- 🔐 User Authentication (signup/login)
- 📝 Blog Post Management
- 💬 Comment System
- 🖼️ Media Upload Support (images/videos)
- 🏷️ Post Tagging
- 🚀 Redis Caching
- ✨ Input Validation
- 🔒 Protected Routes

## Prerequisites

- Node.js (Latest LTS version recommended)
- PostgreSQL
- Redis

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd blog-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="your_db_url"
schema=public"
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
```

## Database Setup and Seeding

1. First, run the migrations:
```bash
npx prisma migrate dev
```

2. Seed the database with test data:
```bash
npm run seed
```

### Test User Credentials
After running the seed command, the following test user will be created:
```
Email: test@example.com
Password: test123
Name: Test User
```

This test user will also have a sample blog post titled "Welcome to My Blog".

You can use these credentials to test the authentication and blog features immediately after setup.

To verify the seeded data, you can use Prisma Studio:
```bash
npx prisma studio
```
Then open your browser at `http://localhost:5555` to view and manage the database data.

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm test` - Run tests
- `npm run seed` - Seed the database with sample data

## API Documentation

The API documentation is available in the `manual` directory:
- `auth_api_manual.xml` - Authentication endpoints
- `posts_api_manual.xml` - Post management endpoints
- `comments_api_manual.xml` - Comment management endpoints

## Project Structure

```
blog-backend/
├── config/             # Configuration files
├── prisma/            # Database schema and migrations
├── src/
│   ├── app.js         # Express app setup
│   ├── auth/          # Authentication module
│   ├── comments/      # Comments module
│   ├── middleware/    # Custom middleware
│   ├── posts/         # Posts module
│   ├── services/      # Shared services
│   └── utils/         # Utility functions
└── tests/             # Test files
```

## Database Schema

The application uses Prisma with PostgreSQL. Main models include:
- User
- Post
- Comment

## Common Prisma Commands

```bash
# Generate Prisma Client after schema changes
npx prisma generate

# Create and apply new migration
npx prisma migrate dev

# Reset database (careful: deletes all data)
npx prisma migrate reset

# View database in Prisma Studio
npx prisma studio
```

## Dependencies

### Main Dependencies
- express - Web framework
- @prisma/client - Database ORM
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- multer - File upload handling
- redis - Caching
- joi - Input validation

### Dev Dependencies
- nodemon - Development server
- jest - Testing framework
- supertest - API testing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC