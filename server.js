const express = require("express");
const url = require("url");
const multer  = require('multer');
const fs = require('fs');
var bodyParser = require('body-parser');
const upload = multer({ dest: 'postImg/',limits:{fieldSize: 25 * 1024 * 1024}});
const urlencode = require("urlencode");
const server = express();
const mysql = require('mysql');  // mysql 모듈 로드

//DB연동
var db = mysql.createConnection({
  host : '127.0.0.1',
  user : 'root',
  password : '00000000',
  database : 'post',
  "timezone":"Asia/Seoul",
  "dateStrings":"date",
  multipleStatements: true
});
let sql;
let sql2;
let sql3;



db.connect();




server.use(bodyParser.urlencoded({limit: '5mb', extended: false, parameterLimit: 10000}));
server.use(express.urlencoded({extended: true}));
server.use(express.static(__dirname));
server.set('view engine', 'ejs');


server.listen(3000, (err) => {
  if (err) return console.log(err);
  console.log("The server is listening on port 3000");
});


















//메인 페이지
//메인 페이지
//메인 페이지
//메인 페이지


server.get("/", (req, res) => {
  sql = `SELECT * FROM cnftNews ORDER BY postNum DESC LIMIT 3;`
  sql2 = `SELECT * FROM postInfo ORDER BY hit DESC LIMIT 3; `;
  db.query(sql+sql2, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/main", {
      list1 : data[0],
      list2 : data[1]
    });
  });
});

server.post("/", (req, res) => {
  const id = req.body['postID'];
  const notice = req.body['noticeID'];

  if(notice == 'news') {
    sql = `UPDATE cnftNews SET hit = hit + 1 WHERE postNum = ${id}`;
    db.query(sql, (error, data, fields) => {
      if(error) throw error;
    });
    res.redirect(`/cnftNewsInfo?postID=${id}`);
  }
  else if (notice == 'notice') {
    sql = `UPDATE postInfo SET hit = hit + 1 WHERE postNum = ${id}`;
    db.query(sql, (error, data, fields) => {
      if(error) throw error;
    });
    res.redirect(`/cnftPostInfo?postID=${id}`);
  }
  
});









server.get("/main", (req, res) => {
  sql = `SELECT * FROM cnftNews ORDER BY postNum DESC LIMIT 3;`
  sql2 = `SELECT * FROM postInfo ORDER BY hit DESC LIMIT 3; `;
  db.query(sql+sql2, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/main_Login", {
      list1 : data[0],
      list2 : data[1]
    });
  });
});



server.post("/main", (req, res) => {
  const id = req.body['postID'];
  const notice = req.body['noticeID'];

  if(notice == 'news') {
    sql = `UPDATE cnftNews SET hit = hit + 1 WHERE postNum = ${id}`;
    db.query(sql, (error, data, fields) => {
      if(error) throw error;
    });
    res.redirect(`/cnftNewsInfo_Login?postID=${id}`);
  }
  else if (notice == 'notice') {
    sql = `UPDATE postInfo SET hit = hit + 1 WHERE postNum = ${id}`;
    db.query(sql, (error, data, fields) => {
      if(error) throw error;
    });
    res.redirect(`/cnftPostInfo_Login?postID=${id}`);
  }
  
});














//네이버 로그인 콜백
//네이버 로그인 콜백
//네이버 로그인 콜백
//네이버 로그인 콜백

server.get("/naverLoginCheck", (req, res) => {
    res.sendFile(__dirname + '/html/naverLoginCallback.html')
});






















//투자정보(1)투자정보(1)
//투자정보(1)투자정보(1)
//투자정보(1)투자정보(1)
//투자정보(1)투자정보(1)

server.get("/investmentPost", (req, res) => {
  var urlPath = url.parse(req.url);
  
  if(urlPath.path == '/investmentPost') {
    sql = `SELECT * FROM investment;`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 1;`;
    db.query(sql+sql2, (error, data, fields) =>{
      if(error) throw error;
      res.render(__dirname + "/ejs/postList", {
        title : '투자 정보',
        postInfo : '/investmentInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
  else {
    var search = urlencode.decode(urlPath.query.replace(/postSearch=/, ""));
    sql = `SELECT * FROM investment WHERE title LIKE '%${search}%';`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 1;`;
    db.query(sql+sql2, (error, data, fields) => {
      if(error) throw error;
      res.render(__dirname + "/ejs/postList", {
        title : '투자 정보',
        postInfo : '/investmentInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
});


server.post('/investmentPost', (req, res) => {
  const id = req.body['postID'];

  sql = `UPDATE investment SET hit = hit + 1 WHERE postNum = ${id}`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
  });
  res.redirect(`/investmentInfo?postID=${id}`);
});


server.post('/investmentPost_Login', (req, res) => {
  const id = req.body['postID'];

  sql = `UPDATE investment SET hit = hit + 1 WHERE postNum = ${id}`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
  });
  res.redirect(`/investmentInfo_Login?postID=${id}`);
});





server.get("/investmentPosting", (req, res) => {
    res.sendFile(__dirname + '/html/postingPage.html');
});

server.post("/investmentPosting", upload.array("files"), (req, res) => {
  const title = req.body['postTitle'];
  const content = req.body['postContent'];
  const nickname = req.body['nickname'];
  const icon = req.body['icon'];
  const email = req.body['email'];
  const image = req.files;
  var btn = req.body['posting'];


  if(btn == '포스팅' && image == '') {
    sql = `INSERT INTO investment (author, authorIcon, email, title, content, img, DATE, hit) VALUES('${nickname}', '${icon}', '${email}', '${title}', '${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', '', now(), 1)`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/investmentPost_Login");
  }
  else {
    sql = `INSERT INTO investment (author, authorIcon, email, title, content, img, DATE, hit) VALUES('${nickname}', '${icon}', '${email}', '${title}', '${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', '${image[0].filename}', now(), 1)`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/investmentPost_Login");
  }
});











server.get("/investmentPost_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  
  if(urlPath.path == '/investmentPost_Login') {
    sql = `SELECT * FROM investment;`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 1;`;
    db.query(sql+sql2, (error, data, fields) =>{
      if(error) throw error;
      res.render(__dirname + "/ejs/postList_Login", {
        title : '투자 정보',
        posting : '/investmentPosting',
        postInfo : '/investmentInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
  else {
    var search = urlencode.decode(urlPath.query.replace(/postSearch=/, ""));

    sql = `SELECT * FROM investment WHERE title LIKE '%${search}%';`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 1;`;
    db.query(sql+sql2, (error, data, fields) => {
      if(error) throw error;
      res.render(__dirname + "/ejs/postList_Login", {
        title : '투자 정보',
        posting : '/investmentPosting',
        postInfo : '/investmentInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
});











server.get("/investmentInfo", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));

  sql = `SELECT * FROM investment WHERE postNum LIKE '%${search}%';`;
  sql2 = `SELECT * FROM comments WHERE postNum LIKE '%${search}%' AND noticeID LIKE 1;`;
  db.query(sql + sql2, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postInfo", {
      title : '투자 정보',
      list1 : data[0],
      list2 : data[1]
    });
  });
});







server.get("/investmentInfo_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));

  sql = `SELECT * FROM investment WHERE postNum LIKE '%${search}%';`;
  sql2 = `SELECT * FROM comments WHERE postNum LIKE '%${search}%' AND noticeID LIKE 1;`;
  db.query(sql + sql2, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postInfo_Login", {
      title : '투자 정보',
      list1 : data[0],
      list2 : data[1]
    });
  });
});

