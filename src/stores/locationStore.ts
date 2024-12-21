import { create } from "zustand";
import { locationService } from "../services/locationService";
import { ILocation } from "../types/location";

interface ILocationState {
  locations: ILocation[];
  location: ILocation;
  total: number;
  isLoadingLocations: boolean;
  fetchLocations: (body: object) => Promise<void>;
  fetchLocation: (id: string) => Promise<void>;
  addLocation: (Location: ILocation) => Promise<boolean>;
  updateLocation: (id: number, updatedLocation: ILocation) => Promise<boolean>;
  deleteLocation: (id: number) => Promise<boolean>;
}

export const useLocationStore = create<ILocationState>((set) => ({
  locations: [],
  location: {} as ILocation,
  isLoadingLocations: false,
  total: 0,

  fetchLocations: async (body) => {
    try {
      const response = await locationService.getAll(body);
      set({ locations: response.data, total: response.total });
    } catch (error) {}
  },

  fetchLocation: async (id: string) => {
    try {
      const response = await locationService.getSingle(id);
      set({ location: response.data });
    } catch (error) {}
  },

  addLocation: async (data: ILocation) => {
    try {
      const response = await locationService.create(data);
      if (response) {
        set((state) => ({
          locations: [response.data, ...state.locations],
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  updateLocation: async (id: number, updateItem: ILocation) => {
    try {
      const response = await locationService.update(id, updateItem);
      if (response) {
        set((state) => ({
          locations: state.locations.map((item) =>
            item.id === id ? response.data : item
          ),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  deleteLocation: async (id: number) => {
    try {
      const response = await locationService.delete(id);
      if (response) {
        set((state) => ({
          locations: state.locations.filter((item) => item.id !== id),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },
}));
