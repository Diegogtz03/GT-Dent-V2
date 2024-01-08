import localFont from 'next/font/local';

export const tradeGothic = localFont({
  src: [
    { 
      path: '../fonts/TradeGothic.ttf',
      weight: '400',
      style: 'normal',
    },
    { 
      path: '../fonts/TradeGothicBold.ttf',
      weight: '700',
      style: 'bold',
    },
  ],
  variable: '--font-tradeGothic',
  display: 'swap',
});