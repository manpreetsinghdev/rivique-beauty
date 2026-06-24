import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
  port:        parseInt(process.env.PORT ?? "4000", 10),
  nodeEnv:     process.env.NODE_ENV ?? "development",
  corsOrigin:  process.env.CORS_ORIGIN ?? "http://localhost:3000",
  jwtSecret:   process.env.JWT_SECRET ?? "change-me-in-production",
  db: {
    host:     process.env.DB_HOST     ?? "localhost",
    port:     parseInt(process.env.DB_PORT ?? "5432", 10),
    username: process.env.DB_USERNAME ?? "postgres",
    password: process.env.DB_PASSWORD ?? "postgres",
    database: process.env.DB_NAME     ?? "rivique",
  },
}));
