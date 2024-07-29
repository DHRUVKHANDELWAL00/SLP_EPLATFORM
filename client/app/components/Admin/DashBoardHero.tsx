import React,{useState} from 'react'
import DashBoardHeader from './DashBoardHeader'
import DashboardWidgets from './Widgets/DashboardWidget'
type Props = {
  isDashboard?: boolean;
}

const DashBoardHero = ({isDashboard}:Props) => {
  const [open,setOpen]=useState(false);
  return (
    <div>
        <DashBoardHeader open={open} setOpen={setOpen}/>
        {isDashboard && (
          <DashboardWidgets open={open}/>
        )}
    </div>
  )
}

export default DashBoardHero