// Схема БД для треков
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type TrackDocument = Track & Document;

// Значения таблицы в БД
@Schema()
export class Track {
  @Prop()
  name: string;

  @Prop()
  artist: string;

  @Prop()
  text: string;

  @Prop()
  listens: number;

  @Prop()
  picture: string;

  @Prop()
  audio: string;

  // Массив с комментариями
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] }) // В массиве мы храним ссылки на комментарии
  //ref - ссылка на схему Comment
  comments: Comment[]; // Массив типа Comment
}

export const TrackSchema = SchemaFactory.createForClass(Track);
