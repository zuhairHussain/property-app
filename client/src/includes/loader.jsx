import React, { Component } from 'react';

class Loader extends Component {
    state = {}
    render() {
        return (
            <div className={this.props.show ? 'show loader-wrap' : 'loader-wrap'}>
                <div className="lod-cnt">
                    <div className="loader"></div>
                    <span className="hed">Please Wait</span>
                </div>
            </div>
        );
    }
}

export default Loader;