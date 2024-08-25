import Head from 'next/head';

export default function RootLayout({ children }) {
  return (
    <html>
      <Head>
        <title>21BPS1615</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }
          .api-note {
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 15px;
            margin-top: 20px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          .api-note h2 {
            margin: 0;
            color: #0070f3;
          }
          .api-note p {
            margin: 10px 0;
            font-size: 16px;
            color: #333;
          }
          .api-note code {
            display: block;
            background-color: #fafafa;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
            font-family: 'Courier New', Courier, monospace;
          }
          .api-note .note {
            color: #d9534f;
            font-weight: bold;
          }
        `}</style>
      </Head>
      <body>
        <div className="container">
          {children}
          <div className="api-note">
            <h2>Important API Endpoint Note</h2>
            <p className="note">PLEASE NOTE: THE LINK TO GET AND POST REQUEST IS</p>
            <code>https://bajaj-mocha-delta.vercel.app/api/bfhl</code>
            <p>NOT</p>
            <code>https://bajaj-mocha-delta.vercel.app/bfhl</code>
            <p>The link gets redirected from vercel.json file, I had submitted the form before with API link, hence this workaround</p>

          </div>
        </div>
      </body>
    </html>
  );
}
