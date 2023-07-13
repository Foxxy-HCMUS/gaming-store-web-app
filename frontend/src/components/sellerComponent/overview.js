import React from 'react'

const Overview = () => {
    return (
        <div> 
            <div className='w-full flex flex-col gap-4'>
                <div>
                    <label htmlFor="title">Title </label>
                    <input type="text" id="title" className='w-full rounded-md outline-none border border-gray-300 p-2' />
                </div>
                <div className='w-1/2'>
                    <select id="select-game">
                        <option value="">--Game--</option>
                        </select>
                </div>
            </div>
        </div>
    )
}

export default Overview