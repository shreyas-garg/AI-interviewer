"use client"
import React, { useState } from 'react'
import { Button } from "/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "/components/ui/dialog"

import { Input } from "/components/ui/input"
import { Textarea } from "/components/ui/textarea"
import { chatSession } from '/utils/GeminiAIModal';
import { LoaderCircle } from 'lucide-react';
import { db } from '/utils/db';
import { MockInterview } from '/utils/schema';

import { v4 as uuidv4 } from 'uuid';
import { create } from 'domain';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false)
 
  const [jobPosition, setJobPosition] = useState()
  const [jobDesc, setJobDesc] = useState()
  const [jobExperience, setJobExperience] = useState()

  const [loading , setLoading] = useState(false)
  const [jsonResponse, setJsonResponse] = useState([])
  const router = useRouter();

  const {user}=useUser();

  const onSubmit = async(e) => {
    setLoading(true)
    e.preventDefault()
    console.log(jobPosition, jobDesc, jobExperience)

    const InputPrompt="given the job position: "+jobPosition+" and job description: "+jobDesc+" and years of experience: "+jobExperience+" years depending on these parameters generate 5 interview questions (technical questions preferably) for the candidate along with the an ideal answer in JSON format give us the questions and answers field in JSON format just give questions and answers and no other notes or comments";

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResp=(result.response.text()).replace('```json','').replace('```','')
    console.log(JSON.parse(MockJsonResp))

    setJsonResponse(MockJsonResp);
    
if(MockJsonResp){
    const resp = await db.insert(MockInterview)
    .values({
      mockId:uuidv4(),
      jsonMockResp:MockJsonResp,
      jobPosition:jobPosition,
      jobDesc:jobDesc,
      jobExperience:jobExperience,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      createdAt:moment().format('DD-MM-YYYY HH:mm:ss')
    }).returning({mockId:MockInterview.mockId})

    console.log("inserted id" ,resp)
    if(resp){
      setOpenDialog(false);
      router.push(`/dashboard/interview/`+resp[0]?.mockId)
  }
}else{
    console.log("error in response")
  }

    setLoading(false);
  }


  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={() => setOpenDialog(true)}>
        <h2 className=' text-large text-center'>
          + Add New Interview
        </h2>
      </div>
      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle className='text-2xl'>Tell us more about the job you want to interview for</DialogTitle>
        
            <DialogDescription>
            <form onSubmit={onSubmit}>
            <div>
            
              <h2>Add details about your job role, job description and years of experience</h2>
              <div className='mt-7 my-3'>
                <label>Job Role/Position</label>
                <Input placeholder ="Ex: Full Stack developer" required onChange={(event)=>setJobPosition(event.target.value)}/>
              </div>
              <div className='my-3'>
                <label>Job Description/Tech Stack</label>
                <Textarea placeholder ="Ex: React, NodeJs, MySql etc." required onChange={(event)=>setJobDesc(event.target.value)}/>
              </div>
              <div className='my-3'>
                <label>Your years of experience</label>
                <Input placeholder ="Ex: 2, if you have worked in the field for 2 years" type="number" max="50" required onChange={(event)=>setJobExperience(event.target.value)}/>
              </div>

            </div>
              <div className='flex gap-5 justify-end'>
                <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                  {loading ? <>
                  <LoaderCircle className='animate-spin'/>Generating your personal AI Interview
                  </> : 'Start Interview'
                  }
                  
                </Button>
              </div>
              </form> 
            </DialogDescription>
            
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}


export default AddNewInterview
