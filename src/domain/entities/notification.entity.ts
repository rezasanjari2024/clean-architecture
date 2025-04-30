export class Notification {
  constructor(
    public id: number,
    public title: string,
    public message: string,
    public createdAt: Date = new Date(),
  ) {}
}
