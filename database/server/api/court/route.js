const router = require('express').Router();
const controller = require('./controller');

async function post(req, res) {
    console.log('post');
    let response = await controller.create(req, res);
    res.status(response.status).json({ message: response.message });
}
async function get(req, res) {
    console.log('Get');
    let response = await controller.getRecord(req, res);
    res.status(response.status).json({ message: response.message });
}
async function put(req, res) {
    console.log('Put');
    let response = await controller.update(req, res);
    res.status(response.status).json({ message: response.message });
}
async function deleteRecord(req, res) {
    console.log('Delete.');
    let response = await controller.deleteRecord(req, res);
    res.status(response.status).json({ message: response.message });
}

router.post('/', post);
router.get('/?', get);
router.put('/?', put);
router.delete('/?', deleteRecord);


module.exports = router;