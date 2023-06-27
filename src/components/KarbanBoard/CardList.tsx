import Card from "./Card";

const CardList = ({title, cards}:any) => {
    return (
      <div style={{ display:"flex", flexDirection:"column", flex: "1", margin:"5px", padding:"5px", border: '2px solid rgb(242,242,242)', borderRadius : "15px"}}>
        <h1 style={{ margin:"5px", padding:"5px", textAlign: "center", fontWeight: "bold",color: "white", border: '2px solid', borderRadius : "15px", backgroundColor : "#2678f3"}}>{title}</h1>
        {cards.map((card:any) => <Card 
                                  key={card.id}
                                  title={card.title}
                                  category={card.category}
                                  start_date={card.start_date}
                                  end_date={card.end_date}
                                  level={card.level}
        />)}
      </div>
    )
  }
  export default CardList