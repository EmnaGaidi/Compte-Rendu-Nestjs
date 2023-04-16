import { TimeEntities } from '../../../Generics/time.entities';
import { SkillEntity } from '../../../skill/entities/skill.entity/skill.entity';
import { UserEntity } from '../../../user/entities/user.entity/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cv')
export class CvEntity extends TimeEntities {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  firstname: string;
  @Column()
  age: number;
  @Column()
  cin: number;
  @Column()
  job: string;
  @Column()
  path: string;
  @ManyToOne((type) => UserEntity, (user) => user.cvs)
  user: UserEntity;
  @ManyToMany((type) => SkillEntity, (skill) => skill.cvs, { eager: true })
  @JoinTable({
    name: 'cv_skills',
    joinColumn: {
      name: 'cv',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'skill', // nom du champ représentant l’entité en relation avec cet entité
      referencedColumnName: 'id',
    },
  })
  skills: SkillEntity[];
}
