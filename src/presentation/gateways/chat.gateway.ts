// gateways/chat.gateway.ts

import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface Message {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private users = new Map<string, string>(); // userId -> socket.id

  afterInit() {
    console.log('🚀 Gateway initialized');
  }

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.users.set(userId, client.id);
      console.log(`🟢 User ${userId} connected`);
    }
  }

  handleDisconnect(client: Socket) {
    const disconnectedUser = [...this.users.entries()].find(
      ([_, socketId]) => socketId === client.id,
    );
    if (disconnectedUser) {
      this.users.delete(disconnectedUser[0]);
      console.log(`🔴 User ${disconnectedUser[0]} disconnected`);
    }
  }

  @SubscribeMessage('send_message')
  handleMessage(client: Socket, msg: Message) {
    const receiverSocketId = this.users.get(msg.receiverId);
    if (receiverSocketId) {
      this.server.to(receiverSocketId).emit('new_message', msg);
    }

    // همچنین برای فرستنده خودش هم بفرسته (در صورت نیاز)
    client.emit('new_message', msg);
  }
}
