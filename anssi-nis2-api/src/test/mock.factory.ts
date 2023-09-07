import { MockType } from '../simulateur-reponse/simulateur-reponse.controller.spec';

export class MockFactory {
  static getMock<T>(
    type: new (...args: any[]) => T,
    includes?: string[],
  ): MockType<T> {
    const mock: MockType<T> = {};

    Object.getOwnPropertyNames(type.prototype)
      .filter(
        (key: string) =>
          key !== 'constructor' && (!includes || includes.includes(key)),
      )
      .map((key: string) => {
        mock[key] = jest.fn();
      });

    return mock;
  }
}
