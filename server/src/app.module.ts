//Модуль связывающий контроллеры и сервисы с экземпляром приложения (main.ts)
import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  //Здесь зарегестрированы все модули ниже по иерархии. Модуль MongooseModule нужен для подключения к БД
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/music-platform'),
    TrackModule,
    FileModule,
  ],
})

//Экспортируем класс
export class AppModule {}
