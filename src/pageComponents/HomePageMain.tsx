import useGeolocation from '@/hooks/query/common/useGeolocation';

const HomePageMain = () => {
  const location = useGeolocation();

  return (
    <div>
      메인 홈페이지
      {location.loaded
        ? JSON.stringify(location)
        : 'Location data not available yet.'}
    </div>
  );
};

export default HomePageMain;
