// stores/socketStore.ts
import create from "zustand";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../constants";

// Định nghĩa kiểu cho socket state
interface SocketState {
  socket: Socket | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

// Tạo store với Zustand
export const useSocketStore = create<SocketState>((set) => ({
  socket: null,

  connectSocket: () => {
    const socket = io(SOCKET_URL); // URL server socket của bạn
    set({ socket });

    // Bạn có thể lắng nghe các sự kiện khác từ server
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      set({ socket: null });
    });
  },

  disconnectSocket: () => {
    const { socket } = useSocketStore.getState();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
