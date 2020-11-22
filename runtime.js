// Miva Merchant
//
// This file and the source codes contained herein are the property of
// Miva, Inc.  Use of this file is restricted to the specific terms and
// conditions in the License Agreement associated with this file.  Distribution
// of this file or portions of this file for uses not covered by the License
// Agreement is not allowed without a written agreement signed by an officer of
// Miva, Inc.
//
// Copyright 1998-2016 Miva, Inc.  All rights reserved.
// http://www.miva.com
//

/*!
 * \file
 * \brief JavaScript stubs to call runtime functionality in json.mvc
 */

// Runtime AJAX Calls
////////////////////////////////////////////////////

function Runtime_AttributeAndOptionList_Load_Product( product_code, callback )				{ return AJAX_Call( callback, 'runtime', 'Runtime_AttributeAndOptionList_Load_Product',	'Product_Code=' + encodeURIComponent( product_code ) ); }
function Runtime_AttributeList_Load_ProductVariant_Possible( product_code, dependency_resolution,
															 last_selected_attr_id, last_selected_attmpat_id, last_selected_option_id,
															 selected_attr_ids, selected_attmpat_ids, selected_option_ids, selected_attr_types,
															 unselected_attr_ids, unselected_attmpat_ids,
															 callback )						{ return AJAX_Call( callback, 'runtime', 'Runtime_AttributeList_Load_ProductVariant_Possible',
																																													'Product_Code=' + encodeURIComponent( product_code ) +
																																													'&Dependency_Resolution=' + encodeURIComponent( dependency_resolution ) +
																																													'&Last_Selected_Attribute_ID=' + encodeURIComponent( last_selected_attr_id ) + '&Last_Selected_AttributeTemplateAttribute_ID=' + encodeURIComponent( last_selected_attmpat_id ) + '&Last_Selected_Option_ID=' + encodeURIComponent( last_selected_option_id ) +
																																													'&Selected_Attribute_IDs=' + EncodeArray( selected_attr_ids ) +
																																													'&Selected_AttributeTemplateAttribute_IDs=' + EncodeArray( selected_attmpat_ids ) +
																																													'&Selected_Option_IDs=' + EncodeArray( selected_option_ids ) +
																																													'&Selected_Attribute_Types=' + EncodeArray( selected_attr_types ) +
																																													'&Unselected_Attribute_IDs=' + EncodeArray( unselected_attr_ids ) +
																																													'&Unselected_AttributeTemplateAttribute_IDs=' + EncodeArray( unselected_attmpat_ids ) ); }
function Runtime_AttributeList_Load_ProductVariant_Possible_PredictDiscounts( product_code, dependency_resolution,
																			  last_selected_attr_id, last_selected_attmpat_id, last_selected_option_id,
																			  selected_attr_ids, selected_attmpat_ids, selected_option_ids, selected_attr_types,
																			  unselected_attr_ids, unselected_attmpat_ids,
																			  callback )
{
	var data;

	data							= new Object();
	data.product_code				= product_code;
	data.dependency_resolution		= dependency_resolution;
	data.predictdiscounts			= 0;
	data.last_selected_attr_id		= last_selected_attr_id;
	data.last_selected_attmpat_id	= last_selected_attmpat_id;
	data.last_selected_option_id	= last_selected_option_id;
	data.selected_term_id			= 0;
	data.selected_attr_ids			= selected_attr_ids;
	data.selected_attmpat_ids		= selected_attmpat_ids;
	data.selected_option_ids		= selected_option_ids;
	data.selected_attr_types		= selected_attr_types;
	data.unselected_attr_ids		= unselected_attr_ids;
	data.unselected_attmpat_ids		= unselected_attmpat_ids;

	return v96_Runtime_AttributeList_Load_ProductVariant_Possible_PredictDiscounts( data, callback );
}

function v96_Runtime_AttributeList_Load_ProductVariant_Possible_PredictDiscounts( data, callback )	{ return AJAX_Call( callback, 'runtime', 'Runtime_AttributeList_Load_ProductVariant_Possible',
																																													'Product_Code=' + encodeURIComponent( data.product_code ) +
																																													'&Dependency_Resolution=' + encodeURIComponent( data.dependency_resolution ) +
																																													'&Predict_Discounts=' + ( data.predictdiscounts ? '1' : '0' ) + 
																																													'&Last_Selected_Attribute_ID=' + encodeURIComponent( data.last_selected_attr_id ) + '&Last_Selected_AttributeTemplateAttribute_ID=' + encodeURIComponent( data.last_selected_attmpat_id ) + '&Last_Selected_Option_ID=' + encodeURIComponent( data.last_selected_option_id ) +
																																													'&Selected_Term_ID=' + encodeURIComponent( data.selected_term_id ) +
																																													'&Selected_Attribute_IDs=' + EncodeArray( data.selected_attr_ids ) +
																																													'&Selected_AttributeTemplateAttribute_IDs=' + EncodeArray( data.selected_attmpat_ids ) +
																																													'&Selected_Option_IDs=' + EncodeArray( data.selected_option_ids ) +
																																													'&Selected_Attribute_Types=' + EncodeArray( data.selected_attr_types ) +
																																													'&Unselected_Attribute_IDs=' + EncodeArray( data.unselected_attr_ids ) +
																																													'&Unselected_AttributeTemplateAttribute_IDs=' + EncodeArray( data.unselected_attmpat_ids ) ); }
function Runtime_ProductVariant_Load_Attributes( product_code,
												 attr_ids, attmpat_ids, option_ids,
												 callback )									{ return AJAX_Call( callback, 'runtime', 'Runtime_ProductVariant_Load_Attributes',
																																													'Product_Code=' + encodeURIComponent( product_code ) +
																																													'&Attribute_IDs=' + EncodeArray( attr_ids ) +
																																													'&AttributeTemplateAttribute_IDs=' + EncodeArray( attmpat_ids ) +
																																													'&Option_IDs=' + EncodeArray( option_ids ) ); }

function Runtime_ProductImageList_Load_Product_Variant( product_code, variant_id,
														image_sizes, callback )				{ return AJAX_Call( callback, 'runtime', 'Runtime_ProductImageList_Load_Product_Variant',				
																																													'Product_Code=' + encodeURIComponent( product_code ) +
																																													'&Variant_ID=' + encodeURIComponent( variant_id ) +
																																													'&Image_Sizes=' + EncodeArray( image_sizes ) ); }
