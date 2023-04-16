import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}
  // @Get()
  //async addCvAvecDonnéesFictives() {
  //return await this.service.addUserParDonnéesFictives();
  //}
}
