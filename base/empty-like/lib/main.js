/**
* @license Apache-2.0
*
* Copyright (c) 2023 The Stdlib Authors.
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

var shape2strides = require( './../../../base/shape2strides' );
var strides2offset = require( './../../../base/strides2offset' );
var numel = require( './../../../base/numel' );
var emptyArray = require( '@stdlib/array/empty' );
var allocUnsafe = require( '@stdlib/buffer/alloc-unsafe' );


// MAIN //

/**
* Creates an uninitialized ndarray having the same shape and data type as a provided ndarray.
*
* @param {ndarray} x - input array
* @throws {TypeError} first argument must have a recognized data type
* @returns {ndarray} ndarray
*
* @example
* var zeros = require( '@stdlib/ndarray/base/zeros' );
*
* var x = zeros( 'float32', [ 2, 2 ], 'row-major' );
* // returns <ndarray>
*
* var y = emptyLike( x );
* // returns <ndarray>
*
* var sh = y.shape;
* // returns [ 2, 2 ]
*
* var dt = y.dtype;
* // returns 'float32'
*/
function emptyLike( x ) {
	var ndims;
	var len;
	var buf;
	var ord;
	var sh;
	var st;
	var dt;

	dt = x.dtype;
	sh = x.shape;
	ord = x.order;

	ndims = sh.length;
	if ( ndims > 0 ) {
		len = numel( sh );
		st = shape2strides( sh, ord );
	} else {
		// For 0-dimensional arrays, the buffer should contain a single element...
		len = 1;
		st = [ 0 ];
	}
	if ( dt === 'binary' ) {
		buf = allocUnsafe( len );
	} else {
		buf = emptyArray( len, dt );
	}
	return new x.constructor( dt, buf, sh, st, strides2offset( sh, st ), ord );
}


// EXPORTS //

module.exports = emptyLike;
