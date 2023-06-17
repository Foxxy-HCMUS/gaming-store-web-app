import React from "react";
import "./listConfigurationComponents.css"
import ListConfigurationsItems from "../listConfigurationItemsComponent/listConfigurationItemsComponents";


const ListConfigurations = props => {
    const configs = props.data
    const keys = Object.keys(configs)
    return(
        <>
            <div className="configuration">
                <div className="configuration__container">
                        {keys.map((recommend, index)=>{
                            return (
                                <div className={`configuration__wrapper configuration__wrapper__col${index}`} key = {index}>
                                    <div className="configuration__recommended">{recommend}</div>
                                    <ListConfigurationsItems recommend = {configs[recommend]}/>
                                </div>
                            );
                        })}
                </div>
            </div> 
        </>
    )
}

export default ListConfigurations;