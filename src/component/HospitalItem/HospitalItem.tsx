import React, { useCallback, useState } from 'react';

import { getDistince } from '@/utils/calDistance';

import { IHospital } from './HospitalItem.type';

interface HospitalTypes {
  id: number;
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  totBed: number;
  currBed: number;
  department: string;
}

const HospitalItem = ({
  id,
  name,
  address,
  phone,
  lat,
  lng,
  totBed,
  currBed,
  department,
}: IHospital) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [currLat, setCurrLat] = useState<number>(35.16606385987392);
  const [currLng, setCurrLng] = useState<number>(129.135722275161);

  const onClickMethod = useCallback((): void => {
    setIsSelected(!isSelected);
  }, [isSelected, setIsSelected]);

  const makeID = 'hos' + id.toString();

  return (
    <div
      className={`w-full flex flex-col bg-white space-y-[12px] rounded-[8px] p-[16px] border-[1px] font-['Pretendard'] ${
        isSelected ? 'border-[#ff6b00] drop-shadow' : 'border-[#e3e3e3]'
      }`}
      onClick={() => onClickMethod()}
      id={makeID}
    >
      <div className=" flex flex-col space-y-[10px] ">
        <div className="font-semibold text-[18px] text-[#1b1b1b]">{name}</div>
        <div className="flex flex-col space-y-[10px] w-[288px] ">
          <div className="flex space-x-[8px]">
            <img
              className="w-[22px] h-[22px]"
              src="/touch1.svg"
              alt="터치이미지1"
            />
            <div className="text-[#717171] text-[14px]">{address}</div>
          </div>
          <div className="flex space-x-[8px]">
            <img
              className="w-[22px] h-[22px]"
              src="/touch2.svg"
              alt="터치이미지2"
            />
            <div className="text-[#717171] text-[14px]">{phone}</div>
          </div>
        </div>
        {isSelected ? (
          <div className="flex space-x-[8px]">
            <img
              className="w-[22px] h-[22px]"
              src="/touch3.svg"
              alt="터치이미지3"
            />
            <div className="text-[#717171] text-[14px]">{department}</div>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="flex justify-between border-t-[1px] border-[#f1f1f1] text-[#1b1b1b] font-semibold text-[14px] pt-[8px] ">
        <div className="w-[124px] flex space-x-[4px] align-text-bottom">
          <div className=" font-semibold text-[#1b1b1b] text-[14px] ">
            Distance
          </div>
          <div className="text-[#ff6b00] font-semibold text-[14px] ">
            {getDistince(currLng, currLat, lng, lat).toFixed(1)}KM
          </div>
        </div>
        <div className="w-[148px] align-text-bottom flex space-x-[4px] font-semibold text-[#1b1b1b] text-[14px] ">
          <div>Remaining beds </div>
          <div>
            <span className="text-[#ff6b00] text-[14px] ">{currBed}</span>/
            {totBed}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalItem;
