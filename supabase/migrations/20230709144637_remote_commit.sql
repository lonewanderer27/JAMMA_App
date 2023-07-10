
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_jsonschema" WITH SCHEMA "public";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE FUNCTION "public"."calculate_average_rating"("product_id" integer) RETURNS bigint
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    avg_rating numeric;
BEGIN
    SELECT AVG(product_rating) as avg_rating
    FROM reviews
    WHERE product_id = product_id;

    RETURN ROUND(avg_rating);
END;
$$;

ALTER FUNCTION "public"."calculate_average_rating"("product_id" integer) OWNER TO "postgres";

CREATE FUNCTION "public"."get_average_rating"("product_id" integer) RETURNS bigint
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    avg_rating numeric;
BEGIN
    SELECT AVG(product_rating) as avg_rating
    FROM reviews
    WHERE product_id = product_id;

    RETURN ROUND(avg_rating);
END;
$$;

ALTER FUNCTION "public"."get_average_rating"("product_id" integer) OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE "public"."products" (
    "id" integer NOT NULL,
    "category_id" integer NOT NULL,
    "brand_id" integer DEFAULT 1 NOT NULL,
    "description" character varying NOT NULL,
    "image_url" character varying NOT NULL,
    "video_url" character varying,
    "name" character varying NOT NULL,
    "price" double precision NOT NULL,
    "stock" bigint DEFAULT '100'::bigint NOT NULL,
    "last_stock" timestamp without time zone DEFAULT "now"() NOT NULL,
    "content" "text",
    "created_at" timestamp without time zone DEFAULT '2022-12-31 00:00:00'::timestamp without time zone NOT NULL,
    "deleted" boolean DEFAULT false NOT NULL,
    "fragile" boolean DEFAULT false NOT NULL,
    "sales" double precision DEFAULT '0'::double precision NOT NULL,
    "unique_name" "text"
);

ALTER TABLE "public"."products" OWNER TO "postgres";

CREATE FUNCTION "public"."get_product"("user_id" "uuid", "product_id" integer) RETURNS SETOF "public"."products"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  user_id_alias uuid := user_id;
  product_id_alias integer := product_id;
BEGIN
  INSERT INTO recently_viewed (user_id, product_id)
  VALUES (user_id_alias, product_id_alias)
  ON CONFLICT on constraint unique_product_per_user
  DO
    UPDATE SET created_at = NOW();
  
  RETURN QUERY
    SELECT *
    FROM products
    WHERE products.id = product_id_alias;
END;
$$;

ALTER FUNCTION "public"."get_product"("user_id" "uuid", "product_id" integer) OWNER TO "postgres";

CREATE FUNCTION "public"."get_product_review_stats"("product_id" integer) RETURNS TABLE("total_reviews" integer, "average_rating" numeric, "rating_1" integer, "rating_2" integer, "rating_3" integer, "rating_4" integer, "rating_5" integer)
    LANGUAGE "plpgsql"
    AS $_$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(*)::integer AS total_reviews,
        ROUND(AVG(product_rating)::numeric, 1) AS average_rating,
        COUNT(*) FILTER (WHERE product_rating = 1)::integer AS rating_1,
        COUNT(*) FILTER (WHERE product_rating = 2)::integer AS rating_2,
        COUNT(*) FILTER (WHERE product_rating = 3)::integer AS rating_3,
        COUNT(*) FILTER (WHERE product_rating = 4)::integer AS rating_4,
        COUNT(*) FILTER (WHERE product_rating = 5)::integer AS rating_5
    FROM
        reviews
    WHERE
        reviews.product_id = $1;
END;
$_$;

ALTER FUNCTION "public"."get_product_review_stats"("product_id" integer) OWNER TO "postgres";

CREATE FUNCTION "public"."get_smartwatches"() RETURNS SETOF "public"."products"
    LANGUAGE "sql"
    AS $$
  SELECT * FROM products WHERE category_id = (SELECT id FROM categories WHERE name = 'smartwatch');
