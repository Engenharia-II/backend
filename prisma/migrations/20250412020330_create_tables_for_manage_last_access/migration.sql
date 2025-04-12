-- CreateTable
CREATE TABLE "subject_access" (
    "user_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "last_access" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subject_access_pkey" PRIMARY KEY ("user_id","subject_id")
);

-- CreateTable
CREATE TABLE "content_access" (
    "user_id" TEXT NOT NULL,
    "content_id" TEXT NOT NULL,
    "last_access" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "content_access_pkey" PRIMARY KEY ("user_id","content_id")
);

-- AddForeignKey
ALTER TABLE "subject_access" ADD CONSTRAINT "subject_access_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_access" ADD CONSTRAINT "subject_access_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_access" ADD CONSTRAINT "content_access_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_access" ADD CONSTRAINT "content_access_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "contents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
