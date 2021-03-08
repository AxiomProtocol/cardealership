import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Acerca from './acerca';
import Login from './RegisterLogin';

function App() {
  return (
    <div>
      <Switch>
        
        <Route path='/acerca' component={Acerca}/>
        <Route path='/login' component={Login}/>

      </Switch>
    </div>
  );
}

export default App;
