import 'antd/dist/antd.css';
import '../assets/index.css'
import ReduxProvider from '../state/ReduxWrapper'

function MyApp({ Component, pageProps }) {
  return <ReduxProvider><Component {...pageProps} /></ReduxProvider>
}

export default MyApp
