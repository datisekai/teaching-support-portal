import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MyCard from "../../components/UI/MyCard";
import { permissions } from "../../constants";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";

const PermissionAssign = () => {
  const { id } = useParams();
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [checkedStates, setCheckedStates] = useState<{
    [key: string]: boolean;
  }>({});

  const togglePermission = (e: CheckboxChangeEvent, item: any) => {
    const isChecked = e.checked;
    const updatedPermissions = isChecked
      ? addPermissions(item)
      : removePermissions(item);

    setSelectedPermissions(updatedPermissions);
  };

  const addPermissions = (item: any) => {
    const newPermissions = [...selectedPermissions, item.title];
    item.children?.forEach((child: any) => {
      newPermissions.push(child.value);
      setCheckedStates((prev) => ({ ...prev, [child.value]: true }));
    });
    return newPermissions;
  };

  const removePermissions = (item: any) => {
    let newPermissions = selectedPermissions.filter((p) => p !== item.title);
    item.children?.forEach((child: any) => {
      newPermissions = newPermissions.filter((p) => p !== child.value);
      setCheckedStates((prev) => ({ ...prev, [child.value]: false }));
    });
    return newPermissions;
  };

  const handleSwitchChange = (childTitle: string, value: boolean) => {
    setCheckedStates((prev) => ({ ...prev, [childTitle]: value }));
  };

  return (
    <div>
      <MyCard title="Danh sách quyền">
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
          {permissions.map((item) => (
            <div key={item.title} className="tw-p-2 tw-border tw-rounded">
              <div className="tw-flex tw-items-center">
                <Checkbox
                  inputId={item.title}
                  value={item.title}
                  onChange={(e) => togglePermission(e, item)}
                  checked={selectedPermissions.includes(item.title)}
                />
                <label
                  className="tw-ml-2 tw-font-bold tw-text-lg text-primary"
                  htmlFor={item.title}
                >
                  {item.title}
                </label>
              </div>
              {item.children && (
                <div>
                  {item.children.map((child) => (
                    <div
                      className="tw-mx-4 tw-my-2 tw-flex tw-items-center"
                      key={child.value}
                    >
                      <InputSwitch
                        checked={checkedStates[child.value] || false}
                        onChange={(e: InputSwitchChangeEvent) =>
                          handleSwitchChange(child.value, e.value)
                        }
                      />
                      <label
                        className="tw-ml-2 tw-font-medium"
                        htmlFor={child.value}
                      >
                        {child.title}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </MyCard>
    </div>
  );
};

export default PermissionAssign;
