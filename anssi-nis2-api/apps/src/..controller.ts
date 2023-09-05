import { Controller, Get } from '@nestjs/common';
import { Service } from './..service';

@Controller()
export class Controller {
  constructor(private readonly Service: Service) {}

  @Get()
  getHello(): string {
    return this.Service.getHello();
  }
}
