import React, { createContext, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    
    const [userConnect, setuserConnect] = useState(false);
    const [connectedUser, setconnectedUser] = useState(null);
    

    const deleteUser = (id) => {
        setconnectedUser(false)
        setuserConnect(false)
    }
    

    return (
        <UserContext.Provider value={{ userConnect, setuserConnect, connectedUser, setconnectedUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};
