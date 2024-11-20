import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { SelectButton } from "primereact/selectbutton";
import { Steps } from "primereact/steps";
import React, { useEffect, useMemo, useState } from "react";
import { useDifficultyStore } from "../../stores/difficultStore";
import { useCommonStore, useModalStore } from "../../stores";
import { useClassStore } from "../../stores/classStore";
import { useChapterStore } from "../../stores/chapterStore";
import { Button } from "primereact/button";
import { randomString } from "../../utils";
import { questionService } from "../../services/questionService";

const items = [
  { name: "Option 1", value: 1 },
  { name: "Option 2", value: 2 },
  { name: "Option 3", value: 3 },
];

const AutoFillQuestion = () => {
  const { difficultys } = useDifficultyStore();
  const { content, onDismiss } = useModalStore();
  const { classesUnlimited } = useClassStore();
  const { fetchChapters, chapters } = useChapterStore();
  const { isLoadingApi } = useCommonStore();
  const [loadingGenerate, setLoadingGenerate] = useState(false);

  const major = useMemo(() => {
    return classesUnlimited.find((item) => item.id === content.classId)?.major;
  }, [content, classesUnlimited]);

  useEffect(() => {
    if (major) {
      console.log("refetch", major);
      fetchChapters({ majorId: major?.id });
    }
  }, [major]);

  const [config, setConfig] = useState({
    [randomString(5)]: {
      chapterId: "",
      difficultyId: difficultys?.[0].id,
      count: 0,
    },
  });

  const handleGenerate = async () => {
    setLoadingGenerate(true);
    const responses = await Promise.allSettled(
      Object.values(config)
        .filter((item) => item.chapterId && item.count)
        .map((item) => questionService.generate(item))
    );
    setLoadingGenerate(false);

    const questions = [];
    for (const res of responses) {
      if (res.status === "fulfilled") {
        questions.push(...res.value.data);
      }
    }

    if (content?.onApply && typeof content.onApply === "function") {
      content.onApply(
        Array.from(new Map(questions.map((item) => [item.id, item])).values())
      );
    }
    onDismiss();
  };
  return (
    <div className="tw-space-y-4">
      {Object.entries(config).map(([key, item], index) => (
        <div key={index} className=" tw-flex tw-gap-4 tw-items-end">
          <div>
            <div>Chọn chương</div>
            <Dropdown
              value={item.chapterId}
              options={chapters || []}
              optionLabel="name"
              onChange={(e) =>
                setConfig({ ...config, [key]: { ...item, chapterId: e.value } })
              }
              optionValue="id"
              placeholder="Chọn chương"
              className="w-full md:w-14rem"
              loading={isLoadingApi}
            />
          </div>
          <div className="tw-w-[80px]">
            <div>Số câu</div>
            <InputNumber
              value={item.count}
              onChange={(e) =>
                setConfig({
                  ...config,
                  [key]: { ...item, count: e.value || 0 },
                })
              }
              className="tw-w-full"
              inputClassName="tw-w-full"
            />
          </div>
          <div>
            <div>Mức độ</div>
            <SelectButton
              value={item.difficultyId}
              onChange={(e) =>
                setConfig({
                  ...config,
                  [key]: { ...item, difficultyId: e.value },
                })
              }
              optionLabel="level"
              optionValue="id"
              options={difficultys}
            />
          </div>
          <div>
            <Button
              onClick={() => {
                const newConfig: any = { ...config };
                delete newConfig[key];
                setConfig(newConfig);
              }}
              icon="pi pi-trash"
              severity="danger"
            />
          </div>
        </div>
      ))}

      <div className="tw-mt-4">
        <Button
          onClick={() =>
            setConfig({
              ...config,
              [randomString(5)]: {
                chapterId: "",
                difficultyId: difficultys?.[0]?.id,
                count: 0,
              },
            })
          }
          label="Thêm bộ lọc"
          icon="pi pi-plus"
          outlined
        ></Button>
      </div>

      <div className="tw-mt-4 tw-flex tw-justify-end">
        <Button
          onClick={handleGenerate}
          label="Tạo danh sách"
          icon="pi pi-save"
          loading={loadingGenerate}
        />
      </div>
    </div>
  );
};

export default AutoFillQuestion;
