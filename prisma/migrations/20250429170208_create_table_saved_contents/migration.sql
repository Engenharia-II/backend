-- CreateTable
CREATE TABLE "saved_content" (
    "user_id" TEXT NOT NULL,
    "content_id" TEXT NOT NULL,
    "saved_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saved_content_pkey" PRIMARY KEY ("user_id","content_id")
);

-- AddForeignKey
ALTER TABLE "saved_content" ADD CONSTRAINT "saved_content_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_content" ADD CONSTRAINT "saved_content_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "contents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
