export const getCurrentDateTime = (): string => {
  const date: Date = new Date();
  let curDateTime = `${date.getMonth() + 1}-${date.getDay()}-${date.getFullYear()} || ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  return curDateTime;
}