$$;

ALTER FUNCTION "public"."get_smartwatches"() OWNER TO "postgres";

CREATE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

CREATE TABLE "public"."brands" (
    "id" integer NOT NULL,
    "name" character varying NOT NULL,
    "image_url" "text"
);

ALTER TABLE "public"."brands" OWNER TO "postgres";

CREATE SEQUENCE "public"."brands_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."brands_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."brands_id_seq" OWNED BY "public"."brands"."id";

ALTER TABLE "public"."brands" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."brands_id_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE "public"."cards" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "number" character varying NOT NULL,
    "expiry_date" "date" NOT NULL,
    "cvv" integer NOT NULL,
    "name" character varying NOT NULL,
    "user_id" "uuid" NOT NULL,
    "testing" bigint
);

ALTER TABLE "public"."cards" OWNER TO "postgres";

CREATE TABLE "public"."cards_error" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "error_description" "text" NOT NULL,
    "error_code" "text" NOT NULL,
    "decline_code" "text" DEFAULT 'n/a'::"text"
);

ALTER TABLE "public"."cards_error" OWNER TO "postgres";

ALTER TABLE "public"."cards_error" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."cards_error_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE "public"."cards" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."cards_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE "public"."cart" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "product_id" integer NOT NULL,
    "user_id" "uuid" NOT NULL,
    "quantity" bigint NOT NULL
);

ALTER TABLE "public"."cart" OWNER TO "postgres";

ALTER TABLE "public"."cart" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."cart_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE "public"."categories" (
    "id" integer NOT NULL,
    "name" character varying NOT NULL
);

ALTER TABLE "public"."categories" OWNER TO "postgres";

CREATE SEQUENCE "public"."categories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."categories_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."categories_id_seq" OWNED BY "public"."categories"."id";

ALTER TABLE "public"."categories" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."categories_id_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE "public"."coupons" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "code" character varying NOT NULL,
    "expiry_date" timestamp with time zone NOT NULL,
    "name" character varying NOT NULL,
    "description" character varying NOT NULL,
    "discount" double precision NOT NULL,
    "max_use" bigint NOT NULL,
    "min_purchase_amount" double precision NOT NULL,
    "secret" boolean DEFAULT false,
    "used" bigint NOT NULL
);

ALTER TABLE "public"."coupons" OWNER TO "postgres";

ALTER TABLE "public"."coupons" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."coupons_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE "public"."delivery_addresses" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "name" character varying NOT NULL,
    "region" character varying NOT NULL,
    "address_line2" character varying NOT NULL,
    "city" character varying NOT NULL,
    "province" character varying NOT NULL,
    "postal_code" character varying NOT NULL,
    "country" character varying NOT NULL,
    "phone_number" character varying NOT NULL,
    "user_id" "uuid" NOT NULL,
    "barangay" character varying NOT NULL,
    "label" "text" NOT NULL,
    "_default" boolean DEFAULT false NOT NULL
);

ALTER TABLE "public"."delivery_addresses" OWNER TO "postgres";

ALTER TABLE "public"."delivery_addresses" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."delivery_addresses_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE "public"."delivery_statuses" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "name" "text" DEFAULT 'order_placed'::"text" NOT NULL,
    "description" "text",
    "color_scheme" "text" DEFAULT 'gray'::"text" NOT NULL,
    "Name" "text"
);

ALTER TABLE "public"."delivery_statuses" OWNER TO "postgres";

ALTER TABLE "public"."delivery_statuses" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."delivery_statuses_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE "public"."messages" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "title" character varying NOT NULL,
    "description" character varying NOT NULL
);

ALTER TABLE "public"."messages" OWNER TO "postgres";

