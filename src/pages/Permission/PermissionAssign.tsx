import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { useCommonStore, usePermissionStore, useRoleStore } from "../../stores";
import { IPermission } from "../../types/user";
import { translateAction, translateResource } from "../../utils";
import MyCard from "../../components/UI/MyCard";
import { useToast } from "../../hooks/useToast";
import MyLoading from "../../components/UI/MyLoading";
import { useUserStore } from "../../stores/userStore";

const PermissionAssign: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [checkedStates, setCheckedStates] = useState<{
    [key: string]: boolean;
  }>({});

  const { permissions, fetchPermissions } = usePermissionStore();
  const { role, fetchRole, updateRolePermissions } = useRoleStore();
  const { showToast } = useToast();
  const { isLoadingApi } = useCommonStore();
  const { permissions: userPermissions } = useUserStore();

  useEffect(() => {
    fetchPermissions();
    if (id) {
      fetchRole(parseInt(id));
    }
  }, [fetchPermissions, id, fetchRole]);

  // Hàm kiểm tra quyền (permission) đã có trong role hay không
  const isPermissionInRole = (resource: string, action: string) => {
    return role?.permissions?.some(
      (perm: IPermission) =>
        perm.resource === resource && perm.action === action
    );
  };

  // Nhóm các quyền theo resource
  const groupByResource = permissions.reduce(
    (result: Record<string, IPermission[]>, item: IPermission) => {
      if (!result[item.resource]) {
        result[item.resource] = [];
      }
      result[item.resource].push(item);
      return result;
    },
    {}
  );

  // Tạo cấu trúc dữ liệu cho UI
  const transformedData = Object.keys(groupByResource).reduce(
    (result: Record<string, any>, resourceKey) => {
      const translatedTitle = translateResource(resourceKey);
      result[resourceKey] = {
        title: translatedTitle,
        key: resourceKey,
        children: groupByResource[resourceKey].map((item) => ({
          ...item,
          title: translateAction(item.action),
          key: `${item.resource}:${item.action}`,
          isChecked: isPermissionInRole(item.resource, item.action),
        })),
      };
      return result;
    },
    {}
  );

  // Kiểm tra trạng thái của quyền cha dựa trên trạng thái của các quyền con
  const isParentChecked = (item: any) => {
    return item.children?.every(
      (child: any) => checkedStates[child.key] || child.isChecked
    );
  };

  // Toggle parent và các child permissions
  const togglePermission = (e: CheckboxChangeEvent, item: any) => {
    const updatedPermissions = e.checked
      ? addPermissions(item)
      : removePermissions(item);
    setSelectedPermissions(updatedPermissions || []);
    setCheckedStates((prev) => ({
      ...prev,
      [item.key]: isParentChecked(item), // Cập nhật trạng thái của quyền cha
    }));
  };

  const addPermissions = (item: any) => {
    const permissionIds = role?.permissions.map((perm) => perm.id) || [];
    const permissionIdsSelected =
      item.children.map((perm: any) => perm.id) || [];
    const existingPermissionIds = Array.from(
      new Set([...permissionIds, ...permissionIdsSelected])
    );
    const result = updateRolePermissions(
      parseInt(id ?? "0", 10),
      existingPermissionIds
    );

    if (!result) {
      return showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Cập nhật thất bại",
        life: 3000,
      });
    }

    console.log(existingPermissionIds);
    const newPermissions = [...selectedPermissions, item.key]; // Thêm parent
    item.children?.forEach((child: any) => {
      newPermissions.push(child.key); // Thêm children
      setCheckedStates((prev) => ({ ...prev, [child.key]: true }));
    });
    setCheckedStates((prev) => ({ ...prev, [item.key]: true })); // Check parent
    showToast({
      severity: "success",
      summary: "Thông báo",
      message: "Cập nhật thành công",
      life: 3000,
    });
    return newPermissions;
  };

  const removePermissions = (item: any) => {
    const permissionIds = role?.permissions.map((perm) => perm.id) || [];
    const permissionIdsSelected =
      item.children.map((perm: any) => perm.id) || [];
    const existingPermissionIds = permissionIds.filter(
      (id) => !permissionIdsSelected.includes(id)
    );
    const result = updateRolePermissions(
      parseInt(id ?? "0", 10),
      existingPermissionIds
    );

    if (!result) {
      return showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Cập nhật thất bại",
        life: 3000,
      });
    }

    console.log(existingPermissionIds);

    let newPermissions = selectedPermissions.filter((p) => p !== item.key); // Bỏ parent
    item.children?.forEach((child: any) => {
      newPermissions = newPermissions.filter((p) => p !== child.key); // Bỏ children
      setCheckedStates((prev) => ({ ...prev, [child.key]: false }));
    });
    setCheckedStates((prev) => ({ ...prev, [item.key]: false })); // Uncheck parent
    showToast({
      severity: "success",
      summary: "Thông báo",
      message: "Cập nhật thành công",
      life: 3000,
    });
    return newPermissions;
  };

  // Hàm xử lý thay đổi trạng thái của quyền con
  const handleSwitchChange = (
    idProp: number,
    childKey: string,
    value: boolean
  ) => {
    const [resource, action] = childKey.split(":");
    const permissionIds = role?.permissions.map((perm) => perm.id) || [];
    const existingPermissionIds = permissionIds.includes(idProp)
      ? permissionIds.filter((id) => id !== idProp)
      : [...permissionIds, idProp];
    const result = updateRolePermissions(
      parseInt(id ?? "0", 10),
      existingPermissionIds
    );

    if (!result) {
      return showToast({
        severity: "danger",
        summary: "Thông báo",
        message: "Cập nhật thất bại",
        life: 3000,
      });
    }

    // Kiểm tra nếu tất cả các quyền con được chọn thì tự động check quyền cha
    const parentKey = childKey.split(":")[0];
    const parentItem = transformedData[parentKey];
    const allChildrenChecked = parentItem.children.every(
      (child: any) => checkedStates[child.key] || child.key === childKey
    );
    setCheckedStates((prev) => ({
      ...prev,
      [childKey]: value,
      [parentKey]: allChildrenChecked, // Cập nhật trạng thái của quyền cha nếu tất cả con đều được chọn
    }));
    showToast({
      severity: "success",
      summary: "Thông báo",
      message: "Cập nhật thành công",
      life: 3000,
    });
  };

  return (
    <div>
      <MyLoading isLoading={isLoadingApi}>
        <MyCard title="Danh sách quyền">
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
            {Object.values(transformedData).map((item: any) => (
              <div key={item.key} className="tw-p-2 tw-border tw-rounded">
                <div className="tw-flex tw-items-center">
                  <Checkbox
                    inputId={item.key}
                    value={item.key}
                    onChange={(e) => togglePermission(e, item)}
                    checked={isParentChecked(item)}
                    disabled={!userPermissions.includes("user:update")}
                  />
                  <label
                    className="tw-ml-2 tw-font-bold tw-text-lg text-primary"
                    htmlFor={item.key}
                  >
                    {item.title}
                  </label>
                </div>
                {item.children && (
                  <div>
                    {item.children.map((child: any) => (
                      <div
                        className="tw-mx-4 tw-my-2 tw-flex tw-items-center"
                        key={child.key}
                      >
                        <InputSwitch
                          disabled={!userPermissions.includes("user:update")}
                          checked={
                            checkedStates[child.key] || child.isChecked || false
                          }
                          onChange={(e: InputSwitchChangeEvent) =>
                            handleSwitchChange(child.id, child.key, e.value)
                          }
                        />
                        <label className="tw-ml-2 tw-font-medium">
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
      </MyLoading>
    </div>
  );
};

export default PermissionAssign;
