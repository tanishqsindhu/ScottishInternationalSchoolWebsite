module.exports.home =(req,res)=>{
    // const errorMessage='underConstruction'
    res.render('publications/HomePage');
}
module.exports.renderAddForm =(req,res)=>{
    res.render('publications/addForm');
}
module.exports.add=(req,res)=>{
    console.log(req)
    res.render('publications/HomePage');
}