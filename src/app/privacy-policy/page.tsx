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

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <MenuHeader />
            <section className="w-full py-4 px-4 md:px-[104px] bg-[#E3E6E6]">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <h1 className="text-xl md:text-2xl font-bold text-center md:text-left">Trang chính sách bảo mật</h1>
                    <Breadcrumb className="mt-2 md:mt-0">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">
                                    <span>Trang chủ</span>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink className="font-semibold" href="/privacy-policy">
                                    <span>Chính sách bảo mật</span>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </section>
            <section className="w-full pb-4 px-4 md:px-[104px] bg-[#E3E6E6]">
                <div className="bg-white p-6 text-sm text-gray-600">
                    <span>
                        <strong>1. INTRODUCTION</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        1.1 Welcome to the  (individually and collectively, "", "we", "us" or "our").  takes its responsibilities under applicable privacy laws and regulations ("Privacy Laws") seriously and is committed to respecting the privacy rights and concerns of all Users of our  website and mobile application (the "Platform") (we refer to the Platform and the services we provide as described on our Platform collectively as the "Services"). Users refers to a user who registers for an account with us for use of the Services, including both buyers and sellers (individually and collectively, "Users "you or "your. We recognize the importance of the personal data you have entrusted to us and believe that it is our responsibility to properly manage, protect and process your personal data. This Privacy Policy ("Privacy Policy or "Policy is designed to assist you in understanding how we collect, use, disclose and/or process the personal data you have provided to us and/or we possess about you, whether now or in the future, as well as to assist you in making an informed decision before providing us with any of your personal data.
                    </span>
                    <br />
                    <br />
                    <span>
                        1.2 "Personal Data" or "personal data" means data, whether true or not, about an individual who can be identified from that data, or from that data and other information to which an organisation has or is likely to have access. Common examples of personal data could include name, identification number and contact information.
                    </span>
                    <br />
                    <br />
                    <span>
                        1.3 By using the Services, registering for an account with us, visiting our Platform, or accessing the Services, you acknowledge and agree that you accept the practices, requirements, and/or policies outlined in this Privacy Policy, and you hereby consent to us collecting, using, disclosing and/or processing your personal data as described herein. IF YOU DO NOT CONSENT TO THE PROCESSING OF YOUR PERSONAL DATA AS DESCRIBED IN THIS PRIVACY POLICY, PLEASE DO NOT USE OUR SERVICES OR ACCESS OUR PLATFORM. If we change our Privacy Policy, we will notify you including by posting those changes or the amended Privacy Policy on our Platform. We reserve the right to amend this Privacy Policy at any time. To the fullest extent permissible under applicable law, your continued use of the Services or Platform, including placing of any orders, shall constitute your acknowledgment and acceptance of the changes made to this Privacy Policy.
                    </span>
                    <br />
                    <br />
                    <span>
                        1.4 This Policy applies in conjunction with other notices, contractual clauses, consent clauses that apply in relation to the collection, storage, use, disclosure and/or processing of your personal data by us and is not intended to override those notices or clauses unless we state expressly otherwise.
                    </span>
                    <br />
                    <br />
                    <span>
                        1.5 This Policy applies to both buyers and sellers who use the Services except where expressly stated otherwise.
                    </span>
                    <br />
                    <br />
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
                        <strong>2. WHEN WILL  COLLECT PERSONAL DATA?</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        2.1 We will/may collect personal data about you:
                    </span>
                    <br />
                    <br />
                    <span>
                        when you register and/or use our Services or Platform, or open an account with us;
                    </span>
                    <br />
                    <span>
                        when you submit any form, including, but not limited to, application forms or other forms relating to any of our products and services, whether online or by way of a physical form;
                    </span>
                    <br />
                    <span>
                        when you enter into any agreement or provide other documentation or information in respect of your interactions with us, or when you use our products and services;
                    </span>
                    <br />
                    <span>
                        when you interact with us, such as via telephone calls (which may be recorded), letters, fax, face-to-face meetings, social media platforms and emails, including when you interact with our customer service agents;
                    </span>
                    <br />
                    <span>
                        when you use our electronic services, or interact with us via our application or use services on our Platform. This includes, without limitation, through cookies which we may deploy when you interact with our application or website;
                    </span>
                    <br />
                    <span>
                        when you grant permissions on your device to share information with our application or Platform;
                    </span>
                    <br />
                    <span>
                        when you link your account with your social media or other external account or use other social media features, in accordance with the provider's policies;
                    </span>
                    <br />
                    <span>
                        when you carry out transactions through our Services;
                    </span>
                    <br />
                    <span>
                        when you provide us with feedback or complaints;
                    </span>
                    <br />
                    <span>
                        when you register for a contest; or
                    </span>
                    <br />
                    <span>
                        when you submit your personal data to us for any reason.
                    </span>
                    <br />
                    <span>
                        The above does not purport to be exhaustive and sets out some common instances of when personal data about you may be collected.
                    </span>
                    <br />
                    <span>
                        <strong>3. WHAT PERSONAL DATA WILL  COLLECT?</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        3.1 The personal data that  may collect includes but is not limited to:
                    </span>
                    <br />
                    <br />
                    <span>
                        name;
                    </span>
                    <br />
                    <span>
                        email address;
                    </span>
                    <br />
                    <span>
                        date of birth;
                    </span>
                    <br />
                    <span>
                        billing and/or delivery address;
                    </span>
                    <br />
                    <span>
                        bank account and payment information;
                    </span>
                    <br />
                    <span>
                        telephone number;
                    </span>
                    <br />
                    <span>
                        gender;
                    </span>
                    <br />
                    <span>
                        information sent by or associated with the device(s) used to access our Services or Platform;
                    </span>
                    <br />
                    <span>
                        information about your network and the people and accounts you interact with;
                    </span>
                    <br />
                    <span>
                        photographs or audio or video recordings;
                    </span>
                    <br />
                    <span>
                        government issued identification or other information required for our due diligence, know your customer, identity verification, or fraud prevention purposes;
                    </span>
                    <br />
                    <span>
                        marketing and communications data, such as your preferences in receiving marketing from us and third parties, your communication preferences and history of communications with us, our service providers, and other third parties;
                    </span>
                    <br />
                    <span>
                        usage and transaction data, including details about your searches, orders, the advertising and content you interact with on the Platform, and other products and services related to you;
                    </span>
                    <br />
                    <span>
                        location data;
                    </span>
                    <br />
                    <span>
                        any other information about the User when the User signs up to use our Services or Platform, and when the User uses the Services or Platform, as well as information related to how the User uses our Services or Platform; and
                    </span>
                    <br />
                    <span>
                        aggregate data on content the User engages with.
                    </span>
                    <br />
                    <span>
                        3.2 You agree not to submit any information to us which is inaccurate or misleading, and you agree to inform us of any inaccuracies or changes to such information. We reserve the right at our sole discretion to require further documentation to verify the information provided by you.
                    </span>
                    <br />
                    <span>
                        3.3 If you sign up to be a user of our Platform using your social media account (“Social Media Account”), link your account to your Social Media Account or use any social media features, we may access information about you which you have voluntarily provided to your Social Media Account provider in accordance with such provider's policies, and we will manage and use any such personal data in accordance with this Policy at all times.
                    </span>
                    <br />
                    <span>
                        3.4 If you do not want us to collect the aforementioned information/personal data, you may opt out at any time by notifying our Data Protection Officer in writing. Further information on opting out can be found in the section below entitled "How can you withdraw consent, remove, request access to or modify information you have provided to us?" Note, however, that opting out or withdrawing your consent for us to collect, use or process your personal data may affect your use of the Services and the Platform. For example, opting out of the collection of location information will cause its location-based features to be disabled.
                    </span>
                    <br />
                    <span>
                        <strong>4. COLLECTION OF OTHER DATA</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        4.1 As with most websites and mobile applications, your device sends information which may include data about you that gets logged by a web server when you browse our Platform. This typically includes without limitation your device's Internet Protocol (IP) address, computer/mobile device operating system and browser type, type of mobile device, the characteristics of the mobile device, the unique device identifier (UDID) or mobile equipment identifier (MEID) for your mobile device, the address of a referring web site (if any), the pages you visit on our website and mobile applications and the times of visit, and sometimes a "cookie" (which can be disabled using your browser preferences) to help the site remember your last visit. If you are logged in, this information is associated with your personal account. The information is also included in anonymous statistics to allow us to understand how visitors use our site.
                    </span>
                    <br />
                    <br />
                    <span>
                        4.2 Our mobile applications may collect precise information about the location of your mobile device using technologies such as GPS, Wi-Fi, etc. We collect, use, disclose and/or process this information for one or more Purposes including, without limitation, location-based services that you request or to deliver relevant content to you based on your location or to allow you to share your location to other Users as part of the services under our mobile applications. For most mobile devices, you are able to withdraw your permission for us to acquire this information on your location through your device settings. If you have questions about how to disable your mobile device's location services, please contact your mobile device service provider or the device manufacturer.
                    </span>
                    <br />
                    <br />
                    <span>
                        4.3 As when you view pages on our website or mobile application, when you watch content and advertising and access other software on our Platform or through the Services, most of the same information is sent to us (including, without limitation, IP Address, operating system, etc.); but, instead of page views, your device sends us information on the content, advertisement viewed and/or software installed by the Services and the Platform and time.
                    </span>
                    <br />
                    <br />
                    <span>
                        <strong>5. COOKIES</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        5.1 We or our authorized service providers and advertising partners may from time to time use "cookies" or other features to allow us or third parties to collect or share information in connection with your use of our Services or Platform. These features help us improve our Platform and the Services we offer, help us offer new services and features, and/or enable us and our advertising partners serve more relevant content to you, including through remarketing. "Cookies are identifiers that are stored on your computer or mobile device that record data about computer or device, how and when the Services or Platform are used or visited, by how many people and other activity within our Platform. We may link cookie information to personal data. Cookies also link to information regarding what items you have selected for purchase and web pages you have viewed. This information is used to keep track of your shopping cart, to deliver content specific to your interests, to enable our third party advertising partners to serve advertisements on sites across the internet, and to conduct data analysis and to monitor usage of the Services.
                    </span>
                    <br />
                    <br />
                    <span>
                        5.2 You may refuse the use of cookies by selecting the appropriate settings on your browser or device. However, please note that if you do this you may not be able to use the full functionality of our Platform or the Services.
                    </span>
                    <br />
                    <span>
                        <strong>6. HOW DO WE USE THE INFORMATION YOU PROVIDE US?</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        6.1 We may collect, use, disclose and/or process your personal data for one or more of the following purposes:
                    </span>
                    <br />
                    <br />
                    <span>
                        to consider and/or process your application/transaction with us or your transactions or communications with third parties via the Services;
                    </span>
                    <br />
                    <span>
                        to manage, operate, provide and/or administer your use of and/or access to our Services and our Platform (including, without limitation, remembering your preference), as well as your relationship and user account with us;
                    </span>
                    <br />
                    <span>
                        to respond to, process, deal with or complete a transaction and/or to fulfil your requests for certain products and services and notify you of service issues and unusual account actions;
                    </span>
                    <br />
                    <span>
                        to enforce our Terms of Service or any applicable end user license agreements;
                    </span>
                    <br />
                    <span>
                        to protect personal safety and the rights, property or safety of others;
                    </span>
                    <br />
                    <span>
                        for identification, verification, due diligence, or know your customer purposes;
                    </span>
                    <br />
                    <span>
                        to evaluate and make decisions relating to your credit and risk profile and eligibility for credit products;
                    </span>
                    <br />
                    <span>
                        to maintain and administer any software updates and/or other updates and support that may be required from time to time to ensure the smooth running of our Services;
                    </span>
                    <br />
                    <span>
                        to deal with or facilitate customer service, carry out your instructions, deal with or respond to any enquiries given by (or purported to be given by) you or on your behalf;
                    </span>
                    <br />
                    <span>
                        to contact you or communicate with you via voice call, text message and/or fax message, email and/or postal mail or otherwise for the purposes of administering and/or managing your relationship with us or your use of our Services, such as but not limited to communicating administrative information to you relating to our Services. You acknowledge and agree that such communication by us could be by way of the mailing of correspondence, documents or notices to you, which could involve disclosure of certain personal data about you to bring about delivery of the same as well as on the external cover of envelopes/mail packages;
                    </span>
                    <br />
                    <span>
                        to allow other users to interact, connect with you or see some of your activities on the Platform, including to inform you when another User has sent you a private message, posted a comment for you on the Platform or connected with you using the social features on the Platform;
                    </span>
                    <br />
                    <span>
                        to conduct research, analysis and development activities (including, but not limited to, data analytics, surveys, product and service development and/or profiling), to analyse how you use our Services, to recommend products and/or services relevant to your interests, to improve our Services or products and/or to enhance your customer experience;
                    </span>
                    <br />
                    <span>
                        to allow for audits and surveys to, among other things, validate the size and composition of our target audience, and understand their experience with ’s Services;
                    </span>
                    <br />
                    <span>
                        for marketing and advertising, and in this regard, to send you by various mediums and modes of communication marketing and promotional information and materials relating to products and/or services (including, without limitation, products and/or services of third parties whom  may collaborate or tie up with) that  (and/or its affiliates or related corporations) may be selling, marketing or promoting, whether such products or services exist now or are created in the future. You can unsubscribe from receiving marketing information at any time by using the unsubscribe function within the electronic marketing material. We may use your contact information to send newsletters or marketing materials from us and from our related companies;
                    </span>
                    <br />
                    <span>
                        to respond to legal processes or to comply with or as required by any applicable law, governmental or regulatory requirements of any relevant jurisdiction or where we have a good faith belief that such disclosure is necessary, including, without limitation, meeting the requirements to make disclosure under the requirements of any law binding on  or on its related corporations or affiliates (including, where applicable, the display of your name, contact details and company details);
                    </span>
                    <br />
                    <span>
                        to produce statistics and research for internal and statutory reporting and/or record-keeping requirements;
                    </span>
                    <br />
                    <span>
                        to carry out due diligence or other screening activities (including, without limitation, background checks) in accordance with legal or regulatory obligations or our risk management procedures that may be required by law or that may have been put in place by us;
                    </span>
                    <br />
                    <span>
                        to audit our Services or 's business;
                    </span>
                    <br />
                    <span>
                        to prevent or investigate any actual or suspected violations of our Terms of Service, fraud, unlawful activity, omission or misconduct, whether relating to your use of our Services or any other matter arising from your relationship with us;
                    </span>
                    <br />
                    <span>
                        to respond to any threatened or actual claims asserted against  or other claim that any Content violates the rights of third parties;
                    </span>
                    <br />
                    <span>
                        to store, host, back up (whether for disaster recovery or otherwise) of your personal data, whether within or outside of your jurisdiction;
                    </span>
                    <br />
                    <span>
                        to deal with and/or facilitate a business asset transaction or a potential business asset transaction, where such transaction involves  as a participant or involves only a related corporation or affiliate of  as a participant or involves  and/or any one or more of  related corporations or affiliates as participant(s), and there may be other third party organisations who are participants in such transaction. A “business asset transaction refers to the purchase, sale, lease, merger, amalgamation or any other acquisition, disposal or financing of an organisation or a portion of an organisation or of any of the business or assets of an organisation; and/or any other purposes which we notify you of at the time of obtaining your consent.(collectively, the "Purposes
                    </span>
                    <br />
                    <span>
                        6.2 You acknowledge, consent and agree that  may access, preserve and disclose your Account information and Content if required to do so by law or pursuant to an order of a court or by any governmental or regulatory authority having jurisdiction over  or in a good faith belief that such access preservation or disclosure is reasonably necessary to: (a) comply with legal process; (b) comply with a request from any governmental or regulatory authority having jurisdiction over ; (c) enforce the  Terms of Service or this Privacy Policy; (d) respond to any threatened or actual claims asserted against  or other claim that any Content violates the rights of third parties; (e) respond to your requests for customer service; or (f) protect the rights, property or personal safety of , its users and/or the public.
                    </span>
                    <br />
                    <span>
                        6.3 As the purposes for which we will/may collect, use, disclose or process your personal data depend on the circumstances at hand, such purpose may not appear above. However, we will notify you of such other purpose at the time of obtaining your consent, unless processing of the applicable data without your consent is permitted by the Privacy Laws.
                    </span>
                    <br />
                    <span>
                        <strong>7. HOW DOES  PROTECT AND RETAIN CUSTOMER INFORMATION?</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        7.1 We implement a variety of security measures and strive to ensure the security of your personal data on our systems. User personal data is contained behind secured networks and is only accessible by a limited number of employees who have special access rights to such systems.  However, there can inevitably be no guarantee of absolute security.
                    </span>
                    <br />
                    <span>
                        7.2 We will retain personal data in accordance with the Privacy Laws and/or other applicable laws. That is, we will destroy or anonymize your personal data when we have reasonably determined that (i) the purpose for which that personal data was collected is no longer being served by the retention of such personal data; (ii) retention is no longer necessary for any legal or business purposes; and (iii) no other legitimate interests warrant further retention of such personal data. If you cease using the Platform, or your permission to use the Platform and/or the Services is terminated or withdrawn, we may continue storing, using and/or disclosing your personal data in accordance with this Privacy Policy and our obligations under the Privacy Laws. Subject to applicable law, we may securely dispose of your personal data without prior notice to you.
                    </span>
                    <br />
                    <span>
                        <strong>8. DOES  DISCLOSE THE INFORMATION IT COLLECTS FROM ITS VISITORS TO OUTSIDE PARTIES?</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        8.1 In conducting our business, we will/may need to use, process, disclose and/or transfer your personal data to our third party service providers, agents and/or our affiliates or related corporations, and/or other third parties, which may be located in Singapore or outside of Singapore, for one or more of the above-stated Purposes. Such third party service providers, agents and/or affiliates or related corporations and/or other third parties would be processing your personal data either on our behalf or otherwise, for one or more of the above-stated Purposes. We endeavour to ensure that the third parties and our affiliates keep your personal data secure from unauthorised access, collection, use, disclosure, processing or similar risks and retain your personal data only for as long as your personal data is needed for the above-mentioned Purposes. Such third parties include, without limitation:
                    </span>
                    <br />
                    <span>
                        our subsidiaries, affiliates and related corporations;
                    </span>
                    <br />
                    <span>
                        buyers or sellers you have transacted with or interacted with on the Platform or in connection with your use of the Services for the above-stated Purposes;
                    </span>
                    <br />
                    <span>
                        other users of our Platform for one or more of the above-stated Purposes;
                    </span>
                    <br />
                    <span>
                        contractors, agents, service providers and other third parties we use to support our business. These include but are not limited to those parties which provide administrative or other services to us such as mailing houses, logistics service providers, financial services providers, advertising and marketing partners, telecommunication companies, information technology companies, and data centres;
                    </span>
                    <br />
                    <span>
                        governmental or regulatory authorities having jurisdiction over  or as otherwise permitted under Section 6.2;
                    </span>
                    <br />
                    <span>
                        a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution or other sale or transfer of some or all of ’s assets, whether as a going concern or as part of bankruptcy, liquidation or similar proceeding, in which personal data held by  about our Service Users is among the assets transferred; or to a counterparty in a business asset transaction that  or any of its affiliates or related corporations is involved in; and third parties to whom disclosure by us is for one or more of the Purposes and such third parties would in turn be collecting and processing your personal data for one or more of the Purposes
                    </span>
                    <br />
                    <span>
                        8.2 We may share user information, including statistical and demographic information, about our Users and information about their use of the Services with advertising partners and third party suppliers of advertisements, remarketing, and/or other programming.
                    </span>
                    <br />
                    <span>
                        8.3 For the avoidance of doubt, in the event that Privacy Laws or other applicable laws permit an organisation such as us to collect, use or disclose your personal data without your consent, such permission granted by the laws shall continue to apply. Consistent with the foregoing and subject to applicable law, we may use your personal data for recognized legal grounds including to comply with our legal obligations, to perform our contract with you, to achieve a legitimate interest and our reasons for using it outweigh any prejudice to your data protection rights, or where necessary in connection with a legal claim.
                    </span>
                    <br />
                    <span>
                        8.4 Third parties may unlawfully intercept or access personal data transmitted to or contained on the site, technologies may malfunction or not work as anticipated, or someone might access, abuse or misuse information through no fault of ours. We will nevertheless deploy reasonable security arrangements to protect your personal data as required by the Privacy Laws; however there can inevitably be no guarantee of absolute security such as but not limited to when unauthorised disclosure arises from malicious and sophisticated hacking by malcontents through no fault of ours.
                    </span>
                    <br />
                    <span>
                        8.5   allows you to share videos from YouTube in  ("YouTube Content").  To facilitate this,  uses YouTube API Services made available by YouTube.  By using sharing YouTube Content, you hereby agree to be bound by the Google Privacy Policy (http://www.google.com/policies/privacy).
                    </span>
                    <br />
                    <span>
                        8.6 As set forth in ’s Terms of Service, Users (including any employees, agents, representatives, or any other person acting for such User or on such User’s behalf) in possession of another User’s personal data through the use of the Services (the "Receiving Party hereby agree that, they will (i) comply with all applicable Privacy Laws with respect to any such data, including any collection, processing, storage or transfer of such data; (ii) allow  or the User whose personal data the Receiving Party has collected (the "Disclosing Party to remove his or her data so collected from the Receiving Party’s database; and (iii) allow Tiktok-shop or the Disclosing Party to review what information has been collected about them by the Receiving Party, in each case of (ii) and (iii) above, in compliance with and where required by applicable laws.
                    </span>
                    <br />
                    <span>
                        8.7 Notwithstanding anything set forth herein, Sellers (including any employees, agents, representatives, or any other person acting for such User or on such User’s behalf) shall comply with all applicable Privacy Laws and, in respect of any buyer’s personal data received from , (i) are not permitted to use such buyer’s personal data except as reasonably necessary to respond to buyersenquiries and to carry out respond to, process, deal with or complete a transaction without the buyers and ’s prior written consent; (ii) should refrain from contacting buyers using such information outside of the  platform; (iii) are not permitted to disclose such buyer’s personal data to any unauthorized third parties without the buyer’s and ’s prior written consent; (iv) shall employ sufficient security measures to protect each  user’s personal data in their possession, retain such data only for as long as necessary for the purposes above and in accordance with the Privacy Laws,  and to delete or return such data to  upon any request from  or as soon as reasonably possible upon completion of the transaction; and (v) to inform ’s Personal Data Protection Officer at ds-reply@amazon-global-selling.com in the event of any potential data breach or other loss of such user’s data.
                    </span>
                    <br />
                    <span>
                        <strong>9. INFORMATION ON CHILDREN</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        9.1 The Services are not intended for children under the age of 13. We do not knowingly collect or maintain any personal data or non-personally-identifiable information from anyone under the age of 13 nor is any part of our Platform or other Services directed to children under the age of 13.  As a parent or legal guardian, please do not allow such children under your care to submit personal data to . In the event that personal data of a child under the age of 13 in your care is disclosed to , you hereby consent to the processing of the child’s personal data and accept and agree to be bound by this Policy on behalf of such child.  We will close any accounts used exclusively by such children and will remove and/or delete any personal data we believe was submitted without parental consent by any child under the age of 13.
                    </span>
                    <br />
                    <span>
                        <strong>10. INFORMATION COLLECTED BY THIRD PARTIES</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        10.1 Our Platform uses Google Analytics, a web analytics service provided by Google, Inc. ("Google"). Google Analytics uses cookies, which are text files placed on your device, to help the Platform analyse how Users use the Platform. The information generated by the cookie about your use of the Platform (including your IP address) will be transmitted to and stored by Google on servers in the United States. Google will use this information for the purpose of evaluating your use of the Platform, compiling reports on website activity for website operators and providing other services relating to website activity and Internet usage. Google may also transfer this information to third parties where required to do so by law, or where such third parties process the information on Google's behalf. Google will not associate your IP address with any other data held by Google.
                    </span>
                    <br />
                    <span>
                        10.2 We, and third parties, may from time to time make software applications downloads available for your use via the Platform or through the Services. These applications may separately access, and allow a third party to view, your identifiable information, such as your name, your user ID, your device’s IP Address or other information such as any cookies that you may previously have installed or that were installed for you by a third party software application or website. Additionally, these applications may ask you to provide additional information directly to third parties. Third party products or services provided through these applications are not owned or controlled by . You are encouraged to read the terms and other policies published by such third parties on their websites or otherwise.
                    </span>
                    <br />
                    <span>
                        <strong>11. DISCLAIMER REGARDING SECURITY AND THIRD PARTY SITES</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        11.1 WE DO NOT GUARANTEE THE SECURITY OF PERSONAL DATA AND/OR OTHER INFORMATION THAT YOU PROVIDE ON THIRD PARTY SITES. We do implement a variety of security measures to maintain the safety of your personal data that is in our possession or under our control. Your personal data is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the personal data confidential. When you place orders or access your personal data, we offer the use of a secure server. All personal data or sensitive information you supply is encrypted into our databases to be only accessed as stated above.
                    </span>
                    <br />
                    <span>
                        11.2 In an attempt to provide you with increased value, we may choose various third party websites to link to, and frame within, the Platform. We may also participate in co-branding and other relationships to offer e-commerce and other services and features to our visitors. These linked sites have separate and independent privacy policies as well as security arrangements. Even if the third party is affiliated with us, we have no control over these linked sites, each of which has separate privacy and data collection practices independent of us. Data collected by our co-brand partners or third party web sites (even if offered on or through our Platform) may not be received by us.
                    </span>
                    <br />
                    <span>
                        11.3 We therefore have no responsibility or liability for the content, security arrangements (or lack thereof) and activities of these linked sites. These linked sites are only for your convenience and you therefore access them at your own risk. Nonetheless, we seek to protect the integrity of our Platform and the links placed upon each of them and therefore welcome any feedback about these linked sites (including, without limitation, if a specific link does not work).
                    </span>
                    <br />
                    <span>
                        <strong>12. WILL  TRANSFER YOUR INFORMATION OVERSEAS?</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        12.1 Your personal data and/or information may be transferred to, stored or processed outside of your country for one or more of the Purposes. In most cases, your personal data will be processed in Singapore, where our servers are located.  will only transfer your information overseas in accordance with Privacy Laws.
                    </span>
                    <br />
                    <span>
                        <strong>13. HOW CAN YOU WITHDRAW CONSENT, REQUEST ACCESS TO OR CORRECT INFORMATION YOU HAVE PROVIDED TO US?</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        13.1 Withdrawing Consent
                    </span>
                    <br />
                    <br />
                    <span>
                        13.1.1 You may withdraw your consent for the collection, use and/or disclosure and/or request deletion of your personal data in our possession or under our control by sending an email to our Personal Data Protection Officer at ds-reply@amazon-global-selling.com, and we will process such requests in accordance with this Privacy Policy and our obligations under the Privacy Laws and other applicable law.  However, your withdrawal of consent may mean that we will not be able to continue providing the Services to you and we may need to terminate your existing relationship and/or the contract you have with us.
                    </span>
                    <br />
                    <span>
                        13.1.2 Where you share YouTube Content, in addition to withdrawing your consent by emailing us pursuant to Section 14.1.1, you may also revoke ’s access to your personal data via the Google security settings page at https://security.google.com/settings/security/permissions.
                    </span>
                    <br />
                    <span>
                        13.2 Requesting Access to or Correction of Personal Data
                    </span>
                    <br />
                    <br />
                    <span>
                        13.2.1 If you have an account with us, you may personally access and/or correct your personal data currently in our possession or control through the Account Settings page on the Platform. If you do not have an account with us, you may request to access and/or correct your personal data currently in our possession or control by submitting a written request to us. We will need enough information from you in order to ascertain your identity as well as the nature of your request so as to be able to deal with your request. Hence, please submit your written request by sending an email to our Personal Data Protection Officer at ds-reply@amazon-global-selling.com.
                    </span>
                    <br />
                    <span>
                        13.2.2 We may charge you a reasonable fee for the handling and processing of your requests to access your personal data. If we so choose to charge, we will provide you with a written estimate of the fee we will be charging. Please note that we are not required to respond to or deal with your access request unless you have agreed to pay the fee.
                    </span>
                    <br />
                    <span>
                        13.2.3 We reserve the right to refuse to correct your personal data in accordance with the provisions as set out in Privacy Laws, where they require and/or entitle an organisation to refuse to correct personal data in stated circumstances.
                    </span>
                    <br />
                    <span>
                        <strong>14. QUESTIONS, CONCERNS OR COMPLAINTS? CONTACT US</strong>
                    </span>
                    <br />
                    <br />
                    <span>
                        14.1 If you have any questions or concerns about our privacy practices, we welcome you to contact us by e-mail at ds-reply@amazon-global-selling.com.
                    </span>
                </div>
            </section>
            <Footer />
        </div>
    )
}

