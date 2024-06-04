import React from 'react';
import './App.css';
import {useCalendar} from "./useCalendar";

function App() {
    const {
        selectedMonth, calendarDays,
        onClickArrow
    } = useCalendar({selectedDate: new Date()})
    return (
        <div className="App">
            <p>{selectedMonth.monthName} {selectedMonth.year}</p>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%',
            }}>
                {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((item) => (
                    <div style={{width: '14%'}} key={item}>
                        <p style={{textTransform: 'uppercase'}}>
                            {item}
                        </p>
                    </div>
                ))}
                {calendarDays?.map((item) => (
                    <div style={{width: '14%'}} key={item?.dayNumber + '-' + item?.month}>
                        <p style={{
                            textTransform: 'uppercase',
                            color: item?.monthIndex === selectedMonth.monthIndex ? 'black' : 'grey'
                        }}>
                            {item?.dayNumber}
                        </p>
                    </div>
                ))}
            </div>
            <button onClick={() => onClickArrow('left')}>Left</button>
            <button onClick={() => onClickArrow('right')}>Right</button>
        </div>
    );
}

export default App;
