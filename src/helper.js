const {TodoItem} = require('./model')

exports.listAll = async function() {
    const items = await TodoItem.findAll();
    return items.map(item => item.toJSON());
}

exports.updateStatus = async function(id, status){
    const item = await TodoItem.findById(id).catch(err => null)
    if(item){
        item.status = status;
        await item.save();
        return item.toJSON();
    }
}