// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// const RightBar = () => {
//   const { user } = useSelector((state) => state.auth);

//   const contacts = [
//     { name: 'Dinesh Reddy M', isOnline: true },
//     { name: 'Narasimha Reddy Marapa', isOnline: true },
//     { name: 'Prasanth P Prasanth', isOnline: true },
//     { name: 'Balanna Gajjela', isOnline: true },
//     { name: 'MD Saddam', isOnline: false },
//     { name: 'Madhusudhanreddy Gajjala', isOnline: true },
//     { name: 'Shahajid Vlogs', isOnline: true },
//     { name: 'Hari Prasad', isOnline: true },
//     { name: 'Siva Sivakumar', isOnline: true },
//     { name: 'Boraiah D B Borwells', isOnline: false },
//   ];

//   const birthdays = [
//     'Sreeramulu Reddy Kasi Reddy',
//     'And 5 others have birthdays today.',
//   ];

//   return (
//     <div className="w-64 p-5 bg-white shadow-lg border-l border-gray-200">
//       <div className="mb-5">
//         <h3 className="text-xl font-semibold text-gray-900">Birthdays</h3>
        
//         <div className="mt-3">
//           {birthdays.map((birthday, index) => (
//             <p key={index} className="text-gray-700">
//               {birthday}
//             </p>
//           ))}
//         </div>
//       </div>

//       <div className="mb-5">
//         <h3 className="text-xl font-semibold text-gray-900">Contacts</h3>
//         <ul className="mt-3">
//           {contacts.map((contact, index) => (
//             <li key={index} className="flex items-center gap-3 mb-2">
//               <div className={`h-3 w-3 rounded-full ${contact.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
//               <span className="text-gray-700">{contact.name}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
      
//       <div className="mt-5">
//         <h3 className="text-xl font-semibold text-gray-900">Sponsored</h3>
//         <div className="mt-3">
//           <Link to="https://www.your-advertised-site.com" target="_blank" className="text-blue-600 hover:underline">
//             Your Advertisement Here
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RightBar;



import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import gift from '../../assets/gift.jpg'; // Replace with the correct path to your giftbox image

const RightBar = () => {
  const { user } = useSelector((state) => state.auth);

  const contacts = [
    { name: 'Dinesh Reddy M', isOnline: true },
    { name: 'Narasimha Reddy Marapa', isOnline: true },
    { name: 'Prasanth P Prasanth', isOnline: true },
    { name: 'Balanna Gajjela', isOnline: true },
    { name: 'MD Saddam', isOnline: false },
    { name: 'Madhusudhanreddy Gajjala', isOnline: true },
    { name: 'Shahajid Vlogs', isOnline: true },
    { name: 'Hari Prasad', isOnline: true },
    { name: 'Siva Sivakumar', isOnline: true },
    { name: 'Boraiah D B Borwells', isOnline: false },
  ];

  const birthdays = [
    'NS Rao',
    'And 5 others have birthdays today.',
  ];

  return (
    <div className="w-64 p-5 bg-white shadow-lg border-l border-gray-200">
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-gray-900">Birthdays</h3>
        <div className="mt-3 flex items-center">
          <img src={gift} alt="Giftbox" className="h-10 w-10 mr-2" />
          <div>
            {birthdays.map((birthday, index) => (
              <p key={index} className="text-gray-700">
                {birthday}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h3 className="text-xl font-semibold text-gray-900">Contacts</h3>
        <input
          type="text"
          placeholder="Search contacts"
          className="mb-3 p-2 w-full border rounded-md"
        />
        <ul className="mt-3">
          {contacts.map((contact, index) => (
            <li key={index} className="flex items-center gap-3 mb-2">
              <div className={`h-3 w-3 rounded-full ${contact.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
              <span className="text-gray-700">{contact.name}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-5">
        <h3 className="text-xl font-semibold text-gray-900">Sponsored</h3>
        <div className="mt-3">
          <Link to="https://www.your-advertised-site.com" target="_blank" className="text-blue-600 hover:underline">
            Your Advertisement Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
