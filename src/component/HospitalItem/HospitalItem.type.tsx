import React from 'react';
import { atom } from 'recoil';

export interface Idistance {
  distance: number;
}

export const distanceState = atom<Idistance>({
  key: 'distance',
  default: {
    distance: 5,
  },
});

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

export interface Ilist {
  list: boolean;
}

export const listState = atom<Ilist>({
  key: 'lists',
  default: {
    list: true,
  },
});

export const hospitalState = atom<IHospital[]>({
  key: 'hospitals',
  default: [
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
  ],
});
