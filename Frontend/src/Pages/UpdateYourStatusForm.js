import React, { useState } from 'react'

const UpdateYourStatusForm = () => {

    const [assignedTaskName, setAssignedTaskName] = useState("")
    const [roleInTask, setRoleInTask] = useState("Full-Stack")
    const [taskStatus, setTaskStatus] = useState("Completed")
    const [reason, setReason] = useState("")
    
    const handleSubmit = async (e) =>{
      e.preventDefault(); // Prevent default form submission behavior

      const formData = {
        assignedTaskName,
        roleInTask,
        taskStatus,
        reason
      }
    
      try {
        // Send the form data to the backend using Axios
        const response = await axios.post('https://your-backend-url.com/api/submit', formData);

        console.log('Form submitted successfully', response.data);
      } catch (error) {
        console.error('Error submitting form', error);
      }
    }
    
  return (
    <div className='updateStatusForm'>
    <form className='form' onSubmit={handleSubmit}>
        <h1 className="nav-title">Update Status</h1><br/>
        <input 
          type='text' 
          className='assignedBox' 
          placeholder='Your Assigned Task' 
          required 
          onChange={(e)=>setAssignedTaskName(e.target.value+" Component")}
        /><br/><br/>

        <h4>Your Role in this Task : </h4>
        <select name='roleInProject'
          className='textBox select-option' 
          value={roleInTask}
          onChange={(e) => setRoleInTask(e.target.value)}
        >
          <option value="Full-Stack">Full-Stack</option>
          <option value="UI-Designer">UI-Designer</option>
          <option value="Front-end">Front-end</option>
          <option value="Back-end">Back-end</option>
          <option value="Testing">Testing</option>
        </select><br/><br/>

        <div>
          <h2 className="select-Header">Your Task Status</h2>

          <label className='radio-btn'>
            <input 
              type="radio" 
              id="Completed" 
              className='radio-btn' 
              name="your-status" 
              value="Completed" 
              onClick={() => setTaskStatus("Completed")} 
              defaultChecked
            />Completed
          </label><br/>

          <label className='radio-btn'>
            <input 
              type="radio" 
              id="notCompleted" 
              className='radio-btn' 
              name="your-status" 
              value="Not Completed" 
              onClick={() => setTaskStatus("Not Completed")}
            />
            Not Completed
          </label><br/><br/>

          <textarea
            placeholder='Enter Reason......' 
            rows='5' 
            className='reasonBox' 
            style={{ display: taskStatus !== "Completed" ? "block" : "none" }}
            onChange={(e)=>setReason(e.target.value)}
          /><br/>
        </div>

        <input type='submit' className='submit-btn' value='Update' />
    </form>
    {assignedTaskName+"  "+taskStatus+"  "+reason}
    {"Height : "+window.innerHeight+"  Width : "+window.innerWidth}
    </div>
  )
}

export default UpdateYourStatusForm;