server.post("/investmentInfo_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));
  var nickname = req.body['nickname'];
  var email = req.body['cEmail'];
  var icon = req.body['icon'];
  var content = req.body['comContent'];
  var author = req.body['comAuthor'];
  var comNum = req.body['comNum'];
  var id = req.body['postID'];


  var btnName = req.body['delete'];
  if (btnName == '삭제') {
    sql = `SELECT * FROM investment WHERE postNum = ${search};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
      if(data[0].img != '') {
        try {
            fs.unlinkSync(`postImg/${data[0].img}`);
        } catch (error) {
            if(err.code == 'ENOENT'){
                console.log("파일 삭제 Error 발생");
            }
        }
      }
    });
    sql = `DELETE FROM investment WHERE postNum = ${search};`;
    sql2 = `DELETE FROM comments WHERE noticeID LIKE 1 AND postNum =${search};`
    db.query(sql + sql2, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/investmentPost_Login");
  }

  btnName = req.body['update'];
  if(btnName == '수정') {
    res.redirect(`/investmentUpdate?postID=${id}`);
  }

  btnName = req.body['comPostBtn'];
  if(btnName == '입력') {
    sql = `INSERT INTO comments (noticeID, postNum, user, userIcon, email, content, liked, DATE, author) VALUES(1, '${search}', '${nickname}', '${icon}', '${email}', '${content}', 0, now(), '${author}');`
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
    });
    res.redirect(`/investmentInfo_Login?postID=${search}`);
  }

  btnName = req.body['comDelete'];
  if(btnName == '삭제') {
    sql = `DELETE FROM comments WHERE comNum = ${comNum};`;
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
    });
    res.redirect(`/investmentInfo_Login?postID=${search}`);
  }
});









server.get("/investmentUpdate", (req, res) => {
  var urlPath = url.parse(req.url, true).query;

  sql = `SELECT * FROM investment WHERE postNum LIKE '%${urlPath.postID}%'`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postUpdate", {
      list : data,
      email : urlPath.email
    });
  });
});


server.post("/investmentUpdate", upload.array("files"), (req, res) => {
  var urlPath = url.parse(req.url, true).query;
  const title = req.body['postTitle'];
  const content = req.body['postContent'];
  const nickname = req.body['nickname'];
  const icon = req.body['icon'];
  const email = req.body['email'];
  const image = req.files;
  var btn = req.body['posting'];


  if(btn == '포스팅' && image != '') {
    sql = `UPDATE post.investment SET title='${title}', content='${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', img='${image[0].filename}' WHERE postNum=${urlPath.postID};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/investmentPost_Login");
  }
  else{
    sql = `UPDATE post.investment SET title='${title}', content='${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}' WHERE postNum=${urlPath.postID};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/investmentPost_Login");
  }
});





//투자현황(2)투자현황(2)
//투자현황(2)투자현황(2)
//투자현황(2)투자현황(2)
//투자현황(2)투자현황(2)

server.get("/currentSituationPost", (req, res) => {
  var urlPath = url.parse(req.url);
  
  if(urlPath.path == '/currentSituationPost') {
    sql = `SELECT * FROM currentSituation;`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 2;`;
    db.query(sql+sql2, (error, data, fields) =>{
      if(error) throw error;
      res.render(__dirname + "/ejs/postList", {
        title : '투자 현황',
        postInfo : '/currentSituationInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
  else {
    var search = urlencode.decode(urlPath.query.replace(/postSearch=/, ""));
    sql = `SELECT * FROM currentSituation WHERE title LIKE '%${search}%';`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 2;`;
    db.query(sql+sql2, (error, data, fields) => {
      if(error) throw error;
      res.render(__dirname + "/ejs/postList", {
        title : '투자 현황',
        postInfo : '/currentSituationInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
});






server.get("/currentSituationPosting", (req, res) => {
    res.sendFile(__dirname + '/html/postingPage.html');
});

server.post("/currentSituationPosting", upload.array("files"), (req, res) => {
  const title = req.body['postTitle'];
  const content = req.body['postContent'];
  const nickname = req.body['nickname'];
  const icon = req.body['icon'];
  const email = req.body['email'];
  const image = req.files;
  var btn = req.body['posting'];


  if(btn == '포스팅' && image == '') {
    sql = `INSERT INTO currentSituation (author, authorIcon, email, title, content, img, DATE, hit) VALUES('${nickname}', '${icon}', '${email}', '${title}', '${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', '', now(), 1)`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/currentSituationPost_Login");
  }
  else {
    sql = `INSERT INTO currentSituation (author, authorIcon, email, title, content, img, DATE, hit) VALUES('${nickname}', '${icon}', '${email}', '${title}', '${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', '${image[0].filename}', now(), 1)`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/currentSituationPost_Login");
  }
});











server.get("/currentSituationPost_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  
  if(urlPath.path == '/currentSituationPost_Login') {
    sql = `SELECT * FROM currentSituation;`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 2;`;
    db.query(sql+sql2, (error, data, fields) =>{
      if(error) throw error;
      res.render(__dirname + "/ejs/postList_Login", {
        title : '투자 현황',
        posting : '/currentSituationPosting',
        postInfo : '/currentSituationInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
  else {
    var search = urlencode.decode(urlPath.query.replace(/postSearch=/, ""));

    sql = `SELECT * FROM currentSituation WHERE title LIKE '%${search}%';`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 2;`;
    db.query(sql+sql2, (error, data, fields) => {
      if(error) throw error;
      res.render(__dirname + "/ejs/postList_Login", {
        title : '투자 현황',
        posting : '/currentSituationPosting',
        postInfo : '/currentSituationInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
});




server.post('/currentSituationPost', (req, res) => {
  const id = req.body['postID'];

  sql = `UPDATE currentSituation SET hit = hit + 1 WHERE postNum = ${id}`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
  });
  res.redirect(`/currentSituationInfo?postID=${id}`);
});


server.post('/currentSituationPost_Login', (req, res) => {
  const id = req.body['postID'];

  sql = `UPDATE currentSituation SET hit = hit + 1 WHERE postNum = ${id}`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
  });
  res.redirect(`/currentSituationInfo_Login?postID=${id}`);
});








server.get("/currentSituationInfo", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));

  sql = `SELECT * FROM currentSituation WHERE postNum LIKE '%${search}%';`;
  sql2 = `SELECT * FROM comments WHERE postNum LIKE '%${search}%' AND noticeID LIKE 2;`;
  db.query(sql + sql2, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postInfo", {
      title : '투자 현황',
      list1 : data[0],
      list2 : data[1]
    });
  });
});







server.get("/currentSituationInfo_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));

  sql = `SELECT * FROM currentSituation WHERE postNum LIKE '%${search}%';`;
  sql2 = `SELECT * FROM comments WHERE postNum LIKE '%${search}%' AND noticeID LIKE 2;`;
  db.query(sql + sql2, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postInfo_Login", {
      title : '투자 현황',
      list1 : data[0],
      list2 : data[1]
    });
  });
});

server.post("/currentSituationInfo_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));
  var nickname = req.body['nickname'];
  var email = req.body['cEmail'];
  var icon = req.body['icon'];
  var content = req.body['comContent'];
  var author = req.body['comAuthor'];
  var comNum = req.body['comNum'];
  var id = req.body['postID'];


  var btnName = req.body['delete'];
  if (btnName == '삭제') {
    sql = `SELECT * FROM currentSituation WHERE postNum = ${search};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
      if(data[0].img != '') {
        try {
            fs.unlinkSync(`postImg/${data[0].img}`);
        } catch (error) {
            if(err.code == 'ENOENT'){
                console.log("파일 삭제 Error 발생");
            }
        }
      }
    });
    sql = `DELETE FROM currentSituation WHERE postNum = ${search};`;
    sql2 = `DELETE FROM comments WHERE noticeID LIKE 2 AND postNum =${search};`
    db.query(sql + sql2, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/currentSituationPost_Login");
  }

  btnName = req.body['update'];
  if(btnName == '수정') {
    res.redirect(`/currentSituationUpdate?postID=${id}`);
  }

  btnName = req.body['comPostBtn'];
  if(btnName == '입력') {
    sql = `INSERT INTO comments (noticeID, postNum, user, userIcon, email, content, liked, DATE, author) VALUES(2, '${search}', '${nickname}', '${icon}', '${email}', '${content}', 0, now(), '${author}');`
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
    });
    res.redirect(`/currentSituationInfo_Login?postID=${search}`);
  }

  btnName = req.body['comDelete'];
  if(btnName == '삭제') {
    sql = `DELETE FROM comments WHERE comNum = ${comNum};`;
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
    });
    res.redirect(`/currentSituationInfo_Login?postID=${search}`);
  }
});









server.get("/currentSituationUpdate", (req, res) => {
  var urlPath = url.parse(req.url, true).query;

  sql = `SELECT * FROM currentSituation WHERE postNum LIKE '%${urlPath.postID}%'`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postUpdate", {
      list : data,
      email : urlPath.email
    });
  });
});


server.post("/currentSituationUpdate", upload.array("files"), (req, res) => {
  var urlPath = url.parse(req.url, true).query;
  const title = req.body['postTitle'];
  const content = req.body['postContent'];
  const nickname = req.body['nickname'];
  const icon = req.body['icon'];
  const email = req.body['email'];
  const image = req.files;
  var btn = req.body['posting'];


  if(btn == '포스팅' && image != '') {
    sql = `UPDATE post.currentSituation SET title='${title}', content='${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', img='${image[0].filename}' WHERE postNum=${urlPath.postID};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/currentSituationPost_Login");
  }
  else{
    sql = `UPDATE post.currentSituation SET title='${title}', content='${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}' WHERE postNum=${urlPath.postID};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/currentSituationPost_Login");
  }
});

//채용정보(3)채용정보(3)
//채용정보(3)채용정보(3)
//채용정보(3)채용정보(3)
//채용정보(3)채용정보(3)

server.get("/recruitmentPost", (req, res) => {
  var urlPath = url.parse(req.url);
  
  if(urlPath.path == '/recruitmentPost') {
    sql = `SELECT * FROM recruitment;`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 3;`;
    db.query(sql+sql2, (error, data, fields) =>{
      if(error) throw error;
      res.render(__dirname + "/ejs/postList", {
        title : '채용 정보',
        postInfo : '/recruitmentInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
  else {
    var search = urlencode.decode(urlPath.query.replace(/postSearch=/, ""));
    sql = `SELECT * FROM recruitment WHERE title LIKE '%${search}%';`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 3;`;
    db.query(sql+sql2, (error, data, fields) => {
      if(error) throw error;
      res.render(__dirname + "/ejs/postList", {
        title : '채용 정보',
        postInfo : '/recruitmentInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
});






server.get("/recruitmentPosting", (req, res) => {
    res.sendFile(__dirname + '/html/postingPage.html');
});

server.post("/recruitmentPosting", upload.array("files"), (req, res) => {
  const title = req.body['postTitle'];
  const content = req.body['postContent'];
  const nickname = req.body['nickname'];
  const icon = req.body['icon'];
  const email = req.body['email'];
  const image = req.files;
  var btn = req.body['posting'];


  if(btn == '포스팅' && image == '') {
    sql = `INSERT INTO recruitment (author, authorIcon, email, title, content, img, DATE, hit) VALUES('${nickname}', '${icon}', '${email}', '${title}', '${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', '', now(), 1)`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/recruitmentPost_Login");
  }
  else {
    sql = `INSERT INTO recruitment (author, authorIcon, email, title, content, img, DATE, hit) VALUES('${nickname}', '${icon}', '${email}', '${title}', '${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', '${image[0].filename}', now(), 1)`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/recruitmentPost_Login");
  }
});











server.get("/recruitmentPost_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  
  if(urlPath.path == '/recruitmentPost_Login') {
    sql = `SELECT * FROM recruitment;`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 3;`;
    db.query(sql+sql2, (error, data, fields) =>{
      if(error) throw error;
      res.render(__dirname + "/ejs/postList_Login", {
        title : '채용 정보',
        posting : '/recruitmentPosting',
        postInfo : '/recruitmentInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
  else {
    var search = urlencode.decode(urlPath.query.replace(/postSearch=/, ""));

    sql = `SELECT * FROM recruitment WHERE title LIKE '%${search}%';`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 3;`;
    db.query(sql+sql2, (error, data, fields) => {
      if(error) throw error;
      res.render(__dirname + "/ejs/postList_Login", {
        title : '채용 정보',
        posting : '/recruitmentPosting',
        postInfo : '/recruitmentInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
});






server.post('/recruitmentPost', (req, res) => {
  const id = req.body['postID'];

  sql = `UPDATE recruitment SET hit = hit + 1 WHERE postNum = ${id}`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
  });
  res.redirect(`/recruitmentInfo?postID=${id}`);
});


server.post('/recruitmentPost_Login', (req, res) => {
  const id = req.body['postID'];

  sql = `UPDATE recruitment SET hit = hit + 1 WHERE postNum = ${id}`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
  });
  res.redirect(`/recruitmentInfo_Login?postID=${id}`);
});






server.get("/recruitmentInfo", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));

  sql = `SELECT * FROM recruitment WHERE postNum LIKE '%${search}%';`;
  sql2 = `SELECT * FROM comments WHERE postNum LIKE '%${search}%' AND noticeID LIKE 3;`;
  db.query(sql + sql2, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postInfo", {
      title : '채용 정보',
      list1 : data[0],
      list2 : data[1]
    });
  });
});







