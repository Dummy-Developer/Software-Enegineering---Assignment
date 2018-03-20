const router = require("express").Router();
const Forum = require("./../models/forum-model");

//get all forum with course ID
router.get("/all/:id", (req, res) => {
    if (!req.user) return res.sendStatus(401);
    if (!req.params.id) return res.sendStatus(404);

    let courseId = req.params.id;

    Forum.find({ courseId: courseId })
        .populate("owner")
        .exec((err, forums) => {
            if (err) throw err;
            res.status(200).json(forums);
        });
});

module.exports = router;