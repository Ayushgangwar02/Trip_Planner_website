export const GetPexelsPhoto = async (placeName, searchType = "place") => {
  const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

  
  let searchSuffix = "";
  if (searchType === "hotel") {
    searchSuffix = " hotel building exterior";
  } else if (searchType === "city") {
    searchSuffix = " cityscape";
  } else {
    searchSuffix = "";
  }

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(placeName + searchSuffix)}&per_page=5`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    const data = await response.json();

    if (data.photos && data.photos.length > 0) {
      for (const photo of data.photos) {
        const url = photo.src.medium;
        const alt = photo.alt?.toLowerCase() || "";

        const isBlocked = ["portrait", "baby", "person", "woman", "man", "child", "face"].some(k =>
          url.includes(k) || alt.includes(k)
        );

        if (!isBlocked) {
          return url;
        }
      }
    }

    return null; 
  } catch (error) {
    console.error("Pexels API error:", error);
    return null;
  }
};
