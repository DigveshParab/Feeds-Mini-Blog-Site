# 📝 Next.js Blog Platform

A full-stack blogging platform built with Next.js, featuring user authentication, post creation, and a seamless reading experience.

---
## 🧾 Overview

This application allows users to create, edit, and publish blog posts. It includes features such as:

- User authentication with JWT
- text editing for posts
- Responsive design for various devices

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes,
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Vercel

---

## 🚀 Setup Instructions

Follow these steps to set up and run the application locally:

### 1. Clone the Repository

Ensure you have Git installed on your machine. Then, open your terminal and run:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed. Then, install the project dependencies:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Replace `your_mongodb_connection_string` and `your_jwt_secret_key` with your actual MongoDB URI and JWT secret.

### 4. Run the Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## 🗂️ Schema Design Explanation

The application utilizes a straightforward schema design comprising two primary collections: `User` and `Post`.

### 👤 User Schema

```json
{
  "name": "String",
  "email": { "type": "String", "unique": true },
  "password": { "type": "String", "select": false }
}
```

This schema stores essential user information. The `email` field is unique to prevent duplicate registrations, and the `password` field is excluded from query results by default for security.

### 📝 Post Schema

```json
{
  "title": "String",
  "content": "String",
  "tags": ["String"],
  "author": { "type": "mongoose.Schema.Types.ObjectId", "ref": "User" },
  "is_published": "Boolean",
  "is_private": "Boolean"
},
{ "timestamps": true }
```

Each post document includes a reference to its author via the `author` field, establishing a relationship between posts and users. The `is_published` and `is_private` boolean flags determine the visibility and publication status of the post.

### 🔍 Post Visibility Logic

The combination of `is_published` and `is_private` flags categorizes posts into different visibility states:

1. **🌍 Global Posts (Public Feed)**  
   Display all published and public posts not authored by the current user.
   ```javascript
   post.author_id !== user.id &&
   post.is_published === true &&
   post.is_private === false
   ```

2. **🔒 Private Posts (Created by Me, Hidden from Others)**  
   Display posts that are published but marked as private by the current user.
   ```javascript
   post.author_id === user.id &&
   post.is_published === true &&
   post.is_private === true
   ```

3. **📝 My Posts (All Published by Me, Public or Private)**  
   Display all posts published by the current user, regardless of their privacy setting.
   ```javascript
   post.author_id === user.id &&
   post.is_published === true
   ```

4. **🕓 Drafts**  
   Display posts authored by the user that are not yet published.
   ```javascript
   post.author_id === user.id &&
   post.is_published === false
   ```

This schema design ensures efficient data retrieval and management of post visibility based on user roles and post statuses.


## 🔗 API Endpoints Overview

This section outlines the API endpoints used in the application, categorized into **Authentication** and **Post Management** routes.

---

### 📁 File Structure

```plaintext
/api/
├── auth/
│   ├── login/        → POST   /api/auth/login
│   │   └── route.ts
│   ├── signup/       → POST   /api/auth/signup
│   │   └── route.ts
│   ├── logout/       → POST   /api/auth/logout
│   │   └── route.ts
│   └── me/           → GET    /api/auth/me
│       └── route.ts
├── post/
│   ├── create/       → POST   /api/post/create
│   │   └── route.ts
│   ├── global/       → GET    /api/post/global
│   │   └── route.ts
│   ├── user/
│   │   ├── route.ts      → GET    /api/post/user
│   │   ├── drafts/       → GET    /api/post/user/drafts
│   │   │   └── route.ts
│   │   └── private/      → GET    /api/post/user/private
│   │       └── route.ts
│   ├── edit/
│   │   └── [id]/         → PUT    /api/post/edit/:id
│   │       └── route.ts
│   ├── delete/
│   │   └── [id]/         → DELETE /api/post/delete/:id
│   │       └── route.ts
│   └── [id]/             → GET    /api/post/:id
│       └── route.ts
```


---

### 🔐 Authentication Endpoints

1. **POST** `/api/auth/signup`  
   Register a new user.

2. **POST** `/api/auth/login`  
   Authenticate a user and initiate a session.

3. **POST** `/api/auth/logout`  
   Terminate the user's session.

4. **GET** `/api/auth/me`  
   Retrieve the authenticated user's information. Useful for verifying login status on the client side, especially since HTTP-only cookies are used, which are inaccessible via JavaScript.

**Authentication Flow:**

- Upon successful login, a JWT is generated and stored in an HTTP-only cookie.
- Subsequent authenticated requests automatically include this token.
- Logging out clears the token from the cookies.

---

### 📝 Post Management Endpoints

1. **POST** `/api/post/create`  
   Create a new post.

2. **PUT** `/api/post/create/:id`  
   Publish a draft post.

3. **POST** `/api/post/edit`  
   Edit the content of an existing post.

4. **PUT** `/api/post/edit/:id`  
   Toggle a post's visibility between public and private.

5. **DELETE** `/api/post/delete/:id`  
   Delete a specific post.

6. **GET** `/api/post/global`  
   Retrieve all published and public posts not authored by the current user.

7. **GET** `/api/post/user/private`  
   Retrieve the authenticated user's private posts.

8. **GET** `/api/post/user/drafts`  
   Retrieve the authenticated user's draft posts.

9. **GET** `/api/post/user`  
   Retrieve all published posts by the authenticated user, regardless of their visibility.

10. **GET** `/api/post/:id`  
    Retrieve a specific post by its ID.

---

### ⚠️ Challenges Faced

1. **JWT Verification Issues:**

   - **Problem:** Encountered issues when using `jwt.verify` for token verification.
   - **Reason:** `jwt.verify` expects a raw secret key, whereas libraries like `next-auth` use the `jose` library, which employs additional encryption layers.
   - **Solution:** Utilize the `jose` library's `jwtVerify` function to ensure compatibility with tokens generated by `next-auth`.  
     *Reference: [GitHub Discussion on JWT Verification](https://github.com/nextauthjs/next-auth/discussions/2409)*

2. **Accessing Route Parameters in Edge Environment:**

   - **Problem:** Difficulty accessing dynamic route parameters in the Edge Runtime.
   - **Reason:** The Edge Runtime has limitations compared to the Node.js environment, affecting how parameters are accessed.
   - If you're defining a route handler (like GET, POST, etc.) for a dynamic API route (e.g., /api/user/[id]), and using the Edge Runtime, 
   - **Solution:** Modify the function signature to accept `context` and extract `params` accordingly. For example:
     ```typescript
     export async function GET(request: Request, context: { params: { id: string } }) {
       const { id } = context.params;
       // Your logic here
     }
     ```  
     *Reference: Stack overflow, triel and error 

---
