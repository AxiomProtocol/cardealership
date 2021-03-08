import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Acerca from './acerca';
import Login from './RegisterLogin/index';
import Register from './RegisterLogin/register';

function App() {
  return (
    <div>
      <Switch>
        
        <Route path='/acerca' component={Acerca}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
      </Switch>
    </div>
  );
}

export default App;
