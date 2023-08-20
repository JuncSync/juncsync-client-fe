import DistanceBtn from '@/component/DistanceBtn';
import {
  IHospital,
  Ilist,
  hospitalState,
  listState,
} from '@/component/HospitalItem/HospitalItem.type';
import HospitalList from '@/component/HospitalList';
import Mapuse from '@/component/Mapuse';
import RefreshBtn from '@/component/RefreshBtn';
import axios from 'axios';
import Lottie from 'lottie-react';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import loadingLottie from '@/utils/lottie.json';

const HomePageMain = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isList, setIsList] = useRecoilState<Ilist>(listState);
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
          address: hos.location,
          totBed: hos.bed_count,
          currBed: hos.empty_bed_count,
          lng: hos.coordinates[1] ? hos.coordinates[1] : 129.1363094535471,
          lat: hos.coordinates[0] ? hos.coordinates[0] : 35.16911120538366,
          department: hos.specialties ? hos.specialties : '학과설명입니다',
        };
        return tmpHos;
      });
      const sortedHos = [...newHosList].sort(
        (a: IHospital, b: IHospital) => b.currBed - a.currBed,
      );
      setHospitals(sortedHos);
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
      {isList.list && <DistanceBtn />}
      {isList.list && <HospitalList />}
      {!isList.list && <Mapuse />}
    </div>
  );
};

export default HomePageMain;
