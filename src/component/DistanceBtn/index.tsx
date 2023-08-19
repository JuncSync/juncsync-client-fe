import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { getDistince } from '@/utils/calDistance';

import { UseGeolocation } from '../Geolocation/Geolocation.type';
import { IHospital, hospitalState } from '../HospitalItem/HospitalItem.type';

const DistanceBtn = () => {
  // lat 35.16606385987392 / lng 129.1357222751617
  const [hospitals, setHospitals] = useRecoilState<IHospital[]>(hospitalState);
  const [openDrop, setOpenDrop] = useState<Boolean>(false);
  const [currDistance, setCurrDistance] = useState<number>(5);
  const [currLat, setCurrLat] = useState<number>(35.16606385987392);
  const [currLng, setCurrLng] = useState<number>(129.135722275161);
  const location = UseGeolocation();
  const defaultHos = [
    {
      id: 1,
      name: '벡스코옆',
      address: '주소1',
      phone: '1',
      lat: 35.16911120538366,
      lng: 129.1363094535471,
      totBed: 10000,
      currBed: 50,
      department: '학과1',
    },
    {
      id: 2,
      name: '일광10키로이상',
      address: '주소2',
      phone: '전화2',
      lat: 35.259368276299625,
      lng: 129.23412645566114,
      totBed: 3000,
      currBed: 20,
      department: '학과2',
    },
    {
      id: 3,
      name: '송정5키로이상',
      address: '주소2',
      phone: '전화2',
      lat: 35.178959258915924,
      lng: 129.20029161438148,
      totBed: 300,
      currBed: 200,
      department: '학과2',
    },
  ];

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
    // 서버로부터 fetch를 하는 과정이 필요함
    setHospitals(defaultHos);
    updateDistance(currDistance);
    console.log(hospitals);
  }, [currDistance]);

  const dropSelect = useCallback(
    (dis: Number) => {
      setOpenDrop(false);
      setCurrDistance(Number(dis));
    },
    [setOpenDrop, setCurrDistance],
  );

  return (
    <>
      {openDrop && (
        <div className="absolute z-10 bg-white">
          <div onClick={() => dropSelect(5)}>5KM</div>
          <div onClick={() => dropSelect(10)}>10KM</div>
          <div onClick={() => dropSelect(20)}>20KM</div>
          <div onClick={() => dropSelect(30)}>30KM</div>
          <div onClick={() => dropSelect(50)}>50KM</div>
        </div>
      )}
      <div className="w-[360px] h-[32px] bg-slate-300 ">
        <div className="flex items-center	space-x-[2px] px-[20px] py-[4px]">
          <img
            className="w-[14px] h-[14px] "
            src="/location.svg"
            alt="위치 이미지"
          />
          <div className="font-semibold text-[12px]">
            Near by {String(currDistance)}Km
          </div>
          <img
            className="w-[14.61px] h-[14.61px] "
            src="/setting.svg"
            alt="설정 이미지"
            onClick={() => onClickMethod()}
          />
        </div>
      </div>
    </>
  );
};

export default DistanceBtn;
