import Head from 'next/head';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>21BPS1615</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}