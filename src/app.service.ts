import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  handleBitvoraWebhook(body: any): string {
    console.log('Received webhook', body);
    return 'Received webhook';
  }
}
