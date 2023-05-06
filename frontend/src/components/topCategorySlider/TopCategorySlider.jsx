import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import styles from "./TopCategorySlider.module.css";

const TopCategorySlider = ({ text, onPrevClick, onNextClick }) => {
    return (
        <>
            <div className={styles.top}>
                <div className={styles.heading_cont}>
                    <p className={styles.heading}>{text}</p>
                    <MdOutlineKeyboardArrowRight className={styles.arrow} />
                </div>
                <div className={styles.icons}>
                    <div className={styles.icon} onClick={onPrevClick}>
                        <RiArrowLeftSLine />
                    </div>
                    <div className={styles.icon} onClick={onNextClick}>
                        <RiArrowRightSLine />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopCategorySlider;