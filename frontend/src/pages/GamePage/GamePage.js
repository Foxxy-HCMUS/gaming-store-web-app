import React from "react";
import { useSelector } from "react-redux";

const GamePage = ({_id}) =>{
    const data = useSelector((state) => state.data.landingPageData);
    const saleData = data.filter((concac) => {
        let ids = concac.id 
        if (ids.toString() === _id){
            return concac;
        }
        return null;
    });
    console.log(saleData.title)
    return (
        <>
           <h1> {saleData.map((value, ind) => {return value.title})} </h1>
        </>
        
    );
}

export default GamePage;