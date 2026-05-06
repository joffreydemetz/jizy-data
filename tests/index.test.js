import jData from '../lib/index.js';

test('default export is the jData class', () => {
    expect(typeof jData).toBe('function');
    expect(jData.prototype.set).toBeInstanceOf(Function);
    expect(jData.prototype.sets).toBeInstanceOf(Function);
    expect(jData.prototype.get).toBeInstanceOf(Function);
    expect(jData.prototype.def).toBeInstanceOf(Function);
    expect(jData.prototype.has).toBeInstanceOf(Function);
});

test('new instance starts with an empty data bag', () => {
    const store = new jData();
    expect(store.data).toEqual({});
});

test('separate instances do not share state', () => {
    const a = new jData();
    const b = new jData();
    a.set('k', 1);
    expect(b.has('k')).toBe(false);
});
