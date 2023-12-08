

import React from "react";
import Chat from "./components/chat";
import { SocketProvider } from "./context/socketProvider";

const App = () => {
  const user = { id: "123", name: "John Doe" };

  return (
    <SocketProvider>
      <Chat user={user} />
    </SocketProvider>
  );
};

export default App;


