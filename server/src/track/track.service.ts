// Логика для треков
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { query } from 'express';
import { Model, ObjectId } from 'mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { Track, TrackDocument } from './schemas/track.schema';

@Injectable()
export class TrackService {
  //Используем схемы БД внутри сервиса
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService,
  ) {}

  //Создание трека
  //Первый аргумент - описиние полей функции, необходимых для создания трека. Их получаем с клиента. Так как функция async, возвращаем Promise, в который оборачиваем Track, создаваемый на выходе функции
  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    // tarckModel - модель БД для треков
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });
    return track;
  }

  //Получение всех треков
  //Возвращает массив треков
  //count - количество треков на странице
  async getAll(count = 10, offset = 0): Promise<Track[]> {
    //Возавращаем все записи из БД с ограничением по пагинации
    const tracks = await this.trackModel
      .find()
      .skip(Number(offset))
      .limit(Number(count));
    return tracks;
  }

  //Получение конкретного тера по ID
  //ID записи в Mongo DB имеют тип ObjectId
  async getOne(id: ObjectId): Promise<Track> {
    //Возавращаем конкретную запись
    const track = await (
      await this.trackModel.findById(id)
    )
      //Функция populate подтягивает массив комментариев, а не просто id
      .populate('comments');
    return track;
  }

  //Удаление трека из БД
  async delete(id: ObjectId): Promise<ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);
    //Возвращаем id вернувшегося нам трека
    return track._id;
  }

  //Добавление комментариев
  async addComment(dto: CreateCommentDto): Promise<Comment> {
    //Получаем трек для последующего добаления комментария в массив комментариев в таблице
    const track = await this.trackModel.findById(dto.trackId);
    //Создаём комментарий
    const comment = await this.commentModel.create({ ...dto });
    //Добавляем новый комментарий в массив
    track.comments.push(comment._id);
    //Сохраняем изменения
    await track.save();
    //Возвращаем комментарий
    return comment;
  }

  //Увеличение количества прослушиваний
  async listen(id: ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    track.save();
  }

  //Поиск по трекам
  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') }, //Здесь мы создаём регулярное выражение, куда помещаем поисковый запро, флаг i - нечевствительность к регистру
    });
    return tracks;
  }
}
