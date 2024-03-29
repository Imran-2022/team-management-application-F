import React from 'react';
import { useGetUserQuery } from '../../features/auth/authApi';
import { Link } from 'react-router-dom';
import { useUpdateSupervisorReviewMutation } from '../../features/team/teamApi';

const ListTable = ({ dt = {}, idx }) => {
    // console.log(dt);
    const { teamName, teamMembers, supervisor, review } = dt;
    const { data: user, isSuccess: userSuccess } = useGetUserQuery()
    const [updateSupervisorReview]=useUpdateSupervisorReviewMutation()

    const getActiveUser = user?.data.map(dt => {
        const isTeamMember = teamMembers?.includes(dt.email)
        if (isTeamMember) {
            return dt.name;
        }
    }).filter(name => name); // Filter out any undefined values

    // console.log(getActiveUser, "dg");
    // console.log(supervisor,dt);


    const getActiveSupervisor = user?.data.map(dt => {
        const isTeamMember = supervisor?.includes(dt.email)
        if (isTeamMember) {
            return dt.name;
        }
    }).filter(name => name); // Filter out any undefined values

    const updateProjectStatus=(abc)=>{
        updateSupervisorReview(abc);
    }

    return (
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{idx + 1}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 underline underline-offset-2">
                <Link to={`/projects/${dt._id}`}>{teamName}</Link>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {
                    getActiveUser?.map((dt, idx) => <p>{idx + 1}. {dt}</p>)
                }
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {
                    getActiveSupervisor?.map((dt, idx) => <p>{idx + 1}. {dt}</p>)
                }</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <select onChange={
          (e) => {
            updateProjectStatus({
              id: dt?._id,
              data: { ...dt, review: e.target.value }
            })

          }
        } className='cursor-pointer focus:outline-none p-1 text-xs rounded-sm  bg-red-100' defaultValue={review}>
                    <option value="no reveiw given" className='whitespace-nowrap text-sm font-medium text-gray-900'>No review given</option>
                    <option value="update needed" className='whitespace-nowrap text-sm font-medium text-gray-900'>updates needed</option>
                    <option value="successfully completed" className='whitespace-nowrap text-sm font-medium text-gray-900'>successfully Completed</option>
                </select>
            </td>
        </tr>
    );
};

export default ListTable;