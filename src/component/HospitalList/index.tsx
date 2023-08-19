import React from 'react';
import { useRecoilState } from 'recoil';

import HospitalItem from '../HospitalItem/HospitalItem';
import { IHospital, hospitalState } from '../HospitalItem/HospitalItem.type';

const HospitalList = () => {
  const [hospitals, setHospitals] = useRecoilState<IHospital[]>(hospitalState);

  return (
    <div className="px-[20px] flex flex-col space-y-[20px] items-center	">
      {hospitals.length > 0 ? (
        hospitals.map((hos: IHospital) => {
          const {
            id,
            name,
            address,
            phone,
            lat,
            lng,
            totBed,
            currBed,
            department,
          } = hos;

          return (
            <HospitalItem
              key={id}
              id={id}
              name={name}
              address={address}
              phone={phone}
              lat={lat}
              lng={lng}
              totBed={totBed}
              currBed={currBed}
              department={department}
            />
          );
        })
      ) : (
        <div className="">현재 이용 가능한 병원이 없습니다.</div>
      )}
    </div>
  );
};

export default HospitalList;
