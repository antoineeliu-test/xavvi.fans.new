/**
 * Utility function to revalidate cache when influencer data is updated
 */
export async function revalidateInfluencerData() {
  try {
    const response = await fetch('/api/revalidate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to revalidate cache');
    }

    const result = await response.json();
    console.log('Cache revalidated:', result);
    return result;
  } catch (error) {
    console.error('Error revalidating cache:', error);
    throw error;
  }
} 