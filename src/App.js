
/////////////////////////////
////////// IMPORTS /////////
///////////////////////////


// Import React
import React from 'react';

// Import If and Then
import { If, Then } from 'react-if';

//Import Styles
import './App.scss';

//Import Header
import Header from './components/header/Header.js';

// Import Form
import Form from './components/form/Form.js';

//Import Footer
import Footer from './components/footer/footer';

// Import Results
import Results from './components/results/Results';

//Import History
import History from './components/history/History';


// superagent
const superagent = require('superagent');

//parsing history
let history = JSON.parse(localStorage.getItem('history'));



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      headers: {},
      response: {},
      history: {},
      storageArray: history || [],
      trigger: false,
      fetching: false,

    }
  }

  formHandler = async (state) => {

    this.setState({ fetching: true, trigger: true });

    try {
      let reqBody = state.body;

      if (state.method === 'POST' || state.method === 'PUT') {
        let parsed=JSON.parse(reqBody);

        const result = await superagent[state.method.toLowerCase()](state.url)
          .send(parsed);

          console.log(reqBody,'ReqBody')


        let { headers, body } = result;

        console.log(result,'RRRRRR')

        this.handler(headers, body, state);

      } else {
        const result = await superagent[state.method.toLowerCase()](state.url);
        let { headers, body } = result;
        this.handler(headers, body, state);
      }
    } catch (error) {
      console.log(error,'eeeee');
    }
  }


  handler = (headers, body, state) => {
    if (headers && body) {
      let storageData = {
        id: `state.method state.url`,
        url: state.url,
        method: state.method,
        body: state.body,
      };
      this.state.storageArray.push(storageData);

      const newArr = [];
      const map = new Map();
      for (const item of this.state.storageArray) {
        if (!map.has(item.id)) {
          map.set(item.id, true);
          newArr.push({
            id: item.id,
            url: item.url,
            method: item.method,
            body: item.body,
          });
        }
      }

      this.setState({
        count: body.count || this.state.count + 1,
        headers: headers,
        response: body,
        storageArray: [...newArr],
        fetching: false,
      });
      localStorage.setItem('history', JSON.stringify(newArr));
    } else {
      this.setState({
        count: this.state.count + 1,
        headers: null,
        response: body,
        fetching: false,
      });
    }
  };



  render() {

    return (
      <>
        <Header />
        <main>

          <Form prompt="GO!" handler={this.formHandler} />

          <section id="results">

            <History props={this.state.storageArray} />

            <If condition={this.state.trigger}>
              <Then>
                <Results props={this.state} />
              </Then>
            </If>


          </section>

        </main>

        <Footer />
      </>
    )

  }
}



export default App;
