export interface Influencer {
  id: string;
  name: string;
  slug: string;
  instagram_followers?: number;
  tiktok_followers?: number;
  youtube_followers?: number;
  twitter_followers?: number;
  facebook_followers?: number;
  bio?: string;
  profile_image_url?: string;
  gallery_images?: string[];
  created_at: string;
  updated_at: string;
}

export interface InfluencerFormData {
  name: string;
  slug: string;
  instagram_followers?: number;
  tiktok_followers?: number;
  youtube_followers?: number;
  twitter_followers?: number;
  facebook_followers?: number;
  bio?: string;
  profile_image_url?: string;
  gallery_images?: string[];
} 