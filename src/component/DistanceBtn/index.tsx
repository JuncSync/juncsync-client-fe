import React, { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';

import { UseGeolocation } from '../Geolocation/Geolocation.type';
import { IHospital, hospitalState } from '../HospitalItem/HospitalItem.type';

const DistanceBtn = () => {
  // lat 35.16606385987392 / lng 129.1357222751617
  const [hospitals, setHospitals] = useRecoilState<IHospital[]>(hospitalState);
  const [openDrop, setOpenDrop] = useState<Boolean>(false);
  const [currDistance, setCurrDistance] = useState<Number>(5);
  const disList = [5, 10, 20, 30, 50];
  const location = UseGeolocation();
  const onClickMethod = useCallback((): void => {
    const tmp = {
      id: 3,
      name: '33',
      address: '33',
      phone: '33',
      lat: 3,
      lng: 3,
      totBed: 3,
      currBed: 3,
      department: 'string',
    };

    setHospitals([...hospitals, tmp]);
    setOpenDrop(!openDrop);
  }, [hospitals, setHospitals, openDrop, setOpenDrop]);

  const dropSelect = useCallback(
    (dis: Number) => {
      setOpenDrop(false);
      setCurrDistance(dis);
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
        {JSON.stringify(location)}
      </div>
    </>
  );
};

export default DistanceBtn;
