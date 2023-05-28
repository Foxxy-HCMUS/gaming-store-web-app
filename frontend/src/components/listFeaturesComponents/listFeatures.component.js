import React from "react"
import "./listFeatures.component.css"
const ListFeatures = props => {
    if(props.data!=null){
        return(
            <>
                <div className="features__container">
                    {
                        props.data.map((el, ind)=>{
                            return(<div className="features__item" key = {ind}>
                                {el}
                            </div>)
                        })
                    }
                </div>
            </>
        )
    }
};

export default ListFeatures;