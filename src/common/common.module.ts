import { Global, Module } from '@nestjs/common';
import { uuid } from 'uuidv4';

const uuidProvider = {
  useValue: uuid,
  provide: 'UUID',
};
@Global()
@Module({
  providers: [uuidProvider],
  exports: [uuidProvider],
})
export class CommonModule {}
