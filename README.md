# Blog Application with Admin Authentication

A Next.js blog application with role-based authentication that allows admins to create, edit, and delete blog posts while regular users can only view them.

## Features

- **Role-based Authentication**: Admin and regular user roles
- **Admin Dashboard**: Manage all blog posts in one place
- **Blog Management**: Create, edit, and delete blog posts (admin only)
- **Rich Text Editor**: EditorJS integration for content creation
- **Image Upload**: Cloudinary integration for banner images
- **Responsive Design**: Mobile-friendly interface
- **Protected Routes**: Middleware protection for admin routes

## Authentication

### Demo Credentials

**Admin User:**

- Email: `admin@email.com`
- Password: `adminpassword`

**Regular User:**

- Email: `user@email.com`
- Password: `userpassword`

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here-make-it-long-and-random
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (optional - for Google login)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset

# MongoDB Connection String
MONGODB_URI=your-mongodb-connection-string
```

## Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables (see above)

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
my-app/
├── app/
│   ├── admin/                 # Admin dashboard
│   ├── auth/                  # Authentication pages
│   ├── blogs/                 # Blog pages
│   │   ├── new/              # Create new blog
│   │   ├── edit/[slug]/      # Edit blog
│   │   └── [slug]/           # View blog
│   ├── api/                  # API routes
│   │   ├── auth/             # NextAuth API
│   │   └── blogs/            # Blog API
│   └── component/            # React components
├── lib/                      # Utility libraries
├── models/                   # Database models
└── middleware.ts             # Route protection
```

## API Routes

### Authentication

- `GET/POST /api/auth/[...nextauth]` - NextAuth authentication

### Blogs

- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create new blog (admin only)
- `GET /api/blogs/[slug]` - Get blog by slug
- `PUT /api/blogs/[slug]` - Update blog (admin only)
- `DELETE /api/blogs/[id]` - Delete blog (admin only)

## Admin Features

### Dashboard (`/admin`)

- View all blog posts
- Quick access to edit and delete functions
- Create new posts button

### Blog Management

- **Create**: `/blogs/new` - Rich text editor with image upload
- **Edit**: `/blogs/edit/[slug]` - Edit existing posts
- **Delete**: Available from dashboard and individual blog pages

### Navigation

- Admin users see additional navigation items:
  - "New Post" link
  - "Admin" dashboard link
  - User status with role indicator

## Security

- **Middleware Protection**: Admin routes are protected by middleware
- **Role-based Access**: API routes check for admin role
- **Session Management**: NextAuth handles secure sessions
- **Route Guards**: Client-side protection for admin pages

## Technologies Used

- **Next.js 15** - React framework
- **NextAuth.js** - Authentication
- **MongoDB** - Database
- **Mongoose** - ODM
- **EditorJS** - Rich text editor
- **Cloudinary** - Image hosting
- **Tailwind CSS** - Styling

## Development

### Adding New Users

To add new users, modify the `users` array in `lib/auth.js`:

```javascript
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@email.com",
    password: "adminpassword",
    role: "admin",
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@email.com",
    password: "userpassword",
    role: "user",
  },
  // Add more users here
];
```

### Customizing Authentication

For production, consider:

- Using a database for user storage
- Implementing password hashing (bcrypt)
- Adding email verification
- Setting up proper OAuth providers

## Deployment

1. Set up environment variables on your hosting platform
2. Build the application: `npm run build`
3. Deploy to your preferred platform (Vercel, Netlify, etc.)

## License

This project is open source and available under the [MIT License](LICENSE).
