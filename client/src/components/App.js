import React, { Fragment} from 'react';
import Navbar from './navbar/navbar'
import '../App.css'
import AddQuery from './AddTopic/addQuery'
import DisplayQuestions from './getQuestions/displayQuestions'
function App(){
    return (
      <Fragment>
          <Navbar/>
        <DisplayQuestions/>
        <AddQuery/>
      </Fragment>
    )
  }

export default App;
