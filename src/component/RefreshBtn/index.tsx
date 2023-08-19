import React from 'react';

const RefreshBtn = () => {
  return (
    <>
      <div className="w-[360px] px-[20px] py-[12px] flex items-center	justify-between border-[#f1f1f1] border-[1px]">
        <img className="w-[84px] h-[32px]" src="/logo.svg" alt="서비스 글자" />
        <div className="px-[12px] py-[6px] bg-white rounded-[5.72px] border-[#232323] border-[0.95px]">
          <div className="flex items-center	space-x-[6px] right-0 ">
            <img
              className="w-[12px] h-[12x]"
              src="/refresh.svg"
              alt="리프레쉬 아이템"
            />
            <div className="w-[48px] h-[16.33px] font-semibold text-[14px] text-[#717171] ">
              refresh
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefreshBtn;
