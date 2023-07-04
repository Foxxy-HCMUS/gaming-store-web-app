import React, { Component } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer";
import SideBar from "../../components/userComponent/sideBar";
import styles from "./board-user.module.css";
import AccountSetting from "../../components/userComponent/accountSetting";
import ChangePassword from "../../components/userComponent/changePassword";
import YourOrders from "../../components/userComponent/yourOrders";

const ProfilePage = () => {
  const { activepage } = useParams();
  // alert(activatePage);
  return (
    <div className={styles.userprofile}>
      <div className={styles.userprofilein}>
        <div className={styles.left}> 
          <SideBar activepage={activepage}/>
        </div> 
        <div className={styles.right}>
          {activepage === "accountsetting" && <AccountSetting />}
          {activepage === "changepassword" && <ChangePassword />}
          {activepage === 'yourorders' && <YourOrders/>}
        </div>    
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;