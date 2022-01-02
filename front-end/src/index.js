import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MessageProvider } from "./context/messageContext";
import { UsersProvider } from "./context/usersContext";

ReactDOM.render(
  <React.StrictMode>
    <MessageProvider>
      <UsersProvider>
          <App />
      </UsersProvider>
    </MessageProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
