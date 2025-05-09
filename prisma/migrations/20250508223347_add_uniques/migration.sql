/*
  Warnings:

  - A unique constraint covering the columns `[name,topic_id]` on the table `contents` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `subjects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,subject_id]` on the table `topics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contents_name_topic_id_key" ON "contents"("name", "topic_id");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_name_key" ON "subjects"("name");

-- CreateIndex
CREATE UNIQUE INDEX "topics_name_subject_id_key" ON "topics"("name", "subject_id");
