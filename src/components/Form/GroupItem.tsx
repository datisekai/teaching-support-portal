import React from "react";
import { IForm } from "../../types/form-item";
import MyCard from "../UI/MyCard";
import FormItem from "./FormItem";
import { UseFormRegister } from "react-hook-form";

interface IGroup extends IForm {
  control: any;
  errors: any;
  watch?: any;
}
const GroupItem: React.FC<IGroup> = ({
  attributes,
  title,
  control,
  errors,
  watch,
}) => {
  console.log(attributes, watch);
  return (
    <MyCard
      title={title}
      className=" tw-flex tw-gap-x-4 tw-gap-y-4 tw-flex-wrap"
    >
      {attributes.map((attribute) => (
        <FormItem
          watch={
            attribute.preConditionProp
              ? watch(attribute.preConditionProp)
              : "NO_PRE_CONDITION"
          }
          error={errors[attribute.prop]?.message || ""}
          key={attribute.prop}
          {...attribute}
          control={control}
        />
      ))}
    </MyCard>
  );
};

export default GroupItem;
