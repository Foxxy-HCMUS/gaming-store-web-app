import React from "react";
import styles from "./accountSetting.module.css";

const ChangePassword = () => {
    
    return (
        <div className={styles.accountsetting}>
            <h1 className={styles.mainhead1}>Change Password</h1>
            <div className={styles.form}>

                <div className={styles.form_group}>
                    <label htmlFor='oldpass'>Old Password<span>*</span></label>
                    <input type='password'/>
                </div>

                <div className={styles.form_group}>
                    <label htmlFor='newpass'>New Password</label>
                    <input type='password'/>
                </div>

            </div>
            <button className={styles.mainbutton1}>Save Changes</button>

        </div>
    )
};

export default ChangePassword;