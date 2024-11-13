import { newClient } from '../../utils/supabase/client';

export async function GET() {
    const supabase = await newClient();
    // console.log('GET', supabase);
    const {data} = await supabase.from("notes").select();
    console.log('data',data)

    return Response.json({ data })
}
