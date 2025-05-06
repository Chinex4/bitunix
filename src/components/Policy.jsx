// components/Policy.jsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const Policy = ({ isOpen, onClose }) => {
	return (
		<Transition
			show={isOpen}
			as={Fragment}>
			<Dialog
				as='div'
				className='relative z-50'
				onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-200'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-150'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'>
					<div className='fixed inset-0 bg-black/40' />
				</Transition.Child>

				<div className='fixed inset-0 flex items-center justify-center p-4'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-200'
						enterFrom='opacity-0 scale-95'
						enterTo='opacity-100 scale-100'
						leave='ease-in duration-150'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-95'>
						<Dialog.Panel className='w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded bg-stone-900 p-6 text-sm text-gray-800 shadow-xl'>
							<Dialog.Title className='text-xl text-lime-400 font-semibold mb-4'>
								Bitunix Policy
							</Dialog.Title>
							<button
								className='absolute top-4 right-6 text-lg text-gray-400 hover:text-black'
								onClick={onClose}>
								×
							</button>
							<div className='space-y-4 text-justify'>
								{/* Paste full agreement content here */}
								<p className='text-white'>
									Bitunix, a crypto assets trading exchange, operates the
									website https://www.bitunix.com and related mobile
									applications (hereinafter referred to as the 'Platforms')
									dedicated to digital assets-only transactions and provision of
									related services. Our Privacy Policy (“Privacy Policy”) is
									designed to help you understand how we collect, use and share
									your personal information and to assist you in exercising the
									privacy rights available to you. Bitunix will protect all
									personal information you submit to us when using our products
									and services. We may use or disclose your personal information
									in compliance with this Privacy Policy to provide better
									services to you. By using our products and services, you
									consent to the practices contained in this Privacy Policy. We
									may amend this Privacy Policy from time to time and strongly
									encourage you to review it whenever you access or use Bitunix
									services to stay informed about our information practices and
									your privacy rights and choices. If you ever have any
									questions about changes made to the Privacy Policy, please
									reach out to support@bitunix.com . 1. Scope of Application
									This Privacy Policy applies to: A）your personal information
									including your name, email address, date of birth, tax number
									(if applicable), username, password or other personal
									information when you open an account on our Platforms; B）your
									browsing history and/or information related to your device,
									including and not limited to the types of device (Computer vs.
									iPhone vs. Android), operating system, mobile phone number,
									browser type and language, device identifiers (such as IMEI
									and MAC address), Internet Protocol (IP) address, location
									information, cookies identifiers, Internet service provider,
									etc.; C）your personal information we obtain from other
									sources, including third-party business partners through which
									you access our Platforms and related services. You understand
									and agree that this Privacy Policy is not applicable to the
									following information: A）Your search keywords when using our
									Platforms; B）Public content you create on our Platforms,
									including but not limited to forum posts, blogs, or social
									media pages; C）Your violation of laws, regulations or our
									Platforms’ rules and publishing measures you are subject to.
									2. Use of Information We use your information for various
									business purposes, including but not limited to: A）to provide
									you with information about products and promotions that may be
									of interest to you, from ourselves and third parties, although
									only if you have specifically agreed to receive such
									information; B）to process applications or transactions you
									made and your financial information for products or services
									you purchased on our Platforms and; C）to enhance your
									information security by detecting malicious, deceptive,
									fraudulent or illegal activities; D）to improve our services
									by researching and developing our products and services; E）to
									comply with domestic and international legal obligations. We
									will gather and take good care of your personal information.
									If we need to share with third-party business partners to
									provide better service experience for you, we will require
									partners to protect your information as stated in this Privacy
									Policy. 3. Disclosure of Information We may disclose any
									personal information we collect about you: A）to
									non-affiliated third parties at your consent; B）to third
									party service/product providers so that you can use their
									service/product; C）to our business partners when we co-launch
									a product or service; D）to our affiliated entites; E）to
									other sites when deemed necessary by law, regulations or
									Privacy Policy. F）when disclosure is necessary to report
									suspected illegal activity; G）when disclosure is necessary to
									investigate violations of laws, regulations or this Privacy
									Policy; H）when compelled by subpoena, court order, or other
									legal procedure; 4. Storage/Transfer of Information You
									acknowledge that we store and process your personal and
									transactional information in multiple locations in the world
									where our service providers are located, and we protect it by
									maintaining physical, electronic, and procedural safeguards in
									compliance with applicable regulations. Your personal
									information we receive will be stored for as long as you use
									our services or as necessary to fulfill the purpose(s) for
									which it was collected, provide our services, resolve
									disputes, establish legal defenses, conduct audits, pursue
									legitimate business purposes, enforce our measures, and comply
									with applicable laws. You also acknowledge that when a merger,
									acquisition, financing due diligence, reorganization,
									bankruptcy, receivership, purchase or sale of assets, or
									transition of service to another provider occurs, your
									information may be sold or transferred as part of such a
									transaction, as permitted by law and/or contract. 5. Use of
									Cookies A）We use a browser feature known as a "cookie", which
									assigns a unique identification (a small data file) to your
									computer, tablet, mobile phone, or other devices. B）The
									information collected from cookies allows us to store your
									preferences so as to improve the quality of your experience on
									the Platforms by recognizing and delivering more of the most
									desired features and information, as well as by resolving
									access difficulties; C）You are free to block, decline, or
									remove our cookies as your browser or browser add-on permits,
									but doing so may interfere with your use of our services.
									D）The information we collect from cookies is applicable with
									this Privacy Policy. 6. Protection of Information A）We
									implement reasonable security practices and procedures to
									protect the confidentiality and security of your information,
									including any nonpublic personal information. B）We protect
									your information using reasonable physical, technical and
									administrative security measures such as limitation of access
									on employees to your information. C）You are responsible for
									reviewing the privacy statements, policies, terms, and
									conditions of any person or company to whom you choose to link
									or with whom you choose to contract. D）We cannot guarantee or
									warrant the security of any information you provide to us as
									no system is perfectly secure. E）If you find your personal
									information (especially username and passwords on our
									Platforms) disclosed, you should immediately contact our
									support for protection measures. 7. Disclaimer of Liability
									Bitunix assumes no liability or responsibility, to the fullest
									extent of any applicable law, for: A）any unintentional
									disclosure; B）disclosure of your personal information because
									you share with others your account(s) or password(s) on our
									Platforms; C）any stolen, lost, or unauthorized use of your
									account information any breach of security or data terms
									related to your account information, or any criminal or other
									third party act affecting our Platforms; D）lawsuits or
									related damages led by disclosure of your personal information
									on our external websites. 8. External Websites Occasionally,
									the Bitunix website may provide references or links to other
									websites ("External Websites"). We do not control these
									External Websites or any of the content contained therein.
									External Websites have separate and independent terms of use
									and related policies. We request that you review the policies,
									rules, terms, and regulations of each site that you visit. If
									you prefer not to share your personal information with
									External Websites, please note that you must separately opt
									out of their use of your information for various purposes. 9.
									Your Statutory Rights Depending on applicable law, you may
									have the rights as set out below, which you may exercise by
									contacting us at support@bitunix.com. A）Access: you are
									entitled to ask us if we are processing your information and,
									if we are, you can request access to your personal data. This
									enables you to receive a copy of the personal data we hold
									about you and certain other information about it to check that
									we are lawfully processing it. We process a large quantity of
									information, and can thus request that before the information
									is delivered, you specify the information or processing
									activities to which your request relates. B）Correction: you
									are entitled to request that any incomplete or inaccurate
									personal data we hold about you is corrected. C）Erasure: you
									are entitled to ask us to delete or remove personal data in
									certain circumstances. There are also certain exceptions where
									we may refuse a request for erasure, for example, where the
									personal data is required for compliance with law or in
									connection with claims. D）Restriction: you are entitled to
									ask us to suspend the processing of certain of your personal
									data about you, for example if you want us to establish its
									accuracy or the reason for processing it. E）Transfer: you may
									request the transfer of certain of your personal data to
									another party. F）Objection: where we are processing your
									personal data based on legitimate interests (or those of a
									third party) you may challenge this. However, we may be
									entitled to continue processing your information based on our
									legitimate interests or where this is relevant to legal
									claims. You also have the right to object where we are
									processing your personal data for direct marketing purposes.
									If these rights apply, they may however be limited, for
									example if fulfilling your request would reveal personal data
									about another person, would infringe the rights of another
									person or legal entity (including our rights), or if you ask
									us to delete or change data which we are required by law to
									keep (or have other compelling legitimate interests in
									keeping). We will inform you of relevant exemptions we rely
									upon when responding to any request you make. 10. Contact Us
									If you have any questions relating to our privacy policy and
									your rights and obligations arising from these policy terms,
									or if you intend to exercise your rights stated in this
									privacy policy, please contact support@bitunix.com.
								</p>
								{/* Repeat rest of the sections here */}
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};

export default Policy;
