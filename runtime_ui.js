// Miva Merchant
//
// This file and the source codes contained herein are the property of
// Miva, Inc.  Use of this file is restricted to the specific terms and
// conditions in the License Agreement associated with this file.  Distribution
// of this file or portions of this file for uses not covered by the License
// Agreement is not allowed without a written agreement signed by an officer of
// Miva, Inc.
//
// Copyright 1998-2020 Miva, Inc.  All rights reserved.
// http://www.miva.com
//

function DeriveFrom( base_class, child_class )
{
	var placeholder;

	placeholder							= function() { ; }
	placeholder.prototype				= base_class.prototype;
	child_class.prototype				= new placeholder();
	child_class.prototype.constructor	= child_class;
}

function newElement( type, attributes, styles, parent )
{
	var element;

	element = document.createElement( type );

	setElementAttributes( element, attributes );
	setElementStyles( element, styles );

	if ( parent )
	{
		parent.appendChild( element );
	}

	return element;
}

function newTextNode( text, parent )
{
	var element;

	element	= document.createTextNode( text );

	if ( parent )
	{
		parent.appendChild( element );
	}

	return element;
}

function newTextNode_EmptyParent( text, parent )
{
	if ( parent )
	{
		parent.innerHTML = '';
	}

	return newTextNode( text, parent );
}

function setElementAttributes( element, attributes )
{
	var attribute;

	for ( attribute in attributes )
	{
		if ( !attributes.hasOwnProperty( attribute ) )
		{
			continue;
		}

		if ( attribute == 'name' )			element.name		= attributes[ attribute ];
		else if ( attribute == 'class' )	element.className	= attributes[ attribute ];
		else								element.setAttribute( attribute, attributes[ attribute ] );
	}
}

function setElementStyles( element, styles )
{
	var style;

	for ( style in styles )
	{
		if ( styles.hasOwnProperty( style ) )
		{
			element.style[ style ] = styles[ style ];
		}
	}
}

function classNameContains( element, classname, allow_regex_in_classname )
{
	var i, i_len, classlist;

	classlist		= element.className.split( /\s/ );

	for ( i = 0, i_len = classlist.length; i < i_len; i++ )
	{
		if ( classlist[ i ] == '' )																						continue;
		else if ( !allow_regex_in_classname && classlist[ i ] == classname )											return true;
		else if ( allow_regex_in_classname && classlist[ i ].match( new RegExp( '(?:^)' + classname + '(?:$)' ) ) )		return true;
	}

	return false;
}

function classNameReplace( element, classname, replacement_classname, allow_regex_in_classname )
{
	var i, i_len, classlist, new_classlist;

	new_classlist	= new Array();
	classlist		= element.className.split( /\s/ );

	for ( i = 0, i_len = classlist.length; i < i_len; i++ )
	{
		if ( classlist[ i ] == '' )																						continue;
		else if ( !allow_regex_in_classname && classlist[ i ] == classname )											continue;
		else if ( allow_regex_in_classname && classlist[ i ].match( new RegExp( '(?:^)' + classname + '(?:$)' ) ) )		continue;

		new_classlist.push( classlist[ i ] );
	}

	new_classlist.push( replacement_classname );

	return new_classlist.join( ' ' );
}

function classNameReplaceIfAltered( element, classname, replacement_classname, allow_regex_in_classname )
{
	var new_classlist, original_classlist;

	original_classlist		= element.className.split( /\s/ ).map( function( filter_classname ) { return trim( filter_classname ); } );
	original_classlist		= original_classlist.filter( function( filter_classname ) { return filter_classname !== ''; } );
	new_classlist			= original_classlist.filter( function( filter_classname )
	{
		if ( filter_classname === replacement_classname )
		{
			return false;
		}

		if ( !allow_regex_in_classname )
		{
			return filter_classname !== classname;
		}

		return !filter_classname.match( new RegExp( '(?:^)' + classname + '(?:$)' ) );
	} );

	new_classlist.push( replacement_classname );

	new_classlist.sort();
	original_classlist.sort();

	if ( !compareObjects( original_classlist, new_classlist ) )
	{
		element.className = new_classlist.join( ' ' );
	}
}

function classNameAdd( element, classname )
{
	var new_classlist, original_classlist;

	original_classlist		= element.className.split( /\s/ ).map( function( filter_classname ) { return trim( filter_classname ); } );
	new_classlist			= original_classlist.filter( function( filter_classname ) { return ( filter_classname !== '' && filter_classname !== classname ); } );

	new_classlist.push( classname );

	return new_classlist.join( ' ' );
}

function classNameAddIfMissing( element, classname )
{
	var new_classlist, original_classlist;

	if ( Array.isArray( classname ) )
	{
		return classNameAddListIfMissing( element, classname );
	}

	original_classlist		= element.className.split( /\s/ ).map( function( filter_classname ) { return trim( filter_classname ); } );
	original_classlist		= original_classlist.filter( function( filter_classname ) { return filter_classname !== ''; } );
	new_classlist			= original_classlist.filter( function( filter_classname ) { return filter_classname !== classname; } );

	new_classlist.push( classname );

	new_classlist.sort();
	original_classlist.sort();

	if ( !compareObjects( original_classlist, new_classlist ) )
	{
		element.className = new_classlist.join( ' ' );
	}
}

function classNameAddList( element, classnamelist )
{
	var new_classlist, original_classlist;

	original_classlist	= element.className.split( /\s/ ).map( function( filter_classname ) { return trim( filter_classname ); } );
	new_classlist		= original_classlist.filter( function( filter_classname ) { return filter_classname !== '' && classnamelist.indexOf( filter_classname ) === -1; } );
	new_classlist		= new_classlist.concat( classnamelist );

	return new_classlist.join( ' ' );
}

function classNameAddListIfMissing( element, classnamelist )
{
	var new_classlist, original_classlist;

	original_classlist		= element.className.split( /\s/ ).map( function( filter_classname ) { return trim( filter_classname ); } );
	original_classlist		= original_classlist.filter( function( filter_classname ) { return filter_classname !== ''; } );
	new_classlist			= original_classlist.filter( function( filter_classname ) { return classnamelist.indexOf( filter_classname ) === -1; } );
	new_classlist			= new_classlist.concat( classnamelist );

	new_classlist.sort();
	original_classlist.sort();

	if ( !compareObjects( original_classlist, new_classlist ) )
	{
		element.className = new_classlist.join( ' ' );
	}
}

function classNameRemove( element, classname, allow_regex_in_classname )
{
	var new_classlist, original_classlist;

	original_classlist		= element.className.split( /\s/ ).map( function( filter_classname ) { return trim( filter_classname ); } );
	new_classlist			= original_classlist.filter( function( filter_classname )
	{
		if ( filter_classname === '' )			return false;
		else if ( !allow_regex_in_classname )	return filter_classname !== classname;

		return !filter_classname.match( new RegExp( '(?:^)' + classname + '(?:$)' ) );
	} );

	return new_classlist.join( ' ' );
}

function classNameRemoveIfPresent( element, classname, allow_regex_in_classname )
{
	var new_classlist, original_classlist;

	if ( Array.isArray( classname ) )
	{
		return classNameRemoveListIfPresent( element, classname, allow_regex_in_classname );
	}

	original_classlist		= element.className.split( /\s/ ).map( function( filter_classname ) { return trim( filter_classname ); } );
	original_classlist		= original_classlist.filter( function( filter_classname ) { return filter_classname !== ''; } );
	new_classlist			= original_classlist.filter( function( filter_classname )
	{
		if ( !allow_regex_in_classname )
		{
			return filter_classname !== classname;
		}

		return !filter_classname.match( new RegExp( '(?:^)' + classname + '(?:$)' ) );
	} );

	new_classlist.sort();
	original_classlist.sort();

	if ( !compareObjects( original_classlist, new_classlist ) )
	{
		element.className = new_classlist.join( ' ' );
	}
}

function classNameRemoveList( element, classnamelist, allow_regex_in_classname )
{
	var new_classlist, original_classlist;

	original_classlist		= element.className.split( /\s/ ).map( function( filter_classname ) { return trim( filter_classname ); } );
	new_classlist			= original_classlist.filter( function( filter_classname )
	{
		var i, i_len;

		if ( filter_classname === '' )			return false;
		else if ( !allow_regex_in_classname )	return classnamelist.indexOf( filter_classname ) === -1;

		for ( i = 0, i_len = classnamelist.length; i < i_len; i++ )
		{
			if ( filter_classname.match( new RegExp( '(?:^)' + classnamelist[ i ] + '(?:$)' ) ) )
			{
				return false;
			}
		}

		return true;
	} );

	return new_classlist.join( ' ' );
}

function classNameRemoveListIfPresent( element, classnamelist, allow_regex_in_classname )
{
	var new_classlist, original_classlist;

	original_classlist		= element.className.split( /\s/ ).map( function( filter_classname ) { return trim( filter_classname ); } );
	original_classlist		= original_classlist.filter( function( filter_classname ) { return filter_classname !== ''; } );
	new_classlist			= original_classlist.filter( function( filter_classname )
	{
		var i, i_len;

		if ( !allow_regex_in_classname )
		{
			return classnamelist.indexOf( filter_classname ) === -1;
		}

		for ( i = 0, i_len = classnamelist.length; i < i_len; i++ )
		{
			if ( filter_classname.match( new RegExp( '(?:^)' + classnamelist[ i ] + '(?:$)' ) ) )
			{
				return false;
			}
		}

		return true;
	} );

	new_classlist.sort();
	original_classlist.sort();

	if ( !compareObjects( original_classlist, new_classlist ) )
	{
		element.className = new_classlist.join( ' ' );
	}
}

