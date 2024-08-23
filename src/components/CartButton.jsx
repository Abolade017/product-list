import React from 'react'
const CartButton = () => {
    return (
        <>
            <button className='absolute -mt-4 mx-14 h-8 rounded-3xl outline outline-1 outline-Rose-400'>
                <div className='flex space-x-2 px-4 items-center'>
                    <img src='/images/icon-add-to-cart.svg' className='h-4 w-4' />
                    <p>Add to cart</p>
                </div>
            </button>
        </>
    )
}

export default CartButton