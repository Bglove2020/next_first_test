import { NextResponse } from 'next/server'
import { newClient } from '@/utils/supabase/client';


export async function GET(request) {
    const supabase = await newClient();

    const result = await supabase.from('device_account')
        .select(
            'deviceAccount,deviceState,pendingOrderNum,ordertable(*)',
        )
    console.log(result)
    return NextResponse.json({data:rows}, { status: 200 })
}