CREATE TABLE "answer_option" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_item_id" uuid NOT NULL,
	"group_key" text,
	"side" text,
	"text" text NOT NULL,
	"is_correct" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "block" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"blocked_user_id" uuid NOT NULL,
	"kurs_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "consent_token" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parent_child_link_id" uuid NOT NULL,
	"token_hash" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"used_at" timestamp with time zone,
	"reminder_sent_count" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "consent_token_token_hash_unique" UNIQUE("token_hash")
);
--> statement-breakpoint
CREATE TABLE "content_item" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"thema_id" uuid NOT NULL,
	"type" text NOT NULL,
	"prompt" text NOT NULL,
	"explanation" text,
	"payload" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"difficulty" text DEFAULT 'mittel' NOT NULL,
	"is_premium" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"current_version" integer DEFAULT 1 NOT NULL,
	"created_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content_item_tag" (
	"content_item_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	CONSTRAINT "content_item_tag_content_item_id_tag_id_pk" PRIMARY KEY("content_item_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "content_item_version" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_item_id" uuid NOT NULL,
	"version_number" integer NOT NULL,
	"prompt" text NOT NULL,
	"explanation" text,
	"payload" jsonb NOT NULL,
	"changed_by" uuid,
	"change_note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exam_answer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"exam_session_id" uuid NOT NULL,
	"content_item_version_id" uuid NOT NULL,
	"given_answer" jsonb NOT NULL,
	"is_correct" boolean,
	"points" real
);
--> statement-breakpoint
CREATE TABLE "exam_session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"kurs_id" uuid NOT NULL,
	"mode" text NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"finished_at" timestamp with time zone,
	"score" real
);
--> statement-breakpoint
CREATE TABLE "fachgebiet" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"kurs_id" uuid NOT NULL,
	"code" text NOT NULL,
	"title" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "kurs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"type" text NOT NULL,
	"title" text NOT NULL,
	"locale" varchar(5) DEFAULT 'de' NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"target_mode" text DEFAULT 'einzeltermin' NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "kurs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "parent" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" "citext" NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "parent_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "parent_child_link" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parent_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"consent_status" text DEFAULT 'pending' NOT NULL,
	"consented_at" timestamp with time zone,
	"revoked_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "report" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reporter_user_id" uuid,
	"reported_user_id" uuid,
	"kurs_id" uuid NOT NULL,
	"reason" text NOT NULL,
	"status" text DEFAULT 'offen' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"parent_id" uuid,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "session_exactly_one_principal_check" CHECK (num_nonnulls("session"."user_id", "session"."parent_id") = 1)
);
--> statement-breakpoint
CREATE TABLE "tag" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "tag_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "thema" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fachgebiet_id" uuid NOT NULL,
	"title" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" "citext" NOT NULL,
	"password_hash" text NOT NULL,
	"role" text DEFAULT 'learner' NOT NULL,
	"birth_date" date,
	"is_minor" boolean NOT NULL,
	"email_verified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_role_check" CHECK ("user"."role" in ('learner', 'content_editor', 'admin'))
);
--> statement-breakpoint
CREATE TABLE "user_course" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"kurs_id" uuid NOT NULL,
	"target_date" date,
	"plan_start_date" date,
	"joined_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"content_item_id" uuid NOT NULL,
	"difficulty" real NOT NULL,
	"stability" real NOT NULL,
	"state" text NOT NULL,
	"due_at" timestamp with time zone NOT NULL,
	"last_reviewed_at" timestamp with time zone,
	"last_result" text,
	"reps" integer DEFAULT 0 NOT NULL,
	"lapses" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "answer_option" ADD CONSTRAINT "answer_option_content_item_id_content_item_id_fk" FOREIGN KEY ("content_item_id") REFERENCES "public"."content_item"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "block" ADD CONSTRAINT "block_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "block" ADD CONSTRAINT "block_blocked_user_id_user_id_fk" FOREIGN KEY ("blocked_user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "block" ADD CONSTRAINT "block_kurs_id_kurs_id_fk" FOREIGN KEY ("kurs_id") REFERENCES "public"."kurs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consent_token" ADD CONSTRAINT "consent_token_parent_child_link_id_parent_child_link_id_fk" FOREIGN KEY ("parent_child_link_id") REFERENCES "public"."parent_child_link"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_item" ADD CONSTRAINT "content_item_thema_id_thema_id_fk" FOREIGN KEY ("thema_id") REFERENCES "public"."thema"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_item" ADD CONSTRAINT "content_item_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_item_tag" ADD CONSTRAINT "content_item_tag_content_item_id_content_item_id_fk" FOREIGN KEY ("content_item_id") REFERENCES "public"."content_item"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_item_tag" ADD CONSTRAINT "content_item_tag_tag_id_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_item_version" ADD CONSTRAINT "content_item_version_content_item_id_content_item_id_fk" FOREIGN KEY ("content_item_id") REFERENCES "public"."content_item"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_item_version" ADD CONSTRAINT "content_item_version_changed_by_user_id_fk" FOREIGN KEY ("changed_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exam_answer" ADD CONSTRAINT "exam_answer_exam_session_id_exam_session_id_fk" FOREIGN KEY ("exam_session_id") REFERENCES "public"."exam_session"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exam_answer" ADD CONSTRAINT "exam_answer_content_item_version_id_content_item_version_id_fk" FOREIGN KEY ("content_item_version_id") REFERENCES "public"."content_item_version"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exam_session" ADD CONSTRAINT "exam_session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exam_session" ADD CONSTRAINT "exam_session_kurs_id_kurs_id_fk" FOREIGN KEY ("kurs_id") REFERENCES "public"."kurs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fachgebiet" ADD CONSTRAINT "fachgebiet_kurs_id_kurs_id_fk" FOREIGN KEY ("kurs_id") REFERENCES "public"."kurs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parent_child_link" ADD CONSTRAINT "parent_child_link_parent_id_parent_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."parent"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parent_child_link" ADD CONSTRAINT "parent_child_link_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report" ADD CONSTRAINT "report_reporter_user_id_user_id_fk" FOREIGN KEY ("reporter_user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report" ADD CONSTRAINT "report_reported_user_id_user_id_fk" FOREIGN KEY ("reported_user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report" ADD CONSTRAINT "report_kurs_id_kurs_id_fk" FOREIGN KEY ("kurs_id") REFERENCES "public"."kurs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_parent_id_parent_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."parent"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "thema" ADD CONSTRAINT "thema_fachgebiet_id_fachgebiet_id_fk" FOREIGN KEY ("fachgebiet_id") REFERENCES "public"."fachgebiet"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_course" ADD CONSTRAINT "user_course_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_course" ADD CONSTRAINT "user_course_kurs_id_kurs_id_fk" FOREIGN KEY ("kurs_id") REFERENCES "public"."kurs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_content_item_id_content_item_id_fk" FOREIGN KEY ("content_item_id") REFERENCES "public"."content_item"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "answer_option_content_item_id_idx" ON "answer_option" USING btree ("content_item_id");--> statement-breakpoint
CREATE UNIQUE INDEX "block_user_id_blocked_user_id_kurs_id_key" ON "block" USING btree ("user_id","blocked_user_id","kurs_id");--> statement-breakpoint
CREATE INDEX "consent_token_expires_at_idx" ON "consent_token" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "content_item_thema_id_active_idx" ON "content_item" USING btree ("thema_id") WHERE "content_item"."is_active";--> statement-breakpoint
CREATE UNIQUE INDEX "content_item_version_content_item_id_version_number_key" ON "content_item_version" USING btree ("content_item_id","version_number");--> statement-breakpoint
CREATE INDEX "exam_answer_exam_session_id_idx" ON "exam_answer" USING btree ("exam_session_id");--> statement-breakpoint
CREATE INDEX "exam_session_user_id_kurs_id_idx" ON "exam_session" USING btree ("user_id","kurs_id");--> statement-breakpoint
CREATE UNIQUE INDEX "fachgebiet_kurs_id_code_key" ON "fachgebiet" USING btree ("kurs_id","code");--> statement-breakpoint
CREATE INDEX "fachgebiet_kurs_id_sort_order_idx" ON "fachgebiet" USING btree ("kurs_id","sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX "parent_child_link_parent_id_user_id_key" ON "parent_child_link" USING btree ("parent_id","user_id");--> statement-breakpoint
CREATE INDEX "session_user_id_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_parent_id_idx" ON "session" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "thema_fachgebiet_id_sort_order_idx" ON "thema" USING btree ("fachgebiet_id","sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX "user_course_user_id_kurs_id_key" ON "user_course" USING btree ("user_id","kurs_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_progress_user_id_content_item_id_key" ON "user_progress" USING btree ("user_id","content_item_id");--> statement-breakpoint
CREATE INDEX "user_progress_user_id_due_at_idx" ON "user_progress" USING btree ("user_id","due_at");