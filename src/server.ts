import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import dotenv from 'dotenv';
import {authRoutes} from './features/auth/auth.routes.js';
import profileRoutes from './features/profiles/profile.routes.js';
import {feedbackRoutes} from './features/feedback/feedback.routes.js';
import {absenceRoutes} from './features/absence/absence.routes.js';
import configRoutes from './features/config/config.routes.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS
app.use(
    cors({
        origin: [
            process.env.FRONTEND_URL ||
                'https://hr-application-frontend-ruby.vercel.app',
            'http://localhost:5173',
        ],
        credentials: false,
    })
);

// Body parsing middleware
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended: true, limit: '10mb'}));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: process.env.npm_package_version || '1.0.0'
    });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/absence', absenceRoutes);
app.use('/api/config', configRoutes);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({error: 'Route not found'});
});

// Error handler
app.use(
    (
        err: Error & {status?: number},
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction
    ) => {
        console.error('Error:', err);
        res.status(err.status || 500).json({
            error: err.message || 'Internal server error',
        });
    }
);

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(
        `📱 Frontend URL: ${
            process.env.FRONTEND_URL || 'http://localhost:5173'
        }`
    );
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    console.log(`🤖 Gemini API: ${process.env.GEMINI_API_KEY ? '✅ Configured' : '❌ Not configured'}`);
});
