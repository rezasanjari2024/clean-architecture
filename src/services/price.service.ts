// price.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { NobitexService } from './nobitex.service';

@WebSocketGateway({ cors: true })
@Injectable()
export class PriceGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly nobitex: NobitexService) {}

  afterInit() {
    this.nobitex.onPriceUpdate((price) => {
      this.server.emit('price', { price });
    });
  }
}
