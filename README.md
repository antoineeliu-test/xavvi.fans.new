# Xavvi.fans - Influencer Directory

A full-stack Next.js application for discovering and managing social media influencers.

## Features

- Public-facing influencer directory
- Dynamic influencer profile pages
- Admin dashboard for content management
- Authentication with Supabase
- Image upload via Cloudinary
- Fully responsive design

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Database/Auth**: Supabase
- **Image Storage**: Cloudinary
- **Form Handling**: React Hook Form + Zod
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Cloudinary account

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/xavvi.fans.git
   cd xavvi.fans
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   # Supabase configuration
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

   # Cloudinary configuration
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

4. Initialize your Supabase database with the following schema:
   ```sql
   -- Create influencers table
   CREATE TABLE influencers (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     name TEXT NOT NULL,
     slug TEXT NOT NULL UNIQUE,
     instagram_followers INTEGER,
     tiktok_followers INTEGER,
     youtube_followers INTEGER,
     twitter_followers INTEGER,
     facebook_followers INTEGER,
     bio TEXT,
     profile_image_url TEXT,
     gallery_images TEXT[],
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create RLS policies
   ALTER TABLE influencers ENABLE ROW LEVEL SECURITY;

   -- Public can read influencers
   CREATE POLICY "Public can read influencers" 
     ON influencers FOR SELECT 
     USING (true);

   -- Only authenticated users can insert/update/delete
   CREATE POLICY "Authenticated users can insert influencers" 
     ON influencers FOR INSERT 
     WITH CHECK (auth.role() = 'authenticated');

   CREATE POLICY "Authenticated users can update influencers" 
     ON influencers FOR UPDATE 
     USING (auth.role() = 'authenticated');

   CREATE POLICY "Authenticated users can delete influencers" 
     ON influencers FOR DELETE 
     USING (auth.role() = 'authenticated');
   ```

5. Set up authentication in Supabase:
   - Enable Email/Password authentication
   - Create an admin user through the Supabase dashboard

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This project is ready to be deployed on Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Add the environment variables
4. Deploy

## License

This project is licensed under the MIT License - see the LICENSE file for details.
