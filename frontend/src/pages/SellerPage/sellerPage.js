import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLandingPage } from "../../store/slices/dataSlice";
import styles from "./SellerPage.module.css"
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../components/customTheme/customTheme";
import { useNavigate } from "react-router-dom";
import { addGames, fetchUserData} from "../../store/slices/rootSlice";

const SellerPage = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchLandingPage())
      }, [dispatch])
    
    useEffect(()=>{
        dispatch(fetchUserData());
    },[dispatch]);

    const [data, setData] = useState({
        username: "",
        email: "",
        title: "",
        description: "",
        thumbnails: "",
        cardImage: "",
        cardTagline: "",
        logo: "",
        mainPrice: "",
        discountPercentage: "",
        discountPrice: "",
        deverloper: "",
        publisher: "",
        releaseDate: "",
        platform: "",
        genres: "",
        features: "",
        tags: "",
        aboutGames: "",
        gameFeatures: "",
        heroImages: "",
        images: "",
        specifications: "",
    });
    
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        title: "",
        description: "",
        thumbnails: "",
        cardImage: "",
        cardTagline: "",
        logo: "",
        mainPrice: "",
        discountPercentage: "",
        discountPrice: "",
        deverloper: "",
        publisher: "",
        releaseDate: "",
        platform: "",
        genres: "",
        features: "",
        tags: "",
        aboutGames: "",
        gameFeatures: "",
        heroImages: "",
        images: "",
        specifications: "",
    });

    const isValidUrl = (value) => {
        // Sử dụng một biểu thức chính quy (regular expression) đơn giản để kiểm tra xem "value" có phải là một liên kết URL hợp lệ hay không
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(value);
      };
      
    const handleInput = (e) => {
        setData((prev) => {
          return {
            ...prev,
            [e.target.name]: e.target.value,
          };
        });
    
        // Add validation for each field
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
          case "username":
            if (value.length <= 0) {
                setErrors((prev) => ({ ...prev, username: "THIS FIELD IS REQUIRED" }));
              } else {
                setErrors((prev) => ({ ...prev, username: "" }));
              }
            break;
          case "email":
            if (!value.match(/^\S+@\S+\.\S+$/)) {
              setErrors((prev) => ({ ...prev, email: "INVALID EMAIL" }));
            }
            else if (value.length <= 0) {
                setErrors((prev) => ({ ...prev, email: "THIS FIELD IS REQUIRED" }));
            }
            else {
              setErrors((prev) => ({ ...prev, email: "" }));
            }
            break;
          case "title":
            if (value.length <= 0) {
                setErrors((prev) => ({ ...prev, title: "THIS FIELD IS REQUIRED" }));
            } else {
                setErrors((prev) => ({ ...prev, title: "" }));
            }
            break;
          case "genres":
            if (value.length <= 0) {
                setErrors((prev) => ({ ...prev, genres: "THIS FIELD IS REQUIRED" }));
            } else {
                setErrors((prev) => ({ ...prev, genres: "" }));
            }
            break;
          case "specifications":
            if (value.length <= 0) {
                setErrors((prev) => ({ ...prev, specifications: "THIS FIELD IS REQUIRED" }));
            } else {
                setErrors((prev) => ({ ...prev, specifications: "" }));
            }
            break;
          case "mainPrice":
            if (value.length <= 0) {
                setErrors((prev) => ({ ...prev, mainPrice: "THIS FIELD IS REQUIRED" }));
            } 
            else if (/^(0|[1-9][0-9]*)\.?[0-9]*$/.test(value)){
                setErrors((prev) => ({ ...prev, mainPrice: "" }));
            } 
            else {
                setErrors((prev) => ({ ...prev, mainPrice: "PRICE MUST BE NUMERIC" }));
            }
            break;
          case "thumbnails":
            if (value.length <= 0) {
                setErrors((prev) => ({ ...prev, thumbnails: "THIS FIELD IS REQUIRED" }));
            } else if (!isValidUrl(value)) {
                setErrors((prev) => ({ ...prev, thumbnails: "INVALID URL" }));
            } else {
                setErrors((prev) => ({ ...prev, thumbnails: "" }));
            }
            break;
          case "cardImage":
            if (value.length <= 0) {
                setErrors((prev) => ({ ...prev, cardImage: "THIS FIELD IS REQUIRED" }));
            } else if (!isValidUrl(value)) {
                setErrors((prev) => ({ ...prev, cardImage: "INVALID URL" }));
            } else {
                setErrors((prev) => ({ ...prev, cardImage: "" }));
            }
            break;
          case "cardTagline":
            if (value.length <= 0) {
                setErrors((prev) => ({ ...prev, cardTagline: "THIS FIELD IS REQUIRED" }));
            } else if (!isValidUrl(value)) {
                setErrors((prev) => ({ ...prev, cardTagline: "INVALID URL" }));
            } else {
                setErrors((prev) => ({ ...prev, cardTagline: "" }));
            }
            break;
          case "logo":
            if (value.length <= 0) {
                setErrors((prev) => ({ ...prev, logo: "THIS FIELD IS REQUIRED" }));
            } else if (!isValidUrl(value)) {
                setErrors((prev) => ({ ...prev, logo: "INVALID URL" }));
            } else {
                setErrors((prev) => ({ ...prev, logo: "" }));
            }
            break;
          case "discountPercentage":
            if (value.length <= 0) {
                setErrors((prev) => ({ ...prev, discountPercentage: "THIS FIELD IS REQUIRED" }));
            } 
            else if (/^(0|[1-9][0-9]*)\.?[0-9]*$/.test(value)){
                setErrors((prev) => ({ ...prev, discountPercentage: "" }));
            } 
            else {
                setErrors((prev) => ({ ...prev, discountPercentage: "PRICE MUST BE POSITIVE NUMERIC" }));
            }
            break;
          case "discountPrice":
            if (value.length <= 0) {
                setErrors((prev) => ({ ...prev, discountPrice: "THIS FIELD IS REQUIRED" }));
            } 
            else if (/^(0|[1-9][0-9]*)\.?[0-9]*$/.test(value)){
                setErrors((prev) => ({ ...prev, discountPrice: "" }));
            } 
            else {
                setErrors((prev) => ({ ...prev, discountPrice: "PRICE MUST BE NUMERIC" }));
            }
            break;
          case "developer":
            if (value.length <= 0) {
                setErrors((prev) => ({ ...prev, logo: "THIS FIELD IS REQUIRED" }));
            } else {
                setErrors((prev) => ({ ...prev, logo: "" }));
            }
            break;
          case "publisher":
            if (value.length <= 0) {
                setErrors((prev) => ({ ...prev, publisher: "THIS FIELD IS REQUIRED" }));
            } else {
                setErrors((prev) => ({ ...prev, publisher: "" }));
            }
            break;
          case "releaseDate":
            if (value.length <= 0) {
                setErrors((prev) => ({ ...prev, releaseDate: "THIS FIELD IS REQUIRED" }));
            } else {
                setErrors((prev) => ({ ...prev, releaseDate: "" }));
            }
            break;
          case "platform":
            if (value.length <= 0) {
                setErrors((prev) => ({ ...prev, platform: "THIS FIELD IS REQUIRED" }));
            } else {
                setErrors((prev) => ({ ...prev, platform: "" }));
            }
            break;
          case "features":
            if (value.length <= 0) {
                setErrors((prev) => ({ ...prev, features: "THIS FIELD IS REQUIRED" }));
            } else {
                setErrors((prev) => ({ ...prev, features: "" }));
            }
            break;
          case "tags":
            if (value.length <= 0) {
                setErrors((prev) => ({ ...prev, tags: "THIS FIELD IS REQUIRED" }));
            } else {
                setErrors((prev) => ({ ...prev, tags: "" }));
            }
            break;
          case "aboutGame":
            if (value.length <= 0) {
                setErrors((prev) => ({ ...prev, aboutGame: "THIS FIELD IS REQUIRED" }));
            } else {
                setErrors((prev) => ({ ...prev, aboutGame: "" }));
            }
            break;
          case "gameFeatures":
            if (value.length <= 0) {
                setErrors((prev) => ({ ...prev, gameFeatures: "THIS FIELD IS REQUIRED" }));
            } else {
                setErrors((prev) => ({ ...prev, gameFeatures: "" }));
            }
            break;
          case "heroImages":
            if (value.length <= 0) {
                setErrors((prev) => ({ ...prev, heroImages: "THIS FIELD IS REQUIRED" }));
            } else if (!isValidUrl(value)) {
                setErrors((prev) => ({ ...prev, heroImages: "INVALID URL" }));
            } else {
                setErrors((prev) => ({ ...prev, heroImages: "" }));
            }
            break;
          case "images":
            if (value.length <= 0) {
                setErrors((prev) => ({ ...prev, images: "THIS FIELD IS REQUIRED" }));
            } else if (!isValidUrl(value)) {
                setErrors((prev) => ({ ...prev, images: "INVALID URL" }));
            } else {
                setErrors((prev) => ({ ...prev, images: "" }));
            }
            break;
          case "description":
            if (value.length <= 0) {
                setErrors((prev) => ({ ...prev, description: "THIS FIELD IS REQUIRED" }));
            } 
            else if (value.length >= 10000){
                setErrors((prev) => ({ ...prev, description: "DESCRIPTION MUST BELOW 10000 CHARACTERS" }));
            } else {
                setErrors((prev) => ({ ...prev, description: "" }));
            }
            break;
          default:
            break;
        }
      };

    const [file, setFile] = useState(null);
    const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

    const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    }

    function handleSignIn(e){
        e.preventDefault();
        if (!isAuthenticated){
            navigate("/signin");
        }
    }

    const navigate = useNavigate()
    const handleSendGames = (e) => {
        dispatch(addGames(data))
        navigate("/")
};

    return(
        <>
            <div className={styles.seller_page}>
                <div className={styles.seller_page__container}>
                    <div className={styles.seller_page__sub_navbar}>
                        <div className={styles.seller_page__title}>
                            <span>Seller's Game</span>
                        </div>
                    </div>
                    <div className={styles.seller_page_small}>
                        <div className={styles.seller_page_info}>
                        This information is public to all customers who visit your Seller Profile page.
                        </div>
                        <div className={styles.seller_page_box}>
                            <ThemeProvider theme={theme}>
                                <TextField
                                required
                                style={{ width: "100%" }}
                                label="Username"
                                value={data.username}
                                onChange={handleInput}
                                name="username"
                                error={errors.username !== ''}
                                helperText={errors.username !== ''}
                                />
                            </ThemeProvider>
                            <ThemeProvider theme={theme}>
                                <TextField
                                required
                                style={{ width: "100%" }}
                                label="Email address"
                                value={data.email}
                                onChange={handleInput}
                                name="email"
                                error={errors.email !== ""}
                                helperText={errors.email}
                                />
                            </ThemeProvider>
                        </div>
                        <div className={styles.seller_page_box}>
                            <ThemeProvider theme={theme}>
                                <TextField
                                required
                                style={{ width: "100%" }}
                                label="Game title"
                                value={data.title}
                                onChange={handleInput}
                                name="title"
                                error={errors.title !== ""}
                                helperText={errors.title}
                                />
                            </ThemeProvider>
                            <ThemeProvider theme={theme}>
                                <TextField
                                required
                                style={{ width: "100%" }}
                                label="Genres"
                                value={data.genres}
                                onChange={handleInput}
                                name="genres"
                                error={errors.genres !== ""}
                                helperText={errors.genres}
                                />
                            </ThemeProvider>
                        </div>
                        <div className={styles.seller_page_box}>
                            <ThemeProvider theme={theme}>
                                <TextField
                                required
                                style={{ width: "100%" }}
                                label="Support for"
                                value={data.specifications}
                                onChange={handleInput}
                                name="specifications"
                                error={errors.specifications !== ""}
                                helperText={errors.specifications}
                                />
                                </ThemeProvider>
                            <ThemeProvider theme={theme}>
                                <TextField
                                required
                                style={{ width: "100%" }}
                                label="Price"
                                value={data.mainPrice}
                                onChange={handleInput}
                                name="mainPrice"
                                error={errors.mainPrice !== ""}
                                helperText={errors.mainPrice}
                                />
                            </ThemeProvider>
                        </div>
                        <div className={styles.seller_page_box}>
                            <ThemeProvider theme={theme}>
                                <TextField
                                required
                                style={{ width: "100%" }}
                                label="Thumbnail image"
                                value={data.thumbnails}
                                onChange={handleInput}
                                name="thumbnails"
                                error={errors.thumbnails !== ""}
                                helperText={errors.thumbnails}
                                />
                                </ThemeProvider>
                            <ThemeProvider theme={theme}>
                                <TextField
                                required
                                style={{ width: "100%" }}
                                label="Card Image"
                                value={data.cardImage}
                                onChange={handleInput}
                                name="cardImage"
                                error={errors.cardImage !== ""}
                                helperText={errors.cardImage}
                                />
                            </ThemeProvider>
                        </div>
                        <div className={styles.seller_page_box}>
                            <ThemeProvider theme={theme}>
                                <TextField
                                required
                                style={{ width: "100%" }}
                                label="Card Tagline"
                                value={data.cardTagline}
                                onChange={handleInput}
                                name="cardTagline"
                                error={errors.cardTagline !== ""}
                                helperText={errors.cardTagline}
                                />
                                </ThemeProvider>
                            <ThemeProvider theme={theme}>
                                <TextField
                                required
                                style={{ width: "100%" }}
                                label="Logo"
                                value={data.logo}
                                onChange={handleInput}
                                name="logo"
                                error={errors.logo !== ""}
                                helperText={errors.logo}
                                />
                            </ThemeProvider>
                        </div>
                        <div className={styles.seller_page_box}>
                            <ThemeProvider theme={theme}>
                                <TextField
                                required
                                style={{ width: "100%" }}
                                label="Discount percentage"
                                value={data.discountPercentage}
                                onChange={handleInput}
                                name="discountPercentage"
                                error={errors.discountPercentage !== ""}
                                helperText={errors.discountPercentage}
                                />
                                </ThemeProvider>
                            <ThemeProvider theme={theme}>
                                <TextField
                                required
                                style={{ width: "100%" }}
                                label="Discount price"
                                value={data.discountPrice}
                                onChange={handleInput}
                                name="discountPrice"
                                error={errors.discountPrice !== ""}
                                helperText={errors.discountPrice}
                                />
                            </ThemeProvider>
                        </div>
                        <div className={styles.seller_page_box}>
                            <ThemeProvider theme={theme}>
                                <TextField
                                required
                                style={{ width: "100%" }}
                                label="Developer"
                                value={data.deverloper}
                                onChange={handleInput}
                                name="deverloper"
                                error={errors.deverloper !== ""}
                                helperText={errors.deverloper}
                                />
                                </ThemeProvider>
                            <ThemeProvider theme={theme}>
                                <TextField
                                required
                                style={{ width: "100%" }}
                                label="Publisher"
                                value={data.publisher}
                                onChange={handleInput}
                                name="publisher"
                                error={errors.publisher !== ""}
                                helperText={errors.publisher}
                                />
                            </ThemeProvider>
                        </div>
                        <div className={styles.seller_page_box}>
                            <ThemeProvider theme={theme}>
                                <TextField
                                required
                                style={{ width: "100%" }}
                                label="Date release"
                                value={data.releaseDate}
                                onChange={handleInput}
                                name="releaseDate"
                                error={errors.releaseDate !== ""}
                                helperText={errors.releaseDate}
                                />
                                </ThemeProvider>
                            <ThemeProvider theme={theme}>
                                <TextField
                                required
                                style={{ width: "100%" }}
                                label="Platform"
                                value={data.platform}
                                onChange={handleInput}
                                name="platform"
                                error={errors.platform !== ""}
                                helperText={errors.platform}
                                />
                            </ThemeProvider>
                        </div>
                        <div className={styles.seller_page_box}>
                            <ThemeProvider theme={theme}>
                                <TextField
                                required
                                style={{ width: "100%" }}
                                label="Features"
                                value={data.features}
                                onChange={handleInput}
                                name="features"
                                error={errors.features !== ""}
                                helperText={errors.features}
                                />
                                </ThemeProvider>
                            <ThemeProvider theme={theme}>
                                <TextField
                                required
                                style={{ width: "100%" }}
                                label="Tags"
                                value={data.tags}
                                onChange={handleInput}
                                name="tags"
                                error={errors.tags !== ""}
                                helperText={errors.tags}
                                />
                            </ThemeProvider>
                        </div>
                        <div className={styles.seller_page_box}>
                            <ThemeProvider theme={theme}>
                                <TextField
                                required
                                style={{ width: "100%" }}
                                label="About game"
                                value={data.aboutGames}
                                onChange={handleInput}
                                name="aboutGames"
                                error={errors.aboutGames !== ""}
                                helperText={errors.aboutGames}
                                />
                                </ThemeProvider>
                            <ThemeProvider theme={theme}>
                                <TextField
                                required
                                style={{ width: "100%" }}
                                label="Game features"
                                value={data.gameFeatures}
                                onChange={handleInput}
                                name="gameFeatures"
                                error={errors.gameFeatures !== ""}
                                helperText={errors.gameFeatures}
                                />
                            </ThemeProvider>
                        </div>
                        <div className={styles.seller_page_box}>
                            <ThemeProvider theme={theme}>
                                <TextField
                                required
                                style={{ width: "100%" }}
                                label="Hero images"
                                value={data.heroImages}
                                onChange={handleInput}
                                name="heroImages"
                                error={errors.heroImages !== ""}
                                helperText={errors.heroImages}
                                />
                                </ThemeProvider>
                            <ThemeProvider theme={theme}>
                                <TextField
                                required
                                style={{ width: "100%" }}
                                label="Slider images"
                                value={data.images}
                                onChange={handleInput}
                                name="images"
                                error={errors.images !== ""}
                                helperText={errors.images}
                                />
                            </ThemeProvider>
                        </div>
                        <div className={styles.seller_page_box}>
                        <ThemeProvider theme={theme}>
                                <TextField
                                required
                                style={{ width: "100%" }}
                                label="Description"
                                value={data.description}
                                onChange={handleInput}
                                name="description"
                                error={errors.description !== ""}
                                helperText={errors.description}
                                />
                                </ThemeProvider>
                        </div>
                        <div className={styles.seller_page_box}>
                        <ThemeProvider theme={theme}>
                                <TextField
                                style={{ width: "100%" }}
                                label="More Information"
                                />
                                </ThemeProvider>
                        </div>
                        <div className={styles.seller_page_box}>
                            <div className={styles.seller_box_medium}>
                                <label htmlFor="fileUpload" className={styles.file_upload_label}>
                                </label>
                            <input type="file" id="fileUpload" accept=".gam, .sav, .rom, .GAM, .SAV, .ROM" onChange={handleFileChange} className={styles.file_upload_input} />
                            </div>
                        </div>
                        <div className={styles.seller_page_info}>
                        By posting the game(s), you agree to the intellectual property law, your game will be approved by the admins soon.
                        </div>
                        <div className={styles.seller_game_btns}>
                            <div className={styles.seller_game_btn}>
                                <button className ={styles.seller_game_send} onClick={handleSendGames}>
                                    <span>Send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SellerPage;