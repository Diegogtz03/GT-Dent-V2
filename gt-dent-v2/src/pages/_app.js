import '../styles/styles.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App({ Component, pageProps, router }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <main>
        <Component key={router.pathname} {...pageProps} />
      </main>
    </LocalizationProvider>
  );
}

export default App;