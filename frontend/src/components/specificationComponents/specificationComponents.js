import React, { useEffect, useState } from "react";
import "./specificationComponents.css"
import ListConfigurations from "./listConfigurationComponents";

const SpecificationTable = props =>{
    const specifications = props.data
    const configurations = specifications["Configurations"]
    const supportedLanguage = specifications["Languages Supported"]
    const platforms = Object.keys(configurations).reverse()
    // console.log(platform[0])
    const [platform, setPlatform] = useState(platforms[0])
    const [configs, setConfigs] = useState(configurations[platform])
    let activeElement = new Array(platform.length).fill(false)
    activeElement[0] = true
    const [isActive, setIsActive] = useState(activeElement)
    
    const handleClick = (index) =>{
        setPlatform(platforms[index])
        let newActiveElement = new Array(platform.length).fill(false)
        newActiveElement[index] = true
        setIsActive(newActiveElement)
    }

    useEffect(()=>{
        setConfigs(configurations[platform])
    }, [platform, configurations])


    return( 
        <>
            <div className="specification">
                <div className="specification__container">
                    <div className={"specification__platform__list__btns"}>
                    {
                        platforms.map((key, ind) => {
                            return (<button className= {`specification__platform__btn`} onClick = {() => handleClick(ind)} key = {ind}>
                                <div className={`specification__platform__btn__title ${isActive[ind]?"active":""}`}>
                                    {key}
                                </div>
                            </button>)
                        })
                    }
                    </div>
                    <ListConfigurations data = {configs}/>

                    <div className="specification__login specification__wrapper">
                        <div className="specification__title specification__login__title">Logins</div>
                        <div className="specification__value specification__login__value">{specifications["Login"]?"Requires Store's account":"No need account for playing"}</div>
                    </div>

                    <div className="specification__supported specification__wrapper">
                        <div className="specification__supported__audio specification__wrapper">
                            <div className="specification__title specification__audio__title">Audio</div>
                            <ul className="specification__wrapper specification__list__values specification__audio__list__values">{supportedLanguage["Audio"].map((el, ind)=>{
                                return <li className="specification__value specification__audio__value">{el}</li>
                            })}</ul>
                        </div>
                        <div className="specification__supported__text specification__wrapper">
                        <div className="specification__title specification__text__title">Text</div>
                            <ul className="specification__wrapper specification__list__values specification__text__list__values">{supportedLanguage["Text"].map((el, ind)=>{
                                return <li className="specification__value specification__text__value">{el}</li>
                            })}</ul>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
};

export default SpecificationTable