import React, {useState, useRef, useEffect} from 'react';
import {useSelector} from "react-redux";

import PropTypes from 'prop-types';
import axios from 'axios'
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import {Input} from './Input'
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';

// const suggestions = [
// 	{label: 'Красных Зорь'},
// 	{label: 'Красной Армии'},
// 	{label: 'Краснопресненская'},
// 	{label: 'Крупской'},
// 	{label: 'Красная'},
// 	{label: 'Ковалерийская'},
// 	{label: 'Королева'}
// ];

// const suggestions = async () => {
// 	try {
// 		const response = await axios.get( './streets.json' )
//
// 		return response.data
//
// 	} catch (error) {
// 		console.log( error )
// 	}
// }


// function getSuggestions(value) {
//
// 	const inputValue = value.trim().toLowerCase();
// 	const inputLength = inputValue.length;
// 	let count = 0;
// 	return inputLength === 0
// 		? suggestions
// 		: suggestions.filter( suggestion => {
// 			const keep = count < 5 && suggestion.label.toLowerCase().slice( 0, inputLength ) === inputValue;
//
// 			if (keep) {
// 				count += 1;
// 			}
//
// 			return keep;
// 		} );
// }
const styles = theme => ({
	container: {
		flexGrow: 1,
		position: 'relative',
		width: '100%'
	},
	suggestionsContainerOpen: {
		position: 'absolute',
		zIndex: 1,
		marginTop: theme.spacing( 1 ),
		left: 0,
		right: 0,
		height: '100px',
		overflow: 'auto',
		border: '1px solid #e6e6e6',
		boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
		borderRadius: '4px',
		backgroundColor: '#fff',
		color: '#333',
		fontSize: '14px',
		lineHeight: '20px'
	},
	suggestion: {
		display: 'block',
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'none'
	},
});


function renderInput(inputProps) {
	const {classes, ref, ...other} = inputProps;
	
	return <Input
		ref={ref}
		name='deliveryAddress'
		value={inputProps.value}
		onChange={inputProps.onChange}
		clear={inputProps.clear}
		isValid={inputProps.isValid}
		{...other}
	/>
}

function renderSuggestion(suggestion, {query, isHighlighted}) {
	const matches = match( suggestion.label, query );
	const parts = parse( suggestion.label, matches );
	
	return (
		<MenuItem selected={isHighlighted} component="div">
			<div>
				{parts.map( (part, index) => {
					return part.highlight ? (
						<span key={String( index )} style={{fontWeight: 700}}>
              {part.text}
            </span>
					) : (
						<strong key={String( index )} style={{fontWeight: 500}}>
							{part.text}
						</strong>
					);
				} )}
			</div>
		</MenuItem>
	);
}

function getSuggestionValue(suggestion) {
	return suggestion.label;
}


const IntegrationAutosuggest = ({classes, getValue, url}) => {
	const [suggs, setSuggs] = useState( [] )
	
	useEffect( () => {
			async function fetchSuggestions() {
				try {
					const response = await axios.get( url )
					setSuggs( response.data )
					
				} catch (error) {
					console.log( error )
				}
			}
			
			fetchSuggestions()
		}, [url]
	)
// 	const suggs = [
// 	{label: 'Красных Зорь'},
// 	{label: 'Красной Армии'},
// 	{label: 'Краснопресненская'},
// 	{label: 'Крупской'},
// 	{label: 'Красная'},
// 	{label: 'Ковалерийская'},
// 	{label: 'Королева'}
// ];
	
	function getSuggestions(value) {
		
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;
		let count = 0;
		return inputLength === 0
			? suggs
			: suggs.filter( sugg => {
				const keep = count < 5 && sugg.label.toLowerCase().slice( 0, inputLength ) === inputValue;
				
				if (keep) {
					count += 1;
				}
				
				return keep;
			} );
	}
	
	const ref = useRef( null )
	const [value, setValue] = useState( '' )
	const order = useSelector(state => state.indivOrders.order)
	
	let validDeliveryAddressInput = order.deliveryAddress.length > 2
	
	const [suggestions, setSugesstions] = useState( [] )
	
	function shouldRenderSuggestions(value, reason) {
		return value.trim().length > 2;
	}
	
	const handleSuggestionsFetchRequested = ({value}) => {
		setSugesstions( [...getSuggestions( value )] );
	};
	
	const handleSuggestionsClearRequested = () => {
		setSugesstions( [] );
	};
	
	const handleChange = (event, {newValue}) => {
		setValue( newValue );
		getValue( newValue )
	};
	
	return (
		<Autosuggest
			theme={{
				container: classes.container,
				suggestionsContainerOpen: classes.suggestionsContainerOpen,
				suggestionsList: classes.suggestionsList,
				suggestion: classes.suggestion,
			}}
			focusInputOnSuggestionClick={false}
			shouldRenderSuggestions={shouldRenderSuggestions}
			renderInputComponent={renderInput}
			suggestions={suggestions}
			onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
			onSuggestionsClearRequested={handleSuggestionsClearRequested}
			// renderSuggestionsContainer={renderSuggestionsContainer}
			getSuggestionValue={getSuggestionValue}
			renderSuggestion={renderSuggestion}
			inputProps={{
				isValid: validDeliveryAddressInput,
				ref: ref,
				classes,
				value: value.trim(),
				onChange: handleChange,
				label: 'Адрес',
				// clear: () => setValue( '' )
				clear: () => {
					setValue('');
					getValue('')}
			}}
		
		/>
	);
}

IntegrationAutosuggest.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles( styles )( IntegrationAutosuggest );