-- CreateTable
CREATE TABLE "icons" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatarKey" TEXT NOT NULL,

    CONSTRAINT "icons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "icons" ADD CONSTRAINT "icons_id_fkey" FOREIGN KEY ("id") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
