export const positiveNumber = { validator: (v: number) => v >= 0 };

export const month = { validator: (v: number) => v > 0 && v < 12 };

export const ccYear = {
  validator: (v: number) => v >= new Date().getFullYear(),
};
