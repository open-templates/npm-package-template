import { describe, expect, it } from 'vitest';
import { asyncGreet, ExampleClass, greet } from '../index.js';

describe('Package Main Functions', () => {
  describe('greet', () => {
    it('returns a greeting message', () => {
      const result = greet('World');
      expect(result).toBe('Hello, World! This is your npm package template.');
    });

    it('handles empty string', () => {
      const result = greet('');
      expect(result).toBe('Hello, ! This is your npm package template.');
    });
  });

  describe('asyncGreet', () => {
    it('returns a greeting message asynchronously', async () => {
      const result = await asyncGreet('Async World');
      expect(result).toBe('Hello async, Async World!');
    });

    it('resolves within reasonable time', async () => {
      const start = Date.now();
      await asyncGreet('Test');
      const end = Date.now();
      expect(end - start).toBeLessThan(200);
    });
  });

  describe('ExampleClass', () => {
    it('initializes with a value', () => {
      const instance = new ExampleClass('test');
      expect(instance.getValue()).toBe('test');
    });

    it('updates value correctly', () => {
      const instance = new ExampleClass('initial');
      instance.setValue('updated');
      expect(instance.getValue()).toBe('updated');
    });
  });
});
