import React from 'react'
import OpportunitiesSection from '../../components/desktop/opportunities/OpportunitiesSection'
import SectorsTable from '../../components/desktop/opportunities/SectorsTable'
import MarketsDashboard from '../../components/desktop/opportunities/MarketsDashboard'
import HeatMapSection from '../../components/desktop/opportunities/HeatMapSection'
import UpDownDistribution from '../../components/desktop/opportunities/UpDownDistribution'

const Opportunities = () => {
  return (
    <>
        <OpportunitiesSection />
        <SectorsTable />
        <MarketsDashboard />
        <HeatMapSection />
        <UpDownDistribution />
    </>
  )
}

export default Opportunities