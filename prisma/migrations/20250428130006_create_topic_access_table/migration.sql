-- CreateTable
CREATE TABLE "topic_access" (
    "user_id" TEXT NOT NULL,
    "topic_id" TEXT NOT NULL,
    "last_access" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "topic_access_pkey" PRIMARY KEY ("user_id","topic_id")
);

-- AddForeignKey
ALTER TABLE "topic_access" ADD CONSTRAINT "topic_access_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_access" ADD CONSTRAINT "topic_access_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
