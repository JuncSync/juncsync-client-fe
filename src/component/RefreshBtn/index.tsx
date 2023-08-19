import React from 'react';

const RefreshBtn = () => {
  return (
    <>
      <div className="w-[360px] bg-slate-500 p-[20px] flex items-center	justify-between space-x-[12px] border-[#dedede] border-[1px]">
        <img className="" src="/logo.svg" alt="서비스 글자" />
        <div className="w-[170.12px] flex items-center justify-between space-x-[12px]">
          <div></div>
          <div className="px-[8.58px] py-[6.67px] bg-white rounded-[5.72px] border-[#d3d3d3] border-[0.95px]">
            <div className="flex items-center	space-x-[1.91px] grid-cols-2 right-0 ">
              <img
                className="w-[18.66px] h-[18.66px]"
                src="/refresh.svg"
                alt="리프레쉬 아이템"
              />
              <div className="w-[48px] h-[16.33px] font-semibold text-[13.34px]">
                refresh
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefreshBtn;
