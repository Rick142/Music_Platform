// DTO (data transfer object) - класс, описывающий поля, которые ожидаются на входе в конкретную функцию
//Опись полей, необходимых для написания комментария. Эти поля получаем из тела запроса (те с клиента)
import { ObjectId } from 'mongoose';

export class CreateCommentDto {
  readonly username: string;
  readonly text: string;
  //Id трека, к которому оставлен комментарий
  readonly trackId: ObjectId;
}
