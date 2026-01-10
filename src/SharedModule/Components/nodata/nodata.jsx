import React from "react";
import nodata from "../../../assets/images/nodata.jpg";

const Nodata =()=> {
    return(
       <>
        <div className="text-center mt-2">
            <img src={nodata} />
            <h5>OOops, There is nodata</h5>
           
        </div>
       </>

    )
    
}
export default Nodata;