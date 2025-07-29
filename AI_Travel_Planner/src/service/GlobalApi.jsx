export const GetPexelsPhoto = async (placeName) => {
  const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(placeName)}&per_page=1`,
    {
      headers: {
        Authorization: PEXELS_API_KEY
      }
    }
  );

  const data = await response.json();

  if (data.photos && data.photos.length > 0) {
    return data.photos[0].src.medium;
  }

  return null;
};