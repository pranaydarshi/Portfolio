# Darshi Sai Pranay — Portfolio

Personal portfolio website built with React + ASP.NET Core, featuring an Awwwards-inspired design with Framer Motion animations.

🌐 **Live:** [dsp-portfolio-frontend-805b73a25f1d.herokuapp.com](https://dsp-portfolio-frontend-805b73a25f1d.herokuapp.com)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Framer Motion, CSS Modules |
| Backend | ASP.NET Core 8, Clean Architecture |
| Database | SQLite (local) / PostgreSQL (production) |
| Hosting | Heroku |
| Email | Gmail SMTP via App Password |

---

## Project Structure

```
Portfolio/
├── portfolio-frontend/     # React + Vite app
│   ├── src/
│   │   ├── components/     # LeftPanel, MobileNav, CustomCursor, MouseSpotlight, MagneticButton, AnimatedCounter
│   │   ├── sections/       # Hero, Services, Projects, Skills, Contact
│   │   ├── hooks/          # useActiveSection, useContactForm
│   │   └── styles/         # globals.css
│   └── server.js           # Express server for Heroku
│
└── portfolio-backend/      # ASP.NET Core 8 Web API
    └── src/
        ├── Portfolio.API/          # Controllers, Program.cs
        ├── Portfolio.Application/  # Use cases, interfaces, DTOs
        ├── Portfolio.Domain/       # Entities
        └── Portfolio.Infrastructure/ # EF Core, SMTP email sender
```

---

## Features

- Split-screen sticky layout (40% left panel / 60% scrollable right)
- Mouse spotlight radial gradient effect
- Custom cursor with spring physics
- Word-reveal animations on hero tagline
- 3D card tilt on project cards
- Magnetic buttons with spring physics
- Animated counters in bento grid stats
- Glassmorphism cards
- Responsive with hamburger mobile nav
- Contact form with PostgreSQL persistence + email notifications

---

## Local Development

### Prerequisites
- Node.js 18+
- .NET 8 SDK

### Frontend

```bash
cd portfolio-frontend
npm install
npm run dev
# Runs at http://localhost:3000
```

### Backend

```bash
cd portfolio-backend/src/Portfolio.API
dotnet run
# Runs at https://localhost:64174
# SQLite database auto-created as portfolio_local.db
```

The frontend `.env` file points to the local backend:
```
VITE_API_BASE_URL=https://localhost:64174
```

---

## Deployment (Heroku)

The apps are deployed as two separate Heroku dynos from this monorepo using `git subtree`.

```bash
# Deploy frontend
git subtree push --prefix portfolio-frontend heroku-frontend master

# Deploy backend
git subtree push --prefix portfolio-backend heroku-backend master
```

### Required Heroku Config Vars (backend)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Set automatically by Heroku Postgres add-on |
| `EmailSettings__Password` | Gmail App Password for SMTP |
| `EmailSettings__UseSsl` | Set to `true` |

---

## Contact

**Darshi Sai Pranay** — .NET Full Stack Developer
📧 darshisaipranay@gmail.com
🔗 [LinkedIn](https://linkedin.com/in/darshisaipranay) · [GitHub](https://github.com/pranaydarshi)
