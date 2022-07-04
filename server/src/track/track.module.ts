// Трек модуль
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './schemas/comment.schema';
import { Track, TrackSchema } from './schemas/track.schema';
import { Comment } from './schemas/comment.schema';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [
    //Импорт схем БД
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [TrackController],
  providers: [TrackService, FileService],
})
export class TrackModule {}
