import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContext from './AppContext';
import { Theme, ThemeProvider } from "@paco_ua/pacoui"
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={Theme}>
        <AppContext/>
    </ThemeProvider>
  </StrictMode>
,document.getElementById('root'));

