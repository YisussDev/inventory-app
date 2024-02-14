export function cleanRegisterData(formData: any) {
  const cleanData: any = {};
  for (const key of Object.keys(formData)) {
    if (formData[key] !== null) {
      cleanData[key] = formData[key];
    }
  }
  return cleanData;
}
