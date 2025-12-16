import { createContext, useContext,useEffect,useState } from "react";


const ThemeContext = createContext()


export const ThemeProvider = ({children})=>{
  // internal state
const [theme,setTheme] = useState(()=> localStorage.getItem('theme') ||'light')

  // function to toggle theme between light and dark
  const toggleTheme = ()=>{
    setTheme(prev => prev === 'light'? 'dark' : 'light')
  }
  
  // useEffect to apply theme to document and store preference in localStorage
  useEffect(()=>{
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    localStorage.setItem('theme',theme)
  },[theme])


    return(
        <ThemeContext.Provider value={{toggleTheme,theme}}>
            {children}
        </ThemeContext.Provider>
    )
}


export const useTheme = ()=> useContext(ThemeContext)