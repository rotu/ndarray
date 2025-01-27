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

# zerosLike

> Create a zero-filled [ndarray][@stdlib/ndarray/ctor] having the same shape and [data type][@stdlib/ndarray/dtypes] as a provided ndarray.

<!-- Section to include introductory text. Make sure to keep an empty line after the intro `section` element and another before the `/section` close. -->

<section class="intro">

</section>

<!-- /.intro -->

<!-- Package usage documentation. -->

<section class="usage">

## Usage

```javascript
var zerosLike = require( '@stdlib/ndarray/zeros-like' );
```

#### zerosLike( x\[, options] )

Creates a zero-filled [ndarray][@stdlib/ndarray/ctor] having the same shape and [data type][@stdlib/ndarray/dtypes] as a provided ndarray.

```javascript
var zeros = require( '@stdlib/ndarray/zeros' );

var x = zeros( [ 2, 2 ] );
// returns <ndarray>

var y = zerosLike( x );
// returns <ndarray>

var sh = y.shape;
// returns [ 2, 2 ]

var dt = y.dtype;
// returns 'float64'
```

The function supports the following `options`:

-   **dtype**: output [ndarray][@stdlib/ndarray/ctor] [data type][@stdlib/ndarray/dtypes]. Overrides the input ndarray's inferred [data type][@stdlib/ndarray/dtypes].
-   **shape**: output [ndarray][@stdlib/ndarray/ctor] shape. Overrides the input ndarray's inferred shape.
-   **order**: specifies whether the output [ndarray][@stdlib/ndarray/ctor] should be `'row-major'` (C-style) or `'column-major'` (Fortran-style). Overrides the input ndarray's inferred order.
-   **mode**: specifies how to handle indices which exceed array dimensions (see [`ndarray`][@stdlib/ndarray/ctor]). Default: `'throw'`.
-   **submode**: a mode array which specifies for each dimension how to handle subscripts which exceed array dimensions  (see [`ndarray`][@stdlib/ndarray/ctor]). If provided fewer modes than dimensions, the constructor recycles modes using modulo arithmetic. Default: `[ options.mode ]`.
-   **readonly**: `boolean` indicating whether an array should be **read-only**. Default: `false`.

To override either the `dtype`, `shape`, or `order`, specify the corresponding option. For example, to override the inferred [data type][@stdlib/ndarray/dtypes], 

```javascript
var zeros = require( '@stdlib/ndarray/zeros' );

var x = zeros( [ 2, 2 ] );
// returns <ndarray>

var dt = x.dtype;
// returns 'float64'

var y = zerosLike( x, {
    'dtype': 'int32'
});
// returns <ndarray>

var sh = y.shape;
// returns [ 2, 2 ]

dt = y.dtype;
// returns 'int32'
```

</section>

<!-- /.usage -->

<!-- Package usage notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="notes">

</section>

<!-- /.notes -->

<!-- Package usage examples. -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
var dtypes = require( '@stdlib/ndarray/dtypes' );
var zeros = require( '@stdlib/ndarray/zeros' );
var zerosLike = require( '@stdlib/ndarray/zeros-like' );

// Get a list of data types:
var dt = dtypes();

// Generate zero-filled arrays...
var x;
var y;
var i;
for ( i = 0; i < dt.length; i++ ) {
    x = zeros( [ 2, 2 ], {
        'dtype': dt[ i ]
    });
    y = zerosLike( x );
    console.log( y.data );
}
```

</section>

<!-- /.examples -->

<!-- Section to include cited references. If references are included, add a horizontal rule *before* the section. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="references">

</section>

<!-- /.references -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[@stdlib/ndarray/ctor]: https://github.com/stdlib-js/ndarray/tree/main/ctor

[@stdlib/ndarray/dtypes]: https://github.com/stdlib-js/ndarray/tree/main/dtypes

</section>

<!-- /.links -->
