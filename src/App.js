import React from 'react';
import './App.css';
import Form from './Components/Form/Form';

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      marcas: []
    }
  }

  componentDidMount() {
    fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas', {
      method:'GET'
    })
    .then(response => response.json())
    .then(data => this.setState({marcas: data}))
    .catch(err => console.log(err))
  }

  render() {
    return(
      <div className='App'>
        <Form marcas={this.state.marcas}/>
      </div>
    )
  }
}

export default App;
