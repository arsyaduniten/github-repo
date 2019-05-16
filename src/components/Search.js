import React, { Component } from 'react'
import Pagination from './Pagination'
import NoResult from './NoResult'

const Loader = () => (
    <div className='container mx-auto text-center'>
        <svg width="57px"  
            height="57px"  
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="xMidYMid" 
            className="lds-ellipsis" 
            style={{background: 'none'}}>
        <circle cx="84" cy="50" r="0" fill="#b8d0fe">
        <animate attributeName="r" values="10;0;0;0;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="4.4s" repeatCount="indefinite" begin="0s">
        </animate>
        <animate attributeName="cx" values="84;84;84;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="4.4s" repeatCount="indefinite" begin="0s"></animate></circle><circle cx="48.1391" cy="50" r="10" fill="#c2d2ee"><animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="4.4s" repeatCount="indefinite" begin="-2.2s"></animate><animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="4.4s" repeatCount="indefinite" begin="-2.2s"></animate></circle><circle cx="16" cy="50" r="9.45269" fill="#88a2ce"><animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="4.4s" repeatCount="indefinite" begin="-1.1s"></animate><animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="4.4s" repeatCount="indefinite" begin="-1.1s"></animate></circle><circle cx="84" cy="50" r="0.547313" fill="#456caa"><animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="4.4s" repeatCount="indefinite" begin="0s"></animate><animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="4.4s" repeatCount="indefinite" begin="0s"></animate></circle><circle cx="82.1391" cy="50" r="10" fill="#b8d0fe"><animate attributeName="r" values="0;0;10;10;10" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="4.4s" repeatCount="indefinite" begin="0s"></animate><animate attributeName="cx" values="16;16;16;50;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="4.4s" repeatCount="indefinite" begin="0s"></animate></circle></svg>
    </div>
    )

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            isLoading: false,
            noResult: false,
            query: ''
        };
        this.keyPress = this.keyPress.bind(this);
    }
    keyPress(e){
        if(e.key === 'Enter'){
            this.setState({ isLoading: !this.state.isLoading });
            let query = e.target.value;
            fetch(`https://api.github.com/search/repositories?per_page=100&q=${query}`)
                .then(response => response.json())
                .then(data => data.items.length === 0 ? this.setState({ noResult:true, items: data.items, isLoading:!this.state.isLoading, query:query }) : this.setState({ items: data.items, isLoading:!this.state.isLoading, noResult:false, query:query }));
        }
    }

    render(){
        const {
            items
        } = this.state;
        if(items.length === 0){
            return(
                    <div>
                        <div className='border-solid rounded border-gray-800 container mx-auto text-center flex justify-center w-2/3'>
                            <input type="text" className="flex-1 p-6 text-2xl" onKeyPress={this.keyPress.bind(this)} placeholder="Search repositories..." />
                            <img className='p-4' src="https://img.icons8.com/wired/50/000000/search.png" alt='search' />
                        </div>
                        {this.state.isLoading && <Loader />}
                        {this.state.noResult && <NoResult query={this.state.query} />}
                    </div>

            );
        } else{
            return(
                <div>
                    <div className='border-solid rounded border-gray-800 container mx-auto text-center flex justify-center w-2/3'>
                        <input type="text" className="flex-1 p-6 text-2xl" onKeyPress={this.keyPress.bind(this)} placeholder="Search repositories..." />
                        <img className='p-4' src="https://img.icons8.com/wired/50/000000/search.png" alt='search' />
                    </div>
                    {this.state.isLoading && <Loader />}
                    {this.state.noResult && <NoResult query={this.state.query} />}
                    <Pagination items={items} />
                </div>
            );
        }
    }
}
