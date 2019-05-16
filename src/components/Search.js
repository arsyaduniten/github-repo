import React, { Component } from 'react'
import Pagination from './Pagination'

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            items: []
        };
        this.keyPress = this.keyPress.bind(this);
    }
    keyPress(e){
        if(e.key === 'Enter'){
            let query = e.target.value;
            fetch(`https://api.github.com/search/repositories?per_page=100&q=${query}`)
                .then(response => response.json())
                .then(data => this.setState({ items: data.items }));
        }
    }

    render(){
        const {
            items
        } = this.state;
        if(items.length === 0){
            return(
                <div className='container mx-auto text-center'>
                    <input type="text" className="p-4 border-gray-400" onKeyPress={this.keyPress.bind(this)} />
                </div>
            );
        } else{
            return(
                <div className='container mx-auto text-center'>
                    <input type="text" className="p-4 border-gray-400" onKeyPress={this.keyPress.bind(this)} />
                    <Pagination items={items} />
                </div>
            );
        }
    }
}
