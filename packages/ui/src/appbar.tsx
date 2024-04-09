"use client";

import { Button } from "./button";

interface AppBarProps {
    user ? : {
        name? : string | null
    },
    onSignin : () => void,
    onSignout : () => void
}


export const AppBar = ({user, onSignin, onSignout} : AppBarProps) => {
    return <div className="flex justify-between border-b px-4">
    <div className="text-lg flex flex-col justify-center">
        PayTM
    </div>
    
    <div className="flex  justify-center pt-2">
       <UserIcon className="mr-2" />
        <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
    </div>
</div>
}



function UserIcon({className} : {className? : string}){
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${className} w-10 h-10`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
  
}

// import React, { useState } from 'react';

// const options = [
//   "Try a new recipe!",
//   "Go for a walk in nature!",
//   "Write a short story!",
//   "Practice a musical instrument!",
//   "Learn 5 new vocabulary words!",
//   "Do a quick digital detox!",
//   "Would you rather fly or be invisible?"
// ];

// const DropdownIcon = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(options[0]); // Preselect first option

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const handleSelect = (option :any) => {
//     setSelectedOption(option);
//   };

//   return (
//     <div className="dropdown relative w-full">
     
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth="1.5"
//           stroke="currentColor"
//           className="dropdown-icon w-6 h-6 mr-2"
//           onClick={toggleDropdown}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
//           />
//         </svg>
       
//       {isOpen && (
//         <ul className="dropdown-list absolute top-full left-0 w-full rounded-lg shadow-md bg-white py-2 px-4 mt-1 z-50">
//           {options.map((option) => (
//             <li
//               key={option}
//               className="dropdown-item hover:bg-gray-200 px-4 py-2 cursor-pointer"
//               onClick={() => {
//                 handleSelect(option);
//                 setIsOpen(false); // Close dropdown after selection
//               }}
//             >
//               {option}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default DropdownIcon;
