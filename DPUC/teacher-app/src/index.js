import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { IntlProvider } from "react-intl";
import {
  ThemeProvider,
  Theme,
  ConfigProvider,
  InjectIntlContext,
  useFormatMessage
} from "@uaveiro/ui";

ReactDOM.render(
  <React.StrictMode>
    <>
      <IntlProvider locale='en'>
        <InjectIntlContext>
          <ThemeProvider theme={Theme}>
            <ConfigProvider
              config={{
                imageAPI: "https://api-assets.dev.ua.pt/v1",
                portalWWW: "https://www.dev.ua.pt",
                portalAPI: "https://api-portal.dev.ua.pt/api/v1"
              }}
              components={{
                link: "YourLinkComponent",
                formattedMessage: "FormattedMessage",
                isIE: () => false
              }}
              hooks={{
                useIntl: useFormatMessage
              }}
            >
              <App />
            </ConfigProvider>
          </ThemeProvider>
        </InjectIntlContext>
      </IntlProvider>
    </>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

