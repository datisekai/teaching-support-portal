import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export function exportExcel(fileName: string, data: any, schemas: any) {
  if (Array.isArray(data) && data.length > 0) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    worksheet.columns = schemas.map((schema: any) => ({
      header: schema.label,
      key: schema.prop,
      width: schema.type === "number" ? 10 : 30,
    }));

    data.forEach((item: any) => {
      worksheet.addRow(item);
    });
    const nameFile = `${fileName}_${Date.now()}.csv`;

    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        nameFile
      );
    });
  }
}
