import { useEffect } from "react";
import MyCard from "../components/UI/MyCard";
import { useUserStore } from "../stores/userStore";
import MyTable from "../components/UI/MyTable";
import { letterSchemas } from "../dataTable/letterTable";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { pathNames } from "../constants";
import CanActivate from "../components/CanActivate";
import { useCommonStore } from "../stores";

const stats = [
  { id: 1, name: "Transactions every 24 hours", value: "44 million" },
  { id: 2, name: "Assets under holding", value: "$119 trillion" },
  { id: 3, name: "New users annually", value: "46,000" },
];

export default function Home() {
  const { statistic, getStatistic } = useUserStore();
  const { setHeaderTitle } = useCommonStore()
  const navigate = useNavigate();

  useEffect(() => {
    getStatistic();
    setHeaderTitle("Trang chủ")
  }, []);
  return (
    <div>
      <div className="tw-grid tw-grid-cols-1 xl:tw-grid-cols-3 tw-gap-4 ">
        <div className="tw-px-6 tw-py-4 tw-shadow-lg tw-border tw-rounded">
          <div className="tw-text-gray-500">Số lớp đang dạy</div>
          <div className="tw-text-2xl tw-font-bold">
            {statistic?.teachingClassesCount}
          </div>
        </div>
        <div className="tw-px-6 tw-py-4 tw-shadow-lg tw-border tw-rounded">
          <div className="tw-text-gray-500">Số bài kiểm tra đang mở</div>
          <div className="tw-text-2xl tw-font-bold">
            {statistic?.openExamsCount}
          </div>
        </div>
        <div className="tw-px-6 tw-py-4 tw-shadow-lg tw-border tw-rounded">
          <div className="tw-text-gray-500">Số đơn từ chưa duyệt</div>
          <div className="tw-text-2xl tw-font-bold">
            {statistic?.pendingLettersCount}
          </div>
        </div>
      </div>

      <CanActivate permission="letter:view">
        <div className="tw-mt-8">
          <div className="tw-flex tw-mb-2 tw-items-center tw-justify-between ">
            <div className="tw-font-bold tw-text-lg tw-mb-4">
              Các đơn từ gần đây
            </div>
            <Button
              onClick={() => navigate(pathNames.LETTER)}
              size="small"
              outlined
              label="Xem thêm"
              icon="pi pi-arrow-right"
            />
          </div>
          <MyTable
            schemas={letterSchemas}
            data={statistic.pendingLetters.map((item) => ({
              ...item,
              studentCode: item?.user?.code,
              studentName: item?.user?.name,
            }))}
          />
        </div>
      </CanActivate>
    </div>
  );
}
