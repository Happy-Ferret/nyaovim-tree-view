import React from 'react';

export default class File extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick() {
        // TODO
    }

    render() {
        return <span onClick={this.onClick.bind(this)}>
            {this.props.name}
        </span>;
    }
}

