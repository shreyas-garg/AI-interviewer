"use client"
import React, { useEffect, useState } from 'react'
import {db} from '/utils/db'
import {MockInterview} from '/utils/schema'
import {eq} from 'drizzle-orm'
import QuestionsSection from './_components/QuestionsSection'

function StartInterview({params}) {

    const[interviewData, setInterviewData]=useState();
    const[mockInterviewQuestion, setMockInterviewQuestion]=useState();
    const[activeQuestionIndex, setActiveQuestionIndex]=useState(0);
    useEffect(() => {
        GetInterviewDetails();
    },[]);

    const GetInterviewDetails = async () => {
        try {
            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, params.interviewId));
    
            if (result.length > 0) {
                const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    
                // Set mockInterviewQuestion to the questions array
                if (jsonMockResp && Array.isArray(jsonMockResp.questions)) {
                    setMockInterviewQuestion(jsonMockResp.questions);
                    console.log("jsonMockResp.questions:", jsonMockResp.questions);
                } else {
                    console.error("jsonMockResp.questions is not an array:", jsonMockResp);
                    setMockInterviewQuestion([]);
                }
    
                setInterviewData(result[0]);
            } else {
                console.error("No interview data found for the given interviewId.");
            }
        } catch (error) {
            console.error("Error fetching interview details:", error);
        }
    };

  return (

    <div>
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <QuestionsSection mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            />
            
        </div>
    </div>
  )
}

export default StartInterview