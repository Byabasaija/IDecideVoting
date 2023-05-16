import React, {useState} from 'react'
 



function WalletLogin({user_name, signInFun}) {
  
  return (
      <div className='text-center mt-10 p-4'>
        
        
         <h2 className="text-3xl text-black-600 font-bold">
         Welcome <span className="text-green-500">{user_name}</span>
       </h2>
       <h1 className="text-5xl text-black-600 font-bold">
         Connect to your <span className="text-green-500">wallet</span>
       </h1>
       <p className="pt-5 text-gray-600 text-xl font-medium">
         {' '}
        Click on the button below to connect to your wallet
       </p>
         <button  type="button"
         className="inline-block px-6 py-2 border-2 text-white font-medium bg-green-500
         text-xs leading-tight uppercase rounded hover:bg-black focus:outline-none
         focus:ring-0 transition duration-150 ease-in-out mr-4 mt-5" onClick={signInFun}>Connect Wallet</button>
        
      </div> 
    
  )
}

export default WalletLogin