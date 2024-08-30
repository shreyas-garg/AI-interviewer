import React from 'react'
import { Lightbulb } from 'lucide-react'



function QuestionsSection({mockInterviewQuestion, activeQuestionIndex}) {
  return mockInterviewQuestion&&(
    <div className='p-6 border rounded-lg my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewQuestion&&mockInterviewQuestion?.map((question, index)=>(
          <h2 className={`bg-secondary p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex==index&&'text-white bg-blue-900'}`}>Question #{index+1}</h2>
        ))}


      </div>
      <h2 className='my-7 text-md md:text-lg'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>

      <div className='p-5 border rounded-lg border-blue-900 bg-blue-100 my-10'>
        <h2 className='flex gap-2 items-center text-primary'>
          <Lightbulb/>
          <strong>Note:</strong>
        </h2>
        <h2 className='text-sm text-primary my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
      </div>
    </div>
  )
}

export default QuestionsSection