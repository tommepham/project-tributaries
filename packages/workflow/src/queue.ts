/**
 * BullMQ queue management
 */

import { Queue, Worker, Job, QueueEvents } from 'bullmq';

const redisConnection = {
  host: process.env.REDIS_HOST ?? 'localhost',
  port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
  password: process.env.REDIS_PASSWORD,
};

const queues = new Map<string, Queue>();
const workers = new Map<string, Worker>();

/**
 * Get or create a queue
 */
export function getQueue(name: string): Queue {
  if (!queues.has(name)) {
    queues.set(
      name,
      new Queue(name, {
        connection: redisConnection,
        defaultJobOptions: {
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 1000,
          },
          removeOnComplete: { age: 24 * 3600 }, // Keep for 24 hours
          removeOnFail: { age: 7 * 24 * 3600 }, // Keep failures for 7 days
        },
      })
    );
  }
  return queues.get(name)!;
}

/**
 * Add a job to a queue
 */
export async function addJob<T>(
  queueName: string,
  jobName: string,
  data: T,
  options?: {
    delay?: number;
    priority?: number;
    attempts?: number;
  }
): Promise<Job<T>> {
  const queue = getQueue(queueName);
  return queue.add(jobName, data, options);
}

/**
 * Create a worker for processing jobs
 */
export function createWorker<T, R>(
  queueName: string,
  processor: (job: Job<T>) => Promise<R>,
  options?: {
    concurrency?: number;
    limiter?: { max: number; duration: number };
  }
): Worker<T, R> {
  if (workers.has(queueName)) {
    return workers.get(queueName) as Worker<T, R>;
  }

  const worker = new Worker<T, R>(queueName, processor, {
    connection: redisConnection,
    concurrency: options?.concurrency ?? 5,
    limiter: options?.limiter,
  });

  worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed in queue ${queueName}`);
  });

  worker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} failed in queue ${queueName}:`, err.message);
  });

  workers.set(queueName, worker);
  return worker;
}

/**
 * Get queue events for monitoring
 */
export function getQueueEvents(queueName: string): QueueEvents {
  return new QueueEvents(queueName, { connection: redisConnection });
}

/**
 * Graceful shutdown
 */
export async function closeAll(): Promise<void> {
  await Promise.all([
    ...Array.from(queues.values()).map((q) => q.close()),
    ...Array.from(workers.values()).map((w) => w.close()),
  ]);
  queues.clear();
  workers.clear();
}
