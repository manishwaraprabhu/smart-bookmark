# Smart Bookmark

A modern full-stack bookmark manager built with Next.js and Supabase.  
Users can securely sign in with Google, save personal bookmarks, and manage them in a clean and responsive interface.

---

## 🚀 Live Demo

Deployed on Vercel  
[Live App](https://smart-bookmark-lyart-two.vercel.app/)

---

## ✨ Features

- 🔐 Google Authentication (OAuth)
- 👤 User-specific bookmark storage
- ➕ Add bookmarks
- 🗑 Delete bookmarks
- ✅ Basic URL validation
- 🎨 Clean, responsive UI with Tailwind CSS
- 🌐 Production deployment with environment variables

---

## 🛠 Tech Stack

**Frontend**
- Next.js (App Router)
- React
- Tailwind CSS

**Backend / Database**
- Supabase (PostgreSQL Database + Authentication)

**Deployment**
- Vercel

---

## 🎯 Problem Statement

Managing bookmarks across devices can be inconvenient and insecure.  
Most browsers store bookmarks locally, making it difficult to:

- Access bookmarks from multiple devices
- Secure bookmarks behind authentication
- Store bookmarks per user in a centralized database

This project solves these problems by providing:

- Secure Google authentication
- Cloud-based bookmark storage
- User-specific data isolation
- A clean and minimal interface for managing links

---

## 🚧 Challenges Faced & How They Were Solved

### 1️⃣ Authentication & OAuth Redirect Issues

**Problem:**  
Google OAuth required proper redirect URLs for both local development and production environments.

**Solution:**  
- Configured correct redirect URLs inside Supabase Authentication settings.
- Added production domain in Supabase URL configuration.
- Ensured environment variables were correctly set in both local `.env.local` and Vercel dashboard.

---

### 2️⃣ Environment Variables Not Working in Production

**Problem:**  
The app worked locally but failed after deployment due to missing environment variables.

**Solution:**  
- Added `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` inside Vercel Environment Variables.
- Redeployed the application to ensure variables were available at build time.

---

### 3️⃣ Data Isolation Between Users

**Problem:**  
Ensuring users can only access their own bookmarks.

**Solution:**  
- Linked each bookmark to `user_id`.
- Enabled Row Level Security (RLS) in Supabase.
- Used authenticated session user ID when inserting data.

---

### 4️⃣ UI Readability Issues

**Problem:**  
Text appeared too light and thin in production, reducing readability.

**Solution:**  
- Improved Tailwind text color contrast.
- Applied stronger font weights (`font-medium`, `font-semibold`).
- Updated background and border styling for better visual clarity.

---

### 5️⃣ Deployment & Git Workflow

**Problem:**  
Understanding how code updates reflect on GitHub and Vercel.

**Solution:**  
- Followed proper Git workflow: `add → commit → push`.
- Connected GitHub repository to Vercel for automatic redeployment.
- Verified production builds through Vercel dashboard logs.

---

## 📂 Project Structure

```

smart-bookmark/
│
├── app/
│   ├── page.tsx
│   └── globals.css
│
├── lib/
│   └── supabaseClient.ts
│
├── public/
│
└── README.md

```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root of your project and add:

```

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_public_key

```

You can find these inside your Supabase project settings.

---

## 🧠 How It Works

1. User signs in using Google OAuth via Supabase.
2. Supabase authenticates the user and returns a session.
3. Bookmarks are stored in a PostgreSQL database.
4. Each bookmark is linked to the authenticated user.
5. Only the owner can view and manage their bookmarks.

---

## 🗄 Database Schema

Table: `bookmarks`

| Column      | Type      | Description |
|------------|----------|------------|
| id         | uuid     | Primary key |
| created_at | timestamp| Auto-generated |
| title      | text     | Bookmark title |
| url        | text     | Bookmark URL |
| user_id    | uuid     | Linked to authenticated user |

---

## 🧪 Running Locally

1. Clone the repository:

```
git clone https://github.com/manishwaraprabhu/smart-bookmark.git
```

2. Navigate into the project:

```
cd smart-bookmark
```
3. Install dependencies:

```
npm install
```

4. Add your environment variables in `.env.local`

5. Run the development server:

```
npm run dev
```

Visit:  
http://localhost:3000

---

## 📦 Deployment

This project is deployed using Vercel.

Steps:
1. Push code to GitHub.
2. Import repository into Vercel.
3. Add environment variables.
4. Deploy.

---

## 🔒 Security

- Uses Supabase Row Level Security (RLS)
- Authenticated user-based data isolation
- Environment variables protected in production

---

## 🎯 Future Improvements

- ✏️ Edit bookmarks
- 🔍 Search functionality
- 📂 Categories / folders
- 🌙 Manual dark mode toggle
- 📱 Enhanced mobile optimization
- 🗂 Drag-and-drop ordering

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

Built by Manishwara Prabhu

---

## ⭐ Acknowledgements

- Supabase for backend and authentication
- Vercel for seamless deployment
- Tailwind CSS for modern styling
```