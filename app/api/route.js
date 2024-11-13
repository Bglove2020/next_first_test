import { newClient } from '../../utils/supabase/client';

export async function GET() {
    const supabase = await newClient();
    // console.log('GET', supabase);
    const result = await supabase.from("notes").select();
    console.log(result)

    return Response.json({ result })
}
