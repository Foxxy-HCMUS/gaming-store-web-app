import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateGame } from '../../store/slices/rootSlice';
import { useEffect } from 'react';

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${value}`;
}

export default function HoverRating({rating}) {
  const [value, setValue] = React.useState(rating);
  const [hover, setHover] = React.useState(3);

  // var game = useSelector(state=> state.data.games.data[0])
  // var newgame = {...game, reviews: 3};

  const dispatch = useDispatch()
  // dispatch(updateGame(newgame))

  useEffect(() => {
    dispatch(getOrders({ userId: 1 }));
  }, [dispatch]);


  console.log(rating)
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