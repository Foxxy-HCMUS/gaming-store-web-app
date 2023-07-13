import React, { useEffect, useState } from "react";
import { fetchAdminBoard, fetchAllUserForAdmin, fetchAllUserRolesForAdmin, fetchOnlyUserForAdmin, fetchUserData } from "../../store/slices/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchLandingPage } from "../../store/slices/dataSlice";




const AdminPage = () => {
    const dispatch = useDispatch();
    
    // useEffect(()=>{
    //     dispatch(fetchOnlyUserForAdmin())
    // }, [dispatch])


    return(
        <>
            <div>oke</div>
        </>
    )
}

export default AdminPage