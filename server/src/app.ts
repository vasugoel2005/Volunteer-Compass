import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import { apiLimiter } from './middleware/rateLimiter';

const app: Application = express();

// ─── Security Middleware ─────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ─── Request Parsing ─────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Logging ─────────────────────────────────────────
if (env.isDevelopment) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ─── Rate Limiting ────────────────────────────────────
app.use('/api', apiLimiter);

// ─── Health Check ────────────────────────────────────
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Volunteer Compass API is running',
    environment: env.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes (register here as you build features) ─
import authRoutes from './routes/auth.routes';
app.use('/api/auth',    authRoutes);
// app.use('/api/users',   userRoutes);
// app.use('/api/events',  eventRoutes);
// app.use('/api/rsvps',   rsvpRoutes);
// app.use('/api/matches', matchingRoutes);
// app.use('/api/dashboard', dashboardRoutes);

// ─── 404 Handler ─────────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// ─── Global Error Handler ─────────────────────────────
app.use(errorHandler);

export default app;
