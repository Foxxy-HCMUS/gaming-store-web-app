import React from "react";
import styles from "./sideBar.module.css";
import { Link } from "react-router-dom";

const SideBar = ({ activatepage }) => {
  return (
    <div className={styles.sidebar}>
      {activatepage === "accountsetting" ? (
        <div className={styles.s2}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.7041 8.12232C14.7041 9.83964 13.2594 11.2446 11.4931 11.2446C9.72663 11.2446 8.28202 9.83956 8.28097 8.12232C8.28097 6.40501 9.72673 5 11.4931 5C13.2584 5 14.7041 6.40501 14.7041 8.12232Z"
              fill="currentColor"
            ></path>
            <path
              d="M11.4933 13.5343C8.9773 13.5343 4 14.7312 4 17.177V19.987H19.14V17.177C19.14 14.7312 14.0094 13.5343 11.4933 13.5343Z"
              fill="currentColor"
            ></path>
          </svg>
          <span>Account Setting</span>
        </div>
      ) : (
        <Link to="/profile/accountsetting" className='stylenone'>
          <div className={styles.s1}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.7041 8.12232C14.7041 9.83964 13.2594 11.2446 11.4931 11.2446C9.72663 11.2446 8.28202 9.83956 8.28097 8.12232C8.28097 6.40501 9.72673 5 11.4931 5C13.2584 5 14.7041 6.40501 14.7041 8.12232Z"
                fill="currentColor"
              ></path>
              <path
                d="M11.4933 13.5343C8.9773 13.5343 4 14.7312 4 17.177V19.987H19.14V17.177C19.14 14.7312 14.0094 13.5343 11.4933 13.5343Z"
                fill="currentColor"
              ></path>
            </svg>
            <span>Account Setting</span>
          </div>
        </Link>
      )}

      {activatepage === "yourorders" ? (
        <div className={styles.s2}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM16.2 16.2L11 13V7H12.5V12.2L17 14.9L16.2 16.2Z"
              fill="currentColor"
            ></path>
          </svg>
          <span>My Orders</span>
        </div>
      ) : (
        <Link to="/profile/yourorders" className='stylenone'>
          <div className={styles.s1}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM16.2 16.2L11 13V7H12.5V12.2L17 14.9L16.2 16.2Z"
                fill="currentColor"
              ></path>
            </svg>
            <span>My Orders</span>
          </div>
        </Link>
      )}

        {activatepage === "changepassword" ? (
        <div className={styles.s2}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 9.5H17.3333V7C17.3333 4.2425 14.9413 2 12 2C9.05867 2 6.66667 4.2425 6.66667 7V9.5H6C4.89778 9.5 4 10.3408 4 11.375V20.125C4 21.1592 4.89778 22 6 22H18C19.1022 22 20 21.1592 20 20.125V11.375C20 10.3408 19.1022 9.5 18 9.5ZM8.44444 7C8.44444 5.16167 10.0391 3.66667 12 3.66667C13.9609 3.66667 15.5556 5.16167 15.5556 7V9.5H8.44444V7ZM12.8889 15.935V17.8333C12.8889 18.2933 12.4916 18.6667 12 18.6667C11.5084 18.6667 11.1111 18.2933 11.1111 17.8333V15.935C10.5822 15.6458 10.2222 15.1142 10.2222 14.5C10.2222 13.5808 11.0196 12.8333 12 12.8333C12.9804 12.8333 13.7778 13.5808 13.7778 14.5C13.7778 15.1142 13.4178 15.6458 12.8889 15.935Z" fill="currentColor"></path></svg>
          <span>Change Password</span>
        </div>
      ) : (
        <Link to="/profile/changepassword" className='stylenone'>
          <div className={styles.s1}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 9.5H17.3333V7C17.3333 4.2425 14.9413 2 12 2C9.05867 2 6.66667 4.2425 6.66667 7V9.5H6C4.89778 9.5 4 10.3408 4 11.375V20.125C4 21.1592 4.89778 22 6 22H18C19.1022 22 20 21.1592 20 20.125V11.375C20 10.3408 19.1022 9.5 18 9.5ZM8.44444 7C8.44444 5.16167 10.0391 3.66667 12 3.66667C13.9609 3.66667 15.5556 5.16167 15.5556 7V9.5H8.44444V7ZM12.8889 15.935V17.8333C12.8889 18.2933 12.4916 18.6667 12 18.6667C11.5084 18.6667 11.1111 18.2933 11.1111 17.8333V15.935C10.5822 15.6458 10.2222 15.1142 10.2222 14.5C10.2222 13.5808 11.0196 12.8333 12 12.8333C12.9804 12.8333 13.7778 13.5808 13.7778 14.5C13.7778 15.1142 13.4178 15.6458 12.8889 15.935Z" fill="currentColor"></path></svg>
            <span>Change Password</span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default SideBar;
