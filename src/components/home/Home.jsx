////////////////////
//// Imports //////
//////////////////

// React
import React from 'react';

//React If
import { If, Then } from 'react-if';




//=============//
// Components //
//===========//

//Form
import Form from '../form/Form';

//History
import History from '../history/History';

//Results
import Results from '../results/Results';


//////////////////////////
/////Home Component  ////
////////////////////////


const superagent = require('superagent');

let history = JSON.parse(localStorage.getItem('history'));
let data = JSON.parse(localStorage.getItem('data'));

class Home extends React.Component {
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
      rendered: false,
    };
  }

  handleForm = async (state) => {
    this.setState({ fetching: true, trigger: true });
    try {

      let reqBody = state.body;
      if (state.method === 'POST' || state.method === 'PUT') {
        let parsed=JSON.parse(reqBody);

        const result = await superagent[state.method.toLowerCase()](
          state.url
        ).send(parsed);
        
        
        let { headers, body } = result;

        this.handler(headers, body, state);

        
      } else {
        const result = await superagent[state.method.toLowerCase()](state.url);
        let { headers, body } = result;
        this.handler(headers, body, state);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  handler = (headers, response, state) => {
    if (headers && response) {
      let storageObj = {
        id: state.method + state.url + state.body,
        url: state.url,
        method: state.method,
        body: state.body,
        headers: headers,
        response: response
      };
      this.state.storageArray.push(storageObj);

      this.setState({
        count: response.count || this.state.count + 1,
        headers: headers,
        response: response,
        storageArray: array(this.state.storageArray),
        fetching: false,
      });
      localStorage.setItem('history', JSON.stringify(this.state.storageArray));
    } else {
      this.setState({
        count: this.state.count + 1,
        headers: null,
        response: response,
        fetching: false,
      });
    }
  };

  componentDidMount() {
    this.setState({ rendered: true});
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.fetching !== this.state.fetching) {
      this.setState({ fetching: this.state.fetching , rendered: false});
    }
  }

  render() {
    return (
      <div id="home">
        <Form data={data} handler={this.handleForm} />
        <section id="results">
          <History props={this.state.storageArray} handler={historyHandler} />
          <If condition={this.state.trigger}>
            <Then>
              <Results props={this.state} />
            </Then>
          </If>
        </section>
      </div>
    );
  }
}

/////////////////////////
//// HELPER Functions///
///////////////////////


function array (arr) {
  let newArr = [];
  const map = new Map();
  for (const item of arr) {
    if (!map.has(item.id)) {
      map.set(item.id, true);
      newArr.push({
        id: item.id,
        url: item.url,
        method: item.method,
        body: item.body,
        headers: item.headers,
        response: item.response
      });
    }
  }
  return newArr;
}


async function historyHandler(e) {
  let method = e.currentTarget.childNodes[0].innerHTML;
  let url = e.currentTarget.childNodes[1].innerHTML;
  let body = e.currentTarget.childNodes[2].innerHTML;

  const input = document.getElementById(`url`);
  input.value = url;

  const selected = document.getElementById(`${method}`);
  await selected.click();

  const text = document.getElementById('body');
  text.value = body;


};

export default Home;

