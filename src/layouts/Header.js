import React, {
    Component
} from 'react';
import '../App.css';
import {
    importAll
} from '../common/common';

const images = importAll(require.context('../img', false, /\.(png|jpe?g|svg)$/));
export class Header extends Component {
    render() {
        return (
            <div className="frame-header">
                <div className="container-fluid">
                    <a href="/">
                        <h3 className="logo">Game vui Facebook</h3>
                    </a>
                    <button  className="btn btn-primary frame-button-facebook">
                        <img className="logo-facebook" src={images['facebook-logo.svg']} alt="logo face" />                   
                    </button>
                </div>
            </div>
        );
    }


}