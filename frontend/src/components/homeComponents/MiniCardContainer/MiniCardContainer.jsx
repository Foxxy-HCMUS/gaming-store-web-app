import { Link, useNavigate } from "react-router-dom";
import styles from "./MiniCardContainer.module.css";

import MiniCard from "./MiniCard";

const MiniCardContainer = ({ data, heading }) => {
  const navigate = useNavigate()
  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div>
              <p className={styles.heading}>{heading}</p>
            </div>
            <div className={styles.button_div}>
              <button className={styles.button} onClick={()=>{navigate("/browse")}}>VIEW MORE</button>
            </div>
          </div>

          {data.map((val, i) => {
            return (
              <Link key={i} to={`/${val?.id}`}>
                <div className={styles.card}>
                  <MiniCard
                    banner={val?.cardImage}
                    title={val?.title}
                    mainPrice={val?.mainPrice}
                    discountPercentage={val?.discountPercentage}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MiniCardContainer;
