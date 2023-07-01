import { useEffect } from "react";
import Card from "../../components/wishlistComponents/Card/Card";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchWishlist } from "../../store/slices/rootSlice";

const WishlistPage = () => {
  const dispatch = useDispatch();
  // const wishlistData = useSelector((state) => state.user.userData.wishlist);
  useEffect(() => {
    dispatch(fetchWishlist())
      .then((wishlistData) => {
        console.log(wishlistData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);
//   console.log(wishlistData);
  return (
    <>
      <Card />
    </>
  );
};

export default WishlistPage;
