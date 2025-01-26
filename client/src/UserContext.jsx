import { createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
export const UserContext = createContext({});

export function UserContextprovider({children}) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                setUser(data); 
                setReady(true);
            });
            
        }
    } );
    return (
        <UserContext.Provider value={{ user, setUser , ready }}>
            {children}
        </UserContext.Provider>
    );
}

UserContextprovider.propTypes = {
    children: PropTypes.node.isRequired,
};