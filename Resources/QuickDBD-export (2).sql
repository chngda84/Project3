-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "wa_schools_y12" (
    "School_ID" INT   NOT NULL,
    "School_Name" VARCHAR(200)   NOT NULL,
    "Y12" INT   NOT NULL,
    "Classification_ID" INT   NOT NULL,
    CONSTRAINT "pk_wa_schools_y12" PRIMARY KEY (
        "School_ID"
     )
);

CREATE TABLE "wa_schools_classification" (
    "Classification_ID" INT   NOT NULL,
    "Classification_Group" VARCHAR(200)   NOT NULL,
    CONSTRAINT "pk_wa_schools_classification" PRIMARY KEY (
        "Classification_ID"
     )
);

CREATE TABLE "applecross_secondary_schools" (
    "School_ID" INT   NOT NULL
);

CREATE TABLE "secondary_schools_ranking" (
    "School_ID" INT   NOT NULL,
    "2020_ATAR_Secondary_School_Ranking" INT   NOT NULL,
    "Median_ATAR" INT   NOT NULL
);

ALTER TABLE "wa_schools_y12" ADD CONSTRAINT "fk_wa_schools_y12_Classification_ID" FOREIGN KEY("Classification_ID")
REFERENCES "wa_schools_classification" ("Classification_ID");

ALTER TABLE "applecross_secondary_schools" ADD CONSTRAINT "fk_applecross_secondary_schools_School_ID" FOREIGN KEY("School_ID")
REFERENCES "wa_schools_y12" ("School_ID");

ALTER TABLE "secondary_schools_ranking" ADD CONSTRAINT "fk_secondary_schools_ranking_School_ID" FOREIGN KEY("School_ID")
REFERENCES "wa_schools_y12" ("School_ID");

