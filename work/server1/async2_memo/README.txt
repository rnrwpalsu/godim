$ express --ejs async2_memo
$ npm i
$ npm i --save mysql
$ npm i --save async

create table memo(
	num int auto_increment,
	item varchar(100) not null,
	todo varchar(200) not null,
	primary key(num)
);

INSERT into memo(item, todo) values ('memo1', 'JS study');
INSERT into memo(item, todo) values ('memo1', 'Node study');
INSERT into memo(item, todo) values ('memo1', 'MongoDB study');

INSERT into memo(item, todo) values ('memo2', 'AAA');
INSERT into memo(item, todo) values ('memo2', 'BBB');
INSERT into memo(item, todo) values ('memo2', 'CCC');