module.exports = (st, et) => {
  const startTime = new Date(st);
  const endTime = new Date(et);
  const timeDifference = endTime.getTime() - startTime.getTime();
  return Math.round(timeDifference / 60000);
};
