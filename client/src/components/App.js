import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Acerca from './acerca';

function App() {
  return (
    <div>
      <Switch>
        
        <Route path='/acerca' component={Acerca}/>

      </Switch>
    </div>
  );
}

export default App;