function computedStyleValue( element, property )
{
	if ( element instanceof Element )
	{
		return window.getComputedStyle( element, null ).getPropertyValue( property )
	}
	else if ( element.ownerDocument && element.ownerDocument.defaultView && element instanceof element.ownerDocument.defaultView.Element )
	{
		return element.ownerDocument.defaultView.getComputedStyle( element, null ).getPropertyValue( property );
	}

	return returnUndefined()
}

function elementExistsInNodeType( element, type )
{
	while ( element )
	{
		if ( element.nodeName.toLowerCase() == type.toLowerCase() )
		{
			return true;
		}

		element = element.parentNode;
	}

	return false;
}

function getNearestElementAncestorNodeTypeOrNull( element, type /* can be comma separated string */ )
{
	var typelist = type.toLowerCase().split( ',' );

	while ( element )
	{
		if ( typelist.indexOf( element.nodeName.toLowerCase() ) != -1 )
		{
			return element;
		}

		element = element.parentNode;
	}

	return null;
}

function getNearestElementAncestorWithStyleValue( element, property, value /* can be comma separated string */ )
{
	var style, valuelist;

	valuelist = value.toLowerCase().split( ',' );

	while ( element )
	{
		style = computedStyleValue( element, property );

		if ( typeof style === 'string' && valuelist.indexOf( style.toLowerCase() ) !== -1 )
		{
			return element;
		}

		element = element.parentNode;
	}

	return null;
}

function getPreviousTreeNode( start_node, root_node )
{
	if ( start_node === root_node )
	{
		return null;
	}
	else if ( start_node.previousSibling )
	{
		if ( start_node.previousSibling.hasChildNodes() )
		{
			return start_node.previousSibling.childNodes[ start_node.previousSibling.childNodes.length - 1 ];
		}

		return start_node.previousSibling;
	}
	else if ( start_node.parentNode && start_node.parentNode !== root_node )
	{
		return start_node.parentNode;
	}

	return null;
}

function getNextTreeNode( start_node, root_node )
{
	var current_node;

	if ( start_node.hasChildNodes() )
	{
		return start_node.childNodes[ 0 ];
	}
	else if ( start_node !== root_node )
	{
		if ( start_node.nextSibling )
		{
			return start_node.nextSibling;
		}
		else
		{
			current_node = start_node;

			while ( current_node = current_node.parentNode )
			{
				if ( current_node === root_node )
				{
					return null;
				}
				else if ( current_node.nextSibling )
				{
					return current_node.nextSibling;
				}
			}
		}
	}

	return null;
}

function getScopedElementsByClassName( className, scope )
{
    var regex_match, all_elements, results, i;
    
    regex_match     = new RegExp( "(?:^|\\s)" + className + "(?:$|\\s)" );
    all_elements    = scope.getElementsByTagName( '*' );
    results         = [];
    
    for ( i = 0; all_elements[ i ] != null; i++ )
    {
        if ( all_elements[ i ].className && ( all_elements[ i ].className.indexOf( className ) != -1 ) && regex_match.test( all_elements[ i ].className ) )
        {
            results.push( all_elements[ i ] );
        }
    }
    
    return results;
}

function getScopedElementByName( name, parent_element )
{
	var i, i_len, children;

	children = parent_element.getElementsByTagName( '*' );

	if ( children )
	{
		for ( i = 0, i_len = children.length; i < i_len; i++ )
		{
			if ( children[ i ].name == name )
			{
				return children[ i ];
			}
		}
	}

	return null;
}

function containsChild( parent_elem, element )
{
	if ( element )
	{
		while ( ( element = element.parentNode ) != null )
		{
			if ( element === parent_elem )
			{
				return true;
			}
		}
	}

	return false;
}

function getScrollOffset( e )
{
	if ( e.type == 'wheel' )									return { x: -e.deltaX, y: -e.deltaY };
	else if ( ( e.deltaX || e.deltaY ) && e.deltaMode == 0 )	return { x: ( e.deltaX ? -e.deltaX : 0 ), y: ( e.deltaY ? -e.deltaY : 0 ) };
	else if ( ( e.deltaX || e.deltaY ) && e.deltaMode != 0 )	return { x: ( e.deltaX ? -e.deltaX * 18 : 0 ), y: ( e.deltaY ? -e.deltaY * 18 : 0 ) };
	else if ( e.wheelDeltaX || e.wheelDeltaY )					return { x: ( originalEvent.wheelDeltaX ? ( originalEvent.wheelDeltaX / 2 ) : 0 ), y: ( originalEvent.wheelDeltaY ? ( originalEvent.wheelDeltaY / 2 ) : ( -originalEvent.wheelDelta / 2 ) ) };
	else if ( e.detail )										return { x: 0, y: -originalEvent.detail * 18 };
	else														return { x: 0, y: ( e.wheelDelta ? e.wheelDelta / 2 : 0 ) };
}

function offsetLeft( element )
{
	var offset = 0;

	while ( element )
	{
		offset += element.offsetLeft;
		element = element.offsetParent;
	}

	return offset;
}

function offsetTop( element )
{
	var offset = 0;

	while ( element )
	{
		offset += element.offsetTop;
		element = element.offsetParent;
	}

	return offset;
}

function testBoxModel()
{
	var div;

	div							= document.createElement( 'div' );
	div.style.width				= '1px';
	div.style.paddingLeft		= '1px';

	document.body.appendChild( div );

	window.boxModelSupported	= div.offsetWidth === 2;
	window.boxModelTested		= true;

	document.body.removeChild( div ).style.display = 'none';
}

function getScrollTop()
{
	if ( !window.boxModelTested ) // box model support must be done after document.body loads
	{
		testBoxModel();
	}

	if ( 'pageYOffset' in window )			return window.pageYOffset;
	else if ( window.boxModelSupported )	return document.documentElement.scrollTop;
	else									return document.body.scrollTop;
}

function getScrollLeft()
{
	if ( !window.boxModelTested ) // box model support must be done after document.body loads
	{
		testBoxModel();
	}

	if ( 'pageXOffset' in window )			return window.pageXOffset;
	else if ( window.boxModelSupported )	return document.documentElement.scrollLeft;
	else									return document.body.scrollLeft;
}

function cursorToEnd( element )
{
	var range;

	element.focus();

    if ( typeof element.selectionStart == 'number' )
	{
        element.selectionStart	= element.value.length;
		element.selectionEnd	= element.value.length;
    }
	else if ( typeof element.createTextRange != 'undefined' )
	{
        range = element.createTextRange();

        range.collapse( false );
        range.select();
    }
}

function clearTextSelection()
{
	var range;

	if ( window.getSelection )
	{
		range = window.getSelection();
		range.removeAllRanges();
	}
	else if ( document.selection && document.body.createTextRange )
	{
		range = document.body.createTextRange();
		range.collapse( true );
		range.select();
	}
}

function keySupportsMultiSelect( e )
{
	if ( e.ctrlKey || e.metaKey ) // In general, e.metaKey is the Command key on Mac and the Windows key on Windows. 
	{
		return true;
	}

	return false;
}

function eventStopPropagation( event )
{
	if ( event.stopPropagation )
	{
		return event.stopPropagation();
	}

	event.cancelBubble = true;
}

function eventPreventDefault( event )
{
	if ( event.preventDefault )
	{
		return event.preventDefault();
	}

	event.returnValue = false;

	return false;
}

function returnUndefined()
{
	return;
}

function AddEvent( obj, eventType, fn )
{
	try
	{
		obj.addEventListener( eventType, fn, false );
		return true;
	}
	catch ( e )
	{
		try
		{
			return obj.attachEvent( 'on' + eventType, fn );
		}
		catch ( e )
		{
			return false;
		}
	}
}

function RemoveEvent( obj, eventType, fn )
{
	try
	{
		obj.removeEventListener( eventType, fn, false );
		return true;
	}
	catch ( e )
	{
		try
		{
			return obj.detachEvent( 'on' + eventType, fn );
		}
		catch ( e )
		{
			return false;
		}
	}
}

function AddScrollEvent( element, original_callback )
{
	var event_type, callback;

	if ( 'onwheel' in document.createElement( 'div' ) )	event_type = 'wheel';			// IE 9+, FF 17+
	else if ( document.onmousewheel !== undefined )		event_type = 'mousewheel';		// IE 8-, Chrome, Safari
	else												event_type = 'DOMMouseScroll';	// FF 16-

	callback = function( originalEvent )
	{
		var event, mousepos;

		mousepos						= captureMousePosition( originalEvent );
		event							= new Object();
		event.target					= originalEvent.target || originalEvent.srcElement;
		event.timeStamp					= originalEvent.timeStamp ? originalEvent.timeStamp : new Date();
		event.eventPhase				= originalEvent.eventPhase;
		event.defaultPrevented			= originalEvent.defaultPrevented;
		event.currentTarget				= originalEvent.currentTarget;
		event.cancelable				= originalEvent.cancelable;
		event.bubbles					= originalEvent.bubbles;
		event.type						= 'wheel';
		event.pageX						= mousepos.x;
		event.pageY						= mousepos.y;
		event.screenX					= originalEvent.screenX;
		event.screenY					= originalEvent.screenY;
		event.clientX					= originalEvent.clientX;
		event.clientY					= originalEvent.clientY;
		event.ctrlKey					= originalEvent.ctrlKey;
		event.altKey					= originalEvent.altKey;
		event.shiftKey					= originalEvent.shiftKey;
		event.metaKey					= originalEvent.metaKey;
		event.button					= originalEvent.button;
		event.relatedTarget				= originalEvent.relatedTarget;
		event.deltaMode					= 0;
		event.deltaZ					= originalEvent.deltaZ || 0;
		event.preventDefault			= function() { originalEvent.preventDefault ? originalEvent.preventDefault() : originalEvent.returnValue = false; };
		event.stopPropagation			= function() { originalEvent.stopPropagation ? originalEvent.stopPropagation() : originalEvent.cancelBubble = true; };
		event.stopImmediatePropagation	= originalEvent.stopImmediatePropagation;
            
		// calculate deltaY (and deltaX) according to the event
		if ( event_type == 'wheel' )
		{
			event.deltaY				= ( originalEvent.deltaMode == 0 ? originalEvent.deltaY : ( originalEvent.deltaMode == 1 ? originalEvent.deltaY * 18 : 0 ) );
			event.deltaX				= ( originalEvent.deltaMode == 0 ? originalEvent.deltaX : ( originalEvent.deltaMode == 1 ? originalEvent.deltaX * 18 : 0 ) );
		}
		else if ( event_type == 'mousewheel' )
		{
			event.deltaY				= ( originalEvent.wheelDeltaY ? ( -originalEvent.wheelDeltaY / 2 ) : ( -originalEvent.wheelDelta / 2 ) );
			event.deltaX				= ( originalEvent.wheelDeltaX ? ( -originalEvent.wheelDeltaX / 2 ) : 0 );
		}
		else
		{
			event.deltaY				= originalEvent.detail * 18;
			event.deltaX				= 0;
		}

		return original_callback( event );
	};
	original_callback.callback			= callback;

	AddEvent( element, event_type, callback );
}

