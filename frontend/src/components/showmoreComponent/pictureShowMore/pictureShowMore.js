import React from "react";
import "./pictureShowMore.component.css"
const PictureShowMore = props =>{
    const images = props.data
    let setupImages = []
    let part = 2
    for(let i =0;i < images.length; i+=part){
        setupImages.push(images.slice(i, i+part))
        if (part === 1){
            part = 2
        }
        else{
            part = 1
        }
    }

    return(    
        <div className="showmore__images__container">
            {
                setupImages.map((arrImages) => {
                    return <ul className="showmore__images__row">
                        {arrImages.map((image, ind)=>{
                            return <li className={`showmore__images__col showmore__images__col${ind}`}><div className="showmore__images__wrapper"><img src={image} alt="" key = {image}/></div></li>
                        })}
                    </ul>
                })
            }
        </div>
    )
   
};

export default PictureShowMore;