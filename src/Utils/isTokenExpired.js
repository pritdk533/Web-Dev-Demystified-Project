export const isTokenExpired = (tokenTimeStamp) => {
  const currentTimeStamp = Math.floor(Date.now() / 1000); //convert into millisecond
  return currentTimeStamp > tokenTimeStamp;
};
