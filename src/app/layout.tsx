import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from './ClientLayout';
import NextTopLoader from 'nextjs-toploader';
import Script from "next/script";

export const metadata: Metadata = {
  title: 'FedEx Global Home',
  description: 'Welcome to FedEx.com - Select your location to find services for shipping your package, package tracking, shipping rates, and tools to support shippers and small businesses',
  icons: {
    icon: '/images/fx-favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientLayout>
      <NextTopLoader
        color="#2299DD"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        // showSpinner={true}
        easing="ease"
        speed={200}
      />
      {children}
      <Script
        id="tawkto"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/67e17ac101316619114e72d4/1in4cf15j';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
      })();
      Tawk_API.customStyle = {
		visibility : {
			desktop : {
				position : 'br',
				xOffset : '60px',
				yOffset : '50px'
			},
			mobile : {
				position : 'br',
				xOffset : 0,
				yOffset : 70
			},
			bubble : {
				rotate : '0deg',
			 	xOffset : -20,
			 	yOffset : 0
			}
		}
	};
      Tawk_API.onLoad = function() {
        function applyStyle() {
          var iframe = document.querySelector('#tawkchat-container iframe');
          var container = document.querySelector('#tawkchat-container');
          if (iframe) {
            iframe.style.bottom = '10px';
            iframe.style.position = 'fixed';
            iframe.style.zIndex = '9999';
          }
          if (container) {
            container.style.bottom = '10px';
            container.style.position = 'fixed';
            container.style.zIndex = '9999';
          }
        }
        applyStyle(); // Initial attempt
        setInterval(applyStyle, 500); // Re-apply every 500ms
      };
    `,
        }}
      />
    </ClientLayout>
  );
}
