import React from 'react'
import GiftsSection from '../../components/mobile/GiftSection'
import DepositBuySection from '../../components/mobile/DepositBuySection'
import TrendingCryptos from '../../components/desktop/home/TrendingCryptos'
import WhoIsUsing from '../../components/desktop/home/WhoIsUsing'
import WhyBitunix from '../../components/desktop/home/WhyBitunix'
import BeginJourney from '../../components/desktop/home/BeginJourney'
import ReviewsSection from '../../components/desktop/home/ReviewsSection'

const MobileHome = () => {
  return (
    <>
        <GiftsSection />
        <DepositBuySection />
        <TrendingCryptos />
        <WhoIsUsing />
        <WhyBitunix />
        <BeginJourney />
        <ReviewsSection />
    </>
  )
}

export default MobileHome