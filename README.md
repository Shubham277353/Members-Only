# Members Only

A full-stack members-only message board built as part of [The Odin Project](https://www.theodinproject.com/) NodeJS curriculum.

Users can create accounts, log in, become members, and participate in discussions. Members can see additional information about posts, while administrators have additional privileges such as deleting messages.

## Live Demo

[View the live application](https://clubhouse-l12w.onrender.com)

## Features

- User registration and login
- Password hashing with bcrypt
- Authentication using Passport.js
- Persistent login sessions
- PostgreSQL session storage
- Membership system
- Admin role and protected admin functionality
- Members can create messages
- Members can see message authors and timestamps
- Non-members can view messages without seeing author information
- Admins can delete messages
- Form validation with express-validator
- Server-side rendering with EJS
- Responsive styling with Tailwind CSS
- PostgreSQL database
- Deployed on Render

## Built With

### Frontend
- EJS
- Tailwind CSS
- HTML

### Backend
- Node.js
- Express
- Passport.js
- express-session
- connect-pg-session
- express-validator
- bcryptjs

### Database
- PostgreSQL

### Deployment
- Render

## Authentication & Authorization

The application uses Passport's Local Strategy for authentication.

Passwords are hashed before being stored in the database using bcrypt.

User sessions are stored in PostgreSQL using `connect-pg-session`.

There are three levels of access:

| User | Capabilities |
|------|--------------|
| Visitor | View messages |
| Member | View authors/timestamps and create messages |
| Admin | Member privileges + delete messages |

Protected routes ensure that users cannot access member or admin functionality simply by manipulating the URL.

## Database Structure

The application uses two main tables:

### Users

Stores account and authorization information.

- `id`
- `first_name`
- `last_name`
- `email`
- `password`
- `membership_status`
- `isadmin`

### Messages

Stores messages posted by users.

- `id`
- `user_id`
- `title`
- `message`
- `created_at`

Each message references the user who created it through a foreign key.

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- PostgreSQL
- Git

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <your-repository-name>
```
### 2. Install dependencies
`npm install`

### 3. Configure environment variables
Create a .env file:
```
DATABASE_URL=your_database_url
SECRET_CATS=your_session_secret
MEMBERSHIP_PASSCODE=your_membership_passcode
ADMIN_CODE=your_admin_code
```

### 4. Initialize the database
Run the database initialization script with your PostgreSQL connection string:
`node populateDb.js "your-database-url"`

### 5. Start the application
For development:
`npm run dev`
For production:
`npm start`

The application will be available at:
http://localhost:3000

## What I Learned
This project was a major step up from the earlier projects in my learning journey.

Some of the main concepts I worked with were:
- Authentication and authorization
- Passport.js and Local Strategy
- Session-based authentication
- PostgreSQL relationships and foreign keys
- Middleware and middleware execution order
- Server-side form validation
- Password hashing
- Role-based access control
- EJS templating
- Environment variables
- Production database configuration
- Deployment with Render
- Debugging production-specific issues
A particularly useful part of the project was understanding how different middleware layers interact — from validation, to authentication, to authorization, and finally the controller.

## 👤 Author
Shubham Bhandari
