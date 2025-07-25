export const isValidYoutubeURL = (url) => {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname;
    const pathname = parsed.pathname;

    return (
      (hostname.includes("youtube.com") && pathname === "/watch" && parsed.searchParams.get("v")) ||
      hostname.includes("youtu.be")
    );
  } catch (err) {
    return false;
  }
};

export const extractYoutubeVideoID = (url) => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.split("/")[1];
    }
  } catch (err) {
    return null;
  }
};
