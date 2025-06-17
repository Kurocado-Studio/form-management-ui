import { describe, expect, it } from 'vitest';

function sum(a: number, b: number): number {
  return a + b;
}

describe('sum function', () => {
  it('should add two numbers correctly', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
