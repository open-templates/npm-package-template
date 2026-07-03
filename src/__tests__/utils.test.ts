import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { isProduction } from '../utils.js';

describe('utils', () => {
  describe('isProduction', () => {
    const originalEnv = process.env;

    beforeEach(() => {
      process.env = { ...originalEnv };
    });

    afterAll(() => {
      process.env = originalEnv;
    });

    it('returns true when NODE_ENV is production', () => {
      process.env.NODE_ENV = 'production';
      expect(isProduction()).toBe(true);
    });

    it('returns false when NODE_ENV is development', () => {
      process.env.NODE_ENV = 'development';
      expect(isProduction()).toBe(false);
    });

    it('returns false when NODE_ENV is not set', () => {
      delete process.env.NODE_ENV;
      expect(isProduction()).toBe(false);
    });
  });
});
