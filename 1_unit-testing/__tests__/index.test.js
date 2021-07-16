describe('Object.assign', () => {
  test('возвращает ссылку на исходный обьект', () => {
    const source = {};
    const result = Object.assign(source);
    expect(result).toBe(source);
  });

  test('объединение c одним объектом', () => {
    const source = {};
    const target = { a: 'a', b: 'b' };
    const result = Object.assign(source, target);
    expect(result).toEqual({ a: 'a', b: 'b' });
  });

  test('объединение c несколькими объектами', () => {
    const source = {};
    const targetObject1 = { a: 'a', b: 'b' };
    const targetObject2 = { a: 'c', d: 'd' };
    const result = Object.assign(source, targetObject1, targetObject2);
    expect(result).toEqual({ a: 'c', b: 'b', d: 'd' });
  });

  test('объединение c несколькими объектами c глубокой вложенностью', () => {
    const source = {};
    const targetObject1 = { a: { a1: { a2: 'a2' } }, b: 'b' };
    const targetObject2 = { a: { a1: 'a1' }, d: { d1: 'd1' } };
    const result = Object.assign(source, targetObject1, targetObject2);
    expect(result).toEqual({ a: { a1: 'a1' }, b: 'b', d: { d1: 'd1' } });
  });

  test('не включать в объединение falsy-значения и примитивы', () => {
    const source = {};
    const result = Object.assign(source, undefined, null, 1, 0, Symbol('symbol'), false, true);
    expect(result).toEqual({});
  });

  test('возвращает ошибку с дескриптором writable=false, при попытки изменить свойство объекта', () => {
    const source = {};
    Object.defineProperty(source, 'loggingMethod', {
      value: 'console.log',
      writable: false,
    });
    const target = {
      loggingMethod: 'console.warn',
    };
    const result = () => Object.assign(source, target);
    expect(result).toThrow();
  });

  test('возвращает ошибку при пустых аргументах', () => {
    const result = () => Object.assign();
    expect(result).toThrow();
  });
});
