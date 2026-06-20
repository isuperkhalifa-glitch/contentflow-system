export type AppRole =
  | "system_developer"
  | "administrator"
  | "content_manager"
  | "creative_director"
  | "content_writer"
  | "designer"
  | "video_editor"
  | "performance_marketer"
  | "client_reviewer"

export type UserStatus = "active" | "invited" | "suspended"

export type ContentStatus =
  | "request"
  | "briefing"
  | "idea"
  | "writing"
  | "design"
  | "editing"
  | "internal_review"
  | "client_review"
  | "revision"
  | "approved"
  | "scheduled"
  | "published"
  | "archived"

export type ContentPriority = "low" | "normal" | "high" | "urgent"

export type ContentFormat =
  | "post"
  | "carousel"
  | "story"
  | "reel"
  | "video"
  | "article"
  | "email"
  | "landing_page"
  | "ad"
  | "other"

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Profile = {
  id: string
  email: string
  full_name: string
  avatar_url: string | null
  role: AppRole
  status: UserStatus
  phone: string | null
  job_title: string | null
  created_at: string
  updated_at: string
}

export type Brand = {
  id: string
  name: string
  slug: string
  description: string | null
  logo_url: string | null
  website_url: string | null
  primary_color: string | null
  secondary_color: string | null
  tone_of_voice: string | null
  guidelines: Json
  is_active: boolean
  created_by: string | null
  created_at: string
  updated_at: string
}

export type ContentRequest = {
  id: string
  request_code: string
  title: string
  description: string | null
  brand_id: string | null
  requester_id: string
  assigned_manager_id: string | null
  priority: ContentPriority
  desired_publish_at: string | null
  status: ContentStatus
  brief: Json
  attachments: Json
  created_at: string
  updated_at: string
}

export type ContentItem = {
  id: string
  content_code: string
  title: string
  description: string | null
  brand_id: string | null
  request_id: string | null
  format: ContentFormat
  status: ContentStatus
  priority: ContentPriority
  objective: string | null
  platform: string | null
  campaign: string | null
  hook: string | null
  body_copy: string | null
  call_to_action: string | null
  brief: Json
  references: Json
  final_assets: Json
  created_by: string
  content_writer_id: string | null
  designer_id: string | null
  reviewer_id: string | null
  due_at: string | null
  scheduled_at: string | null
  published_at: string | null
  archived_at: string | null
  created_at: string
  updated_at: string
}

export type ContentComment = {
  id: string
  content_id: string
  author_id: string
  body: string
  is_internal: boolean
  parent_id: string | null
  created_at: string
  updated_at: string
}

export type ContentStatusHistory = {
  id: string
  content_id: string
  from_status: ContentStatus | null
  to_status: ContentStatus
  changed_by: string
  note: string | null
  created_at: string
}
