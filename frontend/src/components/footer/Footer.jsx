import styles from "./Footer.module.css";
import NavBar from "../navBar";

const Footer = () => {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.main}>
          <div className={styles.icon_header}>
            <div className={styles.social_links}>
              <img src="/icons/fbwhite.svg" alt="facebooc" />
              <img src="/icons/twitterwhite.svg" alt="twitter" />
              <img src="/icons/utubewhite.svg" alt="youtube" />
            </div>

            <div className={styles.arrow}>
              <a href="#navbar">
                {" "}
                <img src="/icons/arrow.svg" alt="arrow" />
              </a>
            </div>
          </div>

          <div className={styles.lang_div}>
            <div className={styles.cont}>
              <div className={styles.resources}>
                <p className={styles.footer_heading}>Resources</p>
                <div className={styles.links}>
                  <p>Support-A-Creator</p> <p>Company</p>
                  <p>Store EULA </p>
                  <p>Publish on Play Archive</p>
                  <p>Fan art Policy</p>
                  <p>Russian</p> <p>Polish</p>
                  <p>Online Services</p>
                  <p>Careers</p> <p>UX Research</p>
                  <p>Community Rules</p>
                </div>
              </div>
            </div>
          </div>

          <p className={styles.bottom_text}>
            © 2023, Play Archive, Inc. All rights reserved.
          </p>

          <div className={styles.bottom_footer}>
            <div className={styles.left}>
              <p>Terms of Service</p>
              <p>Privacy Policy</p>
              <p>Store Refund Policy</p>
            </div>

            {/* <div className={styles.right}>
              <img src="/icons/Epic_Games_white.svg" alt="epicGamesLogo" />
              <img src="/icons/Unreal_Engine_Logo.svg" alt="unreal" />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;