server.get("/recruitmentInfo_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));

  sql = `SELECT * FROM recruitment WHERE postNum LIKE '%${search}%';`;
  sql2 = `SELECT * FROM comments WHERE postNum LIKE '%${search}%' AND noticeID LIKE 3;`;
  db.query(sql + sql2, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postInfo_Login", {
      title : '채용 정보',
      list1 : data[0],
      list2 : data[1]
    });
  });
});

server.post("/recruitmentInfo_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));
  var nickname = req.body['nickname'];
  var email = req.body['cEmail'];
  var icon = req.body['icon'];
  var content = req.body['comContent'];
  var author = req.body['comAuthor'];
  var comNum = req.body['comNum'];
  var id = req.body['postID'];


  var btnName = req.body['delete'];
  if (btnName == '삭제') {
    sql = `SELECT * FROM recruitment WHERE postNum = ${search};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
      if(data[0].img != '') {
        try {
            fs.unlinkSync(`postImg/${data[0].img}`);
        } catch (error) {
            if(err.code == 'ENOENT'){
                console.log("파일 삭제 Error 발생");
            }
        }
      }
    });
    sql = `DELETE FROM recruitment WHERE postNum = ${search};`;
    sql2 = `DELETE FROM comments WHERE noticeID LIKE 3 AND postNum =${search};`
    db.query(sql + sql2, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/recruitmentPost_Login");
  }

  btnName = req.body['update'];
  if(btnName == '수정') {
    res.redirect(`/recruitmentUpdate?postID=${id}`);
  }

  btnName = req.body['comPostBtn'];
  if(btnName == '입력') {
    sql = `INSERT INTO comments (noticeID, postNum, user, userIcon, email, content, liked, DATE, author) VALUES(3, '${search}', '${nickname}', '${icon}', '${email}', '${content}', 0, now(), '${author}');`
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
    });
    res.redirect(`/recruitmentInfo_Login?postID=${search}`);
  }

  btnName = req.body['comDelete'];
  if(btnName == '삭제') {
    sql = `DELETE FROM comments WHERE comNum = ${comNum};`;
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
    });
    res.redirect(`/recruitmentInfo_Login?postID=${search}`);
  }
});









server.get("/recruitmentUpdate", (req, res) => {
  var urlPath = url.parse(req.url, true).query;

  sql = `SELECT * FROM recruitment WHERE postNum LIKE '%${urlPath.postID}%'`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postUpdate", {
      list : data,
      email : urlPath.email
    });
  });
});


server.post("/recruitmentUpdate", upload.array("files"), (req, res) => {
  var urlPath = url.parse(req.url, true).query;
  const title = req.body['postTitle'];
  const content = req.body['postContent'];
  const nickname = req.body['nickname'];
  const icon = req.body['icon'];
  const email = req.body['email'];
  const image = req.files;
  var btn = req.body['posting'];


  if(btn == '포스팅' && image != '') {
    sql = `UPDATE post.recruitment SET title='${title}', content='${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', img='${image[0].filename}' WHERE postNum=${urlPath.postID};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/recruitmentPost_Login");
  }
  else{
    sql = `UPDATE post.recruitment SET title='${title}', content='${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}' WHERE postNum=${urlPath.postID};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/recruitmentPost_Login");
  }
});






//CNFT 뉴스(4)CNFT 뉴스(4)
//CNFT 뉴스(4)CNFT 뉴스(4)
//CNFT 뉴스(4)CNFT 뉴스(4)
//CNFT 뉴스(4)CNFT 뉴스(4)

server.get("/cnftNewsPost", (req, res) => {
  var urlPath = url.parse(req.url);
  
  if(urlPath.path == '/cnftNewsPost') {
    sql = `SELECT * FROM cnftNews;`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 4;`;
    db.query(sql+sql2, (error, data, fields) =>{
      if(error) throw error;
      res.render(__dirname + "/ejs/postList", {
        title : 'CNFT 뉴스',
        postInfo : '/cnftNewsInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
  else {
    var search = urlencode.decode(urlPath.query.replace(/postSearch=/, ""));
    sql = `SELECT * FROM cnftNews WHERE title LIKE '%${search}%';`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 4;`;
    db.query(sql+sql2, (error, data, fields) => {
      if(error) throw error;
      res.render(__dirname + "/ejs/postList", {
        title : 'CNFT 뉴스',
        postInfo : '/cnftNewsInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
});






server.get("/cnftNewsPosting", (req, res) => {
    res.sendFile(__dirname + '/html/postingPage.html');
});

server.post("/cnftNewsPosting", upload.array("files"), (req, res) => {
  const title = req.body['postTitle'];
  const content = req.body['postContent'];
  const nickname = req.body['nickname'];
  const icon = req.body['icon'];
  const email = req.body['email'];
  const image = req.files;
  var btn = req.body['posting'];


  if(btn == '포스팅' && image == '') {
    sql = `INSERT INTO cnftNews (author, authorIcon, email, title, content, img, DATE, hit) VALUES('${nickname}', '${icon}', '${email}', '${title}', '${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', '', now(), 1)`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/cnftNewsPost_Login");
  }
  else {
    sql = `INSERT INTO cnftNews (author, authorIcon, email, title, content, img, DATE, hit) VALUES('${nickname}', '${icon}', '${email}', '${title}', '${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', '${image[0].filename}', now(), 1)`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/cnftNewsPost_Login");
  }
});











server.get("/cnftNewsPost_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  
  if(urlPath.path == '/cnftNewsPost_Login') {
    sql = `SELECT * FROM cnftNews;`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 4;`;
    db.query(sql+sql2, (error, data, fields) =>{
      if(error) throw error;
      res.render(__dirname + "/ejs/postList_Login", {
        title : 'CNFT 뉴스',
        posting : '/cnftNewsPosting',
        postInfo : '/cnftNewsInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
  else {
    var search = urlencode.decode(urlPath.query.replace(/postSearch=/, ""));

    sql = `SELECT * FROM cnftNews WHERE title LIKE '%${search}%';`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 4;`;
    db.query(sql+sql2, (error, data, fields) => {
      if(error) throw error;
      res.render(__dirname + "/ejs/postList_Login", {
        title : 'CNFT 뉴스',
        posting : '/cnftNewsPosting',
        postInfo : '/cnftNewsInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
});




server.post('/cnftNewsPost', (req, res) => {
  const id = req.body['postID'];

  sql = `UPDATE cnftNews SET hit = hit + 1 WHERE postNum = ${id}`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
  });
  res.redirect(`/cnftNewsInfo?postID=${id}`);
});


server.post('/cnftNewsPost_Login', (req, res) => {
  const id = req.body['postID'];

  sql = `UPDATE cnftNews SET hit = hit + 1 WHERE postNum = ${id}`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
  });
  res.redirect(`/cnftNewsInfo_Login?postID=${id}`);
});









server.get("/cnftNewsInfo", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));

  sql = `SELECT * FROM cnftNews WHERE postNum LIKE '%${search}%';`;
  sql2 = `SELECT * FROM comments WHERE postNum LIKE '%${search}%' AND noticeID LIKE 4;`;
  db.query(sql + sql2, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postInfo", {
      title : 'CNFT 뉴스',
      list1 : data[0],
      list2 : data[1]
    });
  });
});







server.get("/cnftNewsInfo_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));

  sql = `SELECT * FROM cnftNews WHERE postNum LIKE '%${search}%';`;
  sql2 = `SELECT * FROM comments WHERE postNum LIKE '%${search}%' AND noticeID LIKE 4;`;
  db.query(sql + sql2, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postInfo_Login", {
      title : 'CNFT 뉴스',
      list1 : data[0],
      list2 : data[1]
    });
  });
});

server.post("/cnftNewsInfo_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));
  var nickname = req.body['nickname'];
  var email = req.body['cEmail'];
  var icon = req.body['icon'];
  var content = req.body['comContent'];
  var author = req.body['comAuthor'];
  var comNum = req.body['comNum'];
  var id = req.body['postID'];


  var btnName = req.body['delete'];
  if (btnName == '삭제') {
    sql = `SELECT * FROM cnftNews WHERE postNum = ${search};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
      if(data[0].img != '') {
        try {
            fs.unlinkSync(`postImg/${data[0].img}`);
        } catch (error) {
            if(err.code == 'ENOENT'){
                console.log("파일 삭제 Error 발생");
            }
        }
      }
    });
    sql = `DELETE FROM cnftNews WHERE postNum = ${search};`;
    sql2 = `DELETE FROM comments WHERE noticeID LIKE 4 AND postNum =${search};`
    db.query(sql + sql2, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/cnftNewsPost_Login");
  }

  btnName = req.body['update'];
  if(btnName == '수정') {
    res.redirect(`/cnftNewsUpdate?postID=${id}`);
  }

  btnName = req.body['comPostBtn'];
  if(btnName == '입력') {
    sql = `INSERT INTO comments (noticeID, postNum, user, userIcon, email, content, liked, DATE, author) VALUES(4, '${search}', '${nickname}', '${icon}', '${email}', '${content}', 0, now(), '${author}');`
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
    });
    res.redirect(`/cnftNewsInfo_Login?postID=${search}`);
  }

  btnName = req.body['comDelete'];
  if(btnName == '삭제') {
    sql = `DELETE FROM comments WHERE comNum = ${comNum};`;
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
    });
    res.redirect(`/cnftNewsInfo_Login?postID=${search}`);
  }
});









server.get("/cnftNewsUpdate", (req, res) => {
  var urlPath = url.parse(req.url, true).query;

  sql = `SELECT * FROM cnftNews WHERE postNum LIKE '%${urlPath.postID}%'`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postUpdate", {
      list : data,
      email : urlPath.email
    });
  });
});


server.post("/cnftNewsUpdate", upload.array("files"), (req, res) => {
  var urlPath = url.parse(req.url, true).query;
  const title = req.body['postTitle'];
  const content = req.body['postContent'];
  const nickname = req.body['nickname'];
  const icon = req.body['icon'];
  const email = req.body['email'];
  const image = req.files;
  var btn = req.body['posting'];


  if(btn == '포스팅' && image != '') {
    sql = `UPDATE post.cnftNews SET title='${title}', content='${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', img='${image[0].filename}' WHERE postNum=${urlPath.postID};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/cnftNewsPost_Login");
  }
  else{
    sql = `UPDATE post.cnftNews SET title='${title}', content='${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}' WHERE postNum=${urlPath.postID};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/cnftNewsPost_Login");
  }
});







