DROP DATABASE post;
CREATE DATABASE post;
USE post;


CREATE TABLE payUser(
	payNum			INTEGER PRIMARY KEY auto_increment,
    payID			VARCHAR(20),
	user			VARCHAR(20),
	email			text,
    DATE			text
);

CREATE TABLE investment(
	postNum			INTEGER PRIMARY KEY auto_increment,
    author			VARCHAR(20),
    authorIcon		text,
    email			text,
    title			text,
    content			LONGTEXT,
    img				text,
    DATE			text,
    hit				INTEGER
);

CREATE TABLE currentSituation(
	postNum			INTEGER PRIMARY KEY auto_increment,
    author			VARCHAR(20),
    authorIcon		text,
    email			text,
    title			text,
    content			LONGTEXT,
    img				text,
    DATE			text,
    hit				INTEGER
);

CREATE TABLE recruitment(
	postNum			INTEGER PRIMARY KEY auto_increment,
    author			VARCHAR(20),
    authorIcon		text,
    email			text,
    title			text,
    content			LONGTEXT,
    img				text,
    DATE			text,
    hit				INTEGER
);

CREATE TABLE cnftNews(
	postNum			INTEGER PRIMARY KEY auto_increment,
    author			VARCHAR(20),
    authorIcon		text,
    email			text,
    title			text,
    content			LONGTEXT,
    img				text,
    DATE			text,
    hit				INTEGER
);

CREATE TABLE minting(
	postNum			INTEGER PRIMARY KEY auto_increment,
    author			VARCHAR(20),
    authorIcon		text,
    email			text,
    title			text,
    content			LONGTEXT,
    img				text,
    DATE			text,
    hit				INTEGER
);

CREATE TABLE exchange(
	postNum			INTEGER PRIMARY KEY auto_increment,
    author			VARCHAR(20),
    authorIcon		text,
    email			text,
    title			text,
    content			LONGTEXT,
    img				text,
    DATE			text,
    hit				INTEGER
);

CREATE TABLE deal(
	postNum			INTEGER PRIMARY KEY auto_increment,
    author			VARCHAR(20),
    authorIcon		text,
    email			text,
    title			text,
    content			LONGTEXT,
    img				text,
    DATE			text,
    hit				INTEGER
);

CREATE TABLE wallet(
	postNum			INTEGER PRIMARY KEY auto_increment,
    author			VARCHAR(20),
    authorIcon		text,
    email			text,
    title			text,
    content			LONGTEXT,
    img				text,
    DATE			text,
    hit				INTEGER
);

CREATE TABLE service(
	postNum			INTEGER PRIMARY KEY auto_increment,
    author			VARCHAR(20),
    authorIcon		text,
    email			text,
    title			text,
    content			LONGTEXT,
    img				text,
    DATE			text,
    hit				INTEGER
);

CREATE TABLE postInfo(
	postNum			INTEGER PRIMARY KEY auto_increment,
    author			VARCHAR(20),
    authorIcon		text,
    email			text,
    title			text,
    content			LONGTEXT,
    img				text,
    DATE			text,
    hit				INTEGER
);

CREATE TABLE adaNews(
	postNum			INTEGER PRIMARY KEY auto_increment,
    author			VARCHAR(20),
    authorIcon		text,
    email			text,
    title			text,
    content			LONGTEXT,
    img				text,
    DATE			text,
    hit				INTEGER
);

CREATE TABLE comments(
	comNum			INTEGER PRIMARY KEY auto_increment,
    noticeID        INTEGER,
    postNum			INTEGER,
    user			VARCHAR(20),
    userIcon		text,
    email			text,
    content			LONGTEXT,
    liked			INTEGER,
    DATE			text,
    author			INTEGER
);

SELECT * FROM post.payUser;
SELECT * FROM post.adaNews;
SELECT * FROM post.postInfo;
SELECT * FROM post.comments;



set SQL_SAFE_UPDATES = 0;


AlTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '00000000';
FLUSH privileges;
