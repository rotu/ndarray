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

var isndarrayLike = require( '@stdlib/assert/is-ndarray-like' );
var isPlainObject = require( '@stdlib/assert/is-plain-object' );
var isNonNegativeIntegerArray = require( '@stdlib/assert/is-nonnegative-integer-array' ).primitives;
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var shape2strides = require( './../../base/shape2strides' );
var strides2offset = require( './../../base/strides2offset' );
var buffer = require( './../../base/buffer' );
var numel = require( './../../base/numel' );
var ndarray = require( './../../ctor' );
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Creates a zero-filled ndarray having the same shape and data type as a provided ndarray.
*
* @param {ndarray} x - input array
* @param {Options} [options] - function options
* @param {string} [options.dtype] - output array data type (overrides the input array's inferred data type)
* @param {string} [options.order] - specifies whether the output array should be 'row-major' (C-style) or 'column-major' (Fortran-style) (overrides the input array's inferred order)
* @param {(NonNegativeIntegerArray|NonNegativeInteger)} [options.shape] - output array shape (overrides the input array's inferred shape)
* @param {string} [options.mode="throw"] - specifies how to handle indices which exceed array dimensions
* @param {StringArray} [options.submode=["throw"]] - specifies how to handle subscripts which exceed array dimensions on a per dimension basis
* @param {boolean} [options.readonly=false] - boolean indicating whether an array should be read-only
* @throws {TypeError} first argument must have a recognized data type
* @throws {TypeError} options argument must be an object
* @throws {TypeError} `dtype` option must be a supported ndarray data type
* @throws {TypeError} `order` option must be a supported order
* @throws {TypeError} `shape` option must be either a nonnegative integer or an array of nonnegative integers
* @throws {TypeError} must provide valid options
* @returns {ndarray} ndarray
*
* @example
* var zeros = require( '@stdlib/ndarray/zeros' );
*
* var x = zeros( [ 2, 2 ] );
* // returns <ndarray>
*
* var y = zerosLike( x );
* // returns <ndarray>
*
* var sh = y.shape;
* // returns [ 2, 2 ]
*
* var dt = y.dtype;
* // returns 'float64'
*/
function zerosLike( x ) {
	var options;
	var dtype;
	var order;
	var ndims;
	var opts;
	var buf;
	var len;
	var st;
	var sh;

	if ( !isndarrayLike( x ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be an ndarray-like object. Value: `%s`.', x ) );
	}
	opts = {};
	if ( arguments.length > 1 ) {
		options = arguments[ 1 ];
		if ( !isPlainObject( options ) ) {
			throw new TypeError( format( 'invalid argument. Options argument must be an object. Value: `%s`.', options ) );
		}
		if ( hasOwnProp( options, 'dtype' ) ) {
			dtype = options.dtype;
		} else {
			dtype = x.dtype;
		}
		if ( hasOwnProp( options, 'shape' ) ) {
			sh = options.shape;
			if ( typeof sh === 'number' ) {
				sh = [ sh ];
			}
			if ( !isNonNegativeIntegerArray( sh ) ) {
				throw new TypeError( format( 'invalid option. `%s` option must be a nonnegative integer or an array of nonnegative integers. Option: `%s`.', 'shape', sh ) );
			}
		} else {
			sh = x.shape;
		}
		if ( hasOwnProp( options, 'order' ) ) {
			order = options.order;
		} else {
			order = x.order;
		}
		if ( hasOwnProp( options, 'mode' ) ) {
			opts.mode = options.mode;
		}
		if ( hasOwnProp( options, 'submode' ) ) {
			opts.submode = options.submode;
		}
		if ( hasOwnProp( options, 'readonly' ) ) {
			opts.readonly = options.readonly;
		}
	} else {
		dtype = x.dtype;
		sh = x.shape;
		order = x.order;
	}
	ndims = sh.length;
	if ( ndims > 0 ) {
		len = numel( sh );
		if ( len < 0 ) {
			len = 0; // note: we should only get here if an inferred shape is invalid (i.e., contains negative dimension sizes)
		}
		st = shape2strides( sh, order );
	} else {
		// For 0-dimensional arrays, the buffer should contain a single element...
		len = 1;
		st = [ 0 ];
	}
	buf = buffer( dtype, len );
	if ( buf === null ) {
		throw new TypeError( format( 'invalid argument. First argument must have a recognized data type. Value: `%s`.', dtype ) );
	}
	return new ndarray( dtype, buf, sh, st, strides2offset( sh, st ), order, opts ); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = zerosLike;
