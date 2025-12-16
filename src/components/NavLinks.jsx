import { NavLink } from 'react-router';

const NavLinks = ({name,icon,id, setIsPanelOpen}) => {
  // determine link path based on id
  const linkPath = id === 'dashboard' ? '/' : `/${id}`;

    return ( <>
            <NavLink to={linkPath} className={({isActive}) => isActive ?'border-2 border-gray-300 dark:border-gray-900 text-gray-800 dark:text-white flex space-x-2 items-center p-2 rounded-lg cursor-pointer mb-2 hover:bg-blue-500 hover:text-white ':'text-gray-800 dark:text-white flex space-x-2 items-center p-2 rounded-lg   cursor-pointer mb-2 hover:bg-blue-500 hover:text-white'} onClick={()=>{
                setIsPanelOpen(prev => !prev)}}>
                {icon}
                <header className="text-lg font-medium">{name}</header>
            </NavLink>    
    </> );
}
 
export default NavLinks;