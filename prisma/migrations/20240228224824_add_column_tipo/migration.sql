-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('ADMIN', 'FUNCIONARIO');

-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "tipo" "TipoUsuario";
