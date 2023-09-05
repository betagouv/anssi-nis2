import { Injectable } from '@nestjs/common';

@Injectable()
export class Service {
  getHello(): string {
    return 'Hello World!';
  }
}
