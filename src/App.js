
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Community from './Community';
import ProductCard from './Pages/ProductCard';
import './index.css'






function App() {
  return (
    <>
    <section className='herosec' class="py-24 flex items-center min-h-screen justify-center ">
  <div class="mx-auto max-w-[43rem]">
    <div class="text-center">
      <p className='harbor' style={{fontSize:'1.7rem'}} class="text-lg font-medium leading-10 text-indigo-600/95">SAFE HARBOR </p>
      <h1 class="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black">Let's Contribute to Women Safety&nbsp;& Make the World a Better Place</h1>
      <p class="mt-3 text-lg leading-relaxed text-slate-400"> A Decentralized community for safeguarding Women</p>
    </div>

    <div class="mt-6 flex items-center justify-center gap-4">
      <a href='/sign-up' class="transform rounded-md bg-indigo-600/95 px-5 py-3 font-medium text-white transition-colors hover:bg-indigo-700">SIGN UP </a>
      
    </div>
  </div>
</section>



    <a className="sign-Up" href='/sign-up'>Sign In</a>

    
    
    

    </>
    



  )
    
  
}

export default App;
