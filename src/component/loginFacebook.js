import React, { Component } from 'react';

import Redirect from 'react-router-dom/Redirect';
import FacebookProvider, { Share, Login,  } from 'react-facebook';


import { importAll } from '../common/common';
const images = importAll(require.context('../img', false, /\.(png|jpe?g|svg)$/));

export class Facebook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            token: '',

        }
    }

    responseFacebook = response => {
        
        localStorage.setItem('dataUser', JSON.stringify(response.profile));
        this.setState({
            isLoggedIn: true,
            token: response.tokenDetail.accessToken
        });
        
    }


    render() {

        let path = this.props.match.path;

        if (this.state.isLoggedIn) {

            switch (path) {
                case '/game1':
                    return (<Redirect to="/finalgame1" />)
                    break;
                case '/game2':
                    return (<Redirect to="/finalgame2" />)
                    break;
                case '/game3':
                    return (<Redirect to="/finalgame3" />)
                    break;
                case '/game4':
                    return (<Redirect to="/finalgame4" />)
                    break;
                case '/game5':
                    return (<Redirect to="/finalgame5" />)
                    break;
                case '/game6':
                    return (<Redirect to="/finalgame6" />)
                    break;
                case '/game7':
                    return (<Redirect to="/finalgame7" />)
                    break;

            }

        }
        else {
            return (
                <FacebookProvider appId="1748671035440187">
                    <Login
                        //autoLoad={true}
                        fields="name,email,picture,birthday"
                        scope="email,public_profile,user_friends,publish_actions,user_birthday"
                        onResponse={this.responseFacebook}
                    >
                        <button className="btn btn-primary frame-button-facebook-content">
                            <span className="text-logo-facebook">Đăng nhập và chơi </span>
                            <img className="logo-facebook-content" src={images['facebook-logo.svg']} alt="logo face" />
                        </button>
                    </Login>
                </FacebookProvider>
            );
        }

    }
}
export class ShareFB extends Component {

    render() {
        return (
        <FacebookProvider appId="1748671035440187">
            <Share href="http://gamefunnyfb.tk/">
            <button  className="btn btn-primary frame-button-facebook-content">
                        <span className="text-logo-facebook">Chia sẽ  </span>
                        <img className="logo-facebook-content" src={images['facebook-logo.svg']} alt="logo face" />                   
                </button>
            </Share>
        </FacebookProvider>

        );
    }
}

