export const GetUnsplashPhoto = async (placeName) => {
  const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

  const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(placeName)}&client_id=${UNSPLASH_ACCESS_KEY}`);
  const data = await response.json();

  if (data.results && data.results.length > 0) {
    return data.results[0].urls.regular; 
  }

  return null; 
};

