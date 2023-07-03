import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateGame } from '../../store/slices/rootSlice';
import { useEffect } from 'react';
import { useState } from 'react';

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${value}`;
}

export default function HoverRating({data}) {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(0);
  const dispatch = useDispatch()
  const dataGame = data[0]
  const [updateGames, setUpdateGames] = useState(dataGame)

  useEffect(()=>{
    console.log(updateGames["reviews"])
    const reviewsGame = updateGames["reviews"]

    if (reviewsGame === null || updateGame.length === 0){
      const reviews = {rating: value, eval: 1}

      setUpdateGames({...updateGames, reviews: reviews})
    }
    else{
      const updateReviews = {
        rating:Math.round(((updateGames["reviews"].rating*updateGames["reviews"].eval + value)/(updateGames["reviews"].eval+1))*10)/10,
        eval: updateGames["reviews"].eval + 1
      }
      setUpdateGames({...updateGames, reviews: updateReviews})
    }
    console.log(updateGames["reviews"])
    dispatch(updateGame(updateGames))
  }, [value])


  // dispatch(updateGame(newgame))

  // useEffect(() => {
  //   dispatch(getOrders({ userId: 1 }));
  // }, [dispatch]);



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
        getLabelText={getLabelText}
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