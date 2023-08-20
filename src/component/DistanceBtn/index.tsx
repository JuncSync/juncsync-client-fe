import axios from 'axios';
import Lottie from 'lottie-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { getDistince } from '@/utils/calDistance';
import loadingLottie from '@/utils/lottie.json';

import { UseGeolocation } from '../Geolocation/Geolocation.type';
import { IHospital, hospitalState } from '../HospitalItem/HospitalItem.type';

const DistanceBtn = () => {
  // lat 35.16606385987392 / lng 129.1357222751617
  const [isLoading, setIsLoading] = useState(false);
  const [hospitals, setHospitals] = useRecoilState<IHospital[]>(hospitalState);
  const [openDrop, setOpenDrop] = useState<Boolean>(false);
  const [currDistance, setCurrDistance] = useState<number>(5);
  const [currLat, setCurrLat] = useState<number>(35.16606385987392);
  const [currLng, setCurrLng] = useState<number>(129.135722275161);
  const location = UseGeolocation();
  const disList = [5, 10, 20, 30, 50];

  const onClickMethod = useCallback((): void => {
    setOpenDrop(!openDrop);
  }, [openDrop, setOpenDrop]);

  const updateDistance = (distance: number): void => {
    setHospitals((prevHos: IHospital[]) => {
      const filterHos = prevHos.filter(
        (hos: IHospital) =>
          Number(getDistince(currLng, currLat, hos.lng, hos.lat)) < distance,
      );
      const sortedHos = [...filterHos].sort(
        (a: IHospital, b: IHospital) => b.currBed - a.currBed,
      );
      return sortedHos;
    });
  };

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
      setHospitals(newHosList);
    };

    // 서버로부터 fetch를 하는 과정이 필요함
    setIsLoading(true);
    fetchData();
    setTimeout(() => {
      setIsLoading(false);
      updateDistance(currDistance);
    }, 1000);

    const makeid = 'dropDown' + currDistance.toString();
    const tmp = document.getElementById(makeid);
    if (!tmp) return;
    tmp.classList.add('bg-[#fafafa]');
  }, [currDistance]);

  const dropSelect = useCallback(
    (e: any) => {
      setOpenDrop(false);
      const makeid = 'dropDown' + currDistance.toString();
      const tmp = document.getElementById(makeid);
      if (!tmp) return;
      if (!tmp) {
        return;
      }
      tmp.classList.remove('bg-[#fafafa]');

      setCurrDistance(
        Number(e.target.id.charAt(e.target.id.length - 1)) === 0
          ? Number(e.target.id.charAt(e.target.id.length - 2) * 10)
          : Number(e.target.id.charAt(e.target.id.length - 1)),
      );
      const newDist =
        Number(e.target.id.charAt(e.target.id.length - 1)) === 0
          ? Number(e.target.id.charAt(e.target.id.length - 2) * 10)
          : Number(e.target.id.charAt(e.target.id.length - 1));
      const makeid1 = 'dropDown' + newDist.toString();
      const tmp1 = document.getElementById(makeid1);
      if (!tmp1) {
        return;
      }
      tmp.classList.add('bg-[#fafafa]');
    },
    [setOpenDrop, currDistance, setCurrDistance],
  );

  return (
    <>
      {isLoading && (
        <div className="absolute top-1/2 w-1/2 left-1/4 z-10">
          <Lottie animationData={loadingLottie} />
        </div>
      )}
      <div className=" static ">
        {openDrop && (
          <div className="absolute z-10 w-[110px] rounded-[6px] bg-white border-[#e3e3e3] border-[1px] left-[42.25px] top-[94px] cursor-pointer ">
            {disList.map((dis: number) => {
              const makeid = 'dropDown' + dis.toString();
              return (
                <div
                  key={dis}
                  className={`px-[12px] py-[5px] text-[#1b1b1b] text-center hover:bg-[#FAFAFA] ${
                    dis === currDistance ? ' bg-[#FAFAFA] ' : ' '
                  }`}
                  id={makeid}
                  onClick={dropSelect}
                >
                  {dis}KM
                </div>
              );
            })}
          </div>
        )}
        <div className="flex items-center	justify-between space-x-[6px] px-[20px] py-[12px]">
          <div
            className="flex itmes-center justify-between space-x-[6px] cursor-pointer "
            onClick={() => onClickMethod()}
          >
            <img
              className="w-[16px] h-[16px] "
              src="/location.svg"
              alt="위치 이미지"
            />
            <div className="font-semibold text-[14px] text-[#1b1b1b] font-['Pretendard'] ">
              Near by{' '}
              <span className="text-[#ff6b00]">{String(currDistance)}Km</span>
            </div>
            <img
              className="w-[14.61px] h-[14.61px] "
              src="/setting.svg"
              alt="설정 이미지"
            />
          </div>
          <div className="font-['Pretendard'] text-[14px] text-[#d2d2d2] ">
            Sorted by bed count
          </div>
        </div>
      </div>
    </>
  );
};

export default DistanceBtn;
