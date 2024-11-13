'use client'
import {useState,useEffect} from 'react'
export default function pages() {
    const [noteslist, setList] = useState([])


    useEffect(() => {
        fetch('/api').then(response => response.json()).then((res)=>{
            console.log(res)
            if(res.data) setList(res.data)
        });
    },[])
    return(
        <div>
            <div>你好</div>
            <div>很高兴见到你</div>
            {
                noteslist.map((item,index) => {
                    return (<div>{item}</div>)
                })
            }
        </div>
    )
}
