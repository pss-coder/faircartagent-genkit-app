import { resolve } from 'path';
import dotenv from 'dotenv';
import { existsSync } from 'fs';

interface Config {
  port: number;
  env: string;
}

// Determine Environment
const env = process.env.NODE_ENV || 'development';
const envFile = env === 'production' ? '.env.prod' : '.env.dev';
const envPath = resolve(__dirname, '../..', envFile);

// Load environment variables
if (existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log(`Loaded environment from ${envFile}`);
} else {
  console.warn(`Environment file "${envFile}" not found at path ${envPath}`);
}

const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  env: env,
};

export default config;
