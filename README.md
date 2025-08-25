# jizy-data 

A simple data management library for JavaScript applications.

## Installation

```bash
npm install jizy-data
```

## Usage

```js
import jData from 'jizy-data';

const store = new jData();

// Set a value
store.set('key', 'value');

// Get a value
console.log(store.get('key')); // 'value'

// Set multiple values
store.sets({ foo: 1, bar: 2 });

// Set a default value (only if not already set)
store.def('baz', 42);

// Check if a key exists
console.log(store.has('foo')); // true
```

## API

### new jData()
Creates a new data store instance.

### .set(key, value)
Sets a value for the given key.

### .sets(object)
Sets multiple key-value pairs from an object.

### .get(key, [default])
Gets the value for a key, or returns `default` (or `null`) if not set.

### .def(key, value)
Sets a default value for a key if it is not already set.

### .has(key)
Returns `true` if the key exists in the store.
