
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import CartItems from './CartItems'
import { Product } from './ConfirmOrder'
export default function OrderModal({ cart = Product, handleConfirmOrder }) {
    const [open, setOpen] = useState(true)
    // const total = cart.reduce((sum, item) => {
    //     sum + item.price * item.quantity, 0
    // })
    function handleModal() {
        return setOpen(!open)
    }
    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
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
                                <CartItems />

                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6">
                            <button
                                type="button"
                                onClick={handleModal}
                                className="inline-flex w-full justify-center rounded-3xl bg-red-rose px-3 py-4 md:py-3 text-sm font-semibold text-white shadow-sm"
                            >
                                Start New Order
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div >
        </Dialog >
    )
}
