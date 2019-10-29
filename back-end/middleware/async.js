module.exports = fn => (req, res, next) => {
  Promise.resolve(
    fn(req, res, next).catch(() => {
      console.log('REEEEEEEE');
    })
  );
};
