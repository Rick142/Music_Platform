//Логика внутри папки file нужна для записи на диск аудио и обложни трека
import { Module } from '@nestjs/common';
import { FileService } from './file.service';

@Module({
  providers: [FileService],
})
export class FileModule {}
