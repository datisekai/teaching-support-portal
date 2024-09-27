import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import React, { useState } from "react";
import { teachers, teacherSchemas } from "../../dataTable/teacher";
import { Button } from "primereact/button";
import MyTable, { IActionTable } from "../UI/MyTable";

const AddTeacherModal = () => {
  const [selectTeacher, setSelectTeacher] = useState(null);
  const actionTable: IActionTable[] = [];
  const handleSubmit = () => {
    console.log(selectTeacher);
  };
  return (
    <div>
      <div className="tw-flex tw-justify-between tw-items-center tw-my-1">
        <Dropdown
          filter
          value={selectTeacher}
          onChange={(e: DropdownChangeEvent) => setSelectTeacher(e.value)}
          options={teachers}
          optionLabel="name"
          placeholder="Chọn giảng viên"
          className="w-full md:w-14rem"
        />
        <Button onClick={handleSubmit}>Thêm</Button>
      </div>
      <MyTable data={teachers} schemas={teacherSchemas} actions={actionTable} />
    </div>
  );
};

export default AddTeacherModal;
