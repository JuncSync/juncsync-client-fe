import DistanceBtn from '@/component/DistanceBtn';
import HospitalList from '@/component/HospitalList';
import RefreshBtn from '@/component/RefreshBtn';

const HomePageMain = () => {
  return (
    <div className="bg-white sticky top-0 w-full h-screen">
      <RefreshBtn />
      <DistanceBtn />
      <HospitalList />
    </div>
  );
};

export default HomePageMain;
