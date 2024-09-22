import React, { useEffect } from "react";
import { useCommonStore } from "../../stores";
import { uploadFile } from "../../utils";
import MyCard from "../../components/UI/MyCard";
import MyCalendar from "../../components/UI/MyCalendar";

const Class = () => {
  const { setHeaderTitle, setHeaderActions, resetActions } = useCommonStore();
  useEffect(() => {
    setHeaderTitle("Danh sách lớp học");
    setHeaderActions([
      {
        title: "Tạo",
        icon: "pi pi-plus",
        onClick: () => {
          console.log("a");
        },
        type: "button",
        disabled: false,
      },
      {
        title: "Import",
        icon: "pi pi-upload",
        onClick: async () => {
          const file = await uploadFile()
        },
        type: "file",
        disabled: false,
      },
    ]);

    return () => {
      resetActions()
    }
  }, []);
  return (
    <div>
      <MyCard title="Danh sách lớp học">
        <div>adasdad</div>
      </MyCard>
      <MyCalendar />
    </div>
  );
};

export default Class;
