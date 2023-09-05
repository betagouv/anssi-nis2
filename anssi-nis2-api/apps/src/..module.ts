import { Module } from '@nestjs/common';
import { Controller } from './..controller';
import { Service } from './..service';

@Module({
  imports: [],
  controllers: [Controller],
  providers: [Service],
})
export class Module {}