//ada 뉴스(6)ada 뉴스(6)ada 뉴스(6)
//ada 뉴스(6)ada 뉴스(6)ada 뉴스(6)
//ada 뉴스(6)ada 뉴스(6)ada 뉴스(6)
//ada 뉴스(6)ada 뉴스(6)ada 뉴스(6)

server.get("/adaNewsPost", (req, res) => {
  var urlPath = url.parse(req.url);
  
  if(urlPath.path == '/adaNewsPost') {
    sql = `SELECT * FROM adaNews;`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 6;`;
    db.query(sql+sql2, (error, data, fields) =>{
      if(error) throw error;
      res.render(__dirname + "/ejs/postList", {
        title : 'ADA 뉴스',
        postInfo : '/adaNewsInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
  else {
    var search = urlencode.decode(urlPath.query.replace(/postSearch=/, ""));
    sql = `SELECT * FROM adaNews WHERE title LIKE '%${search}%';`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 6;`;
    db.query(sql+sql2, (error, data, fields) => {
      if(error) throw error;
      res.render(__dirname + "/ejs/postList", {
        title : 'ADA 뉴스',
        postInfo : '/adaNewsInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
});






server.get("/newsPosting", (req, res) => {
    res.sendFile(__dirname + '/html/postingPage.html');
});

server.post("/newsPosting", upload.array("files"), (req, res) => {
  const title = req.body['postTitle'];
  const content = req.body['postContent'];
  const nickname = req.body['nickname'];
  const icon = req.body['icon'];
  const email = req.body['email'];
  const image = req.files;
  var btn = req.body['posting'];


  if(btn == '포스팅' && image == '') {
    sql = `INSERT INTO adaNews (author, authorIcon, email, title, content, img, DATE, hit) VALUES('${nickname}', '${icon}', '${email}', '${title}', '${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', '', now(), 1)`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/adaNewsPost_Login");
  }
  else {
    sql = `INSERT INTO adaNews (author, authorIcon, email, title, content, img, DATE, hit) VALUES('${nickname}', '${icon}', '${email}', '${title}', '${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', '${image[0].filename}', now(), 1)`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/adaNewsPost_Login");
  }
});











server.get("/adaNewsPost_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  
  if(urlPath.path == '/adaNewsPost_Login') {
    sql = `SELECT * FROM adaNews;`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 6;`;
    db.query(sql+sql2, (error, data, fields) =>{
      if(error) throw error;
      res.render(__dirname + "/ejs/postList_Login", {
        title : 'ADA 뉴스',
        posting : '/newsPosting',
        postInfo : '/adaNewsInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
  else {
    var search = urlencode.decode(urlPath.query.replace(/postSearch=/, ""));

    sql = `SELECT * FROM adaNews WHERE title LIKE '%${search}%';`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 6;`;
    db.query(sql+sql2, (error, data, fields) => {
      if(error) throw error;
      res.render(__dirname + "/ejs/postList_Login", {
        title : 'ADA 뉴스',
        posting : '/newsPosting',
        postInfo : '/adaNewsInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
});





server.post('/adaNewsPost', (req, res) => {
  const id = req.body['postID'];

  sql = `UPDATE adaNews SET hit = hit + 1 WHERE postNum = ${id}`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
  });
  res.redirect(`/adaNewsInfo?postID=${id}`);
});


server.post('/adaNewsPost_Login', (req, res) => {
  const id = req.body['postID'];

  sql = `UPDATE adaNews SET hit = hit + 1 WHERE postNum = ${id}`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
  });
  res.redirect(`/adaNewsInfo_Login?postID=${id}`);
});










server.get("/adaNewsInfo", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));

  sql = `SELECT * FROM adanews WHERE postNum LIKE '%${search}%';`;
  sql2 = `SELECT * FROM comments WHERE postNum LIKE '%${search}%' AND noticeID LIKE 6;`;
  db.query(sql + sql2, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postInfo", {
      title : 'ADA 뉴스',
      list1 : data[0],
      list2 : data[1]
    });
  });
});







server.get("/adaNewsInfo_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));

  sql = `SELECT * FROM adanews WHERE postNum LIKE '%${search}%';`;
  sql2 = `SELECT * FROM comments WHERE postNum LIKE '%${search}%' AND noticeID LIKE 6;`;
  db.query(sql + sql2, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postInfo_Login", {
      title : 'ADA 뉴스',
      list1 : data[0],
      list2 : data[1]
    });
  });
});

server.post("/adaNewsInfo_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));
  var nickname = req.body['nickname'];
  var email = req.body['cEmail'];
  var icon = req.body['icon'];
  var content = req.body['comContent'];
  var author = req.body['comAuthor'];
  var comNum = req.body['comNum'];
  var id = req.body['postID'];


  var btnName = req.body['delete'];
  if (btnName == '삭제') {
    sql = `SELECT * FROM adanews WHERE postNum = ${search};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
      if(data[0].img != '') {
        try {
            fs.unlinkSync(`postImg/${data[0].img}`);
        } catch (error) {
            if(err.code == 'ENOENT'){
                console.log("파일 삭제 Error 발생");
            }
        }
      }
    });
    sql = `DELETE FROM adanews WHERE postNum = ${search};`;
    sql2 = `DELETE FROM comments WHERE noticeID LIKE 6 AND postNum =${search};`
    db.query(sql + sql2, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/adaNewsPost_Login");
  }

  btnName = req.body['update'];
  if(btnName == '수정') {
    res.redirect(`/adaNewsUpdate?postID=${id}`);
  }

  btnName = req.body['comPostBtn'];
  if(btnName == '입력') {
    sql = `INSERT INTO comments (noticeID, postNum, user, userIcon, email, content, liked, DATE, author) VALUES(6, '${search}', '${nickname}', '${icon}', '${email}', '${content}', 0, now(), '${author}');`
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
    });
    res.redirect(`/ADANewsInfo_Login?postID=${search}`);
  }

  btnName = req.body['comDelete'];
  if(btnName == '삭제') {
    sql = `DELETE FROM comments WHERE comNum = ${comNum};`;
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
    });
    res.redirect(`/ADANewsInfo_Login?postID=${search}`);
  }
});









server.get("/adaNewsUpdate", (req, res) => {
  var urlPath = url.parse(req.url, true).query;

  sql = `SELECT * FROM adaNews WHERE postNum LIKE '%${urlPath.postID}%'`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postUpdate", {
      list : data,
      email : urlPath.email
    });
  });
});


server.post("/adaNewsUpdate", upload.array("files"), (req, res) => {
  var urlPath = url.parse(req.url, true).query;
  const title = req.body['postTitle'];
  const content = req.body['postContent'];
  const nickname = req.body['nickname'];
  const icon = req.body['icon'];
  const email = req.body['email'];
  const image = req.files;
  var btn = req.body['posting'];


  if(btn == '포스팅' && image != '') {
    sql = `UPDATE post.adaNews SET title='${title}', content='${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', img='${image[0].filename}' WHERE postNum=${urlPath.postID};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/adaNewsPost_Login");
  }
  else{
    sql = `UPDATE post.adaNews SET title='${title}', content='${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}' WHERE postNum=${urlPath.postID};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/adaNewsPost_Login");
  }
});






//CNFT 민팅(7)CNFT 민팅(7)
//CNFT 민팅(7)CNFT 민팅(7)
//CNFT 민팅(7)CNFT 민팅(7)
//CNFT 민팅(7)CNFT 민팅(7)

server.get("/mintingPost", (req, res) => {
  var urlPath = url.parse(req.url);
  
  if(urlPath.path == '/mintingPost') {
    sql = `SELECT * FROM minting;`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 7;`;
    db.query(sql+sql2, (error, data, fields) =>{
      if(error) throw error;
      res.render(__dirname + "/ejs/postList", {
        title : 'CNFT 민팅',
        postInfo : '/mintingInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
  else {
    var search = urlencode.decode(urlPath.query.replace(/postSearch=/, ""));
    sql = `SELECT * FROM minting WHERE title LIKE '%${search}%';`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 7;`;
    db.query(sql+sql2, (error, data, fields) => {
      if(error) throw error;
      res.render(__dirname + "/ejs/postList", {
        title : 'CNFT 민팅',
        postInfo : '/mintingInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
});






server.get("/mintingPosting", (req, res) => {
    res.sendFile(__dirname + '/html/postingPage.html');
});

server.post("/mintingPosting", upload.array("files"), (req, res) => {
  const title = req.body['postTitle'];
  const content = req.body['postContent'];
  const nickname = req.body['nickname'];
  const icon = req.body['icon'];
  const email = req.body['email'];
  const image = req.files;
  var btn = req.body['posting'];


  if(btn == '포스팅' && image == '') {
    sql = `INSERT INTO minting (author, authorIcon, email, title, content, img, DATE, hit) VALUES('${nickname}', '${icon}', '${email}', '${title}', '${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', '', now(), 1)`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/mintingPost_Login");
  }
  else {
    sql = `INSERT INTO minting (author, authorIcon, email, title, content, img, DATE, hit) VALUES('${nickname}', '${icon}', '${email}', '${title}', '${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', '${image[0].filename}', now(), 1)`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/mintingPost_Login");
  }
});











server.get("/mintingPost_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  
  if(urlPath.path == '/mintingPost_Login') {
    sql = `SELECT * FROM minting;`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 7;`;
    db.query(sql+sql2, (error, data, fields) =>{
      if(error) throw error;
      res.render(__dirname + "/ejs/postList_Login", {
        title : 'CNFT 민팅',
        posting : '/mintingPosting',
        postInfo : '/mintingInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
  else {
    var search = urlencode.decode(urlPath.query.replace(/postSearch=/, ""));

    sql = `SELECT * FROM minting WHERE title LIKE '%${search}%';`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 7;`;
    db.query(sql+sql2, (error, data, fields) => {
      if(error) throw error;
      res.render(__dirname + "/ejs/postList_Login", {
        title : 'CNFT 민팅',
        posting : '/mintingPosting',
        postInfo : '/mintingInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
});





server.post('/mintingPost', (req, res) => {
  const id = req.body['postID'];

  sql = `UPDATE minting SET hit = hit + 1 WHERE postNum = ${id}`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
  });
  res.redirect(`/mintingInfo?postID=${id}`);
});


server.post('/mintingPost_Login', (req, res) => {
  const id = req.body['postID'];

  sql = `UPDATE minting SET hit = hit + 1 WHERE postNum = ${id}`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
  });
  res.redirect(`/mintingInfo_Login?postID=${id}`);
});









server.get("/mintingInfo", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));

  sql = `SELECT * FROM minting WHERE postNum LIKE '%${search}%';`;
  sql2 = `SELECT * FROM comments WHERE postNum LIKE '%${search}%' AND noticeID LIKE 7;`;
  db.query(sql + sql2, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postInfo", {
      title : 'CNFT 민팅',
      list1 : data[0],
      list2 : data[1]
    });
  });
});







server.get("/mintingInfo_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));

  sql = `SELECT * FROM minting WHERE postNum LIKE '%${search}%';`;
  sql2 = `SELECT * FROM comments WHERE postNum LIKE '%${search}%' AND noticeID LIKE 7;`;
  db.query(sql + sql2, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postInfo_Login", {
      title : 'CNFT 민팅',
      list1 : data[0],
      list2 : data[1]
    });
  });
});

server.post("/mintingInfo_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));
  var nickname = req.body['nickname'];
  var email = req.body['cEmail'];
  var icon = req.body['icon'];
  var content = req.body['comContent'];
  var author = req.body['comAuthor'];
  var comNum = req.body['comNum'];
  var id = req.body['postID'];


  var btnName = req.body['delete'];
  if (btnName == '삭제') {
    sql = `SELECT * FROM minting WHERE postNum = ${search};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
      if(data[0].img != '') {
        try {
            fs.unlinkSync(`postImg/${data[0].img}`);
        } catch (error) {
            if(err.code == 'ENOENT'){
                console.log("파일 삭제 Error 발생");
            }
        }
      }
    });
    sql = `DELETE FROM minting WHERE postNum = ${search};`;
    sql2 = `DELETE FROM comments WHERE noticeID LIKE 7 AND postNum =${search};`
    db.query(sql + sql2, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/mintingPost_Login");
  }

  btnName = req.body['update'];
  if(btnName == '수정') {
    res.redirect(`/mintingUpdate?postID=${id}`);
  }

  btnName = req.body['comPostBtn'];
  if(btnName == '입력') {
    sql = `INSERT INTO comments (noticeID, postNum, user, userIcon, email, content, liked, DATE, author) VALUES(7, '${search}', '${nickname}', '${icon}', '${email}', '${content}', 0, now(), '${author}');`
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
    });
    res.redirect(`/mintingInfo_Login?postID=${search}`);
  }

  btnName = req.body['comDelete'];
  if(btnName == '삭제') {
    sql = `DELETE FROM comments WHERE comNum = ${comNum};`;
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
    });
    res.redirect(`/mintingInfo_Login?postID=${search}`);
  }
});









server.get("/mintingUpdate", (req, res) => {
  var urlPath = url.parse(req.url, true).query;

  sql = `SELECT * FROM minting WHERE postNum LIKE '%${urlPath.postID}%'`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postUpdate", {
      list : data,
      email : urlPath.email
    });
  });
});


