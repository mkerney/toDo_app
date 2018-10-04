const Sequelize = require('sequelize');
const config = require("../config.json");
const sequelize = new Sequelize('config.database', 'config.username', 'config.password', {
    dialect: 'sqlite',
    
    // SQLite only
    storage: 'config.sqlite',

    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
});

const TodoItem = sequelize.define('todo_item', {
    description: Sequelize.TEXT,
    status: {
        type: Sequelize.BOOLEAN,
        default: false
    }
});

sequelize.sync().then(() => TodoItem.create({
        description: "First task",
    })).then(item => {
        console.log(item);
    // sequelize.findAll().then(item => {
    //     console.log(item);
    // })
});

module.exports={
    sequelize:sequelize,
    TodoItem: TodoItem
}