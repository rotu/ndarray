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

var isReadOnly = require( './../../../base/assert/is-read-only' );


// MAIN //

/**
* Returns an array with a specified number of prepended singleton dimensions.
*
* @param {ndarray} x - input array
* @param {NonNegativeInteger} n - number of singleton dimensions to prepend
* @returns {ndarray} output array
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
* var y = prependSingletonDimensions( x, 3 );
* // returns <ndarray>
*
* var shy = y.shape;
* // returns [ 1, 1, 1, 2, 2 ]
*
* var v = y.get( 0, 0, 0, 0, 0 );
* // returns 1
*
* v = y.get( 0, 0, 0, 0, 1 );
* // returns 2
*
* v = y.get( 0, 0, 0, 1, 0 );
* // returns 3
*
* v = y.get( 0, 0, 0, 1, 1 );
* // returns 4
*/
function prependSingletonDimensions( x, n ) { // eslint-disable-line id-length
	var strides;
	var shape;
	var sh;
	var st;
	var N;
	var i;

	sh = x.shape;
	st = x.strides;
	N = sh.length;

	strides = [];
	shape = [];

	// Prepend singleton dimensions...
	for ( i = 0; i < n; i++ ) {
		shape.push( 1 );
		strides.push( st[ 0 ] );
	}
	// Copy remaining dimensions...
	for ( i = 0; i < N; i++ ) {
		shape.push( sh[ i ] );
		strides.push( st[ i ] );
	}
	if ( isReadOnly( x ) ) {
		// If provided a read-only view, the returned array should also be read-only...
		return new x.constructor( x.dtype, x.data, shape, strides, x.offset, x.order, { // eslint-disable-line max-len
			'readonly': true
		});
	}
	return new x.constructor( x.dtype, x.data, shape, strides, x.offset, x.order ); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = prependSingletonDimensions;
