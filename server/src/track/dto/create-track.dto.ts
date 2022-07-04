// DTO (data transfer object) - класс, описывающий поля, которые ожидаются на входе в конкретную функцию
//Опись полей, необходимых для создания трека. Эти поля получаем из тела запроса (те с клиента)
export class CreateTrackDto {
  readonly name;
  readonly artist;
  readonly text;
}
