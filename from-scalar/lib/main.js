/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isPlainObject = require( '@stdlib/assert/is-plain-object' );
var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isComplexLike = require( '@stdlib/assert/is-complex-like' );
var isAccessorArray = require( '@stdlib/array/base/assert/is-accessor-array' );
var accessorSetter = require( '@stdlib/array/base/accessor-setter' );
var setter = require( '@stdlib/array/base/setter' );
var buffer = require( './../../base/buffer' );
var ndarray = require( './../../ctor' );
var defaults = require( './../../defaults' );
var format = require( '@stdlib/string/format' );


// VARIABLES //

var ORDER = defaults.get( 'order' );


// MAIN //

/**
* Returns a zero-dimensional ndarray containing a provided scalar value.
*
* ## Notes
*
* -   If a `dtype` option is not provided and `value`
*
*     -   is a `number`, the default data type is `'float64'`.
*     -   is a complex number object, the default data type is `'complex128'`.
*     -   is any other value type, the default data type is `'generic'`.
*
* @param {*} value - scalar value
* @param {Options} [options] - function options
* @param {string} [options.dtype] - output array data type
* @param {string} [options.order="row-major"] - memory layout (either row-major or column-major)
* @param {boolean} [options.readonly=false] - boolean indicating whether an array should be read-only
* @throws {TypeError} second argument must be an object
* @throws {TypeError} `dtype` option must be a recognized data type
* @returns {ndarray} ndarray
*
* @example
* var x = scalar2ndarray( 1.0 );
* // returns <ndarray>
*
* var sh = x.shape;
* // returns []
*
* var dt = x.dtype;
* // returns 'float64'
*
* var v = x.get();
* // returns 1.0
*
* @example
* var x = scalar2ndarray( 1.0, {
*     'dtype': 'float32'
* });
* // returns <ndarray>
*
* var sh = x.shape;
* // returns []
*
* var dt = x.dtype;
* // returns 'float32'
*
* var v = x.get();
* // returns 1.0
*/
function scalar2ndarray( value ) {
	var options;
	var opts;
	var buf;
	var flg;
	var set;
	var dt;
	var v;

	opts = {
		'dtype': '',
		'order': ORDER,
		'readonly': false
	};
	if ( arguments.length > 1 ) {
		options = arguments[ 1 ];
		if ( !isPlainObject( options ) ) {
			throw new TypeError( format( 'invalid argument. Options argument must be an object. Value: `%s`.', options ) );
		}
		if ( hasOwnProp( options, 'dtype' ) ) {
			opts.dtype = options.dtype;
		}
		if ( hasOwnProp( options, 'order' ) ) {
			opts.order = options.order;
		}
		if ( hasOwnProp( options, 'readonly' ) ) {
			opts.readonly = options.readonly;
		}
	}
	flg = isNumber( value );
	if ( opts.dtype === '' ) {
		if ( flg ) {
			dt = 'float64';
		} else if ( isComplexLike( value ) ) {
			dt = 'complex128';
		} else {
			dt = 'generic';
		}
	} else {
		dt = opts.dtype;
	}
	buf = buffer( dt, 1 );
	if ( buf === null ) {
		throw new TypeError( format( 'invalid option. `%s` option must be a recognized data type. Option: `%s`.', 'dtype', dt ) );
	}
	if ( /^complex/.test( dt ) && flg ) {
		v = [ value, 0.0 ]; // note: we're assuming that the ComplexXXArray setter accepts an array of interleaved real and imaginary components
	} else {
		v = value;
	}
	if ( isAccessorArray( buf ) ) {
		set = accessorSetter( dt );
	} else {
		set = setter( dt );
	}
	set( buf, 0, v );
	return new ndarray( dt, buf, [], [ 0 ], 0, opts.order, opts );
}


// EXPORTS //

module.exports = scalar2ndarray;
