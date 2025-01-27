/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
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

var ndarray = require( './../../../base/ctor' );
var format = require( '@stdlib/string/format' );
var copy = require( '@stdlib/array/base/copy-indexed' );


// MAIN //

/**
* Broadcasts an ndarray to a specified shape.
*
* ## Notes
*
* -   The returned array is a view on the input array data buffer. The view is typically **not** contiguous. As more than one element of a returned view may refer to the same memory location, writing to the view may affect multiple elements. If you need to write to the returned array, copy the array before performing operations which may mutate elements.
*
* @param {ndarray} arr - input array
* @param {NonNegativeIntegerArray} shape - desired shape
* @throws {Error} input array cannot have more dimensions than the desired shape
* @throws {Error} input array dimension sizes must be `1` or equal to the corresponding dimension in the provided shape
* @throws {Error} input array and desired shape must be broadcast compatible
* @returns {ndarray} broadcasted array
*
* @example
* var array = require( '@stdlib/ndarray/array' );
*
* var x = array( [ [ 1, 2 ], [ 3, 4 ] ] );
* // returns <ndarray>
*
* var shx = x.shape;
* // returns [ 2, 2 ]
*
* var y = broadcastArray( x, [ 3, 2, 2 ] );
* // returns <ndarray>
*
* var shy = y.shape;
* // returns [ 3, 2, 2 ]
*
* var v = y.get( 0, 0, 0 );
* // returns 1
*
* v = y.get( 0, 0, 1 );
* // returns 2
*
* v = y.get( 1, 0, 0 );
* // returns 1
*
* v = y.get( 1, 1, 0 );
* // returns 3
*
* v = y.get( 2, 0, 0 );
* // returns 1
*
* v = y.get( 2, 1, 1 );
* // returns 4
*
* @example
* var array = require( '@stdlib/ndarray/array' );
*
* var x = array( [ [ 1, 2 ], [ 3, 4 ] ] );
* // returns <ndarray>
*
* var y = broadcastArray( x, [ 3, 2 ] );
* // throws <Error>
*/
function broadcastArray( arr, shape ) {
	var strides;
	var dim;
	var sh;
	var st;
	var N;
	var M;
	var d;
	var i;
	var j;

	N = shape.length;
	sh = arr.shape;
	M = sh.length;
	if ( N < M ) {
		throw new Error( 'invalid argument. Cannot broadcast an array to a shape having fewer dimensions. Arrays can only be broadcasted to shapes having the same or more dimensions.' );
	}
	// Initialize a strides array...
	strides = [];
	for ( i = 0; i < N; i++ ) {
		strides.push( 0 );
	}
	// Determine the output array strides...
	st = arr.strides;
	for ( i = N-1; i >= 0; i-- ) {
		j = M - N + i;
		if ( j < 0 ) {
			// Prepended singleton dimension; stride is zero...
			continue;
		}
		d = sh[ j ];
		dim = shape[ i ];
		if ( dim !== 0 && dim < d ) {
			throw new Error( format( 'invalid argument. Input array cannot be broadcast to the specified shape, as the specified shape has a dimension whose size is less than the size of the corresponding dimension in the input array. Array shape: (%s). Desired shape: (%s). Dimension: %u.', copy( sh ).join( ', ' ), copy( shape ).join( ', ' ), i ) );
		}
		if ( d === dim ) {
			strides[ i ] = st[ j ];
		} else if ( d === 1 ) {
			// In order to broadcast dimensions, we set the stride for that dimension to zero...
			strides[ i ] = 0;
		} else {
			// At this point, we know that `dim > d` and that `d` does not equal `1` (e.g., `dim=3` and `d=2`); in which case, the shapes are considered incompatible (even for desired shapes which are multiples of array dimensions, as might be desired when "tiling" an array; e.g., `dim=4` and `d=2`)...
			throw new Error( format( 'invalid argument. Input array and the specified shape are broadcast incompatible. Array shape: (%s). Desired shape: (%s). Dimension: %u.', copy( sh ).join( ', ' ), copy( shape ).join( ', ' ), i ) );
		}
	}
	return ndarray( arr.dtype, arr.data, copy( shape ), strides, arr.offset, arr.order ); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = broadcastArray;
