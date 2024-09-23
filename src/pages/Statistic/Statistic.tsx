import { useEffect, useState } from "react";
import { useCommonStore } from "../../stores";
import MyTable, { IActionTable } from "../../components/UI/MyTable";
import { Chart } from "primereact/chart";
import { students, studentSchemas } from "../../dataTable/student";

const Statistic = () => {
  const actionTable: IActionTable[] = [];
  const [chartDataBar, setChartDataBar] = useState({});
  const [chartOptionsBar, setChartOptionsBar] = useState({});
  const [chartDataDoughnut, setChartDataDoughnut] = useState({});
  const [chartOptionsDoughnut, setChartOptionsDoughnut] = useState({});

  useEffect(() => {
    const dataBar = {
      labels: ["Đã điểm danh", "Chưa điểm danh"],
      datasets: [
        {
          label: "Điểm danh",
          data: [1, 4, 10],
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
      //   plugins: {
      //     legend: {
      //       display: false,
      //     },
      //   },
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
          data: [25.0, 75.0],
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
  }, []);

  const { setHeaderTitle, resetActions } = useCommonStore();

  useEffect(() => {
    setHeaderTitle("Thống kê của lớp");

    return () => {
      resetActions();
    };
  }, []);

  return (
    <div>
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
      <MyTable data={students} schemas={studentSchemas} actions={actionTable} />
    </div>
  );
};

export default Statistic;
