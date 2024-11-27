-- CreateTable
CREATE TABLE "Company" (
    "name" TEXT NOT NULL,
    "cnpj" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("cnpj")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "companyCNPJ" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyPosition" (
    "id" TEXT NOT NULL,
    "companyCNPJ" INTEGER NOT NULL,
    "servicePosition" TEXT NOT NULL,

    CONSTRAINT "CompanyPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priority" BOOLEAN NOT NULL,
    "completed" BOOLEAN NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "task" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeGroup" (
    "id" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "employee" TEXT NOT NULL,

    CONSTRAINT "EmployeeGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_cnpj_key" ON "Company"("cnpj");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_position_fkey" FOREIGN KEY ("position") REFERENCES "CompanyPosition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_companyCNPJ_fkey" FOREIGN KEY ("companyCNPJ") REFERENCES "Company"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyPosition" ADD CONSTRAINT "CompanyPosition_companyCNPJ_fkey" FOREIGN KEY ("companyCNPJ") REFERENCES "Company"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_task_fkey" FOREIGN KEY ("task") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeGroup" ADD CONSTRAINT "EmployeeGroup_group_fkey" FOREIGN KEY ("group") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeGroup" ADD CONSTRAINT "EmployeeGroup_employee_fkey" FOREIGN KEY ("employee") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
