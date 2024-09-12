import React, { useEffect } from "react";
import { useCommonStore } from "../stores";

const Class = () => {
  const { setHeaderTitle, setHeaderActions } = useCommonStore();
  useEffect(() => {
    setHeaderTitle("Danh sách lớp học");
    setHeaderActions([
      {
        title: "Tạo",
        icon: "",
        onClick: () => {
          console.log("a");
        },
        type: "button",
        disabled: false,
      },
      {
        title: "Import",
        icon: "",
        onClick: () => {
          console.log("a");
        },
        type: "file",
        disabled: false,
      },
    ]);
  }, []);
  return <div>Class</div>;
};

export default Class;
