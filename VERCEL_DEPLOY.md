# Vercel Deployment Instructions

To deploy the **Do App** to Vercel as a single project, follow these steps:

### 1. Push Changes
Ensure you have pushed the latest changes (including the new `package.json` and updated `vercel.json`) to your GitHub/GitLab/Bitbucket repository.

### 2. Create a New Project on Vercel
1. Go to the [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New** > **Project**.
3. Import your repository.

### 3. Configure Project Settings
In the **Configure Project** screen:

- **Framework Preset:** Select **Other** (it will use our root `package.json`).
- **Root Directory:** Keep as `.` (the default).
- **Build and Output Settings:**
    - **Build Command:** `npm run build`
    - **Output Directory:** `frontend/dist`
    - **Install Command:** `npm install`
- **Environment Variables:** Add the following:
    - `DATABASE_URL`: Your PostgreSQL connection string (e.g., from Supabase or Neon).
    - `JWT_SECRET`: A long, secure string for signing tokens.
    - `NODE_ENV`: Set to `production`.

### 4. Deploy
Click **Deploy**. Vercel will:
1. Run the root `build` script.
2. Build the backend Prisma client.
3. Build the frontend Vite app.
4. Serve the frontend static files from `frontend/dist`.
5. Route any `/api/*` requests to the backend Express serverless function.

### Troubleshooting
- **Database Connection:** Ensure your PostgreSQL provider allows connections from Vercel's IP addresses (or allows all IPs if using a serverless DB).
- **Prisma:** If you get a "Prisma Client not found" error, ensure `npx prisma generate` was successful during the build.
