import React from 'react';
import { Link } from 'react-router-dom';
import { sidebarData } from '../../util/sidebarData';

const Sidebar = () => {
  return (
    <div className="w-60 h-screen bg-white text-gray-900 p-5 shadow-lg border-r border-gray-200">
      <div className="flex flex-col gap-4">
        {sidebarData.map((data) => {
          const isExternal = data.route.startsWith('http');
          return isExternal ? (
            <a
              href={data.route}
              key={data.text}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="flex items-center p-3 rounded-lg transition-colors duration-300 hover:bg-gray-200">
                <div className="text-2xl mr-4 text-blue-600 group-hover:text-blue-800">
                  {data.icon}
                </div>
                <span className="text-lg font-medium group-hover:text-blue-800">
                  {data.text}
                </span>
              </div>
            </a>
          ) : (
            <Link to={data.route} key={data.text} className="group">
              <div className="flex items-center p-3 rounded-lg transition-colors duration-300 hover:bg-gray-200">
                <div className="text-2xl mr-4 text-blue-600 group-hover:text-blue-800">
                  {data.icon}
                </div>
                <span className="text-lg font-medium group-hover:text-blue-800">
                  {data.text}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
