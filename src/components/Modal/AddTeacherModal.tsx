import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { teacherSchemas } from "../../dataTable/teacherTable";
import { Button } from "primereact/button";
import MyTable, { IActionTable } from "../UI/MyTable";
import { useTeacherStore } from "../../stores/teacherStore";
import { useCommonStore, useModalStore } from "../../stores";
import { useClassStore } from "../../stores/classStore";
import { MultiSelect } from "primereact/multiselect";
import { useMajorStore } from "../../stores/majorStore";
import useConfirm from "../../hooks/useConfirm";
import { useToast } from "../../hooks/useToast";
import { UserType } from "../../constants";

const AddTeacherModal = () => {
  const [selectTeacher, setSelectTeacher] = useState([]);
  const actionTable: IActionTable[] = [
    {
      onClick: (data, options) => {
        handleDelete(data.code);
      },
      tooltip: "Xóa",
      icon: "pi-trash",
      severity: "danger",
    },
  ];
  const { teachers, fetchTeachers } = useTeacherStore();
  const { major, updateAssignTeachersMajor, fetchMajor, deleteTeachersMajor } =
    useMajorStore();
  const { isLoadingApi } = useCommonStore();
  const { content } = useModalStore();
  const { onConfirm } = useConfirm();
  const { showToast } = useToast();
  const handleDelete = async (teacherCode: number) => {
    const data = {
      message: "Bạn có chắc chắn muốn xoá giáo viên này khỏi môn học?",
      header: "Xác nhận xoá",
      onAccept: async () => {
        try {
          const result = await deleteTeachersMajor(content.id, teacherCode);

          if (!result) {
            showToast({
              severity: "error",
              summary: "Thông báo",
              message: "Xóa thất bại",
              life: 3000,
            });
          } else {
            showToast({
              severity: "success",
              summary: "Thông báo",
              message: "Xóa thành công",
              life: 3000,
            });
          }
        } catch (error) {
          showToast({
            severity: "error",
            summary: "Thông báo",
            message: "Xảy ra lỗi khi xoá",
            life: 3000,
          });
        }
      },
      onReject: () => {},
    };
    onConfirm(data);
  };

  const handleSubmit = () => {
    const transferData = selectTeacher.map((item: any) => {
      return {
        code: item.code,
        name: item.name,
      };
    });
    updateAssignTeachersMajor(content.id, { teacherCodes: transferData });
  };
  useEffect(() => {
    fetchTeachers({ type: UserType.TEACHER });
    fetchMajor(content.id);
  }, []);
  return (
    <div>
      <div className="tw-flex tw-justify-between tw-items-center tw-my-1">
        <MultiSelect
          value={selectTeacher}
          onChange={(e: DropdownChangeEvent) => setSelectTeacher(e.value)}
          options={teachers.map((item) => ({
            ...item,
            label: item.code + " - " + item.name,
          }))}
          optionLabel="label"
          filter
          placeholder="Chọn giảng viên"
          className="w-full md:w-20rem"
        />
        <Button onClick={handleSubmit}>Thêm</Button>
      </div>
      <MyTable
        isLoading={isLoadingApi}
        data={major.teachers}
        schemas={teacherSchemas}
        actions={actionTable}
      />
    </div>
  );
};

export default AddTeacherModal;
