/////////////////////////////
////////// IMPORTS /////////
///////////////////////////

// Import React
import React from 'react'

//Import Styles
import './main.scss';

// Import Route and Switch from Router dom
import { Route, Switch } from 'react-router-dom';

//=============//
// Components //
//===========//

import Home from '../home/Home';
import Help from '../help/Help';
import HistoryPage from '../history-page/HistoryPage';


//////////////////////////
////////// Main /////////
////////////////////////

class Main extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/history" component={HistoryPage}/>
          <Route path="/help" component={Help} />
          <Route>
            <div>
              <h2>404: Not Found</h2>
            </div>
          </Route>
        </Switch>
      </main>

    )
  }
}

export default Main