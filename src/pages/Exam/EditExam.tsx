import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import GroupItem from "../../components/Form/GroupItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCommonStore, useModalStore } from "../../stores";
import { IAction } from "../../stores/commonStore";
import { ExamForm } from "../../dataForm/examForm";
import { PickListChangeEvent } from "primereact/picklist";
import MyPickList, { ISource } from "../../components/UI/MyPickList";
import { questions } from "../../dataTable/questionTable";
import MyCard from "../../components/UI/MyCard";
import { ModalName } from "../../constants";
import useConfirm from "../../hooks/useConfirm";

// Schema validation
const schema = yup
  .object()
  .shape({
    examTitle: yup.string().required("Tiêu đề bài thi là bắt buộc."),
    major: yup.string().required("Môn học là bắt buộc."),
    classGroup: yup.string().required("Nhóm lớp là bắt buộc."),
    startTime: yup.date().nullable().required("Thời gian bắt đầu là bắt buộc."),
    endTime: yup
      .date()
      .nullable()
      .required("Thời gian kết thúc là bắt buộc.")
      .test(
        "is-greater",
        "Thời gian kết thúc phải sau thời gian bắt đầu.",
        function (value) {
          const { startTime } = this.parent;
          return !startTime || !value || value > startTime;
        }
      ),
    type: yup.string().required("Loại đề thi là bắt buộc."),
  })
  .required();

const EditExam = () => {
  const { id } = useParams(); // Lấy ID của bài thi từ URL
  const navigate = useNavigate();
  const targetRef = useRef<ISource[]>([]); // Tạo useRef để lưu trữ giá trị target mới nhất

  const setFooterActions = useCommonStore((state) => state.setFooterActions);
  const setHeaderTitle = useCommonStore((state) => state.setHeaderTitle);
  const resetActions = useCommonStore((state) => state.resetActions);
  const { onConfirm } = useConfirm();
  const { onToggle } = useModalStore();
  const datafetch = questions.map((question) => ({
    id: question.id,
    content: question.topic,
    subcontent: (
      <div className="tw-flex tw-items-center tw-space-x-4">
        <span className="tw-flex tw-items-center">
          <i className="pi pi-bookmark text-sm tw-mr-1"></i>
          <div>{question.chapter}</div>
        </span>
        <span className="tw-flex tw-items-center">
          <i className="pi pi-star text-sm tw-mr-1"></i>
          <div>{question.level}</div>
        </span>
      </div>
    ),
    detail: question,
  }));
  // Giả sử bạn lấy dữ liệu bài thi từ API
  const fetchExamById = (id: string | undefined) => {
    questions.filter(
      (question) =>
        datafetch.map((target) => target.id).includes(question.id) && {
          id: question.id,
          content: question.topic,
          subcontent: (
            <div className="tw-flex tw-items-center tw-space-x-4">
              <span className="tw-flex tw-items-center">
                <i className="pi pi-bookmark text-sm tw-mr-1"></i>
                <div>{question.chapter}</div>
              </span>
              <span className="tw-flex tw-items-center">
                <i className="pi pi-star text-sm tw-mr-1"></i>
                <div>{question.level}</div>
              </span>
            </div>
          ),
          detail: question,
        }
    );
    setTarget(datafetch);
    return {
      examTitle: "Ví dụ bài thi",
      major: "math",
      classGroup: "A",
      startTime: new Date(),
      endTime: new Date(),
      type: "essay",
    };
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset, // Sử dụng reset để điền dữ liệu vào form
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      examTitle: "",
      major: "",
      classGroup: "",
      startTime: undefined,
      endTime: undefined,
      type: "",
    },
  });

  useEffect(() => {
    // Lấy dữ liệu bài thi và điền vào form khi trang được tải
    const examData = fetchExamById(id);
    reset(examData); // Điền dữ liệu vào form
  }, [id, reset]);

  const handleOpenModal = (data: any) => {
    console.log("data", data);
    onToggle(ModalName.VIEW_QUESTION, {
      header: "Chi tiết câu hỏi",
      content: data, // Nội dung chi tiết của câu hỏi
      style: "tw-w-[90%] md:tw-w-[30rem]",
    });
  };

  const [source, setSource] = useState<ISource[]>([]);

  const [target, setTarget] = useState<ISource[]>([]);

  const onChange = (event: PickListChangeEvent) => {
    setSource(event.source);
    setTarget(event.target);
    targetRef.current = event.target; // Cập nhật giá trị của targetRef với giá trị mới nhất của target
  };

  const handleSubmitUpdate = (data: any) => {
    console.log("Dữ liệu bài thi đã cập nhật", data);
    navigate(-1);
  };

  const onSubmit = (data: any) => {
    // Xử lý logic lưu trữ dữ liệu
    const payload = {
      message: "Bạn có chắc chắn muốn cập nhật khi chưa thêm câu hỏi?",
      header: "Xác nhận cập nhật",
      onAccept: () => {
        console.log("Đã cập nhật thành công!", data);
        handleSubmitUpdate(data);
      },
      onReject: () => {
        console.log("Đã hủy bỏ hành động.");
      },
    };
    console.log(targetRef.current.length); // Sử dụng targetRef để lấy giá trị mới nhất
    if (targetRef.current.length === 0) {
      onConfirm(payload);
      return;
    }
    handleSubmitUpdate(data);
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
        title: "Cập nhật",
        icon: "pi-save",
      },
    ];
    setFooterActions(actions);
    setHeaderTitle("Chỉnh sửa bài thi");

    return () => {
      resetActions();
    };
  }, [handleSubmit, setFooterActions, setHeaderTitle, resetActions]);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="tw-space-y-4">
        {ExamForm.map((form, index) => (
          <GroupItem errors={errors} {...form} key={index} control={control} />
        ))}

        <MyCard title="Danh sách câu hỏi">
          <MyPickList
            source={source}
            target={target}
            onChange={onChange}
            handleOpenModal={handleOpenModal}
          />
        </MyCard>
      </form>
    </div>
  );
};

export default EditExam;
