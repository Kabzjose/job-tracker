//Managing login state and user information across the application
import  { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
  try {
    const stored = localStorage.getItem("user")
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
})

    //saves everything to localStorage so the data persists across page refreshes
    const login = (userData,accessToken,refreshToken)=>{
        localStorage.setItem("accessToken",accessToken)
        localStorage.setItem("refreshToken",refreshToken)
        localStorage.setItem("user",JSON.stringify(userData))
        setUser(userData)
    }

    
    //Clears everything from localStorage and sets user back to null.
    const logout =()=>{
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("user")
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{user,login,logout}}> {children}</AuthContext.Provider>
    )
}   

export const useAuth = () =>useContext(AuthContext)