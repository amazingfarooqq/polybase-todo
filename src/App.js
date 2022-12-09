import logo from './logo.svg';
import './App.css';
import { getData, insertData, updateData } from './lib/polybasesdk';
import { useEffect, useState } from 'react';
import { createCollection } from './lib/createSchema';
import { IoMdDoneAll } from 'react-icons/io';



function App() {

  const [inputValues, setInputValues] = useState({
    title: "",
    content: "",
    completed: 0
  })
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState([])

    const getDataFunc = async () => {

      console.log(process.env.REACT_APP_SECRET_KEY);
      setLoader(true)
      const getdata = await getData()
      setData(getdata)

      setLoader(false)
      const pvt = process.env.REACT_APP_SECRET_KEY
      // createCollection(pvt, 'farooq' , 'TodoList').then(console.log)
      // .catch(console.error)
    }

    useEffect(( ) => {
      getDataFunc()
    } , [])


  const handleOnChange = (e) => {
    const {name , value} = e.target
    setInputValues({
      ...inputValues,
      [name]: value
    })
  }

  const onSubmit = async () => {
    const {title , content} = inputValues
    if(!title || !content){
      return
    }else {
      setLoader(true)

      await insertData(title, content , data, setData)

      setInputValues({
        title: "",
        content: "",
        completed: 0
      })

      setLoader(false)

    }
  }

  const onUpdate = async (id) => {
    console.log('clicked');
    setLoader(true)
    updateData(id, data, setData , setLoader)

  }

  return (
    <>
    {loader && <div className="spinner-border fixed-top m-4" role="status">
      <span className="sr-only"></span>
    </div>}
      <div className="container-fluid">
        <div className="row justify-content-center  mt-5">
          <div className="col-md-8 col-lg-6 rounded box">
            <div className="row py-5">
              <div className="col-12 px-4">
                 <h2 className='text-center py-3  '>Todo List</h2>
                <div className="input-group mb-3 bg-light rounded">
                  
                  <input type="text" className="form-control" placeholder="Title" name="title" value={inputValues.title} onChange={handleOnChange}/>
                  <input type="text" className="form-control" placeholder="Description" name="content" value={inputValues.content} onChange={handleOnChange}/>
                  <div className="input-group-append">
                    <button className="input-group-text border btn-color" onClick={onSubmit} disabled={loader}>Submit</button>
                  </div>
                </div>
              </div>
                <hr />
              <div className="col-12 ">
                {data?.map(single => {
                  const {id, title , content , completed} = single?.data

                  return <div key={id} className={`row px-3 py-2 d-flex mx-1`}>

                      <div className='col p-0 m-0 align-items-center' style={{display: "flex" , alignContent: "center"}}>
                       {completed == 1?<del>{title}</del>:title}
                       
                        </div>
                      <div className='col p-0 m-0 align-items-center text-end pb-3'>
                      <span >
                       {completed == 1?<del>{content}</del>:content}
                      </span>

                      {completed == 1 ? <button className='btn btn-light px-2 mx-2 disabled'><IoMdDoneAll className='text-success'/></button> :
                      <button className='btn btn-light px-2 mx-2' onClick={() => onUpdate(id)} disabled={loader}>Done</button>
                      }
                      

                      </div>
    
                    </div>
                })}
 
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
