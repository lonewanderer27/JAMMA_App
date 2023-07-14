create table "public"."superchats_reports" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone default now(),
    "profile" uuid,
    "superchat" bigint,
    "reason" text not null,
    "description" text
);


alter table "public"."superchats_reports" enable row level security;

create table "public"."superchats_votes" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone default now(),
    "superchat" bigint not null,
    "profile" uuid not null,
    "vote" double precision not null default '1'::double precision
);


alter table "public"."superchats_votes" enable row level security;

alter table "public"."superchats" drop column "downvote";

alter table "public"."superchats" drop column "reports";

alter table "public"."superchats" drop column "upvote";

alter table "public"."superchats" add column "deleted" boolean not null default false;

CREATE UNIQUE INDEX superchats_likes_pkey ON public.superchats_votes USING btree (id);

CREATE UNIQUE INDEX superchats_reports_pkey ON public.superchats_reports USING btree (id);

alter table "public"."superchats_reports" add constraint "superchats_reports_pkey" PRIMARY KEY using index "superchats_reports_pkey";

alter table "public"."superchats_votes" add constraint "superchats_likes_pkey" PRIMARY KEY using index "superchats_likes_pkey";

alter table "public"."superchats_reports" add constraint "superchats_reports_profile_fkey" FOREIGN KEY (profile) REFERENCES profiles(id) ON DELETE SET NULL not valid;

alter table "public"."superchats_reports" validate constraint "superchats_reports_profile_fkey";

alter table "public"."superchats_reports" add constraint "superchats_reports_superchat_fkey" FOREIGN KEY (superchat) REFERENCES superchats(id) ON DELETE RESTRICT not valid;

alter table "public"."superchats_reports" validate constraint "superchats_reports_superchat_fkey";

alter table "public"."superchats_votes" add constraint "superchats_votes_profile_fkey" FOREIGN KEY (profile) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."superchats_votes" validate constraint "superchats_votes_profile_fkey";

alter table "public"."superchats_votes" add constraint "superchats_votes_superchat_fkey" FOREIGN KEY (superchat) REFERENCES superchats(id) ON DELETE CASCADE not valid;

alter table "public"."superchats_votes" validate constraint "superchats_votes_superchat_fkey";

create policy "Enable delete for users based on user_id"
on "public"."superchats"
as permissive
for delete
to public
using ((auth.uid() = profile));


create policy "Enable update for users based on user_id"
on "public"."superchats"
as permissive
for update
to public
using ((auth.uid() = profile))
with check ((auth.uid() = profile));


create policy "Enable insert for authenticated users only"
on "public"."superchats_reports"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."superchats_reports"
as permissive
for select
to public
using (true);


create policy "Enable insert for authenticated users only"
on "public"."superchats_votes"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."superchats_votes"
as permissive
for select
to public
using (true);


