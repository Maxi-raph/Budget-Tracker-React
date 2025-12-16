import { useEffect } from 'react';
import {useLocation} from 'react-router'

const ScrollTop = () => {
  // get current pathname using useLocation hook
  const {pathname} = useLocation()

  useEffect(()=>{
    window.scrollTo(0,0)

    
  },[pathname])

    return null;
}
 
export default ScrollTop;