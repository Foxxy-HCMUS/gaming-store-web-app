import React, { useEffect, useState } from 'react'
import './yourOrders.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLandingPage } from '../../store/slices/dataSlice'
import { fetchUserData, getOrders } from '../../store/slices/rootSlice'

const YourOrders = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchUserData())
    }, [dispatch])

    const userData = useSelector(state => state.user.userData)   


    useEffect(()=>{
        dispatch(getOrders({ userId: userData.id }));
        //   fetchData();
    },[dispatch, userData])


    const orders = useSelector(state => state.user.orders)



    const data = orders.map(el => {return ({
                                        id: el.id,
                                        date: el.orderDate.slice(0, 10),
                                        status: el.orderStatus,
                                        total: el.orderTotal,
                                        payment: el.orderPayment.method
                                        // date: Date.parse(el.orderDate),

    })})
    // const data = [
    //     {
    //         id: 112345,
    //         date: '12/12/2021',
    //         status: 'Success',
    //         total: 1000
    //     },
    //     {
    //         id: 112346,
    //         date: '12/12/2021',
    //         status: 'Pending',
    //         total: 1600
    //     },
    //     {
    //         id: 112347,
    //         date: '12/12/2021',
    //         status: 'Success',
    //         total: 2000
    //     },
    //     {
    //         id: 112348,
    //         date: '12/12/2021',
    //         status: 'Cancelled',
    //         total: 100
    //     },
    //     {
    //         id: 112345,
    //         date: '12/12/2021',
    //         status: 'Success',
    //         total: 1000
    //     },
    //     {
    //         id: 112346,
    //         date: '12/12/2021',
    //         status: 'Pending',
    //         total: 1600
    //     },
    //     {
    //         id: 112347,
    //         date: '12/12/2021',
    //         status: 'Success',
    //         total: 2000
    //     },
    //     {
    //         id: 112348,
    //         date: '12/12/2021',
    //         status: 'Cancelled',
    //         total: 100
    //     }
    // ]
    return (
        <div className='yourorders'>
            <h1 className='mainhead1'>Your Orders</h1>
            <table className='yourorderstable'>
                <thead>
                    <tr>
                        <th scope='col'>Oder ID</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Total</th>
                        <th scope='col'>Payment Method</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td data-label='OrderID'>{item.id}</td>
                                <td data-label='OrderDate'>{item.date}</td>
                                <td data-label='Delivery Status'>
                                    <div>
                                        {item.status === 'success' && <span className='greendot'></span>}
                                        {item.status === 'pending' && <span className='yellowdot'></span>}
                                        {item.status === 'cancelled' && <span className='reddot'></span>}
                                        {item.status}
                                    </div>
                                </td>
                                <td data-label='Total'>${item.total}</td>
                                <td data-label='Payment'>{item.payment}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default YourOrders;