ALTER TABLE "public"."messages" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."messages_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE "public"."orders" (
    "id" bigint NOT NULL,
    "order_date" timestamp with time zone DEFAULT "now"() NOT NULL,
    "fulfillment_date" timestamp with time zone,
    "status" bigint,
    "delivery_address" bigint NOT NULL,
    "merchandise_subtotal" double precision NOT NULL,
    "note" character varying,
    "payment_option" bigint NOT NULL,
    "payment_status" bigint DEFAULT '1'::bigint NOT NULL,
    "products" "json",
    "shipping_fee" double precision NOT NULL,
    "total_payment" double precision NOT NULL,
    "total_payment_discounted" double precision NOT NULL,
    "user_id" "uuid" NOT NULL,
    "voucher" bigint,
    CONSTRAINT "check_products" CHECK ("public"."json_matches_schema"('
  {
    "type": "object",
    "properties": {
      "products": {
        "type": "array",
        "items": [
          {
            "type": "object",
            "properties": {
              "product_id": {
                "type": "integer"
              },
              "quantity": {
                "type": "integer"
              }
            },
            "required": [
              "product_id",
              "quantity"
            ]
          }
        ]
      }
    },
    "required": [
      "products"
    ]
  }'::"json", "products"))
);

ALTER TABLE "public"."orders" OWNER TO "postgres";

ALTER TABLE "public"."orders" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."orders_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE "public"."orders_status" (
    "id" bigint NOT NULL,
    "order_placed" timestamp with time zone DEFAULT "now"() NOT NULL,
    "approved" timestamp with time zone,
    "preparing_to_ship" timestamp with time zone,
    "in_transit" timestamp with time zone,
    "out_for_delivery" timestamp with time zone,
    "delivered" timestamp with time zone,
    "delivery_unsuccessful" timestamp with time zone,
    "cancelled" timestamp with time zone,
    "order_id" bigint NOT NULL,
    "delivery_hub" timestamp with time zone
);

ALTER TABLE "public"."orders_status" OWNER TO "postgres";

ALTER TABLE "public"."orders_status" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."orders_status_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE "public"."payment_options" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "full_name" "text" NOT NULL,
    "short_name" "text" NOT NULL,
    "enabled" boolean DEFAULT false
);

ALTER TABLE "public"."payment_options" OWNER TO "postgres";

ALTER TABLE "public"."payment_options" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."payment_options_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE "public"."payment_statuses" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "color_scheme" "text" DEFAULT 'gray'::"text" NOT NULL
);

ALTER TABLE "public"."payment_statuses" OWNER TO "postgres";

ALTER TABLE "public"."payment_statuses" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."payment_statuses_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE SEQUENCE "public"."products_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."products_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."products_id_seq" OWNED BY "public"."products"."id";

ALTER TABLE "public"."products" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."products_id_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE "public"."products_media" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "url" "text" NOT NULL,
    "product_id" integer NOT NULL,
    "mime_type" "text" NOT NULL
);

ALTER TABLE "public"."products_media" OWNER TO "postgres";

ALTER TABLE "public"."products_media" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."products_media_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE "public"."profiles" (
    "id" "uuid" NOT NULL,
    "updated_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text"),
    "username" "text",
    "full_name" "text",
    "avatar_url" "text",
    "website" "text",
    "gender" character varying,
    "date_of_birth" "date",
    "phone_number" character varying(11),
    "email" "text",
    CONSTRAINT "username_length" CHECK (("char_length"("username") >= 3))
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

CREATE TABLE "public"."recently_viewed" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "product_id" integer NOT NULL,
    "user_id" "uuid" NOT NULL
);

ALTER TABLE "public"."recently_viewed" OWNER TO "postgres";

ALTER TABLE "public"."recently_viewed" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."recently_viewed_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE "public"."reviews" (
    "id" bigint NOT NULL,
    "review_date" timestamp with time zone DEFAULT "now"() NOT NULL,
    "product_id" integer NOT NULL,
    "user_id" "uuid" NOT NULL,
    "product_rating" bigint NOT NULL,
    "comment" character varying,
    "delivery_rating" bigint NOT NULL,
    "order_id" bigint,
    "downvote" bigint DEFAULT '0'::bigint,
    "upvote" bigint DEFAULT '0'::bigint
);

