import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const SOCKET_URL = 'http://localhost:8800'; // Hardcode for debugging
    console.log(`Attempting to connect to Socket.IO server at: ${SOCKET_URL}`);

    const newSocket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });

    newSocket.on('connect', () => {
      console.log('Successfully connected to Socket.IO server');
      setSocket(newSocket);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Failed to connect to Socket.IO server:', error);
      console.log('Socket.IO manager opts:', newSocket.io.opts);
    });

    return () => {
      if (newSocket) {
        console.log('Closing socket connection');
        newSocket.close();
      }
    };
  }, []);

  useEffect(() => {
    if (currentUser && socket) {
      console.log('Emitting newUser event');
      socket.emit("newUser", currentUser.id);
    }
  }, [currentUser, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};