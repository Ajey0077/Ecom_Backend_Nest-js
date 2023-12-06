export const config = {
  PORT: parseInt(process.env.PORT, 10) || 8082,
  DB_NAME: process.env.DB_NAME || 'db123_hsq6',
  DB_PASSWORD: process.env.DB_PASSWORD || 'YV18sSxN6hYrBgn7OfotZdEcyaEyYx98',
  DB_HOST:
    process.env.DB_HOST ||
    'dpg-clnf790apebc739nnpq0-a.oregon-postgres.render.com',
  DB_USER: process.env.DB_USER || 'com211',
  DB_PORT: parseInt(process.env.DB_PORT, 10) || 5432,
  DB_SYNCHRONIZE: process.env.DB_SYNCHRONIZE === 'true' || true,
  DB_LOGGING: process.env.DB_LOGGING === 'true' || true,
};
