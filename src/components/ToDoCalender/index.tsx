import { theme } from '../../theme';

import Calendar from "@toast-ui/react-calendar";
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { useCallback, useEffect, useRef, useState } from "react";
import { EventObject, ExternalEventTypes, Options, TZDate } from "@toast-ui/calendar";

import { addDate, addHours, subtractDate } from '../../utils';
import Header from './Header';
import Navbar from './Navbar';

type ViewType = 'month' | 'week' | 'day'; // default type : week

const today = new TZDate();

const ToDoCalender = ({ view }: { view: ViewType }) => {
  // useRef 로 특정 DOM(calendar) 선택하기
  const calendarRef = useRef<typeof Calendar>(null);
  // useState 를 통해 컴포넌트에서 바뀌는 값(현재 선택된 날짜) 관리하기
  const [selectedDateRangeText, setSelectedDateRangeText] = useState('');
  // useState 를 통해 컴포넌트에서 바뀌는 값(캘린터 타입(monthly, weekly, daily) 관리하기
  const [selectedView, setSelectedView] = useState(view);

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
      main_category: '공부',
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
      main_category: '공부',
      start: addDate(today, 1), // 일정이 시작하는 일시
      end: addDate(today, 1), // 일정이 끝나는 일시
      isReadOnly: true,
    },
    {
      id: '3',
      calendarId: '1',
      title: 'FE Workshop',
      category: 'allday',
      main_category: '공부',
      start: subtractDate(today, 2),
      end: subtractDate(today, 1),
      isReadOnly: true,
    },
    {
      id: '4',
      calendarId: '0',
      title: 'Report',
      category: 'time',
      main_category: '공부',
      start: today,
      end: addHours(today, 1),
    },
  ];

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // useCallback 을 사용하여 함수(calender의 DOM) 재사용하기
  const getCalInstance = useCallback(() => calendarRef.current?.getInstance?.(), []);

  // 캘린터 타입(month/week/day) 변경될 때마다
  useEffect(() => {
    setSelectedView(view);
  }, [view]);

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

  const onClickDayName: ExternalEventTypes['clickDayName'] = (res) => {
    console.group('onClickDayName');
    console.log('Date : ', res.date);
    console.groupEnd();
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
    <main className='text-sm m-2 p-3'>
      <Header 
        view={view}
        selectedView={selectedView}
        setSelectedView={setSelectedView}
        getCalInstance={getCalInstance}
        setSelectedDateRangeText={setSelectedDateRangeText}
        selectedDateRangeText={selectedDateRangeText} />
      <div className='flex m-2'>
        <Navbar/>
        <div className='flex-1' >
          <Calendar
            height="90vh"
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
export default ToDoCalender