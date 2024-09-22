CREATE TABLE "pad" (
	"id"	INTEGER NOT NULL,
	"ulid"	TEXT NOT NULL,
	"language"	TEXT NOT NULL,
	"keepTime"	TEXT NOT NULL,
	"accessCode" TEXT NOT NULL,
	"createAt"	INTEGER NOT NULL,
	"expireAt"	INTEGER NOT NULL,
	"expired"	INTEGER NOT NULL DEFAULT 0,
	"codeText"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);