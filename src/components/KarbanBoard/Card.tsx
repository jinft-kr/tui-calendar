const Card = ({title, category, start_date, end_date, level}:any) => {
  return (
    <div style={{ margin:"5px", padding:"15px", border: '2px solid', borderColor: "#2678f3", borderRadius : "15px"}}>
      <div style={{fontWeight:"bold"}}>{title}</div>
      <div style={{display: "flex", flexDirection: "row", fontSize:"smaller", fontWeight:"bold"}}>
        <div style={{marginRight:"5px", padding: "0px 5px", border: '2px', color:"white", backgroundColor: "#2678f3", borderRadius : "15px"}}>{category}</div>
        <div>{start_date} ~ {end_date}</div>
        <div style={{marginLeft:"5px", padding: "0px 5px", borderColor: "transparent", border: '2px', color:"white", borderRadius : "15px", backgroundColor: level === "HIGH" ? "red" : level == "MEDIUM" ? "green" : level == "LOW" ? "yellow" : "transparent"}}>{level}</div>
      </div>
    </div>
  )
}
export default Card