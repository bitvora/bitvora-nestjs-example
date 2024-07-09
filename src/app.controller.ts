import { Body, Controller, Get, Post, Req, Request } from '@nestjs/common';
import { BitvoraClient } from 'bitvora';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('bitvora-webhook')
  handleBitvoraWebhook(@Body() body: any, @Req() req: any): string {
    let signature = req.headers['bitvora-signature'];
    let bitvora = new BitvoraClient('api_key', 'signet');
    let stringBody = JSON.stringify(body);
    console.log(stringBody);
    if (
      !bitvora.validateWebhookSignature(
        stringBody,
        signature,
        '8a83fed4f7c7fed7e57f7c2fe6fa5e9dfd38dfab56b3498dc76e8d43241daa5c',
      )
    ) {
      console.log('Invalid signature');
    } else {
      console.log('Valid signature');
    }
    console.log('Received webhook', body);
    console.log('Signature', signature);
    return this.appService.handleBitvoraWebhook(body);
  }
}
