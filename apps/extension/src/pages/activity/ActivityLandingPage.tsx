import { ActivityCardContent, useActivity } from '@leapwallet/cosmos-wallet-hooks'
import { Header, HeaderActionType } from '@leapwallet/leap-ui'
import type { ParsedTransaction } from '@leapwallet/parser-parfait'
import { QueryStatus } from '@tanstack/react-query'
import AlertStrip from 'components/alert-strip/AlertStrip'
import BottomNav, { BottomNavLabel } from 'components/bottom-nav/BottomNav'
import PopupLayout from 'components/layout/popup-layout'
import { PageName } from 'config/analytics'
import { usePageView } from 'hooks/analytics/usePageView'
import { usePerformanceMonitor } from 'hooks/perf-monitoring/usePerformanceMonitor'
import { useActiveChain } from 'hooks/settings/useActiveChain'
import { useSelectedNetwork } from 'hooks/settings/useNetwork'
import { useChainInfos } from 'hooks/useChainInfos'
import { useDefaultTokenLogo } from 'hooks/utility/useDefaultTokenLogo'
import { useThemeColor } from 'hooks/utility/useThemeColor'
import SelectChain from 'pages/home/SelectChain'
import SideNav from 'pages/home/side-nav'
import React, { useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import { isCompassWallet } from 'utils/isCompassWallet'

import { selectedChainAlertState } from '../../atoms/selected-chain-alert'
import { ActivityList } from './ActivityList'
import { ActivitySwapTxPage } from './ActivitySwapTxPage'
import TxDetails from './TxDetails'

export type SelectedTx = {
  parsedTx: ParsedTransaction
  content: ActivityCardContent
}

export function ActivityLandingPage() {
  usePageView(PageName.Activity)

  const chainInfos = useChainInfos()
  const [showSideNav, setShowSideNav] = useState(false)
  const [showChainSelector, setShowChainSelector] = useState(false)
  const [showSelectedChainAlert, setShowSelectedChainAlert] =
    useRecoilState(selectedChainAlertState)
  const [selectedTx, setSelectedTx] = useState<SelectedTx | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [showSwapTxPageFor, setShowSwapTxPageFor] = useState<any>()
  const defaultTokenLogo = useDefaultTokenLogo()
  const isTestnet = useSelectedNetwork() === 'testnet'
  const activeChain = useActiveChain()
  const { txResponse } = useActivity()
  const themeColor = useThemeColor()

  const queryStatus = useMemo(() => {
    let status = txResponse.loading ? 'loading' : 'success'
    status = txResponse.error ? 'error' : status

    return status
  }, [txResponse.error, txResponse.loading])

  usePerformanceMonitor({
    page: 'activity',
    queryStatus: queryStatus as QueryStatus,
    op: 'activityPageLoad',
    description: 'loading state on activity page',
  })

  return (
    <div className='relative w-[400px] overflow-clip'>
      {selectedTx ? (
        <TxDetails
          content={selectedTx.content}
          parsedTx={selectedTx.parsedTx}
          onBack={() => setSelectedTx(null)}
        />
      ) : (
        <>
          <PopupLayout
            header={
              <Header
                action={{
                  onClick: function noRefCheck() {
                    setShowSideNav(true)
                  },
                  type: HeaderActionType.NAVIGATION,
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  className:
                    'w-[48px] h-[40px] px-3 bg-[#FFFFFF] dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full',
                }}
                imgSrc={chainInfos[activeChain].chainSymbolImageUrl ?? defaultTokenLogo}
                onImgClick={() => setShowChainSelector(true)}
                title={'Activity'}
                topColor={themeColor}
              />
            }
          >
            <SideNav isShown={showSideNav} toggler={() => setShowSideNav(!showSideNav)} />

            {isCompassWallet() && isTestnet && (
              <AlertStrip
                message='You are on Sei Testnet'
                bgColor={themeColor}
                alwaysShow={isTestnet}
              />
            )}

            {showSelectedChainAlert && !isCompassWallet() && (
              <AlertStrip
                message={`You are on ${chainInfos[activeChain].chainName}${
                  isTestnet && !chainInfos[activeChain]?.chainName.includes('Testnet')
                    ? ' Testnet'
                    : ''
                }`}
                bgColor={themeColor}
                alwaysShow={isTestnet}
                onHide={() => {
                  setShowSelectedChainAlert(false)
                }}
              />
            )}

            <div className='w-full flex flex-col justify-center pt-[28px] items-center mb-20 px-7'>
              <ActivityList
                setSelectedTx={setSelectedTx}
                txResponse={txResponse}
                setShowSwapTxPageFor={setShowSwapTxPageFor}
              />
            </div>
          </PopupLayout>
          <SelectChain isVisible={showChainSelector} onClose={() => setShowChainSelector(false)} />
          <BottomNav label={BottomNavLabel.Activity} />

          {showSwapTxPageFor ? (
            <ActivitySwapTxPage
              onClose={() => setShowSwapTxPageFor(undefined)}
              {...showSwapTxPageFor}
            />
          ) : null}
        </>
      )}
    </div>
  )
}
