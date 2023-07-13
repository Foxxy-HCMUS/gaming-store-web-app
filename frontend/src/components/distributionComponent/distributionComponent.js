import React from "react";
import "./distributionComponent.css"

const DistributionComponent = props => {
    return(
        <>
        <div className="marketing_card">
            <div className="marketing_card__image">
                <img src={props.image} alt=""></img>
            </div>

            <div className="marketing_cart__title">
                <span>{props.title}</span>
            </div>

            <div className="marketing_cart__content">
                <span>{props.content}</span>
            </div>
        </div>
           
        </>
    )
}

export default DistributionComponent