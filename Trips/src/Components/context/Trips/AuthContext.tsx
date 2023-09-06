import { createContext, useState } from "react";

export interface AuthContextProviderProps {
    children: React.ReactNode;
}

export interface AuthContextType {
    token: string;
    setToken: (token: string) => void;
}
export const AuthContext = createContext<AuthContextType>({ token: "", setToken: () => { } });

function AuthContextProvider(props: AuthContextProviderProps) {
    const [token, setToken] = useState<string>('');

    return (<AuthContext.Provider value={{ token, setToken }}>
        {props.children}
    </AuthContext.Provider>)
}

export default AuthContextProvider;