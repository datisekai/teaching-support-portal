import { create } from "zustand";
import { attendanceService } from "../services/attendanceService";
import { IAttendance, IAttendee } from "../types/attendance";

interface IAttendanceState {
  attendances: IAttendance[];
  attendancesStatisticClass: any;
  attendance: IAttendance | null;
  attendees: IAttendee[];
  attendeesUnlimited: IAttendee[];
  total: number;
  isLoadingAttendances: boolean;

  fetchAttendances: (body: object) => Promise<void>;
  fetchAttendance: (id: string) => Promise<void>;
  fetchAttendees: (id: string, body: any) => Promise<void>;
  addAttendance: (Attendance: IAttendance) => Promise<boolean>;
  updateAttendance: (
    id: number,
    updatedAttendance: IAttendance
  ) => Promise<boolean>;
  deleteAttendance: (id: number) => Promise<boolean>;
  updateStatus: (id: number, isOpen: boolean) => void;
  getAttendancesStatistic: (classId: string, body: object) => Promise<void>;
  toggleAttendee: (id: number, userId: number) => Promise<void>;
  linkScore: (id: number) => Promise<void>;
}

export const useAttendanceStore = create<IAttendanceState>((set) => ({
  attendances: [],
  attendance: null,
  isLoadingAttendances: false,
  attendees: [],
  attendeesUnlimited: [],
  total: 0,
  attendancesStatisticClass: [],

  fetchAttendances: async (body) => {
    try {
      console.log("abc");
      const response = await attendanceService.getAll(body);
      set({ attendances: response.data, total: response.total });
    } catch (error) {}
  },
  fetchAttendees: async (id, body) => {
    try {
      const response = await attendanceService.getAttendees(+id, body);
      console.log("fetchAttendees", response);
      if (body?.pagination === false) {
        set({ attendeesUnlimited: response.data });
      } else {
        set({ attendees: response.data });
      }
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
      useAttendanceStore().fetchAttendances({});
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
  getAttendancesStatistic: async (classId, body) => {
    try {
      const response = await attendanceService.getAttendanceStatistic(
        classId,
        body
      );
      set({ attendancesStatisticClass: response });
    } catch (error) {}
  },
  toggleAttendee: async (id, userId) => {
    try {
      await attendanceService.toggleAttendee(id, userId);
    } catch (error) {}
  },
  linkScore: async (id) => {
    try {
      await attendanceService.link(id);
    } catch (error) {}
  },
}));
