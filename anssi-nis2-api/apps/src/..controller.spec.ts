import { Test, TestingModule } from '@nestjs/testing';
import { Controller } from './..controller';
import { Service } from './..service';

describe('Controller', () => {
  let Controller: Controller;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [Controller],
      providers: [Service],
    }).compile();

    Controller = app.get<Controller>(Controller);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(Controller.getHello()).toBe('Hello World!');
    });
  });
});
