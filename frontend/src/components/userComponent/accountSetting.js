import React from 'react';
import styles from './accountSetting.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../store/slices/rootSlice';
import { useEffect } from 'react';


const AccountSetting = () => {
    const dispatch = useDispatch(); 
    const user = useSelector(state => state.user.userData);
    console.log(user);
    useEffect(() => {
        dispatch(fetchUserData())
    }, [dispatch]);
    return (
        <div className={styles.accountsetting}>
            <h1 className={styles.mainhead1}>Account Settings</h1>
            <h2 className={styles.mainhead2}>Manage's your account details</h2>
            <div className={styles.form}>

                <div className={styles.form_group}>
                    <label htmlFor='lastname'>Last Name</label>
                    <input type='text' name="last" id='lastname'placeholder={user.lastName}/>
                </div>

                <div className={styles.form_group}>
                    <label htmlFor='firstname'>First Name</label>
                    <input type='text' name="firstname" id='firstname'placeholder={user.firstName}/>
                </div>

                <div className={styles.form_group}>
                    <label htmlFor='email'>Email <span>*</span></label>
                    <input type='email' name="email" id='email' placeholder={user.email}/>
                </div>

                <div className={styles.form_group}>
                    <label htmlFor='name'>User Name</label>
                    <input type='text' name="name" id='name' placeholder={user.username}/>
                </div>

            </div>
            <button className={styles.mainbutton1}>Save Changes</button>

        </div>
    )
};

export default AccountSetting;