function RemoveScrollEvent( element, original_callback )
{
	var event_type;

	if ( 'onwheel' in document.createElement( 'div' ) )	event_type = 'wheel';			// IE 9+, FF 17+
	else if ( document.onmousewheel !== undefined )		event_type = 'mousewheel';		// IE 8-, Chrome, Safari
	else												event_type = 'DOMMouseScroll';	// FF 16-

	RemoveEvent( element, event_type, original_callback.callback );
	original_callback.callback = null;
}

function regexEscape( text )
{
	return text.replace( new RegExp( '[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]', 'g' ), '\\$&' ); // Compare to PHP's preg_quote function
}

function sortAlphaNumeric( a, b, sort_asc )
{
	var regex_alpha, regex_numeric, replaced_a_alpha, replaced_b_alpha, replaced_a_numeric, replaced_b_numeric;

	regex_alpha				= new RegExp( '[^a-zA-Z]', 'g' );
	regex_numeric			= new RegExp( '[^0-9]', 'g' );

	replaced_a_alpha		= a.replace( regex_alpha, '' );
	replaced_b_alpha		= b.replace( regex_alpha, '' );

	if ( replaced_a_alpha === replaced_b_alpha )
	{
		replaced_a_numeric	= stoi( a.replace( regex_numeric, '' ) );
		replaced_b_numeric	= stoi( b.replace( regex_numeric, '' ) );

		return ( replaced_a_numeric === replaced_b_numeric ) ? 0 : ( ( replaced_a_numeric > replaced_b_numeric ) ? ( sort_asc ? 1 : -1 ) : ( sort_asc ? -1 : 1 ) );
	}

	return ( replaced_a_alpha > replaced_b_alpha ) ? ( sort_asc ? 1 : -1 ) : ( sort_asc ? -1 : 1 );
}

function stringIntersect( string_a, string_b )
{
	var i, j, i_len, j_len, grid, match, temp_string, longest_common_substring;

	match						= '';
	longest_common_substring	= 0;

	if ( string_b.length > string_a.length )
	{
		temp_string				= string_b;
		string_b				= string_a;
		string_a				= temp_string;
	}

    grid = new Array( string_a.length );

	for ( i = 0, i_len = string_a.length; i < i_len; i++ )
	{
		grid[ i ] = new Array( string_b.length );

		for ( j = 0, j_len = string_b.length; j < j_len; j++ )
		{
			grid[ i ][ j ] = 0;
		}
	}

	for ( i = 0, i_len = string_a.length; i < i_len; i++ )
	{
		for ( j = 0, j_len = string_b.length; j < j_len; j++ )
		{
			if ( string_a.charAt( i ) == string_b.charAt( j ) )
			{
				if ( i == 0 || j == 0 )		grid[ i ][ j ] = 1;
				else						grid[ i ][ j ] = grid[ i - 1 ][ j - 1 ] + 1;

				if ( grid[ i ][ j ] > longest_common_substring )
				{
					longest_common_substring	= grid[ i ][ j ];
					match						= '';
				}

				if ( grid[ i ][ j ] == longest_common_substring )
				{
					match = string_a.substring( i - longest_common_substring + 1, i + 1 );
				}
			}
		}
	}

	if ( ( ( string_b.indexOf( match ) == 0 ) && ( string_a.indexOf( match ) == ( string_a.length - match.length ) ) ) ||
		 ( ( string_a.indexOf( match ) == 0 ) && ( string_b.indexOf( match ) == ( string_b.length - match.length ) ) ) )
	{
		return match;
	}

    return '';
}

function textContent( element )
{
	if ( typeof( element.textContent ) != 'undefined' )	return element.textContent;
	if ( typeof( element.innerText ) != 'undefined' )	return element.innerText;

	return '';
}

function captureMousePosition( e ) 
{
	var x, y;
	
	if ( e.pageX || e.pageY ) 
	{
		x = e.pageX;
		y = e.pageY;
	}
	else if ( e.clientX || e.clientY ) 
	{
		x = e.clientX + getScrollLeft();
		y = e.clientY + getScrollTop();
	}

	return { x: x, y: y };
}

function getQueryStringAsArray()
{
	var result, results
	var querystring, regex, element;

	results				= new Array();
	querystring			= document.location.search.substring( 1 );
	regex				= /([^&=]+)=([^&]*)/g;

	while ( ( element = regex.exec( querystring ) ) != null )
	{
		result			= new Object();
		result.name		= element[ 1 ];
		result.value	= element[ 2 ];

		results.push( result );
	}

	return results;
}

function arrayIndexOf( array, element )
{
	var i;

	if ( array.indexOf )
	{
		return array.indexOf( element );
	}

	for ( i = 0; i < array.length; i++ )
	{
		if ( array[ i ] === element )
		{
			return i;
		}
	}

	return -1;
}

function arrayMove( arr, old_index, new_index )
{
	var k;

    while ( old_index < 0 ) old_index += arr.length;
    while ( new_index < 0 ) new_index += arr.length;

    if ( new_index >= arr.length )
    {
        k = new_index - arr.length;
        while ( ( k-- ) + 1 )
        {
            arr.push( undefined );
        }
    }

    arr.splice( new_index, 0, arr.splice( old_index, 1 )[ 0 ] );
}

function arrayFilter( array, func, passed_this )
{
	var i, i_len, value, result;

	if ( array.filter )
	{
		return array.filter( func, passed_this );
	}

	if ( array == null )					throw new TypeError();
	else if ( typeof func !== 'function' )	throw new TypeError();

	result		= new Array();

	for ( i = 0, i_len = array.length; i < i_len; i++ )
	{
		value = array[ i ];
		if ( func.call( passed_this, value, i, array ) )
		{
			result.push( value );
		}
	}

	return result;
}

function arrayFind( array, func, passed_this )
{
	var i, i_len, value;

	if ( array.find )
	{
		return array.find( func, passed_this );
	}

	if ( array == null )					throw new TypeError();
	else if ( typeof func !== 'function' )	throw new TypeError();

	for ( i = 0, i_len = array.length; i < i_len; i++ )
	{
		value = array[ i ];
		if ( func.call( passed_this, value, i, array ) )
		{
			return value;
		}
	}

	return returnUndefined();
}

function compareObjects( obj1, obj2 )
{
	var i, i_len, attribute, obj1_attribute_count, obj2_attribute_count;

	if ( obj1 === obj2 )
	{
		return true;
	}

	if ( obj1 instanceof Array && obj2 instanceof Array )
	{
		if ( obj1.length != obj2.length )
		{
			return false;
		}

		for ( i = 0, i_len = obj1.length; i < i_len; i++ )
		{
			if ( !compareObjects( obj1[ i ], obj2[ i ] ) )
			{
				return false;
			}
		}

		return true;
	}
	else if ( obj1 instanceof Object && obj2 instanceof Object )
	{
		obj1_attribute_count = 0;
		obj2_attribute_count = 0;

		for ( attribute in obj1 )
		{
			if ( obj1.hasOwnProperty( attribute ) )
			{
				if ( !obj2.hasOwnProperty( attribute ) )
				{
					return false;
				}

				obj1_attribute_count++;
			}
		}

		for ( attribute in obj2 )
		{
			if ( obj2.hasOwnProperty( attribute ) )
			{
				if ( !obj1.hasOwnProperty( attribute ) )
				{
					return false;
				}

				obj2_attribute_count++;
			}
		}

		if ( obj1_attribute_count != obj2_attribute_count )
		{
			return false;
		}

		for ( attribute in obj1 )
		{
			if ( obj1.hasOwnProperty( attribute ) )
			{
				if ( !compareObjects( obj1[ attribute ], obj2[ attribute ] ) )
				{
					return false;
				}
			}
		}

		return true;
	}

	return false;
}

function cloneObject( obj )
{
	var obj_copy;
	var i, i_len, attribute;

	if ( ( obj == null ) ||
		 ( typeof obj != 'object' ) )
	{
		return obj;
	}

	if ( obj instanceof Array )
	{
		obj_copy = new Array();

		for ( i = 0, i_len = obj.length; i < i_len; i++ )
		{
			obj_copy[ i ] = cloneObject( obj[ i ] );
		}

		return obj_copy;
	}
	else if ( obj instanceof Object )
	{
		obj_copy = new Object();

		for ( attribute in obj )
		{
			if ( obj.hasOwnProperty( attribute ) )
			{
				obj_copy[ attribute ] = cloneObject( obj[ attribute ] );
			}
		}

		return obj_copy;
	}

	return obj;
}

