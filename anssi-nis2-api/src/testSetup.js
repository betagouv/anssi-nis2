const matchers = require("jest-extended");
expect.extend(matchers);

afterEach(() => {
  jest.useRealTimers();
});
