const GA_ID = process.env.GA_KEY;

const script = document.createElement('script');
script.setAttribute('async', '');
script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
document.head.append(script);

console.log(document.head);

window.dataLayer = window.dataLayer || [];
// eslint-disable-next-line no-undef
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', GA_ID);