function encodeentities( input )
{
	var result;

	result	= new String( input );
	result	= result.replace(	/&/g,	'&amp;' );
	result	= result.replace(	/"/g,	'&quot;' );
	result	= result.replace(	/</g,	'&lt;' );
	result	= result.replace(	/>/g,	'&gt;' );
	result	= result.replace(	/\(/g,	'&#40;' );
	result	= result.replace(	/\)/g,	'&#41;' );

	return result;
}

function encodeattribute( text )
{
	var i, i_len, character, character_code, data;

	if ( typeof text !== 'string' )
	{
		return text;
	}

	data = '';

	for ( i = 0, i_len = text.length; i < i_len; i++ )
	{
		character		= text.charAt( i );
		character_code	= text.charCodeAt( i );

		switch ( character )
		{
			case ' '	:
			{
				data += '+';

				break; 
			}
			case '~'	:
			case '`'	:
			case '!'	:
			case '#'	:
			case '$'	:
			case '%'	:
			case '^'	:
			case '&'	:
			case '('	:
			case ')'	:
			case '+'	:
			case '='	:
			case '{'	:
			case '}'	:
			case '['	:
			case ']'	:
			case '|'	:
			case '\\'	:
			case ':'	:
			case ';'	:
			case '"'	:
			case '\''	:
			case '<'	:
			case '>'	:
			case ','	:
			case '?'	:
			case '/'	:
			{
				data += '%' + padl( character_code.toString( 16 ).toUpperCase(), 2, '0' );

				break;
			}
			default		:
			{
				if ( character_code > 0x20 && character_code < 0x7F )	data += character;
				else													data += '%' + padl( character_code.toString( 16 ).toUpperCase(), 2, '0' );

				break;
			}
		}
	}

	return data;
}

function decodeattribute( text )
{
	if ( typeof text !== 'string' )
	{
		return text;
	}
	
	return decodeURIComponent( text.replace( new RegExp( regexEscape( '+' ), 'g' ), ' ' ) );
}

function trim( value )
{
	if ( typeof value !== 'string' )	return value;
	else								return value.replace( /^\s+|\s+$/g, '' );
}

function GetNormalizedValue( value )
{
	// Normalize line breaks in value string

	if ( typeof value !== 'string' )
	{
		return '';
	}

	value = value.replace( /\r\n/gm,	'\n' );
	value = value.replace( /\r/gm,		'\n' );
	value = value.replace( /\n/gm,		'\r\n' );

	return value;
}

function padl( string, length, character )
{
	var pad;

	length		= stoi_def( length, 0 );
	pad			= new Array( Math.ceil( length / character.length ) + 1 ).join( character ); // More efficient for longer strings than a while loop

	if ( typeof string !== 'string' )
	{
		string	= "" + string;
	}

	if ( string.length >= length )
	{
		return string;
	}

	return pad.substring( 0, length - string.length ) + string;
}

function padr( string, length, character )
{
	var pad;

	length		= stoi_def( length, 0 );
	pad			= new Array( Math.ceil( length / character.length ) + 1 ).join( character ); // More efficient for longer strings than a while loop

	if ( typeof string !== 'string' )
	{
		string	= "" + string;
	}

	if ( string.length >= length )
	{
		return string;
	}

	return string + pad.substring( 0, length - string.length );
}

function stob( value )
{
	if ( typeof value !== 'string' )
	{
		return value ? true : false;
	}

	value = value.toLowerCase();

	return ( value === '' || value === '0' || value === 'no' || value === 'false' ) ? false : true;
}

function stoi( value )
{
	return parseInt( value, 10 );
}

function stoi_def( value, default_value )
{
	value = stoi( value );

	return ( ( isNaN( value ) || value == Number.POSITIVE_INFINITY || value == Number.NEGATIVE_INFINITY ) ? default_value : value );
}

function stoi_def_nonneg( value, default_value )
{
	value = stoi( value );

	return ( ( isNaN( value ) || ( value < 0 ) || value == Number.POSITIVE_INFINITY || value == Number.NEGATIVE_INFINITY ) ? default_value : value );
}

function stoi_min( value, min_value )
{
	value = stoi( value );

	return ( ( isNaN( value ) || ( value < min_value ) || value == Number.POSITIVE_INFINITY || value == Number.NEGATIVE_INFINITY ) ? min_value : value );
}

function stoi_max( value, max_value )
{
	value = stoi( value );

	return ( ( isNaN( value ) || ( value > max_value ) || value == Number.POSITIVE_INFINITY || value == Number.NEGATIVE_INFINITY ) ? max_value : value );
}

function stoi_range( value, min_value, max_value, default_value )
{
	return stoi_min( stoi_max( stoi_def( value, default_value ), max_value ), min_value );
}

function stod( value )
{
	return parseFloat( value );
}

function stod_def( value, default_value )
{
	value = stod( value );

	return ( ( isNaN( value ) || value == Number.POSITIVE_INFINITY || value == Number.NEGATIVE_INFINITY ) ? default_value : value );
}

function stod_def_nonneg( value, default_value )
{
	value = stod( value );

	return ( ( isNaN( value ) || ( value < 0 ) || value == Number.POSITIVE_INFINITY || value == Number.NEGATIVE_INFINITY ) ? default_value : value );
}

function stod_min( value, min_value )
{
	value = stod( value );

	return ( ( isNaN( value ) || ( value < min_value ) || value == Number.POSITIVE_INFINITY || value == Number.NEGATIVE_INFINITY ) ? min_value : value );
}

function stod_max( value, max_value )
{
	value = stod( value );

	return ( ( isNaN( value ) || ( value > max_value ) || value == Number.POSITIVE_INFINITY || value == Number.NEGATIVE_INFINITY ) ? max_value : value );
}

function stod_range( value, min_value, max_value, default_value )
{
	return stod_min( stod_max( stod_def( value, default_value ), max_value ), min_value );
}

function ValueIsEmpty( value )
{
	if ( value === null )										return true;
	else if ( typeof value === 'object' )						return Object.keys( value ).length === 0 && value.constructor === Object;
	else if ( typeof value === 'undefined' )					return true;
	else if ( typeof value === 'string' && value.length == 0 )	return true;

	// type is boolean, number, function, non-zero length string, etc
	return false;
}

function getMonthName_Abbreviated( date )
{
	switch ( date.getMonth() )
	{
		case 0:		return 'Jan';
		case 1:		return 'Feb';
		case 2:		return 'Mar';
		case 3:		return 'Apr';
		case 4:		return 'May';
		case 5:		return 'Jun';
		case 6:		return 'Jul';
		case 7:		return 'Aug';
		case 8:		return 'Sep';
		case 9:		return 'Oct';
		case 10:	return 'Nov';
		case 11:	return 'Dec';
	}
}

/*
 * Note: This function is also present (with a different name) in ajax.js and v55_ui.js.
 *		 Modifications here should be made in those other locations as well.
 */

function isUnicode()
{
	return ( document.characterSet || document.charset || '' ).search( 'UTF' ) == 0 ? true : false;
}

/*
 * Note: This function is also present (with a different name) in ajax.js and v55_ui.js.
 *		 Modifications here should be made in those other locations as well.
 */

function CharsetEncodeAttribute( instring )
{
	var encoded;

	if ( isUnicode() )
	{
		return encodeURIComponent( instring );
	}
	else
	{
		if ( typeof escape === 'function' )
		{
			encoded = escape( instring );
			encoded = encoded.replace( '+', '%2B' );
			encoded = encoded.replace( '/', '%2F' );
			encoded = encoded.replace( '@', '%40' );

			return encoded;
		}
		else
		{
			return instring;
		}
	}
}

function CharsetDecodeAttribute( instring )
{
	if ( isUnicode() )
	{
		return decodeattribute( instring );
	}
	else
	{
		if ( typeof unescape === 'function' )	return unescape( instring );
		else									return instring;
	}
}

( function( global )
{
	global.getVariableType = function( variable )
	{
		// Return a more accurate representation of a variable's type based on the
		// passed in [[Class]], when possible. If variable is null, return 'null'.
		// If variable is undefined, return 'undefined'. If variable is global (such
		// as the window), pass back global, otherwise, pass back the parsed toString
		// value from Object.prototype.toString, which gives us a more detailed
		// object type [object Array], [object Date], etc. While not a perfect solution
		// for every case, this will give us a much more accurate value than
		// JavaScript's builtin "typeof" operator. The anonymous wrapper function
		// ensures we receive the "global" context for later comparison

		if ( variable === null )			return 'null';		// true null
		else if ( variable == null )		return 'undefined';	// Undefined variable
		else if ( variable === global )		return 'global';	// global object, such as window
		else 								return Object.prototype.toString.call( variable ).match( /\s([a-zA-Z]+)/)[ 1 ].toLowerCase();
	}
}( this ) );
// Miva Merchant
//
// This file and the source codes contained herein are the property of
// Miva, Inc.  Use of this file is restricted to the specific terms and
// conditions in the License Agreement associated with this file.  Distribution
// of this file or portions of this file for uses not covered by the License
// Agreement is not allowed without a written agreement signed by an officer of
// Miva, Inc.
//
// Copyright 1998-2019 Miva, Inc.  All rights reserved.
// http://www.miva.com
//

// Misc HTML/JavaScript functions
////////////////////////////////////////////////////

function MMProdList_FormElement_Value( element )
{
	var node, type;

	if ( element && element.nodeType === 1 )
	{
		node = element.nodeName.toLowerCase();

		if ( node == 'textarea' )
		{
			return element.value;
		}
		else if ( node == 'select' )
		{
			return ( element.selectedIndex != -1 && element.options[ element.selectedIndex ] ? element.options[ element.selectedIndex ].value : '' );
		}
		else if ( node == 'input' )
		{
			type = element.type.toLowerCase();

			if ( type == 'text' || type == 'hidden' )
			{
				return element.value;
			}
			else if ( type == 'radio' && element.checked )
			{
				return element.value;
			}
			else if ( type == 'checkbox' )
			{
				return element.checked ? element.value : '';
			}
		}
	}

	return '';
}

function MMProdList_AddNestedFacetValue( element, code, value, submit_delay )
{
	var form, entry;

	if ( element.form )																	form = element.form;
	else if ( !( form = getNearestElementAncestorNodeTypeOrNull( element, 'FORM' ) ) )	return;

	if ( !form.mmprodlist_updatequery_form_data )
	{
		form.mmprodlist_updatequery_form_data = new Array();
	}

	entry							= new Object();
	entry.element					= element;
	entry.onParametersGenerated		= function( form_params_struct, url_params_struct )
	{
		if ( form_params_struct[ code ] )
		{
			form_params_struct[ code ].values.push( value );
		}
		else if ( url_params_struct[ code ] )
		{
			url_params_struct[ code ].values.push( value );
		}
		else
		{
			form_params_struct[ code ]			= new Object();
			form_params_struct[ code ].name		= code;
			form_params_struct[ code ].values	= new Array();
			form_params_struct[ code ].values.push( value );
		}
	};

	form.mmprodlist_updatequery_form_data.push( entry );
	MMProdList_UpdateQuery_SubmitParameters_Timeout( form, submit_delay );
}

function MMProdList_RemoveNestedFacetValue( element, code, value, submit_delay )
{
	var form, entry;

	if ( element.form )																	form = element.form;
	else if ( !( form = getNearestElementAncestorNodeTypeOrNull( element, 'FORM' ) ) )	return;

	if ( !form.mmprodlist_updatequery_form_data )
	{
		form.mmprodlist_updatequery_form_data = new Array();
	}

	entry							= new Object();
	entry.element					= element;
	entry.onParametersGenerated		= function( form_params_struct, url_params_struct )
	{
		var i, i_len;

		if ( form_params_struct[ code ] )
		{
			for ( i = 0, i_len = form_params_struct[ code ].values.length; i < i_len; i++ )
			{
				if ( form_params_struct[ code ].values[ i ] == value )
				{
					form_params_struct[ code ].values.splice( i, form_params_struct[ code ].values.length - i );

					break;
				}
			}
		}

		if ( url_params_struct[ code ] )
		{
			for ( i = 0, i_len = url_params_struct[ code ].values.length; i < i_len; i++ )
			{
				if ( url_params_struct[ code ].values[ i ] == value )
				{
					url_params_struct[ code ].values.splice( i, url_params_struct[ code ].values.length - i );

					break;
				}
			}
		}
	};

	form.mmprodlist_updatequery_form_data.push( entry );
	MMProdList_UpdateQuery_SubmitParameters_Timeout( form, submit_delay );
}

function MMProdList_UpdateQuery( element, submit_delay )
{
	var form, entry;

	if ( element.form )																	form = element.form;
	else if ( !( form = getNearestElementAncestorNodeTypeOrNull( element, 'FORM' ) ) )	return;

	if ( !form.mmprodlist_updatequery_form_data )
	{
		form.mmprodlist_updatequery_form_data = new Array();
	}

	entry							= new Object();
	entry.element					= element;
	entry.onParametersGenerated		= null;

	form.mmprodlist_updatequery_form_data.push( entry );
	MMProdList_UpdateQuery_SubmitParameters_Timeout( form, submit_delay );
}

function MMProdList_UpdateQueryBuildParameters( form )
{
	var i, j, name, query, regex, match, value, i_len, j_len, params, member, element;
	var url_param, url_params_struct, form_params_struct, params_output_array, merged_params_struct;

	params				= new Array();
	url_params_struct	= new Object();
	form_params_struct	= new Object();
	params_output_array	= new Array();

	query				= window.location.search.substring( 1 );
	regex				= /([^=&?]+)=([^&]+)/g;

	while ( ( match = regex.exec( query ) ) !== null )
	{
		name	= CharsetDecodeAttribute( match[ 1 ] );
		value	= CharsetDecodeAttribute( match[ 2 ] );

		if ( name == 'Offset'			||
			 name == 'SearchOffset'		||
			 name == 'RelatedOffset' 	||
			 name == 'CatListingOffset' ||
			 name == 'AllOffset' )
		{
			continue;
		}

		// Handle single-value inputs that are disabled by excluding them from url_params.  Handles rangesliders that
		// wouldn't be covered in the code below because the values don't match.

		if ( !form.elements[ name ] || ( typeof form.elements[ name ] !== 'object' ) || !form.elements[ name ].disabled )
		{
			if ( !url_params_struct[ name ] )
			{
				url_params_struct[ name ]			= new Object();
				url_params_struct[ name ].name		= name;
				url_params_struct[ name ].values	= new Array();
			}

			url_params_struct[ name ].values.push( value );
		}
	}

	for ( i = 0, i_len = form.elements.length; i < i_len; i++ )
	{
		if ( form.elements[ i ].disabled )
		{
			// Remove this particular value from the url_params, if it is present, and do
			// not add this value to the form_params.

			url_param = url_params_struct[ form.elements[ i ].name ];
			if ( url_param )
			{
				for ( j = 0, j_len = url_param.values.length; j < j_len; j++ )
				{
					if ( url_param.values[ j ] == form.elements[ i ].value )
					{
						url_param.values.splice( j, 1 );
						break;
					}
				}
			}

			continue;
		}

		if ( ( typeof form.elements[ i ].name === 'string' ) && form.elements[ i ].name.length )
		{
			if ( !form_params_struct[ form.elements[ i ].name ] )
			{
				form_params_struct[ form.elements[ i ].name ]			= new Object();
				form_params_struct[ form.elements[ i ].name ].name		= form.elements[ i ].name;
				form_params_struct[ form.elements[ i ].name ].values	= new Array();
			}

			form_params_struct[ form.elements[ i ].name ].values.push( MMProdList_FormElement_Value( form.elements[ i ] ) );
		}
	}

	if ( form.mmprodlist_updatequery_form_data )
	{
		for ( i = 0, i_len = form.mmprodlist_updatequery_form_data.length; i < i_len; i++ )
		{
			element = form.mmprodlist_updatequery_form_data[ i ].element;

			if ( !element.disabled && ( typeof element.name === 'string' ) && element.name.length && !form_params_struct[ element.name ] )
			{
				form_params_struct[ element.name ]			= new Object();
				form_params_struct[ element.name ].name		= element.name;
				form_params_struct[ element.name ].values	= new Array();

				form_params_struct[ element.name ].values.push( MMProdList_FormElement_Value( element ) );
			}

			if ( typeof form.mmprodlist_updatequery_form_data[ i ].onParametersGenerated === 'function' )
			{
				form.mmprodlist_updatequery_form_data[ i ].onParametersGenerated( form_params_struct, url_params_struct )
			}
		}
	}

	merged_params_struct = url_params_struct;

	for ( member in form_params_struct )
	{
		if ( form_params_struct.hasOwnProperty( member ) )
		{
			merged_params_struct[ member ] = form_params_struct[ member ];
		}
	}

	for ( member in merged_params_struct )
	{
		if ( merged_params_struct.hasOwnProperty( member ) )
		{
			params.push( merged_params_struct[ member ] );
		}
	}

	return params;
}

function MMProdList_UpdateQuery_SubmitParameters( form, params )
{
	var i, j, i_len, j_len, elements, params_output_array;

	if ( window.mmprodlist_updatequery_submitparameters_submitted )
	{
		return;
	}

	window.mmprodlist_updatequery_submitparameters_submitted	= true;
	params_output_array											= new Array();

	params.sort( function( a, b ) { return sortAlphaNumeric( a.name, b.name, true ); } );

	for ( i = 0, i_len = params.length; i < i_len; i++ )
	{
		for ( j = 0, j_len = params[ i ].values.length; j < j_len; j++ )
		{
			if ( params[ i ].values[ j ].length )
			{
				params_output_array.push( encodeURIComponent( params[ i ].name ) + '=' + encodeURIComponent( params[ i ].values[ j ] ) );
			}
		}
	}

	if ( window.mmprodlist_updatequery_submitparameters_timeout )
	{
		clearTimeout( window.mmprodlist_updatequery_submitparameters_timeout );
		delete window.mmprodlist_updatequery_submitparameters_timeout;
	}

	if ( window.mmprodlist_updatequery_submitparameters_timeout_event_attached )
	{
		elements = form.getElementsByTagName( '*' );

		for ( i = 0, i_len = elements.length; i < i_len; i++ )
		{
			RemoveEvent( elements[ i ], 'mousedown',	window.mmprodlist_updatequery_submitparameters_timeout_event_function );
			RemoveEvent( elements[ i ], 'mousemove',	window.mmprodlist_updatequery_submitparameters_timeout_event_function );
			RemoveEvent( elements[ i ], 'mouseup',		window.mmprodlist_updatequery_submitparameters_timeout_event_function );
		}
	}

	window.location.href = [ window.location.protocol, '//', window.location.host, window.location.pathname ].join( '' ) + ( params_output_array.length ? ( '?' + params_output_array.join( '&' ) ) : '' );
}

// Overridable: If different timeout functionality is desired, override
// the following function "MMProdList_UpdateQuery_SubmitParameters_Timeout"

function MMProdList_UpdateQuery_SubmitParameters_Timeout( form, submit_delay )
{
	var i, i_len, elements;

	submit_delay = stoi_def_nonneg( submit_delay, 0 )

	if ( window.mmprodlist_updatequery_submitparameters_timeout )
	{
		clearTimeout( window.mmprodlist_updatequery_submitparameters_timeout );
		delete window.mmprodlist_updatequery_submitparameters_timeout;
	}

	if ( submit_delay === 0 )
	{
		return MMProdList_UpdateQuery_SubmitParameters_LowLevel( form );
	}

	window.mmprodlist_updatequery_submitparameters_timeout = setTimeout( function() { MMProdList_UpdateQuery_SubmitParameters_LowLevel( form ); }, submit_delay );

	if ( !window.mmprodlist_updatequery_submitparameters_timeout_event_attached )
	{
		window.mmprodlist_updatequery_submitparameters_timeout_event_attached = true;
		window.mmprodlist_updatequery_submitparameters_timeout_event_function = function( event ) { MMProdList_UpdateQuery_SubmitParameters_Timeout( form, submit_delay ); };

		elements = form.getElementsByTagName( '*' );

		for ( i = 0, i_len = elements.length; i < i_len; i++ )
		{
			AddEvent( elements[ i ], 'mousedown',	window.mmprodlist_updatequery_submitparameters_timeout_event_function );
			AddEvent( elements[ i ], 'mousemove',	window.mmprodlist_updatequery_submitparameters_timeout_event_function );
			AddEvent( elements[ i ], 'mouseup',		window.mmprodlist_updatequery_submitparameters_timeout_event_function );
		}
	}
}

function MMProdList_UpdateQuery_SubmitParameters_LowLevel( form )
{
	var params = MMProdList_UpdateQueryBuildParameters( form );

	MMProdList_UpdateQuery_Notify_Updating( form );
	MMProdList_UpdateQuery_SubmitParameters( form, params );
}

// Overridable: If different notification functionality is desired, override
// the following function "MMProdList_UpdateQuery_Notify_Updating"

function MMProdList_UpdateQuery_Notify_Updating( form )
{
	var i, i_len;

	for ( i = 0, i_len = form.elements.length; i < i_len; i++ )
	{
		form.elements[ i ].setAttribute( 'disabled', 'disabled' );
	}
}

function MMFacet_RangeSlider_Initialize()
{
	var i, name, i_len, module_code, facet_code, elementlist, range_low, range_high, allow_value_input, selected_range_low, selected_range_high;

	elementlist = document.querySelectorAll( '[data-mm-facet-rangeslider-name]' );

	for ( i = 0, i_len = elementlist.length; i < i_len; i++ )
	{
		module_code				= elementlist[ i ].getAttribute( 'data-mm-facet-module-code' );
		facet_code				= elementlist[ i ].getAttribute( 'data-mm-facet-code' );
		name					= elementlist[ i ].getAttribute( 'data-mm-facet-rangeslider-name' );
		range_low				= stod_def( elementlist[ i ].getAttribute( 'data-mm-facet-rangeslider-range-low' ), 0 );
		range_high				= stod_def( elementlist[ i ].getAttribute( 'data-mm-facet-rangeslider-range-high' ), 0 );
		selected_range_low		= stod_def( elementlist[ i ].getAttribute( 'data-mm-facet-rangeslider-selected-range-low' ), 0 );
		selected_range_high		= stod_def( elementlist[ i ].getAttribute( 'data-mm-facet-rangeslider-selected-range-high' ), range_high );

		if ( elementlist[ i ].hasAttribute( 'data-mm-facet-rangeslider-allow-value-input' ) )	allow_value_input = elementlist[ i ].getAttribute( 'data-mm-facet-rangeslider-allow-value-input' ).toLowerCase();
		else																					allow_value_input = 'No';

		elementlist[ i ].mm_facet_rangeslider = new MMFacet_RangeSlider( elementlist[ i ], module_code, facet_code, name, range_low, range_high, selected_range_low, selected_range_high, allow_value_input === 'yes' || allow_value_input === '1' || allow_value_input === 'true' );
	}
}

// MMFacet_RangeSlider
////////////////////////////////////////////////////

function MMFacet_RangeSlider( element_parent, module_code, facet_code, name, range_low, range_high, selected_range_low, selected_range_high, allow_value_input )
{
	var self = this;

	this.element_parent								= element_parent;
	this.module_code								= module_code;
	this.facet_code									= facet_code;
	this.name										= name;
	this.range_low									= range_low;
	this.range_high									= range_high;
	this.range_span									= range_high - range_low;
	this.selected_range_low							= selected_range_low;
	this.selected_range_high						= selected_range_high;
	this.allow_value_input							= allow_value_input;

	this.shouldrender								= false;
	this.slider_position_low						= 0;
	this.slider_position_high						= 0;
	this.original_value								= this.selected_range_low + '-' + this.selected_range_high;

	this.element_parent.innerHTML					= '';

	this.element_value								= newElement( 'input',	{ 'type': 'hidden', 'name': name },							null, this.element_parent );
	this.element_input_container_low				= newElement( 'span',	{ 'class': 'mm_facet_rangeslider_input_container_low' },	null, this.element_parent );
	this.element_track_container					= newElement( 'span',	{ 'class': 'mm_facet_rangeslider_track_container' },		null, this.element_parent );
	this.element_track								= newElement( 'span',	{ 'class': 'mm_facet_rangeslider_track' },					null, this.element_track_container );
	this.element_track_background					= newElement( 'span',	{ 'class': 'mm_facet_rangeslider_track_background' },		null, this.element_track );
	this.element_track_selection					= newElement( 'span',	{ 'class': 'mm_facet_rangeslider_track_selection' },		null, this.element_track );
	this.element_track_handle_low					= newElement( 'span',	{ 'class': 'mm_facet_rangeslider_track_handle_low' },		null, this.element_track );
	this.element_track_handle_high					= newElement( 'span',	{ 'class': 'mm_facet_rangeslider_track_handle_high' },		null, this.element_track );
	this.element_input_container_high				= newElement( 'span',	{ 'class': 'mm_facet_rangeslider_input_container_high' },	null, this.element_parent );

	if ( !this.allow_value_input )
	{
		this.element_label_low						= newElement( 'span',	{ 'class': 'mm_facet_rangeslider_input' },					null, this.element_input_container_low );
		this.element_label_high						= newElement( 'span',	{ 'class': 'mm_facet_rangeslider_input' },					null, this.element_input_container_high );
	}
	else
	{
		this.element_input_low						= newElement( 'input',	{ 'type': 'text', 'class': 'mm_facet_rangeslider_input' },	null, this.element_input_container_low );
		this.element_input_high						= newElement( 'input',	{ 'type': 'text', 'class': 'mm_facet_rangeslider_input' },	null, this.element_input_container_high );

		this.event_keydown_input					= function( event ) { return self.Event_KeyDown_Input( event ? event : window.event ); };
		this.event_focus_input_low					= function( event ) { return self.Event_Focus_Input_Low( event ? event : window.event ); };
		this.event_blur_input_low					= function( event ) { return self.Event_Blur_Input_Low( event ? event : window.event ); };
		this.event_focus_input_high					= function( event ) { return self.Event_Focus_Input_High( event ? event : window.event ); };
		this.event_blur_input_high					= function( event ) { return self.Event_Blur_Input_High( event ? event : window.event ); };
		this.event_click_input_container_low		= function( event ) { return self.Event_Click_Input_Container_Low( event ? event : window.event ); };
		this.event_click_input_container_high		= function( event ) { return self.Event_Click_Input_Container_High( event ? event : window.event ); };

		AddEvent( this.element_input_low,				'keydown',		this.event_keydown_input );
		AddEvent( this.element_input_low,				'focus',		this.event_focus_input_low );
		AddEvent( this.element_input_low,				'blur',			this.event_blur_input_low );
		AddEvent( this.element_input_high,				'keydown',		this.event_keydown_input );
		AddEvent( this.element_input_high,				'focus',		this.event_focus_input_high );
		AddEvent( this.element_input_high,				'blur',			this.event_blur_input_high );
		AddEvent( this.element_input_container_low,		'click',		this.event_click_input_container_low );
		AddEvent( this.element_input_container_high,	'click',		this.event_click_input_container_high );
	}

	this.event_render								= function() { self.Render(); };
	this.event_returnfalse							= function() { return false; };

	this.event_mousedown_handle_low					= function( event ) { return self.Event_MouseDown_Handle_Low( event ? event : window.event ); };
	this.event_mousedown_handle_high				= function( event ) { return self.Event_MouseDown_Handle_High( event ? event : window.event ); };
	this.event_mousemove_handle_low					= function( event ) { return self.Event_MouseMove_Handle_Low( event ? event : window.event ); };
	this.event_mousemove_handle_high				= function( event ) { return self.Event_MouseMove_Handle_High( event ? event : window.event ); };
	this.event_mouseup_handle_low					= function( event ) { return self.Event_MouseUp_Handle_Low( event ? event : window.event ); };
	this.event_mouseup_handle_high					= function( event ) { return self.Event_MouseUp_Handle_High( event ? event : window.event ); };

	this.event_touchstart_handle_low				= function( event ) { return self.Event_TouchStart_Handle_Low( event ? event : window.event ); };
	this.event_touchstart_handle_high				= function( event ) { return self.Event_TouchStart_Handle_High( event ? event : window.event ); };
	this.event_touchmove_handle_low					= function( event ) { return self.Event_TouchMove_Handle_Low( event ? event : window.event ); };
	this.event_touchmove_handle_high				= function( event ) { return self.Event_TouchMove_Handle_High( event ? event : window.event ); };
	this.event_touchend_handle_low					= function( event ) { return self.Event_TouchEnd_Handle_Low( event ? event : window.event ); };
	this.event_touchend_handle_high					= function( event ) { return self.Event_TouchEnd_Handle_High( event ? event : window.event ); };

	AddEvent( this.element_track_handle_low,			'mousedown',	this.event_mousedown_handle_low );
	AddEvent( this.element_track_handle_high,			'mousedown',	this.event_mousedown_handle_high );

	AddEvent( this.element_track_handle_low,			'touchstart',	this.event_touchstart_handle_low );
	AddEvent( this.element_track_handle_high,			'touchstart',	this.event_touchstart_handle_high );

	this.SetSelectedRange( this.selected_range_low, this.selected_range_high );
	this.RequestRender();
}

MMFacet_RangeSlider.prototype.FormatValues = function( low, high )
{
	var value_low, value_high, slider_rect, handle_rect, slider_length, available_handle_length;

	slider_rect						= this.element_track.getBoundingClientRect();
	handle_rect						= this.element_track_handle_low.getBoundingClientRect();
	slider_length					= ( slider_rect.right - slider_rect.left );
	available_handle_length			= slider_length - ( handle_rect.right - handle_rect.left + 2 );

	value_low						= stoi_def( Math.round( this.range_low + stod_def( stod_range( ( ( low / available_handle_length ) * slider_length ) / slider_length, 0, 1 ) * this.range_span, 0 ) ), 0 );
	value_high						= stoi_def( Math.round( this.range_low + stod_def( stod_range( ( ( high / available_handle_length ) * slider_length ) / slider_length, 0, 1 ) * this.range_span, 0 ) ), 0 );

	this.FormatValues_LowLevel( value_low, value_high );
}

MMFacet_RangeSlider.prototype.FormatValues_LowLevel = function( value_low, value_high )
{
	var tmp_low;

	if ( value_low > value_high )
	{
		tmp_low								= value_low;
		value_low							= value_high;
		value_high							= tmp_low;
	}

	this.element_value.value				= value_low + '-' + value_high;
	this.element_value.disabled				= ( value_low == this.range_low && value_high == this.range_high ) ? true : false;

	if ( this.allow_value_input )
	{
		this.element_input_low.value		= MMFacet_RangeSlider_FormatValue( this.module_code, this.facet_code, value_low );
		this.element_input_high.value		= MMFacet_RangeSlider_FormatValue( this.module_code, this.facet_code, value_high );
	}
	else
	{
		this.element_label_low.innerHTML	= MMFacet_RangeSlider_FormatValue( this.module_code, this.facet_code, value_low );
		this.element_label_high.innerHTML	= MMFacet_RangeSlider_FormatValue( this.module_code, this.facet_code, value_high );
	}
}

MMFacet_RangeSlider.prototype.SetSelectedRange = function( low, high )
{
	var slider_rect, handle_rect, slider_length, available_handle_length;

	slider_rect					= this.element_track.getBoundingClientRect();
	handle_rect					= this.element_track_handle_low.getBoundingClientRect();
	slider_length				= ( slider_rect.right - slider_rect.left );
	available_handle_length		= slider_length - ( handle_rect.right - handle_rect.left + 2 );

	this.slider_position_low	= stod_def( ( ( ( ( low - this.range_low ) / this.range_span ) * slider_length ) / slider_length ) * available_handle_length, 0 );
	this.slider_position_high	= stod_def( ( ( ( ( high - this.range_low ) / this.range_span ) * slider_length ) / slider_length ) * available_handle_length, 0 );

	this.FormatValues_LowLevel( low, high );
}

MMFacet_RangeSlider.prototype.Event_Click_Input_Container_Low = function( e )
{
	var rect, mousepos, scrollfromtop, scrollfromleft;

	rect			= this.element_input_low.getBoundingClientRect();
	mousepos		= captureMousePosition( e );
	scrollfromtop	= getScrollTop();
	scrollfromleft	= getScrollLeft();

	if ( mousepos.y < ( rect.top + scrollfromtop ) 								||
		 mousepos.y > ( rect.top + ( rect.bottom - rect.top ) + scrollfromtop )	||
		 mousepos.x < ( rect.left + scrollfromleft ) 							||
		 mousepos.x > ( rect.left + ( rect.right - rect.left ) + scrollfromleft ) )
	{
		this.element_input_low.focus();
	}
}

MMFacet_RangeSlider.prototype.Event_Click_Input_Container_High = function( e )
{
	var rect, mousepos, scrollfromtop, scrollfromleft;

	rect			= this.element_input_high.getBoundingClientRect();
	mousepos		= captureMousePosition( e );
	scrollfromtop	= getScrollTop();
	scrollfromleft	= getScrollLeft();

	if ( mousepos.y < ( rect.top + scrollfromtop ) 								||
		 mousepos.y > ( rect.top + ( rect.bottom - rect.top ) + scrollfromtop )	||
		 mousepos.x < ( rect.left + scrollfromleft ) 							||
		 mousepos.x > ( rect.left + ( rect.right - rect.left ) + scrollfromleft ) )
	{
		this.element_input_high.focus();
	}
}

MMFacet_RangeSlider.prototype.Event_Focus_Input_Low = function( e )
{
	this.element_input_container_low.className = classNameAdd( this.element_input_container_low, 'mm_facet_rangeslider_input_active' );
}

MMFacet_RangeSlider.prototype.Event_Blur_Input_Low = function( e )
{
	this.element_input_container_low.className = classNameRemove( this.element_input_container_low, 'mm_facet_rangeslider_input_active' );
	this.SetSelectedRange( stod_def( this.element_input_low.value.replace( /[^\d.-]/g, '' ), 0 ), stod_def( this.element_input_high.value.replace( /[^\d.-]/g, '' ), 0 ) );
	this.RequestRender();
	this.Submit();
}

MMFacet_RangeSlider.prototype.Event_Focus_Input_High = function( e )
{
	this.element_input_container_high.className = classNameAdd( this.element_input_container_high, 'mm_facet_rangeslider_input_active' );
}

MMFacet_RangeSlider.prototype.Event_Blur_Input_High = function( e )
{
	this.element_input_container_high.className = classNameRemove( this.element_input_container_high, 'mm_facet_rangeslider_input_active' );
	this.SetSelectedRange( stod_def( this.element_input_low.value.replace( /[^\d.-]/g, '' ), 0 ), stod_def( this.element_input_high.value.replace( /[^\d.-]/g, '' ), 0 ) );
	this.RequestRender();
	this.Submit();
}

MMFacet_RangeSlider.prototype.Event_KeyDown_Input = function( e )
{
	var keycode = e.keyCode || e.which;

	if ( keycode == 13 )
	{
		this.SetSelectedRange( stod_def( this.element_input_low.value.replace( /[^\d.-]/g, '' ), 0 ), stod_def( this.element_input_high.value.replace( /[^\d.-]/g, '' ), 0 ) );
		this.RequestRender();
		this.Submit();
	}

	return true;
}

MMFacet_RangeSlider.prototype.Event_MouseDown_Handle_Low = function( e )
{
	var mousepos;

	AddEvent( window, 'mousemove', this.event_mousemove_handle_low );
	AddEvent( window, 'mouseup', this.event_mouseup_handle_low );
	AddEvent( window, 'blur', this.event_mouseup_handle_low );

	mousepos							= captureMousePosition( e );
	this.slider_started					= true;
	this.slider_target					= e.target ? e.target : e.srcElement;
	this.slider_startpos_low			= mousepos.x;
	this.slider_originalposition_low	= this.element_track_handle_low.getBoundingClientRect().left - this.element_track.getBoundingClientRect().left;

	clearTextSelection();
	document.body.focus();
	document.body.unselectable			= 'on';
	document.onselectstart				= this.event_returnfalse;
	this.slider_target.ondragstart		= this.event_returnfalse;

	if ( this.slider_target.setCapture )
	{
		this.slider_target.setCapture();
	}

	eventStopPropagation( e );
	return eventPreventDefault( e );
}

MMFacet_RangeSlider.prototype.Event_MouseMove_Handle_Low = function( e )
{
	var mousepos, slider_rect, handle_rect, slider_length, available_handle_length;

	if ( this.slider_started )
	{
		eventPreventDefault( e );
		this.slider_started		= false;
	}

	mousepos					= captureMousePosition( e );
	slider_rect					= this.element_track.getBoundingClientRect();
	handle_rect					= this.element_track_handle_low.getBoundingClientRect();
	slider_length				= ( slider_rect.right - slider_rect.left );
	available_handle_length		= slider_length - ( handle_rect.right - handle_rect.left + 2 );
	this.slider_position_low	= stod_range( this.slider_originalposition_low + ( mousepos.x - this.slider_startpos_low ), 0, available_handle_length );

	clearTextSelection();
	this.RequestRender();

	eventStopPropagation( e );
	return eventPreventDefault( e );
}

MMFacet_RangeSlider.prototype.Event_MouseUp_Handle_Low = function( e )
{
	RemoveEvent( window, 'mousemove', this.event_mousemove_handle_low );
	RemoveEvent( window, 'mouseup', this.event_mouseup_handle_low );
	RemoveEvent( window, 'blur', this.event_mouseup_handle_low );

	this.slider_started				= false;
	document.body.unselectable		= null;
	document.onselectstart			= null;
	this.slider_target.ondragstart	= null;

	if ( this.slider_target.releaseCapture )
	{
		this.slider_target.releaseCapture();
	}

	this.RequestRender();
	this.Submit();

	eventStopPropagation( e );
	return eventPreventDefault( e );
}

MMFacet_RangeSlider.prototype.Event_MouseDown_Handle_High = function( e )
{
	var mousepos;

	AddEvent( window, 'mousemove', this.event_mousemove_handle_high );
	AddEvent( window, 'mouseup', this.event_mouseup_handle_high );
	AddEvent( window, 'blur', this.event_mouseup_handle_high );

	mousepos							= captureMousePosition( e );
	this.slider_started					= true;
	this.slider_target					= e.target ? e.target : e.srcElement;
	this.slider_startpos_high			= mousepos.x;
	this.slider_originalposition_high	= this.element_track_handle_high.getBoundingClientRect().left - this.element_track.getBoundingClientRect().left;

	clearTextSelection();
	document.body.focus();
	document.body.unselectable			= 'on';
	document.onselectstart				= this.event_returnfalse;
	this.slider_target.ondragstart		= this.event_returnfalse;

	if ( this.slider_target.setCapture )
	{
		this.slider_target.setCapture();
	}

	eventStopPropagation( e );
	return eventPreventDefault( e );
}

MMFacet_RangeSlider.prototype.Event_MouseMove_Handle_High = function( e )
{
	var mousepos, slider_rect, handle_rect, slider_length, available_handle_length;

	if ( this.slider_started )
	{
		eventPreventDefault( e );
		this.slider_started		= false;
	}

	mousepos					= captureMousePosition( e );
	slider_rect					= this.element_track.getBoundingClientRect();
	handle_rect					= this.element_track_handle_high.getBoundingClientRect();
	slider_length				= ( slider_rect.right - slider_rect.left );
	available_handle_length		= slider_length - ( handle_rect.right - handle_rect.left + 2 );
	this.slider_position_high	= stod_range( this.slider_originalposition_high + ( mousepos.x - this.slider_startpos_high ), 0, available_handle_length );

	clearTextSelection();
	this.RequestRender();

	eventStopPropagation( e );
	return eventPreventDefault( e );
}

MMFacet_RangeSlider.prototype.Event_MouseUp_Handle_High = function( e )
{
	RemoveEvent( window, 'mousemove', this.event_mousemove_handle_high );
	RemoveEvent( window, 'mouseup', this.event_mouseup_handle_high );
	RemoveEvent( window, 'blur', this.event_mouseup_handle_high );

	this.slider_started				= false;
	document.body.unselectable		= null;
	document.onselectstart			= null;
	this.slider_target.ondragstart	= null;

	if ( this.slider_target.releaseCapture )
	{
		this.slider_target.releaseCapture();
	}

	this.RequestRender();
	this.Submit();

	eventStopPropagation( e );
	return eventPreventDefault( e );
}

MMFacet_RangeSlider.prototype.Event_TouchStart_Handle_Low = function( e )
{
	if ( e.touches && e.touches.length > 1 )
	{
		if ( this.touchevents_applied )
		{
			RemoveEvent( this.touch_target, 'touchmove',	this.event_touchmove_handle_low );
			RemoveEvent( this.touch_target, 'touchend',		this.event_touchend_handle_low );
			RemoveEvent( this.touch_target, 'touchcancel',	this.event_touchend_handle_low );

			this.touchevents_applied	= false;
		}

		return;
	}

	this.touches						= e.touches;
	this.touch_target					= e.target;

	this.slider_started					= true;
	this.slider_startpos_low			= this.touches[ 0 ].pageX;
	this.slider_originalposition_low	= this.element_track_handle_low.getBoundingClientRect().left - this.element_track.getBoundingClientRect().left;

	if ( !this.touchevents_applied )
	{
		this.touchevents_applied		= true;

		AddEvent( e.target, 'touchmove',	this.event_touchmove_handle_low );
		AddEvent( e.target, 'touchend',		this.event_touchend_handle_low );
		AddEvent( e.target, 'touchcancel',	this.event_touchend_handle_low );
	}

	eventStopPropagation( e );
	return eventPreventDefault( e );
}

MMFacet_RangeSlider.prototype.Event_TouchMove_Handle_Low = function( e )
{
	var slider_rect, handle_rect, slider_length, available_handle_length;

	if ( this.slider_started )
	{
		eventPreventDefault( e );
		this.slider_started		= false;
	}

	this.touches				= e.touches;

	slider_rect					= this.element_track.getBoundingClientRect();
	handle_rect					= this.element_track_handle_low.getBoundingClientRect();
	slider_length				= ( slider_rect.right - slider_rect.left );
	available_handle_length		= slider_length - ( handle_rect.right - handle_rect.left + 2 );
	this.slider_position_low	= stod_range( this.slider_originalposition_low + ( this.touches[ 0 ].pageX - this.slider_startpos_low ), 0, available_handle_length );

	this.RequestRender();
}

MMFacet_RangeSlider.prototype.Event_TouchEnd_Handle_Low = function( e )
{
	RemoveEvent( this.touch_target, 'touchmove',	this.event_touchmove_handle_low );
	RemoveEvent( this.touch_target, 'touchend',		this.event_touchend_handle_low );
	RemoveEvent( this.touch_target, 'touchcancel',	this.event_touchend_handle_low );

	this.touchevents_applied	= false;
	this.slider_started			= false;

	this.RequestRender();
	this.Submit();

	eventStopPropagation( e );
	return eventPreventDefault( e );
}

MMFacet_RangeSlider.prototype.Event_TouchStart_Handle_High = function( e )
{
	if ( e.touches && e.touches.length > 1 )
	{
		if ( this.touchevents_applied )
		{
			RemoveEvent( this.touch_target, 'touchmove',	this.event_touchmove_handle_high );
			RemoveEvent( this.touch_target, 'touchend',		this.event_touchend_handle_high );
			RemoveEvent( this.touch_target, 'touchcancel',	this.event_touchend_handle_high );

			this.touchevents_applied	= false;
		}

		return;
	}

	this.touches						= e.touches;
	this.touch_target					= e.target;

	this.slider_started					= true;
	this.slider_startpos_high			= this.touches[ 0 ].pageX;
	this.slider_originalposition_high	= this.element_track_handle_high.getBoundingClientRect().left - this.element_track.getBoundingClientRect().left;

	if ( !this.touchevents_applied )
	{
		this.touchevents_applied		= true;

		AddEvent( e.target, 'touchmove',	this.event_touchmove_handle_high );
		AddEvent( e.target, 'touchend',		this.event_touchend_handle_high );
		AddEvent( e.target, 'touchcancel',	this.event_touchend_handle_high );
	}

	eventStopPropagation( e );
	return eventPreventDefault( e );
}

MMFacet_RangeSlider.prototype.Event_TouchMove_Handle_High = function( e )
{
	var slider_rect, handle_rect, slider_length, available_handle_length;

	if ( this.slider_started )
	{
		eventPreventDefault( e );
		this.slider_started		= false;
	}

	this.touches				= e.touches;

	slider_rect					= this.element_track.getBoundingClientRect();
	handle_rect					= this.element_track_handle_high.getBoundingClientRect();
	slider_length				= ( slider_rect.right - slider_rect.left );
	available_handle_length		= slider_length - ( handle_rect.right - handle_rect.left + 2 );
	this.slider_position_high	= stod_range( this.slider_originalposition_high + ( this.touches[ 0 ].pageX - this.slider_startpos_high ), 0, available_handle_length );

	this.RequestRender();
}

MMFacet_RangeSlider.prototype.Event_TouchEnd_Handle_High = function( e )
{
	RemoveEvent( this.touch_target, 'touchmove',	this.event_touchmove_handle_high );
	RemoveEvent( this.touch_target, 'touchend',		this.event_touchend_handle_high );
	RemoveEvent( this.touch_target, 'touchcancel',	this.event_touchend_handle_high );

	this.touchevents_applied	= false;
	this.slider_started			= false;

	this.RequestRender();
	this.Submit();

	eventStopPropagation( e );
	return eventPreventDefault( e );
}

MMFacet_RangeSlider.prototype.Submit = function()
{
	if ( this.original_value !== this.element_value.value )
	{
		MMProdList_UpdateQuery( this.element_value );
	}
}

// Rendering

MMFacet_RangeSlider.prototype.RequestRender = function()
{
	if ( !this.shouldrender )
	{
		this.shouldrender = true;
		window.requestAnimationFrame( this.event_render );
	}
}

MMFacet_RangeSlider.prototype.Render = function()
{
	if ( this.shouldrender )
	{
		this.shouldrender = false;
		this.Redraw();
	}
}

MMFacet_RangeSlider.prototype.Redraw = function()
{
	var low, high, tmp_low, slider_rect, handle_rect, slider_length, available_handle_length;

	slider_rect						= this.element_track.getBoundingClientRect();
	handle_rect						= this.element_track_handle_high.getBoundingClientRect();
	slider_length					= ( slider_rect.right - slider_rect.left );
	available_handle_length			= slider_length - ( handle_rect.right - handle_rect.left + 2 );

	this.slider_position_low		= stod_range( this.slider_position_low, 0, available_handle_length );
	this.slider_position_high		= stod_range( this.slider_position_high, 0, available_handle_length );

	low								= this.slider_position_low;
	high							= this.slider_position_high;

	if ( low > high )
	{
		tmp_low	= low;
		low		= high;
		high	= tmp_low;
	}

	this.element_track_handle_low.style.left	= this.slider_position_low + 'px';
	this.element_track_handle_high.style.left	= this.slider_position_high + 'px';
	this.element_track_selection.style.left		= ( low + ( this.element_track_handle_low.offsetWidth / 2 ) ) + 'px';
	this.element_track_selection.style.right	= ( this.element_track.offsetWidth - ( high + ( this.element_track_handle_low.offsetWidth / 2 ) ) ) + 'px';

	this.FormatValues( low, high );
}

// Miscellaneous
////////////////////////////////////////////////////

function MMDynamic_Form_Submit( action, hidden_input_fields, form_attributes )
{
	var key, form;

	form = newElement( 'form', { 'action': action, 'method': 'POST', 'taget': '_self' }, null, null );

	if ( form_attributes && ( typeof form_attributes === 'object' ) )
	{
		for ( key in form_attributes )
		{
			form.setAttribute( key, form_attributes[ key ] );
		}
	}

	for ( key in hidden_input_fields )
	{
		newElement( 'input', { 'type': 'hidden', 'name': key, 'value': hidden_input_fields[ key ] }, null, form );
	}

	document.body.appendChild( form );
	form.submit();
	document.body.removeChild( form );
}
