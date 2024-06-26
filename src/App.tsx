import React from 'react';
import './App.css';
import {Calendar} from 'components';
import {Provider} from 'react-redux';
import {setupStore} from 'store';

const store = setupStore();

function App() {
    return (
        <Provider store={store}>
            <div className='App'>
                <Calendar />
            </div>
        </Provider>
    );
}

export default App;
