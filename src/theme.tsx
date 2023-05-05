import type { Options } from '@toast-ui/calendar';

export const theme: Options['theme'] = {
    common: { // 공통으로 적용되는 부분
        border: '1px solid #ddd', // 캘린더의 테두리
        backgroundColor: 'white', // 캘린더의 배경색
        holiday: { color: '#f54f3d' }, // 휴일
        saturday: { color: '#135de6' }, // 토요일
        dayName: { color: '#333' }, // 요일
        today: { color: '#009688' }, // 오늘
        gridSelection: { // 날짜/시간 선택
            backgroundColor: 'rgba(19, 93, 230, 0.1)',
            border: '1px solid #135de6',
        },
    },
    month: { // 월간뷰를 위한 부분
        dayName: { // 요일
            borderLeft: 'none',
            backgroundColor: 'inherit',
        },
        holidayExceptThisMonth: { color: '#f3acac' }, // 다른 달인 휴일
        dayExceptThisMonth: { color: '#bbb' }, // 다른 달인 날짜
        weekend: { backgroundColor: '#fafafa' }, // 월간뷰의 주말 셀
        moreView: { boxShadow: 'none' }, // 월간뷰의 더보기 팝업
        moreViewTitle: { backgroundColor: '#f4f4f4' }, // 월간뷰의 더보기 팝업의 헤더 영역
    },
    week: { // 주간뷰를 위한 부분
        dayName: { // 요일
            borderTop: '1px solid #ddd',
            borderBottom: '1px solid #ddd',
            borderLeft: '1px solid #ddd',
            backgroundColor: 'inherit',
        },
        today: {
            color: '#009688',
            backgroundColor: 'inherit',
        },
        pastDay: { color: '#999' }, // 주간/일간뷰에서 timed 이벤트 영역의 왼쪽 영역에 표시되는 지난 시간
        panelResizer: { border: '1px solid #ddd' }, // 패널 크기 조절 컴포넌트
        dayGrid: { borderRight: '1px solid #ddd' }, // 주간/일간뷰에서 패널의 각 셀
        dayGridLeft: { // 주간/일간뷰에서 패널 왼쪽 영역
            width: '100px',
            backgroundColor: '',
            borderRight: '1px solid #ddd',
        },
        weekend: { backgroundColor: 'inherit' }, // 주간/일간뷰에서 timed 이벤트 영역의 주말 컬럼
        timeGridLeft: { // 주간/일간뷰에서 timed 이벤트 영역의 왼쪽 영역
            width: '100px',
            backgroundColor: '#fafafa',
            borderRight: '1px solid #ddd',
        },
        timeGridLeftAdditionalTimezone: { backgroundColor: '#fdfdfd' }, // 주간/일간뷰에서 timed 이벤트 영역의 왼쪽 영역에 표시되는 서브 타임존
        timeGridHourLine: { borderBottom: '1px solid #eee' }, // 주간/일간뷰에서 timed 이벤트 영역에서 매 시간의 정각 선
        timeGridHalfHourLine: { borderBottom: '1px dotted #f9f9f9' }, // 주간/일간뷰에서 timed 이벤트 영역에서 매 시간의 30분 선
        timeGrid: { borderRight: '1px solid #ddd' }, // 주간/일간뷰에서 timed 이벤트 영역
        nowIndicatorLabel: { color: '#135de6' }, // 현재 시간선에 표시되는 현재 시각 텍스트
        nowIndicatorPast: { border: '1px solid rgba(19, 93, 230, 0.3)' }, // 현재 시간선에서 지난 날짜선
        nowIndicatorBullet: { backgroundColor: '#135de6' }, // 현재 시간선에서 오늘 날짜
        nowIndicatorToday: { border: '1px solid #135de6' }, // 현재 시간선에서 오늘 날짜선
        nowIndicatorFuture: { border: '1px solid #135de6' }, // 현재 시간선에서 미래 날짜선
        pastTime: { color: '#999' }, // 주간/일간뷰에서 timed 이벤트 영역의 왼쪽 영역에 표시되는 지난 시간
        futureTime: { color: '#333' }, // 주간/일간뷰에서 timed 이벤트 영역의 왼쪽 영역에 표시되는 지난 시간
        gridSelection: { color: '#135de6' }, // 주간/일간뷰에서 날짜/시간 선택
    },
};