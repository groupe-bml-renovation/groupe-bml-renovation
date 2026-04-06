/*
  # Remove Unused Indexes
  
  1. Changes
    - Drop 29 unused indexes that were identified as not being used in the application
    - These indexes consume storage and slow down writes without providing query benefits
    - All these indexes are on blog, chat, financing, knowledge, chatbot, and website tables
*/

DROP INDEX IF EXISTS public.idx_blog_categories_slug;
DROP INDEX IF EXISTS public.idx_blog_posts_slug;
DROP INDEX IF EXISTS public.idx_blog_posts_category;
DROP INDEX IF EXISTS public.idx_blog_posts_published_at;
DROP INDEX IF EXISTS public.idx_blog_post_categories_category_id;
DROP INDEX IF EXISTS public.idx_blog_post_tags_tag_id;
DROP INDEX IF EXISTS public.idx_chat_messages_created_at;
DROP INDEX IF EXISTS public.financing_simulations_created_at_idx;
DROP INDEX IF EXISTS public.financing_simulations_status_idx;
DROP INDEX IF EXISTS public.work_types_category_order_idx;
DROP INDEX IF EXISTS public.work_types_active_idx;
DROP INDEX IF EXISTS public.financing_simulations_email_idx;
DROP INDEX IF EXISTS public.idx_website_pages_slug;
DROP INDEX IF EXISTS public.idx_website_pages_type;
DROP INDEX IF EXISTS public.idx_website_services_slug;
DROP INDEX IF EXISTS public.idx_website_services_category;
DROP INDEX IF EXISTS public.idx_page_services_page;
DROP INDEX IF EXISTS public.idx_page_services_service;
DROP INDEX IF EXISTS public.idx_company_info_key;
DROP INDEX IF EXISTS public.idx_knowledge_keywords;
DROP INDEX IF EXISTS public.idx_knowledge_category;
DROP INDEX IF EXISTS public.idx_knowledge_content_type;
DROP INDEX IF EXISTS public.idx_knowledge_slug;
DROP INDEX IF EXISTS public.idx_knowledge_is_active;
DROP INDEX IF EXISTS public.idx_intents_pattern;
DROP INDEX IF EXISTS public.idx_intents_knowledge;
DROP INDEX IF EXISTS public.idx_analytics_conversation;
DROP INDEX IF EXISTS public.idx_analytics_knowledge;
DROP INDEX IF EXISTS public.idx_chat_conversations_avatar_type;