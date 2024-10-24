import { create } from "zustand";
import { notificationService } from "../services/notificationService";
import { INotification } from "../types/notification";

interface INotificationState {
  notifications: INotification[];
  notification: INotification;
  total: number;
  isLoadingNotifications: boolean;
  fetchNotifications: (body: object) => Promise<void>;
  fetchNotification: (id: string) => Promise<void>;
  addNotification: (Notification: INotification) => Promise<boolean>;
  updateNotification: (
    id: number,
    updatedNotification: INotification
  ) => Promise<boolean>;
  deleteNotification: (id: number) => Promise<boolean>;
}

export const useNotificationStore = create<INotificationState>((set) => ({
  notifications: [],
  notification: {} as INotification,
  isLoadingNotifications: false,
  total: 0,

  fetchNotifications: async (body) => {
    try {
      const response = await notificationService.getAll(body);
      set({ notifications: response.data, total: response.total });
    } catch (error) {}
  },

  fetchNotification: async (id: string) => {
    try {
      const response = await notificationService.getSingle(id);
      set({ notification: response });
    } catch (error) {}
  },

  addNotification: async (data: INotification) => {
    try {
      const response = await notificationService.create(data);
      if (response) {
        set((state) => ({
          notifications: [response, ...state.notifications],
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  updateNotification: async (id: number, updateItem: INotification) => {
    try {
      const response = await notificationService.update(id, updateItem);
      if (response) {
        set((state) => ({
          notifications: state.notifications.map((item) =>
            item.id === id ? response : item
          ),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  deleteNotification: async (id: number) => {
    try {
      const response = await notificationService.delete(id);
      if (response) {
        set((state) => ({
          notifications: state.notifications.filter((item) => item.id !== id),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },
}));
