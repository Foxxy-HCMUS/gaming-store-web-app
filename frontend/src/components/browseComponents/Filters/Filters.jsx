import theme from "./../../customTheme/customTheme";
import { ThemeProvider } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./Filters.module.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
const { useDispatch } = require("react-redux");
const { filterData, searchGames } = require("../../../store/slices/rootSlice");
const { BiSearch, BiCheck } = require("react-icons/bi");

const Filters = ( {handleSearch, searchTerm } ) => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    price: "",
    features: [],
    genres: [],
    platform: [],
  });

  const Sorting = (e) => {
    const { name, value, id, checked } = e.target;
    setFilter((prev) => {
      if (name === "price") {
        if (checked) {
          return {
            ...prev,
            price: value,
          };
        } else {
          return {
            ...prev,
            price: "",
          };
        }
      }

      if (id === "features") {
        if (checked) {
          return {
            ...prev,
            features: [...prev.features, value],
          };
        } else {
          return {
            ...prev,
            features: prev.features.filter((val) => {
              if (val !== value) {
                return val;
              } else {
                return false;
              }
            }),
          };
        }
      }

      if (id === "genres") {
        if (checked) {
          return {
            ...prev,
            genres: [...prev.genres, value],
          };
        } else {
          return {
            ...prev,
            genres: prev.genres.filter((val) => {
              if (val !== value) {
                return val;
              } else {
                return false;
              }
            }),
          };
        }
      }

      if (id === "platform") {
        console.log("test");
        if (checked) {
          return {
            ...prev,
            platform: [...prev.platform, value],
          };
        } else {
          return {
            ...prev,
            platform: prev.platform.filter((val) => {
              if (val !== value) {
                return val;
              } else {
                return false;
              }
            }),
          };
        }
      }
    });
  };

  // console.log(filter);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const newFilter = {};

    newFilter.price = filter?.price;
    if (filter && filter.features.length > 0) {
      newFilter.features = filter.features.join(",");
    }
    if (filter && filter.genres.length > 0) {
      newFilter.genres = filter.genres.join(",");
    }
    if (filter && filter.platform.length > 0) {
      newFilter.platform = filter.platform.join(",");
    }

    const query = new URLSearchParams(newFilter).toString();
    if (mounted) {
      dispatch(filterData(query));
    } else {
      setMounted(true);
    }
  }, [filter, mounted]);


  return (
    <>
      <div className={styles.filter_cont}>
        <div className={styles.heading_cont}>
          <span className={styles.heading}>Filters</span>
        </div>
        <div className={styles.search_box}>
          <input 
            type="text" 
            placeholder="Keywords" 
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className={styles.separate_line} />
        <div className={styles.filters}>
          <ThemeProvider theme={theme}>
            <Accordion
              sx={{
                background: "#121212",
                color: "#939393",
                boxShadow: "none",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#939393" }} />}
              >
                <Typography
                  style={{
                    fontWeight: 600,
                    fontSize: "11px",
                    letterSpacing: "0.5px",
                  }}
                >
                  PRICE
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ padding: "8px 6px 16px" }}>
                <div className={styles.checkboxes}>
                  <div className={styles.checkbox}>
                    <input
                      className={styles.checkbox_input}
                      value="1"
                      type="radio"
                      name="price"
                      onChange={(e) => Sorting(e)}
                    />
                    <div className={styles.checkbox_label}>
                      <span>Free</span>
                      <span className={styles.check}>
                        <BiCheck />
                      </span>
                    </div>
                  </div>
                  <div className={styles.checkbox}>
                    <input
                      value="750"
                      type="radio"
                      name="price"
                      onChange={(e) => Sorting(e)}
                      className={styles.checkbox_input}
                    />
                    <div className={styles.checkbox_label}>
                      <span>Under Rs. 750.00</span>
                      <span className={styles.check}>
                        <BiCheck />
                      </span>
                    </div>
                  </div>

                  <div className={styles.checkbox}>
                    <input
                      value="1500"
                      type="radio"
                      name="price"
                      onChange={(e) => Sorting(e)}
                      className={styles.checkbox_input}
                    />
                    <div className={styles.checkbox_label}>
                      <span>Under Rs. 1,500.00</span>
                      <span className={styles.check}>
                        <BiCheck />
                      </span>
                    </div>
                  </div>

                  <div className={styles.checkbox}>
                    <input
                      value="2500"
                      type="radio"
                      name="price"
                      onChange={(e) => Sorting(e)}
                      className={styles.checkbox_input}
                    />
                    <div className={styles.checkbox_label}>
                      <span>Under Rs. 2,500.00</span>
                      <span className={styles.check}>
                        <BiCheck />
                      </span>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </ThemeProvider>
        </div>

        <div className={styles.separate_line}></div>
        <div className={styles.filter}>
          <ThemeProvider theme={theme}>
            <Accordion
              sx={{
                background: "#121212",
                color: "#939393",
                boxShadow: "none",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#939393" }} />}
              >
                <Typography
                  style={{
                    fontWeight: 600,
                    fontSize: "11px",
                    letterSpacing: "0.5px",
                  }}
                >
                  GENRE
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ padding: "8px 6px 16px" }}>
                <div className={styles.checkboxes}>
                  <div className={styles.checkbox}>
                    <input
                      className={styles.checkbox_input}
                      type="checkbox"
                      id="genres"
                      onChange={(e) => Sorting(e)}
                      value="Action"
                    />
                    <div className={styles.checkbox_label}>
                      <span>Action</span>
                      <span className={styles.check}>
                        <BiCheck />
                      </span>
                    </div>
                  </div>

                  <div className={styles.checkbox}>
                    <input
                      className={styles.checkbox_input}
                      type="checkbox"
                      id="genres"
                      onChange={(e) => Sorting(e)}
                      value="Adventure"
                    />
                    <div className={styles.checkbox_label}>
                      <span>Adventure</span>
                      <span className={styles.check}>
                        <BiCheck />
                      </span>
                    </div>
                  </div>

                  <div className={styles.checkbox}>
                    <input
                      className={styles.checkbox_input}
                      type="checkbox"
                      id="genres"
                      onChange={(e) => Sorting(e)}
                      value="Strategy"
                    />
                    <div className={styles.checkbox_label}>
                      <span>Strategy</span>
                      <span className={styles.check}>
                        <BiCheck />
                      </span>
                    </div>
                  </div>

                  <div className={styles.checkbox}>
                    <input
                      className={styles.checkbox_input}
                      type="checkbox"
                      id="genres"
                      onChange={(e) => Sorting(e)}
                      value="Casual"
                    />
                    <div className={styles.checkbox_label}>
                      <span>Casual</span>
                      <span className={styles.check}>
                        <BiCheck />
                      </span>
                    </div>
                  </div>

                  <div className={styles.checkbox}>
                    <input
                      className={styles.checkbox_input}
                      type="checkbox"
                      id="genres"
                      onChange={(e) => Sorting(e)}
                      value="RPG"
                    />
                    <div className={styles.checkbox_label}>
                      <span>RPG</span>
                      <span className={styles.check}>
                        <BiCheck />
                      </span>
                    </div>
                  </div>

                  <div className={styles.checkbox}>
                    <input
                      className={styles.checkbox_input}
                      type="checkbox"
                      id="genres"
                      onChange={(e) => Sorting(e)}
                      value="Indie"
                    />
                    <div className={styles.checkbox_label}>
                      <span>Indie</span>
                      <span className={styles.check}>
                        <BiCheck />
                      </span>
                    </div>
                  </div>

                  <div className={styles.checkbox}>
                    <input
                      className={styles.checkbox_input}
                      type="checkbox"
                      id="genres"
                      onChange={(e) => Sorting(e)}
                      value="Shooter"
                    />
                    <div className={styles.checkbox_label}>
                      <span>Shooter</span>
                      <span className={styles.check}>
                        <BiCheck />
                      </span>
                    </div>
                  </div>

                  <div className={styles.checkbox}>
                    <input
                      className={styles.checkbox_input}
                      type="checkbox"
                      id="genres"
                      onChange={(e) => Sorting(e)}
                      value="Survival"
                    />
                    <div className={styles.checkbox_label}>
                      <span>Survival</span>
                      <span className={styles.check}>
                        <BiCheck />
                      </span>
                    </div>
                  </div>

                  <div className={styles.checkbox}>
                    <input
                      className={styles.checkbox_input}
                      type="checkbox"
                      id="genres"
                      onChange={(e) => Sorting(e)}
                      value="Horror"
                    />
                    <div className={styles.checkbox_label}>
                      <span>Horror</span>
                      <span className={styles.check}>
                        <BiCheck />
                      </span>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </ThemeProvider>

          <div className={styles.separate_line}></div>
          <div className={styles.filter}>
            <ThemeProvider theme={theme}>
              <Accordion
                sx={{
                  background: "#121212",
                  color: "#939393",
                  boxShadow: "none",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#939393" }} />}
                >
                  <Typography
                    style={{
                      fontWeight: 600,
                      fontSize: "11px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    FEATURES
                  </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ padding: "8px 6px 16px" }}>
                  <div className={styles.checkboxes}>
                    <div className={styles.checkbox}>
                      <input
                        className={styles.checkbox_input}
                        type="checkbox"
                        name="features"
                        id="features"
                        onChange={(e) => Sorting(e)}
                        value="Single-player"
                      />
                      <div className={styles.checkbox_label}>
                        <span>Single Player</span>
                        <span className={styles.check}>
                          <BiCheck />
                        </span>
                      </div>
                    </div>
                    <div className={styles.checkbox}>
                      <input
                        className={styles.checkbox_input}
                        type="checkbox"
                        name="features"
                        id="features"
                        onChange={(e) => Sorting(e)}
                        value="Controller-support"
                      />
                      <div className={styles.checkbox_label}>
                        <span>Controller Support</span>
                        <span className={styles.check}>
                          <BiCheck />
                        </span>
                      </div>
                    </div>
                    <div className={styles.checkbox}>
                      <input
                        className={styles.checkbox_input}
                        type="checkbox"
                        name="features"
                        id="features"
                        onChange={(e) => Sorting(e)}
                        value="Multiplayer"
                      />
                      <div className={styles.checkbox_label}>
                        <span>Multiplayer</span>
                        <span className={styles.check}>
                          <BiCheck />
                        </span>
                      </div>
                    </div>
                    <div className={styles.checkbox}>
                      <input
                        className={styles.checkbox_input}
                        type="checkbox"
                        name="features"
                        id="features"
                        onChange={(e) => Sorting(e)}
                        value="Co-op"
                      />
                      <div className={styles.checkbox_label}>
                        <span>Co-Op</span>
                        <span className={styles.check}>
                          <BiCheck />
                        </span>
                      </div>
                    </div>
                    <div className={styles.checkbox}>
                      <input
                        className={styles.checkbox_input}
                        type="checkbox"
                        name="features"
                        id="features"
                        onChange={(e) => Sorting(e)}
                        value="competitive"
                      />
                      <div className={styles.checkbox_label}>
                        <span>Competitive</span>
                        <span className={styles.check}>
                          <BiCheck />
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </ThemeProvider>
          </div>

          <div className={styles.separate_line}></div>
          <div className={styles.filter}>
            <ThemeProvider theme={theme}>
              <Accordion
                sx={{
                  background: "#121212",
                  color: "#939393",
                  boxShadow: "none",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#939393" }} />}
                >
                  <Typography
                    style={{
                      fontWeight: 600,
                      fontSize: "11px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    PLATFORM
                  </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ padding: "8px 6px 16px" }}>
                  <div className={styles.checkboxes}>
                    <div className={styles.checkbox}>
                      <input
                        className={styles.checkbox_input}
                        onChange={(e) => Sorting(e)}
                        value="Windows"
                        type="checkbox"
                        id="platform"
                      />
                      <div className={styles.checkbox_label}>
                        <span>Windows</span>
                        <span className={styles.check}>
                          <BiCheck />
                        </span>
                      </div>
                    </div>

                    <div className={styles.checkbox}>
                      <input
                        onChange={(e) => Sorting(e)}
                        value="Mac"
                        type="checkbox"
                        id="platform"
                        className={styles.checkbox_input}
                      />
                      <div className={styles.checkbox_label}>
                        <span>Mac Os</span>
                        <span className={styles.check}>
                          <BiCheck />
                        </span>
                      </div>
                    </div>

                    <div className={styles.checkbox}>
                      <input
                        onChange={(e) => Sorting(e)}
                        value="PlayStation"
                        type="checkbox"
                        id="platform"
                        className={styles.checkbox_input}
                      />
                      <div className={styles.checkbox_label}>
                        <span>Playstation</span>
                        <span className={styles.check}>
                          <BiCheck />
                        </span>
                      </div>
                    </div>

                    <div className={styles.checkbox}>
                      <input
                        onChange={(e) => Sorting(e)}
                        value="Xbox"
                        type="checkbox"
                        id="platform"
                        className={styles.checkbox_input}
                      />
                      <div className={styles.checkbox_label}>
                        <span>Xbox</span>
                        <span className={styles.check}>
                          <BiCheck />
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </ThemeProvider>
          </div>
          <div className={styles.separate_line} />
        </div>
      </div>
    </>
  );
};

export default Filters;
