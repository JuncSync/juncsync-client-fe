// TEST
import axios from 'axios';
import Lottie from 'lottie-react';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { getDistince } from '@/utils/calDistance';
import loadingLottie from '@/utils/lottie.json';

import {
  IHospital,
  Idistance,
  Ilist,
  distanceState,
  hospitalState,
  listState,
} from '../HospitalItem/HospitalItem.type';

const RefreshBtn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hospitals, setHospitals] = useRecoilState<IHospital[]>(hospitalState);
  const [isList, setIsList] = useRecoilState<Ilist>(listState);
  const [currLat, setCurrLat] = useState<number>(35.16606385987392);
  const [currLng, setCurrLng] = useState<number>(129.135722275161);
  const [globalDistance, setGlobalDistance] =
    useRecoilState<Idistance>(distanceState);

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
    const sortedHos1 = sortedHos.filter(
      (hos: IHospital) =>
        Number(getDistince(currLng, currLat, hos.lng, hos.lat)) <
        globalDistance.distance,
    );
    console.log(globalDistance.distance);
    setHospitals(sortedHos1);
  };

  const fetDataHandler = () => {
    setIsLoading(true);
    fetchData();
    setTimeout(() => setIsLoading(false), 1000);
  };

  const toggleHandler = () => {
    setIsList({ list: !isList.list });
  };

  return (
    <>
      {isLoading && (
        <div className="absolute top-1/2 w-1/2 left-1/4 z-10">
          <Lottie animationData={loadingLottie} />
        </div>
      )}
      <div
        className={`sticky top-0 bg-white px-[20px] py-[12px] flex items-center	justify-between border-[1px]${
          isLoading ? ' border-[#f1f1f1] ' : ' border-[#e3e3e3] '
        }`}
      >
        <img
          className="w-[84px] h-[32px] cursor-pointer "
          onClick={() => window.location.replace('/')}
          src="/logo.svg"
          alt="서비스 글자"
        />
        <div className="flex space-x-[6px] ">
          {isList.list ? (
            <div
              className=" border-[0.95px] border-[#e3e3e3] rounded-[5.72px] px-[6px] py-[8px] cursor-pointer"
              onClick={toggleHandler}
            >
              <img
                className="w-[16px] h-[16px]"
                src="/toggel1.svg"
                alt="토글1"
              />
            </div>
          ) : (
            <div
              className=" border-[0.95px] border-[#e3e3e3] rounded-[5.72px] px-[6px] py-[8px] cursor-pointer"
              onClick={toggleHandler}
            >
              <img
                className="w-[16px] h-[16px]"
                src="/toggel2.svg"
                alt="토글2"
              />
            </div>
          )}
          <div
            className={`px-[12px] py-[6px] rounded-[5.72px] border-[#e3e3e3] border-[0.95px] cursor-pointer 
          ${
            isLoading
              ? ' bg-[#f1f1f1] fill-[#d2d2d2] text-[#d2d2d2] '
              : '  bg-white fill-[#717171] text-[#717171] '
          }`}
            onClick={fetDataHandler}
          >
            <div className="flex items-center	space-x-[6px] right-0 ">
              <svg
                className={`w-[12px] h-[12x] ${
                  isLoading ? ' animate-spin ' : ' '
                }`}
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.3182 1.94598L10.5628 2.53661C9.5329 1.22009 7.93112 0.375 6.13245 0.375C3.02665 0.375 0.512812 2.88616 0.508794 5.9933C0.504776 9.10313 3.02397 11.625 6.13245 11.625C8.56058 11.625 10.6298 10.0848 11.4173 7.92723C11.4374 7.87098 11.4079 7.80804 11.3517 7.78929L10.5923 7.52813C10.5658 7.51905 10.5368 7.5207 10.5115 7.53271C10.4863 7.54472 10.4667 7.56615 10.457 7.59241C10.4329 7.65938 10.4061 7.72634 10.378 7.79197C10.1463 8.34107 9.81415 8.83393 9.39094 9.25714C8.97114 9.67773 8.4741 10.0133 7.9271 10.2455C7.36058 10.4853 6.75656 10.6071 6.13513 10.6071C5.51236 10.6071 4.90969 10.4853 4.34317 10.2455C3.79564 10.0143 3.29842 9.67859 2.87933 9.25714C2.45839 8.8374 2.12315 8.33976 1.89228 7.79197C1.65254 7.22411 1.53067 6.62143 1.53067 5.99866C1.53067 5.37589 1.65254 4.77321 1.89228 4.20536C2.12397 3.65625 2.45612 3.16339 2.87933 2.74018C3.30254 2.31696 3.7954 1.98482 4.34317 1.75179C4.90969 1.51205 5.5137 1.39018 6.13513 1.39018C6.7579 1.39018 7.36058 1.51205 7.9271 1.75179C8.47463 1.98301 8.97185 2.31873 9.39094 2.74018C9.52353 2.87277 9.64808 3.01339 9.76326 3.16071L8.95701 3.79018C8.94106 3.80252 8.92891 3.81911 8.92197 3.83805C8.91503 3.85698 8.91357 3.8775 8.91777 3.89722C8.92197 3.91695 8.93165 3.93509 8.94569 3.94956C8.95974 3.96403 8.97759 3.97424 8.99719 3.97902L11.349 4.55491C11.4159 4.57098 11.4816 4.52009 11.4816 4.45179L11.4923 2.02902C11.4909 1.94063 11.3878 1.89107 11.3182 1.94598V1.94598Z" />
              </svg>
              <div
                className={`w-[50px] h-[20px] font-semibold text-[14px] font-['Pretendard'] text-center ${
                  isLoading ? ' text-[#d2d2d2] ' : ' '
                }`}
              >
                Refresh
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefreshBtn;
