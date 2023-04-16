import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { AddCvDto } from '../dto/AddCvDto';
import { UpdateCvDto } from '../dto/updateCvDto';

@Controller('cv')
export class CvController {
  constructor(private service: CvService) {}
  //@Get()
  //async addCvAvecDonnéesFictives() {
  //return await this.service.GenererDonnéesFictives();
  //}
  @Get('all')
  async getALLCvs() {
    return await this.service.getAll();
  }
  @Post()
  async addCv(@Body() addcv: AddCvDto) {
    return await this.service.addCv(addcv);
  }
  @Get('byid/:id')
  async cvById(@Param('id', ParseIntPipe) id) {
    return await this.service.findCvById(id);
  }
  // eslint-disable-next-line prettier/prettier
  @Patch(':id')
  async updateCv(@Param('id', ParseIntPipe) id, @Body() updatecv: UpdateCvDto) {
    return await this.service.updateCv(id, updatecv);
  }
  @Delete(':id')
  async Delete(@Param('id', ParseIntPipe) id) {
    return await this.service.delete(id);
  }
}
