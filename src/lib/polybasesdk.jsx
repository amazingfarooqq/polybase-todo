import { Polybase } from '@polybase/client'

export const getData = async () => {
    try {
      const db = new Polybase({ defaultNamespace: "farooq" })
      const collectionReference = db.collection("todolist")
      const records = await collectionReference.get()
    
      console.log({records});
      const data = records.data

      return data
      
    } catch (error) {
      console.log(error)
    }
  }
  

export const insertData = async (title, content, data, setData) => {
    console.log("clicked" , {title, content})
    try {
      const db = new Polybase({ defaultNamespace: "farooq" })
      const collectionReference = db.collection("todolist")
      const id = data.length+1
      const recordData = await collectionReference.create([id.toString(), title, content , "0"])
      

      setData([...data, {data: {id, title, content, completed: "0"}}])
      
    } catch (error) {
      console.log(error.message);
    }
}

export const updateData = async (id, data, setData , setLoader) => {
  const db = new Polybase({ defaultNamespace: "farooq" })
  const collectionReference = db.collection("todolist")

  try {
    const recordData = await collectionReference.record(id).call("updateStatus", ["1"])
  
    console.log('before',recordData);
  
    const getdata = data.map(item => {
      console.log(item.data.id);
      if(item.data.id == id){
        item.data.completed = "1"
      }
      return item
    })
  
    setData(getdata)
    setLoader(false)
    
  } catch (error) {
    console.log(error.message);
    setLoader(false)

  }

  // .create(functionName, args) args array is defined by the updateName fn in collection schema

}

