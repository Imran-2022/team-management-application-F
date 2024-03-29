import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import AddMemberModal from './AddMemberModal';
import { useDeleteTeamMutation } from '../../features/team/teamApi';
import { useDispatch } from 'react-redux';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
const TeamOptions = ({id}) => {
  const [deleteTeam,{isSuccess:deleteSuccess}]=useDeleteTeamMutation();
  const dispatch=useDispatch()
  const [opened, setOpened] = useState(false);
  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };

  return (
    <>
      <Menu as="div" className="absolute cursor-pointer top-0 right-0 inline-block text-left">
        <Menu.Button className="absolute top-0 right-0 items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
          <svg
            className="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute top-6  right-8 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
            <div className="py-1">
              <Menu.Item style={{ width: '100%', textAlign: 'left' }}>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'px-4 py-2 text-sm flex items-center'
                    )}
                    onClick={controlModal}
                  >
                    <IoMdAdd className="mr-1.5" />
                    <span>Add Member</span>
                  </button>
                )}
              </Menu.Item>
              {/* only for author - who created the team */}
              {(
                <Menu.Item style={{ width: '100%', textAlign: 'left' }}>
                  {({ active }) => (
                    <button onClick={()=>dispatch(deleteTeam(id))}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'px-4 py-2 text-sm flex items-center'
                      )}
                    >
                      <MdDelete className="mr-1.5" />
                      <span>Delete Team</span>
                    </button>
                  )}
                </Menu.Item>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <AddMemberModal open={opened} control={controlModal} id={id}/>
    </>
  );
};
export default TeamOptions;
