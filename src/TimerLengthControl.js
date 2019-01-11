import React from 'react';

class TimerLengthControl extends React.Component {
    render() {
        return (
            <div className="length-control">
                <div id={this.props.titleID}>
                    {this.props.title}
                </div>
                <button id={this.props.minID} className="btn-level" value="-" 
                    onClick={this.props.onClick}>
                    <i class="fas fa-arrow-down"></i>
                </button>
                <div id={this.props.lengthID} className="btn-level">
                    {this.props.length}
                </div>
                <button id={this.props.addID} className="btn-level" value="+" 
                    onClick={this.props.onClick}>
                    <i class="fas fa-arrow-up"></i>
                </button>
            </div>
        );
    }
}

export default TimerLengthControl;