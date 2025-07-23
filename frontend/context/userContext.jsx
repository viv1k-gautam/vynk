import axios from "axios";  


import { createContext,useState,useEffect,Us } from 'react';

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        if(!user){
            axios.get('/profile').then(({data}) => {
                console.log("fetched user" ,data);
                setUser(data)
            })
        }

    }, [])
  
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )   
}