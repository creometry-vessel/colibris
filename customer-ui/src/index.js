import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
		primary: {
			main: 'rgb(7, 110, 0)',
		},
}});
ReactDOM.render(
  
  <React.StrictMode>
          <ThemeProvider theme={theme}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
