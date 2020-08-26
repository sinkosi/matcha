from .dbSettings import *
import postgresql


def create_database():
 
    # try:
    db = postgresql.open(f'pq://{db_user}:{db_password}@{db_host}:{db_port}')
    db.execute(f"CREATE DATABASE {db_name}")
    db = postgresql.open(f'pq://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}')

    # except:
    #     print("database creation failed")


    CREATE_TABLES_QUERY = """
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS "users" (
        "id" UUID  DEFAULT uuid_generate_v4() NOT NULL,
        "username" TEXT   NOT NULL,
        "email" TEXT   NOT NULL,
        "firstname" TEXT   NOT NULL,
        "lastname" TEXT   NOT NULL,
        "password" TEXT   NOT NULL,
        "gender" TEXT   NULL,
        "biography" TEXT   NULL,
        "sexual_preferences" TEXT   NULL,
        "profile_pic" int   NULL,
        "location" int   NULL,
        "activated" BOOLEAN  DEFAULT false NOT NULL,
        "completed" BOOLEAN  DEFAULT false NOT NULL,
        "registered" TIMESTAMPTZ  DEFAULT current_timestamp NOT NULL,
        "modified" TIMESTAMPTZ  DEFAULT current_timestamp NOT NULL,
        "activated_date" TIMESTAMPTZ   NULL,
        "completed_date" TIMESTAMPTZ   NULL,
        CONSTRAINT "pk_users" PRIMARY KEY (
            "id"
        ),
        CONSTRAINT "uc_users_username" UNIQUE (
            "username"
        ),
        CONSTRAINT "uc_users_email" UNIQUE (
            "email"
        ),
        CONSTRAINT "uc_users_profile_pic" UNIQUE (
            "profile_pic"
        )
    );

    CREATE TABLE IF NOT EXISTS "interests" (
        "hashtag" TEXT   NOT NULL,
        "added" TIMESTAMPTZ  DEFAULT current_timestamp NOT NULL,
        CONSTRAINT "pk_interests" PRIMARY KEY (
            "hashtag"
        )
    );

    CREATE TABLE IF NOT EXISTS "users_interests" (
        "id" SERIAL   NOT NULL,
        "user_id" UUID   NOT NULL,
        "interest_id" TEXT   NOT NULL,
        "linked" TIMESTAMPTZ  DEFAULT current_timestamp NOT NULL,
        CONSTRAINT "pk_users_interests" PRIMARY KEY (
            "id"
        )
    );

    CREATE TABLE IF NOT EXISTS "images" (
        "id" SERIAL   NOT NULL,
        "url" TEXT   NOT NULL,
        "user_id" UUID   NOT NULL,
        "uploaded" TIMESTAMPTZ  DEFAULT current_timestamp NOT NULL,
        CONSTRAINT "pk_images" PRIMARY KEY (
            "id"
        )
    );

    CREATE TABLE IF NOT EXISTS "activation_codes" (
        "code" TEXT   NOT NULL,
        "profile_id" UUID   NOT NULL,
        "generated" TIMESTAMPTZ  DEFAULT current_timestamp NOT NULL,
        CONSTRAINT "pk_activation_codes" PRIMARY KEY (
            "code"
        )
    );

    CREATE TABLE IF NOT EXISTS "profile_likes" (
        "id" SERIAL   NOT NULL,
        "profile_id" UUID   NOT NULL,
        "liker_id" UUID   NOT NULL,
        "liked" TIMESTAMPTZ  DEFAULT current_timestamp NOT NULL,
        CONSTRAINT "pk_profile_likes" PRIMARY KEY (
            "id"
        )
    );

    CREATE TABLE IF NOT EXISTS "profile_visits" (
        "id" SERIAL   NOT NULL,
        "profile_id" UUID   NOT NULL,
        "visitor_id" UUID   NOT NULL,
        "visited" TIMESTAMPTZ  DEFAULT current_timestamp NOT NULL,
        CONSTRAINT "pk_profile_visits" PRIMARY KEY (
            "id"
        )
    );

    CREATE TABLE IF NOT EXISTS "fame_rating" (
        "user_id" UUID   NOT NULL,
        "fame_rating" NUMERIC  DEFAULT 0 NOT NULL,
        CONSTRAINT "pk_fame_rating" PRIMARY KEY (
            "user_id"
        )
    );

    CREATE TABLE IF NOT EXISTS "location" (
        "id" SERIAL   NOT NULL,
        "address1" TEXT   NULL,
        "address2" TEXT   NULL,
        "city" TEXT   NULL,
        "state" TEXT   NULL,
        "code" TEXT   NULL,
        "longitude" NUMERIC   NULL,
        "latitude" NUMERIC   NULL,
        "user_id" UUID   NOT NULL,
        "time" TIMESTAMPTZ  DEFAULT current_timestamp NOT NULL,
        CONSTRAINT "pk_location" PRIMARY KEY (
            "id"
        )
    );


    ALTER TABLE "users" ADD CONSTRAINT "fk_users_profile_pic" FOREIGN KEY("profile_pic")
    REFERENCES "images" ("id");

    ALTER TABLE "users" ADD CONSTRAINT "fk_users_location" FOREIGN KEY("location")
    REFERENCES "location" ("id");

    ALTER TABLE "users_interests" ADD CONSTRAINT "fk_users_interests_user_id" FOREIGN KEY("user_id")
    REFERENCES "users" ("id");

    ALTER TABLE "users_interests" ADD CONSTRAINT "fk_users_interests_interest_id" FOREIGN KEY("interest_id")
    REFERENCES "interests" ("hashtag");

    ALTER TABLE "images" ADD CONSTRAINT "fk_images_user_id" FOREIGN KEY("user_id")
    REFERENCES "users" ("id");

    ALTER TABLE "activation_codes" ADD CONSTRAINT "fk_activation_codes_profile_id" FOREIGN KEY("profile_id")
    REFERENCES "users" ("id");

    ALTER TABLE "profile_likes" ADD CONSTRAINT "fk_profile_likes_profile_id" FOREIGN KEY("profile_id")
    REFERENCES "users" ("id");

    ALTER TABLE "profile_likes" ADD CONSTRAINT "fk_profile_likes_liker_id" FOREIGN KEY("liker_id")
    REFERENCES "users" ("id");

    ALTER TABLE "profile_visits" ADD CONSTRAINT "fk_profile_visits_profile_id" FOREIGN KEY("profile_id")
    REFERENCES "users" ("id");

    ALTER TABLE "profile_visits" ADD CONSTRAINT "fk_profile_visits_visitor_id" FOREIGN KEY("visitor_id")
    REFERENCES "users" ("id");

    ALTER TABLE "fame_rating" ADD CONSTRAINT "fk_fame_rating_user_id" FOREIGN KEY("user_id")
    REFERENCES "users" ("id");

    ALTER TABLE "location" ADD CONSTRAINT "fk_location_user_id" FOREIGN KEY("user_id")
    REFERENCES "users" ("id");

    """
    if db:
        db.execute(CREATE_TABLES_QUERY)
