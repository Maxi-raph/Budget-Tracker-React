import { Link } from 'react-router';

const NavLinks = ({name,icon,id, setIsPanelOpen,activeLink,setActiveLink}) => {
  // determine link path based on id
  const linkPath = id === 'dashboard' ? '/' : `/${id}`;

    return ( <>
            <Link to={linkPath} className={`text-gray-800 dark:text-white flex space-x-2 items-center p-2 rounded-lg   cursor-pointer mb-2 hover:bg-blue-500 hover:text-white ${activeLink && activeLink[id]?'border-2 border-gray-300 dark:border-gray-900 rounded-lg':''}`} onClick={()=>{
                setIsPanelOpen(prev => !prev)
                setActiveLink(prev=> prev = ({'dashboard':false,'transactions':false,'reports':false,[id]:true}))}}>
                {icon}
                <header className="text-lg font-medium">{name}</header>
            </Link>    
    </> );
}
 
export default NavLinks;