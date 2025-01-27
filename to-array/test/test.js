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

var tape = require( 'tape' );
var isArray = require( '@stdlib/assert/is-array' );
var Complex64Array = require( '@stdlib/array/complex64' );
var realf = require( '@stdlib/complex/realf' );
var imagf = require( '@stdlib/complex/imagf' );
var ndarray = require( './../../ctor' );
var ndarray2array = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof ndarray2array, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns an empty array if provided an ndarray', function test( t ) {
	var out;
	var arr;

	arr = ndarray( 'generic', [], [], [ 0 ], 0, 'row-major' );
	out = ndarray2array( arr );

	t.strictEqual( isArray( out ), true, 'returns an array' );
	t.strictEqual( out.length, 0, 'returns an empty array' );
	t.end();
});

tape( 'the function returns an empty array if provided an ndarray having one or more dimensions which have zero elements', function test( t ) {
	var out;
	var arr;

	arr = ndarray( 'generic', [ 1, 2, 3, 4 ], [ 2, 0 ], [ 0, 0 ], 0, 'row-major' );
	out = ndarray2array( arr );

	t.strictEqual( isArray( out ), true, 'returns an array' );
	t.strictEqual( out.length, 0, 'returns an empty array' );
	t.end();
});

tape( 'the function converts an ndarray to a generic array (1d; order=row-major)', function test( t ) {
	var expected;
	var strides;
	var offset;
	var buffer;
	var order;
	var shape;
	var out;
	var arr;

	buffer = [ 1, 2, 3, 4, 5, 6 ];

	shape = [ 6 ];
	order = 'row-major';
	strides = [ 1 ];
	offset = 0;

	arr = ndarray( 'generic', buffer, shape, strides, offset, order );
	out = ndarray2array( arr );

	expected = [ 1, 2, 3, 4, 5, 6 ];
	t.strictEqual( isArray( out ), true, 'returns an array' );
	t.deepEqual( out, expected, 'returns expected value' );

	t.end();
});

tape( 'the function converts an ndarray to a generic array (1d; order=row-major; complex data type)', function test( t ) {
	var strides;
	var offset;
	var buffer;
	var order;
	var shape;
	var out;
	var arr;
	var v;

	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 ] );

	shape = [ 3 ];
	order = 'row-major';
	strides = [ -1 ];
	offset = 2;

	arr = ndarray( 'complex64', buffer, shape, strides, offset, order );
	out = ndarray2array( arr );

	t.strictEqual( isArray( out ), true, 'returns an array' );

	v = out[ 0 ];
	t.strictEqual( realf( v ), 5.0, 'returns expected value' );
	t.strictEqual( imagf( v ), 6.0, 'returns expected value' );

	v = out[ 1 ];
	t.strictEqual( realf( v ), 3.0, 'returns expected value' );
	t.strictEqual( imagf( v ), 4.0, 'returns expected value' );

	v = out[ 2 ];
	t.strictEqual( realf( v ), 1.0, 'returns expected value' );
	t.strictEqual( imagf( v ), 2.0, 'returns expected value' );

	t.end();
});

tape( 'the function converts an ndarray to a generic array (1d; order=column-major)', function test( t ) {
	var expected;
	var strides;
	var offset;
	var buffer;
	var order;
	var shape;
	var out;
	var arr;

	buffer = [ 1, 2, 3, 4, 5, 6 ];

	shape = [ 6 ];
	order = 'column-major';
	strides = [ -1 ];
	offset = 5;

	arr = ndarray( 'generic', buffer, shape, strides, offset, order );
	out = ndarray2array( arr );

	expected = [ 6, 5, 4, 3, 2, 1 ];
	t.strictEqual( isArray( out ), true, 'returns an array' );
	t.deepEqual( out, expected, 'returns expected value' );

	t.end();
});

tape( 'the function converts an ndarray to a generic array (1d; order=column-major; complex data type)', function test( t ) {
	var strides;
	var offset;
	var buffer;
	var order;
	var shape;
	var out;
	var arr;
	var v;

	buffer = new Complex64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 ] );

	shape = [ 3 ];
	order = 'column-major';
	strides = [ 1 ];
	offset = 0;

	arr = ndarray( 'complex64', buffer, shape, strides, offset, order );
	out = ndarray2array( arr );

	t.strictEqual( isArray( out ), true, 'returns an array' );

	v = out[ 0 ];
	t.strictEqual( realf( v ), 1.0, 'returns expected value' );
	t.strictEqual( imagf( v ), 2.0, 'returns expected value' );

	v = out[ 1 ];
	t.strictEqual( realf( v ), 3.0, 'returns expected value' );
	t.strictEqual( imagf( v ), 4.0, 'returns expected value' );

	v = out[ 2 ];
	t.strictEqual( realf( v ), 5.0, 'returns expected value' );
	t.strictEqual( imagf( v ), 6.0, 'returns expected value' );

	t.end();
});

