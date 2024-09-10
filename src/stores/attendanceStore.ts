import { useEffect } from "react";
import { create } from "zustand";

interface IAttendance {
  code: string;
}

interface IState {
  attendances: IAttendance[];
  fetchAttendance: () => Promise<IAttendance[]>;
}

export const useAttendanceStore = create<IState>((set) => ({
  attendances: [],
  fetchAttendance: async () => {
    //Xử lý call API
    set((state) => ({ ...state, attendances: [] }));
    return [];
  },
}));

// const {attendances,fetchAttendance} = useAttendanceStore()

// useEffect(() => {
//     fetchAttendance()
// },[])
