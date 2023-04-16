import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo/entities/todo.entity';
import { ProcessMiddleware } from './middlewares/process/process.middleware';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity/user.entity';
import { CvEntity } from './cv/entities/cv.entity/cv.entity';
import { SkillEntity } from './skill/entities/skill.entity/skill.entity';

@Module({
  imports: [
    TodoModule,
    CommonModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'root',
      password: '',
      database: 'tp2',
      entities: [
        'dist/**/*.entity.ts',
        TodoEntity,
        UserEntity,
        CvEntity,
        SkillEntity,
      ],
      synchronize: true,
    }),
    CvModule,
    SkillModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProcessMiddleware)
      .forRoutes(
        { path: 'todo/add', method: RequestMethod.POST },
        { path: 'todo', method: RequestMethod.DELETE },
        { path: 'todo', method: RequestMethod.PATCH },
      );
  }
}
