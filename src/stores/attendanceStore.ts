import { create } from "zustand";
import { attendanceService } from "../services/attendance";
import { IAttendance } from "../types/attendance";

interface IAttendanceState {
  attendances: IAttendance[];
  attendance: IAttendance | null;
  total: number;
  isLoadingAttendances: boolean;
  fetchAttendances: (body: object) => Promise<void>;
  fetchAttendance: (id: string) => Promise<void>;
  addAttendance: (Attendance: IAttendance) => Promise<boolean>;
  updateAttendance: (
    id: number,
    updatedAttendance: IAttendance
  ) => Promise<boolean>;
  deleteAttendance: (id: number) => Promise<boolean>;
}

export const useAttendanceStore = create<IAttendanceState>((set) => ({
  attendances: [],
  attendance: null,
  isLoadingAttendances: false,
  total: 0,

  fetchAttendances: async (body) => {
    try {
      console.log("abc");
      const response = await attendanceService.getAll(body);
      set({ attendances: response.data, total: response.total });
    } catch (error) {}
  },

  fetchAttendance: async (id: string) => {
    try {
      const response = await attendanceService.getSingle(id);
      set({ attendance: response });
    } catch (error) {}
  },

  addAttendance: async (Attendance: IAttendance) => {
    try {
      const response = await attendanceService.create(Attendance);
      if (response) {
        set((state) => ({
          attendances: [response, ...state.attendances],
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  updateAttendance: async (id: number, updatedAttendance: IAttendance) => {
    try {
      const response = await attendanceService.update(id, updatedAttendance);
      if (response) {
        set((state) => ({
          attendances: state.attendances.map((attendance) =>
            attendance.id === id ? response : attendance
          ),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },

  deleteAttendance: async (id: number) => {
    try {
      const response = await attendanceService.delete(id);
      if (response) {
        set((state) => ({
          attendances: state.attendances.filter(
            (attendance) => attendance.id !== id
          ),
        }));
      }
      return !!response;
    } catch (error) {
      return false;
    }
  },
}));
