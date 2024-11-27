/*
  Warnings:

  - The primary key for the `Company` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "CompanyPosition" DROP CONSTRAINT "CompanyPosition_companyCNPJ_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_companyCNPJ_fkey";

-- AlterTable
ALTER TABLE "Company" DROP CONSTRAINT "Company_pkey",
ALTER COLUMN "cnpj" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Company_pkey" PRIMARY KEY ("cnpj");

-- AlterTable
ALTER TABLE "CompanyPosition" ALTER COLUMN "companyCNPJ" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "companyCNPJ" SET DATA TYPE BIGINT;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_companyCNPJ_fkey" FOREIGN KEY ("companyCNPJ") REFERENCES "Company"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyPosition" ADD CONSTRAINT "CompanyPosition_companyCNPJ_fkey" FOREIGN KEY ("companyCNPJ") REFERENCES "Company"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;
