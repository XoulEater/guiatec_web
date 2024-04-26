import type { TeacherDTO, TeamDTO, UserDTO } from "../lib/data.ts";

import { Campus } from "../lib/data.ts";
import { useEffect, useState } from "react";
import * as teamService from "../API/teamService.ts";

const MembersTable = () => {
  const user = localStorage.getItem("user");
  const userDTO = JSON.parse(user as string) as UserDTO;
  const isMainAssistant =
    userDTO.userType === "assistant" && userDTO.campus === "CA";
  const isAssistant = userDTO.userType === "assistant";
  const [currentLeader, setCurrentLeader] = useState<string | null>(null);
  const [teachers, setTeachers] = useState<TeacherDTO[]>([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherDTO | null>(
    null
  );
  const [isValidTeam, setIsValidTeam] = useState(true);

  // a team is valid if it has at least one member of each campus of the enum
  function checkValidTeam() {
    const campuses = Object.values(Campus);
    console.log(teachers.map((teacher) => teacher.campus));
    setIsValidTeam(
      campuses.every((campus) =>
        teachers.some((teacher) => teacher.campus === campus)
      )
    );
  }

 

  const loadTeachers = async () => {
    const res = await teamService.getAllMembers();
    const formattedTeachers = res.map((teacher) => {
      if (teacher.isLeader) {
        console.log("leader", teacher);
        setCurrentLeader(teacher.id);
      }
      return {
        ...teacher,
        photo:
          teacher.photo ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      };
    });
    setTeachers(formattedTeachers);
  };
  

  useEffect(() => {
    loadTeachers();
  }, [] );

  useEffect(() => {
    checkValidTeam();
  }, [teachers]);

  // handle delete
  function handleDelete(teacher: TeacherDTO) {
    setSelectedTeacher(teacher);
    setConfirmDelete(true);
  }

  function handleConfirmDelete() {
    if (selectedTeacher) {
      teachers.splice(teachers.indexOf(selectedTeacher), 1);
      teamService.removeMember(selectedTeacher.id);
    }
    checkValidTeam();
    setConfirmDelete(false);
  }

  async function handleLeaderChange(teacher: TeacherDTO) {
    // set leader to false for all teachers
    await teachers.forEach((t) => t === teacher ? teamService.setCoordinator(t.id, true) :  teamService.setCoordinator(t.id, false));
    setCurrentLeader(teacher.id);
  }



  return (
    <section className="w-[90%] overflow-hidden rounded-xl drop-shadow-md shadow-inner border border-black/10 shadow-white/10">
      <header className="grid items-center w-full h-16 grid-cols-6 px-2 bg-zinc-200">
        <span className="text-lg font-semibold">Codigo</span>
        <span className="text-lg font-semibold">Imagen</span>
        <span className="col-span-2 text-lg font-semibold">Nombre</span>
        <span className="col-span-2 text-lg font-semibold">Acciones</span>
      </header>
      {teachers.map((teacher: TeacherDTO, index) => {
        const rowColorClass = index % 2 === 0 ? "bg-white" : "bg-zinc-200";
        return (
          <div
            key={index}
            className={`grid grid-cols-6 h-16 w-full items-center ${rowColorClass} px-2`}
          >
            <span>{teacher.id}</span>
            <img
              className="object-cover object-center h-12 rounded-full aspect-square"
              src={teacher.photo}
              alt={teacher.name}
            />
            <span className="col-span-2 ">{teacher.name}</span>
            <div className="flex items-center col-span-2 gap-4">
              {/* Button to view teacher details */}
              <a href={`teacher/${teacher.id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-all duration-300 ease-out  text-primary-light hover:brightness-150 hover:scale-110"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z"></path>
                  <path d="M12 9h.01"></path>
                  <path d="M11 12h1v4h1"></path>
                </svg>
              </a>
              {isAssistant && (
                <button onClick={() => handleDelete(teacher)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-red-600 transition-all duration-300 ease-out  hover:brightness-150 hover:scale-110"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M13 12v.01"></path>
                    <path d="M3 21h18"></path>
                    <path d="M5 21v-16a2 2 0 0 1 2 -2h7.5m2.5 10.5v7.5"></path>
                    <path d="M14 7h7m-3 -3l3 3l-3 3"></path>
                  </svg>
                </button>
              )}
              {isMainAssistant && (
                /* Button to change leader */
                <button onClick={() => handleLeaderChange(teacher)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${
                      teacher.id === currentLeader
                        ? "text-amber-500 hover:brightness-125"
                        : "text-zinc-400 hover:brightness-90"
                    } hover:scale-110 transition-all  duration-300 ease-out`}
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z"></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
        );
      })}
      {/* Alert invalid team */}
      {!isValidTeam && (
        <div className="flex items-center justify-center w-full h-12 gap-2 text-white transition duration-300 ease-in-out bg-red-800 rounded-b-md hover:brightness-125 group">
          <span className="transition-transform duration-300 ease-in-out group-hover:scale-110">
            Equipo incompleto
          </span>
        </div>
      )}

      {confirmDelete && (
        <div
          className={
            "absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center z-50"
          }
        >
          <div className="flex flex-col gap-5 p-5 bg-white rounded-lg">
            <h2 className="text-xl font-medium ">{`Está seguro de eliminar a ${selectedTeacher?.name}?`}</h2>
            <div className="flex gap-5">
              <button
                onClick={handleConfirmDelete}
                className="flex items-center justify-center w-32 h-12 gap-2 text-white transition duration-300 ease-in-out rounded-md bg-primary-dark hover:bg-primary-light group"
              >
                <span className="transition-transform duration-300 ease-in-out group-hover:scale-110">
                  Si
                </span>
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex items-center justify-center w-32 h-12 gap-2 text-white transition duration-300 ease-in-out bg-red-800 rounded-md hover:brightness-125 group"
              >
                <span className="transition-transform duration-300 ease-in-out group-hover:scale-110">
                  No
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MembersTable;
