/* eslint-disable prettier/prettier */
import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class Errors {
  public descriptionError(description: string) {
    if (description == null || description.length < 10) {
      throw new BadRequestException(
        'la description est obligatoire et doit avoir au moins 10 caractères ',
      );
    }
  }
  public nameError(name: string) {
    if (name == null || name.length < 3 || name.length > 10) {
      throw new BadRequestException(
        'le nom est obligatoire et doit avoir entre 3 et 10 caractères ',
      );
    }
  }
}
