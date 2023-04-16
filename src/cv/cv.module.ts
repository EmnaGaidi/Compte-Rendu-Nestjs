import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvEntity } from './entities/cv.entity/cv.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CvEntity])],
  providers: [CvService],
  controllers: [CvController],
})
export class CvModule {}
