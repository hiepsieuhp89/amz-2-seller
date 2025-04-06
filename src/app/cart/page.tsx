"use client"

import { Footer } from "@/components/Common/Footer"
import { Header } from "@/components/Common/Header"
import MenuHeader from "@/components/Common/MenuHeader"
import { Icon } from '@mdi/react'
import { mdiCartOutline, mdiMapMarkerOutline, mdiTruckDeliveryOutline, mdiCreditCardOutline, mdiCheckCircleOutline, mdiEmoticonSadOutline } from '@mdi/js'

export default function CartPage() {
    return (
        <main className="bg-[#E3E6E6]">
            <Header />
            <MenuHeader />
            <div className="max-w-[1440px] mx-auto relative">
            <section className="py-8 px-[104px] max-w-[1440px] flex-1 bg-[#E3E6E6]">
                    <section className="mb-4 pt-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-8 mx-auto">
                                    <div className="flex justify-between items-center">
                                        <div className="text-center flex flex-col items-center">
                                            <div className="bg-primary rounded-full p-2 flex items-center justify-center w-12 h-12 text-white mb-2">
                                                <Icon path={mdiCartOutline} size={1} />
                                            </div>
                                            <span className="text-xs font-medium text-primary">1. Giỏ hàng của tôi</span>
                                        </div>
                                        <div className="border-t border-gray-300 flex-grow mx-2"></div>
                                        <div className="text-center flex flex-col items-center">
                                            <div className="bg-gray-200 rounded-full p-2 flex items-center justify-center w-12 h-12 text-gray-400 mb-2">
                                                <Icon path={mdiMapMarkerOutline} size={1} />
                                            </div>
                                            <span className="text-xs font-medium text-gray-400">2. Thông tin vận chuyển</span>
                                        </div>
                                        <div className="border-t border-gray-300 flex-grow mx-2"></div>
                                        <div className="text-center flex flex-col items-center">
                                            <div className="bg-gray-200 rounded-full p-2 flex items-center justify-center w-12 h-12 text-gray-400 mb-2">
                                                <Icon path={mdiTruckDeliveryOutline} size={1} />
                                            </div>
                                            <span className="text-xs font-medium text-gray-400">3. Thông tin giao hàng</span>
                                        </div>
                                        <div className="border-t border-gray-300 flex-grow mx-2"></div>
                                        <div className="text-center flex flex-col items-center">
                                            <div className="bg-gray-200 rounded-full p-2 flex items-center justify-center w-12 h-12 text-gray-400 mb-2">
                                                <Icon path={mdiCreditCardOutline} size={1} />
                                            </div>
                                            <span className="text-xs font-medium text-gray-400">4. Thanh toán</span>
                                        </div>
                                        <div className="border-t border-gray-300 flex-grow mx-2"></div>
                                        <div className="text-center flex flex-col items-center">
                                            <div className="bg-gray-200 rounded-full p-2 flex items-center justify-center w-12 h-12 text-gray-400 mb-2">
                                                <Icon path={mdiCheckCircleOutline} size={1} />
                                            </div>
                                            <span className="text-xs font-medium text-gray-400">5. Xác nhận</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-4" id="cart-summary">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-8 mx-auto">
                                    <div className="rounded bg-white p-8 shadow-sm">
                                        <div className="p-3 text-center flex flex-col items-center">
                                            <Icon path={mdiEmoticonSadOutline} size={3} className="text-gray-400 mb-4" />
                                            <h3 className="text-xl font-medium">Giỏ của bạn trống trơn</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </div>
            <Footer />
        </main>
    )
}

