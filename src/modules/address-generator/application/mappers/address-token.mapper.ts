import { AddressToken } from '../../domain/entities/address-token.entity';
import { GenerateAddressOutput } from '../dto/generate-address.output';

export class AddressTokenMapper {
  static toOutput(token: AddressToken): GenerateAddressOutput {
    return {
      tokenId: token.id.toString(),
      namespace: token.namespace.toString(),
      generatedAddress: token.generatedAddress,
      controlCode: token.issuanceContext.controlCode,
      createdAt: token.createdAt,
      expiresAt: token.expiration.getExpiresAt(),
      status: token.status,
    };
  }

  static toSafeMetadata(token: AddressToken): Record<string, unknown> {
    return {
      tokenId: token.id.toString(),
      namespace: token.namespace.toString(),
      controlCode: token.issuanceContext.controlCode,
      purpose: token.issuanceContext.purpose,
      createdAt: token.createdAt,
      expiresAt: token.expiration.getExpiresAt(),
      status: token.status,
    };
  }
}
