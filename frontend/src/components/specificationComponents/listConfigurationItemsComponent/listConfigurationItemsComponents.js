import React from "react";
import "./listConfigurationItemsComponents.css"

const ListConfigurationsItems = props =>{
    const dataConfigs = props.recommend
    const _keys = Object.keys(dataConfigs)
    return (
        <>
            <ul className = "configuration__listItems">
                {_keys.map((_key, ind)=>{
                    return(<>
                        <li key = {ind} className="configuration__item">
                            <div className = "configuration__item__title">{_key}</div>
                            <div className = "configuration__item__value">{dataConfigs[_key]}</div>
                        </li>
                    </>
                    )
                })}
            </ul>
        </>
    )
}

export default ListConfigurationsItems;