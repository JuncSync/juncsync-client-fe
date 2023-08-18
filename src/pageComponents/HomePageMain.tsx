import { useEffect, useState } from 'react';

import UseGeolocation from '@/hooks/query/common/useGeolocation';

interface locationType {
  loaded: boolean;
  coordinates?: { lat: number; lng: number };
  error?: { code: number; message: string };
}

const HomePageMain = () => {
  const [location, setLocation] = useState<locationType>({
    loaded: false,
    coordinates: { lat: 0, lng: 0 },
  });

  useEffect(() => {
    const fetchData = () => {
      const fetchLocation = UseGeolocation();
      setLocation(fetchLocation);
    };

    fetchData();
  }, [setLocation]);

  return (
    <div>
      <div>메인 홈페이지</div>
      <div>지도</div>
      {JSON.stringify(location)}
    </div>
  );
};

export default HomePageMain;
