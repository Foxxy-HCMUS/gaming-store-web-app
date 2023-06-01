import React from "react"
import "./listFeatures.component.css"
const ListFeatures = props => {
    if(props.data!=null){
        return(
            <>
                <ul className="features__container">
                    {
                        props.data.map((el, ind)=>{
                            return(<li className="features__item" key = {ind}>
                                {el}
                            </li>)
                        })
                    }
                </ul>
            </>
        )
    }
};

export default ListFeatures;