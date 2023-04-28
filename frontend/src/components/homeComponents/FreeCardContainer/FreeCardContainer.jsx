import styles from "./FreeCardContainer.styles.css";

const FreeCardContainer = () => {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.upper}>
            <div className={styles.icon_div}>
              <img src="/icons/gift.svg" alt="giftIcon" />
              <p>Free Games</p>
            </div>
  
            <div>
              <button className={styles.btn}>VIEW MORE</button>
            </div>
          </div>
  
          <div className={styles.lower}>
            <div className={styles.games_card}>
              <div className={styles.image_div}>
                <img
                  className={styles.banner}
                  src="https://cdn1.epicgames.com/08ae29e4f70a4b62aa055e383381aa82/offer/EGS_Breathedge_RedRuinsSoftworks_S2-1200x1600-c0559585221ea11c9d48273c3a79b1ba.jpg?h=480&quality=medium&resize=1&w=360"
                  alt="freeCardImages"
                />
                <div className={styles.free}>Free Now</div>
              </div>
  
              <div className={styles.content}>
                <p className={styles.heading}>Breathedge</p>
                <p className={styles.subheading}>Free Now - May 04 at 10:00 PM</p>
              </div>
            </div>
  
            <div className={styles.games_card}>
              <div className={styles.image_div}>
                <img
                  className={styles.banner}
                  src="https://cdn1.epicgames.com/spt-assets/560813614bba464385b56f43524d17f0/download-poker-club-offer-16wlj.jpg?h=480&quality=medium&resize=1&w=360"
                  alt="freeCardImages"
                />
                <div className={styles.free}>Free Now</div>
              </div>
  
              <div className={styles.content}>
                <p className={styles.heading}>Poker Club</p>
                <p className={styles.subheading}>Free Now - May 04 at 10:00 PM</p>
              </div>
            </div>
  
            <div className={styles.games_card}>
              <div className={styles.image_div}>
                <img
                  className={styles.banner}
                  src="https://cdn1.epicgames.com/spt-assets/a2f2a8a46ff648928b50bcc776bf9857/download-slaughter-league-offer-16b3l.jpg?h=480&quality=medium&resize=1&w=360"
                  alt="freeCardImages"
                />
                <div className={styles.coming}>Coming Soon</div>
              </div>
  
              <div className={styles.content}>
                <p className={styles.heading}>
                Against All Odds
                </p>
                <p className={styles.subheading}>Free May 04 - May 11</p>
              </div>
            </div>
  
            <div className={styles.games_card}>
              <div className={styles.image_div}>
                <img
                  className={styles.banner}
                  src="https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_HorizonChaseTurbo_AQUIRIS_S2_1200x1600-7b51e6b8f8cf6ebd50f5fb77be96ad9d?h=480&quality=medium&resize=1&w=360"
                  alt="freeCardImages"
                />
                <div className={styles.coming}>Coming Soon</div>
              </div>
  
              <div className={styles.content}>
                <p className={styles.heading}>Horizon Chase Turbo</p>
                <p className={styles.subheading}>Free May 04 - May 11</p>
              </div>
            </div>

            <div className={styles.games_card}>
              <div className={styles.image_div}>
                <img
                  className={styles.banner}
                  src="https://cdn1.epicgames.com/spt-assets/4a2dcb55ecca496aaaf328f60263bb56/download-kao-the-kangaroo-offer-7wgw8.jpg?h=480&quality=medium&resize=1&w=360"
                  alt="freeCardImages"
                />
                <div className={styles.coming}>Coming Soon</div>
              </div>
  
              <div className={styles.content}>
                <p className={styles.heading}>Kao the Kangaroo</p>
                <p className={styles.subheading}>Free May 04 - May 11</p>
              </div>
            </div>

          </div>
        </div>
      </>
    );
  };
  
  export default FreeCardContainer;