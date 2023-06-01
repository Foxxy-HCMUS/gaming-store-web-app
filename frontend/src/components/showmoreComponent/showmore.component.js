import React, { useState } from "react";
import "./showmore.component.css"
const ShowMore = props =>{

    const [isActive, setIsActive] = useState(false);
    const handleClick = event => {
        setIsActive(current => !current);
    }

    return(
        <>
            <div className = "showmore__container">
                <div className = {`showmore__card ${isActive? "active": ""}`}>
                    <div className = "showmore__content">
                        {props.data}
                    </div>
                    <button className= "showmore__btn" onClick = {handleClick}></button>
                </div>
            </div>
        </>
    )
}

export default ShowMore;