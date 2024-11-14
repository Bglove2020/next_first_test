'use client'
import React, {useState, useEffect} from 'react';
import Link from "next/link";



export default function Home() {
  const [accountList,setAccountList ] = useState([]);

  useEffect(() => {
    fetch('/api/getDeviceAccount')
        .then(response => response.json())
        .then((res)=>{
          console.log('设备列表',res.data)
          setAccountList(res.data)
        });
  }, []);

  return (
      <div>
        {
          accountList.map((item,index)=>{
            return (
                <div className="bg-white shadow-md rounded-2xl px-4 py-3 mb-3 " key={index}>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex-1">{item.deviceAccount}</div>
                    <div className={`${item.deviceState === 1 ?'text-sky-500':'text-rose-500'} font-semibold flex-1 text-right`}>{item.deviceState ===0?'离线':'在线'}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="">
                      待处理：{item.pendingOrderNum}
                    </div>
                    <Link href={{pathname:"/orderList",query:{deviceAccount:item.deviceAccount,orderType:1}}} className="flex items-center gap-1 font-semibold">
                      <span>投诉单：{item.orderState1_count}</span>
                      <svg style={{width: '15px'}} xmlns="http://www.w3.org/2000/svg" width="0.5em"
                           height="1em" viewBox="0 0 12 24">
                        <path fill="currentColor"
                              d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414"/>
                      </svg>
                    </Link>
                    <Link href={{pathname:"/orderList",query:{deviceAccount:item.deviceAccount,orderType:2}}} className="flex-1 flex items-center gap-1">
                      <span>满意度单：{item.orderState2_count}</span>
                      <svg style={{width:'15px'}} xmlns="http://www.w3.org/2000/svg" width="0.5em" height="1em" viewBox="0 0 12 24">
                        <path fill="currentColor" d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414"/>
                      </svg>
                    </Link>
                  </div>
                </div>
            )
          })
        }
      </div>
  )
}

