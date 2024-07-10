import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath'

const AddFirm = () => {

  const [firmName, setFirmName] = useState("");
  const [area, setArea ] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item) => item !== value))
    }
    else{
      setCategory([...category, value])
    }
  }

  const handleRegionChange = (event) => {
    const value = event.target.value;
  if(region.includes(value)){
      setRegion(region.filter((item) => item !== value))
    }
    else{
      setRegion([...region, value])
    }
  }

  const handleFirmSubmit = async(e) => {
    e.preventDefault()

    try {

      const loginToken = localStorage.getItem("loginToken");
      if(!loginToken){
        console.log('user not authenticated');
      }

      const formData = new FormData();
      formData.append('firmName', firmName.toUpperCase());
      formData.append('area' , area);
      formData.append('offer' , offer);
      formData.append('image' , file);

      category.forEach((value) => {
        formData.append('category' , value)
      })

      region.forEach((value) => {
        formData.append('region' , value)
      });

     const response = await fetch(`${API_URL}/firm/add-firm` , {
      method: 'POST',
      headers: {
        'token' : `${loginToken}`
      },

      body: formData
     }) ;

     const data = await response.json()

     if(response.ok){
      console.log(data);
      
      setFirmName("");
      setArea("");
      setCategory([]);
      setRegion([]);
      setOffer("");
      setFile(null)
      alert("firm added succesfully");
     }else if(data.message === 'vendor can have only one firm'){
      alert("Firm exists. Only 1 firm can be added")
     }
     else{
      alert("Failed to add firm");
     }

     const firmId = data.firmId;
     localStorage.setItem('firmId' , firmId);
   } catch(error) {
      console.error("failed to add Firm")
      
    }
  }

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0]
    setFile(selectedImage)
  }

  return (
    <div className='AddFirmSection'>
        <form className='tableForm' onSubmit={handleFirmSubmit}>

            <h3>Add Firm</h3>
            <label>Firm Name</label>
            <input type='text' placeholder='Enter your FirmName' name='firmName' value={firmName} onChange={(e) => setFirmName(e.target.value)} /><br />
            <label>Area</label>
            <input type='text' placeholder='Enter your Area' name='area' value={area} onChange={(e) => setArea(e.target.value)}/><br />

            {/*<label>Category</label>
            <input type='text' placeholder='Enter your Category' /><br />*/}

            <div className="checkInp">
              <label>Category</label>
              <div className="inputsContainer">
                <div className="checkboxContainer">
                  <label>Veg</label>
                  <input type='checkbox' value= "veg" checked = {category.includes('veg')} onChange={handleCategoryChange}/>
                  <label>Non-Veg</label>
                  <input type='checkbox' value="non-veg" checked = {category.includes('non-veg')} onChange={handleCategoryChange}/>
                </div>
              </div>
            </div>
            
            {/*<label>Region</label>
            <input type='text' placeholder='Enter your Region' /><br />*/}
      
            <div className="checkInp">
              <label>Region</label>
              <div className="inputsContainer">
                <div className="checkboxContainer">
                  <label>south-indian</label>
                  <input type='checkbox' value= "south-indian" checked = {region.includes('south-indian')} onChange={handleRegionChange}/>
                  <label>north-indian</label>
                  <input type='checkbox' value="north-indian" checked = {region.includes('north-indian')} onChange={handleRegionChange}/>
                  <label>chinese</label>
                  <input type='checkbox' value= "chinese" checked = {region.includes('chinese')} onChange={handleRegionChange}/> 
                  <label>bakery</label>
                  <input type='checkbox' value="bakery" checked = {region.includes('bakery')} onChange={handleRegionChange}/>
                </div>
              </div>
            </div>

            <label>Offer</label>
            <input type='text' placeholder='Enter your Offer' name='offer' value={offer} onChange={(e) => setOffer(e.target.value)}/><br />
            <label>Firm Image</label><br />
            <input type='file' onChange={handleImageUpload}/>

          <div className='btnSubmit'>
            <button type='submit'>
                Submit
            </button>

          </div>

        </form>
      
    </div>
  )
}

export default AddFirm
