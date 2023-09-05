import '../styles/globals.css'

import {
  APP_NAME,
  setAppName,
  setLeapapiBaseUrl,
  setStorageLayer,
} from '@leapwallet/cosmos-wallet-hooks'
import { initCrypto, initStorage } from '@leapwallet/leap-keychain'
import { createSentryConfig } from '@leapwallet/sentry-config/dist/extension'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClientProvider } from '@tanstack/react-query'
import ErrorBoundaryFallback from 'components/error-boundary-fallback'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { beforeCapture } from 'utils/sentry'
import browser from 'webextension-polyfill'

import App from './App'
import { queryClient } from './query-client'
import { getStorageAdapter } from './utils/storageAdapter'

setLeapapiBaseUrl(process.env.LEAP_WALLET_BACKEND_API_URL as string)

// setAppName is for tx logging
setAppName(process.env.APP === 'compass' ? APP_NAME.Compass : APP_NAME.Cosmos)
const storageAdapter = getStorageAdapter()
setStorageLayer(storageAdapter)

initStorage(storageAdapter)
initCrypto()

const persister = createAsyncStoragePersister({
  storage: {
    setItem(key: string, value: unknown) {
      return new Promise((resolve) =>
        chrome.storage.local.set({ [key]: JSON.stringify(value) }, resolve),
      )
    },
    getItem(key: string) {
      return new Promise((resolve) => {
        chrome.storage.local.get([key], (result) => {
          let data = result[key]
          if (data) data = JSON.parse(data)
          resolve(data)
        })
      })
    },
    removeItem(key: string) {
      return new Promise((resolve) => (chrome.storage.local.remove([key]), resolve))
    },
  },
})

if (process.env.SENTRY_DSN !== '') {
  Sentry.init(
    createSentryConfig({
      dsn: process.env.SENTRY_DSN,
      environment: `${process.env.NODE_ENV}`,
      ignoreErrors: ['AxiosError: Network Error', 'AxiosError: Request aborted'],
      release: `${browser.runtime.getManifest().version}`,
      integrations: [
        new BrowserTracing({
          routingInstrumentation: Sentry.reactRouterV6Instrumentation(
            React.useEffect,
            useLocation,
            useNavigationType,
            createRoutesFromChildren,
            matchRoutes,
          ),
        }),
      ],
      sampleRate: 0.3,
      tracesSampleRate: 0.1,
      enabled: process.env.NODE_ENV === 'production',
    }),
  )
}

if (process.env.NODE_ENV === 'development') {
  import('./dev-watcher-client')
    .then(({ DevWatcherClient }) => {
      new DevWatcherClient()
    })
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.warn('DevWatcher Connection Failed', e)
    })
}

setInterval(() => {
  if (document.hasFocus()) {
    browser.runtime.sendMessage({ type: 'popup-ping', data: { timestamp: Date.now() } })
  }
}, 1000)

ReactDOM.render(
  <React.StrictMode>
    <Sentry.ErrorBoundary beforeCapture={beforeCapture} fallback={<ErrorBoundaryFallback />}>
      <RecoilRoot>
        {/* <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}> */}
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        {/* </PersistQueryClientProvider> */}
      </RecoilRoot>
    </Sentry.ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
)
