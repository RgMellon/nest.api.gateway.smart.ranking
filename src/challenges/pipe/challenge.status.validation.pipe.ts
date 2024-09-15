import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ChallengeStatus } from '../challenge.status.enum';

export class ChallengeStatusPipeValidation implements PipeTransform {
  readonly allowedStatus = [
    ChallengeStatus.ACCEPTED,
    ChallengeStatus.DENIED,
    ChallengeStatus.CANCELLED,
  ];

  transform(value: any) {
    const status = value.status.toUpperCase();

    if (!this.isValidStatus(status)) {
      throw new BadRequestException(`${status} é um status inválido`);
    }

    return value;
  }

  private isValidStatus(status: ChallengeStatus): boolean {
    const statusIndex = this.allowedStatus.indexOf(status);

    return statusIndex !== -1;
  }
}
