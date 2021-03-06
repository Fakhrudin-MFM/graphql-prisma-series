# Migration `20200907200924-list-todo-relation`

This migration has been generated by John Curry at 9/7/2020, 1:09:24 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,
    "order" INTEGER,
    "listId" INTEGER NOT NULL,

    FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Todo" ("id", "name", "isCompleted", "order") SELECT "id", "name", "isCompleted", "order" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200907195307-list-model..20200907200924-list-todo-relation
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
     provider = "sqlite"
-    url = "***"
+    url = "***"
 }
 generator client {
     provider = "prisma-client-js"
@@ -11,8 +11,10 @@
     id          Int     @id @default(autoincrement())
     name        String
     isCompleted Boolean
     order       Int?
+    list        List    @relation(fields: [listId], references: [id])
+    listId      Int
 }
 model User {
     id        Int      @id @default(autoincrement())
@@ -24,5 +26,6 @@
 model List {
     id        Int      @id @default(autoincrement())
     createdAt DateTime @default(now())
     name      String
+    todos     Todo[]
 }
```


