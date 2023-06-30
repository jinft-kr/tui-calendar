const Card = ({title, category, start_date, end_date, level}:any) => {

  return (
    <div className='flex-column flex-1 p-3 m-2 border-2 border-gray rounded-lg hover:bg-gray-100'>
      <div className='font-bold'>{title}</div>
      <div className='flex flex-row text-sm font-bold'>
        <div className='pl-2 pr-2 mr-2 bg-blue-500 border-none text-white rounded-lg'>{category}</div>
        <div>{start_date} ~ {end_date}</div>
        <div className='pl-2 pr-2 ml-2 border-none text-white rounded-lg' style={{backgroundColor: level === "HIGH" ? "red" : level == "MEDIUM" ? "green" : level == "LOW" ? "yellow" : "transparent"}}>{level}</div>
      </div>
    </div>
  )
}
export default Card