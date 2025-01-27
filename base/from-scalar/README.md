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

# scalar2ndarray

> Convert a scalar value to a zero-dimensional [ndarray][@stdlib/ndarray/base/ctor].

<!-- Section to include introductory text. Make sure to keep an empty line after the intro `section` element and another before the `/section` close. -->

<section class="intro">

</section>

<!-- /.intro -->

<!-- Package usage documentation. -->

<section class="usage">

## Usage

```javascript
var scalar2ndarray = require( '@stdlib/ndarray/base/from-scalar' );
```

#### scalar2ndarray( value, dtype, order )

Returns a zero-dimensional [`ndarray`][@stdlib/ndarray/base/ctor] containing a provided scalar `value` and having a specified [data type][@stdlib/ndarray/dtypes].

```javascript
var x = scalar2ndarray( 1.0, 'float64', 'row-major' );
// returns <ndarray>

var sh = x.shape;
// returns []

var dt = x.dtype;
// returns 'float64'

var v = x.get();
// returns 1.0
```

</section>

<!-- /.usage -->

<!-- Package usage notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="notes">

## Notes

-   If `value` is a number and [`dtype`][@stdlib/ndarray/dtypes] is a complex [data type][@stdlib/ndarray/dtypes], the function returns a zero-dimensional [`ndarray`][@stdlib/ndarray/base/ctor] containing a complex number whose real component equals the provided scalar `value` and whose imaginary component is zero.

</section>

<!-- /.notes -->

<!-- Package usage examples. -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
var dtypes = require( '@stdlib/ndarray/dtypes' );
var scalar2ndarray = require( '@stdlib/ndarray/base/from-scalar' );

// Get a list of data types:
var dt = dtypes();

// Generate zero-dimensional arrays...
var x;
var i;
for ( i = 0; i < dt.length; i++ ) {
    x = scalar2ndarray( i, dt[ i ], 'row-major' );
    console.log( x.get() );
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

[@stdlib/ndarray/base/ctor]: https://github.com/stdlib-js/ndarray/tree/main/base/ctor

[@stdlib/ndarray/dtypes]: https://github.com/stdlib-js/ndarray/tree/main/dtypes

</section>

<!-- /.links -->
