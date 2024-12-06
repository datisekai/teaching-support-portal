import { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { useAttendanceStore, useCommonStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { Chart } from "primereact/chart";
import { TabPanel, TabView } from "primereact/tabview";
import MyLoading from "../../components/UI/MyLoading";
import { statisticSchemas } from "../../dataTable/statisticTable";

interface Tab {
  title: string;
  content: string;
}

const generateDateArray = (startDate: Date): Tab[] => {
  return Array.from({ length: 100 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() - i);
    return {
      title: date.toISOString().split("T")[0],
      content: date.toISOString().split("T")[0],
    };
  });
};

const Statistic = () => {
  const [chartDataBar, setChartDataBar] = useState<any>({});
  const [chartOptionsBar, setChartOptionsBar] = useState<any>({});
  const [chartDataDoughnut, setChartDataDoughnut] = useState<any>({});
  const [chartOptionsDoughnut, setChartOptionsDoughnut] = useState<any>({});
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [scrollableTabs, setScrollableTabs] = useState<Tab[]>([]);

  const { isLoadingApi } = useCommonStore();
  const { getAttendancesStatistic, attendancesStatisticClass } =
    useAttendanceStore();
  const { id } = useParams<{ id: string }>();
  const { setHeaderTitle, resetActions } = useCommonStore();

  useEffect(() => {
    setHeaderTitle("Thống kê của lớp");

    setScrollableTabs(generateDateArray(new Date()));
    const dataBar = {
      labels: ["Đã điểm danh", "Chưa điểm danh"],
      datasets: [
        {
          label: "Điểm danh",
          data: [
            attendancesStatisticClass.checkedInCount,
            attendancesStatisticClass.notCheckedInCount,
            150,
          ],
          backgroundColor: [
            "rgba(255, 159, 64, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: ["rgb(255, 159, 64)", "rgb(75, 192, 192)"],
          borderWidth: 1,
        },
      ],
    };
    const optionsBar = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    setChartDataBar(dataBar);
    setChartOptionsBar(optionsBar);
    const dataDoughnut = {
      labels: ["Tỉ lệ đi học", "Tỉ lệ nghỉ học"],
      datasets: [
        {
          data: [
            attendancesStatisticClass.attendanceRate,
            attendancesStatisticClass.absenceRate,
          ],
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: ["rgb(54, 162, 235)", "rgb(153, 102, 255)"],
          borderWidth: 1,
        },
      ],
    };
    const optionsDoughnut = {
      cutout: "60%",
    };

    setChartDataDoughnut(dataDoughnut);
    setChartOptionsDoughnut(optionsDoughnut);

    return () => {
      resetActions();
    };
  }, [resetActions, setHeaderTitle]);

  // const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const selected = new Date(e.target.value);
  //   setSelectedDate(selected);

  //   // Calculate 30 days before the selected date
  //   const calculatedStartDate = new Date(selected);
  //   calculatedStartDate.setDate(calculatedStartDate.getDate() - 30);
  //   setStartDate(calculatedStartDate);

  //   // Generate tabs from selected date back 30 days
  //   setScrollableTabs(generateDateArray(selected));
  // };

  const handleSearch = (date: string) => {
    if (id) {
      getAttendancesStatistic(id, { date });
    }
  };

  return (
    <div>
      <TabView scrollable className="tw-w-screen">
        {scrollableTabs.map((tab) => (
          <TabPanel key={tab.title} header={tab.title}>
            <MyLoading isLoading={isLoadingApi}>
              <div className="tw-flex tw-items-center tw-mb-2">
                <Chart
                  type="bar"
                  data={chartDataBar}
                  options={chartOptionsBar}
                  className="tw-w-4/6"
                />
                <Chart
                  type="doughnut"
                  data={chartDataDoughnut}
                  options={chartOptionsDoughnut}
                  className="tw-w-2/6"
                />
              </div>
            </MyLoading>
            <MyTable
              isLoading={isLoadingApi}
              data={attendancesStatisticClass.data}
              schemas={statisticSchemas}
              onChange={() => handleSearch(tab.content)}
            />
          </TabPanel>
        ))}
      </TabView>
    </div>
  );
};

export default Statistic;
