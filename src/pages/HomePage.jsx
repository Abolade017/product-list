import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'
import products from '../data.json'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import CartItems from '../components/CartItems'
import OrderModal from '../components/OrderModal'
import ConfirmOrder from '../components/ConfirmOrder'
const HomePage = () => {
    const [openModal, setOpenModal] = useState(false)
    const [cart, setCart] = useState([])
    const [open, setOpen] = useState(true)

    function addToCart(product) {
        setCart(prevCart => {
            const itemExists = prevCart.find(item => item.name === product.name && item.category === product.category);
            if (itemExists) {
                return prevCart.map(item =>
                    item.name === product.name && item.category === product.category
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    }
    const removeFromCart = (product => {
        setCart((prevCart) => {
            return prevCart
                .map(item => item.name === product.name ? { ...item, quantity: item.quantity - 1 } : item)
                .filter(item => item.quantity > 0);
        });
    }
    )

    function handleConfirmOrder() {
        if (cart.length <= 0) {
            alert("Please add items in cart!")
            return
        }
        setOpenModal(true);
    }
    function handleStartNewOrder() {
        setCart([]);
        setOpenModal(false);
    }

    useEffect(() => {
        if (openModal) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [openModal]);

    return (
        <>
            <div className='my-12 max-w-7xl mx-auto flex flex-col md:flex-row space-x-0 md:space-x-10 space-y-10 md:space-y-0 md:px-0 px-6'>
                <div className='w-full md:w-2/3'>
                    <div className='mb-8 md:mb-5'>
                        <h1 className='text-4xl md:text-3xl text-Rose-900 font-bold'>Desserts</h1>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6' >
                        {products.map((product, index) => {
                            const inCart = cart.some((item) => item.name === product.name && item.category === product.category)
                            const productInCart = cart.find((item) => item.name === product.name && item.category === product.category);
                            const quantity = productInCart ? productInCart?.quantity : 0;
                            return (
                                <div key={index} >
                                    <img src={product.image.desktop} className={` rounded-md relative md:w-full object-cover ${inCart && "rounded-md border border-red-rose "}`} />
                                    {inCart ?
                                        <button className='absolute -mt-4 mx-32  md:mx-[72px] h-8 rounded-3xl bg-red-rose'>
                                            <div className='flex justify-between w-28 px-2 items-center '>
                                                <FaMinusCircle className='text-white' onClick={() => removeFromCart(product)} />
                                                <div className='text-white'>{quantity}</div>
                                                <FaPlusCircle className='text-white' onClick={() => addToCart(product)} />
                                            </div></button> :
                                        <button className='absolute -mt-4 mx-32 md:mx-[64px] h-8 rounded-3xl outline outline-1 outline-Rose-400 hover:outline-red-rose hover:text-red-rose'>
                                            <div className='flex space-x-2 px-4 items-center'>
                                                <img src='/images/icon-add-to-cart.svg' className='h-4 w-4 text-red-rose' />
                                                <div className='text-Rose-900' onClick={() => addToCart(product)}>Add to cart</div>
                                            </div>
                                        </button>}
                                    <div className='mt-8'>
                                        <p className='text-sm text-Rose-400'>{product.category}</p>
                                        <p className='text-sm text-Rose-900 font-semibold'>{product.name}</p>
                                        <p className='text-sm text-red-rose'>${product.price.toFixed(2)}</p>
                                    </div>
                                </div>



                            )
                        }
                        )}
                    </div>
                    {openModal && createPortal
                        (<Dialog open={open} onClose={setOpen} className="relative z-10">
                            <DialogBackdrop
                                transition
                                className="fixed inset-0 bg-black bg-opacity-80 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                            />

                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                <div className="flex max-h-screen md:min-h-full items-center justify-start md:justify-center md:p-4 text-center sm:items-center  pt-10 px-0">
                                    <DialogPanel
                                        transition
                                        className="relative transform overflow-hidden rounded-lg bg-white px-6 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in mt-20 md:my-8 w-full md:max-w-xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                                    >
                                        <div className='md:pt-0 pt-10'>
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 border-2 border-green">
                                                <CheckIcon aria-hidden="true" className="h-5 w-5 text-green " />
                                            </div>
                                            <div className="mt-10  sm:mt-5">
                                                <DialogTitle as="h3" className="md:block hidden text-3xl font-semibold leading-6 text-Rose-900">
                                                    Order Confirmed
                                                </DialogTitle>
                                                <DialogTitle as="h3" className="text-4xl md:hidden block font-bold leading-10 text-Rose-900">
                                                    Order <br /> Confirmed
                                                </DialogTitle>
                                                <div className="mt-2">
                                                    <p className="text-sm text-Rose-400">
                                                        We hope you enjoyed your food!
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='mt-10 bg-Rose-100 rounded-md px-6'>
                                                {/* {cart.map((item, index) => { */}
                                                <CartItems cart={cart} handleConfirmOrder={handleConfirmOrder} />
                                                {/* }) */}
                                                {/* } */}
                                            </div>
                                        </div>
                                        <div className="mt-5 sm:mt-6">
                                            <button
                                                type="button"
                                                onClick={handleStartNewOrder}
                                                className="inline-flex w-full justify-center rounded-3xl bg-red-rose px-3 py-4 md:py-3 text-sm font-semibold text-white shadow-sm"
                                            >
                                                Start New Order
                                            </button>
                                        </div>
                                    </DialogPanel>
                                </div>
                            </div >
                        </Dialog >, document.getElementById('modal'))}
                </div>
                <div className='w-full md:w-1/3'>
                    <ConfirmOrder cart={cart} handleConfirmOrder={handleConfirmOrder} removeFromCart={removeFromCart} />
                </div>
            </div >
        </>
    )
}

export default HomePage