import React from 'react';
import './App.css';
import {TargetsListProvider} from 'context';
import {Month} from 'components';

function App() {
    return (
        <TargetsListProvider>
            <Month />
        </TargetsListProvider>
    );
}

export default App;
