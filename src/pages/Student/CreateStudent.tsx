import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { StudentForm } from "../../dataForm/studentForm";
import { useToast } from "../../hooks/useToast";
import { useCommonStore } from "../../stores";
import { useClassStore } from "../../stores/classStore";
import { IAction } from "../../stores/commonStore";
import MyCard from "../../components/UI/MyCard";
import { Avatar } from "primereact/avatar";
import { getImageUrl } from "../../utils";
import MySmartSelect from "../../components/UI/MySmartSelect";
import { Button } from "primereact/button";
import { ISearchUser } from "../../types/user";

const CreateStudent = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);
  const [students, setStudents] = useState<ISearchUser[]>([]);
  const { showToast } = useToast();
  const { importUsers, fetchClass, createStudentClass } = useClassStore();
  const onSubmit = async () => {
    // const result = await createStudentClass(id as string, { users: [data] });
    if (!students)
      return showToast({
        severity: "error",
        summary: "Thông báo",
        message: "Vui lòng chọn sinh viên",
      });
    const result = await importUsers(id as string, { users: students });
    if (!result) {
      return showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Thêm thất bại",
        life: 3000,
      });
    }
    showToast({
      severity: "success",
      summary: "Thông báo",
      message: "Thêm thành công",
      life: 3000,
    });
    navigate(`/student/detail/${id}`);
  };

  useEffect(() => {
    setHeaderTitle("Thêm sinh viên");

    return () => {
      resetActions();
    };
  }, []);

  useEffect(() => {
    const actions: IAction[] = [
      {
        title: "Trở lại",
        severity: "secondary",
        action: "back",
      },
      {
        onClick: () => onSubmit(),
        title: "Thêm sinh viên",
        icon: "pi-plus",
      },
    ];
    setFooterActions(actions);
  }, [students]);

  return (
    <div>
      <MyCard title="Sinh viên">
        {students &&
          students.length > 0 &&
          students.map((item: any, index: number) => (
            <div className="tw-py-2 tw-px-4 tw-flex tw-items-center tw-justify-between tw-gap-4  tw-cursor-pointer tw-border-b">
              <div className="tw-flex tw-items-center tw-gap-4">
                <Avatar
                  shape="circle"
                  size="large"
                  image={getImageUrl(item.avatar || "", item.name)}
                />
                <div>
                  <div className="tw-font-bold">{item.name}</div>
                  <div>{item.code}</div>
                </div>
              </div>
              <div>
                <Button
                  text
                  onClick={() => {
                    setStudents(
                      students.filter((t: any) => t.code !== item.code)
                    );
                  }}
                  icon="pi pi-times"
                />
              </div>
            </div>
          ))}
        <div className="tw-mt-4">
          <MySmartSelect
            query={{ type: "student" }}
            onChange={(value) => {
              const isExisted = students.find(
                (item) => item.code === value.code
              );
              if (!isExisted) {
                setStudents([...students, value]);
              }
            }}
            placeholder="Chọn sinh viên"
          />
        </div>
      </MyCard>
    </div>
  );
};

export default CreateStudent;
