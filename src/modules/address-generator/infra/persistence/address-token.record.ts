import { AddressTokenStatus } from '../../domain/entities/address-token.entity';

export interface AddressTokenRecord {
  id: string;
  namespace: string;
  purpose: string;
  control_code: string;
  issued_at_epoch: number;
  generated_address: string;
  created_at: number;
  expires_at: number;
  ttl_ms: number;
  status: AddressTokenStatus;
}
