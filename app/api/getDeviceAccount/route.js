import { NextResponse } from 'next/server'
import { newClient } from '@/utils/supabase/client';


export async function GET(request) {
    const supabase = await newClient();

    const sql = `
    SELECT 
        device_account.deviceAccount,deviceState,pendingOrderNum,
        SUM(CASE WHEN orderTable.orderState is Null and orderTable.orderType = 1  THEN 1 ELSE 0 END) AS orderState1_count,
        SUM(CASE WHEN orderTable.orderState is NUll and orderTable.orderType = 2 THEN 1 ELSE 0 END) AS orderState2_count
    FROM
        device_account
    LEFT JOIN
        orderTable
    ON
        device_account.deviceAccount = orderTable.deviceAccount
    GROUP BY
        device_account.deviceAccount
    ORDER BY  
        orderState1_count DESC,orderState2_count DESC;`

    const result = await supabase.rpc(sql)
    console.log(result)
    return NextResponse.json({data:rows}, { status: 200 })
}