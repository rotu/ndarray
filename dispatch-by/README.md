<!--

@license Apache-2.0

Copyright (c) 2022 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->

# Dispatch

> Create an [ndarray][@stdlib/ndarray/ctor] function interface which performs multiple dispatch.

<section class="intro">

</section>

<!-- /.intro -->

<section class="usage">

## Usage

```javascript
var dispatch = require( '@stdlib/ndarray/dispatch' );
```

#### dispatch( fcns, types, data, nargs, nin, nout )

Returns an [ndarray][@stdlib/ndarray/ctor] function interface which performs multiple dispatch.

<!-- eslint-disable array-element-newline -->

```javascript
var unary = require( '@stdlib/ndarray/base/unary' );
var Float64Array = require( '@stdlib/array/float64' );
var Float32Array = require( '@stdlib/array/float32' );
var ndarray = require( '@stdlib/ndarray/ctor' );

function foo( x ) {
    return x * 10.0;
}

function bar( x ) {
    return x * 5.0;
}

// Define a list of ndarray functions for applying a unary callback:
var fcns = [
    unary,
    unary
];

// Define a one-dimensional list of input and output array types:
var types = [
    'float64', 'float64', // input, output
    'float32', 'float32'  // input, output
];

// Define a list of callbacks which should be applied based on the provided array types:
var data = [
    foo,
    bar
];

// Define the total number of input arguments:
var nargs = 2; // input_array + output_array

// Define the number of input ndarrays:
var nin = 1;

// Define the number of output ndarrays:
var nout = 1;

// Create an ndarray function interface:
var fcn = dispatch( fcns, types, data, nargs, nin, nout );

// ...

var xbuf = new Float64Array( [ 1.0, 2.0, 3.0 ] );
var ybuf = new Float64Array( xbuf.length );

var x = ndarray( 'float64', xbuf, [ 3 ], [ 1 ], 0, 'row-major' );
var y = ndarray( 'float64', ybuf, [ 3 ], [ 1 ], 0, 'row-major' );

fcn( x, y );
// ybuf => <Float64Array>[ 10.0, 20.0, 30.0 ]

xbuf = new Float32Array( [ 1.0, 2.0, 3.0 ] );
ybuf = new Float32Array( xbuf.length );

x = ndarray( 'float32', xbuf, [ 3 ], [ 1 ], 0, 'row-major' );
y = ndarray( 'float32', ybuf, [ 3 ], [ 1 ], 0, 'row-major' );

fcn( x, y );
// ybuf => <Float32Array>[ 5.0, 10.0, 15.0 ]
```

The function accepts the following arguments:

-   **fcns**: list of [ndarray][@stdlib/ndarray/ctor] functions.
-   **types**: one-dimensional list of [ndarray][@stdlib/ndarray/ctor] argument [data types][@stdlib/ndarray/dtypes]. The length of `types` must be the number of [ndarray][@stdlib/ndarray/ctor] functions multiplied by `nin+nout`. If `fcns` is a function, rather than a list, the number of [ndarray][@stdlib/ndarray/ctor] functions is computed as `types.length / (nin+nout)`.
-   **data**: [ndarray][@stdlib/ndarray/ctor] function data (e.g., callbacks). If a list, the length of `data` must equal the number of [ndarray][@stdlib/ndarray/ctor] functions. If `null`, a returned [ndarray][@stdlib/ndarray/ctor] function interface does **not** provide a `data` argument to an invoked [ndarray][@stdlib/ndarray/ctor] function.
-   **nargs**: total number of [ndarray][@stdlib/ndarray/ctor] function interface arguments.
-   **nin**: number of input [ndarrays][@stdlib/ndarray/ctor].
-   **nout**: number of output [ndarrays][@stdlib/ndarray/ctor].

</section>

<!-- /.usage -->

<section class="notes">

## Notes

-   A returned [ndarray][@stdlib/ndarray/ctor] function interface has the following signature:

    ```text
    f( x, y, ... )
    ```

    where

    -   **x**: [ndarray][@stdlib/ndarray/ctor].
    -   **y**: [ndarray][@stdlib/ndarray/ctor].
    -   **...**: additional [ndarrays][@stdlib/ndarray/ctor].

