import { useEffect } from 'react';
import {useLocation} from 'react-router'

const ScrollTop = () => {
  // get current pathname
  const {pathname} = useLocation()
  
  // scroll to top on pathname change
  useEffect(()=>{
    window.scrollTo(0,0)

    
  },[pathname])

    return null;
}
 
export default ScrollTop;