const router=require('express').Router();
const controller=require('./controller');
async function post(req,res){
    console.log('Post');
    let response=await controller.create(req,res);
    res.status(200).json({message:response.message});
}

async function get(req,res){
    console.log('Get');
    let response=await controller.getRecord(req,res);
    res.status(200).json({message:response.message});
}

async function put(req,res){
    console.log('Put');
    let response=await controller.update(req,res);
    res.status(200).json({message:response.message});
}
async function deleteRecord(req,res){
    console.log('Put');
    let response=await controller.deleteRecord(req,res);
    res.status(200).json({message:response.message});
}
async function getMonthlyReports(req,res){
    console.log('MonthlyReports');
    let response=await controller.getMonthlyReports(req,res);
    res.status(200).json({message: response.message});
}

router.post('/',post);
router.get('/?',get);
router.put('/?',put);
router.delete('/?',deleteRecord);

router.get('/monthlyreport',getMonthlyReports);



module.exports=router;