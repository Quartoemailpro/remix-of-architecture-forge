import { v4 as uuidv4 } from 'uuid';
import { UuidPort } from '../../shared/application/ports/uuid.port.js';

export class UuidGenerator implements UuidPort {
  generate(): string { return uuidv4(); }
}
