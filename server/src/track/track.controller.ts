import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { query } from 'express';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';

@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}
  //Создание трека
  @Post()
  //Декоратор для подгрузки для файлов (аудио и обложки трека). Используется библиотека multer
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  //@UploadedFiles - подгруженные файлы (аудио и картинка)
  create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
    //Dto получаем из тела запроса, помечен нотацией @Body
    //files - наши аудио и картинка
    const { picture, audio } = files;
    return this.trackService.create(dto, picture[0], audio[0]);
  }
  //Получение всех треков
  //Здесь же пагинация на получение всех треков через Query
  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.trackService.getAll(count, offset);
  }

  //Поиск по трекам
  @Get('/search')
  search(@Query('query') query: string) {
    return this.trackService.search(query);
  }

  //Получение трека по ID
  //ID получаем из строки запроса, а именно из параметра
  @Get(':id')
  //По названию через декоратор @Param получаем id
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id);
  }

  //Удаление трека
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.trackService.delete(id);
  }

  //Добавление комментария
  @Post('/comment')
  addComment(@Body() dto: CreateCommentDto) {
    return this.trackService.addComment(dto);
  }

  //Увеличение количества прослушиваний
  @Post('/listen/:id')
  listen(@Param('id') id: ObjectId) {
    return this.trackService.listen(id);
  }
}
