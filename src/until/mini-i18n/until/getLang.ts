// const userAgent = navigator.userAgent || '';
// const isWechat = /micromessenger\/([\d.]+)/i.test(userAgent);

export const getLang = () => {
  const w = window && window.navigator && window.navigator.language
  if(w) return w
}