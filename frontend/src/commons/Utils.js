/*
Courtesy of jed => https://gist.github.com/jed/982883
*/

export const GetUUID = (
  a // placeholder
) => {
  return a // if the placeholder was passed, return
    ? // a random number from 0 to 15
      (
        a ^ // unless b is 8,
        ((Math.random() * // in which case
          16) >> // a random number from
          (a / 4))
      ) // 8 to 11
        .toString(16) // in hexadecimal
    : // or otherwise a concatenated string:
      (
        [1e7] + // 10000000 +
        -1e3 + // -1000 +
        -4e3 + // -4000 +
        -8e3 + // -80000000 +
        -1e11
      ) // -100000000000,
        .replace(
          // replacing
          /[018]/g, // zeroes, ones, and eights with
          GetUUID // random hex digits
        );
};

export const getFormattedDate = timestamp => {
  const date = new Date(timestamp);
  const formattedTimeStamp = `${date.getDate()}/${date.getMonth() +
    1}/${date.getFullYear()}`;
  return formattedTimeStamp;
};
