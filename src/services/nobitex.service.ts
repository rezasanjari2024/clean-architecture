// nobitex.service.ts
import { Injectable, Logger } from '@nestjs/common';
import WebSocket from 'ws';

@Injectable()
export class NobitexService {
  private readonly logger = new Logger('NobitexService');
  private ws: WebSocket;
  private listeners: ((price: number) => void)[] = [];

  constructor() {
    this.connect();
  }

  connect() {
    this.ws = new WebSocket('wss://ws.nobitex.ir/v2/orderbook');

    this.ws.on('open', () => {
      this.logger.log('✅ Connected to Nobitex WebSocket');

      this.ws.send(
        JSON.stringify({
          type: 'subscribe',
          channels: [{ name: 'orderbook', instrument: 'usdt-irt' }],
        }),
      );
    });

    this.ws.on('message', (data: string) => {
      try {
        const json = JSON.parse(data);
        const price = json?.orderbook?.asks?.[0]?.price;
        if (price) {
          this.listeners.forEach((cb) => cb(Number(price)));
        }
      } catch (err) {
        this.logger.error('❌ خطا در پردازش پیام', err.message);
      }
    });

    this.ws.on('close', () => {
      this.logger.warn('❗ اتصال بسته شد. تلاش مجدد...');
      setTimeout(() => this.connect(), 3000);
    });

    this.ws.on('error', (err) => {
      this.logger.error('❌ خطای WebSocket:', err.message);
    });
  }

  onPriceUpdate(callback: (price: number) => void) {
    this.listeners.push(callback);
  }
}