ALTER TABLE "public"."reviews" OWNER TO "postgres";

ALTER TABLE "public"."reviews" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."reviews_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE "public"."sales" (
    "id" integer NOT NULL,
    "quantity_sold" integer NOT NULL,
    "sale_date" timestamp without time zone NOT NULL,
    "order_id" bigint,
    "product_id" integer,
    "user_id" "uuid"
);

ALTER TABLE "public"."sales" OWNER TO "postgres";

CREATE SEQUENCE "public"."sales_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."sales_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."sales_id_seq" OWNED BY "public"."sales"."id";

ALTER TABLE ONLY "public"."sales" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."sales_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."brands"
    ADD CONSTRAINT "brands_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."cards_error"
    ADD CONSTRAINT "cards_error_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."cards"
    ADD CONSTRAINT "cards_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."cart"
    ADD CONSTRAINT "cart_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."coupons"
    ADD CONSTRAINT "coupons_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."delivery_statuses"
    ADD CONSTRAINT "delivery_statuses_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."orders_status"
    ADD CONSTRAINT "orders_status_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."payment_options"
    ADD CONSTRAINT "payment_options_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."payment_statuses"
    ADD CONSTRAINT "payment_statuses_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."products_media"
    ADD CONSTRAINT "products_media_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_username_key" UNIQUE ("username");

ALTER TABLE ONLY "public"."recently_viewed"
    ADD CONSTRAINT "recently_viewed_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."reviews"
    ADD CONSTRAINT "reviews_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."sales"
    ADD CONSTRAINT "sales_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."delivery_addresses"
    ADD CONSTRAINT "shipping_info_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."reviews"
    ADD CONSTRAINT "unique_product_per_order" UNIQUE ("product_id", "order_id");

ALTER TABLE ONLY "public"."recently_viewed"
    ADD CONSTRAINT "unique_product_per_user" UNIQUE ("product_id", "user_id");

ALTER TABLE ONLY "public"."cards"
    ADD CONSTRAINT "cards_testing_fkey" FOREIGN KEY ("testing") REFERENCES "public"."cards_error"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."cards"
    ADD CONSTRAINT "cards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id");

ALTER TABLE ONLY "public"."cart"
    ADD CONSTRAINT "cart_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."cart"
    ADD CONSTRAINT "cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."delivery_addresses"
    ADD CONSTRAINT "delivery_addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id");

ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_delivery_address_fkey" FOREIGN KEY ("delivery_address") REFERENCES "public"."delivery_addresses"("id");

ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_payment_option_fkey" FOREIGN KEY ("payment_option") REFERENCES "public"."payment_options"("id");

ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_payment_status_fkey" FOREIGN KEY ("payment_status") REFERENCES "public"."payment_statuses"("id");

ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_status_fkey" FOREIGN KEY ("status") REFERENCES "public"."orders_status"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."orders_status"
    ADD CONSTRAINT "orders_status_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id");

ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_voucher_fkey" FOREIGN KEY ("voucher") REFERENCES "public"."coupons"("id");

ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id");

ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id");

ALTER TABLE ONLY "public"."products_media"
    ADD CONSTRAINT "products_media_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."recently_viewed"
    ADD CONSTRAINT "recently_viewed_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id");

ALTER TABLE ONLY "public"."recently_viewed"
    ADD CONSTRAINT "recently_viewed_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id");

ALTER TABLE ONLY "public"."reviews"
    ADD CONSTRAINT "reviews_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id");

ALTER TABLE ONLY "public"."reviews"
    ADD CONSTRAINT "reviews_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."reviews"
    ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."sales"
    ADD CONSTRAINT "sales_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."sales"
    ADD CONSTRAINT "sales_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id");

ALTER TABLE ONLY "public"."sales"
    ADD CONSTRAINT "sales_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE SET NULL;

