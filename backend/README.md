# Hackathon Backend (Demo) — Node.js + Express (JS)

Minimal Express backend in plain JavaScript that matches the frontend API contract.

## Run

1. In `backend/` install deps:
   
   ```bash
   npm install
   ```
2. Start dev server (auto-reload):
   
   ```bash
   npm run dev
   ```
3. Or start normally:
   
   ```bash
   npm start
   ```
4. Server listens on `http://localhost:3001` (configurable via `PORT`).
5. Health check: `GET /api/health`
6. Meal plan: `POST /api/GetPlan` with body `{ "UserID": "user123" }`.

## File Descriptions

- `src/index.js`: Express bootstrap, middleware, routes, 404 and error handling.
- `src/config/env.js`: Environment variables with safe defaults (port, CORS origin).
- `src/types/api.js`: JSDoc typedefs for API shapes (`APIMeal`, `GetPlanRequest`, `GetPlanResponse`).
- `src/services/mealPlanService.js`: Mock generator that creates a deterministic plan from a `UserID`.
- `src/controllers/mealPlanController.js`: Validates input and returns the plan.
- `src/routes/index.js`: Router that defines `POST /GetPlan`.
- `src/middleware/errorHandler.js`: Centralized error handler.

## API Contract

- Endpoint: `POST /api/GetPlan`
- Request: `{ "UserID": string }`
- Response:
  ```json
  {
    "morn": { "Name": "...", "Restaurant": "...", "Calorie": 0, "Ingredients": [], "Price": 0, "Purchase_url": "...", "Image_url": "..." },
    "afternoon": { /* APIMeal */ },
    "dinner": { /* APIMeal */ },
    "Alt": [ /* APIMeal[] */ ]
  }
  ```

## Notes

- CORS is permissive for demo (`*`). Tighten for production.
- No database; all data is in-memory mock suitable for a hackathon demo.
- Input validation uses `zod`. Errors return 400 with issues. 