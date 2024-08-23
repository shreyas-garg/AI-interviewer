"use client"
import {db} from '/utils/db'
import {MockInterview} from '/utils/schema'
import {eq} from 'drizzle-orm'
import React, { useEffect } from 'react'

function Interview({params}) {

    const[interviewData, setInterviewData]=useState();

    useEffect(() => {
        console.log(params)
        GetInterviewDetails();
    },[])

    const GetInterviewDetails=async()=>{
        const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId))

        setInterviewData(result[0]);
    }   

  return (
    <div> Interview</div>
  )
}

export default Interview