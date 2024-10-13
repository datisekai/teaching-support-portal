import React, { useEffect, useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import MyTable from "../components/UI/MyTable";
import { products, productSchemas } from "../dataTable/productsTable";
import { useCommonStore } from "../stores";
import MyCard from "../components/UI/MyCard";
import { TestForm } from "../dataForm/test";
import GroupItem from "../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useModalStore } from "../stores/modalStore";
import useConfirm from "../hooks/useConfirm";
import { useToast } from "../hooks/useToast";
import { Nullable } from "primereact/ts-helpers";
import MyCalendar from "../components/UI/MyCalendar";

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    description: yup.string().required(),
    count: yup.number(),
  })
  .required();
export default function Home() {
  const { setHeaderTitle } = useCommonStore();
  const { onToggle } = useModalStore();
  const { onConfirm } = useConfirm();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      description: "",
      name: "",
      count: 123,
    },
  });
  const items = [
    {
      label: "Update",
      icon: "pi pi-refresh",
    },
    {
      label: "Delete",
      icon: "pi pi-times",
    },
  ];

  const startContent = (
    <React.Fragment>
      <Button icon="pi pi-plus" className="mr-2" />
      <Button icon="pi pi-print" className="mr-2" />
      <Button icon="pi pi-upload" />
    </React.Fragment>
  );

  const centerContent = (
    <IconField iconPosition="left">
      <InputIcon className="pi pi-search" />
      <InputText placeholder="Search" />
    </IconField>
  );

  const endContent = (
    <React.Fragment>
      <SplitButton label="Save" model={items} icon="pi pi-check"></SplitButton>
    </React.Fragment>
  );

  useEffect(() => {
    setHeaderTitle("Dashboard");
  }, []);
  const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null);
  console.log(dates);
  return (
    <MyCard>
      <div>
        <div className="card">
          <Accordion activeIndex={0}>
            <AccordionTab header="Header I">
              <p className="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </AccordionTab>
            <AccordionTab header="Header II">
              <p className="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
              </p>
            </AccordionTab>
            <AccordionTab header="Header III">
              <p className="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus.
              </p>
            </AccordionTab>
          </Accordion>
        </div>
        <div className="card">
          <Toolbar
            start={startContent}
            center={centerContent}
            end={endContent}
          />
        </div>
        <div className="card tw-mt-2">
          <MyTable
            data={products}
            schemas={productSchemas}
            actions={[
              {
                icon: "pi pi-pencil",
                onClick: (data, options) => {
                  console.log("click", data, options);
                },
              },
            ]}
          />
        </div>
        <div className="card tw-mt-2">
          <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
            {TestForm.map((form, index) => (
              <GroupItem
                errors={errors}
                {...form}
                key={index}
                control={control}
              />
            ))}
          </form>
        </div>
      </div>
      <Button
        label="Test modal"
        onClick={() =>
          onToggle("test", {
            header: "123",
            footer: (
              <div>
                <Button label="Ok" icon="pi pi-check" autoFocus />
              </div>
            ),
            content: { name: "test" },
          })
        }
      ></Button>
      <Button
        label="Confirm"
        onClick={() =>
          onConfirm({
            onAccept: () => console.log("onAccept"),
            onReject: () => console.log("onReject"),
          })
        }
      ></Button>
      <Button label="Show Toast" onClick={() => showToast({})}></Button>
      <MyCalendar dates={dates} setDates={setDates} />
    </MyCard>
  );
}
