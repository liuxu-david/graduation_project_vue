import { utils, writeFileXLSX } from "xlsx";

export function exportExcelExam(value) {
  let data = value.map((item) => {
    return (item = {
      姓名: item.name,
      班级: item.classin,
      上学期成绩: item.firstexam,
      机试: item.firstexam,
      面试: item.secondexam,
      总分: item.allexam,
    });
  });
  const worksheet = utils.json_to_sheet(data);
  const workbook = {
    Sheets: { data: worksheet },
    SheetNames: ["data"],
  };
  writeFileXLSX(workbook, `学生成绩表.xlsx`, {
    bookType: "xlsx",
    type: "array",
  });
}
