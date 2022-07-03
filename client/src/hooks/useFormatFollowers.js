const useFormatFollowers = (followers) => {
  if (followers > 1000000) {
    return `${(followers / 1000000).toFixed(1)}M`;
  } else if (followers > 1000) {
    return `${Math.floor(followers / 1000)}K`;
  } else {
    return followers;
  }
};
export default useFormatFollowers;
