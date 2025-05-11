import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class PriceGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('📡 Price WebSocket Gateway Initialized');
  }

  sendPrice(price: number) {
    this.server.emit('price', price);
  }
}
