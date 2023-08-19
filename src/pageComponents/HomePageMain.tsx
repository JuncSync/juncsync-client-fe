import DistanceBtn from '@/component/DistanceBtn';
import {
  IHospital,
  hospitalState,
} from '@/component/HospitalItem/HospitalItem.type';
import HospitalList from '@/component/HospitalList';
import RefreshBtn from '@/component/RefreshBtn';
import loadingLottie from '@/component/lottie.json';
import axios from 'axios';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const HomePageMain = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hospitals, setHospitals] = useRecoilState<IHospital[]>(hospitalState);

  useEffect(() => {
    const fetchData = async () => {
      const data: any = await axios.get(
        'https://api.juncsync.jaehong21.com/hospital',
        {
          headers: {
            accept: 'application/json',
          },
        },
      );
      const newData = data.data.data;
      const newHosList = newData.map((hos: any) => {
        const tmpHos: IHospital = {
          id: hos.id,
          name: hos.name,
          phone: hos.phone,
          address: hos.location.join(''),
          totBed: hos.bed_count,
          currBed: hos.empty_bed_count,
          lng: hos.lng ? hos.lng : 129.1363094535471,
          lat: hos.lat ? hos.lat : 35.16911120538366,
          department: hos.department ? hos.department : '학과설명입니다',
        };
        return tmpHos;
      });
      console.log('초기로딩');
      console.log(newHosList);
      setHospitals(newHosList);
    };
    setIsLoading(true);
    fetchData();
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="static bg-white sticky top-0 w-full h-screen">
      {isLoading && (
        <div className="absolute top-1/2 w-1/2 left-1/4 z-10">
          <Lottie animationData={loadingLottie} />
        </div>
      )}
      <RefreshBtn />
      <DistanceBtn />
      <HospitalList />
    </div>
  );
};

export default HomePageMain;
