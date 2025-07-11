const db = require('../config/database');

const updatePushToken = async (user_id, push_token) => {
    const [result] = await db.query(`
        UPDATE users 
        SET push_token = ?, push_token_updated_at = NOW() 
        WHERE user_id = ?`,
        [push_token, user_id]
    );
    return result.affectedRows > 0;
};

const getUserByUserId = async (user_id) => {
    const [rows] = await db.query(`
        SELECT * FROM users WHERE user_id = ?`,
        [user_id]
    );
    return rows[0];
};

module.exports = {
    updatePushToken,
    getUserByUserId,
};