import React from 'react'
import { IoIosArrowRoundForward, IoIosTrash } from 'react-icons/io'



const DeleteButton = ({ onClick }) => {
    return (
        <button className="deleteButton" type='submit' onClick={() => onClick()}>
            Delete <IoIosTrash className='iconDelete' size={"24"} style={{ minWidth: '24px' }} />
        </button>
    )
}

export default DeleteButton