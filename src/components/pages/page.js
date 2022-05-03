import React , {Fragment} from "react"
import {Outlet} from "react-router-dom"


const Page = () => {
  return (  
    <Fragment>
        <Outlet/>
    </Fragment>
  );
}  

export default Page;
  