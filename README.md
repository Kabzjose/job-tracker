# Job Tracker Frontend

A React frontend for tracking job applications, built with Vite and Tailwind CSS.

## Live URL

```
https://job-tracker-wheat-kappa.vercel.app
```

## Tech Stack

- **Framework** — React 18 (Vite)
- **Styling** — Tailwind CSS
- **Routing** — React Router DOM
- **HTTP Client** — Axios
- **State Management** — React Context API
- **Deployment** — Vercel

## Features

- User registration and login
- JWT authentication with auto token attachment
- Protected routes
- Dashboard with job stats overview
- Filter jobs by status
- Add, edit and delete jobs inline
- Forgot and reset password flow
- User profile page (update name and password)
- Responsive design

## Project Structure

```
src/
  components/
    Navbar.jsx          # top navigation with user info and logout
    StatsCard.jsx       # stat display card component
    AddJobModal.jsx     # modal form for adding new jobs
    PrivateRoute.jsx    # route guard for authenticated pages
  context/
    AuthContext.jsx     # global auth state management
  pages/
    Login.jsx           # login page
    Register.jsx        # register page
    Dashboard.jsx       # main dashboard with jobs table
    Profile.jsx         # user profile page
    ForgotPassword.jsx  # forgot password page
    ResetPassword.jsx   # reset password page
  services/
    api.js              # axios instance with interceptors
  App.jsx               # routes setup
  main.jsx              # entry point
```

## Getting Started

### Prerequisites

- Node.js v18+
- Backend API running (see backend README)

### Installation

```bash
# clone the repository
git clone https://github.com/yourusername/frontend-job-tracker.git
cd frontend-job-tracker

# install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://127.0.0.1:5000/api
```

Update `src/services/api.js` to use it:

```js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})
```

### Running the App

```bash
# development
npm run dev

# build for production
npm run build
```

App runs on `http://localhost:5173`

## Pages

| Route | Page | Auth Required |
|-------|------|---------------|
| `/login` | Login | No |
| `/register` | Register | No |
| `/forgot-password` | Forgot Password | No |
| `/reset-password/:token` | Reset Password | No |
| `/dashboard` | Dashboard | Yes |
| `/profile` | Profile | Yes |

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Navy Dark | `#0f172a` | Page backgrounds |
| Navy | `#1e293b` | Cards, navbar |
| Navy Light | `#334155` | Inputs, table rows |
| Amber Gold | `#f59e0b` | Buttons, accents |
| Dark Amber | `#d97706` | Button hover |
| White | `#f8fafc` | Headings |
| Slate | `#94a3b8` | Subtext |

## Key Components

### AuthContext

Manages global authentication state. Provides `user`, `login` and `logout` to all components:

```jsx
const { user, login, logout } = useAuth()
```

### api.js

Axios instance that automatically attaches the JWT token to every request:

```js
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
```

### PrivateRoute

Protects authenticated routes. Redirects to login if no user is found:

```jsx
const PrivateRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}
```

## Job Status Colors

| Status | Color |
|--------|-------|
| Applied | Blue |
| Interviewing | Amber |
| Offer | Green |
| Rejected | Red |

## Deployment

The app is deployed on Vercel. To deploy your own:

```bash
# install vercel cli
npm install -g vercel

# deploy
vercel
```

Make sure to set the environment variable in Vercel:
```
VITE_API_URL=https://your-backend.onrender.com/api
```

## Screenshots

| Page | Description |
|------|-------------|
| Login | Clean login form with amber gold accents |
| Dashboard | Stats overview, filter tabs, jobs table |
| Add Job | Modal popup form |
| Profile | Update name and password |

## License

MIT
