const mongoose =  require("mongoose");
const initdata = require("./data");
const Listing = require("../Models/listing");



main()
.then(()=>{
    console.log("Database Connected")
})
.catch((err)=>{
    console.log(err)
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}

const initialise  = async ()=>{
      await  Listing.deleteMany({});
      initdata.data = initdata.data.map((obj)=>({...obj , owner:"653082a428383817e977783b"}));
    await Listing.insertMany(initdata.data);
    console.log("data has been initiallised");
}
initialise();
