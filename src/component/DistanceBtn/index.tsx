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
  const disList = [5, 10, 20, 30, 50];
  const defaultHos = [
    {
      id: 1,
      name: '벡스코옆',
      address: '주소1',
      phone: '1',
      lat: 35.16911120538366,
      lng: 129.1363094535471,
      totBed: 10,
      currBed: 5,
      department: '학과1',
    },
    {
      id: 2,
      name: '일광10키로이상',
      address: '주소2',
      phone: '전화2',
      lat: 35.259368276299625,
      lng: 129.23412645566114,
      totBed: 30,
      currBed: 2,
      department: '학과2',
    },
    {
      id: 3,
      name: '송정5키로이상',
      address: '주소2',
      phone: '전화2',
      lat: 35.178959258915924,
      lng: 129.20029161438148,
      totBed: 30,
      currBed: 1,
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
    const makeid = 'dropDown' + currDistance.toString();
    const tmp = document.getElementById(makeid);
    if (!tmp) return;
    if (!tmp) {
      console.log('13');
      return;
    }
    tmp.classList.add('bg-[#fafafa]');
  }, [currDistance]);

  const dropSelect = useCallback(
    (e) => {
      setOpenDrop(false);
      const makeid = 'dropDown' + currDistance.toString();
      const tmp = document.getElementById(makeid);
      if (!tmp) return;
      if (!tmp) {
        console.log('12');
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
        console.log('11');
        return;
      }
      tmp.classList.add('bg-[#fafafa]');
    },
    [setOpenDrop, currDistance, setCurrDistance],
  );

  return (
    <>
      <div className=" static ">
        {openDrop && (
          <div className="absolute z-10 w-[110px] rounded-[6px] bg-white border-[#e3e3e3] border-[1px] left-[42.25px] top-[94px]">
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
          <div className="flex itmes-center justify-between space-x-[6px]">
            <img
              className="w-[16px] h-[16px] "
              src="/location.svg"
              alt="위치 이미지"
            />
            <div className="font-semibold text-[12px] text-[#1b1b1b] font-['Pretendard'] ">
              Near by{' '}
              <span className="text-[#ff6b00]">{String(currDistance)}Km</span>
            </div>
            <img
              className="w-[14.61px] h-[14.61px] "
              src="/setting.svg"
              alt="설정 이미지"
              onClick={() => onClickMethod()}
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
