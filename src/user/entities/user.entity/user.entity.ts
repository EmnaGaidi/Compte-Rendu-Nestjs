import { TimeEntities } from '../../../Generics/time.entities';
import { CvEntity } from '../../../cv/entities/cv.entity/cv.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity extends TimeEntities {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany((type) => CvEntity, (cv) => cv.user)
  cvs: CvEntity[];
}
