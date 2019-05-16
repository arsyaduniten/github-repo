import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Pagination extends Component {
    constructor(props) {
      super(props);
      this.state = {
        items: this.props.items,
        currentPage: 1,
        itemsPerPage: 10
      };
      this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ items: nextProps.items });  
    }
  
    handleClick(event) {
      this.setState({
        currentPage: Number(event.target.id)
      });
    }
  
    render() {
      const { items, currentPage, itemsPerPage } = this.state;
  
      // Logic for displaying items
      const indexOfLastItems = currentPage * itemsPerPage;
      const indexOfFirstItems = indexOfLastItems - itemsPerPage;
      const currentItems = items.slice(indexOfFirstItems, indexOfLastItems);
  
      const renderItems = currentItems.map((item, index) => {
        return (
              <div className='bg-white border-solid border-2 border-gray-400 m-4 p-4 w-2/3 rounded flex items-center' key={index}>
                <div className='flex flex-col flex-1'>
                  <p className='text-left text-blue-600 text-2xl font-bold'>{item.full_name}</p>
                  <p className='text-left text-gray-600 -mt-3'>{item.description}</p>
                  <p className='text-left text-gray-600 my-4'>Updated on {new Intl.DateTimeFormat({ 
                        year: 'numeric', 
                        month: 'short', 
                        day: '2-digit' 
                    }).format(new Date(item.updated_at))}</p>
                </div>
                <p className='mx-2 text-2xl flex items-center'><span className='mx-2'><img src="https://img.icons8.com/metro/26/000000/new-moon.png" alt='dot' height='15'/></span>{item.language}</p>
                <p className='mx-2 text-2xl flex items-center'><span className='mx-2'><img src="https://img.icons8.com/metro/26/000000/christmas-star.png" alt='star_icon' height='15'/></span>{item.stargazers_count}</p>
              </div>
        );
      });
  
      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
        pageNumbers.push(i);
      }
  
      const renderPageNumbers = pageNumbers.map(number => {
        return (
          <div
            key={number}
            id={number}
            onClick={this.handleClick}
            className='px-4 mx-2 cursor-pointer py-2 border-gray-400 bg-gray-100'
          >
            {number}
          </div>
        );
      });
  
      return (
        <div className='container mx-auto'>
          <div className='flex flex-col items-center'>
            {renderItems}
          </div>
          <div className='flex justify-center' id="page-numbers">
            {renderPageNumbers}
          </div>
        </div>
      );
    }
  }
  