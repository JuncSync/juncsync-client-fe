import axios from 'axios';
import Lottie from 'lottie-react';
import React, { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { useRecoilState } from 'recoil';

import { getDistince } from '@/utils/calDistance';
import loadingLottie from '@/utils/lottie.json';

import { IHospital, hospitalState } from '../HospitalItem/HospitalItem.type';

function Mapcom() {
  const [hospitals, setHospitals] = useState<IHospital[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
          department: hos.department ? hos.department : '학과설명입니다',
        };
        return tmpHos;
      });
      setHospitals(newHosList);
    };

    setIsLoading(true);
    fetchData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const OverlayMap = (tot: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currLat, setCurrLat] = useState<number>(35.16606385987392);
    const [currLng, setCurrLng] = useState<number>(129.135722275161);
    console.log(tot.hos);
    return (
      <>
        {isLoading && (
          <div className="absolute top-1/2 w-1/2 left-1/4 z-10">
            <Lottie animationData={loadingLottie} />
          </div>
        )}
        <MapMarker
          position={{ lat: tot.hos.lat, lng: tot.hos.lng }}
          onClick={() => setIsOpen(true)}
        />
        {isOpen && (
          <CustomOverlayMap position={{ lat: tot.hos.lat, lng: tot.hos.lng }}>
            <div className=" bg-white h-[205px] rounded-[8px] flex flex-col space-y-[12px] p-[16px] border-[#ff6b00] border-[1px]  ">
              <div className="rounded-lg ">
                <div className=" flex flex-col space-y-[10px] ">
                  <div className="flex w-full justify-between ">
                    <div className="font-semibold text-[18px] text-[#1b1b1b]">
                      {tot.hos.name}
                    </div>
                    <div
                      className="  "
                      onClick={() => setIsOpen(false)}
                      title="닫기"
                    >
                      X
                    </div>
                  </div>
                  <div className="flex flex-col space-y-[10px] w-[288px] ">
                    <div className="flex space-x-[8px]">
                      <img
                        className="w-[22px] h-[22px]"
                        src="/touch1.svg"
                        alt="터치이미지1"
                      />
                      <div className="text-[#717171] text-[14px]">
                        {tot.hos.address}
                      </div>
                    </div>
                    <div className="flex space-x-[8px]">
                      <img
                        className="w-[22px] h-[22px]"
                        src="/touch2.svg"
                        alt="터치이미지2"
                      />
                      <div className="text-[#717171] text-[14px]">
                        {tot.hos.phone}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-[8px]">
                    <img
                      className="w-[22px] h-[22px]"
                      src="/touch3.svg"
                      alt="터치이미지3"
                    />
                    <div className="text-[#717171] text-[14px]">
                      {tot.hos.department}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between border-t-[1px] border-[#f1f1f1] text-[#1b1b1b] font-semibold text-[14px] pt-[8px] ">
                  <div className="w-[124px] flex space-x-[4px] align-text-bottom">
                    <div className=" font-semibold text-[#1b1b1b] text-[14px] ">
                      Distance
                    </div>
                    <div className="text-[#ff6b00] font-semibold text-[14px] ">
                      {getDistince(
                        currLng,
                        currLat,
                        tot.hos.lng,
                        tot.hos.lat,
                      ).toFixed(1)}
                      KM
                    </div>
                  </div>
                  <div className="w-[155px] justify-between align-text-bottom flex space-x-[2px] font-semibold text-[#1b1b1b] text-[14px] ">
                    <div>Remaining beds </div>
                    <div>
                      <span className="text-[#ff6b00] text-[14px] ">
                        {tot.hos.currBed}
                      </span>
                      /{tot.hos.totBed}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CustomOverlayMap>
        )}
      </>
    );
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full ">
        <Map
          center={{
            lat: 35.16606385987392,
            lng: 129.135722275161,
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
          level={9}
        >
          {hospitals.map((hos: IHospital) => (
            <OverlayMap key={`EventMarkerContainer-${hos.id}`} hos={hos} />
          ))}
        </Map>
      </div>
    </div>
  );
}

export default Mapcom;
