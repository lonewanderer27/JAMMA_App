create table "public"."superchats" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "upvote" double precision not null default '0'::double precision,
    "downvote" double precision not null default '0'::double precision,
    "reports" double precision not null default '0'::double precision,
    "product" integer,
    "profile" uuid,
    "message" text not null
);


alter table "public"."superchats" enable row level security;

CREATE UNIQUE INDEX superchats_pkey ON public.superchats USING btree (id);

alter table "public"."superchats" add constraint "superchats_pkey" PRIMARY KEY using index "superchats_pkey";

alter table "public"."superchats" add constraint "superchats_product_fkey" FOREIGN KEY (product) REFERENCES products(id) ON DELETE SET NULL not valid;

alter table "public"."superchats" validate constraint "superchats_product_fkey";

alter table "public"."superchats" add constraint "superchats_profile_fkey" FOREIGN KEY (profile) REFERENCES profiles(id) ON DELETE SET NULL not valid;

alter table "public"."superchats" validate constraint "superchats_profile_fkey";

create policy "Enable insert for all users including anon"
on "public"."superchats"
as permissive
for insert
to anon, authenticated
with check (true);


create policy "Enable read access for all users as well as anon users"
on "public"."superchats"
as permissive
for select
to anon, authenticated
using (true);



