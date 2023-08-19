import React from 'react';
import { atom } from 'recoil';

// ID (number) 이름 (string) 주소 (string) 전화번호 (string) 위도 (number) 경도 (number)
// 총 침대 (number) 현재 침대 (number)
// 진료 의학과 (string)

export interface IHospital {
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

export const hospitalState = atom<IHospital[]>({
  key: 'hospitals',
  default: [
    {
      id: 1,
      name: '이름1',
      address: '주소1',
      phone: '1',
      lat: 1,
      lng: 1,
      totBed: 2,
      currBed: 1,
      department: '학과1',
    },
    {
      id: 2,
      name: '2',
      address: '주소2',
      phone: '전화2',
      lat: 2,
      lng: 2,
      totBed: 3,
      currBed: 2,
      department: '학과2',
    },
  ],
});
