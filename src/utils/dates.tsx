import { OptionHTMLAttributes } from 'react';

export const monthOptions: OptionHTMLAttributes<HTMLOptionElement>[] = [
  { value: 1, label: "Janeiro" },
  { value: 2, label: "Fevereiro" },
  { value: 3, label: "Março" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Maio" },
  { value: 6, label: "Junho" },
  { value: 7, label: "Julho" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Setembro" },
  { value: 10, label: "Outubro" },
  { value: 11, label: "Novembro" },
  { value: 12, label: "Dezembro" },
];

export function toMonth(month: string) {
  /**
   * Helper function to handle inputChanges when using hooks
   * @param {string} month
   * 
   */
  let stringMonth = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ];
  return stringMonth[parseInt(month) - 1];
}
function createYearOptions() {
  const yearPlusFive = `${new Date().getFullYear() + 5}`;


  const years: OptionHTMLAttributes<HTMLOptionElement>[] = [{
    label: yearPlusFive,
    value: yearPlusFive,
  },];
  for (let index = 1; index < 100; index++) {
    const year = String(Number(yearPlusFive) - index);
    years.push({
      value: year,
      label: year,
    })
  }
  return years;
}
export const finalYearOptions = (initialYear: number) => {
  const yearPlusFive = `${new Date().getFullYear() + 5}`;


  const years: OptionHTMLAttributes<HTMLOptionElement>[] = [{
    label: yearPlusFive,
    value: yearPlusFive,
  },];
  for (let index = Number(yearPlusFive) - 1; index > initialYear; index--) {
    const year = String(index);
    years.push({
      value: year,
      label: year,
    })
  }
  return years;
}
export const daysOptions = (curentMonth: number, curentYear: number) => {
  const days: OptionHTMLAttributes<HTMLOptionElement>[] = [{
    label: "01",
    value: 1,
  },];
  const finalDay = curentMonth % 2 !== 0
    ? 30
    : (curentMonth === 2)
      ? (curentYear % 4 === 0)
        ? 29
        : 28
      : 31;
  for (let index = 2; index <= finalDay; index++) {
    days.push({
      value: index,
      label: index < 10 ? `0${index}` : `${index}`,
    })

  }
  return days;
}
export const yearOptions: OptionHTMLAttributes<HTMLOptionElement>[] = createYearOptions();
