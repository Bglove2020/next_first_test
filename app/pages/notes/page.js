'use client'
import {useState,useEffect} from 'react'
export default function pages() {
    const [noteslist, setList] = useState([])


    useEffect(() => {
        fetch('/api').then(res => {
            console.log(res)
            console.log(res.result)
            console.log(res.result.data)
            if(res.data){
                setList(res.result.data)
            }
        }).catch(err => console.log(err))
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