'use client'
import React, {useState, useEffect} from 'react';
import { useSearchParams  } from 'next/navigation';

export default function orderList() {
    const [orderList,setOrderList ] = useState([]);
    const [orderState,setOrderState] = useState(null)

    // const [searchParams] = useSearchParams();

    const searchParams = useSearchParams()
    const deviceAccount = searchParams.get('deviceAccount')
    const orderType = searchParams.get('orderType')
    console.log('1111111111111',deviceAccount)

    function getList() {
        fetch(`/api/getOrder?deviceAccount=${deviceAccount}&orderType=${orderType}${orderState ? '&state='+orderState:''}`)
            .then(response => response.json())
            .then((res)=>{
                console.log('订单列表',res.data)
                setOrderList(res.data)
            });
    }

    function handleSubmit(event,item){
        console.log(item)
        fetch(`/api/setOrder/${item.account}`,{
            method: 'POST',
        }).then((res) => res.json()).then((data)=>{
            getList()
        })
    }

    useEffect(getList, [orderState]);

    return (
        <div>
            <div className="flex items-center pb-5  bg-none ">
                <div className = {`flex-1 text-center cursor-pointer ${orderState===null?'text-blue-500 font-semibold':''}`} onClick={()=>setOrderState(null)}>待处理</div>
                <div className = {`flex-1 text-center cursor-pointer ${orderState===1?'text-blue-500 font-semibold':''}`} onClick={()=>setOrderState(1)}>已填写</div>
                <div className = {`flex-1 text-center cursor-pointer ${orderState===2?'text-blue-500 font-semibold':''}`} onClick={()=>setOrderState(2)}>已完成</div>
            </div>
            {orderList.length>0? (<div className="flex flex-col gap-4">
                {
                    orderList.map((item, index) => {
                        return (
                            <div key={index} className="bg-white rounded-lg px-5 py-4 flex flex-col gap-2 shadow-md">
                                <div className="text-sm leading-5 text-slate-500">
                                    <span className="text-slate-800">宽带账号：</span>{item.account}</div>
                                <div className="text-sm leading-5 text-slate-500"><span
                                    className="text-slate-800">联系方式：</span>{item.contact}</div>
                                <div className="text-sm leading-5 text-slate-500"><span
                                    className="text-slate-800">生成时间：</span>{item.orderGenerateTime}</div>
                                <div className="text-sm leading-5 text-slate-500"><span
                                    className="text-slate-800">宽带地址：</span>{item.standardAddress}</div>
                                <div className="text-sm leading-5 text-slate-500"><span
                                    className="text-slate-800">超时时间：</span>{item.timeoutPeriod}</div>
                                <div className="text-sm leading-5 text-slate-500"><span
                                    className="text-slate-800">距离超时时间：</span>{item.distanceTimeoutPeriod}</div>
                                {item.orderState?null: (
                                    <div className="flex justify-end" onClick={(event) => handleSubmit(event, item)}>
                                        <button className="text-right bg-sky-500 rounded-xl px-4 py-1 text-white">回单
                                        </button>
                                    </div>)
                                }
                            </div>
                        )
                    })
                }
            </div>) : <h1 className="text-center font-semibold text-lg mt-5">暂无数据</h1>
            }
        </div>
    );
}
