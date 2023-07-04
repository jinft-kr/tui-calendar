import { ChangeEvent, useCallback, useEffect } from "react";

type ViewType = 'month' | 'week' | 'day'; // default type : week

const viewModeOptions = [
  {
    title: 'Monthly',
    value: 'month',
  },
  {
    title: 'Weekly',
    value: 'week',
  },
  {
    title: 'Daily',
    value: 'day',
  },
];

const Header = ({ view, selectedView, setSelectedView, getCalInstance, selectedDateRangeText, setSelectedDateRangeText }: any ) => {
    
  // useState 를 통해 컴포넌트에서 바뀌는 값(캘린터 타입(monthly, weekly, daily) 관리하기
//   const [selectedView, setSelectedView] = useState(view);
  // useState 를 통해 컴포넌트에서 바뀌는 값(현재 선택된 날짜) 관리하기
//   const [selectedDateRangeText, setSelectedDateRangeText] = useState('');

  // rendering 될 때마다 캘린더 표시 날짜 바꿔주기
  const updateRenderRangeText = useCallback(() => {
    const calInstance = getCalInstance();
    if (!calInstance) {
      setSelectedDateRangeText('');
    }

    const calDate = calInstance.getDate();

    let year = calDate.getFullYear();
    let month = calDate.getMonth() + 1;
    let date = calDate.getDate();
    let dateRangeText: string;

    dateRangeText = `${year}-${month < 10 ? '0' : ''}${month}-${date < 10 ? '0' : ''}${date}`;

    setSelectedDateRangeText(dateRangeText);
  }, [getCalInstance]);
  
  // 캘런더 타입 바꿀 때 실행되는 이벤트
  const onChangeSelect = (ev: ChangeEvent<HTMLSelectElement>) => {
    setSelectedView(ev.target.value as ViewType);
  };

  const onClickNavi = (ev: any) => {
    if ((ev.target as HTMLButtonElement).tagName === 'BUTTON') {
      const button = ev.target as HTMLButtonElement;
      const actionName = (button.getAttribute('data-action') ?? 'month').replace('move-', '');
      getCalInstance()[actionName]();
      updateRenderRangeText();
    }
  };

  const onClickSetDate = (ev: any) => {
    getCalInstance()?.setDate(ev.target.value);
    updateRenderRangeText();
  };

  useEffect(() => {
    updateRenderRangeText();
  }, [selectedView, updateRenderRangeText]);
  
  return (
    <>
    <div className="flex justify-between m-2">
        <select 
        className='font-bold rounded-lg p-2 hover:opacity-70 border-2 h-11 border-blue-500 shadow-md'
        onChange={onChangeSelect} 
        value={selectedView}
        >
          {viewModeOptions.map((option, index) => (
            <option value={option.value} key={index}>
              {option.title}
            </option>
          ))}
        </select>
        <span>
          <button
            type="button"
            className="btn btn-default btn-sm move-today bg-blue-500 text-white font-bold rounded-lg ml-2 p-3 hover:opacity-70 shadow-md"
            data-action="move-today"
            onClick={onClickNavi}
          >
            Today
          </button>
          <button
            type="button"
            className="btn btn-default btn-sm move-day bg-blue-500 text-white font-bold rounded-lg ml-2 p-3 hover:opacity-70 shadow-md"
            data-action="move-prev"
            onClick={onClickNavi}
          >
            Prev
          </button>
          <button
            type="button"
            className="btn btn-default btn-sm move-day bg-blue-500 text-white font-bold rounded-lg ml-2 p-3 hover:opacity-70 shadow-md"
            data-action="move-next"
            onClick={onClickNavi}
          >
            Next
          </button>
          <input 
            className='font-bold rounded-lg border-2 hover:opacity-70 h-11 border-blue-500 ml-2 p-2 shadow-md'
            type="date" 
            value={selectedDateRangeText} 
            onChange={onClickSetDate}
          />
        </span>
      </div>
    </>
  )
}

export default Header;