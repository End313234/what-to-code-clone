import type { AppProps } from 'next/app';
import { useEffect } from 'react';

import "../global/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        if (!localStorage.getItem("likes")) {
            localStorage.setItem("likes", JSON.stringify({}));
        }
    }, []);
  return <Component {...pageProps} />;
}
export default MyApp;
