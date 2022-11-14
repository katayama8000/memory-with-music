import { Test } from './hoge';

describe('Test', () => {
  const TestClass = new Test('hoge', 82);
  it('インスタンスが生成される', () => {
    expect(TestClass).toBeInstanceOf(Test);
  });

  it('年齢が82歳である', () => {
    expect(TestClass._age).toBe(82);
  });
});