server.post("/mintingUpdate", upload.array("files"), (req, res) => {
  var urlPath = url.parse(req.url, true).query;
  const title = req.body['postTitle'];
  const content = req.body['postContent'];
  const nickname = req.body['nickname'];
  const icon = req.body['icon'];
  const email = req.body['email'];
  const image = req.files;
  var btn = req.body['posting'];


  if(btn == '포스팅' && image != '') {
    sql = `UPDATE post.minting SET title='${title}', content='${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', img='${image[0].filename}' WHERE postNum=${urlPath.postID};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/mintingPost_Login");
  }
  else{
    sql = `UPDATE post.minting SET title='${title}', content='${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}' WHERE postNum=${urlPath.postID};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/mintingPost_Login");
  }
});








//CNFT 거래소(8)CNFT 거래소(8)
//CNFT 거래소(8)CNFT 거래소(8)
//CNFT 거래소(8)CNFT 거래소(8)
//CNFT 거래소(8)CNFT 거래소(8)

server.get("/exchangePost", (req, res) => {
  var urlPath = url.parse(req.url);
  
  if(urlPath.path == '/exchangePost') {
    sql = `SELECT * FROM exchange;`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 8;`;
    db.query(sql+sql2, (error, data, fields) =>{
      if(error) throw error;
      res.render(__dirname + "/ejs/postList", {
        title : 'CNFT 거래소',
        postInfo : '/exchangeInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
  else {
    var search = urlencode.decode(urlPath.query.replace(/postSearch=/, ""));
    sql = `SELECT * FROM exchange WHERE title LIKE '%${search}%';`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 8;`;
    db.query(sql+sql2, (error, data, fields) => {
      if(error) throw error;
      res.render(__dirname + "/ejs/postList", {
        title : 'CNFT 거래소',
        postInfo : '/exchangeInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
});






server.get("/exchangePosting", (req, res) => {
    res.sendFile(__dirname + '/html/postingPage.html');
});

server.post("/exchangePosting", upload.array("files"), (req, res) => {
  const title = req.body['postTitle'];
  const content = req.body['postContent'];
  const nickname = req.body['nickname'];
  const icon = req.body['icon'];
  const email = req.body['email'];
  const image = req.files;
  var btn = req.body['posting'];


  if(btn == '포스팅' && image == '') {
    sql = `INSERT INTO exchange (author, authorIcon, email, title, content, img, DATE, hit) VALUES('${nickname}', '${icon}', '${email}', '${title}', '${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', '', now(), 1)`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/exchangePost_Login");
  }
  else {
    sql = `INSERT INTO exchange (author, authorIcon, email, title, content, img, DATE, hit) VALUES('${nickname}', '${icon}', '${email}', '${title}', '${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', '${image[0].filename}', now(), 1)`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/exchangePost_Login");
  }
});











server.get("/exchangePost_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  
  if(urlPath.path == '/exchangePost_Login') {
    sql = `SELECT * FROM exchange;`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 8;`;
    db.query(sql+sql2, (error, data, fields) =>{
      if(error) throw error;
      res.render(__dirname + "/ejs/postList_Login", {
        title : 'CNFT 거래소',
        posting : '/exchangePosting',
        postInfo : '/exchangeInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
  else {
    var search = urlencode.decode(urlPath.query.replace(/postSearch=/, ""));

    sql = `SELECT * FROM exchange WHERE title LIKE '%${search}%';`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 8;`;
    db.query(sql+sql2, (error, data, fields) => {
      if(error) throw error;
      res.render(__dirname + "/ejs/postList_Login", {
        title : 'CNFT 거래소',
        posting : '/exchangePosting',
        postInfo : '/exchangeInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
});





server.post('/exchangePost', (req, res) => {
  const id = req.body['postID'];

  sql = `UPDATE exchange SET hit = hit + 1 WHERE postNum = ${id}`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
  });
  res.redirect(`/exchangeInfo?postID=${id}`);
});


server.post('/exchangePost_Login', (req, res) => {
  const id = req.body['postID'];

  sql = `UPDATE exchange SET hit = hit + 1 WHERE postNum = ${id}`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
  });
  res.redirect(`/exchangeInfo_Login?postID=${id}`);
});









server.get("/exchangeInfo", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));

  sql = `SELECT * FROM exchange WHERE postNum LIKE '%${search}%';`;
  sql2 = `SELECT * FROM comments WHERE postNum LIKE '%${search}%' AND noticeID LIKE 8;`;
  db.query(sql + sql2, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postInfo", {
      title : 'CNFT 거래소',
      list1 : data[0],
      list2 : data[1]
    });
  });
});







server.get("/exchangeInfo_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));

  sql = `SELECT * FROM exchange WHERE postNum LIKE '%${search}%';`;
  sql2 = `SELECT * FROM comments WHERE postNum LIKE '%${search}%' AND noticeID LIKE 8;`;
  db.query(sql + sql2, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postInfo_Login", {
      title : 'CNFT 거래소',
      list1 : data[0],
      list2 : data[1]
    });
  });
});

