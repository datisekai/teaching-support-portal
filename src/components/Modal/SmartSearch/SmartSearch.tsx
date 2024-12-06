import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { getImageUrl } from "../../../utils";
import { useCommonStore, useModalStore } from "../../../stores";
import { useDebounceValue } from "usehooks-ts";
import { processMiddlewareSendRequest } from "../../../apis";
import MyLoading from "../../UI/MyLoading";

const SmartSearch = () => {
  const [selected, setSelected] = useState<any>(null);
  const { content, onDismiss } = useModalStore();
  const [debouncedValue, setValue] = useDebounceValue("", 300);
  const [filterData, setFilterData] = useState<any>([]);
  const { isLoadingApi } = useCommonStore();

  useEffect(() => {
    if (content && content.apiUrl) {
      handleSearch();
    }
  }, [debouncedValue, content]);

  const handleSearch = async () => {
    const response = await processMiddlewareSendRequest({
      endpoint: content.apiUrl,
      method: "GET",
      body: {
        q: debouncedValue,
        ...content?.query,
      },
    });

    setFilterData(response.data);
  };

  return (
    <div>
      {!selected && (
        <>
          {" "}
          <div>
            <div>Tìm kiếm theo mã số, tên</div>
            <InputText
              className="tw-w-full tw-mt-1"
              placeholder="Tìm người dùng"
              onChange={(event) => setValue(event.target.value)}
            />
          </div>
          <MyLoading isLoading={isLoadingApi}>
            <div className="tw-max-h-[200px] tw-overflow-y-auto tw-shadow-sm tw-mt-4 tw-border tw-rounded ">
              {filterData &&
                filterData.length > 0 &&
                filterData.map((item: any, index: number) => (
                  <div
                    key={item.code}
                    onClick={() => setSelected({ type: "real", ...item })}
                    className="tw-py-2 tw-px-4 tw-flex tw-items-center tw-gap-4 tw-border-b tw-cursor-pointer hover:tw-bg-gray-100"
                  >
                    <Avatar
                      shape="circle"
                      size="large"
                      image={getImageUrl(item?.avatar || "", item.name)}
                    />
                    <div>
                      <div className="tw-font-bold">{item.name}</div>
                      <div>{item.code}</div>
                    </div>
                  </div>
                ))}

              {filterData?.length == 0 && debouncedValue && (
                <div
                  onClick={() =>
                    setSelected({ type: "anonymous", code: "", name: "" })
                  }
                  className="tw-py-2 tw-px-4 tw-flex tw-items-center tw-gap-4 tw-border-b tw-cursor-pointer hover:tw-bg-gray-100"
                >
                  <Avatar
                    shape="circle"
                    size="large"
                    image={getImageUrl("", "NEW")}
                  />
                  <div>
                    <div className="tw-font-bold">{debouncedValue}</div>
                    <div>Tạo tài khoản cho người dùng này</div>
                  </div>
                </div>
              )}
            </div>
          </MyLoading>
        </>
      )}
      {selected && (
        <>
          {selected.type == "anonymous" ? (
            <div>
              <div className="tw-flex tw-py-2 tw-px-4 tw-items-center tw-justify-between tw-bg-gray-100 tw-border border-primary tw-rounded-lg">
                <div className=" tw-flex tw-items-center tw-gap-4 tw-border-b tw-cursor-pointer ">
                  <Avatar
                    shape="circle"
                    size="large"
                    image={getImageUrl("", "NEW")}
                  />
                  <div>
                    <div className="tw-font-bold">{debouncedValue}</div>
                    <div>Tạo tài khoản cho người dùng này</div>
                  </div>
                </div>
                <div>
                  <Button
                    text
                    onClick={() => setSelected(null)}
                    icon="pi pi-times"
                  />
                </div>
              </div>
              <div className="tw-space-y-4 tw-mt-8">
                <div>Mã số</div>
                <InputText
                  value={selected.code || ""}
                  onChange={(e) =>
                    setSelected({ ...selected, code: e.target.value })
                  }
                  placeholder="Mã số"
                  className="tw-w-full tw-mt-1"
                />
                <div>
                  <div>Nhập tên người dùng</div>
                  <InputText
                    value={selected.name}
                    onChange={(e) =>
                      setSelected({ ...selected, name: e.target.value })
                    }
                    className="tw-w-full tw-mt-1"
                    placeholder="Tên người dùng"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="tw-py-2 tw-px-4 tw-flex tw-items-center tw-justify-between tw-gap-4  tw-cursor-pointer tw-bg-gray-100 tw-border border-primary tw-rounded-lg ">
              <div className="tw-flex tw-items-center tw-gap-4">
                <Avatar
                  shape="circle"
                  size="large"
                  image={getImageUrl(selected.avatar || "", selected.name)}
                />
                <div>
                  <div className="tw-font-bold">{selected.name}</div>
                  <div>{selected.code}</div>
                </div>
              </div>
              <div>
                <Button
                  text
                  onClick={() => setSelected(null)}
                  icon="pi pi-times"
                />
              </div>
            </div>
          )}
        </>
      )}
      <div className="tw-flex tw-justify-end tw-mt-8 tw-gap-2 tw-items-center">
        <Button label="Huỷ" severity="contrast" onClick={onDismiss}></Button>
        <Button
          label="Chọn"
          onClick={() => {
            if (content?.onApply && typeof content.onApply === "function") {
              content.onApply(selected);
              onDismiss();
            }
          }}
        ></Button>
      </div>
    </div>
  );
};

export default SmartSearch;