CREATE POLICY "Enable insert for authenticated users only" ON "public"."orders" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."brands" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."delivery_addresses" FOR SELECT USING (true);

CREATE POLICY "Public profiles are viewable by everyone." ON "public"."profiles" FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON "public"."profiles" FOR INSERT WITH CHECK (("auth"."uid"() = "id"));

CREATE POLICY "Users can update own profile." ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id"));

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."calculate_average_rating"("product_id" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."calculate_average_rating"("product_id" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."calculate_average_rating"("product_id" integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."get_average_rating"("product_id" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."get_average_rating"("product_id" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_average_rating"("product_id" integer) TO "service_role";

GRANT ALL ON TABLE "public"."products" TO "anon";
GRANT ALL ON TABLE "public"."products" TO "authenticated";
GRANT ALL ON TABLE "public"."products" TO "service_role";

GRANT ALL ON FUNCTION "public"."get_product"("user_id" "uuid", "product_id" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."get_product"("user_id" "uuid", "product_id" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_product"("user_id" "uuid", "product_id" integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."get_product_review_stats"("product_id" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."get_product_review_stats"("product_id" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_product_review_stats"("product_id" integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."get_smartwatches"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_smartwatches"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_smartwatches"() TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."json_matches_schema"("schema" "json", "instance" "json") TO "postgres";
GRANT ALL ON FUNCTION "public"."json_matches_schema"("schema" "json", "instance" "json") TO "anon";
GRANT ALL ON FUNCTION "public"."json_matches_schema"("schema" "json", "instance" "json") TO "authenticated";
GRANT ALL ON FUNCTION "public"."json_matches_schema"("schema" "json", "instance" "json") TO "service_role";

GRANT ALL ON FUNCTION "public"."jsonb_matches_schema"("schema" "json", "instance" "jsonb") TO "postgres";
GRANT ALL ON FUNCTION "public"."jsonb_matches_schema"("schema" "json", "instance" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."jsonb_matches_schema"("schema" "json", "instance" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."jsonb_matches_schema"("schema" "json", "instance" "jsonb") TO "service_role";

GRANT ALL ON TABLE "public"."brands" TO "anon";
GRANT ALL ON TABLE "public"."brands" TO "authenticated";
GRANT ALL ON TABLE "public"."brands" TO "service_role";

GRANT ALL ON SEQUENCE "public"."brands_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."brands_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."brands_id_seq" TO "service_role";

GRANT ALL ON SEQUENCE "public"."brands_id_seq1" TO "anon";
GRANT ALL ON SEQUENCE "public"."brands_id_seq1" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."brands_id_seq1" TO "service_role";

GRANT ALL ON TABLE "public"."cards" TO "anon";
GRANT ALL ON TABLE "public"."cards" TO "authenticated";
GRANT ALL ON TABLE "public"."cards" TO "service_role";

GRANT ALL ON TABLE "public"."cards_error" TO "anon";
GRANT ALL ON TABLE "public"."cards_error" TO "authenticated";
GRANT ALL ON TABLE "public"."cards_error" TO "service_role";

GRANT ALL ON SEQUENCE "public"."cards_error_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."cards_error_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."cards_error_id_seq" TO "service_role";

GRANT ALL ON SEQUENCE "public"."cards_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."cards_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."cards_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."cart" TO "anon";
GRANT ALL ON TABLE "public"."cart" TO "authenticated";
GRANT ALL ON TABLE "public"."cart" TO "service_role";

GRANT ALL ON SEQUENCE "public"."cart_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."cart_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."cart_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."categories" TO "anon";
GRANT ALL ON TABLE "public"."categories" TO "authenticated";
GRANT ALL ON TABLE "public"."categories" TO "service_role";

GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "service_role";

GRANT ALL ON SEQUENCE "public"."categories_id_seq1" TO "anon";
GRANT ALL ON SEQUENCE "public"."categories_id_seq1" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."categories_id_seq1" TO "service_role";

GRANT ALL ON TABLE "public"."coupons" TO "anon";
GRANT ALL ON TABLE "public"."coupons" TO "authenticated";
GRANT ALL ON TABLE "public"."coupons" TO "service_role";

GRANT ALL ON SEQUENCE "public"."coupons_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."coupons_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."coupons_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."delivery_addresses" TO "anon";
GRANT ALL ON TABLE "public"."delivery_addresses" TO "authenticated";
GRANT ALL ON TABLE "public"."delivery_addresses" TO "service_role";

GRANT ALL ON SEQUENCE "public"."delivery_addresses_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."delivery_addresses_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."delivery_addresses_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."delivery_statuses" TO "anon";
GRANT ALL ON TABLE "public"."delivery_statuses" TO "authenticated";
GRANT ALL ON TABLE "public"."delivery_statuses" TO "service_role";

GRANT ALL ON SEQUENCE "public"."delivery_statuses_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."delivery_statuses_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."delivery_statuses_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."messages" TO "anon";
GRANT ALL ON TABLE "public"."messages" TO "authenticated";
GRANT ALL ON TABLE "public"."messages" TO "service_role";

GRANT ALL ON SEQUENCE "public"."messages_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."messages_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."messages_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."orders" TO "anon";
GRANT ALL ON TABLE "public"."orders" TO "authenticated";
GRANT ALL ON TABLE "public"."orders" TO "service_role";

GRANT ALL ON SEQUENCE "public"."orders_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."orders_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."orders_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."orders_status" TO "anon";
GRANT ALL ON TABLE "public"."orders_status" TO "authenticated";
GRANT ALL ON TABLE "public"."orders_status" TO "service_role";

GRANT ALL ON SEQUENCE "public"."orders_status_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."orders_status_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."orders_status_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."payment_options" TO "anon";
GRANT ALL ON TABLE "public"."payment_options" TO "authenticated";
GRANT ALL ON TABLE "public"."payment_options" TO "service_role";

GRANT ALL ON SEQUENCE "public"."payment_options_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."payment_options_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."payment_options_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."payment_statuses" TO "anon";
GRANT ALL ON TABLE "public"."payment_statuses" TO "authenticated";
GRANT ALL ON TABLE "public"."payment_statuses" TO "service_role";

GRANT ALL ON SEQUENCE "public"."payment_statuses_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."payment_statuses_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."payment_statuses_id_seq" TO "service_role";

GRANT ALL ON SEQUENCE "public"."products_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."products_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."products_id_seq" TO "service_role";

GRANT ALL ON SEQUENCE "public"."products_id_seq1" TO "anon";
GRANT ALL ON SEQUENCE "public"."products_id_seq1" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."products_id_seq1" TO "service_role";

GRANT ALL ON TABLE "public"."products_media" TO "anon";
GRANT ALL ON TABLE "public"."products_media" TO "authenticated";
GRANT ALL ON TABLE "public"."products_media" TO "service_role";

GRANT ALL ON SEQUENCE "public"."products_media_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."products_media_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."products_media_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

GRANT ALL ON TABLE "public"."recently_viewed" TO "anon";
GRANT ALL ON TABLE "public"."recently_viewed" TO "authenticated";
GRANT ALL ON TABLE "public"."recently_viewed" TO "service_role";

GRANT ALL ON SEQUENCE "public"."recently_viewed_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."recently_viewed_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."recently_viewed_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."reviews" TO "anon";
GRANT ALL ON TABLE "public"."reviews" TO "authenticated";
GRANT ALL ON TABLE "public"."reviews" TO "service_role";

GRANT ALL ON SEQUENCE "public"."reviews_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."reviews_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."reviews_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."sales" TO "anon";
GRANT ALL ON TABLE "public"."sales" TO "authenticated";
GRANT ALL ON TABLE "public"."sales" TO "service_role";

GRANT ALL ON SEQUENCE "public"."sales_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."sales_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."sales_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
