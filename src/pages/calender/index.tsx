import {theme} from "../../theme";

import { addDate, addHours, subtractDate } from '../../utils';

import Calendar from "@toast-ui/react-calendar";
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from "react";
import {EventObject, ExternalEventTypes, Options, TZDate} from "@toast-ui/calendar";

type ViewType = 'month' | 'week' | 'day'; // default type : week

const today = new TZDate();
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


const Calender = ({ view }: { view: ViewType }) => {
    // useRef 로 특정 DOM(calendar) 선택하기
    const calendarRef = useRef<typeof Calendar>(null);
    // useState 를 통해 컴포넌트에서 바뀌는 값(현재 선택된 날짜) 관리하기
    const [selectedDateRangeText, setSelectedDateRangeText] = useState('');
    // useState 를 통해 컴포넌트에서 바뀌는 값(캘린터 타입(monthly, weekly, daily) 관리하기
    const [selectedView, setSelectedView] = useState(view);
    // 카테고리 state
    const [category, setCategory] = useState([ "기본", "운동", "공부", "etc"]);
    // 팔로워 state
    const [ follower, setFollwer] = useState(['김민석', '노휘래', '최충실']);

    // 공개/비공개 타입 선택
    const initialCalendars: Options['calendars'] = [
        {
            id: '0',
            name: 'Private',
            backgroundColor: '#9e5fff',
            borderColor: '#9e5fff',
            dragBackgroundColor: '#9e5fff',
        },
        {
            id: '1',
            name: 'Public',
            backgroundColor: '#00a9ff',
            borderColor: '#00a9ff',
            dragBackgroundColor: '#00a9ff',
        },
    ];

    // 일정 초기화
    const initialEvents: Partial<EventObject>[] = [
        {
            id: '1', // 일정 ID
            calendarId: '0', // 캘린더 ID
            title: 'TOAST UI Calendar Study', // 일정 제목
            body : '일정내용으 이겁니다~!1', // 일정 내용
            category: 'time', // 일정 카테고리(milestone, task, allday, time 중 하나)
            start: today, // 일정이 시작하는 일시
            end: addHours(today, 3), // 일정이 끝나는 일시
            location: '', // 일정 장소
            state : 'running', // state : todo, in progress, done type 정의 필요
        },
        {
            id: '2',
            calendarId: '0',
            title: 'Practice',
            body : '일정내용은 이겁니다~!2', // 일정 내용
            category: 'milestone',
            start: addDate(today, 1), // 일정이 시작하는 일시
            end: addDate(today, 1), // 일정이 끝나는 일시
            isReadOnly: true,
        },
        {
            id: '3',
            calendarId: '1',
            title: 'FE Workshop',
            category: 'allday',
            start: subtractDate(today, 2),
            end: subtractDate(today, 1),
            isReadOnly: true,
        },
        {
            id: '4',
            calendarId: '0',
            title: 'Report',
            category: 'time',
            start: today,
            end: addHours(today, 1),
        },
    ];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // useCallback 을 사용하여 함수(calender의 DOM) 재사용하기
    const getCalInstance = useCallback(() => calendarRef.current?.getInstance?.(), []);

    // rendering 될 때마다 캘린더 표시 날짜 바꿔주기
    const updateRenderRangeText = useCallback(() => {
        const calInstance = getCalInstance();
        if (!calInstance) {
            setSelectedDateRangeText('');
        }

        const viewName = calInstance.getViewName();
        const calDate = calInstance.getDate();
        const rangeStart = calInstance.getDateRangeStart();
        const rangeEnd = calInstance.getDateRangeEnd();

        let year = calDate.getFullYear();
        let month = calDate.getMonth() + 1;
        let date = calDate.getDate();
        let dateRangeText: string;

        switch (viewName) {
            case 'month': {
                dateRangeText = `${year}-${month}`;
                break;
            }
            case 'week': {
                year = rangeStart.getFullYear();
                month = rangeStart.getMonth() + 1;
                date = rangeStart.getDate();
                const endMonth = rangeEnd.getMonth() + 1;
                const endDate = rangeEnd.getDate();

                const start = `${year}-${month < 10 ? '0' : ''}${month}-${date < 10 ? '0' : ''}${date}`;
                const end = `${year}-${endMonth < 10 ? '0' : ''}${endMonth}-${
                    endDate < 10 ? '0' : ''
                }${endDate}`;
                dateRangeText = `${start} ~ ${end}`;
                break;
            }
            default:
                dateRangeText = `${year}-${month}-${date}`;
        }

        setSelectedDateRangeText(dateRangeText);
    }, [getCalInstance]);

    // 캘린터 타입(month/week/day) 변경될 때마다
    useEffect(() => {
        setSelectedView(view);
    }, [view]);

    useEffect(() => {
        updateRenderRangeText();
    }, [selectedView, updateRenderRangeText]);

    const onAfterRenderEvent: ExternalEventTypes['afterRenderEvent'] = (res) => {
        console.group('onAfterRenderEvent');
        console.log('Event Info : ', res.title);
        console.groupEnd();
    };

    const onBeforeDeleteEvent: ExternalEventTypes['beforeDeleteEvent'] = (res) => {
        console.group('onBeforeDeleteEvent');
        console.log('Event Info : ', res.title);
        console.groupEnd();

        const { id, calendarId } = res;

        getCalInstance().deleteEvent(id, calendarId);
    };

    // 캘런더 타입 바꿀 때 실행되는 이벤트
    const onChangeSelect = (ev: ChangeEvent<HTMLSelectElement>) => {
        setSelectedView(ev.target.value as ViewType);
    };

    //
    const onClickDayName: ExternalEventTypes['clickDayName'] = (res) => {
        console.group('onClickDayName');
        console.log('Date : ', res.date);
        console.groupEnd();
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
        if ((ev.target as HTMLButtonElement).tagName === 'BUTTON') {
            const button = ev.target as HTMLButtonElement;
            const actionName = (button.getAttribute('data-action') ?? 'month');
            getCalInstance()?.setDate(actionName);
            updateRenderRangeText();
        }
    };

    const onClickEvent: ExternalEventTypes['clickEvent'] = (res) => {
        console.group('onClickEvent');
        console.log('MouseEvent : ', res.nativeEvent);
        console.log('Event Info : ', res.event);
        console.groupEnd();
    };

    const onClickTimezonesCollapseBtn: ExternalEventTypes['clickTimezonesCollapseBtn'] = (
        timezoneCollapsed
    ) => {
        console.group('onClickTimezonesCollapseBtn');
        console.log('Is Timezone Collapsed?: ', timezoneCollapsed);
        console.groupEnd();

        const newTheme = {
            'week.daygridLeft.width': '100px',
            'week.timegridLeft.width': '100px',
        };

        getCalInstance().setTheme(newTheme);
    };

    const onBeforeUpdateEvent: ExternalEventTypes['beforeUpdateEvent'] = (updateData) => {
        console.group('onBeforeUpdateEvent');
        console.log(updateData);
        console.groupEnd();

        const targetEvent = updateData.event;
        const changes = { ...updateData.changes };

        getCalInstance().updateEvent(targetEvent.id, targetEvent.calendarId, changes);
    };

    const onBeforeCreateEvent: ExternalEventTypes['beforeCreateEvent'] = (eventData) => {
        const event = {
            calendarId: eventData.calendarId || '',
            id: String(Math.random()),
            title: eventData.title,
            isAllday: eventData.isAllday,
            start: eventData.start,
            end: eventData.end,
            category: eventData.isAllday ? 'allday' : 'time',
            dueDateClass: '',
            location: eventData.location,
            state: eventData.state,
            isPrivate: eventData.isPrivate,
        };

        getCalInstance().createEvents([event]);
    };
    return (
        <main style={{margin : '10px'}}>
            <div className={"div1"} style={{ textAlign: 'right', paddingRight : '10px'}}>
                <select style={{ border: '1px solid gray', borderRadius: '5px', marginLeft: '20px', padding: '10px', float: 'left' }} onChange={onChangeSelect} value={selectedView}>
                    {viewModeOptions.map((option, index) => (
                        <option value={option.value} key={index}>
                            {option.title}
                        </option>
                    ))}
                </select>
                <span className="render-range" style={{border: '1px solid gray', borderRadius: '5px', marginRight : '10px', padding:'10px'}}>{selectedDateRangeText}</span>
                <span>
                      <button
                          type="button"
                          className="btn btn-default btn-sm move-today"
                          data-action="move-today"
                          onClick={onClickNavi}
                          style={{border: '1px solid gray', borderRadius: '5px', marginRight : '10px', padding:'10px'}}
                      >
                        Today
                      </button>
                      <button
                          type="button"
                          className="btn btn-default btn-sm move-day"
                          data-action="move-prev"
                          onClick={onClickNavi}
                          style={{border: '1px solid gray', borderRadius: '5px', marginRight : '10px', padding:'10px'}}
                      >
                        Prev
                      </button>
                      <button
                          type="button"
                          className="btn btn-default btn-sm move-day"
                          data-action="move-next"
                          onClick={onClickNavi}
                          style={{border: '1px solid gray', borderRadius: '5px', marginRight : '10px', padding:'10px'}}
                      >
                        Next
                      </button>
                      <button
                        type="button"
                        className="btn btn-default btn-sm move-day"
                        data-action="2022-01-01"
                        onClick={onClickSetDate}
                        style={{border: '1px solid gray', borderRadius: '5px', marginRight : '10px', padding:'10px'}}
                       >
                        2022-01-01
                      </button>
                 </span>
            </div>
            <div style={{display: 'flex', margin : '10px'}}>
                <div className={"div2"} style={{flex : 1}}>
                    <div style={{border: '1px solid gray', borderRadius: '5px', margin: '10px', padding: '30px', marginBottom: '5px'}}>
                        <h1 style={{fontWeight: 'bold', color: 'blue'}}>카테고리</h1>
                        {
                            category.map(category => (
                                <h3>{category}</h3>
                            ))
                        }
                    </div>
                    <div style={{border: '1px solid gray', borderRadius: '5px', margin: '10px', padding: '30px'}}>
                        <h1 style={{fontWeight: 'bold', color: 'blue'}}>팔로워</h1>
                        {
                            follower.map(follower => (
                                <h3>{follower}</h3>
                            ))
                        }
                    </div>
                </div>
                <div className={"div3"} style={{flex: 9}}>
                    <Calendar
                        height="900px"
                        calendars={initialCalendars} // 캘린더에서 사용하는 캘린더 목록
                        month={{ startDayOfWeek: 1 }}
                        events={initialEvents}
                        template={{
                            milestone(event) {
                                return `<span style="color: #fff; background-color: ${event.backgroundColor};">${event.title}</span>`;
                            },
                            allday(event) {
                                return `[All day] ${event.title}`;
                            },
                        }}
                        theme={theme} // 적용할 테마
                        timezone={{ // 타임존 셋팅
                            zones: [
                                {
                                    timezoneName: 'Asia/Seoul',
                                    displayLabel: 'Seoul',
                                    tooltip: 'UTC+09:00',
                                },
                                {
                                    timezoneName: 'Pacific/Guam',
                                    displayLabel: 'Guam',
                                    tooltip: 'UTC+10:00',
                                },
                            ],
                        }}
                        useDetailPopup={true} // 기본으로 제공하는 일정 생성 팝업 사용 여부
                        useFormPopup={true} // 기본으로 제공하는 일정 상세 팝업 사용 여부
                        view={selectedView} // 캘린터 타입
                        week={{
                            showTimezoneCollapseButton: true,
                            timezonesCollapsed: false,
                            eventView: true,
                            taskView: true,
                        }}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        ref={calendarRef}
                        onAfterRenderEvent={onAfterRenderEvent}
                        onBeforeDeleteEvent={onBeforeDeleteEvent}
                        onClickDayname={onClickDayName}
                        onClickEvent={onClickEvent}
                        onClickTimezonesCollapseBtn={onClickTimezonesCollapseBtn}
                        onBeforeUpdateEvent={onBeforeUpdateEvent}
                        onBeforeCreateEvent={onBeforeCreateEvent}
                    />
                </div>
            </div>
        </main>
    )
}
export default Calender