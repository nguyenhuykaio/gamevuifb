import React, { Component } from 'react';
import { importAll } from '../common/common';
import { HOST_WEB, HOST_IMG } from '../component/global';


const HOST_IMAGE = HOST_IMG+'/game/';
const images = importAll(require.context('../img', false, /\.(png|jpe?g|svg)$/));



export class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: []
        };
        // this.loadData();
        // this.loadApi();
    }
    // loadData() {
    //     fetch("http://5b12493ad50a5c0014ef11c3.mockapi.io/test")
    //         .then(res => {
    //             return res.json()
    //         }).then(data => {
    //             // console.log(data);
    //             this.setState({
    //                 listData: data
    //             });
    //         })
    //         // .then(data => console.log(data))
    //         .catch(err => console.log(err))
    // }
    componentDidMount() {
        this.loadApi();
    }
    // render() {
    //     return (
    //         <div className="frame-body">
    //             {this.state.listData.map(item => (         
    //                 <li key={item.name}>
    //                 {item.name} -{item.avatar}-{item.createdAt}
    //                 </li>                    
    //             ))}
    //         </div>
    //     );
    // }
    loadApi() {
        fetch(HOST_WEB+"allgame")
            .then(res => {
                return res.json()
            }).then(data => {
                // console.log(data);
                this.setState({
                    listData: data
                });
            })
            // .then(data => console.log(data))
            .catch(err => console.log(err))
    }

    render() {
        return (
            //    start frame body of game 
                <div className="frame-body">
                    <div className="frame-game">
                        {
                            this.state.listData.map(item => (

                                // {/* start 1 game */ }
                                <a href={"/game"+item.id} className="layout-game" key={item.name}>
                                    <img className="img-game"  src={HOST_IMAGE +item.picture}  />
                                    <h3 className="name-game">{item.name}</h3>
                                </a>
                                // {/* end 1 game */ }

                            ))
                        }

                    </div>
                </div>        
            // end frame body of game 
        );
    }
}