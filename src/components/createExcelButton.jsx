import React from 'react';
import { Button } from 'primereact/button';
import * as XLSX from 'xlsx';

const ExcelDownloadButton = ({data, disabled, getDataFuntion}) => {
  const generateExcel = async () => {
    /* const data = [
      ['Name', 'Age'],
      ['John', 25],
      ['Jane', 30],
      // ... add more data
    ]; */

    let data = await getDataFuntion()
    console.log("????????")

    const workSheet = XLSX.utils.aoa_to_sheet(data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1');
    XLSX.writeFile(workBook, 'data.xlsx');
  };

  return (
    <Button onClick={generateExcel} label="Exportar Datos" severity="info" disabled={disabled}/>
  );
};

ExcelDownloadButton.defaultProps = {
  disabled: false
}

export default ExcelDownloadButton;