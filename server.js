/**
 * Created by mike on 12.03.18.
 */
const sql = require("./source/js/back/sql.js"),
      express = require("express"),
      app = express(),
      server = require("http").Server(app),
      io = require("socket.io")(server),
      port = 3003;

server.listen(port);
console.log("Создание сервера");
io.on("connection",socket => {
    console.log("Отправка данных на фронт");
    socket.on('getMatchesList',() => {
        sql.query(sql.selectMatches(),(matches)=> {
            socket.emit("matchesList",matches);
        });
    });

//     socket.on('addNewProduct',data => {
//         console.log('Новый продукт:',data);
//         sql.query(sql.insert('product','title',data.product),(res)=>{
//             const {insertId} = res,
//                   {userId} = data;
//             sql.query(sql.insertUserProducts(userId,insertId),(res)=>{
//                 console.log('вставил в таблицу usersProoduct',res);
//                 io.sockets.emit("addNewProduct",{status:"ok",productID:insertId});
//             });
//
//         });
//     });
//
//     socket.on('handleDelete', ID => {
//         sql.query(sql.onDelete(ID),()=>io.sockets.emit("deleteProduct",{ID:ID}))
//     });
//
// //    Получаю данные о пользователе
//     socket.on('getAuth', user => {
//         sql.query(sql.getAuthUsers(user.login,user.password),(sql)=>{console.log(sql); socket.emit("userIsAuth",sql)});
//     });
//
// //    Регистрация пользователя
//
//     // getReg
//     socket.on('onReg', user => {
//         sql.query(sql.checkLogin(user.login),(res)=>{
//         //    Проверяем есть ли уже такой пользователь
//             if (res[0].C !== 0)
//                 socket.emit("userIsReg",{reg:false});
//             if (res[0].C === 0)
//                 sql.query(sql.registrationUser(user.login,user.password),(res)=>socket.emit("userIsReg",{regID:res.insertId}));
//         });
//     })

});