server.post("/exchangeInfo_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));
  var nickname = req.body['nickname'];
  var email = req.body['cEmail'];
  var icon = req.body['icon'];
  var content = req.body['comContent'];
  var author = req.body['comAuthor'];
  var comNum = req.body['comNum'];
  var id = req.body['postID'];


  var btnName = req.body['delete'];
  if (btnName == '삭제') {
    sql = `SELECT * FROM exchange WHERE postNum = ${search};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
      if(data[0].img != '') {
        try {
            fs.unlinkSync(`postImg/${data[0].img}`);
        } catch (error) {
            if(err.code == 'ENOENT'){
                console.log("파일 삭제 Error 발생");
            }
        }
      }
    });
    sql = `DELETE FROM exchange WHERE postNum = ${search};`;
    sql2 = `DELETE FROM comments WHERE noticeID LIKE 8 AND postNum =${search};`
    db.query(sql + sql2, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/exchangePost_Login");
  }

  btnName = req.body['update'];
  if(btnName == '수정') {
    res.redirect(`/exchangeUpdate?postID=${id}`);
  }

  btnName = req.body['comPostBtn'];
  if(btnName == '입력') {
    sql = `INSERT INTO comments (noticeID, postNum, user, userIcon, email, content, liked, DATE, author) VALUES(8, '${search}', '${nickname}', '${icon}', '${email}', '${content}', 0, now(), '${author}');`
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
    });
    res.redirect(`/exchangeInfo_Login?postID=${search}`);
  }

  btnName = req.body['comDelete'];
  if(btnName == '삭제') {
    sql = `DELETE FROM comments WHERE comNum = ${comNum};`;
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
    });
    res.redirect(`/exchangeInfo_Login?postID=${search}`);
  }
});









server.get("/exchangeUpdate", (req, res) => {
  var urlPath = url.parse(req.url, true).query;

  sql = `SELECT * FROM exchange WHERE postNum LIKE '%${urlPath.postID}%'`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postUpdate", {
      list : data,
      email : urlPath.email
    });
  });
});


server.post("/exchangeUpdate", upload.array("files"), (req, res) => {
  var urlPath = url.parse(req.url, true).query;
  const title = req.body['postTitle'];
  const content = req.body['postContent'];
  const nickname = req.body['nickname'];
  const icon = req.body['icon'];
  const email = req.body['email'];
  const image = req.files;
  var btn = req.body['posting'];


  if(btn == '포스팅' && image != '') {
    sql = `UPDATE post.exchange SET title='${title}', content='${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', img='${image[0].filename}' WHERE postNum=${urlPath.postID};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/exchangePost_Login");
  }
  else{
    sql = `UPDATE post.exchange SET title='${title}', content='${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}' WHERE postNum=${urlPath.postID};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/exchangePost_Login");
  }
});


//CNFT 거래방법(9)CNFT 거래방법(9)
//CNFT 거래방법(9)CNFT 거래방법(9)
//CNFT 거래방법(9)CNFT 거래방법(9)
//CNFT 거래방법(9)CNFT 거래방법(9)

server.get("/dealPost", (req, res) => {
  var urlPath = url.parse(req.url);
  
  if(urlPath.path == '/dealPost') {
    sql = `SELECT * FROM deal;`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 9;`;
    db.query(sql+sql2, (error, data, fields) =>{
      if(error) throw error;
      res.render(__dirname + "/ejs/postList", {
        title : 'CNFT 거래방법',
        postInfo : '/dealInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
  else {
    var search = urlencode.decode(urlPath.query.replace(/postSearch=/, ""));
    sql = `SELECT * FROM deal WHERE title LIKE '%${search}%';`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 9;`;
    db.query(sql+sql2, (error, data, fields) => {
      if(error) throw error;
      res.render(__dirname + "/ejs/postList", {
        title : 'CNFT 거래방법',
        postInfo : '/dealInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
});






server.get("/dealPosting", (req, res) => {
    res.sendFile(__dirname + '/html/postingPage.html');
});

server.post("/dealPosting", upload.array("files"), (req, res) => {
  const title = req.body['postTitle'];
  const content = req.body['postContent'];
  const nickname = req.body['nickname'];
  const icon = req.body['icon'];
  const email = req.body['email'];
  const image = req.files;
  var btn = req.body['posting'];


  if(btn == '포스팅' && image == '') {
    sql = `INSERT INTO deal (author, authorIcon, email, title, content, img, DATE, hit) VALUES('${nickname}', '${icon}', '${email}', '${title}', '${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', '', now(), 1)`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/dealPost_Login");
  }
  else {
    sql = `INSERT INTO deal (author, authorIcon, email, title, content, img, DATE, hit) VALUES('${nickname}', '${icon}', '${email}', '${title}', '${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', '${image[0].filename}', now(), 1)`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/dealPost_Login");
  }
});











server.get("/dealPost_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  
  if(urlPath.path == '/dealPost_Login') {
    sql = `SELECT * FROM deal;`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 9;`;
    db.query(sql+sql2, (error, data, fields) =>{
      if(error) throw error;
      res.render(__dirname + "/ejs/postList_Login", {
        title : 'CNFT 거래방법',
        posting : '/dealPosting',
        postInfo : '/dealInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
  else {
    var search = urlencode.decode(urlPath.query.replace(/postSearch=/, ""));

    sql = `SELECT * FROM deal WHERE title LIKE '%${search}%';`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 9;`;
    db.query(sql+sql2, (error, data, fields) => {
      if(error) throw error;
      res.render(__dirname + "/ejs/postList_Login", {
        title : 'CNFT 거래방법',
        posting : '/dealPosting',
        postInfo : '/dealInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
});






server.post('/dealPost', (req, res) => {
  const id = req.body['postID'];

  sql = `UPDATE deal SET hit = hit + 1 WHERE postNum = ${id}`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
  });
  res.redirect(`/dealInfo?postID=${id}`);
});


server.post('/dealPost_Login', (req, res) => {
  const id = req.body['postID'];

  sql = `UPDATE deal SET hit = hit + 1 WHERE postNum = ${id}`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
  });
  res.redirect(`/dealInfo_Login?postID=${id}`);
});











server.get("/dealInfo", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));

  sql = `SELECT * FROM deal WHERE postNum LIKE '%${search}%';`;
  sql2 = `SELECT * FROM comments WHERE postNum LIKE '%${search}%' AND noticeID LIKE 9;`;
  db.query(sql + sql2, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postInfo", {
      title : 'CNFT 거래방법',
      list1 : data[0],
      list2 : data[1]
    });
  });
});







server.get("/dealInfo_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));

  sql = `SELECT * FROM deal WHERE postNum LIKE '%${search}%';`;
  sql2 = `SELECT * FROM comments WHERE postNum LIKE '%${search}%' AND noticeID LIKE 9;`;
  db.query(sql + sql2, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postInfo_Login", {
      title : 'CNFT 거래방법',
      list1 : data[0],
      list2 : data[1]
    });
  });
});

server.post("/dealInfo_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));
  var nickname = req.body['nickname'];
  var email = req.body['cEmail'];
  var icon = req.body['icon'];
  var content = req.body['comContent'];
  var author = req.body['comAuthor'];
  var comNum = req.body['comNum'];
  var id = req.body['postID'];


  var btnName = req.body['delete'];
  if (btnName == '삭제') {
    sql = `SELECT * FROM deal WHERE postNum = ${search};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
      if(data[0].img != '') {
        try {
            fs.unlinkSync(`postImg/${data[0].img}`);
        } catch (error) {
            if(err.code == 'ENOENT'){
                console.log("파일 삭제 Error 발생");
            }
        }
      }
    });
    sql = `DELETE FROM deal WHERE postNum = ${search};`;
    sql2 = `DELETE FROM comments WHERE noticeID LIKE 9 AND postNum =${search};`
    db.query(sql + sql2, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/dealPost_Login");
  }

  btnName = req.body['update'];
  if(btnName == '수정') {
    res.redirect(`/dealUpdate?postID=${id}`);
  }

  btnName = req.body['comPostBtn'];
  if(btnName == '입력') {
    sql = `INSERT INTO comments (noticeID, postNum, user, userIcon, email, content, liked, DATE, author) VALUES(9, '${search}', '${nickname}', '${icon}', '${email}', '${content}', 0, now(), '${author}');`
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
    });
    res.redirect(`/dealInfo_Login?postID=${search}`);
  }

  btnName = req.body['comDelete'];
  if(btnName == '삭제') {
    sql = `DELETE FROM comments WHERE comNum = ${comNum};`;
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
    });
    res.redirect(`/dealInfo_Login?postID=${search}`);
  }
});









server.get("/dealUpdate", (req, res) => {
  var urlPath = url.parse(req.url, true).query;

  sql = `SELECT * FROM deal WHERE postNum LIKE '%${urlPath.postID}%'`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postUpdate", {
      list : data,
      email : urlPath.email
    });
  });
});


server.post("/dealUpdate", upload.array("files"), (req, res) => {
  var urlPath = url.parse(req.url, true).query;
  const title = req.body['postTitle'];
  const content = req.body['postContent'];
  const nickname = req.body['nickname'];
  const icon = req.body['icon'];
  const email = req.body['email'];
  const image = req.files;
  var btn = req.body['posting'];


  if(btn == '포스팅' && image != '') {
    sql = `UPDATE post.deal SET title='${title}', content='${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', img='${image[0].filename}' WHERE postNum=${urlPath.postID};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/dealPost_Login");
  }
  else{
    sql = `UPDATE post.deal SET title='${title}', content='${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}' WHERE postNum=${urlPath.postID};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/dealPost_Login");
  }
});


//CNFT 지갑(10)CNFT 지갑(10)
//CNFT 지갑(10)CNFT 지갑(10)
//CNFT 지갑(10)CNFT 지갑(10)
//CNFT 지갑(10)CNFT 지갑(10)

server.get("/walletPost", (req, res) => {
  var urlPath = url.parse(req.url);
  
  if(urlPath.path == '/walletPost') {
    sql = `SELECT * FROM wallet;`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 10;`;
    db.query(sql+sql2, (error, data, fields) =>{
      if(error) throw error;
      res.render(__dirname + "/ejs/postList", {
        title : 'CNFT 지갑',
        postInfo : '/walletInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
  else {
    var search = urlencode.decode(urlPath.query.replace(/postSearch=/, ""));
    sql = `SELECT * FROM wallet WHERE title LIKE '%${search}%';`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 10;`;
    db.query(sql+sql2, (error, data, fields) => {
      if(error) throw error;
      res.render(__dirname + "/ejs/postList", {
        title : 'CNFT 지갑',
        postInfo : '/walletInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
});






server.get("/walletPosting", (req, res) => {
    res.sendFile(__dirname + '/html/postingPage.html');
});

server.post("/walletPosting", upload.array("files"), (req, res) => {
  const title = req.body['postTitle'];
  const content = req.body['postContent'];
  const nickname = req.body['nickname'];
  const icon = req.body['icon'];
  const email = req.body['email'];
  const image = req.files;
  var btn = req.body['posting'];


  if(btn == '포스팅' && image == '') {
    sql = `INSERT INTO wallet (author, authorIcon, email, title, content, img, DATE, hit) VALUES('${nickname}', '${icon}', '${email}', '${title}', '${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', '', now(), 1)`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/walletPost_Login");
  }
  else {
    sql = `INSERT INTO wallet (author, authorIcon, email, title, content, img, DATE, hit) VALUES('${nickname}', '${icon}', '${email}', '${title}', '${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', '${image[0].filename}', now(), 1)`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/walletPost_Login");
  }
});











server.get("/walletPost_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  
  if(urlPath.path == '/walletPost_Login') {
    sql = `SELECT * FROM wallet;`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 10;`;
    db.query(sql+sql2, (error, data, fields) =>{
      if(error) throw error;
      res.render(__dirname + "/ejs/postList_Login", {
        title : 'CNFT 지갑',
        posting : '/walletPosting',
        postInfo : '/walletInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
  else {
    var search = urlencode.decode(urlPath.query.replace(/postSearch=/, ""));

    sql = `SELECT * FROM wallet WHERE title LIKE '%${search}%';`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 10;`;
    db.query(sql+sql2, (error, data, fields) => {
      if(error) throw error;
      res.render(__dirname + "/ejs/postList_Login", {
        title : 'CNFT 지갑',
        posting : '/walletPosting',
        postInfo : '/walletInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
});







server.post('/walletPost', (req, res) => {
  const id = req.body['postID'];

  sql = `UPDATE wallet SET hit = hit + 1 WHERE postNum = ${id}`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
  });
  res.redirect(`/walletInfo?postID=${id}`);
});


server.post('/walletPost_Login', (req, res) => {
  const id = req.body['postID'];

  sql = `UPDATE wallet SET hit = hit + 1 WHERE postNum = ${id}`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
  });
  res.redirect(`/walletInfo_Login?postID=${id}`);
});











server.get("/walletInfo", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));

  sql = `SELECT * FROM wallet WHERE postNum LIKE '%${search}%';`;
  sql2 = `SELECT * FROM comments WHERE postNum LIKE '%${search}%' AND noticeID LIKE 10;`;
  db.query(sql + sql2, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postInfo_Login", {
      title : 'CNFT 지갑',
      list1 : data[0],
      list2 : data[1]
    });
  });
});







