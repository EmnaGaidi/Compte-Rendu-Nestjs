import { Injectable, NotFoundException } from '@nestjs/common';
import { CvEntity } from './entities/cv.entity/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  randAddress,
  randDirectoryPath,
  randFirstName,
  randJobTitle,
  randLastName,
  randNumber,
} from '@ngneat/falso';
import { AddCvDto } from '../dto/AddCvDto';
import { UpdateCvDto } from 'src/dto/updateCvDto';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvEntity)
    private cvRepository: Repository<CvEntity>,
  ) {}
  //async GenererDonnéesFictives(): Promise<AddCvDto> {
  //const name = randLastName();
  //const firstname = randFirstName();
  //const age = randNumber();
  //const cin = randNumber();
  //const job = randJobTitle();
  //const path = randDirectoryPath();
  //const cv = new AddCvDto(name, firstname, age, path, cin, job);
  //return this.cvRepository.save(cv);
  //}
  async add(cv: AddCvDto) {
    return await this.cvRepository.save(cv);
  }
  async findall(): Promise<CvEntity[]> {
    return await this.cvRepository.find();
  }
  async getAll(): Promise<CvEntity[]> {
    return await this.cvRepository.find();
  }
  async addCv(cv: AddCvDto): Promise<CvEntity> {
    return await this.cvRepository.save(cv);
  }
  async findCvById(id: number): Promise<CvEntity> {
    const cv = await this.cvRepository.findOneById(id);
    if (!cv) {
      throw new NotFoundException('aucun cv porte cet id');
    }
    return cv;
  }
  async updateCv(id: number, cv: UpdateCvDto): Promise<CvEntity> {
    //On récupère le cv d'id id et ensuite on replace les anciennes valeurs de ce cv par ceux du cv passé en paramètre
    const newCv = await this.cvRepository.preload({
      id,
      ...cv,
    });
    // tester le cas ou le cv d'id id n'existe pas
    if (!newCv) {
      throw new NotFoundException(`Le Cv d'id ${id} n'existe pas`);
    }
    // on sauvgarde la nouvelle entité donc le nouveau cv
    return await this.cvRepository.save(newCv);
  }
  async delete(id: number) {
    return this.cvRepository.delete(id);
  }
}
