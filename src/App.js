
/////////////////////////////
////////// IMPORTS /////////
///////////////////////////

//Import Styles
import './App.scss';

//Import Header
import Header from './components/header/Header.js';

// Import Form
import Form from './components/form/Form.js';

//Import Footer
import Footer from './components/footer/footer';

// Import Results
import Results from './components/results/Results'

// Import React
import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      count:0,
      headers:{},
      response:[],
      urls:[],
      methods:[]
    }
  }

  formHandler= (headers,body,state)=>{
    this.state.urls.push(state.url);
    this.state.methods.push(state.method);
    
    if (headers && body) {
      this.setState({
        count: body.count || this.state.count + 1,
        headers: headers,
        response: body,
      });
    } else {
      this.setState({
        count: this.state.count + 1,
        headers: {message: 'N/A'},
        response: body
      })
    }



  }

  render() {

    return(
      <>
      <Header />
      <main>

        <Form prompt="GO!" handler={this.formHandler} />

        <section id="results">
          <Results props={this.state} />
        </section>

      </main>

      <Footer />
      </>
    )

  }
}



export default App;
