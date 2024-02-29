-- CreateTable
CREATE TABLE "criminoso" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "endereco" VARCHAR(200) NOT NULL,
    "idade" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "criminoso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crime" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "endereco" VARCHAR(200) NOT NULL,
    "id_criminoso" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "arma" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "id_crime" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "arma_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "crime" ADD CONSTRAINT "crime_id_criminoso_fkey" FOREIGN KEY ("id_criminoso") REFERENCES "criminoso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arma" ADD CONSTRAINT "arma_id_crime_fkey" FOREIGN KEY ("id_crime") REFERENCES "crime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
