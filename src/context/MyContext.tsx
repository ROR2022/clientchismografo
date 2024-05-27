// src/context/MyContext.js
"use client";
"use context";
import { createContext, useEffect } from 'react';
import { useLocalStorage } from "usehooks-ts";



const initDataChismoso = {
  _id: '',
  name: '',
  email: '',
  password: '',
  imageUrl: '',
  lastName: '',
  tokenChismoso: '',
};

export const MyContext = createContext(
  {
    dataLocalStorage: initDataChismoso,
    setDataLocalStorage: (data:any) => {},
    initDataChismoso
  }
);




export const MyProvider = ({ children }: { children: React.ReactNode }) => {
    const [dataLocalStorage, setDataLocalStorage] = useLocalStorage(
        "dataChismeApp",
        initDataChismoso
      );
  //const [state, setState] = useState('default value');
  useEffect(() => {
    //console.log('dataLocalStorage:...',dataLocalStorage);
    //setDataLocalStorage(dataLocalStorage);
  }, [dataLocalStorage]);

  return (
    <MyContext.Provider value={{ dataLocalStorage, setDataLocalStorage, initDataChismoso }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
