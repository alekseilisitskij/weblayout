import filter from './object-array-filter';

describe('фильтр массива объектов по значению свойства', () => {
  it('фильтр работает корректно', () => {
    const array = [
      { id: 1, name: 'Name 1' },
      { id: 2, name: 'Name 2' },
      { id: 3, name: 'Name 3' },
      { id: 22, name: 'Name 2' },
    ];
    const expected = [array[1], array[3]];
    const filtered = filter(array, 'name', 'Name 2');
    expect(Array.isArray(filtered)).toBe(true);
    expect(filtered.length === expected.length).toBe(true);
    for (const i in filtered) {
      expect(expected[i] === filtered[i]).toBe(true);
    }
  });
});
