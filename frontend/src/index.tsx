import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "./store";

let persist = persistStore(store);
// export const Clear = async () => await persist.purge();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persist}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();
