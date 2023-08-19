import React, { useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';

function Mapcom() {
  const OverlayMap = () => {
    const [isOpen, setIsOpen] = useState(false);
    const positions = { lat: 36.01244723249525, lng: 129.32185119710428 };
    return (
      <>
        <MapMarker position={positions} onClick={() => setIsOpen(true)} />
        {isOpen && (
          <CustomOverlayMap position={positions}>
            <div className=" border drop-shadow-lg rounded-lg bg-white w-32">
              <div className="rounded-lg ">
                <div className="flex relative bg-[#C80150] rounded-tr-lg rounded-tl-lg ">
                  <div className="mt-1 pl-1 ml-1 text-white"> "제목" </div>
                  <div
                    className="absolute right-0 mr-2 mt-1 hover:text-slate-300 text-white "
                    onClick={() => setIsOpen(false)}
                    title="닫기"
                  >
                    X
                  </div>
                </div>
              </div>
            </div>
          </CustomOverlayMap>
        )}
      </>
    );
  };

  const data = [
    {
      content: (
        <div className="flex justify-center">
          <div>
            <div className="flex justify-center">
              <img
                className="mt-2 "
                src="img/청암.jpg"
                width="73"
                height="70"
                alt="2공학관"
              />
            </div>
            <div className="desc">
              <div className="ellipsis"> 적정 인원수 90 </div>
              <div className="jibun ellipsis"> 현재 인원수 33 </div>
              <div className="jibun ellipsis">
                {' '}
                포인트&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10{' '}
              </div>
            </div>
          </div>
        </div>
      ),
      latlng: { lat: 36.012793922685795, lng: 129.3251617222954 },
      title: '청암 학술정보관',
    },
    {
      content: (
        <div className="flex justify-center">
          <div>
            <div className="flex justify-center">
              <img
                className="mt-2 "
                src="img/2공학관.jpg"
                width="73"
                height="70"
                alt="2공학관"
              />
            </div>
            <div className="desc">
              <div className="ellipsis"> 적정 인원수 50 </div>
              <div className="jibun ellipsis"> 현재 인원수 10 </div>
              <div className="jibun ellipsis">
                {' '}
                포인트&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5{' '}
              </div>
            </div>
          </div>
        </div>
      ),
      latlng: { lat: 36.01199988200514, lng: 129.32261879164327 },
      title: '제 2공학관',
    },
    {
      content: (
        <div className="flex justify-center">
          <div>
            <div className="flex justify-center">
              <img
                className="mt-2 "
                src="img/무은재.jpg"
                width="73"
                height="70"
                alt="2공학관"
              />
            </div>
            <div className="desc">
              <div className="ellipsis"> 적정 인원수 20 </div>
              <div className="jibun ellipsis"> 현재 인원수 17 </div>
              <div className="jibun ellipsis">
                {' '}
                포인트&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4{' '}
              </div>
            </div>
          </div>
        </div>
      ),
      latlng: { lat: 36.01244723249525, lng: 129.32185119710428 },
      title: '무은재 기념관',
    },
  ];

  return (
    <div className="w-full flex justify-center ">
      <div className="h-3/5 w-4/5 ">
        <Map // 지도를 표시할 Container
          center={{
            // 지도의 중심좌표
            lat: 36.0129952127773,
            lng: 129.32295852510202,
          }}
          style={{
            // 지도의 크기
            width: '100%',
            height: '450px',
          }}
          level={4} // 지도의 확대 레벨
        >
          {data.map((value) => (
            <OverlayMap
              key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
            />
          ))}
        </Map>
      </div>
    </div>
  );
}

export default Mapcom;
