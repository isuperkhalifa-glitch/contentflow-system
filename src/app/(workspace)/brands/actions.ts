"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import { createClient } from "@/lib/supabase/server"

const brandSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "اسم البراند يجب أن يكون حرفين على الأقل")
    .max(80, "اسم البراند طويل جدًا"),
  slug: z
    .string()
    .trim()
    .max(80, "الرابط المختصر طويل جدًا")
    .optional(),
  description: z
    .string()
    .trim()
    .max(500, "الوصف يجب ألا يتجاوز 500 حرف")
    .optional(),
  websiteUrl: z
    .string()
    .trim()
    .url("رابط الموقع غير صحيح")
    .or(z.literal("")),
  primaryColor: z
    .string()
    .trim()
    .regex(/^#[0-9a-fA-F]{6}$/, "اكتب اللون بصيغة #000000"),
  secondaryColor: z
    .string()
    .trim()
    .regex(/^#[0-9a-fA-F]{6}$/, "اكتب اللون بصيغة #000000"),
  toneOfVoice: z
    .string()
    .trim()
    .max(240, "نبرة التواصل يجب ألا تتجاوز 240 حرف")
    .optional(),
})

export type BrandActionState = {
  status: "idle" | "success" | "error"
  message: string
  fieldErrors?: Record<string, string[]>
}

function normalizeSlug(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

export async function createBrandAction(
  _previousState: BrandActionState,
  formData: FormData
): Promise<BrandActionState> {
  const parsed = brandSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug") || undefined,
    description: formData.get("description") || undefined,
    websiteUrl: formData.get("websiteUrl") || "",
    primaryColor: formData.get("primaryColor") || "#0f172a",
    secondaryColor: formData.get("secondaryColor") || "#e2e8f0",
    toneOfVoice: formData.get("toneOfVoice") || undefined,
  })

  if (!parsed.success) {
    return {
      status: "error",
      message: "راجع الحقول المطلوبة ثم حاول مرة أخرى.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    }
  }

  const supabase = await createClient()
  const { data: claimsData, error: claimsError } =
    await supabase.auth.getClaims()
  const userId = claimsData?.claims?.sub

  if (claimsError || !userId) {
    return {
      status: "error",
      message: "انتهت جلسة الدخول. سجّل الدخول مرة أخرى.",
    }
  }

  const slugSource = parsed.data.slug || parsed.data.name
  const slug = normalizeSlug(slugSource) || `brand-${Date.now()}`

  const { error } = await supabase.from("brands").insert({
    name: parsed.data.name,
    slug,
    description: parsed.data.description || null,
    website_url: parsed.data.websiteUrl || null,
    primary_color: parsed.data.primaryColor,
    secondary_color: parsed.data.secondaryColor,
    tone_of_voice: parsed.data.toneOfVoice || null,
    created_by: userId,
  })

  if (error) {
    if (error.code === "23505") {
      return {
        status: "error",
        message: "الرابط المختصر مستخدم بالفعل. اختر رابطًا مختلفًا.",
      }
    }

    if (error.code === "42501") {
      return {
        status: "error",
        message: "صلاحيتك الحالية لا تسمح بإضافة براند جديد.",
      }
    }

    return {
      status: "error",
      message: "تعذر حفظ البراند الآن. حاول مرة أخرى.",
    }
  }

  revalidatePath("/brands")
  revalidatePath("/dashboard")

  return {
    status: "success",
    message: "تمت إضافة البراند بنجاح.",
  }
}
