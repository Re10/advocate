const router = require('express').Router();
const controller = require('./controller');
const fileUpload = require('../../helper').fileUpload;

async function post(req, res) {
    console.log('Post Advocate Details');
    let response = await controller.create(req, res);
    res.status(response.status).json({ message: res.message });
}

async function get(req, res) {
    console.log('Get');
    let response = await controller.getRecord(req, res);
    res.status(response.status).json({ message: res.message });
}

async function put(req, res) {
    console.log('Put');
    let response = await controller.update(req, res);
    res.status(response.status).json({ message: res.message });
}
async function deleteOne(req, res) {
    console.log('Delete');
    let response = await controller.deleteOne(req, res);
    res.status(response.status).json({ message: res.message });
}
router.post('/', fileUpload.single('image'), post);
router.get('/?', get);
router.put('/?',fileUpload.single('image'), put);
router.delete('/?', deleteOne);

module.exports = router;
