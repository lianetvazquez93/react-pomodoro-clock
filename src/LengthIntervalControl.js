import React from 'react';

class LengthIntervalControl extends React.Component {
    render() {
        return (
            <div className="length-control">
                <div id={this.props.titleID}>
                    {this.props.title}
                </div>
                <button id={this.props.minID} className="btn-level" value="-" onClick={this.props.onClick}>
                    <i className="fas fa-arrow-down fa-2x"/>
                </button>
                <div id={this.props.lengthID} className="btn-level">
                    {this.props.length}
                </div>
                <button id={this.props.addID} className="btn-level" value="+" onClick={this.props.onClick}>
                    <i className="fas fa-arrow-up fa-2x"/>
                </button>
            </div>
        );
    }
}

export default LengthIntervalControl;