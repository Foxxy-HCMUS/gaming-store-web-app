import React, { useEffect, useState } from "react";

import styles from "./librariesPage.module.css"
import { useDispatch, useSelector } from "react-redux";
import { fetchGames, fetchUserData, getOrders } from "../../store/slices/rootSlice";
import { fetchLandingPage } from "../../store/slices/dataSlice";
import { Link, useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver'

const LibrariesPage = () => {
    const dispatch = useDispatch()
    // dispatch(getOrders({userId : 1}))
    useEffect(()=>{
        console.log("oke")
        dispatch(fetchLandingPage())
        dispatch(fetchUserData())
    }, [dispatch])

    const userData = useSelector(state => state.user.userData)   


    useEffect(()=>{
        async function fetchData() {
            await dispatch(getOrders({ userId: userData.id }));
          }
          fetchData();
    },[dispatch, userData])


    const orders = useSelector(state => state.user.orders)
    const dataGetter = useSelector((state) => state.data.landingPageData)
    const [myLibraries, setMyLibraries] = useState([])

    useEffect(() =>{
        const gameOrdered = orders.map((el) => {
            var gameId_list = []
            const gameId =  el.order_games.map((el)=>{
                gameId_list.push(el.gameId)
            })
            return gameId_list
        }).flat(1)
        console.log(gameOrdered)
        console.log(dataGetter)
        if(dataGetter!=null && gameOrdered != null){
            const libraries = dataGetter.filter((feature) => gameOrdered.includes(feature.id))
            setMyLibraries(libraries)
        }

    }, [orders, dataGetter])
    const navigate = useNavigate()
    
    const downloadImage = (e)=>{
        const { thumbnails } = e.target
        console.log(e.target)
    }


    if (myLibraries!=null && myLibraries.length !== 0){
        return (<>
            <div className={styles.libraries}>
                <div className={styles.libraries__container}>
                    
                    <div className={styles.libraries__wrapper}>
                        <div className={styles.libraries__title}>My Libraries</div>
                        <div className={styles.libraries__list__items}>
                            {
                                myLibraries.map((el)=>{
                                    return (
                                        <div className={styles.libraries__item}>
                                            <div className={styles.libraries__item__container}>
                                                <div className={styles.libraries__item__img}>
                                                    <img src={el.thumbnails} alt=""></img>
                                                </div>
                                                <div className={styles.libraries__item__info}>
                                                    <div className={styles.libraries__item__title}>
                                                        <span>{el.title}</span>
                                                    </div>
                                                    <div className={styles.libraries__item__btns}>
                                                    
                                                        <button className={styles.libraries__btn__download} onClick={downloadImage}>
                                                            Download
                                                        </button>
                                                        <button className={styles.libraries__btn__info} >
                                                            <Link
                                                                to = {`/${el.id}`}
                                                                style={{
                                                                    "color": "#000"
                                                                }
                                                                }
                                                            >
                                                                <span>Infomation Game</span>
                                                            </Link>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </>)
    }
    
}

export default LibrariesPage