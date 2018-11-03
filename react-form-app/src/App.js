import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      title: ' Simple Flexi React Application',
      act: 0,
      index: '',
      items: [],
      values: [
        { name: 'Karnatka'  },
        { name: 'Kerala' },
        { name: 'Tamil Nadu' },
        { name: 'Maharashtra' }
      ]
    }
  }

  componentDidMount(){
    this.refs.name.focus();
  }

  fSubmit = (e) =>{
    e.preventDefault();
    let items = this.state.items;
    let name = this.refs.name.value;
    let dropval = this.refs.dropval.value;

    if (this.state.act === 0) { //new
      let data = {
        name, dropval
      }
  
      items.push(data); 
    } else {                    //update
      let index = this.state.index;
      items[index].name = name;
      items[index].dropval = dropval;
    }

    this.setState({
      items: items
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fRemove = (i) => {
    let items  = this.state.items;
    items.splice(i,1);
    this.setState({
      items:items
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }
  
  fEdit = (i) => {
    let data = this.state.items[i];
    this.refs.name.value = data.name;
    this.refs.dropval.value = data.dropval;

    this.setState({
      act: 1,
      index: i 
    })

    this.refs.name.focus();
  }

  render() {
    let items = this.state.items;
    let optionTemplate = this.state.values.map(v => (
      <option value={v.id}>{v.name}</option>
    ));
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="your name" className="formField" />
          
          <label>
        Pick your Favorite State:
        <select ref="dropval" value={this.state.value} onChange={this.handleChange}>
          {optionTemplate}
        </select>
      </label>
          <button onClick={(e)=>this.fSubmit(e)} className="myButton">Submit</button>
        </form>
        <pre>
          {items.map((data, i) =>
            <li key={i} className="myList">
              {i+1}.{data.name},{data.dropval}
              <button onClick={()=>this.fRemove(i)} className="myListButtonR">Delete</button>
              <button onClick={()=>this.fEdit(i)} className="myListButtonE">Edit</button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;
