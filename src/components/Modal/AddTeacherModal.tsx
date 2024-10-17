import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { teacherSchemas } from "../../dataTable/teacherTable";
import { Button } from "primereact/button";
import MyTable, { IActionTable } from "../UI/MyTable";
import { useTeacherStore } from "../../stores/teacherStore";
import { useModalStore } from "../../stores";
import { useClassStore } from "../../stores/classStore";
import { MultiSelect } from "primereact/multiselect";

const AddTeacherModal = () => {
  const [selectTeacher, setSelectTeacher] = useState([]);
  const actionTable: IActionTable[] = [];
  const { teachers, fetchTeachers } = useTeacherStore();
  const { updateAssignTeachersClass } = useClassStore();
  const { content } = useModalStore();
  const handleSubmit = () => {
    const transferData = selectTeacher.map((item: any) => item.id);
    updateAssignTeachersClass(content.id, { teacherCodes: transferData });
    console.log(selectTeacher);
  };
  useEffect(() => {
    fetchTeachers({});
  }, []);
  return (
    <div>
      <div className="tw-flex tw-justify-between tw-items-center tw-my-1">
        <MultiSelect
          value={selectTeacher}
          onChange={(e: DropdownChangeEvent) => setSelectTeacher(e.value)}
          options={teachers}
          optionLabel="name"
          filter
          placeholder="Chọn giảng viên"
          className="w-full md:w-20rem"
        />

        {/* <Dropdown
          filter
          value={selectTeacher}
          onChange={(e: DropdownChangeEvent) => setSelectTeacher(e.value)}
          options={teachers}
          optionLabel="name"
          placeholder="Chọn giảng viên"
          className="w-full md:w-14rem"
        /> */}
        <Button onClick={handleSubmit}>Thêm</Button>
      </div>
      <MyTable
        data={content.contents}
        schemas={teacherSchemas}
        actions={actionTable}
      />
    </div>
  );
};

export default AddTeacherModal;
