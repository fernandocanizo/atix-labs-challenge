const log = (req, res) => {
  res.status(200).json(req.body);
};

export default log;
