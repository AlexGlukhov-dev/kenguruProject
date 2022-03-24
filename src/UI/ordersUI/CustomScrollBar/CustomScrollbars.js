import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars';

import './customScrollbars.scss'

class CustomScrollbars extends React.Component {

	render() {

		return (
			<Scrollbars
				renderTrackHorizontal={props => <div {...props} className="track-horizontal"/>}
				renderTrackVertical={props => <div {...props} className="track-vertical-new"/>}
				renderThumbHorizontal={props => <div {...props} className="thumb-horizontal"/>}
				renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}
				renderView={props => <div {...props} className="view"/>}
				>
				{this.props.children}
			</Scrollbars>
		);
	}
}

export default CustomScrollbars;