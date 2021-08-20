import './App.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route} from 'react-router-dom';
import Pokemon from './pokemon/Pokemon'

export default class App extends Component
{
 
    render()
    {
      return (
      
        <div>

          <Switch>
              <Route exact path= "/" render={()=>< Pokemon/>}/>
          </Switch>
        </div>
      )
    }
}
