import React, { useState } from 'react'

const NewProjectForm = () => {

    const [fileSelected, setFileSelected] = useState(false)
    const [projectName, setProjectName] = useState("")
    const [addMember, setAddMember] = 
    useState(
      [
        {
          "memberName" : "",
          "roleInProject" : "",
          "profile" : "",
          "email" : "",
          "password" : ""
        }
      ]
    )

    console.log("Project Name : "+projectName)
    console.log(addMember)
    
    const handleAddMember = () => {
      setAddMember(
        [...addMember,
          {
            "memberName" : "",
            "roleInProject" : "",
            "profile" : "",
            "email" : "",
            "password" : ""
          }]
      )
    }

    const handleRemoveMember = (e, index) => {
      const removedMember = addMember.splice(index);
      setAddMember(removedMember)
    }

    const handleChange = (e, index) => {

      const { name, value } = e.target;
      const list = [...addMember];
      list[index][name] = value;
      setAddMember(list);

      if(e.target.name==="profile"){
      if(e.target.files.length > 0){
        setFileSelected(true);
      }
      else{
        setFileSelected(false)
      }
    }
    }

    const handleSubmit = async (e) =>{
      e.preventDefault(); // Prevent default form submission behavior

      const formData = {
        projectName : projectName,
        Team: addMember 
      }
    
      try {
        // Send the form data to the backend using Axios
        const response = await axios.post('https://your-backend-url.com/api/submit', formData);

        console.log('Form submitted successfully', response.data);
      } catch (error) {
        console.error('Error submitting form : ', error);
      }
    }


    
  return (
    <div className='newProjectForm'>
      <form className='form' onSubmit={handleSubmit}>

        <h1 className="title">New Project</h1><br/><br/>
  
        <input 
          type='text' 
          name='projectName'
          className='textBox projectName' 
          placeholder='Enter Project Name' 
          required
          value={projectName}
          autoComplete="off"
          onChange={(e) => setProjectName(e.target.value)}
        /><br/><br/>

        <h2 className='projectMembersNames'>Enter Project Members Names : </h2><br/>
  
        {addMember.map((singleMember, index) => (
          <div key={index} className='singleLineInput'>

            <div className='container1'>
              <input 
                type='text' 
                name='memberName'
                className='textBox memberName' 
                placeholder= "Member Name"
                value={singleMember.memberName}
                autoComplete="off"
                required 
                onChange={(e) => handleChange(e, index)}
              />
              <button className='textBox remove-btn' onClick={(e) => handleRemoveMember(e, index)}>X</button>
            </div>
            
            <div className='container2'>
              <select name='roleInProject'
                className='textBox select-option' 
                value={singleMember.roleInProject} 
                onChange={(e) => handleChange(e, index)}
              >
                <option value="Full-Stack">Full-Stack</option>
                <option value="UI-Designer">UI-Designer</option>
                <option value="Front-end">Front-end</option>
                <option value="Back-end">Back-end</option>
                <option value="Testing">Testing</option>
              </select>
            
              <input 
                type='file'
                name = "profile"
                className='textBox choose-profile-btn'
                style={fileSelected? {backgroundColor:"green"}:{backgroundColor:"none"}}
                onChange={(e) => handleChange(e, index)}
              />
              
            </div>

            <div className='container2'>
              <input 
                type='text' 
                name='email'
                className='textBox email' 
                placeholder= "Enter Email-Id"
                value={singleMember.email}
                autoComplete="off"
                required 
                onChange={(e) => handleChange(e, index)}
              />

              <input 
                type='text' 
                name='password'
                className='textBox password' 
                placeholder= "Enter Password"
                value={singleMember.password}
                autoComplete="off"
                required 
                onChange={(e) => handleChange(e, index)}
              /><br/>
            </div>

          </div>
        ))}

        <button className='memberAddButton' onClick={handleAddMember}>+</button>  

        <input type='submit' className='submit-btn' value='Update'/>
      </form>
    </div>
  )
}

export default NewProjectForm;
