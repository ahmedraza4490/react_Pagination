import { SidebarData } from "./navbarData"
import { Link} from "react-router-dom" 
import "./navbar.css"
import "@fontsource/poppins";

import * as FaIcons from "react-icons/fa"; 
import * as AiIcons from "react-icons/ai";
import { useState } from "react";

import { IconContext } from "react-icons";

export const Navbar = () => {
    console.log(SidebarData)
    const [sidebar,setsidebar] = useState(false);
    const showsidebar =() => setsidebar(!sidebar);

    return (
        <div>
            <IconContext.Provider value={{ color: "#FFF" }}>
                <div className="navbar">
                   <Link to="#" className="menu-bars">
                   <FaIcons.FaBars onClick={showsidebar} />
                   </Link>

                </div>

                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showsidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <li style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                
            <img style={{width :"30%", height: "10%",display : "inline-block"}}
        src="images/retailoicon.png"
        alt="react logo"
      />
            </li>
        
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>



                </IconContext.Provider>
        </div>
    )



}