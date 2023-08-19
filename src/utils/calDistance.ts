export const getDistince = (
  lng1: number,
  lat1: number,
  lng2: number,
  lat2: number,
  useKm?: boolean,
) => {
  if (lng1 === lng2 && lat1 === lat2) {
    return 0;
  } else {
    const theta = lng1 - lng2;
    let dist =
      Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.cos(deg2rad(theta));
    dist = Math.acos(dist);
    dist = rad2deg(dist);
    dist = dist * 60 * 1.1515;

    dist = dist * 1.609344;

    return dist;
  }
};

export const deg2rad = (deg: number) => {
  return (deg * Math.PI) / 180.0;
};

export const rad2deg = (rad: number) => {
  return (rad * 180) / Math.PI;
};
