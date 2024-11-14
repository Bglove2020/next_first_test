import { NextResponse } from 'next/server'
import { newClient } from '@/utils/supabase/client';

// 注意事项：1、从参数二中解构出来params 2、需要await等待params的状态变为成功
export async function GET(request,{params}) {
    const supabase = await newClient();// 获取query参数

    const searchParams = request.nextUrl.searchParams
    const deviceAccount = searchParams.get('deviceAccount')
    const orderType = searchParams.get('orderType')
    const state = searchParams.get('state')?searchParams.get('state'):null
    console.log('请求参数',deviceAccount,state,orderType);

    console.log(rows)
    if(state){
        const {data} = await supabase.rpc(`SELECT * FROM ordertable where orderState =${state} and deviceAccount = '${deviceAccount}' and orderType = '${orderType}'`);
        return NextResponse.json({data})
    }
    else{
        const {data} = await supabase.rpc(`SELECT * FROM ordertable where orderState IS NUll and deviceAccount = '${deviceAccount}' and orderType = '${orderType}'`);
        return NextResponse.json({data})
    }

}