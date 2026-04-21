const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const configs = require('./configs/configs');
const { connectDb, checkDBConnection, disConnectDB } = require('./models/db');
const apiResponse = require('./utils/apiResponse');
const responseMessages = require('./constants/messages');
const mainRouter = require('./routes/index.route');
const loggerMiddleware = require('./middlewares/logger.middleware');
const rateLimiter = require('./utils/rateLimit');
dotenv.config();

global.lang = 'en';

const app = express();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(rateLimiter);

// morgan.token('body', (req) => JSON.stringify(req.body));
// morgan.token('params', (req) => JSON.stringify(req.params));
// morgan.token('query', (req) => JSON.stringify(req.query));
// app.use(
// 	morgan(
// 		':method :url :status :response-time ms | body: :body | params: :params | query: :query'
// 	)
// );

connectDb();

app.use(loggerMiddleware);

app.get('/', (_request, response) => {
  return apiResponse.success(
    response,
    responseMessages[global.lang].WELCOME_API_MESSAGE,
  );
});

app.get('/health', (_request, response) => {
  try {
    const isDbConnected = checkDBConnection();

    const healthStatus = {
      status: isDbConnected ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: configs.ENVIRONMENT,
      database: isDbConnected ? 'connected' : 'disconnected',
    };

    return apiResponse.success(
      response,
      responseMessages[global.lang].HEALTH_CHECK_SUCCESS,
      healthStatus,
    );
  } catch (error) {
    apiResponse.internalServerError(
      response,
      responseMessages[global.lang].DB_ERROR,
      { timestamp: new Date().toISOString() },
    );
  }
});

app.use('/api', mainRouter);

const PORT = configs.PORT;
const server = app.listen(PORT, () => {
  console.log(responseMessages[global.lang].SERVER_STARTED(PORT));
});

// Graceful shutdown handler
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);

  // Close server to stop accepting new connections
  if (server) {
    server.close(async () => {
      console.log('HTTP server closed');

      try {
        // Close database connection
        const isDbConnected = await checkDBConnection();

        if (isDbConnected) {
          await disConnectDB();
        }

        console.log('Graceful shutdown completed');
        process.exit(0);
      } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
      }
    });

    // Force shutdown after 10 seconds
    setTimeout(() => {
      console.error('Forced shutdown due to timeout');
      process.exit(1);
    }, 10000);
  } else {
    process.exit(0);
  }
};

// Handle SIGTERM (production environments, Docker, Kubernetes)
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Handle SIGINT (Ctrl+C in terminal)
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('UNHANDLED_REJECTION');
});
