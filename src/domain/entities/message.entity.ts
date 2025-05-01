export class Message {
  constructor(
    public readonly id: string,
    public readonly fromUserId: string,
    public readonly toUserId: string,
    public readonly content: string,
    public readonly timestamp: Date,
  ) {}
}
