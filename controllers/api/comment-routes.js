const router = require('express').Router();
const { Comment, Post } = require('../../models');
const getAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll({
        attributes: ['id', 'comment_text', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Post,
                attributes: ['title']
            }
        ]
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', getAuth, (req, res) => {
    if (req.session) {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    } else {
        window.alert("log in to post comments")
    }
});

router.delete('/:id', getAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with this id'});
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;