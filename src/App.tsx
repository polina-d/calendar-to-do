import React from 'react';
import './App.css';
import {TargetsListProvider} from 'context';
import {Month} from 'components';

function App() {
    return (
        <TargetsListProvider>
            <div className='App'>
                <Month />
            </div>
        </TargetsListProvider>
    );
}

export default App;
