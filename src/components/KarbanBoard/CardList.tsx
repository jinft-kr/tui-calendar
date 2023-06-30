import Card from "./Card";

const CardList = ({title, cards}:any) => {
    return (
      <div className='m-2 p-3flex-column flex-1 border-2 border-gray rounded-lg shadow-md'>
        <h1 className='m-2 p-3 font-bold text-white bg-blue-500 text-center rounded-lg' >{title}</h1>
        <div>
          {cards.map((card:any) => <Card 
                                      key={card.id}
                                      title={card.title}
                                      category={card.category}
                                      start_date={card.start_date}
                                      end_date={card.end_date}
                                      level={card.level}
          />)}
        </div>
      </div>
    )
  }
  export default CardList