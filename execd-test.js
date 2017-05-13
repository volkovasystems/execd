
const assert = require( "assert" );
const execd = require( "./execd.js" );

let hello = function hello( ){ };
assert.equal( execd( hello ), false, "should be false" );

hello[ Symbol.for( "called" ) ] = Symbol.for( "called" );
assert.equal( execd( hello ), true, "should be true" );

console.log( "ok" );