server.get("/walletInfo_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));

  sql = `SELECT * FROM wallet WHERE postNum LIKE '%${search}%';`;
  sql2 = `SELECT * FROM comments WHERE postNum LIKE '%${search}%' AND noticeID LIKE 10;`;
  db.query(sql + sql2, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postInfo_Login", {
      title : 'CNFT 지갑',
      list1 : data[0],
      list2 : data[1]
    });
  });
});

server.post("/walletInfo_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));
  var nickname = req.body['nickname'];
  var email = req.body['cEmail'];
  var icon = req.body['icon'];
  var content = req.body['comContent'];
  var author = req.body['comAuthor'];
  var comNum = req.body['comNum'];
  var id = req.body['postID'];


  var btnName = req.body['delete'];
  if (btnName == '삭제') {
    sql = `SELECT * FROM wallet WHERE postNum = ${search};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
      if(data[0].img != '') {
        try {
            fs.unlinkSync(`postImg/${data[0].img}`);
        } catch (error) {
            if(err.code == 'ENOENT'){
                console.log("파일 삭제 Error 발생");
            }
        }
      }
    });
    sql = `DELETE FROM wallet WHERE postNum = ${search};`;
    sql2 = `DELETE FROM comments WHERE noticeID LIKE 10 AND postNum =${search};`
    db.query(sql + sql2, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/walletPost_Login");
  }

  btnName = req.body['update'];
  if(btnName == '수정') {
    res.redirect(`/walletUpdate?postID=${id}`);
  }

  btnName = req.body['comPostBtn'];
  if(btnName == '입력') {
    sql = `INSERT INTO comments (noticeID, postNum, user, userIcon, email, content, liked, DATE, author) VALUES(10, '${search}', '${nickname}', '${icon}', '${email}', '${content}', 0, now(), '${author}');`
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
    });
    res.redirect(`/walletInfo_Login?postID=${search}`);
  }

  btnName = req.body['comDelete'];
  if(btnName == '삭제') {
    sql = `DELETE FROM comments WHERE comNum = ${comNum};`;
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
    });
    res.redirect(`/walletInfo_Login?postID=${search}`);
  }
});









server.get("/walletUpdate", (req, res) => {
  var urlPath = url.parse(req.url, true).query;

  sql = `SELECT * FROM wallet WHERE postNum LIKE '%${urlPath.postID}%'`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postUpdate", {
      list : data,
      email : urlPath.email
    });
  });
});


server.post("/walletUpdate", upload.array("files"), (req, res) => {
  var urlPath = url.parse(req.url, true).query;
  const title = req.body['postTitle'];
  const content = req.body['postContent'];
  const nickname = req.body['nickname'];
  const icon = req.body['icon'];
  const email = req.body['email'];
  const image = req.files;
  var btn = req.body['posting'];


  if(btn == '포스팅' && image != '') {
    sql = `UPDATE post.wallet SET title='${title}', content='${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', img='${image[0].filename}' WHERE postNum=${urlPath.postID};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/walletPost_Login");
  }
  else{
    sql = `UPDATE post.wallet SET title='${title}', content='${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}' WHERE postNum=${urlPath.postID};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/walletPost_Login");
  }
});


//CNFT 서비스(11)CNFT 서비스(11)
//CNFT 서비스(11)CNFT 서비스(11)
//CNFT 서비스(11)CNFT 서비스(11)
//CNFT 서비스(11)CNFT 서비스(11)

server.get("/servicePost", (req, res) => {
  var urlPath = url.parse(req.url);
  
  if(urlPath.path == '/servicePost') {
    sql = `SELECT * FROM service;`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 11;`;
    db.query(sql+sql2, (error, data, fields) =>{
      if(error) throw error;
      res.render(__dirname + "/ejs/postList", {
        title : 'CNFT 서비스',
        postInfo : '/serviceInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
  else {
    var search = urlencode.decode(urlPath.query.replace(/postSearch=/, ""));
    sql = `SELECT * FROM service WHERE title LIKE '%${search}%';`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 11;`;
    db.query(sql+sql2, (error, data, fields) => {
      if(error) throw error;
      res.render(__dirname + "/ejs/postList", {
        title : 'CNFT 서비스',
        postInfo : '/serviceInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
});






server.get("/servicePosting", (req, res) => {
    res.sendFile(__dirname + '/html/postingPage.html');
});

server.post("/servicePosting", upload.array("files"), (req, res) => {
  const title = req.body['postTitle'];
  const content = req.body['postContent'];
  const nickname = req.body['nickname'];
  const icon = req.body['icon'];
  const email = req.body['email'];
  const image = req.files;
  var btn = req.body['posting'];


  if(btn == '포스팅' && image == '') {
    sql = `INSERT INTO service (author, authorIcon, email, title, content, img, DATE, hit) VALUES('${nickname}', '${icon}', '${email}', '${title}', '${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', '', now(), 1)`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/servicePost_Login");
  }
  else {
    sql = `INSERT INTO service (author, authorIcon, email, title, content, img, DATE, hit) VALUES('${nickname}', '${icon}', '${email}', '${title}', '${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', '${image[0].filename}', now(), 1)`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/servicePost_Login");
  }
});











server.get("/servicePost_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  
  if(urlPath.path == '/servicePost_Login') {
    sql = `SELECT * FROM service;`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 11;`;
    db.query(sql+sql2, (error, data, fields) =>{
      if(error) throw error;
      res.render(__dirname + "/ejs/postList_Login", {
        title : 'CNFT 서비스',
        posting : '/servicePosting',
        postInfo : '/serviceInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
  else {
    var search = urlencode.decode(urlPath.query.replace(/postSearch=/, ""));

    sql = `SELECT * FROM service WHERE title LIKE '%${search}%';`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 11;`;
    db.query(sql+sql2, (error, data, fields) => {
      if(error) throw error;
      res.render(__dirname + "/ejs/postList_Login", {
        title : 'CNFT 서비스',
        posting : '/servicePosting',
        postInfo : '/serviceInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
});




server.post('/servicePost', (req, res) => {
  const id = req.body['postID'];

  sql = `UPDATE service SET hit = hit + 1 WHERE postNum = ${id}`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
  });
  res.redirect(`/serviceInfo?postID=${id}`);
});


server.post('/servicePost_Login', (req, res) => {
  const id = req.body['postID'];

  sql = `UPDATE service SET hit = hit + 1 WHERE postNum = ${id}`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
  });
  res.redirect(`/serviceInfo_Login?postID=${id}`);
});










server.get("/serviceInfo", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));

  sql = `SELECT * FROM service WHERE postNum LIKE '%${search}%';`;
  sql2 = `SELECT * FROM comments WHERE postNum LIKE '%${search}%' AND noticeID LIKE 11;`;
  db.query(sql + sql2, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postInfo", {
      title : 'CNFT 서비스',
      list1 : data[0],
      list2 : data[1]
    });
  });
});







server.get("/serviceInfo_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));

  sql = `SELECT * FROM service WHERE postNum LIKE '%${search}%';`;
  sql2 = `SELECT * FROM comments WHERE postNum LIKE '%${search}%' AND noticeID LIKE 11;`;
  db.query(sql + sql2, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postInfo_Login", {
      title : 'CNFT 서비스',
      list1 : data[0],
      list2 : data[1]
    });
  });
});

server.post("/serviceInfo_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));
  var nickname = req.body['nickname'];
  var email = req.body['cEmail'];
  var icon = req.body['icon'];
  var content = req.body['comContent'];
  var author = req.body['comAuthor'];
  var comNum = req.body['comNum'];
  var id = req.body['postID'];


  var btnName = req.body['delete'];
  if (btnName == '삭제') {
    sql = `SELECT * FROM service WHERE postNum = ${search};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
      if(data[0].img != '') {
        try {
            fs.unlinkSync(`postImg/${data[0].img}`);
        } catch (error) {
            if(err.code == 'ENOENT'){
                console.log("파일 삭제 Error 발생");
            }
        }
      }
    });
    sql = `DELETE FROM service WHERE postNum = ${search};`;
    sql2 = `DELETE FROM comments WHERE noticeID LIKE 11 AND postNum =${search};`
    db.query(sql + sql2, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/servicePost_Login");
  }

  btnName = req.body['update'];
  if(btnName == '수정') {
    res.redirect(`/serviceUpdate?postID=${id}`);
  }

  btnName = req.body['comPostBtn'];
  if(btnName == '입력') {
    sql = `INSERT INTO comments (noticeID, postNum, user, userIcon, email, content, liked, DATE, author) VALUES(11, '${search}', '${nickname}', '${icon}', '${email}', '${content}', 0, now(), '${author}');`
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
    });
    res.redirect(`/serviceInfo_Login?postID=${search}`);
  }

  btnName = req.body['comDelete'];
  if(btnName == '삭제') {
    sql = `DELETE FROM comments WHERE comNum = ${comNum};`;
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
    });
    res.redirect(`/serviceInfo_Login?postID=${search}`);
  }
});









server.get("/serviceUpdate", (req, res) => {
  var urlPath = url.parse(req.url, true).query;

  sql = `SELECT * FROM service WHERE postNum LIKE '%${urlPath.postID}%'`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postUpdate", {
      list : data,
      email : urlPath.email
    });
  });
});


server.post("/serviceUpdate", upload.array("files"), (req, res) => {
  var urlPath = url.parse(req.url, true).query;
  const title = req.body['postTitle'];
  const content = req.body['postContent'];
  const nickname = req.body['nickname'];
  const icon = req.body['icon'];
  const email = req.body['email'];
  const image = req.files;
  var btn = req.body['posting'];


  if(btn == '포스팅' && image != '') {
    sql = `UPDATE post.service SET title='${title}', content='${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', img='${image[0].filename}' WHERE postNum=${urlPath.postID};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/servicePost_Login");
  }
  else{
    sql = `UPDATE post.service SET title='${title}', content='${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}' WHERE postNum=${urlPath.postID};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/servicePost_Login");
  }
});



