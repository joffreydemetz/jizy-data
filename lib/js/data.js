export default class jData {
    constructor() {
        this.data = {};
    }
    sets(properties) {
        if (properties && Object.keys(properties).length > 0) {
            for (var key in properties) {
                this.set(key, properties[key]);
            }
        }
        return this;
    }
    get(key, def) {
        return true === this.has(key) ? this.data[key] : def || null;
    }
    set(key, value) {
        this.data[key] = value;
        return this;
    }
    def(key, value) {
        if (typeof this.data[key] === 'undefined') {
            this.data[key] = value;
        }
        return this;
    }
    has(key) {
        return typeof this.data[key] !== 'undefined';
    }
};
