import React from 'react'
import { Product } from "../components/ConfirmOrder"

const CartItems = ({ cart = Product, handleConfirmOrder }) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return (
        <>
            {cart.map((item, index) => {
                console.log(item)
                return (
                    <>
                        <div key={index}>
                            <div className='flex justify-between items-center py-6'>
                                <div >
                                    <div className='flex space-x-4 '>
                                        <div><img src={item.image.desktop} alt='item-image' className='w-20 h-20 rounded-md' /></div>
                                        <div>
                                            <div className='capitalize text-Rose-900 font-semibold'>{item.name}</div>
                                            <div className='flex justify-between'>
                                                <div className='flex space-x-4 pt-2'>
                                                    <p className=' text-red-rose font-semibold'>{item.quantity}x</p>
                                                    <p className='text-Rose-300'>@${item.price.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div >

                                </div>
                                <div className='font-semibold text-Rose-900'>${(item.price * item.quantity).toFixed(2)}</div>

                            </div>
                            <hr />
                        </div >

                    </>

                )

            })
            }

            <>                        <div className='flex justify-between py-10'>
                <p className='text-Rose-900'>Order Total</p>
                <p className='text-xl text-Rose-900 font-bold'>${total.toFixed(2)}</p>
            </div></>
        </>
    )
}

export default CartItems