-   The number of [ndarray][@stdlib/ndarray/ctor] function interface parameters is derived from `nargs`, the number of input [ndarrays][@stdlib/ndarray/ctor] is derived from `nin`, and the number of output [ndarrays][@stdlib/ndarray/ctor] is derived from `nout`.

-   An [ndarray][@stdlib/ndarray/ctor] function (i.e., a value provided for the `fcns` argument) should have the following signature:

    ```text
    f( arrays[, data] )
    ```

    where

    -   **arrays**: array containing input and output [ndarrays][@stdlib/ndarray/ctor].
    -   **data**: [ndarray][@stdlib/ndarray/ctor] function data (e.g., a callback).

-   For convenience, a single [ndarray][@stdlib/ndarray/ctor] function may be provided which will be invoked whenever the [ndarray][@stdlib/ndarray/ctor] argument data types match a sequence of types in `types`. Providing a single [ndarray][@stdlib/ndarray/ctor] function is particularly convenient for the case where, regardless of array data types, traversing arrays remains the same, but the [ndarray][@stdlib/ndarray/ctor] function `data` differs (e.g., callbacks which differ based on the array data types). For example, the following

    <!-- eslint-disable array-element-newline -->

    ```javascript
    var unary = require( '@stdlib/ndarray/base/unary' );

    function foo( x ) {
        return x * 10.0;
    }

    function bar( x ) {
        return x * 5.0;
    }

    var fcns = [
        unary,
        unary
    ];
    var types = [
        'float64', 'float64',
        'float32', 'float32'
    ];
    var data = [
        foo,
        bar
    ];

    var fcn = dispatch( fcns, types, data, 2, 1, 1 );
    ```

    is equivalent to

    <!-- eslint-disable array-element-newline -->

    ```javascript
    var unary = require( '@stdlib/ndarray/base/unary' );

    function foo( x ) {
        return x * 10.0;
    }

    function bar( x ) {
        return x * 5.0;
    }

    var types = [
        'float64', 'float64',
        'float32', 'float32'
    ];
    var data = [
        foo,
        bar
    ];

    var fcn = dispatch( unary, types, data, 2, 1, 1 );
    ```

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
var unary = require( '@stdlib/ndarray/base/unary' );
var ndarray = require( '@stdlib/ndarray/ctor' );
var abs = require( '@stdlib/math/base/special/abs' );
var Float64Array = require( '@stdlib/array/float64' );
var dispatch = require( '@stdlib/ndarray/dispatch' );

var types = [ 'float64', 'float64' ];

var data = [
    abs
];

var absolute = dispatch( unary, types, data, 2, 1, 1 );

var xbuf = new Float64Array( [ -1.0, -2.0, -3.0, -4.0, -5.0 ] );
var ybuf = new Float64Array( [ 0.0, 0.0, 0.0, 0.0, 0.0 ] );

var x = ndarray( 'float64', xbuf, [ 5 ], [ 1 ], 0, 'row-major' );
var y = ndarray( 'float64', ybuf, [ 5 ], [ 1 ], 0, 'row-major' );

absolute( x, y );
console.log( ybuf );
// => <Float64Array>[ 1.0, 2.0, 3.0, 4.0, 5.0 ]
```

</section>

<!-- /.examples -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

* * *

## See Also

-   <span class="package-name">[`@stdlib/ndarray/array`][@stdlib/ndarray/array]</span><span class="delimiter">: </span><span class="description">multidimensional arrays.</span>
-   <span class="package-name">[`@stdlib/ndarray/ctor`][@stdlib/ndarray/ctor]</span><span class="delimiter">: </span><span class="description">multidimensional array constructor.</span>

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

<!-- <related-links> -->

[@stdlib/ndarray/array]: https://github.com/stdlib-js/ndarray/tree/main/array

[@stdlib/ndarray/ctor]: https://github.com/stdlib-js/ndarray/tree/main/ctor

[@stdlib/ndarray/dtypes]: https://github.com/stdlib-js/ndarray/tree/main/dtypes

<!-- </related-links> -->

</section>

<!-- /.links -->
