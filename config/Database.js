import { Sequelize } from "sequelize";

const db = new Sequelize('predict_db', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
});

export default db;