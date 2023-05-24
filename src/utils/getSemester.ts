export default function getSemester() {
  const currMonth = new Date(Date.now()).getMonth() + 1;

  if (currMonth >= 1 && currMonth <= 5) return 1;

  if (currMonth >= 6 && currMonth <= 7) return 2;

  return 3;
}
