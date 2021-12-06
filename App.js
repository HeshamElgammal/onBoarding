//import liraries
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnBoarding from './src/pages/onBoarding/onBoardeing';
import Home from './src/pages/onBoarding/Home';

// create a component
const App = () => {
  const [appOpened, setAppOpened] = useState(false);
  const getData = async () => {
    const opened = JSON.parse(await AsyncStorage.getItem('appOpened'))
    if (opened !== null) {
      // value previously stored
      setAppOpened(true)
    } else {
      return 0
    }
  }

  useEffect(async () => {
    await getData()
  }, [])

  return (
    <>
      {appOpened ? <Home /> : <OnBoarding />}
    </>
  );
};



//make this component available to the app
export default App;
