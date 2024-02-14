export function generateQuerySearchUrl(form: any): string{
  const keys = Object.keys(form);
  let queryGenerating = '';
  for (let key of keys) {
    if(form[key] && (key!='page')){
      queryGenerating = `${queryGenerating}&${key}=${form[key]}`
    }
    else{

    }
  }
  return queryGenerating;
}
