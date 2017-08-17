"use strict";

/*;
	@test-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-test-license

	@test-configuration:
		{
			"package": "execd",
			"path": "execd/test.module.js",
			"file": "test.module.js",
			"module": "test",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/execd.git"
		}
	@end-test-configuration

	@test-documentation:

	@end-test-documentation

	@include:
		{
			"assert": "should",
			"execd": "execd"
		}
	@end-include
*/

const assert = require( "should" );

//: @server:
const execd = require( "./execd.js" );
//: @end-server

//: @client:
const execd = require( "./execd.support.js" );
//: @end-client

//: @bridge:
const path = require( "path" );
//: @end-bridge


//: @server:

describe( "execd", ( ) => {

	describe( "`execd( function hello( ){ } )`", ( ) => {
		it( "should be equal to false", ( ) => {
			assert.equal( execd( function hello( ){ } ), false );
		} );
	} );

	describe( "`execd with function named 'hello' containing Symbol.for( 'called' ) property and value`", ( ) => {
		it( "should be equal to true", ( ) => {

			let hello = function hello( ){ };
			hello[ Symbol.for( "called" ) ] = Symbol.for( "called" );

			assert.equal( execd( hello ), true );

		} );
	} );

} );

//: @end-server


//: @client:

describe( "execd", ( ) => {

	describe( "`execd( function hello( ){ } )`", ( ) => {
		it( "should be equal to false", ( ) => {
			assert.equal( execd( function hello( ){ } ), false );
		} );
	} );

	describe( "`execd with function named 'hello' containing Symbol.for( 'called' ) property and value`", ( ) => {
		it( "should be equal to true", ( ) => {

			let hello = function hello( ){ };
			hello[ Symbol.for( "called" ) ] = Symbol.for( "called" );

			assert.equal( execd( hello ), true );

		} );
	} );

} );

//: @end-client


//: @bridge:

describe( "execd", ( ) => {

	let bridgeURL = `file://${ path.resolve( __dirname, "bridge.html" ) }`;

	describe( "`execd( function hello( ){ } )`", ( ) => {
		it( "should be equal to false", ( ) => {

			let result = browser.url( bridgeURL ).execute(

				function( ){
					return execd( function hello( ){ } );
				}

			).value;

			assert.equal( result, false );

		} );
	} );

	describe( "`execd with function named 'hello' containing Symbol.for( 'called' ) property and value`", ( ) => {
		it( "should be equal to true", ( ) => {
			//: @ignore:
			let result = browser.url( bridgeURL ).execute(

				function( ){

					let hello = function hello( ){ };
					hello[ Symbol.for( "called" ) ] = Symbol.for( "called" );

					return execd( hello );
				}

			).value;
			//: @end-ignore
			assert.equal( result, true );

		} );
	} );

} );

//: @end-bridge
