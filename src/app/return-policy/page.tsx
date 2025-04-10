"use client"

import { Footer } from "@/components/Common/Footer"
import { Header } from "@/components/Common/Header"
import MenuHeader from "@/components/Common/MenuHeader"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Image from "next/image"

export default function SupportPolicyPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <MenuHeader />
            <section className="w-full py-4 px-4 md:px-[104px] bg-[#E3E6E6]">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <h1 className="text-xl md:text-2xl font-bold text-center md:text-left">Trang chính sách hoàn trả</h1>
                    <Breadcrumb className="mt-2 md:mt-0">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">
                                    <span>Trang chủ</span>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink className="font-semibold" href="/return-policy">
                                    <span>Chính sách hoàn trả</span>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </section>
            <section className="w-full pb-4 px-4 md:px-[104px] bg-[#E3E6E6]">
                <div className="bg-white p-4 md:p-6 text-sm text-gray-600">
                    <span>
                        <strong>Refunds and Return Policy</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        <strong>1. Application for Returns/Refunds</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        Subject to the terms and conditions in this Refunds and Return Policy and the Terms of Service, Buyer may apply for return of the purchased items ("Item") and/or refund prior to the expiry of the Guarantee Period as stated in the Terms of Service.
                    </span>
                    <br />
                    <br />
                    <span>
                        Guarantee is a service provided by <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        />, on User's request, to assist Users in dealing with certain conflicts which may arise during the course of a transaction. Users may communicate with each other privately to resolve their differences or approach their relevant local authorities to assist them in overcoming any dispute prior, during or after using Guarantee.
                    </span>
                    <br />
                    <br />
                    <span>
                        <strong>2. Application for the Return of an Item</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        Buyer may only apply for the refund and/or return of the Item in the following circumstances:
                    </span>
                    <br />
                    <br />
                    <span>
                        - The Item has not been received by Buyer;
                    </span>
                    <br />
                    <span>
                        - The Item was defective and/or damaged on delivery;
                    </span>
                    <br />
                    <span>
                        - Seller has delivered an Item that does not match the agreed specification (e.g. wrong size, colour, etc.) to Buyer;
                    </span>
                    <br />
                    <span>
                        - The Item delivered to Buyer is materially different from the description provided by Seller in the listing of the Item; or
                    </span>
                    <br />
                    <span>
                        - By way of private agreement with Seller and Seller must send his/her confirmation to <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> confirming such agreement.
                    </span>
                    <br />
                    <br />
                    <span>
                        Buyer's application must be submitted via the <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> mobile app within ten (10) calendar days after the return request is raised.
                    </span>
                    <br />
                    <br />
                    <span>
                        In the event where Buyer has commenced legal action against Seller, Buyer may provide the formal notification from the appropriate authority to <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> to request <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> to continue to hold the purchase monies until a formal determination is available. <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> will, at its sole and absolute discretion, determine whether it is necessary to continue to hold such purchase monies.
                    </span>
                    <br />
                    <br />
                    <span>
                        <strong>3. Rights of Preferred Sellers</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        If you are a Preferred Seller, you should have received a separate written notification from <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> informing you of your selection to participate in the Preferred Seller Program. If you decide not to participate in the Preferred Seller Program at any time, please inform <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> in writing; otherwise, you will be deemed to have elected to continue your participation in the Preferred Seller Program and consented to the terms and conditions set out in this Refunds and Return Policy. <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> may, at any time and at its sole discretion, suspend or remove any Preferred Seller from the Preferred Seller Program.
                    </span>
                    <br />
                    <br />
                    <span>
                        <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        />'s determination to approve a refund or return of an Item pursuant to Section 2 above is binding on the relevant Preferred Seller. Preferred Sellers agree to comply and do all such things as necessary to give effect to a Buyer's request for a refund or return approved by <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        />.
                    </span>
                    <br />
                    <br />
                    <span>
                        For any refund or return request approved by <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        />, <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> will notify the Preferred Seller by email ("Email Notification") and organize the delivery of the relevant returned Item to the address provided by the relevant Preferred Seller to <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> in writing for the completion of the refund and return process, so long as such address is in the country in which the relevant Item was listed for sale on the Site (a "Local Address"). If Preferred Seller fails to provide a Local Address for return of the returned Item or otherwise fails to accept delivery of the returned Item within a reasonable period of time (as determined by <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        />), <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> reserves the right to dispose of such Item in any manner it sees fit and Preferred Seller shall be deemed to have forfeited all rights to such Item. Preferred Seller must notify <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> within seven (7) days of receiving the Email Notification ("Notification Period") if Preferred Seller does not receive the returned Item. Failure to notify <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> within the Notification Period shall be conclusive evidence of, and result in the Preferred Seller having accepted that, the delivery of the Item has occurred, and Preferred Seller agrees not to make any claims or raise any disputes regarding any such Item.
                    </span>
                    <br />
                    <br />
                    <span>
                        Notwithstanding the above, <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> may determine at its sole and absolute discretion that an Item approved for refund or return shall not be returned to Preferred Seller, and Preferred Seller shall be deemed to have forfeited all rights to such Item.
                    </span>
                    <br />
                    <br />
                    <span>
                        For any refund or return rejected by <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> where the relevant Item was received by <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        />, <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> will organize the delivery of such Item to the relevant Buyer's address pursuant to Section 2 above.
                    </span>
                    <br />
                    <br />
                    <span>
                        Where <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        />'s decision is final, conclusive and binding, and covenants and agrees that it will not bring suit or otherwise assert any claim against <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> or its affiliates in relation to such decision.
                    </span>
                    <br />
                    <br />
                    <span>
                        <strong>4. Rights of Ordinary Sellers</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        For the purpose of this Refund and Return Policy, Ordinary Sellers are Sellers that are not Mall Sellers or Preferred Sellers.
                    </span>
                    <br />
                    <br />
                    <span>
                        When <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> receives an application from Buyer for the return of the Item and/or refund, <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> will notify Seller in writing. Seller may respond to Buyer's application according to the steps provided by <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> in the written notification. Seller must respond within the time-frame stipulated in the written notification (the "Stipulated Period"). Should <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> not hear from Seller within the Stipulated Period, <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> will assume that Seller has no response to Buyer's application and will proceed to assess Buyer's application without further notice to Seller. <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> will review each Seller's response on a case-by-case basis and, in its sole discretion, determine whether Buyer's application may be successful against the circumstances stated by Seller.
                    </span>
                    <br />
                    <br />
                    <span>
                        <strong>5. Condition of Returning Item</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        To enjoy a hassle-free experience when returning the Item, Buyer should ensure that the Item, including any complimentary items such as accessories that come with the Item, must be returned to Seller in the condition received by Buyer on delivery. We will recommend Buyer to take a photo of the Item upon receipt.
                    </span>
                    <br />
                    <br />
                    <span>
                        <strong>6. Liability of Product Forward Shipping Fee and Return Shipping Fee</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        In the scenario of an unforeseen error from the seller's end (i.e - damaged, faulty or wrong product delivered to the buyer), the seller will bear buyer's forward shipping fee and return shipping fee.
                    </span>
                    <br />
                    <br />
                    <span>
                        In the scenario of the buyer's change of mind, buyer shall get seller's consent prior to the return request and buyer will bear the return shipping fee.
                    </span>
                    <br />
                    <br />
                    <span>
                        In the scenario where both seller and buyer dispute the party liable for the forward shipping fee and return shipping fee, at its sole discretion will determine the party liable for the forward shipping fee and return shipping fee.
                    </span>
                    <br />
                    <br />
                    <span>
                        For the avoidance of doubt, should the seller be liable for the buyer's forward shipping fee and return shipping fee in any of the above scenarios, the seller shall be liable for the buyer's forward shipping fee even if the buyer used a Free Shipping Voucher for the delivery of the product.
                    </span>
                    <br />
                    <br />
                    <span>
                        <strong>7. Refunds</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                    Buyer will only be refunded after <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> has received the confirmation from Seller that Seller has received the returned Item. In the event where Seller does not respond within a specified time, <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> will be at liberty to refund the applicable sum to Buyer without further notice to Seller. For more information on Seller's response time limits, please click this link. The refund will be made to Buyer's credit/debit card or designated bank account, whichever is applicable.
                    </span>
                    <br />
                    <br />
                    <span>
                        <strong>8. Communication Between Buyer and Seller</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                    <Image
                            draggable={false}
                            src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                            alt="Logo"
                            width={44}
                            height={16}
                            style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                        /> Encourages Users to communicate with each other in the event where a problem arises in a transaction. As <Image
                        draggable={false}
                        src="https://img5.yeshen.cc/vn-alibaba/28/0a/28f8e540a990fac2f6dcdec0d4a0160df3f8cb0a.jpg"
                        alt="Logo"
                        width={44}
                        height={16}
                        style={{ display: 'inline-block', position: 'relative', bottom: '1px' }}
                    /> is a platform for Users to conduct trading, Buyer should contact Seller directly for any issue relating to the Item purchased.
                    </span>
                    <br />
                    <br />
                </div>
            </section>
            <Footer />
        </div>
    )
}

