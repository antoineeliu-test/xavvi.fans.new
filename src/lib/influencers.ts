import { createServerSupabaseClient } from './supabase-server';
import { supabase } from './supabase';
import { Influencer, InfluencerFormData } from '@/types';

export async function getAllInfluencers(): Promise<Influencer[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('influencers')
      .select('*');
      
    if (error) {
      console.error('Error fetching influencers:', error);
      throw new Error('Failed to fetch influencers');
    }
    
    // Sort influencers by total follower count (descending)
    const sortedData = data.sort((a, b) => {
      const getTotalFollowers = (influencer: Influencer) => {
        return (influencer.instagram_followers || 0) +
               (influencer.tiktok_followers || 0) +
               (influencer.youtube_followers || 0) +
               (influencer.twitter_followers || 0) +
               (influencer.facebook_followers || 0);
      };
      
      return getTotalFollowers(b) - getTotalFollowers(a);
    });
    
    return sortedData;
  } catch (error) {
    console.error('Error in getAllInfluencers:', error);
    // Return empty array instead of throwing to prevent page crashes
    return [];
  }
}

export async function getInfluencerBySlug(slug: string): Promise<Influencer | null> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('influencers')
      .select('*')
      .eq('slug', slug)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        // PGRST116 error code means no rows were returned
        return null;
      }
      
      console.error(`Error fetching influencer with slug ${slug}:`, error);
      throw new Error('Failed to fetch influencer');
    }
    
    return data;
  } catch (error) {
    console.error(`Error in getInfluencerBySlug for slug ${slug}:`, error);
    return null;
  }
}

export async function getInfluencerById(id: string): Promise<Influencer | null> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('influencers')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        // PGRST116 error code means no rows were returned
        return null;
      }
      
      console.error(`Error fetching influencer with id ${id}:`, error);
      throw new Error('Failed to fetch influencer');
    }
    
    return data;
  } catch (error) {
    console.error(`Error in getInfluencerById for id ${id}:`, error);
    return null;
  }
}

export async function createInfluencer(influencerData: InfluencerFormData): Promise<Influencer> {
  const { data, error } = await supabase
    .from('influencers')
    .insert([{ ...influencerData }])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating influencer:', error);
    throw new Error('Failed to create influencer');
  }
  
  return data;
}

export async function updateInfluencer(id: string, influencerData: Partial<InfluencerFormData>): Promise<Influencer> {
  const { data, error } = await supabase
    .from('influencers')
    .update({ ...influencerData })
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error(`Error updating influencer with id ${id}:`, error);
    throw new Error('Failed to update influencer');
  }
  
  return data;
}

export async function deleteInfluencer(id: string): Promise<void> {
  const { error } = await supabase
    .from('influencers')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error(`Error deleting influencer with id ${id}:`, error);
    throw new Error('Failed to delete influencer');
  }
} 