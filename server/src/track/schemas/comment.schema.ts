// Схема БД для комментариев к трекам
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Track } from './track.schema';
import * as mongoose from 'mongoose';

export type CommentDocument = Comment & Document;

// Значения таблицы в БД
@Schema()
export class Comment {
  @Prop()
  username: string;

  @Prop()
  text: string;

  //Указание к какому треку пренадлежит комментарий
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Track' })
  track: Track;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
