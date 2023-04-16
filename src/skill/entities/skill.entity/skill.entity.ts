import { TimeEntities } from '../../../Generics/time.entities';
import { CvEntity } from '../../../cv/entities/cv.entity/cv.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('skill')
export class SkillEntity extends TimeEntities {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  designation: string;
  @ManyToMany((type) => CvEntity, (cvs) => cvs.skills)
  cvs: CvEntity[];
}
