import Redis from 'ioredis';
import { env } from './env';

const redis = new Redis({
  host: env.redis.host,
  port: env.redis.port,
  password: env.redis.password,
  retryStrategy: (times: number) => {
    // Retry with exponential backoff, max 30s
    const delay = Math.min(times * 500, 30000);
    return delay;
  },
  maxRetriesPerRequest: 3,
  lazyConnect: true,
});

redis.on('connect', () => {
  console.log('✅ Redis connected');
});

redis.on('error', (err: Error) => {
  console.error('❌ Redis error:', err.message);
});

redis.on('reconnecting', () => {
  console.warn('⚠️  Redis reconnecting...');
});

export default redis;
