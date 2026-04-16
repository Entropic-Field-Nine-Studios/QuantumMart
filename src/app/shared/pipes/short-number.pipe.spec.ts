import { ShortNumberPipe } from './short-number.pipe';

describe('ShortNumberPipe', () => {
  let pipe: ShortNumberPipe;

  beforeEach(() => {
    pipe = new ShortNumberPipe();
  });

  it('should return empty string for null or undefined', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });

  it('should return the number as-is when below 1000', () => {
    expect(pipe.transform(999)).toBe('999');
    expect(pipe.transform(42)).toBe('42');
  });

  it('should format thousands with K', () => {
    expect(pipe.transform(1500)).toBe('1.5K');
    expect(pipe.transform(1000)).toBe('1K');
    expect(pipe.transform(12410, 2)).toBe('12.41K');
    expect(pipe.transform(12400, 2)).toBe('12.4K');
  });

  it('should format millions with M', () => {
    expect(pipe.transform(1530000)).toBe('1.5M');
  });

  it('should format billions with B', () => {
    expect(pipe.transform(2000000000)).toBe('2B');
  });

  it('should format trillions with T', () => {
    expect(pipe.transform(9870000000000)).toBe('9.8T');
  });

  it('should handle negative numbers', () => {
    expect(pipe.transform(-1500)).toBe('-1.5K');
  });

  it('should respect custom decimal precision', () => {
    expect(pipe.transform(1530000, 3)).toBe('1.53M');
    expect(pipe.transform(1531000, 3)).toBe('1.531M');
  });
});
