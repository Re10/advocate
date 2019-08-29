const router = require('express').Router();
const controller = require('./controller');
const fileUpload = require('../../helper').fileUpload;

async function post(req, res) {
    console.log('postRegistration');
    let response = await controller.create(req, res);
    res.status(response.status).json({ message: response.message });
}
async function postlogin(req, res) {
    console.log('postLogin');
    let response = await controller.checkLogin(req, res);
    res.status(response.status).json({ message: response.message });
}

async function get(req, res) {
    console.log('Get');
    let response = await controller.getAllRecord(req, res);
    res.status(response.status).json({ message: response.message });
}
async function getlogin(req, res) {
    console.log('Get Login');
    let response = await controller.resetPasswordLink(req, res);
    res.status(response.status).json({ message: response.message })
}
async function resetpass(req, res) {
    let response = await controller.updatePassword(req, res);
    res.status(response.status).json({ message: response.message })
}
async function put(req, res) {
    console.log('Put');
    let response = await controller.update(req, res);
    res.status(response.status).json({ message: response.message });
}
async function deleteRecord(req, res) {
    console.log('Delete');
    let response = await controller.deleteRecord(req, res);
    res.status(response.status).json({ message: res.message });

}
async function putverify(req, res) {
    console.log('Verify');
    let response = await controller.verifyEmail(req, res);
    res.status(response.status).json({ message: res.message });
}
async function putInactive(req, res) {
    console.log('Verify');
    let response = await controller.inActive(req, res);
    res.status(response.status).json({ message: res.message });
}


router.post('/', fileUpload.single('image'), post);
router.get('/?', get);
router.put('/?', fileUpload.single('image'), put);
router.delete('/?', deleteRecord);

router.post('/forgot', getlogin);
router.put('/resetpass/?', resetpass);
router.post('/checklogin', postlogin);

router.put('/verify/?', putverify);
router.put('/inactive/?', putInactive);


module.exports = router;