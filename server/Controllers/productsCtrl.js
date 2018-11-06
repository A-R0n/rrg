const getRoutesReducer = (req, res) => {
    const db = req.app.get("db");
    db.routes
      .find()
      .then(r => {
        return res.status(200).json(r);
      })
      .catch(console.warn);
};

module.exports = {
    getRoutesReducer
}