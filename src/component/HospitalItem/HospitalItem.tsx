import React, { useCallback, useState } from 'react';

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

  const onClickMethod = useCallback((): void => {
    setIsSelected(!isSelected);
  }, [isSelected, setIsSelected]);

  return (
    <div className="flex" onClick={() => onClickMethod()}>
      <div>{name}</div>
      <div>{phone}</div>
      <div>{address}</div>
      <div>거리</div>
      <div>{currBed}</div>
      <div>{totBed}</div>
      {isSelected ? <div>{department}</div> : ''}
    </div>
  );
};

export default HospitalItem;
