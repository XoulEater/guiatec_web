import type { WorkPlanDTO } from "../lib/data.ts";
import { workPlans } from "../lib/data.ts";

const WorkplansTable = () => {
  return (
    <div className="w-[90%] overflow-hidden rounded-xl drop-shadow-md shadow-inner border border-black/10 shadow-white/10">
      {workPlans.map((workPlan: WorkPlanDTO, index) => {
        const rowColorClass = index % 2 != 0 ? "bg-white" : "bg-zinc-200";
        return (
          <div
            key={index}
            className={`grid grid-cols-2 h-16 w-full items-center ${rowColorClass} px-2`}
          >
            <a className="flex flex-col" href={`/workplan/${workPlan.id}`}>
              <span className="text-xl font-bold ">{workPlan.name}</span>
              <span className="">{workPlan.description}</span>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default WorkplansTable;
