import React, { useEffect, useState } from 'react'
import { db } from '../../auth/firebase';

function Timer() {
   
        const [counter, setCounter] = useState(60);
      
        // Third Attempts
        useEffect(() => {
          const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
          return () => clearInterval(timer);
        }, [counter]);
      
        return (
          <div className="App">
            <div>Countdown:00: 00: {counter}</div>
          </div>
        );

}

export default Timer
