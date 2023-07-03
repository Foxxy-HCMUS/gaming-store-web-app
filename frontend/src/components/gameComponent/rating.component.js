import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateGame } from '../../store/slices/rootSlice';
import { useEffect, useCallback, useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${value}`;
}

export default function HoverRating({data}) {

  const dispatch = useDispatch()
  const dataGame = data[0]
  const [updateGames, setUpdateGames] = useState(dataGame)
  
  const rating = dataGame["reviews"].rating 

  const [value, setValue] = useState(rating);
  const [hover, setHover] = useState(rating);
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate()
  const handleAuth = ()=>{
    if (!isAuthenticated){
      navigate("/signin")
    }
  }
  useEffect(()=>{
    const updateReviews = {
      rating: updateGames["reviews"].eval !== -1 &&  !isNaN(updateGames["reviews"].eval) ? Math.round(((updateGames["reviews"].rating*updateGames["reviews"].eval + value)/(updateGames["reviews"].eval+1))*10)/10: 0,
      eval: !isNaN(updateGames["reviews"].eval) ? updateGames["reviews"].eval + 1: 0
    }
    console.log(updateReviews)
    console.log(updateGames)

    setUpdateGames({...updateGames, reviews: updateReviews})
    console.log(updateGames)
    dispatch(updateGame(updateGames))
  }, [value, dispatch])


  // dispatch(updateGame(newgame))

  // useEffect(() => {
  //   dispatch(getOrders({ userId: 1 }));
  // }, [dispatch]);

  const handleClick = () =>{

  }


  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        // onClick= {handleClick}
        getLabelText={getLabelText}
        onClick={handleAuth}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55}} fontSize="inherit" />}
      />
      <div>
        <span>
            {value !== null && (
                <Box sx={{ ml: 2 }}>{hover !== -1 ? hover : value}</Box>
            )}
        </span>
      </div>
    </Box>
  );
}