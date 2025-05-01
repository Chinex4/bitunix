import { useState } from 'react';
import { DollarSign, Wallet, HandCoins } from 'lucide-react';

const guideData = {
	buy: [
		{
			title: 'Place Order',
			description:
				'Select a price, payment method and cryptocurrency offer from the marketplace that meets your requirements, enter the purchase amount and quantity and place your order. After placing your order, your crypto assets will be held in safe custody by the platform.',
			icon: <DollarSign size={60} />,
		},
		{
			title: 'Accept Crypto',
			description:
				'After the seller confirms that the payment has been received, the cryptocurrency in custody will be released to your account immediately. You can view the received cryptos by checking your funding account.',
			icon: <Wallet size={60} />,
		},
		{
			title: 'Release Crypto',
			description:
				'The crypto currency will be released to the buyer only after the full payment from the buyer has been confirmed.',
			icon: <HandCoins size={60} />,
		},
	],
	sell: [
		{
			title: 'Post Offer',
			description:
				'List your offer by choosing the cryptocurrency, setting your price and preferred payment method. Make sure your offer is competitive and clear.',
			icon: <DollarSign size={60} />,
		},
		{
			title: 'Confirm Payment',
			description:
				'Once the buyer sends the payment, check and confirm receipt in your bank or wallet before releasing the cryptocurrency.',
			icon: <Wallet size={60} />,
		},
		{
			title: 'Complete Trade',
			description:
				'After confirming the buyer’s payment, release the crypto. The transaction is completed and your balance is updated.',
			icon: <HandCoins size={60} />,
		},
	],
};

const P2PGuide = () => {
	const [activeTab, setActiveTab] = useState('buy');

	return (
		<div className='text-white px-4 py-10'>
			<h2 className='text-3xl md:text-4xl font-bold text-center mb-6'>
				How to use P2P trading?
			</h2>

			{/* Tabs */}
			<div className='flex justify-center gap-8 mb-6 text-lg font-medium'>
				<button
					onClick={() => setActiveTab('buy')}
					className={`pb-1 border-b-2 ${
						activeTab === 'buy'
							? 'border-lime-400 text-white'
							: 'border-transparent text-gray-400'
					}`}>
					Buy Crypto
				</button>
				<button
					onClick={() => setActiveTab('sell')}
					className={`pb-1 border-b-2 ${
						activeTab === 'sell'
							? 'border-lime-400 text-white'
							: 'border-transparent text-gray-400'
					}`}>
					Sell
				</button>
			</div>

			{/* Card Container */}
			<div className='bg-zinc-900 rounded-lg p-6 md:p-10 space-y-6 md:space-y-0 md:grid md:grid-cols-3 gap-8 border border-zinc-700'>
				{guideData[activeTab].map((item, idx) => (
					<div
						key={idx}
						className='text-center md:text-left'>
						<div className='flex justify-center md:justify-start mb-4 text-lime-400'>
							{item.icon}
						</div>
						<h3 className='text-lg font-semibold mb-2'>
							<span className='text-gray-400'>{`0${idx + 1}.`}</span>{' '}
							<span className='text-lime-400'>{item.title}</span>
						</h3>
						<p className='text-sm text-gray-300'>{item.description}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default P2PGuide;
