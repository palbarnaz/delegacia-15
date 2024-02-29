-- CreateTable
CREATE TABLE "usuario" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "senha" VARCHAR(50) NOT NULL,
    "token" TEXT,
    "dthr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dthr_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");