//cnft소개(5)cnft소개(5)
//cnft소개(5)cnft소개(5)
//cnft소개(5)cnft소개(5)
//cnft소개(5)cnft소개(5)
//cnft소개(5)cnft소개(5)
//cnft소개(5)cnft소개(5)

server.get("/cnftPost", (req, res) => {
  var urlPath = url.parse(req.url);
  
  if(urlPath.path == '/cnftPost') {
    sql = `SELECT * FROM postInfo;`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 5;`;
    db.query(sql+sql2, (error, data, fields) =>{
      if(error) throw error;
      res.render(__dirname + "/ejs/postList", {
        title : 'CNFT 소개 게시판',
        postInfo : '/cnftPostInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
  else {
    var search = urlencode.decode(urlPath.query.replace(/postSearch=/, ""));
    sql = `SELECT * FROM postInfo WHERE title LIKE '%${search}%';`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 5;`;
    db.query(sql+sql2, (error, data, fields) => {
      if(error) throw error;
      res.render(__dirname + "/ejs/postList", {
        title : 'CNFT 소개 게시판',
        postInfo : '/cnftPostInfo',
        list : data[0],
        clist : data[1]
      });
    });
  }
});


server.post('/cnftPost', (req, res) => {
  const id = req.body['postID'];

  sql = `UPDATE postInfo SET hit = hit + 1 WHERE postNum = ${id}`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
  });
  res.redirect(`/cnftPostInfo?postID=${id}`);
});


server.post('/cnftPost_Login', (req, res) => {
  const id = req.body['postID'];

  sql = `UPDATE postInfo SET hit = hit + 1 WHERE postNum = ${id}`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
  });
  res.redirect(`/cnftPostInfo_Login?postID=${id}`);
});



server.get("/cnftPost_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  
  if(urlPath.path == '/cnftPost_Login') {
    sql = `SELECT * FROM postInfo;`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 5;`;
    db.query(sql+sql2, (error, data, fields) =>{
      if(error) throw error;
      res.render(__dirname + "/ejs/postList_Login", {
        title : 'CNFT 소개 게시판',
        postInfo : '/cnftPostInfo',
        posting : '/cnftPosting',
        list : data[0],
        clist : data[1]
      });
    });
  }
  else {
    var search = urlencode.decode(urlPath.query.replace(/postSearch=/, ""));

    sql = `SELECT * FROM postInfo WHERE title LIKE '%${search}%';`;
    sql2 = `SELECT * FROM comments WHERE noticeID LIKE 5;`;
    db.query(sql+sql2, (error, data, fields) => {
      if(error) throw error;
      res.render(__dirname + "/ejs/postList_Login", {
        title : 'CNFT 소개 게시판',
        postInfo : '/cnftPostInfo',
        posting : '/cnftPosting',
        list : data[0],
        clist : data[1]
      });
    });
  }
});







server.get("/cnftPostInfo", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));

  sql = `SELECT * FROM postInfo WHERE postNum LIKE '%${search}%';`;
  sql2 = `SELECT * FROM comments WHERE postNum LIKE '%${search}%' AND noticeID LIKE 5;`;
  db.query(sql + sql2, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postInfo", {
      title : 'CNFT 소개 게시판',
      list1 : data[0],
      list2 : data[1]
    });
  });
});

server.get("/cnftPostInfo_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));

  sql = `SELECT * FROM postInfo WHERE postNum LIKE '%${search}%';`;
  sql2 = `SELECT * FROM comments WHERE postNum LIKE '%${search}%' AND noticeID LIKE 5;`;
  db.query(sql + sql2, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postInfo_Login", {
      title : 'CNFT 소개 게시판',
      list1 : data[0],
      list2 : data[1]
    });
  });
});

server.get("/cnftPosting", (req, res) => {
    res.sendFile(__dirname + '/html/postingPage.html');
});

server.get("/cnftPostUpdate", (req, res) => {
  var urlPath = url.parse(req.url, true).query;

  sql = `SELECT * FROM postInfo WHERE postNum LIKE '%${urlPath.postID}%'`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
    res.render(__dirname + "/ejs/postUpdate", {
      list : data,
      email : urlPath.email
    });
  });
});

server.post("/cnftPostUpdate", upload.array("files"), (req, res) => {
  var urlPath = url.parse(req.url, true).query;
  const title = req.body['postTitle'];
  const content = req.body['postContent'];
  const nickname = req.body['nickname'];
  const icon = req.body['icon'];
  const email = req.body['email'];
  const image = req.files;
  var btn = req.body['posting'];


  if(btn == '포스팅' && image != '') {
    sql = `UPDATE post.postInfo SET title='${title}', content='${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', img='${image[0].filename}' WHERE postNum=${urlPath.postID};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/cnftPost_Login");
  }
  else{
    sql = `UPDATE post.postInfo SET title='${title}', content='${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}' WHERE postNum=${urlPath.postID};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/cnftPost_Login");
  }
});


server.get("/enterInfo", (req, res) => {
  res.sendFile(__dirname + "/html/enterInfoPage.html");
});

server.get("/enterInfo_Login", (req, res) => {
  res.sendFile(__dirname + "/html/enterInfoPage_Login.html");
});



server.get("/subscribe", (req, res) => {
  res.sendFile(__dirname + "/html/premiumSubscribe.html");
});

server.get("/subscribe_Login", (req, res) => {
  res.sendFile(__dirname + "/html/premiumSubscribe_Login.html");
});


server.get("/brokerage", (req, res) => {
  res.sendFile(__dirname + "/html/brokerage.html");
});

server.get("/brokerage_Login", (req, res) => {
  res.sendFile(__dirname + "/html/brokerage_Login.html");
});




server.get("/payPage", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/id=/, ""));

  sql = `SELECT * FROM payUser WHERE email LIKE '%${search}%';`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
    if(data[0] == null) {
      res.sendFile(__dirname + "/html/payPage.html");
    }
    else {
      res.redirect("/payPageError");
    }
  });
});

server.get("/payPageError", (req, res) => {
  res.sendFile(__dirname + '/html/alreadyPay.html');
});


server.get("/payPageResult", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/id=/, ""));

  sql = `SELECT * FROM payUser WHERE payID LIKE '%${search}%';`;
  db.query(sql, (error, data, fields) => {
    if(error) throw error;
    if(data[0] != null) {
      res.sendFile(__dirname + "/html/payPageResult.html");
    }
    else {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write(`<script charset="utf-8">alert('이미 구독을 하셨습니다.');</script>`);
      res.write(`<script charset="utf-8">window.close();</script>`);
    }
  });
});


server.get("/adaInfo", (req, res) => {
  res.sendFile(__dirname + "/html/adaInfoPage.html");
});

server.get("/adaInfo_Login", (req, res) => {
  res.sendFile(__dirname + "/html/adaInfoPage_Login.html");
});



server.get("/questionsPage", (req, res) => {
  res.sendFile(__dirname + "/html/questionsPage.html");
});

















server.post("/cnftPosting", upload.array("files"), (req, res) => {
  const title = req.body['postTitle'];
  const content = req.body['postContent'];
  const nickname = req.body['nickname'];
  const icon = req.body['icon'];
  const email = req.body['email'];
  const image = req.files;
  var btn = req.body['posting'];

  if(btn == '포스팅' && image == '') {
    sql = `INSERT INTO postInfo (author, authorIcon, email, title, content, img, DATE, hit) VALUES('${nickname}', '${icon}', '${email}', '${title}', '${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', '', now(), 1);`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/cnftPost_Login");
  }
  else {
    sql = `INSERT INTO postInfo (author, authorIcon, email, title, content, img, DATE, hit) VALUES('${nickname}', '${icon}', '${email}', '${title}', '${content.replace(/\"/gi, '\"\"').replace(/\'/gi, "\'\'")}', '${image[0].filename}', now(), 1);`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/cnftPost_Login");
  }
});


server.post("/cnftPostInfo_Login", (req, res) => {
  var urlPath = url.parse(req.url);
  var search = urlencode.decode(urlPath.query.replace(/postID=/, ""));
  var nickname = req.body['nickname'];
  var email = req.body['cEmail'];
  var icon = req.body['icon'];
  var content = req.body['comContent'];
  var contentEdit = req.body['comContentEdit'];
  var author = req.body['comAuthor'];
  var comNum = req.body['comNum'];
  var id = req.body['postID'];

  var btnName = req.body['delete'];
  if (btnName == '삭제') {
    sql = `SELECT * FROM postInfo WHERE postNum = ${search};`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
      if(data[0].img != '') {
        try {
            fs.unlinkSync(`postImg/${data[0].img}`);
        } catch (error) {
            if(err.code == 'ENOENT'){
                console.log("파일 삭제 Error 발생");
            }
        }
      }
    });
    sql = `DELETE FROM postInfo WHERE postNum = ${search};`;
    sql2 = `DELETE FROM comments WHERE postNum = ${search} AND noticeID LIKE 5;`;
    db.query(sql, (error, data, fields) =>{
      if(error) throw error;
    });
    res.redirect("/cnftPost_Login");
  }

  btnName = req.body['update'];
    if(btnName == '수정') {
      res.redirect(`/cnftPostUpdate?postID=${id}`);
  }

  btnName = req.body['comPostBtn'];
  if(btnName == '입력') {
    sql = `INSERT INTO comments (noticeID, postNum, user, userIcon, email, content, liked, DATE, author) VALUES(5, '${search}', '${nickname}', '${icon}', '${email}', '${content}', 0, now(), '${author}');`
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
    });
    res.redirect(`/cnftPostInfo_Login?postID=${search}`);
  }


  btnName = req.body['comDelete'];
  if(btnName == '삭제') {
    sql = `DELETE FROM comments WHERE comNum = ${comNum};`;
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
    });
    res.redirect(`/cnftPostInfo_Login?postID=${search}`);
  }
});

server.post("/payPage", (req, res)=> {
  var payID = req.body['payID'];
  var btnName = req.body['paySuccessBtn'];
  var nickname = req.body['nickname'];
  var email = req.body['email'];
  var phone = req.body['comPhone'];
  var age = req.body['comAge'];

  if(btnName == '주문 확인'){
    sql = `INSERT INTO payUser (payID, user, email, phone, age, DATE) VALUES ('${payID}', '${nickname}', '${email}', '${phone}', '${age}', now())`;
    db.query(sql, (error, data, fields) => {
      if(error) throw error;

    });
    res.redirect(`/payPageResult?id=${payID}`);
  }
});