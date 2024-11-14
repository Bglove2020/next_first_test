import { NextResponse } from 'next/server'
import pool from '../../../db'

// 注意事项：1、从参数二中解构出来params 2、需要await等待params的状态变为成功
export async function GET(request,{params}) {
    console.log('params',params)
    const id = (await params).account
    const [rows] = await pool.query(`SELECT * FROM complaint_order where account=${account}`);
    return NextResponse.json({data:rows})
}