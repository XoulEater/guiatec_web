import type { ActivityDTO, ActivityStatus } from "../lib/data";

function ActivitesAccordion(
  activitiesByWeek: { [week: number]: ActivityDTO[] },
  handleAccordionToggle: (week: number) => void,
  openAccordions: number[],
  setSelectedActivity: React.Dispatch<React.SetStateAction<ActivityDTO | null>>,
  setActivityStatus: React.Dispatch<React.SetStateAction<ActivityStatus | null>>
) {
  function handleChangeSelected(activity: ActivityDTO) {
    setSelectedActivity(activity);
    setActivityStatus(activity.status);
  }

  return (
    <section className=" my-6 w-5/12 h-[560px]  rounded-lg overflow-y-scroll no-scrollbar shadow-md ">
      {/* Accordion by week */}
      <div className="px-6 py-2  bg-primary-dark">
        {Object.keys(activitiesByWeek).map((week) => (
          <div key={week} className="">
            <div
              className="flex justify-between py-2 text-xl font-bold text-white border-b-2 cursor-pointer pointer-events-auto"
              onClick={() => handleAccordionToggle(parseInt(week))}
            >
              Semana {week}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {openAccordions.includes(parseInt(week)) ? (
                  <>
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 15l6 -6l6 6" />
                  </>
                ) : (
                  <>
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 9l6 6l6 -6" />
                  </>
                )}
              </svg>
            </div>
            {openAccordions.includes(parseInt(week)) && (
              <ul className="">
                {activitiesByWeek[parseInt(week)].map((activity) => (
                  <li
                    key={activity.name}
                    className={`p-2 my-2 rounded-lg bg-white relative ring-inset ring-0 cursor-pointer hover:ring-2 hover:ring-primary-light group transition duration-300 ease-in-out`}
                    onClick={() => handleChangeSelected(activity)}
                  >
                    <header className="flex justify-between ">
                      <h4 className="text-lg font-semibold">{activity.name}</h4>
                      {
                        <span
                          className={`text-2xl  absolute right-2 top-0 font-bold pointer-events-none ${
                            activity.status === "Realizada"
                              ? "text-green-500"
                              : activity.status === "Publicada"
                              ? "text-yellow-400"
                              : activity.status === "Planeada"
                              ? "text-purple-500"
                              : activity.status === "Cancelada"
                              ? "text-red-500"
                              : "text-blue-500"
                          }`}
                        >
                          ●
                        </span>
                      }
                    </header>
                    <footer className="flex justify-between">
                      <p>{activity.date.toLocaleDateString("en-GB")}</p>
                      <p>{activity.status}</p>
                    </footer>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
export default ActivitesAccordion;
