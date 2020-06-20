export const getDay = () => {
  const d = new Date();
  return d.getDate();
};

export const getMonth = (): string => {
  const d = new Date();
  return d.getMonth() + 1 + '';
};
export const getDate = (): string => {
  const d = new Date();
  return d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
};

export const getYear = (): string => {
  const date = new Date();
  return '' + date.getFullYear();
};
