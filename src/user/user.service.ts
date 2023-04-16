import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity/user.entity';
import { Repository } from 'typeorm';
import { randEmail, randFirstName, randPassword } from '@ngneat/falso';
import { AddUserDto } from '../dto/AddUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  //async addUserParDonnéesFictives(): Promise<UserEntity> {
  //const username = randFirstName();
  //const email = randEmail();
  //const password = randPassword();
  //const user = new AddUserDto(username, email, password);
  //return await this.userRepository.save(user);
  //}
  async add(user: AddUserDto): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }
  async findall(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
}
