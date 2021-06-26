
/////////////////////////////
////////// IMPORTS /////////
///////////////////////////

// Import React
import React from 'react';

//Import Styles
import './App.scss';

//=============//
// Components //
//===========//

//Import Header
import Header from './components/header/Header.js';

//Import Main
import Main from './components/main/Main';

//Import Footer
import Footer from './components/footer/footer';


//////////////////////////
////////// App  /////////
////////////////////////

class App extends React.Component{
  render(){
    return(
      <>
      <Header />
      <Main />
      <Footer />
      </>
    )
  }
}

export default App;

