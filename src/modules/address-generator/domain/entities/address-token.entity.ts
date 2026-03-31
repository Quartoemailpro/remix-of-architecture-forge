import { AddressTokenId } from '../value-objects/address-token-id';
import { Namespace } from '../value-objects/namespace';
import { IssuanceContext } from '../value-objects/issuance-context';
import { AddressExpiration } from '../value-objects/address-expiration';

export type AddressTokenStatus = 'active' | 'expired' | 'revoked';

export interface AddressTokenProps {
  id: AddressTokenId;
  namespace: Namespace;
  issuanceContext: IssuanceContext;
  generatedAddress: string;
  createdAt: number;
  expiration: AddressExpiration;
  status: AddressTokenStatus;
}

export class AddressToken {
  private _id: AddressTokenId;
  private _namespace: Namespace;
  private _issuanceContext: IssuanceContext;
  private _generatedAddress: string;
  private _createdAt: number;
  private _expiration: AddressExpiration;
  private _status: AddressTokenStatus;

  private constructor(props: AddressTokenProps) {
    this._id = props.id;
    this._namespace = props.namespace;
    this._issuanceContext = props.issuanceContext;
    this._generatedAddress = props.generatedAddress;
    this._createdAt = props.createdAt;
    this._expiration = props.expiration;
    this._status = props.status;
  }

  static create(props: Omit<AddressTokenProps, 'status' | 'createdAt'> & { createdAt?: number }): AddressToken {
    const token = new AddressToken({
      ...props,
      createdAt: props.createdAt ?? Date.now(),
      status: 'active',
    });
    token.validateState();
    return token;
  }

  static reconstitute(props: AddressTokenProps): AddressToken {
    return new AddressToken(props);
  }

  get id(): AddressTokenId { return this._id; }
  get namespace(): Namespace { return this._namespace; }
  get issuanceContext(): IssuanceContext { return this._issuanceContext; }
  get generatedAddress(): string { return this._generatedAddress; }
  get createdAt(): number { return this._createdAt; }
  get expiration(): AddressExpiration { return this._expiration; }
  get status(): AddressTokenStatus { return this._status; }

  revoke(): void {
    if (this._status === 'revoked') {
      throw new Error('Address token is already revoked.');
    }
    this._status = 'revoked';
  }

  isExpired(now: number = Date.now()): boolean {
    if (this._status === 'revoked') return true;
    if (this._expiration.isExpired(now)) {
      this._status = 'expired';
      return true;
    }
    return false;
  }

  isUsable(now: number = Date.now()): boolean {
    return this._status === 'active' && !this._expiration.isExpired(now);
  }

  validateState(): void {
    if (!this._id) throw new Error('AddressToken must have an id.');
    if (!this._namespace) throw new Error('AddressToken must have a namespace.');
    if (!this._issuanceContext) throw new Error('AddressToken must have an issuance context.');
    if (!this._generatedAddress) throw new Error('AddressToken must have a generated address.');
    if (!this._expiration) throw new Error('AddressToken must have an expiration.');
  }
}
