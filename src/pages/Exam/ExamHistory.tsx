import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useExamStore } from "../../stores/examStore.ts";
import MyCard from "../../components/UI/MyCard.tsx";
import { Button } from "primereact/button";
import MyLoading from "../../components/UI/MyLoading.tsx";
import { pathNames, QuestionType } from "../../constants";
import { useLanguageStore } from "../../stores/languageStore.ts";
import { useToast } from "../../hooks/useToast.ts";
import useConfirm from "../../hooks/useConfirm.ts";
import PreviewMultiChoice from "./Preview/PreviewMultiChoice.tsx";
import PreviewQuestionCode from "./Preview/PreviewQuestionCode.tsx";
import { useQuery } from "../../hooks/useQuery.ts";
import { useCommonStore } from "../../stores/commonStore.ts";
import { SelectButton } from "primereact/selectbutton";
import PreviewResult from "./Preview/PreviewResult.tsx";
import PreviewCodeHtml from "./Preview/PreviewCodeHtml.tsx";

const HistoryExam = () => {
  const { id } = useParams();
  const [userId] = useQuery({ key: "userId", defaultValue: "" });
  const { setHeaderTitle } = useCommonStore();
  const { getTakeOrder, history, getExamHistory } = useExamStore();
  const { showToast } = useToast();
  const [questionIndex, setQuestionIndex] = useState(0);
  const { onConfirm } = useConfirm();
  const navigate = useNavigate();
  const { languages } = useLanguageStore();

  useEffect(() => {
    getData();
  }, [id]);

  useEffect(() => {
    setHeaderTitle("Xem bài làm");
  }, []);

  const getData = async () => {
    if (id) {
      await Promise.all([getExamHistory(+id, +userId), getTakeOrder(id)]).catch(
        () => {
          showToast({
            severity: "danger",
            message: "Có lỗi xảy ra, vui lòng thử lại sau",
          });
          navigate(pathNames.EXAM);
        }
      );
    }
  };

  const currentExam = useMemo(() => {
    if (
      !history.takeOrder ||
      !history.takeOrder[questionIndex] ||
      !history.submissions ||
      Object.keys(history.submissions).length == 0
    )
      return null;
    const examQuestionId = history.takeOrder[questionIndex];
    return history.submissions[examQuestionId];
  }, [history, questionIndex]);

  const examResult = useMemo(() => {
    let count = 0;
    let grades = 0;
    if (
      history &&
      history.submissions &&
      Object.keys(history.submissions).length > 0
    ) {
      for (const s of Object.values(history.submissions)) {
        if ((s as any)?.grade) {
          count += 1;
          grades += (s as any)?.grade;
        }
      }
    }

    return {
      count,
      grades,
    };
  }, [history]);

  console.log("currentExam", currentExam);

  return (
    <div className={"tw-flex tw-flex-col-reverse md:tw-flex-row tw-gap-4"}>
      <MyCard containerClassName={"tw-w-full md:tw-w-[70%] tw-h-full"}>
        <MyLoading isLoading={!currentExam}>
          {currentExam?.questionTemp?.type === QuestionType.MULTIPLE_CHOICE && (
            <PreviewMultiChoice
              showResult={history.showResult}
              index={questionIndex}
              data={currentExam}
            />
          )}
          {currentExam?.questionTemp?.type === QuestionType.CODE && (
            <PreviewQuestionCode
              showResult={history.showResult}
              index={questionIndex}
              data={currentExam}
            />
          )}
          {currentExam?.questionTemp?.type === QuestionType.CODE_HTML && (
            <PreviewCodeHtml index={questionIndex} data={currentExam} />
          )}
        </MyLoading>

        <div className={"tw-flex tw-mt-4 tw-justify-center tw-gap-2"}>
          <Button
            disabled={questionIndex == 0}
            onClick={() => setQuestionIndex(questionIndex - 1)}
            severity={"secondary"}
            iconPos={"left"}
            icon={"pi pi-angle-left"}
            label={"Câu trước"}
          ></Button>
          <Button
            disabled={questionIndex == history?.takeOrder?.length - 1}
            onClick={() => setQuestionIndex(questionIndex + 1)}
            label={"Câu tiếp theo"}
            iconPos={"right"}
            icon={"pi pi-angle-right"}
          ></Button>
        </div>
      </MyCard>
      <MyCard containerClassName={"tw-w-full md:tw-w-[30%]"}>
        <div className="tw-font-bold">Cập nhật kết quả</div>
        <PreviewResult data={currentExam} />
        <p className={"tw-italic"}>
          Chú ý: Bạn có thể click vào số thứ tự câu hỏi bên dưới để chuyển câu.
        </p>
        <div className={"tw-gap-1 tw-mt-4 tw-flex tw-flex-wrap"}>
          {history?.takeOrder?.map((item, i) => (
            <div className={"tw-relative"} key={item}>
              <Button
                onClick={() => setQuestionIndex(i)}
                outlined={questionIndex !== i}
                size={"small"}
              >
                {i + 1}
              </Button>
            </div>
          ))}
        </div>
      </MyCard>
    </div>
  );
};

export default HistoryExam;
