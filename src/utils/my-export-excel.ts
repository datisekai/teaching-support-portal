import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { generateCharacter } from ".";

export function exportExcel(
  fileName: string,
  data: any,
  schemas: any,
  headerContent?: any,
  descriptionContent?: string,
  additionalContent?: { label: string; value: string }[]
) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  // Merge cells for the left header
  worksheet.mergeCells("A1:B1");
  const cell1 = worksheet.getCell("A1");
  cell1.value = "UBND THÀNH PHỐ HỒ CHÍ MINH";
  cell1.font = { size: 12 };
  cell1.alignment = { horizontal: "left", vertical: "middle" };

  worksheet.mergeCells("A2:B2");
  const cell2 = worksheet.getCell("A2");
  cell2.value = "TRƯỜNG ĐẠI HỌC SÀI GÒN";
  cell2.font = { bold: true, size: 12 };
  cell2.alignment = { horizontal: "left", vertical: "middle" };

  worksheet.mergeCells("F1:G1");
  const cell3 = worksheet.getCell("F1");
  cell3.value = "Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam";
  cell3.font = { bold: true, size: 12 };
  cell3.alignment = { horizontal: "right", vertical: "middle" };

  worksheet.mergeCells("F2:G2");
  const cell4 = worksheet.getCell("F2");
  cell4.value = "Độc lập - Tự do - Hạnh phúc";
  cell4.font = { bold: true, size: 12 };
  cell4.alignment = { horizontal: "right", vertical: "middle" };
  let rowIndex = 2;

  if (headerContent) {
    worksheet.mergeCells(
      `A4:${generateCharacter(schemas?.length - 1 || 0).toUpperCase()}4`
    );
    const cell5 = worksheet.getCell("C4");
    cell5.value = headerContent; // Add header content with \n
    cell5.font = { bold: true, size: 14 };
    cell5.alignment = {
      horizontal: "center",
      vertical: "middle",
    }; // Enable wrapText
    rowIndex = 5;
  }

  if (descriptionContent) {
    worksheet.mergeCells("C5:E5");
    const cell6 = worksheet.getCell("C5");
    cell6.value = descriptionContent; // Add header content with \n
    cell6.alignment = {
      horizontal: "center",
      vertical: "middle",
    }; // Enable wrapText
    rowIndex = 6;
  }

  if (additionalContent && additionalContent?.length > 0) {
    additionalContent.forEach((item: any, index: number) => {
      const cellA = worksheet.getCell(`A${rowIndex + 1}`);
      const cellB = worksheet.getCell(`B${rowIndex + 1}`);
      cellA.value = `${item.label}:`; // Add header content with \n
      cellB.value = `${item.value}`; // Add header content with \n
      rowIndex += 1;
    });
  }

  // Add schema headers starting from row 9
  schemas.forEach((schema: any, index: number) => {
    const cell = worksheet.getCell(rowIndex + 3, index + 1); // Row 8, column based on index
    cell.value = schema.label;
    cell.font = { bold: true };
    cell.alignment = { horizontal: "center", vertical: "middle" };
  });

  // Add data rows starting from row 10
  data.forEach((item: any, index: number) => {
    const row = worksheet.getRow(rowIndex + 4 + index); // Start from row 10
    schemas.forEach((schema: any, colIndex: number) => {
      row.getCell(colIndex + 1).value = schema?.render
        ? schema.render(item)
        : item[schema.prop];
    });
  });

  // Adjust column widths
  schemas.forEach((schema: any, index: number) => {
    worksheet.getColumn(index + 1).width = schema.type === "number" ? 15 : 20;
  });

  // Generate the Excel file
  const nameFile = `${fileName}_${Date.now()}.xlsx`;
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer], { type: "application/octet-stream" }), nameFile);
  });
}
