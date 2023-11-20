import { createGlobalStyle } from "styled-components";
import "./fonts/Font.css";

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	/* margin: 0; */
	padding: 0;
	/* border: 0; */
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
ol, ul {
	list-style: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
* {
  box-sizing: border-box ;
}
html, body {
	/* height: 100vh; */
	/* 여기엔 마진 넣지 마세요. 배경 줄어요. */
}
body {
	background-image: url("/image/background/back.svg");
  margin: 0;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  background-attachment: fixed;
  /* width: 100vh; */
	/* overflow-y: hidden; */
	font-family: 'Pretendard-Regular';
}
a {
  text-decoration: none;
	color:inherit;
}

/* &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #f0f1f6;
    border-radius: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background: rgba(160, 161, 162, 0.1);
    border-radius: 0.5rem;
  } */

`;
export default GlobalStyle;
