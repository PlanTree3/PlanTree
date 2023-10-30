import BudsDrop from "@/components/BudsDrop.tsx";
import BudsDrag from "@/components/BudsDrag.tsx";
import { useState } from "react";
import Task from "@/components/Tasks.tsx";

const Buds = () => {
  const [alpha, setAlpha] = useState(Task)
  const moveBud = (budId:number, newDay:string) => {
    const updatedData = alpha.map(bud => {
      if (bud.budId === budId) {
        const sss = { ...bud, dayOfWeek: newDay }
        console.log('개객기야', sss)
        return sss;
      }
      console.log('와우', bud)
      return bud;
    });
    setAlpha(updatedData);
  };

  return (
    <>
      <div style={{display:'flex'}}>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
          <div style={{margin:'1rem'}} key={day}>
            <BudsDrop day={day}>
              <div style={{height: '500px'}}>
                {alpha.filter(bud => bud.dayOfWeek === day).map(bud => (
                  <BudsDrag key={`${bud.budId}-${bud.dayOfWeek}`} bud={bud} moveBud={moveBud} />
                ))}
              </div>
            </BudsDrop>
          </div>
        ))}
      </div>
    </>
  );
};

export default Buds;
