# Do App - Task Management

A high-performance, PWA-enabled task management application built for the Leap Software Development assignment.

## Tech Stack Used
- **Frontend:** React 19, TypeScript, Vite, Vanilla CSS.
- **State Management:** React Context API.
- **Icons:** Lucide React.
- **Calendar:** React Calendar.
- **Backend:** Node.js, Express, TypeScript.
- **Database:** PostgreSQL with Prisma ORM.
- **Authentication:** JWT (JSON Web Tokens) with Bcrypt hashing.
- **PWA:** `vite-plugin-pwa`.
- **Deployment:** Vercel (Frontend) & Any Node.js host/Vercel (Backend).

## Setup Instructions

### Backend
1. Navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`
3. Configure your `.env` file with `DATABASE_URL` and `JWT_SECRET`.
4. Run Prisma migrations: `npx prisma migrate dev`
5. Start the server: `npm run dev`

### Frontend
1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Build for production: `npm run build`

## Key Features/Points of Innovation
1. **Due Soon Priority:** Tasks are automatically sorted by deadline to ensure you never miss a due date.
2. **Hybrid View:** Seamlessly toggle between a card-style list view and a visual calendar view.
3. **Category Filtering:** Quickly switch between "Work" and "Private" tasks to stay focused.
4. **PWA & Offline Ready:** Optimized for speed and works even without an internet connection.
5. **Zero-Friction Auth:** Simple and secure registration/login process.
6. **Surgical UI:** Built with Vanilla CSS for maximum performance and a clean, modern aesthetic.
