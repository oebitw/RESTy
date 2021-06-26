////////////////////
//// Imports //////
//////////////////

//React
import React from 'react';

// React If-Then
import { If, Then } from 'react-if';

// Json Pretty View
import ReactJson from 'react-json-view';



//////////////////////////
////History Component ///
////////////////////////

class HistoryRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: JSON.parse(localStorage.getItem('history')) || [],
      result: [],
      trigger: false,
      data:[],
    };
  }
  clickRoute = async (data) => {
    await this.setState({ result: data, trigger: true });
    localStorage.setItem('data', JSON.stringify(data));
    console.log(data.response);
  };
  render() {
    return (
      <section id="historyPage">
        <section id="historyPTable">
          <table>
            <thead>
              <tr>
                <th>Method</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              <If condition={this.state.history.length > 0}>
                <Then>
                  {this.state.history.map((val, i) => {
                    return (
                      <tr
                        key={i + val.method + val.url + val.body}
                    
                        onClick={() => {this.clickRoute(val)}}
                      >
                        <th  id={`his${val.method}`}>
                          {val.method}
                        </th>
                        <td>{val.url}</td>
                        <td style={{ display: 'none' }}>{val.body}</td>
                      </tr>
                    );
                  })}
                </Then>
              </If>
            </tbody>
          </table>
        </section>
        <If condition={this.state.trigger && this.state.result}>
          <Then>
            <div className="result">
              <h3>Details</h3>
              <p>
                API: {this.state.result.url}
              </p>
              <p>
                METHOD: {this.state.result.method}
              </p>
              <If condition={this.state.result.body}>
                <Then>
                  <p>
                   BODY: {this.state.result.body}
                  </p>
                </Then>
              </If>

            </div>
            <div className="resultSec">
            <h2>Headers</h2>
              <ReactJson
                src={this.state.result.headers}
                name="Headers"
              />
              <h2>Response</h2>
              <ReactJson
                src={this.state.result.response}
                name="Response"
              />
            </div>
          </Then>
        </If>
      </section>
    );
  }
}


export default HistoryRoute;
