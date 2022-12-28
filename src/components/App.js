import React from 'react';
import { useReducer } from 'react';
import reducer,{initialState} from "../reducers/index";
import { addOne, applyNumber, changeOperation,clearDisplay,memoryOperations } from '../actions';

import './App.css';

import TotalDisplay from './TotalDisplay';
import CalcButton from './CalcButton';

function App() {
  const [state,dispatch]=useReducer(reducer,initialState);
  const handleAddOne = () => {
    dispatch(addOne());
  }
  const handleApplyNumber = (sayi) => {
    dispatch(applyNumber(sayi));
  }
  

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#"> Reducer Challenge</a>
      </nav>

      <div className = "container row mt-5">
        <div className="col-md-12 d-flex justify-content-center">
          <form name="Cal">
            
            <TotalDisplay value={state["total"]}/>
            <div className="row details">
              <span id="operation"><b>Operation:</b> {state["operation"]}</span>
              <span id="memory"><b>Memory:</b> {state.memory}</span>
            </div>
            
            <div className="row">
              {
                ["M+","MR","MC"].map(m => (
                  <CalcButton onClick={()=>{dispatch(memoryOperations(m))}} value={m}/>
                ))
              }
            </div>
            {
              [0,1,2].map(i => (
                <div className="row">
                  {
                    [1,2,3].map(j => (
                      <CalcButton key ={j + 3*i}onClick={()=>{handleApplyNumber(j + 3*i)}} value={j + 3*i}/>
                    ))
                  }
                </div>
              ))
            }
            {
              <div className="row">
                {
                  ["+","*","-"].map(opr => (
                    <CalcButton onClick={()=>{dispatch(changeOperation(opr))}} value={opr}/>
                  ))
                }
              </div>
            }

            <div className="row ce_button">
              <CalcButton onClick={()=>dispatch(clearDisplay())} value={"CE"}/>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default App;