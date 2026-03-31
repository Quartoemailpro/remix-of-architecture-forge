import { InMemoryEventBus } from '../infra/events/in-memory-event-bus.js';
import { PinoLogger } from '../infra/logging/logger.js';
import { SystemClock } from '../infra/time/system-clock.js';
import { UuidGenerator } from '../infra/id/uuid-generator.js';
import { JobRunner } from '../infra/queue/job-runner.js';
import { JobDispatcher } from '../infra/queue/job-dispatcher.js';
import { PgTransactionManager } from '../infra/db/transaction-manager.js';
import { RedisIdempotencyStore } from '../infra/cache/idempotency-store.js';
import { HashService } from '../infra/crypto/hash-service.js';
import { TokenService } from '../infra/crypto/token-service.js';
import { EventBusPort } from '../shared/application/ports/event-bus.port.js';
import { LoggerPort } from '../shared/application/ports/logger.port.js';
import { ClockPort } from '../shared/application/ports/clock.port.js';
import { UuidPort } from '../shared/application/ports/uuid.port.js';

export interface AppContext {
  eventBus: EventBusPort;
  logger: LoggerPort;
  clock: ClockPort;
  uuid: UuidPort;
  jobRunner: JobRunner;
  jobDispatcher: JobDispatcher;
  transactionManager: PgTransactionManager;
  idempotencyStore: RedisIdempotencyStore;
  hashService: HashService;
  tokenService: TokenService;
}

export function buildAppContext(): AppContext {
  const eventBus = new InMemoryEventBus();
  const logger = new PinoLogger('app');
  const clock = new SystemClock();
  const uuid = new UuidGenerator();
  const jobRunner = new JobRunner();
  const jobDispatcher = new JobDispatcher(jobRunner);
  const transactionManager = new PgTransactionManager();
  const idempotencyStore = new RedisIdempotencyStore();
  const hashService = new HashService();
  const tokenService = new TokenService();

  return {
    eventBus,
    logger,
    clock,
    uuid,
    jobRunner,
    jobDispatcher,
    transactionManager,
    idempotencyStore,
    hashService,
    tokenService,
  };
}
