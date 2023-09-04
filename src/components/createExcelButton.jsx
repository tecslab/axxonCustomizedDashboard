import React from 'react';
import { Button } from 'primereact/button';
import * as XLSX from 'xlsx';

const ExcelDownloadButton = (props) => {
  const generateExcel = () => {
    /* const data = [
      ['Name', 'Age'],
      ['John', 25],
      ['Jane', 30],
      // ... add more data
    ]; */
    
    const workSheet = XLSX.utils.aoa_to_sheet(props.data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1');

    XLSX.writeFile(workBook, 'data.xlsx');
  };

  return (
    <Button onClick={generateExcel} label="Exportar Datos" severity="info"/>
  );
};

export default ExcelDownloadButton;