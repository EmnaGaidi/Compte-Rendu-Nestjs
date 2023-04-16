/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserService } from '../user/user.service';
import { SkillService } from '../skill/skill.service';
import { CvService } from '../cv/cv.service';
import {
  randDirectoryPath,
  randEmail,
  randFirstName,
  randJobTitle,
  randLastName,
  randNumber,
  randPassword,
  randSkill,
  randUserName,
} from '@ngneat/falso';
import { AddUserDto } from '../dto/AddUserDto';
import { SkillEntity } from '@skill/entities/skill.entity/skill.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService: UserService = app.get(UserService);
  const cvService: CvService = app.get(CvService);
  const skillService: SkillService = app.get(SkillService);
  for (let i = 0; i < 9; i++) {
    const email = randEmail();
    const username = randUserName();
    const password = randPassword();
    const user = new AddUserDto(username, email, password);

    await userService.add(user);

    const skill = {
      designation: randSkill(),
    };
    await skillService.add(skill);
  }
  const users = userService.findall();
  for (const user of await users) {
    const cv = {
      name: randLastName(),
      firstname: randFirstName(),
      age: randNumber({ min: 16, max: 60 }),
      cin: randNumber({ min: 1400000, max: 16000000 }),
      job: randJobTitle(),
      path: randDirectoryPath(),
      user: user,
      skills: [],
    };
    await cvService.add(cv);
  }
  const cvs = await cvService.findall();
  for (const cv of cvs) {
    const index = Math.floor(Math.random() * (21 - 12 + 1)) + 12;
    console.log('index =', index);
    const skill = await skillService.getSkillById(index);
    console.log('skill', skill);
    console.log(cv);
    console.log('cv skills', cv.skills);
    cv.skills.push(skill);
    await cvService.add(cv);
  }
}

bootstrap();
