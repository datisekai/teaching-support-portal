import { create } from "zustand";
import { attendanceService } from "../services/attendanceService";
import { IAttendance, IAttendee } from "../types/attendance";

interface IAttendanceState {
  attendances: IAttendance[];
  attendance: IAttendance | null;
  attendees: IAttendee[];
  total: number;
  isLoadingAttendances: boolean;
  fetchAttendances: (body: object) => Promise<void>;
  fetchAttendance: (id: string) => Promise<void>;
  fetchAttendees: (id: string) => Promise<void>;
  addAttendance: (Attendance: IAttendance) => Promise<boolean>;
  updateAttendance: (
    id: number,
    updatedAttendance: IAttendance
  ) => Promise<boolean>;
  deleteAttendance: (id: number) => Promise<boolean>;
  updateStatus: (id: number, isOpen: boolean) => void;
}

export const useAttendanceStore = create<IAttendanceState>((set) => ({
  attendances: [],
  attendance: null,
  isLoadingAttendances: false,
  attendees: [],
  total: 0,

  fetchAttendances: async (body) => {
    try {
      console.log("abc");
      const response = await attendanceService.getAll(body);
      set({ attendances: response.data, total: response.total });
    } catch (error) {}
  },
  fetchAttendees: async (id) => {
    try {
      const response = await attendanceService.getAttendees(+id);
      console.log("fetchAttendees", response);
      set({ attendees: response });
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
            attendance.id === id ? { ...attendance, ...response } : attendance
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
  updateStatus: (id, isOpen) => {
    set((state) => ({
      attendances: state.attendances.map((attendance) =>
        attendance.id === id ? { ...attendance, isOpen } : attendance
      ),
    }));
  },
}));
