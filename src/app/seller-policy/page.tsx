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

export default function SellerPolicyPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <MenuHeader />
            <section className="w-full py-4 px-4 md:px-[104px] bg-[#E3E6E6]">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <h1 className="text-2xl font-bold">Trang chính sách bán hàng</h1>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">
                                    <span>Trang chủ</span>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink className="font-semibold" href="/seller-policy">
                                    <span>Chính sách người bán</span>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </section>
            <section className="w-full pb-4 px-4 md:px-[104px] bg-[#E3E6E6]">
                <div className="bg-white p-6 text-sm text-gray-600">
                    <span>
                        <strong>Refunds and Return Policy</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        <strong>1. INTRODUCTION</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        1.1 Welcome to the  platform (hereinafter referred to as "this platform"). Please read these Terms of Service carefully before using the  platform or opening a  account ("Account") or opening a  store ("Store") to understand your relationship to  (individually and collectively, "", "we" or "our") legal rights and obligations. The services we provide (hereinafter referred to as "the service") include (1) the platform (including amazon-shop mobile applications), (2) the services provided by the platform and the  client software, and (3) through the platform or its related All information, linked web pages, functions, data, text, images, photos, graphics, music, sounds, videos, information, labels, content, programming, software, application services (including but not limited to any mobile Application Services) (hereinafter referred to as "Content"). Any new or upgraded features of the Service shall also be governed by these Terms of Service. These Terms of Service govern your use of the services provided by .
                    </span>
                    <br />
                    <br />
                    <span>
                        1.2  Policy: Various terms or conditions applicable to sellers published on the  platform and updated from time to time, including but not limited to cross-border seller service terms, privacy policy, prohibited and restricted goods policy,  logistics service terms, seller center The policies and terms stated above, as well as new policies and terms that will be released in the future. Unless otherwise agreed in these Terms of Service, the definitions and interpretations of terms in the  Policy shall apply to these Terms of Service.
                    </span>
                    <br />
                    <br />
                    <span>
                        1.3  platform, refers to the website and mobile shopping application provided and operated by , including but not limited to the global  shopping website and mobile shopping client;
                    </span>
                    <br />
                    <br />
                    <span>
                        1.4 If you use this service or open an account and store on this platform, you irrevocably accept and agree to these terms of service, including the additional terms and policies mentioned in these terms of service and/or provided by links to these terms of service. At the same time, you should still abide by the terms of service of the site platform where the store you have opened in each country/region is located, and accepting and agreeing to the terms of service will not exempt you from the obligation to read and abide by the terms of service of the site platform where the store is located. If there is a conflict between these terms of service and the terms of service of the platform where you open your store, the terms of service of the platform where you open your store shall prevail.
                    </span>
                    <br />
                    <br />
                    <span>
                        If you have entered into other written agreements with us for specific services, in the event of a conflict between the terms of the other written agreement and these Terms of Service, the terms of the other written agreement shall control.
                    </span>
                    <br />
                    <br />
                    <span>
                        1.5 This service includes the provision of an online platform service that provides venues and opportunities for sellers (hereinafter referred to as "you", "users" and "sellers") to trade goods. The actual sales contract exists between the buyer (hereinafter referred to as the "buyer") and the seller,  is not the subject of this sales contract or other contracts between the buyer and the seller, and  is not responsible for such contracts. Buyers and sellers will assume full responsibility for sales contracts, product listings, purchase guarantees and similar matters during the use of  services.  does not participate in transactions between users.  reserves the right to pre-screen users or user-provided content or information.  reserves the right to remove any content or information you provide through the Platform in accordance with clause 6.5.  does not guarantee that the user will actually complete the transaction.
                    </span>
                    <br />
                    <br />
                    <span>
                        1.6 Before becoming a user of this service, you must read and accept all terms contained in and linked to these Terms of Service, and you must agree to the Privacy Policy regarding the processing of sellers and buyers' personal data (such as have) provisions.
                    </span>
                    <br />
                    <br />
                    <span>
                        1.7 Since you become a user of the Service, if you violate these Terms of Service and any other rules and policies that you should abide by (including but not limited to the additional terms mentioned in these Terms of Service/or the additional terms provided by links to these Terms of Service and  Policy),  has the right to deal with you and the accounts and stores you open on this platform in accordance with these terms of service and relevant rules and policies (including but not limited to a series of sanctions described in Article 7.1 of these terms of service). action), you undertake and agree to accept 's processing and assume corresponding responsibilities.
                    </span>
                    <br />
                    <br />
                    <span>
                        <strong>2. Application for Returns/Refunds</strong>
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
                        <strong>3. Application for the Return of an Item</strong>
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
                        <strong>4. Rights of Preferred Sellers</strong>
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
                        <strong>5. Rights of Ordinary Sellers</strong>
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
                        <strong>6. Condition of Returning Item</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        To enjoy a hassle-free experience when returning the Item, Buyer should ensure that the Item, including any complimentary items such as accessories that come with the Item, must be returned to Seller in the condition received by Buyer on delivery. We will recommend Buyer to take a photo of the Item upon receipt.
                    </span>
                    <br />
                    <br />
                    <span>
                        <strong>7. Liability of Product Forward Shipping Fee and Return Shipping Fee</strong>
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
                        <strong>8. Refunds</strong>
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
                        <strong>9. Communication Between Buyer and Seller</strong>
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
                    <span>
                        <strong>2. Privacy</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        2.1  attaches great importance to privacy protection, and we specifically describe our privacy protection related operations in the privacy policy. Please read this Privacy Policy carefully to understand how  collects and uses personal information about your account and/or when you use the Services. If you use this service or provide information on this platform, you agree to allow  to collect, use, disclose and/or process your content and personal information (if any) in the use of this service in accordance with the methods described in the Privacy Policy.
                    </span>
                    <br />
                    <br />
                    <span>
                        2.2 Users who use this service and hold third-party personal data (hereinafter referred to as "recipients") agree to (1) comply with all personal information-related laws and regulations on personal information protection; (2) allow the recipients to collect personal information ("Disclosing Party") may remove his/her information from the Receiving Party's repository; and (3) allow the Disclosing Party to view what information its Receiving Party has collected. In the cases of (2) and (3) above, comply with or act in accordance with applicable laws and regulations.
                    </span>
                    <br />
                    <br />
                    <span>
                        <strong>3. Limited license</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        3.1  grants you a limited and revocable right to log in and use the Service in accordance with the terms and conditions of these Terms of Service. All proprietary content, trademarks, service marks, brand names, logos and other intellectual property rights ("Intellectual Property Rights") displayed on the Platform are the property of  and third-party owners (if applicable) identified on the Platform. We have not granted, directly or indirectly, any right or authorization to use or reset any property to any party logged on to the Platform, and neither party logged on to the Platform shall claim any right, title or interest in relation to it. By using the Service, you agree to abide by the copyrights, trademarks, service marks and all other applicable laws protecting the Service, the Platform and its content. You agree not to copy, distribute, redistribute, transmit, publicly display, publicly perform, modify, adapt, lease or sell, or create derivative works from, the Service, the Platform, or any portion of its Content. You also may not mirror or frame any part or the entire content of this Platform on any other server or display it as part of any other website/platform without our prior written consent. In addition, without our prior written approval, you agree that you will not use any bots, spiders, or any other automatic device or manual process to monitor or copy our content (where search sites use standard search engine techniques to guide web users except to this platform).
                    </span>
                    <br />
                    <br />
                    <span>
                        3.2 We welcome you to link to the Platform from your website, provided that your website/platform does not imply any endorsement by or any association with . You understand that  may suspend the provision of part or all of this service at any time in accordance with the requirements of laws and regulations or in accordance with the principle of good faith.
                    </span>
                    <br />
                    <br />
                    <span>
                        <strong>4. Software</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        Any software we provide to you as part of the Services is governed by these Terms of Service.  reserves all rights not expressly granted by  herein. Any third-party script or program code linked or referenced in the Service is licensed to you by the third party (not ) who owns the script or program code.
                    </span>
                    <br />
                    <br />
                    <span>
                        <strong>5. Accounts and Security</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        5.1 Some functions of this service can only be used by registering an account and store. When registering an account and store, you need to select a set of unique user identifiers (hereinafter referred to as "user IDs") and passwords, and provide some personal information. If the user ID you choose is unilaterally determined by  to be illegal, non-compliant or inappropriate,  reserves the right to suspend or terminate your account or freeze or close your store. You may use your user ID and password to log in to other products, websites or services for which we have enabled access or with which we have an affiliation or partnership.  has not reviewed any third-party content, features, security, services, privacy policies or other specifications for these products, websites or services. If you do so, the terms of service for those products, sites or services, including their respective privacy policies (if different from our terms of service and/or privacy policies), also apply to your use of those products, sites or services or use of the Services.
                    </span>
                    <br />
                    <br />
                    <span>
                        5.2 You agree to (1) keep your password confidential and use your user ID and password only when logging in, (2) ensure that you log out of your account at the end of each session of the website, (3) log in to your account, Immediately notify  of unauthorized use of user IDs and/or passwords, and (4) ensure that your account information is correct and up-to-date. You are obliged to properly keep the access rights of the account, and all operations and business activities under the account (including but not limited to the sub-accounts you open under the main account) are regarded as your actions. You are solely responsible for all activities that occur under your user ID, store and account, even if you may not be the executor of that activity or use.  is not responsible for any loss or damage arising from the unauthorized use of your password or your failure to comply with this section.
                    </span>
                    <br />
                    <br />
                    <span>
                        5.3 Your registered email address, contact information, etc. must belong to you and/or your authorized representative.  has the right to verify the information you submit. You agree that  may disclose, transfer or give the above information to third-party service providers access rights and verify the information, otherwise  has the right to refuse to provide this service.
                    </span>
                    <br />
                    <br />
                    <span>
                        5.4 The ownership of your  account belongs to , and  has the right to manage your account in accordance with the requirements of laws and regulations or in accordance with the principle of good faith. You agree that  may immediately terminate your account and your user ID, remove any content related to your account and user ID from this platform, and withdraw from the platform by notifying you separately in accordance with the requirements of laws and regulations or in compliance with the principle of good faith. any allowances offered and cancel any transactions associated with your account and user ID.  will also explain to you the reasons for such termination, including but not limited to: (1) not logging in and operating your account or not operating your store for a long time (more than 30 days or more); and/or your presence on the platform Suspension of business for more than one year, including unpaid bills for one year (regardless of whether the account is used or not); (2) Violation of the terms of this service; (3) There is considerable evidence to confirm that the user has committed fraud, harassment, defamation, threats, insults or other acts that are illegal or violate the rules of each site; (4) may have multiple user accounts and duplicate stores based on improper or illegal intentions; (5) payments are seized by judicial or administrative authorities; (6) users submit false or forged identification information, which is verified to be true; or (7) Acts that are harmful to other users, third parties or 's commercial interests (such as infringement of third-party intellectual property rights, fictitious transactions, abuse of free shipping or discounts, etc.). If you use your account for fraudulent, harassing, defamatory, threatening, insulting or other unlawful purposes, we may report it to the competent law enforcement authorities without notifying you.
                    </span>
                    <br />
                    <br />
                    <span>
                        5.5 If your account in  is closed due to serious violations, you are not allowed to re-register the account; if it is found that the account has been re-registered,  has the right to immediately stop the service and close the seller's account.
                    </span>
                    <br />
                    <br />
                    <span>
                        5.6 You have the right to terminate these Terms of Service between  and you at any time in the manner agreed by both parties. If users want to terminate their account and store, they can notify  in writing (email to: service@.com or contact your account manager). Even if the account and store are terminated, you are still responsible for any outstanding transactions (whether initiated before or after termination), product shipments, payment for products, etc. related to transactions, and you must promptly and in accordance with these Terms of Service Notify  upon effective performance and completion of all outstanding transactions.  shall not be liable for any damages arising from actions taken under these Terms.
                    </span>
                    <br />
                    <br />
                    <span>
                        5.7 You may only use the Services and/or open an account/or open a store in permitted countries as updated by us from time to time.
                    </span>
                    <br />
                    <br />
                    <span>
                        <strong>6. Your commitments and guarantees</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        6.1 You warrant that you have full rights and/or authority to sell its products published on the platform, and that such products, whether manufactured, assembled, produced or otherwise provided by you, are:
                    </span>
                    <br />
                    <br />
                    <span>
                        (1) The source is legitimate and legal, and unless otherwise stated in the product details, they are all brand new and authentic;
                    </span>
                    <br />
                    <span>
                        (2) Strictly comply with all product guarantees you provide to the platform, as well as specifications, drawings, samples, performance standards or other descriptions of the goods provided by the seller to the platform;
                    </span>
                    <br />
                    <span>
                        (3) It has the usable performance that the commodity should have, and has explained the defects in the usable performance of the commodity;
                    </span>
                    <br />
                    <span>
                        (4) Comply with the current laws and regulations, do not violate any existing laws and regulations in China and the region where the store is located, meet the requirements of protecting personal and property safety and environmental protection requirements, meet the quality standards stipulated by relevant departments, and do not infringe the rights of any third party (including intellectual property rights); and
                    </span>
                    <br />
                    <span>
                        (5) There are no third-party claims of infringement of any goods, or any claims, demands or legal actions concerning the manufacture, sale, distribution or use of the goods. And will not receive any third-party allegation of infringement because you sell products on the platform.
                    </span>
                    <br />
                    <br />
                    <span>
                        6.2 Commitment and Warranty:
                    </span>
                    <br />
                    <br />
                    <span>
                        (1) You agree and warrant that: will not advertise, market or promote your products through any means (whether on the platform or other media) or use the information you provide to advertise, market or promote your products, and directly or indirectly infringe the rights (including intellectual property rights) of any third party;
                    </span>
                    <br />
                    <span>
                        (2) You undertake and warrant that the information you provide can be used by in advertising, marketing or promoting your products (whether on the platform or other media), and does not contain any defamation or other content that violates the current laws and regulations in the region where the store is located, and has completeness, accuracy and reliability. You undertake to notify immediately and correct the error or update if there is any error or update in the materials you provide. You are solely responsible for any content you publish or provide in any other way using the platform and services, including but not limited to the correctness, reliability, authorized and non-infringing content of any provided content, and legal and statutory limitations compliance;
                    </span>
                    <br />
                    <span>
                        (3) You undertake and warrant that you own or are authorized to have all rights in relation to the Selling Goods, have obtained any formal consents, exemptions, approvals, authorizations, registrations, licenses or declarations necessary to ensure that has the right to advertise, market or promote the Seller's Goods, and hereby authorizes to use the above rights for the purpose of advertising, marketing or promoting the seller's products (whether on the platform or other media) within the scope of these Terms of Service. This license is irrevocable, non-exclusive, royalty-free and sublicensable;
                    </span>
                    <br />
                    <span>
                        (4) You promise that you will only collect, disclose, use and process buyer information within the scope of the purpose agreed in these terms of service. You are not allowed to transfer any buyer information without the prior written consent of and the buyer; if you obtain the prior written consent of, you should follow the currently valid laws and regulations, relevant policies and 's reasonable instructions, and the seller should take measures at their own expense. Appropriate safeguards for that buyer's information. You are responsible for the collection, disclosure, use, processing or loss of buyer information by its subcontractors or service providers. You undertake to indemnify for any damages, including loss of goodwill, caused by your breach of the obligations of this article or due to intentional or negligence in the performance of your obligations. You shall be solely responsible for the costs or expenses incurred by you or your subcontractors and service providers in complying with the obligations of this clause;
                    </span>
                    <br />
                    <span>
                        (5) You promise that you have the full rights and legal authority to sign this Terms of Service Agreement and the actual sales contract with the buyer. The content of the terms is binding and enforceable on you; you have completed the registration of market entities and fulfilled tax obligations in accordance with the law. If you need to obtain relevant administrative licenses and relevant qualifications according to law, you have obtained administrative licenses and relevant qualifications according to law;
                    </span>
                    <br />
                    <span>
                        (6) You promise that the information you provide to or to buyers through the platform is accurate, valid and up-to-date; you promise that you will protect consumers' right to know and fulfill the obligation of information disclosure. You should describe the products truthfully, including but not limited to providing a true and complete description of the products and services provided to buyers in all channels provided by, including but not limited to product description pages, store pages, and website messaging systems, including but not limited to No false or misleading statement shall be made regarding the methods and prices of logistics, after-sales, insurance and other services, as well as the basic attributes, functions, packaging, fineness, defects, prices, etc. of commodities.
                    </span>
                    <br />
                    <span>
                        (7) You promise that the copies of qualifications and authorization documents you provide to are true, legal, and valid, and that your contact information (such as email and telephone) provided to is valid and unobstructed. can use the above contact information. Connect with you. And if the relevant qualification information and information are changed, you should provide the latest information to in a timely manner; if you provide false or invalid documents or do not provide documents in a timely manner, resulting in disputes or penalties by the relevant national competent authorities, you shall be responsible for the resulting disputes. Legal liability, if losses are caused to (including its partners, agents, employees, etc.), you agree to compensate for all losses, and has the right to stop paying your payment until the terms of service are lifted;
                    </span>
                    <br />
                    <span>
                        (8) You undertake to sign and perform these terms of service and all relevant acts of the actual sales contract with the buyer without violating the current applicable laws, regulations, rules, orders, judgments, and injunctions in the location of any account and the location where the store is opened. or other court or administrative agency request.
                    </span>
                    <br />
                    <span>
                        (9) You promise to use this platform and sellers to consciously abide by the laws, administrative regulations and relevant national regulations on the import and export and foreign exchange supervision and management of each site involved in cross-border e-commerce business activities; .
                    </span>
                    <br />
                    <br />
                    <span>
                        6.3 User licenses for this service are valid until the termination of these terms of service. Such licenses will terminate upon termination as set forth in these TOS or if you fail to comply with any term or condition of these TOS. In these cases, may unilaterally terminate the authorization, and you shall be responsible for the actual loss caused to .
                    </span>
                    <br />
                    <br />
                    <span>
                        6.4 You agree not to:
                    </span>
                    <br />
                    <br />
                    <span>
                        (1) Upload, post, transmit or make available in any other form any unlawful, harmful, threatening, abusive, harassing, alarmist, distressing, distorting, defamatory, vulgar, obscene, defamatory, invasive, hateful, racial, ethnic discriminatory or otherwise objectionable content;
                    </span>
                    <br />
                    <span>
                        (2) Violation of any laws and regulations, including but not limited to regulations related to import and export restrictions or violation of our "Prohibited and Restricted Commodities" policy and other related policies;
                    </span>
                    <br />
                    <span>
                        (3) Upload, post, transmit or provide any content about minors in any other way without the written consent of the minors' parents or guardians, or use this service to harm minors in any way;
                    </span>
                    <br />
                    <span>
                        (4) Use this service to impersonate any third party, or misrepresent your relationship with any third party;
                    </span>
                    <br />
                    <span>
                        (5) forge headers or otherwise manipulate identifiers to obscure the origin of any content transmitted through the Services;
                    </span>
                    <br />
                    <span>
                        (6) Delete any proprietary rights statement from this platform;
                    </span>
                    <br />
                    <span>
                        (7) cause, permit or authorize modification, creation of derivative works or translation of the Service without the express permission of ;
                    </span>
                    <br />
                    <span>
                        (8) Use the Service for the benefit of any third party or in any manner not permitted by these Terms, including but not limited to, without the written consent of , without the prior written consent of , the account of this Service is sold, or transferred, in part or in whole. , or authorize a third party to use it;
                    </span>
                    <br />
                    <span>
                        (9) Use the service or publish product information or sell products in a fraudulent, unreasonable, false, misleading or deceptive manner (including but not limited to false shipments, serious misconduct, unsold transactions, and malicious mass cancellation of orders) Wait);
                    </span>
                    <br />
                    <span>
                        (10) Register or operate multiple user accounts at the same time in any violation of the Terms of Service;
                    </span>
                    <br />
                    <span>
                        (11) Use emulators, simulators, robots or other similar hardware or software to access the platform, open accounts or access user accounts.
                    </span>
                    <br />
                    <span>
                        (12) Manipulate the price of any commodity or interfere with the publication of other users;
                    </span>
                    <br />
                    <span>
                        (13) Carry out any conduct that would undermine the feedback or ranking system;
                    </span>
                    <br />
                    <span>
                        (14) Attempt to decompile, reverse engineer, disassemble or hack the Service (or any part thereof), or attempt to decipher any encryption that employs for the Service and/or information transmitted, processed or stored by technical or security measures;
                    </span>
                    <br />
                    <span>
                        (15) Collect or collect and/or use any information about all persons obtained through the use of the Service, including but not limited to any personal data or information;
                    </span>
                    <br />
                    <span>
                        (16) Upload, email, post, transmit or otherwise make available any inside information and proprietary and confidential information that you learn or disclose under any law or contract or fiduciary relationship (such as as a result of an employment relationship and pursuant to a nondisclosure agreement) ) is not authorized to provide content;
                    </span>
                    <br />
                    <span>
                        (17) Upload, email, post, transmit or make available in any other form any content that infringes any patent, trademark, trade secret, copyright or other proprietary right of either party;
                    </span>
                    <br />
                    <span>
                        (18) Upload, email, post, transmit or otherwise provide any advertisement, promotional material, spam, advertising letter, pyramid scheme or any other unauthorized form of marketing content that is not requested or permitted by the recipient;
                    </span>
                    <br />
                    <span>
                        (19) Upload, email, post, transmit or otherwise provide any computer virus that is intended to directly or indirectly interfere with, manipulate, interrupt, destroy or limit the functionality or integrity of any computer software, hardware, data or communication equipment , worms, Trojan horses or any other computer code, routines, files or programs;
                    </span>
                    <br />
                    <span>
                        (20) Disrupting the normal dialogue flow, causing the screen to scroll faster than the typing speed of other service users, or otherwise affecting other users' real-time communication;
                    </span>
                    <br />
                    <span>
                        (21) Interfere with, manipulate or destroy the service or the server or network connected to the service or any other user's use of the service, or fail to comply with any regulations, procedures, policies or regulations where the platform is connected to the network;
                    </span>
                    <br />
                    <span>
                        (22) Take or participate in any action or behavior that may directly or indirectly cause the service or the server or network connected to the service to damage, paralyze, overload or reduce performance;
                    </span>
                    <br />
                    <span>
                        (23) Use the Service to knowingly or unintentionally violate any applicable local, state, provincial, national or international law, rule, code, directive, guideline, policy or regulation, including but not limited to anything related to anti-money laundering or anti-terrorism relevant laws and regulations (whether or not legally binding);
                    </span>
                    <br />
                    <span>
                        (24) Use the Service to violate the privacy of others, "stalk" or otherwise harass others;
                    </span>
                    <br />
                    <span>
                        (25) Infringement of 's rights, including infringement of any intellectual property rights and related counterfeiting;
                    </span>
                    <br />
                    <span>
                        (26) Use the Service to collect or store any third party's personal data through the aforementioned prohibited acts and activities; and/or
                    </span>
                    <br />
                    <span>
                        (27) Publish/sell content that infringes the copyrights, trademarks or other intellectual property rights of third parties, or use the service in a way that infringes the intellectual property rights of others.
                    </span>
                    <br />
                    <br />
                    <span>
                        6.5 You understand that all content, whether publicly posted or privately distributed, is the responsibility of the content publisher. This means that you (and not ) are solely responsible for all content (including, without limitation, any errors or omissions in any content) that you upload, post, email, transmit or otherwise make available through the Platform. You understand that while using this platform, you may be exposed to offensive, indecent or objectionable content. To the fullest extent permitted by applicable law, shall in no event be liable for any content, including, without limitation, any errors or omissions in any content, or , transmission or otherwise making available any content for any loss or damage.
                    </span>
                    <br />
                    <br />
                    <span>
                        6.6 You understand that and its trustees have the right (but not the obligation) to pre-screen, reject, delete, remove or move any content provided through this platform (including but not limited to your content or information provided by the platform), such as and its trustees have the right to remove any (1) content that violates these Terms of Service; (2) content that has been complained about by other users; (3) we receive information from you for infringement of intellectual property rights notices or other legal instructions for removal; or (4) that would be objectionable to others. In addition, we may prevent your use of communications from the Service (including but not limited to status updates, posts, messages and/or chat rooms) in order to protect the Service or other users, or to enforce the provisions of these Terms and Conditions. . You agree, understand and have assessed all risks associated with using any Content, including but not limited to reliance on the accuracy, completeness or usefulness of such Content. Likewise, you acknowledge that you have not and will not rely on to create or submit any content to , including but not limited to information on the Forum and all other parts of this website.
                    </span>
                    <br />
                    <span>
                        6.7 You acknowledge, permit and agree that if required by law, or pursuant to a court order or order of any governmental or supervisory authority having jurisdiction over , or when reasonably necessary in good faith and good faith, may access , save and disclose your account information and content, and comply with the following requirements: (1) to comply with legal process; (2) to enforce these Terms of Service; (3) to respond to any claims of content that violates the rights of third parties; (4) to respond to your or (5) protect the rights, property or personal safety of , its users and the public.
                    </span>
                    <br />
                    <span>
                        6.8 If you do not abide by the provisions of this chapter and seriously violate the seller's commitment and guarantee obligations, reserves the right to conduct market management in accordance with these rules. For the purpose of maintaining the good continuity of the market and protecting the rights and interests of buyers, has the right to conduct random inspections of product quality and authenticity identification (including but not limited to purchases from consumers or from consumers, through independent third-party quality inspection agencies or brand rights holders). When checks from time to time whether the goods sold by the seller have legal origin and are genuine, you are obliged to keep and present the certificate of the legal source of the relevant goods. has the right to take restrictive measures against the seller or the store if has reason to believe that the inspection result is poor, or the seller cannot provide relevant certificates.
                    </span>
                    <br />
                    <span>
                        6.9 will have the right to remove the brand's products in accordance with the terms of service in the following situations when the brand you operate is operating on the platform, and you may not continue to operate:
                    </span>
                    <br />
                    <span>
                        (1) Brand products are certified by or a third-party professional organization to be produced by manufacturers without production qualifications, and do not meet national, local, industry, and enterprise mandatory standards;
                    </span>
                    <br />
                    <span>
                        (2) The brand has been judged by or a third-party professional organization to constitute counterfeiting of others' trademarks, commodity names, packaging and decoration, company names, product quality marks, etc. or easily cause consumer confusion and misunderstanding;
                    </span>
                    <br />
                    <span>
                        (3) During the operation of, the brand was proved to have high dispute rate, high complaint rate and low market recognition. The average score of brand product description was seriously lower than the industry average, which seriously affected the consumer experience. After being informed by, one (1) did not improve significantly within a month.
                    </span>
                    <br />
                    <br />
                    <span>
                        <strong>7. Violation of our Terms of Service</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        7.1 Violation of these Terms of Service may result in a series of disciplinary actions, including but not limited to some or all of the following items:
                    </span>
                    <br />
                    <br />
                    <span>
                        - Warning, which means that reminds and warns the seller of misconduct verbally or in writing;
                    </span>
                    <br />
                    <span>
                        - Delete/remove listed products and/or restrict store listings;
                    </span>
                    <br />
                    <span>
                        - Withholding of prohibited items included in the order or items that are not allowed to be sold on the platform;
                    </span>
                    <br />
                    <span>
                        - Cancel various subsidies that have been enjoyed, such as freight subsidies, etc.;
                    </span>
                    <br />
                    <span>
                        - Restrict account permissions;
                    </span>
                    <br />
                    <span>
                        - Freeze account funds;
                    </span>
                    <br />
                    <span>
                        - Criminal proceedings; 
                    </span>
                    <br />
                    <span>
                        - Civil claims, including but not limited to claims for damages and/or applications for preservation measures.
                    </span>
                    <br />
                    <br />
                    <span>
                        7.2 If you find any violation of these Terms of Service by any user of this platform, please contact service@.com.
                    </span>
                    <br />
                    <br />
                    <span>
                        <strong>8. Report of intellectual property infringement</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        8.1 Users, as independent individuals or enterprises, have no connection with .  is not an agent or authorized representative of the user, nor does it hold or own any title to any merchandise posted on this platform.
                    </span>
                    <br />
                    <br />
                    <span>
                        8.2 You agree to take full responsibility for the failure to notify or update its intellectual property certification documents in a timely manner, and you guarantee that all the certification documents you provide to  are true, accurate and have no problems beyond the time limit (that is, ensure that all intellectual property certification documents are included in the entire terms of service). The performance period is within the validity period). If a dispute arises due to the above reasons or is punished by the relevant national competent authority, you shall bear all the responsibilities independently. If you cause losses to  (including its partners, agents, staff, etc.), you agree to compensate for all losses.
                    </span>
                    <br />
                    <br />
                    <span>
                        8.3 If you are the owner of intellectual property rights (hereinafter referred to as "IP owner") or an agent legally authorized by the owner of intellectual property rights ("IP agent"), when you believe that your or your client's intellectual property rights are subject to infringement, you have the right to send the relevant infringement facts and preliminary evidence of infringement in the form of a written notice to: service@.com, and have the right to require  to take necessary measures in accordance with the law. The written notification requirements are detailed in Section 8.7 below. Please allow time for  to process the information you provide.  will respond to your request as soon as practicable.
                    </span>
                    <br />
                    <br />
                    <span>
                        You know that if the infringement notice you send is inconsistent with qualifications, incomplete materials, or otherwise does not meet the provisions of Article 8.7 below,  will notify you to supplement it within a reasonable period of time.
                    </span>
                    <br />
                    <br />
                    <span>
                        8.4 After receiving the infringement notice,  will take necessary measures in a timely manner, and forward the notice from the IP owner or IP agent (hereinafter collectively referred to as the "notifier") to the platform that the notifier believes/designates infringing intellectual property rights (hereinafter referred to as the "Notified Person"). As the notifier, you understand that if your notification error causes damage to the notified person, you shall bear civil liability according to law and any claims that  may face due to your false notification; maliciously send the false notification and cause losses to the notified person and  suffers a claim, it will double its liability for compensation.
                    </span>
                    <br />
                    <br />
                    <span>
                        8.5 If you are the notified person,  has the right to take necessary measures against you, such as deleting goods, blocking, removing goods, terminating transactions and services, freezing accounts and funds, and deducting funds; After the notification of intellectual property rights, you can submit a statement of non-infringement (hereinafter referred to as "statement") to the platform, which shall include prima facie evidence of non-infringement.
                    </span>
                    <br />
                    <br />
                    <span>
                        8.6 If you are the notifier, after  receives the statement of the notified person in accordance with Article 8.5, it will promptly forward the statement to you, and will inform you that you can file a complaint with the relevant competent authority or file a lawsuit with the people's court. If  does not receive the notice of your complaint or lawsuit within the time limit prescribed by law,  has the right to terminate the measures taken in accordance with the foregoing clauses in a timely manner.
                    </span>
                    <br />
                    <br />
                    <span>
                        8.7 Please provide notice of infringement pursuant to 8.3 in the format specified by  ( reserves the right to update it at any time), and attach all the following information: (1) the physical or electronic signature of the notifier; (2) prima facie evidence of infringement: assertion A description of the type and nature of the infringed intellectual property rights, as well as the proof of the ownership of the right (including but not limited to the proof of local intellectual property ownership in the sales market); (3) Detailed information on the specific published products of the reported infringing content; (4) information sufficient to allow  to contact the notifier, such as the notifier's address, telephone number, and email address; (5) a written statement from the notifier that the report was made in good faith and that the infringer's use behavior is not authorized by the intellectual property owner or the law; it indicates that the information contained in the report is true and correct. If there is any error, the informant is willing to bear the civil liability caused by the erroneous notification. In case of damages, the notifier shall bear double the liability for compensation in accordance with the law. If  is damaged, the notifier is willing to bear all the liability for damages caused by the wrong notification; (7) The other notifiers deem it necessary to provide the claim materials, etc.
                    </span>
                    <br />
                    <br />
                    <span>
                        8.8  will promptly publicize the relevant notices, statements and processing results of intellectual property infringement reports.
                    </span>
                    <br />
                    <br />
                    <span>
                        <strong>9. Performance Guarantee</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        9.1  performance guarantee is a shopping guarantee service provided by  or its authorized agents to buyers (applicable to some  platforms, please refer to the platform announcement of each site for applicable regions and rules). In order to provide protection against liability risks, the purchase money paid to you through the use of this service will be kept by  or its authorized agents (hereinafter referred to as "Performance Guarantee Account"), and  will not use these funds for the company's operations. expenses or any other corporate purpose.  will not pay sellers interest or other benefits on payments made by buyers into the  Performance Guarantee Account.
                    </span>
                    <br />
                    <br />
                    <span>
                        9.2 If the site where your store is located is applicable to the  Performance Guarantee, after the buyer pays the order amount (hereinafter referred to as the "Order Amount"), the order amount will remain in the  Performance Guarantee account until the buyer makes the appropriate payment to   will pay you the order amount held in the  Performance Guarantee Account upon instruction or in other circumstances that  reasonably deems appropriate to dispose of the order amount.
                    </span>
                    <br />
                    <br />
                    <span>
                        (1) If the buyer sends  a confirmation that it has received the goods,  will credit the order amount in the  Performance Guarantee account (minus the seller's portion of shipping (if applicable), transaction fees and taxes (if applicable)) and cross-border fees (as applicable, as defined below)) paid to you;
                    </span>
                    <br />
                    <span>
                        (2) If the  Performance Guarantee period expires,  will credit the order amount in the  Performance Guarantee account (minus the seller's portion of shipping (if applicable), transaction fees and taxes (defined below), and cross-border fees (as applicable, as defined below)) to you;
                    </span>
                    <br />
                    <span>
                        (3) If  confirms that the buyer's return and/or refund application is successful,  will refund the buyer according to the refund and return policy applicable to the site where the store is opened; in other cases, if  reasonably determines that the buyer's order amount (minus Shipping (as applicable), transaction fees and taxes (as defined below) and cross-border charges (as defined below, as applicable) to the seller's portion of the transaction are disposed of as appropriate, including but not limited to its reasonable belief that it should comply with applicable law or court order or the enforcement of these Terms of Service.
                    </span>
                    <br />
                    <br />
                    <span>
                        9.3 The  Performance Guarantee is only applicable to buyers who make payment to the  Performance Guarantee account through the methods provided by . Offline or offline transactions between buyers and sellers are not covered by the  Performance Guarantee.
                    </span>
                    <br />
                    <br />
                    <span>
                        9.4 Currently,  can only pay you through third-party payment channels. Therefore, you are required to provide  with your detailed payment information for collection purposes (eg, payments due to merchandise sales or  refunds).
                    </span>
                    <br />
                    <br />
                    <span>
                        9.5 The payment release time of payment is within 1 day after buyers have received the orders.
                    </span>
                    <br />
                    <br />
                    <span>
                        9.6 If for any reason funds cannot be deposited into your designated receiving account and/or you cannot be contacted,  will use reasonable endeavours to contact you using the contact details you have provided. If you cannot be reached and the buyer's purchase monies remain unclaimed for more than twelve (12) months after being payable to the seller,  will process such unclaimed buyer's purchase monies in accordance with any applicable law. The seller must be the equity owner of the account, and can only trade on this platform on his or her own behalf.  reserves the right to ask you to provide personal information of relevant companies and responsible persons, such as recent ID photos, bank account details and/or any other such necessary documents (including but not limited to those required for third-party payment verification processes or logistics and delivery services) request) for inspection purposes. You hereby agree that  process or provide your data to third parties within the scope of facilitating the seller's use of this platform and authorize  to use your data to conduct user authentication to the appropriate subject (such as the seller/buyer's bank) as  deems necessary program. For more information on how  handles your personal data in relation to your data, please visit our Privacy Policy page.
                    </span>
                    <br />
                    <br />
                    <span>
                        9.7 The  Performance Warranty is additional and does not limit your performance of legal obligations under applicable law that may exceed the  Performance Warranty. The  Performance Guarantee is neither intended nor designed to assist users in complying with their legal obligations, users remain solely responsible for their legal obligations under applicable law, and  assumes no responsibility in relation to such legal obligations. Other than that, the  Performance Guarantee does not constitute a guarantee/guarantee of  for any product on the  platform.
                    </span>
                    <br />
                    <br />
                    <span>
                        9.8 For the avoidance of doubt, any transactions not conducted on this platform are not covered by the  performance guarantee.
                    </span>
                </div>
            </section>
            <Footer />
        </div>
    )
}

