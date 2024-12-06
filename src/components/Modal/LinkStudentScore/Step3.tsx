import React, { useEffect, useMemo, useState } from "react";
import { useExamStore } from "../../../stores/examStore";
import { useClassStore } from "../../../stores/classStore";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import {
  useAttendanceStore,
  useCommonStore,
  useModalStore,
} from "../../../stores";
import { usestudentScoreStore } from "../../../stores/studentScoreStore";
import { useToast } from "../../../hooks/useToast";
import { useParams } from "react-router-dom";
import Step3Exam from "./Step3Exam";
import Step3Attendance from "./Step3Attendance";

type Props = {
  type: string;
  refId: number;
};
const Step3: React.FC<Props> = ({ refId, type }) => {
  const { getHistory, examHistorys, linkScore: linkExam } = useExamStore();
  const { students } = useClassStore();
  const [hashScore, setHashScore] = useState<any>({});
  const [hashAttendance, setHashAttendance] = useState<any>({});
  const { isLoadingApi } = useCommonStore();
  const { content, onDismiss } = useModalStore();
  const { linkStudentScore, fetchstudentScore, studentScore } =
    usestudentScoreStore();
  const { showToast } = useToast();
  const { id } = useParams();
  const {
    fetchAttendees,
    attendees,
    linkScore: linkAttendance,
    fetchAttendances,
  } = useAttendanceStore();
  const [score, setScore] = useState(0.25);

  useEffect(() => {
    if (type == "exam" && refId) {
      getHistory(refId.toString());
    }
    if (type == "attendance" && refId) {
      fetchAttendees(refId.toString(), {});
    }
  }, [type, refId]);

  const hashCurrentScore = useMemo(() => {
    const hash: any = {};
    if (
      !studentScore ||
      !studentScore?.data ||
      (studentScore && studentScore.data && studentScore.data.length == 0)
    )
      return;
    for (const item of studentScore.data) {
      if (!hash[item.studentCode]) {
        hash[item.studentCode] = { [item.scoreColumnId]: item };
      } else {
        hash[item.studentCode][item.scoreColumnId] = item;
      }
    }

    return hash;
  }, [studentScore]);

  useEffect(() => {
    if (examHistorys?.data) {
      const hash: any = {};
      for (const item of examHistorys) {
        hash[item.user_code] = item;
      }
      for (const item of students) {
        hash[item.code] = {
          ...hash[item.code],
          user_id: (item as any).id,
        };
      }
      setHashScore(hash);
    }
  }, [examHistorys, students]);

  useEffect(() => {
    if (attendees) {
      const hash: any = {};
      for (const item of attendees) {
        hash[item.user.id] = item;
      }
      setHashAttendance(hash);
    }
  }, [attendees]);

  const handleLink = async () => {
    const payload = [];
    if (type === "exam") {
      for (const key in hashScore) {
        const item = hashScore[key];
        payload.push({
          studentId: item.userId || item.user_id,
          score: item.grade || 0,
          scoreColumnId: content.id,
        });
      }
    }
    if (type === "attendance") {
      for (const key in hashAttendance) {
        const item = hashAttendance[key];
        const newScore =
          hashCurrentScore?.[item.user.code]?.[content.id]?.score || 0;
        payload.push({
          studentId: +key,
          score: item.isSuccess ? +newScore + +score : +newScore,
          scoreColumnId: content.id,
        });
      }
    }

    const result = await linkStudentScore(payload);
    if (result) {
      onDismiss();
      showToast({
        severity: "success",
        summary: "Thành công",
        message: "Liên kết điểm thành công",
        life: 3000,
      });
      if (type === "exam") {
        linkExam(refId);
      } else if (type === "attendance") {
        linkAttendance(refId);
        fetchAttendances({ classId: id });
      }
      fetchstudentScore(id as string);
      return;
    }
    showToast({
      severity: "error",
      summary: "Thông báo",
      message: "Liên kết điểm thất bại",
      life: 3000,
    });
  };

  return (
    <div>
      {type === "exam" && (
        <Step3Exam
          hashCurrentScore={hashCurrentScore}
          hashScore={hashScore}
          setHashScore={setHashScore}
        />
      )}
      {type === "attendance" && (
        <Step3Attendance
          score={score}
          setScore={setScore}
          hashCurrentScore={hashCurrentScore}
          hashAttendance={hashAttendance}
          setHashAttendance={setHashAttendance}
          refId={refId}
        />
      )}
      <div className="tw-flex tw-justify-end tw-mt-4">
        <Button
          loading={isLoadingApi}
          onClick={handleLink}
          label="Liên kết điểm"
        ></Button>
      </div>
    </div>
  );
};

export default Step3;
