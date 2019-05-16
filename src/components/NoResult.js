import React, { Component } from 'react'

export default class NoResult extends Component{
    constructor(props){
        super(props);
        this.state = {
            query: this.props.query,
        }
    }
    render(){
        return(
            <div className='container mx-auto text-center my-12'>
                <p className='text-gray-600 text-5xl'>No Results found for {this.state.query}...</p>
            </div>
        );
    }
}