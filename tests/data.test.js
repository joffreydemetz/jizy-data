import jData from '../lib/js/data.js';

let store;

beforeEach(() => {
    store = new jData();
});

describe('set / get', () => {
    test('set stores a value retrievable by get', () => {
        store.set('name', 'alice');
        expect(store.get('name')).toBe('alice');
    });

    test('set overwrites a previous value', () => {
        store.set('k', 1);
        store.set('k', 2);
        expect(store.get('k')).toBe(2);
    });

    test('set returns the instance (chainable)', () => {
        expect(store.set('a', 1)).toBe(store);
        expect(store.set('a', 1).set('b', 2).get('b')).toBe(2);
    });

    test('get on a missing key returns null when no default is supplied', () => {
        expect(store.get('missing')).toBeNull();
    });

    test('get on a missing key returns the supplied default', () => {
        expect(store.get('missing', 'fallback')).toBe('fallback');
    });

    test('get round-trips falsy values that are present', () => {
        store.set('zero', 0);
        store.set('empty', '');
        store.set('flag', false);
        store.set('nil', null);
        expect(store.get('zero')).toBe(0);
        expect(store.get('empty')).toBe('');
        expect(store.get('flag')).toBe(false);
        expect(store.get('nil')).toBeNull();
    });

    test('get round-trips objects and arrays by reference', () => {
        const obj = { nested: { x: 1 } };
        const arr = [1, 2, 3];
        store.set('o', obj);
        store.set('a', arr);
        expect(store.get('o')).toBe(obj);
        expect(store.get('a')).toBe(arr);
    });

    test('falsy default is coerced to null (def || null quirk)', () => {
        expect(store.get('missing', 0)).toBeNull();
        expect(store.get('missing', '')).toBeNull();
        expect(store.get('missing', false)).toBeNull();
    });

    test('truthy default is returned as-is', () => {
        expect(store.get('missing', 'x')).toBe('x');
        expect(store.get('missing', 42)).toBe(42);
        expect(store.get('missing', { a: 1 })).toEqual({ a: 1 });
    });
});

describe('has', () => {
    test('returns false for an unset key', () => {
        expect(store.has('k')).toBe(false);
    });

    test('returns true after a set, even with falsy values', () => {
        store.set('a', 0);
        store.set('b', '');
        store.set('c', false);
        store.set('d', null);
        expect(store.has('a')).toBe(true);
        expect(store.has('b')).toBe(true);
        expect(store.has('c')).toBe(true);
        expect(store.has('d')).toBe(true);
    });

    test('returns false after set(key, undefined) — undefined means absent', () => {
        store.set('k', undefined);
        expect(store.has('k')).toBe(false);
    });

    test('after set(k, undefined), get falls through to the default', () => {
        store.set('k', undefined);
        expect(store.get('k', 'fallback')).toBe('fallback');
        expect(store.get('k')).toBeNull();
    });
});

describe('def', () => {
    test('sets a value when key is absent', () => {
        store.def('k', 'v');
        expect(store.get('k')).toBe('v');
    });

    test('does not overwrite an existing value', () => {
        store.set('k', 'original');
        store.def('k', 'replacement');
        expect(store.get('k')).toBe('original');
    });

    test('does not overwrite a falsy-but-defined value', () => {
        store.set('k', 0);
        store.def('k', 99);
        expect(store.get('k')).toBe(0);
    });

    test('does not overwrite an explicit null', () => {
        store.set('k', null);
        store.def('k', 'replacement');
        expect(store.get('k')).toBeNull();
    });

    test('overwrites a slot previously set to undefined', () => {
        store.set('k', undefined);
        store.def('k', 'replacement');
        expect(store.get('k')).toBe('replacement');
    });

    test('returns the instance (chainable)', () => {
        expect(store.def('a', 1)).toBe(store);
        expect(store.def('a', 1).def('b', 2).get('b')).toBe(2);
    });
});

describe('sets', () => {
    test('assigns every property from the input object', () => {
        store.sets({ a: 1, b: 'two', c: true });
        expect(store.get('a')).toBe(1);
        expect(store.get('b')).toBe('two');
        expect(store.get('c')).toBe(true);
    });

    test('overwrites existing keys', () => {
        store.set('a', 'old');
        store.sets({ a: 'new', b: 'fresh' });
        expect(store.get('a')).toBe('new');
        expect(store.get('b')).toBe('fresh');
    });

    test('is a no-op for an empty object', () => {
        store.set('keep', 1);
        store.sets({});
        expect(store.get('keep')).toBe(1);
        expect(Object.keys(store.data)).toEqual(['keep']);
    });

    test('tolerates null without throwing', () => {
        expect(() => store.sets(null)).not.toThrow();
    });

    test('tolerates undefined without throwing', () => {
        expect(() => store.sets(undefined)).not.toThrow();
    });

    test('returns the instance (chainable)', () => {
        expect(store.sets({ a: 1 })).toBe(store);
        expect(store.sets({ a: 1 }).sets({ b: 2 }).get('b')).toBe(2);
    });
});

describe('chaining across methods', () => {
    test('set, sets, def can be chained together', () => {
        const result = store
            .set('a', 1)
            .sets({ b: 2, c: 3 })
            .def('a', 999)
            .def('d', 4);
        expect(result).toBe(store);
        expect(store.get('a')).toBe(1);
        expect(store.get('b')).toBe(2);
        expect(store.get('c')).toBe(3);
        expect(store.get('d')).toBe(4);
    });
});