tape( 'the function converts an ndarray to a generic array (2d; order=row-major)', function test( t ) {
	var expected;
	var strides;
	var offset;
	var buffer;
	var order;
	var shape;
	var out;
	var arr;

	buffer = [ 1, 2, 3, 4, 5, 6 ];

	shape = [ 3, 2 ];
	order = 'row-major';
	strides = [ 2, 1 ];
	offset = 0;

	arr = ndarray( 'generic', buffer, shape, strides, offset, order );
	out = ndarray2array( arr );

	expected = [
		[ 1, 2 ],
		[ 3, 4 ],
		[ 5, 6 ]
	];
	t.strictEqual( isArray( out ), true, 'returns an array' );
	t.deepEqual( out, expected, 'returns expected value' );

	strides = [ -2, 1 ];
	offset = 4;

	arr = ndarray( 'generic', buffer, shape, strides, offset, order );
	out = ndarray2array( arr );

	expected = [
		[ 5, 6 ],
		[ 3, 4 ],
		[ 1, 2 ]
	];
	t.strictEqual( isArray( out ), true, 'returns an array' );
	t.deepEqual( out, expected, 'returns expected value' );

	strides = [ 2, -1 ];
	offset = 1;

	arr = ndarray( 'generic', buffer, shape, strides, offset, order );
	out = ndarray2array( arr );

	expected = [
		[ 2, 1 ],
		[ 4, 3 ],
		[ 6, 5 ]
	];
	t.strictEqual( isArray( out ), true, 'returns an array' );
	t.deepEqual( out, expected, 'returns expected value' );

	strides = [ -2, -1 ];
	offset = 5;

	arr = ndarray( 'generic', buffer, shape, strides, offset, order );
	out = ndarray2array( arr );

	expected = [
		[ 6, 5 ],
		[ 4, 3 ],
		[ 2, 1 ]
	];
	t.strictEqual( isArray( out ), true, 'returns an array' );
	t.deepEqual( out, expected, 'returns expected value' );

	t.end();
});

tape( 'the function converts an ndarray to a generic array (2d; order=column-major)', function test( t ) {
	var expected;
	var strides;
	var offset;
	var buffer;
	var order;
	var shape;
	var out;
	var arr;

	buffer = [ 1, 2, 3, 4, 5, 6 ];

	shape = [ 3, 2 ];
	order = 'column-major';
	strides = [ 1, 3 ];
	offset = 0;

	arr = ndarray( 'generic', buffer, shape, strides, offset, order );
	out = ndarray2array( arr );

	expected = [
		[ 1, 4 ],
		[ 2, 5 ],
		[ 3, 6 ]
	];
	t.strictEqual( isArray( out ), true, 'returns an array' );
	t.deepEqual( out, expected, 'returns expected value' );

	strides = [ -1, 3 ];
	offset = 2;

	arr = ndarray( 'generic', buffer, shape, strides, offset, order );
	out = ndarray2array( arr );

	expected = [
		[ 3, 6 ],
		[ 2, 5 ],
		[ 1, 4 ]
	];
	t.strictEqual( isArray( out ), true, 'returns an array' );
	t.deepEqual( out, expected, 'returns expected value' );

	strides = [ 1, -3 ];
	offset = 3;

	arr = ndarray( 'generic', buffer, shape, strides, offset, order );
	out = ndarray2array( arr );

	expected = [
		[ 4, 1 ],
		[ 5, 2 ],
		[ 6, 3 ]
	];
	t.strictEqual( isArray( out ), true, 'returns an array' );
	t.deepEqual( out, expected, 'returns expected value' );

	strides = [ -1, -3 ];
	offset = 5;

	arr = ndarray( 'generic', buffer, shape, strides, offset, order );
	out = ndarray2array( arr );

	expected = [
		[ 6, 3 ],
		[ 5, 2 ],
		[ 4, 1 ]
	];
	t.strictEqual( isArray( out ), true, 'returns an array' );
	t.deepEqual( out, expected, 'returns expected value' );

	t.end();
});

tape( 'the function converts an ndarray to a generic array (3d; order=row-major)', function test( t ) {
	var expected;
	var strides;
	var offset;
	var buffer;
	var order;
	var shape;
	var out;
	var arr;

	buffer = [ 1, 2, 3, 4, 5, 6, 7, 8 ];

	shape = [ 2, 2, 2 ];
	order = 'row-major';
	strides = [ 4, 2, 1 ];
	offset = 0;

	arr = ndarray( 'generic', buffer, shape, strides, offset, order );
	out = ndarray2array( arr );

	expected = [
		[ [ 1, 2 ], [ 3, 4 ] ],
		[ [ 5, 6 ], [ 7, 8 ] ]
	];
	t.strictEqual( isArray( out ), true, 'returns an array' );
	t.deepEqual( out, expected, 'returns expected value' );

	strides = [ -4, -2, -1 ];
	offset = 7;

	arr = ndarray( 'generic', buffer, shape, strides, offset, order );
	out = ndarray2array( arr );

	expected = [
		[ [ 8, 7 ], [ 6, 5 ] ],
		[ [ 4, 3 ], [ 2, 1 ] ]
	];
	t.strictEqual( isArray( out ), true, 'returns an array' );
	t.deepEqual( out, expected, 'returns expected value' );

	t.end();
});

tape( 'the function converts an ndarray to a generic array (3d; order=column-major)', function test( t ) {
	var expected;
	var strides;
	var offset;
	var buffer;
	var order;
	var shape;
	var out;
	var arr;

	buffer = [ 1, 2, 3, 4, 5, 6, 7, 8 ];

	shape = [ 2, 2, 2 ];
	order = 'column-major';
	strides = [ 1, 2, 4 ];
	offset = 0;

	arr = ndarray( 'generic', buffer, shape, strides, offset, order );
	out = ndarray2array( arr );

	expected = [
		[ [ 1, 5 ], [ 3, 7 ] ],
		[ [ 2, 6 ], [ 4, 8 ] ]
	];
	t.strictEqual( isArray( out ), true, 'returns an array' );
	t.deepEqual( out, expected, 'returns expected value' );

	strides = [ -1, -2, -4 ];
	offset = 7;

	arr = ndarray( 'generic', buffer, shape, strides, offset, order );
	out = ndarray2array( arr );

	expected = [
		[ [ 8, 4 ], [ 6, 2 ] ],
		[ [ 7, 3 ], [ 5, 1 ] ]
	];
	t.strictEqual( isArray( out ), true, 'returns an array' );
	t.deepEqual( out, expected, 'returns expected value' );

	t.end();
});
