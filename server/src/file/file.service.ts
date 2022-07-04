import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path'; //Модуль для работы с путями
import * as fs from 'fs'; //Модуль для работы с файловой системой
import * as uuid from 'uuid';

//Перечисление для типа файлов
export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Injectable()
export class FileService {
  //Запись файла на диск
  createFile(type: FileType, file): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension; //Генерация названи файла
      const filePath = path.resolve(__dirname, '..', 'static', type);
      //Проверяем существование папки по такому пути
      if (!fs.existsSync(filePath)) {
        //Если нет, создём её
        fs.mkdirSync(filePath, { recursive: true });
      }
      //Записываем на диск
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //Удаление файла с диска
  removeFile(fileName: string) {}
}
