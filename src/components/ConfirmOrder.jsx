import React, { useState } from 'react'
// import { createPortal } from 'react-dom'
import { FaXmark } from 'react-icons/fa6'
export const Product = [{
    name: '',
    image: {
        "thumbnail": "",
        "mobile": "",
        "tablet": "",
        "desktop": "",
    },
    category: '',
    price: 0,
    quantity: 0
}]
// const [openModal, setOpenModal] = useState(false)

const ConfirmOrder = ({ cart = Product, removeFromCart, handleConfirmOrder }) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    return (

        <div className='bg-white rounded-md shadow-md md:px-4 px-6  md:w-3/4'>
            <div className='text-red-rose text-lg font-bold'>Your Cart ({cart.length})</div>
            {cart.length > 0 ?
                <>
                    <div className=' py-6'>
                        {cart.map((item, index) => {
                            console.log("item", item);
                            return (
                                <>
                                    <div key={index} className='flex space-x-4 items-center justify-between py-4'>
                                        <div>
                                            <p className='capitalize text-Rose-900 font-semibold'>{item.name}</p>
                                            <div className='flex space-x-4 pt-2'>
                                                <p className=' text-red-rose font-semibold'>{item.quantity}x</p>
                                                <p className='text-Rose-300'>@${item.price.toFixed(2)}</p>
                                                <span className='text-Rose-500 '>${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div ><FaXmark className='text-sm border border-Rose-500 rounded-full text-Rose-500' onClick={() => removeFromCart(item)} /></div>

                                    </div>
                                    <hr />
                                </>
                            )

                        })}

                    </div>
                    <div className='flex justify-between pb-4'>
                        <p className='text-Rose-500'>Order Total</p>
                        <p className='text-xl text-Rose-900 font-bold'>${total.toFixed(2)}</p>
                    </div>
                    <div className='flex justify-center bg-Rose-100 rounded-sm'>
                        <div className=' flex space-x-2  py-3'>
                            <img src='/images/icon-carbon-neutral.svg' alt='carbon-neutral' />
                            <p className='text-sm text-Rose-900'>This is a <span className='font-bold'>carbon-neutral</span> delivery</p>
                        </div>
                    </div>
                    <div className="py-5 sm:my-6">
                        <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-3xl bg-red-rose  hover:bg-red-800  px-3 py-4 md:py-3 text-sm font-semibold text-white shadow-sm"
                            onClick={handleConfirmOrder}
                        >
                            Confirm Order
                        </button>
                        {/* {openModal && createPortal(<OrderModal setOpenModal={() => setOpenModal(!openModal)} cart={cart} handleConfirmOrder={handleConfirmOrder} />, document.getElementById('modal'))} */}

                    </div>

                </> :
                <>
                    <div className='flex justify-center items-center'>
                        <img src='/images/illustration-empty-cart.svg' alt='empty cart' className='object-contain' />
                    </div>
                    <p className='text-Rose-400 text-center text-sm'>Your added items will appear here</p>
                </>
            }
        </div>

    )
}

export default ConfirmOrder;
