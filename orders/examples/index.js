/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var indexOf = require( '@stdlib/utils/index-of' );
var orders = require( './../lib' );

var ORDERS = orders();
var bool;

function isOrder( str ) {
	if ( indexOf( ORDERS, str ) === -1 ) {
		return false;
	}
	return true;
}

bool = isOrder( 'row-major' );
console.log( bool );
// => true

bool = isOrder( 'column-major' );
console.log( bool );
// => true

bool = isOrder( 'beep' );
console.log( bool );
// => false
