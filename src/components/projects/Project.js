import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Project = ({ dt = {} }) => {

    const { teamColor, teamDetails, teamName, createdAt, _id, teamMembers } = dt;

    return (
        <Link to={`/projects/${_id}`} className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100">
            <div className="relative px-4 py-1 flex items-center justify-center">
                <span
                    className={`absolute w-full h-full rounded-full`}
                    style={{
                        backgroundColor: teamColor || 'mediumseagreen',
                        opacity: 0.1,
                    }}
                ></span>
                <span className="text-xs font-semibold">{teamName}</span>
            </div>
            <p className="mt-3 text-sm font-medium">{teamDetails?.slice(0, 90)} ....</p>
            <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center">
                        <svg
                            className="w-4 h-4 text-gray-300 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="ml-1 leading-none">
                            {new Date(createdAt).toDateString()}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <FaUsers className="w-4 h-4 mr-1 fill-gray-300" />
                        <span className="leading-none">{teamMembers?.length || 0}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Project;