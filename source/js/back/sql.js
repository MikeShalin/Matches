const db = require("../connect/db/connect.js");

module.exports ={
    selectProductList: (userId) => {return `SELECT title, P.ID FROM userProducts AS UP INNER JOIN product AS P WHERE UP.userID = ${userId} AND UP.productID = P.ID`},
    selectMatches:() => (`SELECT A.matchId AS matchId,GROUP_CONCAT(T.id) AS teams FROM arena AS A INNER JOIN teams AS T ON A.teamId = T.id GROUP BY A.matchId`),
    selectTeams:() => (`SELECT * FROM teams`),
    selectTeamInfo:(teamId) => (`SELECT SUM(score) AS score,SUM(missed) missed FROM arena WHERE teamId = ${teamId}`),
    selectTeamCloseInScore:(min,max) => (`SELECT teamId, SUM(score) AS score FROM arena GROUP BY teamId HAVING SUM(score) > ${min} AND SUM(score) < ${max}`),
    selectMaxScore:() => (`SELECT teamId, SUM(score) AS score FROM arena GROUP BY teamId ORDER BY SUM(score) DESC LIMIT 1`),
    setFavorite:(teamId,isFavorite) => (`UPDATE teams SET isFavorite=${!isFavorite} WHERE id = ${teamId}`),
    selectMatchesInfo:(matchIds) => (`SELECT A.matchId AS matchId,GROUP_CONCAT(T.title) AS teams FROM arena AS A INNER JOIN teams AS T ON A.teamId = T.id WHERE A.matchId IN (${matchIds}) GROUP BY A.matchId
`),
    selectAllMatches:(teamId) => (`SELECT GROUP_CONCAT(matchId) AS matchId FROM arena WHERE teamId =${teamId}`),
    //SELECT `matchId` FROM `arena` WHERE `teamId` = 4

    // insert:(table,name,value)=>{return `INSERT INTO ${table}(${name}) VALUES ('${value}')`},
    // insertUserProducts:(userId,productId)=>{return `INSERT INTO userProducts(userId,productId) VALUES (${userId},${productId})`},
    // registrationUser:(login,password)=>{return `INSERT INTO users(login, password) VALUES ('${login}', '${password}')`},
    // checkLogin:(login) => {return `SELECT COUNT(*) AS C FROM users WHERE login = '${login}'`},
    // onDelete:(ID)=>{return `DELETE userProducts, product FROM userProducts, product WHERE userProducts.productID = product.ID AND product.ID = ${ID}`},
    query: (sql,callback)=>{
        db.query(sql, (error, result, fields) =>  {
            if (result){
                callback(result);
                console.log(`результат подключения к бд ok: `,result);
            }
            if (error){
                console.log(`результат подключения к бд err: ${error}`);
            }
        })
    }
};

