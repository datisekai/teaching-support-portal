import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { DepartmentForm } from "../../dataForm/department";
import GroupItem from "../../components/Form/GroupItem";
import { useCommonStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import MyTable from "../../components/UI/MyTable";
import { departmentSchemas, departments } from "../../dataTable/department";
const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    description: yup.string().required(),
    count: yup.number(),
    checked: yup.boolean(),
  })
  .required();
const Department = () => {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      description: "123",
      name: "",
      count: 123,
      checked: true,
    },
  });

  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);

  const onSubmit = (data: any) => {
    console.log("data", data);
  };

  useEffect(() => {
    const actions: IAction[] = [
      {
        title: "Trở lại",
        severity: "secondary",
        action: "back",
      },
      {
        onClick: handleSubmit(onSubmit),
        title: "Tạo ngành học",
        icon: "pi-plus",
      },
    ];
    setFooterActions(actions);
    setHeaderTitle("Quản lý ngành học");

    return () => {
      resetActions();
    };
  }, []);

  return (
    <div>
      <MyTable data={departments} schemas={departmentSchemas} />
      {/* <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {DepartmentForm.map((form, index) => (
          <GroupItem errors={errors} {...form} key={index} control={control} />
        ))}
      </form> */}
    </div>
  );
};

export default Department;
