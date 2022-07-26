const db = require('../persistence');

module.exports = async (req, res) => {
    await db.updateItem(req.params.id, {
        id: req.params.id,
        name: req.body.name,
        completed: req.body.completed,
    });

    // const item = await db.getItem(req.body.name);
    // console.log(item);
    res.send( {
        id: req.params.id,
        name: req.body.name,
        completed: req.body.completed,
    });
};
