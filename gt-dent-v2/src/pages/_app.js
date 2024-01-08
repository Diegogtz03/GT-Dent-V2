import '../styles/styles.css';

function App({ Component, pageProps, router }) {
  return (
    <main>
      <Component key={router.pathname} {...pageProps} />
    </main>
  );
}

export default App;